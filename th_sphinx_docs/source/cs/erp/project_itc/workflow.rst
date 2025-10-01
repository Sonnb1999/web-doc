Chi tiết chức năng
------------------

A. Quản lý dự án
~~~~~~~~~~~~~~~~

1. Luồng hoạt động

-	Menu Dự án, giao diện mở ra kanban view các stage và các dự án bên dưới các stage
-   Các dự án đã tạo bên ngoài kanban có thể thấy số lượng task, số lượng task dã/chưa hoàn thành
-	Administrator tạo dự án thông qua giao diện, nhập thông tin tên, giai đoạn của nhiệm vụ( stages) , thẻ (tags), công ty , và gán người tham gia. Dự án mới sẽ được thêm vào giai đoạn đầu tiên của dự án
-   Phần trăm task hoàn thành được tính bởi hàm _compute_th_difficulty_point() qua trường Tính tiến độ (th_difficulty_point_total)
-	Quy định quyền truy cập qua privacy visibility

2. Các hàm liên quan

-	``create`` / ``write``: Tạo bản ghi cập nhật và cập nhật last_update_id của dự án.
-	``unlink``: Xóa bản ghi cập nhật và cập nhật lại last_update_id.
-   ``_compute_th_task_count``: cập nhật thông tin về số lượng công việc cho mỗi dự án. Số lượng công việc đã hoàn thành, công việc không có subtaskm, công việc có subtask.
-   ``_compute_th_difficulty_point``: tính phần trăm task hoàn thành


B. Quản lý nhiệm vụ
~~~~~~~~~~~~~~~~~~~

1. Tạo giai đoạn
^^^^^^^^^^^^^^^^
1.1. Luồng hoạt động

-	Người dùng có thể tạo/thêm/sửa giai đoạn nhiệm vụ.
-   Khi chỉnh sửa giai đoạn, người dùng có thể sửa tên, email,..., chọn nhóm người để giao, chọn là ngày hoàn thanh hay kết thúc
-   Có các trường Boolean:
    +   Giai đoạn của ITC
    +   Ghi nhận thời gian bắt đầu
    +   Là giai đoạn hoàn thành

1.2. Các hàm liên quan

2. Tạo task
^^^^^^^^^^^
1. Luồng hoạt động

-	Khi bấm vào một dự án sẽ mở ra các nhiệm vụ của dự án đó và các các nhiệm vụ được xếp theo các giai đoạn trên kanban
-	Người dùng có thể tạo/chỉnh sửa nhiệm vụ: nhập thông tin tên nhiệm vụ, người thực hiện, người kiểm thử, ngày, giờ thực hiện, độ khó và thẻ của nhiệm vụ
-	Người dùng có thể tạo nhiệm vụ bug.
-	Nhiệm vụ liên kết với test case và nhiệm vụ bug.

2. Các hàm liên quan
    
-   ``create``: tạo task
-   ``_compute_th_domain_user``: Lấy danh sách thành viên và người quản lý từ các nhóm dev và nhóm kiểm thử.
-	``action_confirm``: Lưu trữ  giai đoạn và nhiệm vụ liên quan.
-	``action_unlink``: Xóa giai đoạn nhiệm vụ.
-	``action_unarchive_task``: Khôi phục nhiệm vụ không hoạt động.
-   ``action_th_create_task_bug``: Nút tạo nhiệm vụ bug

3. Chuyển giai đoạn task
^^^^^^^^^^^^^^^^^^^^^^^^
3.1. Luồng hoạt động

-	Trang task form, có thể thấy các giai đoạn của task.
-   Nếu giai đoạn tiếp đánh dấu là "giai đoạn bắt đầu", cần phân công người thực hiện trước khi đổi giai đoạn
-   Nếu giai đoạn là ngày bắt đầu/ kết thức, hệ thống ghi nhận và cập nhật thời gian bắt đầu/ kết thức

3.2. Các hàm liên quan

-   ``th_onchange_check_stage_id``: kiểm tra task đã được gán người thực hiện chưa
-   ``_onchange_th_date_kpi_user``: Kiểm tra ngày bắt đầu và hoàn thành
-   ``_onchange_th_date_kpi_tester``: tương tự hàm trên nhưng cho bên kiểm thử

4. Ghi nhận thời gian làm việc
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4.1. Luồng hoạt động

-   Trong form nhiệm vụ, có page Bảng chấm công, có thể setup giờ phan bổ
-	Khi task chuyển sang giai đoạn nhiệm vụ có đánh dấu "giai đoạn bắt đầu", hệ thống lưu và bắt đầu tính thời gian.
-	Có thể “Tạm dừng” và “Tiếp tục”
-   Mỗi khi bắt đầu tính thời gian hay tiếp tục, hệ thống sẽ cập nhật ngày thực hiện(th_date_run_task_ex) trên form của nhiệm vụ.
-   Trên menu Dự án > "Nhiệm vụ hôm nay" sẽ hiển thị những nhiệm vụ có ngày thực hiện(th_date_run_task_ex) là hôm nay
-   Sau khi đổi giai đoạn, hệ thống sẽ lưu trữ thời gian vào bảng chấm công. Tính toán và hiển thị thời gian đã đùng và còn lại


