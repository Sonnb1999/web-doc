Mở rộng
=======

Tổng quan
---------

**Kế thừa module**:

- ``base``
- ``helpdesk``
- ``documents_spreadsheet``
- ``mail``
- ``th_setup_parameters``
- ``th_maintenance``

**Mục tiêu**:

Module ``th_helpdesk`` mở rộng module gốc ``helpdesk`` nhằm chuẩn hoá quy trình xử lý yêu cầu hỗ trợ nội bộ / bên ngoài, bổ sung phân tầng phân loại (Khu vực hỗ trợ → Danh mục → Đặc điểm → Chủ đề), SLA động theo nhiều tiêu chí, cơ chế chuyển giao / escalete, chấm điểm hài lòng tự động đóng ticket, ghi nhận thời gian thực thi, gom nhóm quyền hiển thị, và tăng cường báo cáo phân tích.

Chức năng chỉnh sửa
-------------------

1. Quản lý Ticket (HelpdeskTicket)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**: ``helpdesk.ticket``

**Mục đích kế thừa**:

- Bổ sung trường phân loại mở rộng (khu vực, danh mục, đặc điểm, chủ đề) và loại ticket (internal / external).
- Gắn SLA động ngay khi tạo và tự động cập nhật khi đổi đội / phân loại.
- Tính thời gian thực thi (in progress hours) và ngày giải quyết.
- Quản lý chuyển giao, escalete, rating và tự động cập nhật stage cuối khi thỏa điều kiện.
- Kiểm soát domain động cho người xử lý, chủ đề theo loại ticket / nhà cung cấp.

**Logic hoặc hàm thay đổi**:

- ``create`` (api.model_create_multi): Sau khi tạo: tìm SLA phù hợp theo (team, type, category, topic) -> gán ``th_sla_deadline_ids``; cập nhật ``res_id`` cho tệp đính kèm.
- ``write``: Ghi log thay đổi mô tả; cập nhật mốc thời gian ``th_in_progress_date`` / ``th_solved_date`` theo stage; tính lại SLA khi đổi ``team_id``; tự subscribe người xử lý mới (``th_user_id``).
- ``_notify_th_user_id`` (api.constrains): Lên lịch activity thông báo cho user được giao khi thay đổi ``th_user_id``.
- ``_compute_user_and_stage_ids_th``: Đồng bộ ``user_id`` chuẩn với ``th_user_id`` và xác định stage khởi tạo hợp lệ của team.
- ``compute_th_in_progress_hours``: Tính tổng giờ thực thi trừ Chủ nhật và trừ 4 giờ cho Thứ bảy (nửa ngày) dựa vào khoảng từ bắt đầu in progress đến solved.
- ``_compute_th_sla_deadline``: Tính hạn SLA gần nhất dựa tổng giờ SLA, ngày tạo và quy tắc bỏ qua cuối tuần / xử lý thứ bảy.
- ``compute_x_ticket_rating``: Lấy rating mới nhất vào trường tổng hợp.
- ``change_to_maintenace``: Tạo phiếu sửa chữa liên kết khi chuyển ticket sang khối bảo trì.
- ``check_team_id_check_user`` / ``onchange_team_id_check_user``: Kiểm tra team có thành viên trước khi gán.
- ``onchange_th_type_ticket_and_th_help_category`` / ``onchange_th_help_provider_id`` / ``onchange_th_topic_th`` / ``onchange_th_help_topic`` / ``onchange_th_type_ticket``: Chuỗi onchange điều chỉnh domain và reset giá trị không hợp lệ khi thay đổi phân loại.
- ``compute_th_check_groups``: Xác định quyền hiển thị trường / nút dựa nhóm quản lý hoặc admin team.
- ``compute_th_check_user_assign_to``: Đánh dấu người dùng hiện tại có phải người được giao.
- ``compute_th_is_deadline_user`` / ``compute_th_is_deadline_assignees``: Kiểm tra quyền chỉnh sửa deadline tương ứng.
- ``compute_x_is_ticket_seeker``: Xác định người mở ticket.
- ``_compute_th_check_helpdesk_normal_user``: Ẩn bớt quyền nếu user thuộc nhóm helpdesk chuẩn.
- ``_schedule_escalate_sla_th``: Cron escalete khi đến ngày hết hạn SLA (chuyển người xử lý, tạo bản ghi chuyển giao với lý do hết hạn).

**View / Action / Menu** (liệt kê chính):

