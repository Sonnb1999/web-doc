.. =====================================================================================================
.. TEMPLATE: recruitment_technical_template.rst — Tài liệu Kỹ thuật Hệ thống
.. Phiên bản: v0.2  31/03/2026
.. Người viết: NgợiTV
.. Người đọc: BA, DEV (đặc biệt dev mới), QA, PM (cần hiểu kỹ thuật để quản lý dự án hiệu quả)
.. Nguyên tắc: Mô tả "hệ thống được xây dựng thế nào"
.. =====================================================================================================

====================================================================
V2: technical.rst — Tài liệu Kỹ thuật Hệ thống Chiêu Binh
====================================================================
.. meta::
   :module: [th_recruitment]
   :cluster: [CS > ERP (Sambala)]
   :owner: [NgợiTV]
   :updated: [31/03/2026]
   
1. Thông tin Module
====================================================================

.. list-table:: 
   :widths: 30 70
   :header-rows: 1

   * - Thông tin
     - Giá trị
   * - Tên kỹ thuật
     - ``th_recruitment``
   * - Module Odoo gốc kế thừa
     - ``hr_recruitment``, ``hr``, ``mail``
   * - Repository
     - `https://github.com/aumcntt/sambala/tree/master/th_recruitment`
   * - Cụm hệ sinh thái
     - Sambala HRM

2. Data Model
====================================================================

2.1. hr.applicant (Hồ sơ ứng viên) — *Kế thừa từ hr.recruitment*
--------------------------------------------------------------------

**Mục đích**: Lưu trữ thông tin chi tiết từng ứng viên xuyên suốt các giai đoạn: Tiếp nhận, Phỏng vấn, Training, Thử việc; và theo dõi lịch sử tương tác Email.

**Field quan trọng (custom):**

.. list-table:: 
   :widths: 30 20 50
   :header-rows: 1

   * - Field
     - Kiểu
     - Mô tả
   * - ``th_recruitment_campaign_id``
     - Many2one
     - Liên kết sang Đợt chiêu binh ``th.recruitment.campaign``
   * - ``th_area_id``
     - Many2one
     - Liên kết định danh ``th.area``
   * - ``th_channel_id``
     - Many2one
     - Thông tin truy vết nguồn ``th.channel.conf``
   * - ``th_cv_attachment``
     - Binary
     - File hồ sơ lưu trữ nội bộ trên form ứng viên
   * - ``th_cv_status``
     - Selection
     - Trạng thái ở bước sơ lọc CV (đồng ý, từ chối, sai số...)
   * - ``th_interview_status``
     - Selection
     - Trạng thái vòng phỏng vấn (Hẹn, Không tham gia...)
   * - ``th_interview_format``
     - Selection
     - Online/Offline (trigger hiển thị trường Link)
   * - ``th_training_status``
     - Selection
     - Thực trạng quá trình Hội nhập/Training
   * - ``th_trial_status``
     - Selection
     - Tình trạng tiếp nhận thử việc cuối luồng
   * - ``th_mail_sent_count``, ``delivered_count``, ``opened_count``, ``failed_count``
     - Integer(Compute)
     - Metric đánh giá hiệu quả mở mail/phản hồi mail
   * - ``th_sent_mail``
     - Selection
     - Trạng thái gửi mail mới nhất tại bước hiện thời (Sent/Error/Not_sent)

**Quan hệ chính:**

.. code-block:: text

   hr.applicant ──Many2one──→ res.users (th_create_id - người tạo)
   hr.applicant ──Many2one──→ th.area (khu vực ứng tuyển)
   hr.applicant ──Many2one──→ th.channel.conf (kênh ứng tuyển)
   hr.applicant ──Many2one──→ th.recruitment.campaign (đợt ứng tuyển)
   hr.applicant ──One2many──→ th.applicant.mail.sent (log email ứng viên)

2.2. Các Model cấu hình (Danh mục)
--------------------------------------------------------------------