4.2. Các hàm liên quan

-   ``_compute_th_effective_hours``: tính tổng thời gian thực hiện
-   ``_compute_th_progress``: tính toán tiến độ công việc dựa trên tỷ lệ giữa giờ thực tế và giờ dự kiến
-   ``_compute_th_remaining_hours``: Hàm này giúp theo dõi số giờ còn lại để hoàn thành
-   ``action_timer_start``: bắt đầu ghi nhận thời gian
-   ``action_timer_stop``: kết thúc ghi nhận thời gian
-   ``_onchange_stage_id``: kích hoạt hàm action_timer_start, action_timer_stop để bắt đầu/ dừng khi đổi giai đoạn
-   ``action_timer_pause``: dừng thời gian khi bấm nút tạm dừng
-   ``action_timer_resume``: tiếp tục thời gian khi bấm nút tiếp tục


C. Quản lý testcase
~~~~~~~~~~~~~~~~~~~

1. Luồng hoạt động

-   Vào menu quản lý testcase
-	Người quản lý testcase có thể tạo test case với thông tin như ID, mô tả, các bước, kết quả mong muốn, dữ liệu test, và trạng thái (Passed, Failed, Processing, Done).
-	Test case liên kết với nhiệm vụ gốc (th_project_task_id) và người kiểm thử (th_user_test_ids).
-	Người dùng có thể tạo nhiệm vụ bug trực tiếp ở testcase và theo dõi qua smart button
-   Có thể tạo nhiệm vụ bug liên kết trực tiếp từ testcase: Vào task bị lỗi, ấn tạo bug và điền thông tin, Khi tạo thành công, hệ thống sinh task mới thuộc dự án là nhiệm vụ phụ của task bug.Chỉnh sửa page Testcase để thêm test case cho task bug. Testcase được tạo sẽ sinh record tương ứng trong menu TestCase.

2. Các hàm liên quan

-	``action_th_create_task_bug()`` – Tạo nhanh nhiệm vụ bug.
-	``action_view_task_bug()`` – Mở nhanh nhiệm vụ bug tương ứng.
-   ``action_view_task_original()`` – Quay lại nhiệm vụ gốc từ bug.
-	``action_open_testcase()`` – Mở testcase ở chế độ form.

D. Theo dõi deadline chi tiết
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Luồng hoạt động

-	Trong form nhiệm vụ, vào tiến độ tạo deadline: nhập giai đoạn bắt đầu, ngày bắt đầu, ngày kết thúc dự kiến.
-   Hệ thống sẽ cập nhật hạn chót công việc(date_deadline) theo ngày kết thúc dự kiến của tiến độ.
-   Khi Nhiệm vụ chuyển giai đoạn, hệ thống sẽ ghi nhận thời gian bắt đầu thực tế và khi chuyển giai đoạn lần nữa, hệ thống ghi nhận thời gian kết thúc thực tế (hiện trị trên form của task qua trường Hạn chót) và tự động tính kết quả (nhanh/chậm/đúng tiến độ)

2. Các hàm liên quan

-	``_compute_th_evaluate_type()`` – Phân loại tiến độ (nhanh, đúng tiến độ, chậm)
-	``_compute_date_deadline()`` – Hiển thị deadline tổng quan.
-   ``write()``: Cập nhật ngày thực tế, đăng thông báo khi cần.

E. Phân công theo đội nhóm
~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Luồng hoạt động

-   Tạo đội dự án trong menu Cấu hình > Đội nhóm:
    +	Admin dùng tạo đội với tên, loại đội (Lập trình, Kiểm thử, Dự án), trưởng nhóm, và các thành viên
-   Phân công nhiệm vụ:
    +	Nhiệm vụ được phân công cho người thực hiện hoặc người kiểm thử thông qua wizard.

2. Các hàm liên quan

-	``action_assign_to_me()`` – Phân công thông minh theo vai trò.
-   ``_compute_th_project_team_id``:  Hàm này giúp tự động xác định các đội nhóm liên quan đến công việc hoặc dự án dựa trên người dùng được phân công
-	Wizard th.task.assign – Giao diện chọn nhóm khi người dùng thuộc nhiều nhóm.
-   ``_compute_th_domain_user``: Hàm này sẽ giúp hệ thống có thể dễ dàng lọc các người dùng dựa trên đội nhóm của họ

F. Chia sẻ với cộng tác viên
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1.  Luồng hoạt động

-	Dự án đánh dấu là chia sẻ qua portal (privacy_visibility = 'portal').
-	Thêm cộng tác viên bằng gán portal user thông qua collaborator_ids.
-	Portal user truy cập module portal để xem dự án và nhiệm vụ tương ứng

2. Các hàm liên quan

-	``_add_collaborators``: Thêm cộng tác viên vào dự án.
-   ``action_open_ratings``: đánh giá