- Views: ``th_helpdesk_tickets_view_tree``, ``th_helpdesk_ticket_view_form``, ``th_helpdesk_tickets_view_search``, ``aum_helpdesk_ticket_view_kanban``.
- Actions: ``helpdesk.helpdesk_ticket_action_main_my``, ``helpdesk.helpdesk_ticket_action_main_tree``, ``aum_helpdesk_ticket_view_tree_action``.
- Cron: ``th_schedule_escalate_sla_th``.
- Menus: phân hệ Helpdesk (My Tickets, All, Reports, SLA, Team Dashboard...).

2. Giai đoạn xử lý (HelpdeskStage)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**: ``helpdesk.stage``

**Mục đích kế thừa**:

- Chuẩn hoá các nhóm stage logic: New, In Progress, Solved, Test, Close.
- Gắn cờ nhận diện stage đầu / cuối để điều kiện hoá giao diện và tự động cập nhật ngày.
- Ràng buộc không trùng loại stage theo team.

**Logic hoặc hàm thay đổi**:

- Thêm trường: ``x_is_done_stage``, ``x_is_new_stage``, ``th_ticket_stage``.
- ``_constraint_th_ticket_stage``: Đảm bảo mỗi giá trị ``th_ticket_stage`` xuất hiện duy nhất (theo điều kiện đọc nhóm) tránh cấu hình dư thừa.

**View / Action / Menu**:

- View form kế thừa: ``aum_helpdesk_stage_view_form``.

3. Đội hỗ trợ (HelpdeskTeam)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**: ``helpdesk.team``

**Mục đích kế thừa**:

- Phân tách loại ticket (internal / external) và gán administrator có quyền đặc thù.
- Mặc định bật auto assignment.

**Logic hoặc hàm thay đổi**:

- Trường thêm: ``th_type_ticket``, ``th_administrator``, ``auto_assignment``.
- ``_domain_th_administrator``: Domain động lọc user thuộc nhóm ``group_helpdesk_care_manager``.

**View / Action / Menu**:

- View form team: ``helpdesk_team_view_form``.

4. Báo cáo phân tích Ticket (HelpdeskTicketReportAnalysis)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**: ``helpdesk.ticket.report.analysis``

**Mục đích kế thừa**:

- Bổ sung chỉ số SLA deadline, thời gian thực thi, điểm hài lòng vào báo cáo pivot / search.

**Logic hoặc hàm thay đổi**:

- Thêm trường: ``x_ticket_rating``, ``th_in_progress_hours``, ``th_sla_deadline``.
- ``_select``: Mở rộng câu lệnh SELECT để join thêm cột từ ``helpdesk.ticket``.

**View / Action / Menu**:

- Views: ``aum_helpdesk_ticket_report_analysis_view_search``, ``th_helpdesk_ticket_view_pivot_analysis``.
- Action: ``helpdesk.helpdesk_ticket_analysis_action``.

5. Gom nhóm quyền (ResGroups)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**: ``res.groups`` (ghi đè hàm phục vụ UI cấu hình quyền)

**Mục đích kế thừa**:

- Hiển thị nhóm quyền Helpdesk dạng lựa chọn (selection) thay vì checkbox rời, giúp gọn cấu hình.

**Logic hoặc hàm thay đổi**:

- ``get_groups_by_application``: Chèn logic nếu ``app.xml_id == 'base.module_category_services_helpdesk'`` thì ép kiểu hiển thị ``selection``.

6. SLA Deadline & Tính SLA
~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model mới**: ``th.sla.deadline``

**Mục đích**:

- Khai báo chính sách SLA theo nhiều tiêu chí (team, loại ticket, danh mục, chủ đề) với số giờ tích luỹ.
- Ticket sẽ gom tất cả bản ghi phù hợp để tính ra deadline gần nhất.

**Logic hoặc hàm thay đổi liên quan (ở ticket)**: ``_compute_th_sla_deadline`` (mô tả ở phần 1) xử lý cộng dồn giờ, loại trừ cuối tuần, điều chỉnh thứ bảy / Chủ nhật.

**View / Action / Menu**:

- Views: ``th_x_sla_deadline_view_tree``, ``th_x_sla_deadline_view_form``.
- Action: ``th_x_sla_deadline_view_act``.

7. Chuyển giao / Escalete Ticket (Transferred)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model mới**: ``th.transferred``

**Mục đích**:

- Ghi nhận lịch sử chuyển giao hoặc escalete, thay đổi người xử lý / đội phù hợp, lưu lý do.
- Hỗ trợ escalete tự động khi đến hạn SLA thông qua cron.

**Logic hoặc hàm thay đổi**:

- ``onchange_th_help_topic``: Đồng bộ team theo chủ đề.
- ``onchange_th_team_id``: Reset chủ đề khi team không khớp; áp domain người nhận.
- ``action_add``: Áp dữ liệu chuyển giao vào ticket (team, user, phân loại).
- Cron liên quan: ``_schedule_escalate_sla_th`` (trong ticket) tạo bản ghi chuyển giao escalete.