.. list-table:: 
   :widths: 30 70
   :header-rows: 1

   * - Model
     - Mục đích & Mô tả
   * - ``th.area``
     - Chứa DS khu vực (``name``, ``th_area_code``). Auto gen mã ``kvXXX`` khi tạo.
   * - ``th.channel.conf``
     - Khởi tạo các kênh/nguồn tuyển dụng (FB, TopCV..). Auto sinh ``nguonXXX``.
   * - ``th.recruitment.campaign``
     - Định nghĩa đợt chiêu binh theo ``th_start_date``, ``th_end_date``.

2.3. Các Model kế thừa & bổ trợ khác
--------------------------------------------------------------------

.. list-table:: 
   :widths: 30 70
   :header-rows: 1

   * - Model
     - Mục đích kế thừa / Khởi tạo
   * - ``hr.recruitment.stage``
     - Bổ sung boolean ``th_auto_send_email``. Khi kéo state qua giai đoạn này sẽ trigger logic gửi mail tự động cho ứng viên.
   * - ``hr.job``
     - Thêm Many2one sang ``hr.department`` cho vị trí ứng tuyển.
   * - ``mail.mail``
     - Bổ sung trường ``th_applicant_id`` (Many2one sang ``hr.applicant``), được compute tự động từ ``mail_message_id`` nhằm liên kết chính xác mail được gửi với hồ sơ ứng viên tương ứng.
   * - ``th.applicant.mail.sent``
     - Khởi tạo riêng để lưu vết lịch sử và tra cứu xem xét mọi email gửi đi cho ứng viên phục vụ tính toán các Counter/Ratio views.

3. Logic Nghiệp vụ Chính
====================================================================

3.1. Quản lý trạng thái và tính toán Email ``[C4: RCM-002]``
--------------------------------------------------------------------------

**_compute_mail_statistics()** / Tính toán thống kê tương tác Email

.. list-table:: 
   :widths: 15 85
   :header-rows: 1

   * - Mục
     - Nội dung
   * - Trigger
     - Cập nhật tự động dựa trên SQL View ``th_applicant_mail_sent`` khi có thay đổi trạng thái gửi/nhận mail.
   * - Logic
     - 1. Truy vấn danh sách email theo ID ứng viên (``th_applicant_id``).
       2. Lọc và thống kê số lượng email theo nhóm trạng thái: đã gửi (sent), thành công (delivered), thất bại (failed), đã mở (opened).
       3. Tính toán tỷ lệ tương tác % và cập nhật giá trị hiển thị trực tiếp lên giao diện (UI) hồ sơ ứng viên.

**_onchange_th_area_id()** / Tự động điền địa điểm theo khu vực

.. list-table:: 
   :widths: 15 85
   :header-rows: 1

   * - Mục
     - Nội dung
   * - Trigger
     - Kích hoạt khi người dùng thay đổi lựa chọn tại trường Khu vực ứng tuyển (``th_area_id``).
   * - Logic
     - 1. Phân tích mã khu vực từ trường ``th_area_code`` (Ví dụ: ``kv01`` tương ứng với Hà Nội).
       2. Tự động gắn bộ lọc (domain) và điền sẵn dữ liệu địa điểm cho các vòng Phỏng vấn, Hội nhập (Training), Thử việc để tiết kiệm số lần thao tác click chuột.

**_onchange_partner_phone()** / Tự động trích xuất thông tin theo Số điện thoại

.. list-table:: 
   :widths: 15 85
   :header-rows: 1

   * - Mục
     - Nội dung
   * - Trigger
     - Kích hoạt khi người dùng (nhân sự HCNS) nhập hoặc thay đổi Số điện thoại trên form.
   * - Logic
     - Hệ thống tự động truy vấn (lookup) bảng đối tác (``res.partner``) có cùng số điện thoại. Nếu trùng khớp, hệ thống sẽ tự động điền Tên và Email tương ứng điền vào form để tránh trùng lặp dữ liệu ứng viên.

3.2. Quản lý tương tác email / Wizard thủ công ``[C4: RCM-003]``
--------------------------------------------------------------------------

**th_action_send_email_with_template()** & Wizard ``th.applicant.send.mail``

