.. ============================================================
.. TEMPLATE: recruitment_business_template.rst — Tài liệu Nghiệp vụ Hệ thống
.. Phiên bản: v0.2  31/03/2026
.. Người viết: NgợiTV
.. Người đọc: BA, DEV (đặc biệt dev mới), QA, PM (cần hiểu kỹ thuật để quản lý dự án hiệu quả)
.. Nguyên tắc: Mô tả "chuyện gì xảy ra" — KHÔNG mô tả "nhấn nút nào"
.. ============================================================

====================================================================
V2: business.rst — Tài liệu Nghiệp vụ Module Chiêu Binh
====================================================================
.. meta::
   :module: [th_recruitment]
   :cluster: [CS > ERP (Sambala)]
   :owner: [NgợiTV]
   :updated: [31/03/2026]

1. Tổng quan Nghiệp vụ
====================================================================

Module ``th_recruitment`` phục vụ nghiệp vụ **Chiêu binh (Tuyển dụng)** của AUM Việt Nam (Khối BOF).
Module quản lý toàn diện quy trình tiếp nhận hồ sơ ứng viên (thủ công hoặc tự động từ Landing page/Form), xử lý các vòng đánh giá: Phỏng vấn, Training/Hội nhập, Thử việc. Hệ thống tự động hóa quá trình gửi email thông báo/chăm sóc qua Outlook cá nhân, đồng thời cung cấp báo cáo và theo dõi chi tiết hiệu suất chiêu binh. 
Đây là điểm khởi đầu quan trọng nhằm đánh giá và tuyển dụng nguồn nhân sự chất lượng cho toàn công ty.

2. Đối tượng Sử dụng
====================================================================

.. list-table:: 
   :widths: 20 60 20
   :header-rows: 1

   * - Vai trò
     - Công việc nghiệp vụ
     - Tần suất
   * - Nhân viên HCNS
     - Tiếp nhận, nhập liệu, chỉnh sửa hồ sơ. Quản lý trạng thái xử lý hồ sơ (chăm sóc, phỏng vấn, training, nhận việc). Gửi mail tương tác (cá nhân, hàng loạt) và xuất báo cáo.
     - Hàng ngày
   * - Quản trị cấu hình
     - Cấu hình các danh mục hệ thống: Level chăm sóc, Khu vực, Vị trí, Phòng ban, Nguồn ứng tuyển, Đợt chiêu binh, Mẫu Email.
     - Khi có thay đổi

3. Luồng Nghiệp vụ Chính
====================================================================

3.1 Luồng 3A — Tiếp nhận Hồ sơ Ứng viên ``[COS-SAM-REC-003]``
--------------------------------------------------------------------

**Mục đích:** Ghi nhận thông tin ứng viên tham gia chiêu binh vào hệ thống.

**Các bước:**