**View / Action / Menu**:

- View form wizard: ``th_x_transferred_view_form``.
- Action: ``th_x_transferred_view_act``.

8. Đánh giá (Helpdesk Rating)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model mới**: ``x.helpdesk.rating``

**Mục đích**:

- Thu thập rating người dùng và tự động đẩy ticket sang stage kết thúc khi đạt mức (1,2,3) – coi như hài lòng đủ.
- Liên kết team & người xử lý tại thời điểm đánh giá.

**Logic hoặc hàm thay đổi**:

- ``create``: Nhúng team / user từ ticket; nếu rating thuộc {1,2,3} -> tìm stage cuối của team và cập nhật ticket; đặt ``th_readonly``.
- ``write``: Khi đổi rating sang mức hài lòng {1,2,3} -> cập nhật stage tương tự.
- Helpers: ``_get_next_stage`` (lấy stage cuối theo team), ``_update_ticket_stage`` (cập nhật stage ticket).
- Ticket buttons: ``button_add_rating`` mở wizard; ``action_view_ticket_rating`` xem rating ở chế độ readonly.

**View / Action / Menu**:

- Views: ``aum_x_helpdesk_rating_view_form``, ``aum_x_helpdesk_rating_view_pivot``.
- Action: ``aum_x_helpdesk_rating_view_act``.
- Menu: Báo cáo Rating (nằm trong nhóm menu báo cáo ticket).

9. Phân loại khu vực & danh mục mở rộng
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model mới**: ``th.support.area``, ``th.category.characteristic`` và các mở rộng danh mục/chủ đề ``th.helpdesk.category``, ``th.help.topic`` (thêm view / quan hệ).

**Mục đích**:

- Thêm lớp Khu vực → Danh mục → Đặc điểm → Chủ đề giúp điều hướng chính xác nhóm xử lý, tạo domain chọn lọc.
- Hỗ trợ action xem nhanh danh mục theo khu vực.

**Logic hoặc hàm thay đổi**:

- ``th.support.area.th_action_view_helpdesk_category``: Mở action danh mục đã filter sẵn.
- Ràng buộc SQL: Unique tên cho ``th.support.area`` và ``th.category.characteristic``.

**View / Action / Menu**:

- Views khu vực: ``th_support_area_tree_view``, ``th_support_area_form_view``, ``th_support_area_kanban_view``.
- Actions: ``th_support_area_kanban_action``, ``th_support_area_action``.
- Views đặc điểm: ``th_category_characteristic_tree_view``, ``th_category_characteristic_form_view``.
- Action: ``th_category_characteristic_action``.
- Views danh mục & chủ đề: ``th_helpdesk_category_view_tree``, ``th_helpdesk_category_view_form``, ``th_helpdesk_topic_view_tree``.
- Actions: ``th_helpdesk_category_act``, ``th_helpdesk_topic_act``.

10. Dashboard, Tìm kiếm, Menu & Khác
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Mục đích**:

- Sửa đổi kanban, search domain mở rộng, báo cáo pivot, biểu mẫu cấu hình.
- Gom các menu báo cáo (analysis, rating, SLA) và cấu hình (stage, team, SLA policies,...).

**Thành phần chính**:

- Category: ``helpdesk_category_view_kanban``, ``helpdesk_category_dashboard_action_main``.
- Ticket Kanban: ``aum_helpdesk_ticket_view_kanban``.
- Search view bổ sung filter: ``th_helpdesk_tickets_view_search``.
- Báo cáo: ``th_helpdesk_reports.xml``, ``th_helpdesk_template.xml``.
- Provider Units: ``th_help_provider_unit_view_tree``, ``th_help_provider_unit_view_form`` (action ``th_help_provider_unit_view_act``).

View / Action / Menu (Tổng quan)
--------------------------------

- **Views** : Ticket (tree/form/kanban/search), Stage form, Team form, SLA (tree/form), Transferred form, Rating (form/pivot), Phân loại (khu vực / danh mục / đặc điểm / chủ đề), Báo cáo phân tích, Provider Units.
- **Actions**: Ticket actions, Analysis, Rating, SLA, Category dashboard, Khu vực, Đặc điểm, Transferred, Provider Units.
- **Menus**: Menu Helpdesk mở rộng: Ticket của tôi, Tất cả, Dashboard đội, Báo cáo (Analysis, Rating, SLA), Cấu hình (Teams, Stages, SLA Policies, Categories, Areas, Characteristics, Provider Units).
- **Cron**: ``th_schedule_escalate_sla_th`` (kiểm tra & escalete SLA đến hạn).