.. list-table:: 
   :widths: 15 85
   :header-rows: 1

   * - Mục
     - Nội dung
   * - Trigger
     - User click nút "Gửi Email" (hoặc Gửi hàng loạt)
   * - Logic
     - 1. Khởi chạy wizard ``th.applicant.send.mail`` truyền context list ``th_applicant_ids``.
       2. Check cảnh báo trùng mail nếu state hiện tại của người dùng đã là Đã gửi.
       3. Map template: Auto fill SĐT HCNS, Link Online vào template mail HTML dưới dạng param.
       4. Thêm ``[email_from]`` outlook của người tuyển dụng vào để CC nhằm mục đích rà soát và quản lý ứng viên trên Outlook.

4. Mở rộng & Ghi đè (Odoo Inheritance)
====================================================================

4.1. ``hr.applicant`` (từ module gốc ``hr_recruitment``)
--------------------------------------------------------------------

**Hàm ghi đè:**

.. list-table:: 
   :header-rows: 1
   :widths: 35 65

   * - Hàm
     - Thay đổi so với gốc
   * - ``_track_template()``
     - Can thiệp logic gửi mail theo stage; chỉ cho phép gửi tự động khi ``stage_id.th_auto_send_email = True`` và ghi log vào chatter.
   * - ``write()``
     - Bảo vệ trường ``th_create_id`` không cho chỉnh sửa trực tiếp; đồng bộ lại trạng thái ``th_sent_mail`` khi đổi ``stage_id``.
   * - ``create()``
     - Bỏ phụ thuộc bắt buộc của ``name`` khi dữ liệu chưa đầy đủ; tự sinh tên từ ``partner_name``/``email_from``; gán ``th_create_id`` theo ngữ cảnh tạo từ API hoặc user nội bộ.
   * - ``name_get()``
     - Chuẩn hóa tên hiển thị theo ``partner_name`` phục vụ tra cứu danh sách ứng viên.

**View thay đổi:**

- ``th_hr_applicant_view.xml``: kế thừa tree/form/search view của ``hr.applicant`` để thêm trường ``th_*``, bổ sung các tab nghiệp vụ (Phỏng vấn, Training, Thử việc), thêm nút thống kê email và tinh chỉnh domain/required theo quy trình chiêu binh.

**Menu thay đổi:**

- Dùng menu tuyển dụng gốc ``hr_recruitment`` và tinh chỉnh tại ``th_menu_view.xml`` (thay thứ tự, bổ sung menu báo cáo/cấu hình).

4.2. ``hr.recruitment.stage`` (từ module gốc ``hr_recruitment``)
--------------------------------------------------------------------

**Hàm ghi đè:**

.. list-table:: 
   :header-rows: 1
   :widths: 35 65

   * - Hàm
     - Thay đổi so với gốc
   * - ``_onchange_template_id()``
     - Khi chọn template, hệ thống tắt cờ ``th_auto_send_email`` để tránh gửi tự động.

**View thay đổi:**


- ``th_hr_recruitment_stage_view.xml``: kế thừa form view stage để thêm trường ``th_auto_send_email`` ngay sau ``template_id``.

**Menu thay đổi:**

- Không thay đổi menu riêng cho model này; dùng menu cấu hình stage của ``hr_recruitment``.

4.3. ``mail.mail`` (từ module gốc ``mail``)
--------------------------------------------------------------------

**Hàm ghi đè:**

.. list-table:: 
   :header-rows: 1
   :widths: 35 65

   * - Hàm
     - Thay đổi so với gốc
   * - ``_compute_th_applicant_id()``
     - Bổ sung compute field ``th_applicant_id`` từ ``mail_message_id`` để liên kết email phát sinh với hồ sơ ``hr.applicant`` tương ứng.

**View thay đổi:**

- Không ghi đè view gốc của ``mail.mail`` trong module này.

**Menu thay đổi:**

- Không thay đổi menu của module ``mail``.

4.x. Tổng hợp các model kế thừa khác
--------------------------------------------------------------------

.. list-table:: 
   :header-rows: 1
   :widths: 30 70

   * - Model gốc
     - Thay đổi chính
   * - ``hr.job``
     - Bổ sung ràng buộc hiển thị ``department_id`` theo ``company_id`` để chuẩn hóa dữ liệu trung tâm ứng tuyển.