G. Ghi nhận thời gian làm việc
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Luồng hoạt động

-	Người dùng bấm “Bắt đầu” → hệ thống lưu và bắt đầu tính thời gian
-	Có thể "Tạm dừng" và "Tiếp tục"
-   Sau khi đổi giai đoạn, hệ thống sẽ lưu trữ thời gian vào bảng chấm công

2. Các hàm liên quan

-	``action_timer_start()``, ``action_timer_stop()`` – Bắt đầu và dừng timer.
-	``action_timer_pause()``, ``action_timer_resume()`` – Điều khiển trạng thái làm việc.
-	``_get_minutes_spent()`` – Tính thời gian thực tế.


H. Báo cáo & Phân tích
~~~~~~~~~~~~~~~~~~~~~~

i. Xuất báo cáo dev

    1. Luồng hoạt động

        -   Vào menu Báo cáo, chọn Xuất báo cáo dev, popup sẽ có nút xuất.
        -   Chọn loại (Đội/ Nhân viên), chọn ngày bắt đầu và kết thúc, hệ thống sẽ lọc theo ngày hoàn thành lập trình của nhiệm vụ
        -   Xuất Excel nhiệm vụ theo đội: hiển thị STT, người phân công, dự án, tag nhiệm vụ, tên nhiệm vụ, số nhiệm vụ hoàn thành, deadline, thời gian thực hiện, Đánh giá, Ngày hoàn thành thực tế, Thời gian thực hiện, Độ khó.
        -   Xuất Excel nhiệm vụ theo nhân viên: Dự án, Tag nhiệm vụ, Tên nhiệm vụ, Viết task, Thực hiện, Bug, Đánh giá, Deadline, Ngày hoàn thành thực tế, Thời gian thực hiện, Độ khó


    2. Các hàm liên quan

        -	``action_export_member_task``: Khởi tạo action báo cáo nhiệm vụ Excel.
        -	``generate_xlsx_report``: Tạo file Excel chi tiết nhiệm vụ với phân cấp.

ii. Xuất báo cáo testcase

    1. Luồng hoạt động

        -   Vào menu Báo cáo, chọn Xuất báo cáo testcase, popup sẽ có nút xuất.
        -   Chọn loại (Đội/ Nhân viên), chọn dự án, chọn ngày bắt đầu và kết thúc, hệ thống sẽ lọc theo ngày tạo và dự án được chọn của đội/ nhân viên đó
        -   Xuất Excel báo cáo test case: hiện thị STT, Dự án, Tên task, Số lượng testcase,	Số lượng pass, Số lượng fail


    2. Các hàm liên quan
        -	``action_export_report_testcase``: Khởi tạo báo cáo test case tổng quan.
        -	``generate_xlsx_report``: Tạo file Excel testcase.

iii. Xuất báo cáo chi tiết test case

    1. Luồng hoạt động
        -   Vào menu Báo cáo, chọn Xuất báo cáo chi tiết test case, mỗi popup sẽ có nút xuất.
        -   Chọn loại (Đội/ Nhân viên), chọn ngày bắt đầu và kết thúc, hệ thống sẽ lọc theo ngày tạo và đội/ nhân viên đã chọn
        -   Xuất Excel báo cáo chi tiết testcase: hiện thị tên nguời kiểm thử và tổng số test case của họ

    2. Các hàm liên quan
        -   ``action_export_report_detail``: xuất báo cáo chi tiết test case
        -	``generate_xlsx_report``: Tạo file Excel chi tiết testcase.

iv. Phân tích nhiệm vụ

    1. Luồng hoạt động

        -   Vào menu Báo cáo, chọn Phân tích nhiệm vụ
        -   Chọn đội muốn phân tích, chọn dự án
        -	Phân tích nhiệm vụ cung cấp dữ liệu phân tích qua giao diện Pivot/Graph.

    2. Các hàm liên quan

        -	``th_action_task_analysis``: Tạo action phân tích nhiệm vụ qua Pivot/Graph.

O. Cấu hình
~~~~~~~~~~~

Menu cấu hình chỉ có thể xem bởi quản trị viên

- Dự án: Cấu hình dự án mở ra list view, có thể thêm, chỉnh sửa dự án. Có thể chia sẻ dự án, gửi đến mail. Phải phân công người tham gia thì task mới có thể gán người thực hiện hoặc kiểm thử
- Đội nhóm: Cấu hình chỉnh sửa đội nhóm. Có thể cấu hình đó là đội nhóm gì (kiểm thử, dev, dự án), phân trưởng nhóm và các thành viên. Phải tạo đội nhóm hệ thống mới nhận biết đó là dev hay người kiểm thử
- Giai đoạn nhiệm vụ: Cấu hình tất cả giai đoạn nhiệm vụ của các dự án
- Thẻ: Cấu hình các thẻ
- Giai đoạn dự án: Cấu hình các giai đoạn của dự án
- Kiểu hoạt động: Cấu hình các hoạt động
- Độ khó: Cấu hình độ khó (tên, KPI)