.. list-table:: 
   :widths: 5 25 70
   :header-rows: 1

   * - #
     - Bước
     - Mô tả
   * - 1
     - Tiếp nhận dữ liệu
     - Hồ sơ ứng viên được tạo thủ công (nhân sự HCNS nhập) hoặc tự động đồng bộ từ Form đăng ký website (https://chieubinh.aum.edu.vn/).
   * - 2
     - Phân tích tự động
     - Hệ thống tự động map "Khu vực, Kênh ứng tuyển, Vị trí ứng tuyển" (bỏ trống và ghi log nếu không tìm thấy).
   * - 3
     - Khởi tạo Email
     - Tự động tạo liên hệ và điền email từ Partner hợp lệ dựa vào SDT.
   * - 4
     - Lưu trữ CV
     - Tải và lưu tệp/link đính kèm CV trình bày năng lực của ứng viên.

3.2 Luồng 3B — Đánh giá Xử lý Hồ sơ ``[COS-SAM-REC-004, COS-SAM-REC-005]``
--------------------------------------------------------------------

**Mục đích:** Trình bày danh sách, tra cứu và xử lý chuyển đổi ứng viên qua các giai đoạn Phỏng vấn, Hội nhập và Thử việc.

**Các bước:**

.. list-table:: 
   :widths: 5 25 70
   :header-rows: 1

   * - #
     - Bước
     - Mô tả
   * - 1
     - Tra cứu & Theo dõi hồ sơ
     - Tra cứu ứng viên qua bộ lọc (họ tên, email, SĐT, đợt chiêu binh, nguồn...) trên danh sách (list view). Xem chi tiết thông tin hồ sơ đã nhập (form view).
   * - 2
     - Kiểm tra CV ban đầu
     - Xác nhận Tình trạng CV (Đồng ý, bị từ chối, sai số, không nghe máy...).
   * - 3
     - Mục phỏng vấn
     - Theo dõi lịch hẹn, khu vực/hình thức, tình trạng tham gia và kết quả đạt hay không đạt.
   * - 4
     - Mục Training / Hội nhập
     - Khi ứng viên pass PV, nhập thời gian, hình thức tiến hành Training và theo dõi kết quả sau Training.
   * - 5
     - Mục Thử việc
     - Khi pass Training, ghi nhận ngày tiếp nhận, tình trạng và đánh giá năng lực thử việc.

3.3 Luồng 3C — Gửi Email Tương Tác ``[COS-SAM-REC-002]``
--------------------------------------------------------------------

**Mục đích:** Chăm sóc và hệ thống hóa luồng thông tin liên lạc ứng viên.

**Các bước:**

.. list-table:: 
   :widths: 5 25 70
   :header-rows: 1

   * - #
     - Bước
     - Mô tả
   * - 1
     - Lựa chọn ứng viên
     - HCNS gửi thủ công (cá nhân hoặc hàng loạt) qua Wizard, hoặc hệ thống tự kích hoạt gửi mail khi đến giai đoạn có cấu hình "Gửi tự động".
   * - 2
     - Cá nhân hoá mail
     - Tự động điền số điện thoại nhân sự tuyển dụng, link phỏng vấn (dựa theo hình thức trực tuyến), vị trí/địa điểm hẹn dựa vào form.
   * - 3
     - Gửi và CC mail
     - Cấu hình tự động CC email về hòm thư Outlook của người phụ trách (được chỉ định trên form) nhằm lưu trữ và theo dõi phản hồi.
   * - 4
     - Quản lý trạng thái mail
     - Cập nhật số email đã nhận, mở, lỗi trực tiếp trên giao diện hồ sơ.

3.4 Luồng 3D — Xuất Báo cáo ``[COS-SAM-REC-001]``
--------------------------------------------------------------------

**Mục đích:** Xuất dữ liệu đánh giá và quản lý chiêu binh phục vụ ban Lãnh đạo định kỳ thông qua ứng dụng Báo cáo Excel.

**Các bước:**

.. list-table:: 
   :widths: 5 25 70
   :header-rows: 1

   * - #
     - Bước
     - Mô tả
   * - 1
     - BÁO CÁO SỐ LƯỢNG CV THEO NGÀY
     - Chọn khoảng thời gian và xuất file Excel thống kê số lượng CV ứng viên theo khu vực, kênh tuyển dụng và ngày cập nhật.
   * - 2
     - BÁO CÁO GỬI MAIL MỜI PHỎNG VẤN
     - Thống kê chi tiết số lượt đã gửi email mời phỏng vấn theo khu vực, vị trí công việc qua file Excel định dạng báo cáo quản trị.
   * - 3
     - Tải và xử lý file Excel
     - Tải tệp Excel.

3.5 Luồng 3E — Cấu hình & Phân quyền Hệ thống ``[COS-SAM-REC-006, COS-SAM-REC-007]``
--------------------------------------------------------------------

**Mục đích:** Thiết lập cấu trúc danh mục nền tảng và phân quyền truy cập an toàn cho module giúp hệ thống hoạt động thống nhất.

**Các bước:**

.. list-table:: 
   :widths: 5 25 70
   :header-rows: 1

   * - #
     - Bước
     - Mô tả
   * - 1
     - Cấu hình Danh mục
     - Quản trị viên khởi tạo và cấu hình các danh mục cố định: Level chăm sóc, Khu vực, Trung tâm, Nguồn ứng viên và Trạng thái xử lý.
   * - 2
     - Phân quyền Người dùng
     - Thiết lập quyền hạn "Cán bô" cho nhóm "Nhân sự HCNS" (thao tác hồ sơ, gửi mail, xem báo cáo) và phân quyền kiểm soát cho "Quản trị viên".

4. Quy tắc Nghiệp vụ (Business Rules)
====================================================================

.. list-table:: 
   :widths: 15 60 25
   :header-rows: 1

   * - Mã
     - Quy tắc
     - Áp dụng khi
   * - BR-RCM-01
     - Phải nhập đầy đủ các trường thông tin bắt buộc được cấu hình thì mới cho phép kéo qua trạng thái/level xử lý mới.
     - Chuyển trạng thái ứng viên
   * - BR-RCM-02
     - Khi HCNS gửi mail (qua tự động hoặc wizard), nếu trong khoảng trạng thái hiện tại đã có mail "Đã gửi", phải hiển thị cảnh báo tránh gửi trùng.
     - Gửi email
   * - BR-RCM-03
     - Email gửi đi qua Odoo luôn phải CC tự động về địa chỉ Outlook của trường "Người tuyển dụng".
     - Gửi email
   * - BR-RCM-04
     - Ứng viên tự ứng tuyển từ Web Form mà khu vực, vị trí, hoặc kênh không khớp với Cấu hình hệ thống thì vẫn tạo bình thường nhưng bỏ trống trường đó.
     - Đồng bộ ứng viên tự động

5. Liên kết Nghiệp vụ với Module Khác
====================================================================

.. list-table:: 
   :widths: 20 10 70
   :header-rows: 1

   * - Module
     - Hướng
     - Mô tả nghiệp vụ
   * - Website/Form
     - Form → RCM
     - Đồng bộ tạo hồ sơ ứng viên tự động; Định kỳ lấy danh sách Vị trí, Khu vực, Kênh để làm Data cho Form.
   

6. Thuật ngữ Nghiệp vụ
====================================================================

.. list-table:: 
   :widths: 30 70
   :header-rows: 1

   * - Thuật ngữ
     - Giải thích
   * - Đợt chiêu binh
     - Chu kỳ tổ chức tuyển dụng được gắn mã số mở đợt và quản lý ngày bắt đầu / kết thúc.
   * - Khu vực
     - Phạm vi hoạt động chi nhánh công ty: thường là VP HN, VP TPHCM.
   * - Level
     - Các bước/giai đoạn trong quá trình tuyển dụng (L0 tiếp nhận -> ... -> Ký nhận thử việc).
   * - Tham gia Training / Hội nhập
     - Hoạt động đào tạo văn hóa, quy trình bắt buộc tại công ty.

7. Lịch sử Thay đổi Nghiệp vụ
====================================================================

.. list-table:: 
   :widths: 15 55 30
   :header-rows: 0

   * - Thời gian
     - Thay đổi
     - Tham chiếu
     