5. Phân quyền
====================================================================

5.1. Groups cơ bản
--------------------------------------------------------------------

.. list-table:: 
   :header-rows: 1
   :widths: 25 75

   * - Group
     - Quyền chính
   * - **``hr_recruitment.group_hr_recruitment_user``**
     - Được truy cập menu báo cáo tuyển dụng và có quyền đọc model ``th.applicant.mail.sent`` để theo dõi lịch sử gửi mail.
   * - **``hr_recruitment.group_hr_recruitment_manager``**
     - Quản lý menu cấu hình tuyển dụng (Stage, Area, Channel, Campaign, Position) và các view cấu hình đi kèm.
   * - **``base.group_user``**
     - Có quyền thao tác các wizard nghiệp vụ: ``th.applicant.send.mail``, ``th.applicant.send.mail.confirm`` và ``th.recruitment.report.wizard``.

5.2. Groups bổ sung
--------------------------------------------------------------------

.. list-table:: 
   :header-rows: 1
   :widths: 25 40 35

   * - Group
     - Mục đích
     - Mở thêm menu
   * - ``base.group_no_one``
     - Ẩn các menu report mặc định của ``hr_recruitment_reports`` để chỉ giữ lại menu báo cáo theo nghiệp vụ chiêu binh.
     - ``hr_recruitment.hr_applicant_report_menu``, ``hr_recruitment.hr_applicant_report_source_menu``, ``hr_recruitment.hr_applicant_stage_report_menu``, ``hr_recruitment.hr_applicant_report_team_menu``

5.3. Record Rules
--------------------------------------------------------------------

Hệ thống sử dụng các record rules mặc định của base Odoo ``hr_recruitment`` và chưa định nghĩa thêm rule nào cho ``th_recruitment``. Dưới đây là các rule chính được định nghĩa từ module gốc:

.. list-table:: 
   :header-rows: 1
   :widths: 20 25 35 20

   * - Model
     - Tên rule (XML ID)
     - Cấu hình (Domain/Permission)
     - Áp dụng cho (Group)
   * - ``hr.applicant``
     - Applicant multi company rule
       (``hr_applicant_comp_rule``)
     - Domain: ``['|',('company_id','=',False),('company_id', 'in', company_ids)]``
       (Chỉ thấy hồ sơ của công ty hiện tại hoặc không thuộc công ty nào)
     - Global (Tất cả người dùng)
   * - ``hr.applicant``
     - Applicant Interviewer
       (``hr_applicant_interviewer_rule``)
     - Domain: ``['|', ('job_id.interviewer_ids', 'in', user.id), ('interviewer_ids', 'in', user.id)]``
       (Chỉ thấy hồ sơ nếu được gán làm người phỏng vấn)
     - Recruitment Interviewer
       (``group_hr_recruitment_interviewer``)
   * - ``mail.message``
     - Interviewer: No Applicant Chatter
       (``mail_message_interviewer_rule``)
     - Giới hạn quyền ghi/xóa/tạo tin nhắn của Interviewer trên hồ sơ ứng viên (chatter logging).
     - Recruitment Interviewer
       (``group_hr_recruitment_interviewer``)

6. Tích hợp Kỹ thuật
====================================================================

.. list-table:: 
   :header-rows: 1
   :widths: 20 15 65

   * - Module
     - Hướng
     - Cơ chế kỹ thuật
   * - ``fastapi`` / luồng Web Form
     - Web -> ``th_recruitment``
     - Endpoint bên ngoài tạo ``hr.applicant`` qua fastapi, truyền dữ liệu dạng string (khu vực/kênh/vị trí). Module xử lý mapping uuid -> id và ghi nhận ngữ cảnh ``th_from_form_api`` trong ``create()`` để gán người tạo phù hợp.
   * - ``mail`` + ``mass_mailing``
     - ``th_recruitment`` -> Mail Engine
     - Gửi email qua template theo stage bằng cơ chế ``_track_template`` và wizard gửi mail; lưu vết vào ``mail.mail``/``mail.message`` rồi tổng hợp qua SQL view ``th_applicant_mail_sent``.
   * - ``hr_recruitment``
     - ``th_recruitment`` <-> ``hr_recruitment``
     - Kế thừa model/view/menu của tuyển dụng gốc; thêm trường nghiệp vụ, hành vi onchange/compute và cơ chế kiểm soát gửi mail tự động theo stage.

7. Cấu trúc Source Code
====================================================================

.. code-block:: text

   th_recruitment/
   ├── __init__.py
   ├── __manifest__.py                       ← Khai báo module, file nạp dữ liệu và dependencies
   ├── models/
   │   ├── __init__.py
   │   ├── th_hr_applicant.py                ← Model kế thừa chính: Hồ sơ ứng viên
   │   ├── th_recruitment_campaign.py        ← Model phụ: Quản lý đợt chiêu binh
   │   ├── th_area.py                        ← Model phụ: Danh mục khu vực
   │   ├── th_channel_conf.py                ← Model phụ: Danh mục kênh/nguồn
   │   ├── th_applicant_mail_sent.py         ← Model phụ: Màn hình log lịch sử truy vết email
   │   ├── th_hr_recruitment_stage.py        ← Model kế thừa: Trạng thái (Stage) chiêu binh
   │   └── th_hr_job.py                      ← Model kế thừa: Vị trí tuyển dụng
   ├── wizard/
   │   ├── __init__.py
   │   ├── th_applicant_send_mail.py         ← Wizard gửi mail tương tác tự động/thủ công
   │   ├── th_recruitment_report_wizard.py   ← Wizard xuất báo cáo tổng hợp Excel
   │   └── th_recruitment_report_wizard_view.xml ← Giao diện của Wizard xuất báo cáo
   ├── views/
   │   ├── th_hr_applicant_view.xml          ← Giao diện chính Form/Tree/Search Hồ sơ ứng viên
   │   ├── th_recruitment_campaign_view.xml  ← Giao diện cấu hình Đợt chiêu binh
   │   ├── th_area_conf_view.xml             ← Giao diện cấu hình Khu vực
   │   ├── th_channel_conf_view.xml          ← Giao diện cấu hình Kênh chiêu binh
   │   ├── th_applicant_mail_sent_views.xml  ← Giao diện xem log email đã gửi
   │   ├── th_hr_recruitment_stage_view.xml  ← Giao diện cấu hình Auto send email ứng với từng Stage
   │   ├── hr_job_views.xml                  ← Giao diện kế thừa form HR Job
   │   ├── hr_department_views.xml           ← Giao diện kế thừa form HR Department
   │   └── th_menu_view.xml                  ← Khai báo hệ thống menu điều hướng
   ├── security/
   │   └── ir.model.access.csv               ← Định nghĩa phân quyền truy cập object (ACL)
   ├── data/
   │   ├── hr_recruitment_stage_data.xml     ← Dữ liệu khởi tạo: Trạng thái xử lý mặc định
   │   ├── th_area_data_default.xml          ← Dữ liệu khởi tạo: Khu vực mặc định (HCM, HN)
   │   ├── th_channel_data_default.xml       ← Dữ liệu khởi tạo: Kênh/nguồn mặc định (FB, Form)
   │   ├── email_templates.xml               ← Khởi tạo/Cấu hình các mẫu email động
   │   └── th_server_actions.xml             ← Khởi tạo cấu hình các Auto Action / Cron Job
   ├── docs/
   │   ├── recruitment_business_template.rst ← Tài liệu phân tích thiết kế luồng nghiệp vụ
   │   └── recruitment_technical_template.rst← Tài liệu kỹ thuật mô tả cấu trúc hệ thống
   ├── static/                               ← Thư mục chứa resource tĩnh (icon, css, js)
   └── i18n/                                 ← Thư mục chứa các file ngôn ngữ phục vụ dịch thuật

8. Lịch sử Thay đổi Kỹ thuật (Changelog)
====================================================================

.. list-table:: 
   :widths: 15 85
   :header-rows: 0

   * - Thời gian
     - Thay đổi