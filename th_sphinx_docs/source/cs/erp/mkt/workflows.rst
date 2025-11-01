Chi tiết chức năng
----------------------------

A.  Lên dự án với cấp GD/PGD
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Quản lý giai đoạn dự án
^^^^^^^^^^^^^^^^^^^^^^^^^^
    1.1. Luồng hoạt động
        -	Bấm vào Menu cấu hình -> Giai đoạn dự án -> Hiển thị danh sách giai đoạn dự án dưới dạng List view.
        -   Để xem chi tiết một giai đoạn dự án cần chuyển chế độ xem từ List view -> Kanban view, sau đó ấn vào giai đoạn muốn xem. Màn hình Form view chứa tất cả thông tin chi tiết giai đoạn dự án sẽ hiện ra. 
        -   Người dùng tạo mới, sửa hoặc xóa giai đoạn dự án ngay trên giao diện. Khi nhập mới cần đầy đủ các thông tin cần thiết như tên giai đoạn, thứ tự,...

    1.2. Các hàm liên quan
        -	``create``: Tạo giai đoạn dự án.
        -	``write``: Cập nhật giai đoạn dự án.
        -	``unlink``: Xóa giai đoạn dự án.


2. Quản lý đội nhóm MKT
^^^^^^^^^^^^^^^^^^^^^^^
    2.1. Luồng hoạt động
        -	Bấm vào Menu cấu hình -> Đội nhóm MKT -> Hiển thị danh sách đội nhóm Marketing dưới dạng List view.
        -   Người dùng tạo mới, sửa hoặc xóa đội nhóm ngay trên giao diện. Khi nhập mới cần đầy đủ các thông tin cần thiết như tên nhóm, quản lý, các thành viên,...
        -   Khi tạo mới đội nhóm MKT nếu gán nhóm cha thì sẽ chỉ gán được thành viên là các thành viên của nhóm cha đó.
        -   Tên hiển thị (display_name) của đội nhóm sẽ hiển thị trên Form view theo phân cấp: display_name = {tên nhóm cha}/{tên nhóm con}/{...}

    2.2. Các hàm liên quan
        -	``create``: Tạo đội nhóm.
        -	``write``: Cập nhật đội nhóm.
        -	``unlink``: Xóa đội nhóm.
        -	``_compute_complete_name``: Tính tên hiển thị cho bản ghi theo phân cấp.
        -	``_compute_domain_parent_members``: Tính domain chọn thành viên theo đội cha.


3. Quản lý dự án
^^^^^^^^^^^^^^^^
    3.1. Luồng hoạt động
        -	Bấm vào Menu dự án, hiển thị danh sách dự án gồm: tên, ngày bắt đầu, ngày kết thúc và người phụ trách. 
        -   Danh sách được hiển thị dưới dạng Kanban view theo từng giai đoạn đã cấu hình.
        -   Để xem chi tiết một dự án cần chuyển chế độ xem từ Kanban view -> List view, sau đó ấn vào dự án muốn xem. Màn hình Form view chứa tất cả thông tin chi tiết dự án sẽ hiện ra.
        -	Người dùng tạo mới, sửa hoặc xóa dự án ngay trên giao diện. Khi nhập mới cần đầy đủ các thông tin cần thiết như tên dự án, ngày theo kế hoạch, người phụ trách,...

    3.2. Các hàm liên quan
        -	``create``: Tạo dự án.
        -	``write``: Cập nhật dự án.
        -	``unlink``: Xóa dự án.


4. Chuyển giai đoạn dự án
^^^^^^^^^^^^^^^^^^^^^^^^^
    4.1. Luồng hoạt động
        -   Chuyển giai đoạn dự án bằng các kéo thả kanban dự án sang giai đoạn khác trên Kanban view.
    4.2. Các hàm liên quan



B.	Lập kế hoạch cho dự án ở cấp trưởng nhóm dự án
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Quản lý giai đoạn nhiệm vụ
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    1.1. Luồng hoạt động
        -	Bấm vào Menu cấu hình -> Giai đoạn nhiệm vụ -> Hiển thị danh sách giai đoạn nhiệm vụ dưới dạng List view.
        -   Để xem chi tiết một giai đoạn nhiệm vụ, trên List view ấn vào giai đoạn muốn xem -> Màn hình Form view chứa tất cả thông tin chi tiết giai đoạn nhiệm vụ sẽ hiện ra. 
        -   Người dùng tạo mới, sửa hoặc xóa giai đoạn nhiệm vụ ngay trên giao diện. Khi nhập mới cần đầy đủ các thông tin cần thiết như tên giai đoạn, thứ tự,...

    1.2. Các hàm liên quan
        -	``create``: Tạo giai đoạn dự án.
        -	``write``: Cập nhật giai đoạn dự án.
        -	``unlink``: Xóa giai đoạn dự án.


2. Quản lý nhiệm vụ
^^^^^^^^^^^^^^^^^^^
    2.1. Luồng hoạt động
        -	Bấm vào Menu nhiệm vụ, danh sách nhiệm vụ được hiển thị dưới dạng Kanban view theo từng giai đoạn đã cấu hình. Danh sách nhiệm vụ gồm: tên, ngày bắt đầu, ngày kết thúc.
        -	Người dùng cũng có thể xem danh sách nhiệm vụ theo dự án bằng cách chọn dự án mong muốn trên Kanban view dự án.
        -   Để xem chi tiết một nhiệm vụ, ấn vào nhiệm vụ muốn xem -> Màn hình Form view chứa tất cả thông tin chi tiết dự án sẽ hiện ra.
        -	Người dùng tạo mới, sửa hoặc xóa nhiệm ngay trên giao diện. Khi nhập mới cần đầy đủ các thông tin cần thiết như tên nhiệm vụ, ngày theo kế hoạch, ngày bắt đầu, người phân công, các chỉ tiêu,...   

    2.2. Các hàm liên quan
        -	``create``: Tạo nhiệm vụ.
        -	``write``: Cập nhật nhiệm vụ.
        -	``unlink``: Xóa nhiệm vụ.
        -   ``_onchange_th_mkt_project_id``: Tính domain chọn thành viên thực hiện nhiệm vụ trong danh sách thành viên của dự án nếu có.
        -   ``action_start_task``: Ghi nhận thời gian bắt đầu làm nhiệm vụ.


3. Chuyển giai đoạn nhiệm vụ
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    3.1. Luồng hoạt động
        -   Chuyển giai đoạn nhiệm vụ bằng các kéo thả kanban nhiệm vụ sang giai đoạn khác trên Kanban view hoặc bấm nút thủ công trên Form view dự án.
        -	Khi nhiệm vụ đã chuyển đến giai đoạn chỉ định sẽ gửi Email thông báo đến quản lý. Cấu hình để gửi email cho giai đoạn nhiệm vụ bằng cách tích "Gửi email" trên Form view giai đoạn nhiệm vụ.
    
    3.2. Các hàm liên quan
        -   ``action_send_email``: Gửi mail cho quản lý khi nhiệm vụ tới 1 giai đoạn nhất định.


4. Quản lý bảng ghi nhận chi phí chi tiêu
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    4.1. Luồng hoạt động
        -	Bấm vào Dự án -> Chọn nhiệm vụ -> Hiển thị chi tiết nhiệm vụ dưới dạng Form view.
        -   Ấn tab "Bảng ghi nhận chi phí chi tiêu" để xem danh sách danh sách chi tiêu của nhân sự theo kênh của nhiệm vụ đó. 
        -   Người dùng tạo mới, sửa hoặc xóa bản ghi của bảng ghi nhận chi phí chi tiêu. Khi nhập mới cần đầy đủ các thông tin cần thiết như thời gian, kênh, nhận sự, loại chi tiêu, chi phí,...
    
    4.2. Các hàm liên quan
        -	``create``: Tạo bản ghi mới.
        -	``write``: Cập nhật bản ghi.
        -	``unlink``: Xóa bản ghi.


5. Quản lý chỉ tiêu theo triển khai
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    4.1. Luồng hoạt động
        -	Bấm vào Dự án -> Chọn nhiệm vụ -> Hiển thị chi tiết nhiệm vụ dưới dạng Form view.
        -   Ấn tab "Kênh triển khai" để xem danh sách danh sách chỉ tiêu theo từng kênh của nhiệm vụ đó. 
        -   Người dùng tạo mới, sửa hoặc xóa bản ghi của bảng chỉ tiêu theo kênh triển khai. Khi nhập mới cần đầy đủ các thông tin cần thiết như kênh, chỉ tiêu L0, L2, L5B mới, L5B lũy kế, L8, ngân sách.
    
    4.2. Các hàm liên quan
        -	``create``: Tạo bản ghi mới.
        -	``write``: Cập nhật bản ghi.
        -	``unlink``: Xóa bản ghi.
        -   ``_compute_th_total_l5b``: Tính chỉ tiêu L5B tổng = L5B mới + L5B lũy kế.
        -   ``_onchange_th_channel``: Lọc kênh có trong dự án.



C.	Báo cáo thống kê
~~~~~~~~~~~~~~~~~~~~

1. Xuất báo cáo theo kênh triển khai
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    1.1. Luồng hoạt động
        -   Vào menu Báo cáo -> Chọn "Báo cáo theo kênh triển khai" -> Popup sẽ có nút xuất.
        -   Chọn dự án, kênh triển khai tự động theo dự án, chọn ngày bắt đầu và kết thúc.
        -   Xuất báo cáo Excel gồm: Kênh triển khai, Kế hoạch triển khai (L0, L2, L5B mới, L5B lũy kế, L5B tổng, Ngân sách), Thực đạt kế hoạch (L0, L2, L5B mới, L5B lũy kế, L5B tổng, Chi phí) và Tiến độ thực hiện (L0, L2, L5B mới, L5B lũy kế, L5B tổng, %Ngân sách đã chi tiêu).

    1.2. Các hàm liên quan
        -	``action_export_report_channel``: Khởi tạo action báo cáo Excel.
        -	``generate_xlsx_report``: Tạo file Excel báo cáo theo kênh triển khai.


2. Xuất báo cáo theo chương trình sử dụng các trường theo mẫu báo cáo kênh triển khai 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    2.1. Luồng hoạt động
        -   Vào menu Báo cáo -> Chọn "Báo cáo theo kênh triển khai theo chương trình" -> Popup sẽ có nút xuất.
        -   Chọn dự án, kênh triển khai tự động theo dự án, chương trình, chọn ngày bắt đầu và kết thúc.
        -   Xuất báo cáo Excel gồm: Kênh triển khai, Kế hoạch triển khai (L0, L2, L5B mới, L5B lũy kế, L5B tổng, Ngân sách), Thực đạt kế hoạch (L0, L2, L5B mới, L5B lũy kế, L5B tổng, Chi phí) và Tiến độ thực hiện (L0, L2, L5B mới, L5B lũy kế, L5B tổng, %Ngân sách đã chi tiêu).

    2.2. Các hàm liên quan
        -	``action_export_report_channel_program``: Khởi tạo action báo cáo Excel.
        -	``generate_xlsx_report``: Tạo file Excel báo cáo theo kênh triển khai theo chương trình.


3. Xuất báo cáo nhân sự triển khai 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    3.1. Luồng hoạt động
        -   Vào menu Báo cáo -> Chọn "Báo cáo nhân sự" -> Popup sẽ có nút xuất.
        -   Chọn kênh triển khai, chọn ngày bắt đầu và kết thúc.
        -   Xuất báo cáo Excel gồm: Kênh triển khai, Kế hoạch triển khai (L0, L2, L5B mới, L5B lũy kế, L5B tổng, Ngân sách), Thực đạt kế hoạch (L0, L2, L5B mới, L5B lũy kế, L5B tổng, Chi phí) và Tiến độ thực hiện (L0, L2, L5B mới, L5B lũy kế, L5B tổng, %Ngân sách đã chi tiêu).

    3.2. Các hàm liên quan
        -   ``_get_data_from_crm``: Lấy thực tế dữ liệu CRM (L0, L2, L5B…) của một nhân sự trong khoảng thời gian được chọn.
        -   ``action_export_excel``: Gom dữ liệu từ nhiều bảng, xử lý quyền người dùng, tính toán tỷ lệ, và xuất báo cáo.
        -	``export_excel``: Tạo file Excel báo cáo nhân sự triển khai.


4. Xuất báo cáo nhân sự theo kênh 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    4.1. Luồng hoạt động
        -   Vào menu Báo cáo -> Chọn "Báo cáo nhân sự theo kênh" -> Popup sẽ có nút xuất.
        -   Chọn ngày bắt đầu và kết thúc.
        -   Xuất báo cáo Excel gồm: Kênh triển khai, Nhân sự phụ trách, Kế hoạch triển khai (L0, L2, L5B mới, L5B lũy kế, L5B tổng, Ngân sách), Thực đạt kế hoạch (L0, L2, L5B mới, L5B lũy kế, L5B tổng, Chi phí) và Tiến độ thực hiện (L0, L2, L5B mới, L5B lũy kế, L5B tổng, %Ngân sách đã chi tiêu).

    4.2. Các hàm liên quan
        -	``action_export_excel``: Tạo file Excel báo cáo nhân sự theo kênh.


5. Xuất báo cáo năng xuất thực đạt chương trình theo ngày 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    5.1. Luồng hoạt động
        -   Vào menu Báo cáo -> Chọn "Báo cáo năng xuất thực đạt chương trình theo ngày" -> Popup sẽ có nút xuất.
        -   Chọn ngày bắt đầu và kết thúc.
        -   Xuất báo cáo Excel gồm: Chương trình và năng suất thực đạt từ ngày bắt đầu đến ngày kết thúc.

    5.2. Các hàm liên quan
        -	``action_export_excel``: Tạo file Excel báo cáo năng xuất thực đạt chương trình theo ngày.


6. Xuất báo cáo năng suất theo chương trình theo ngày 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    6.1. Luồng hoạt động
        -   Vào menu Báo cáo -> Chọn "Báo cáo năng suất theo chương trình" -> Popup sẽ có nút xuất.
        -   Chọn ngày thống kê.
        -   Xuất báo cáo Excel gồm: Chương trình, Kế hoạch L5B, Thực đạt theo ngày (L5B/Ngày và L5B AOF/Ngày), Thực đạt tháng (thực đạt L5B và thực đạt L5B AOF) và Tiến độ thực hiện(%).

    6.2. Các hàm liên quan
        -   ``_get_l5b_stage_ids``: Trả về danh sách id của các stage thuộc nhóm "L5B" trong CRM.
        -   ``get_stage_change_date``: Lấy ngày mà một lead chuyển lên stage L5B.
        -   ``get_program_report``: Tổng hợp dữ liệu báo cáo theo từng chương trình.
        -   ``_count_l5b_in_day``: Đếm số lượng lead của chương trình.
        -   ``_count_l5b_aof_in_day``: Tương tự hàm trên, nhưng thêm điều kiện có ngày th_l5b_aof_date_getfly = ngày Y
        -   ``_count_l5b_in_month``: Đếm số lead có stage thuộc L5B, được tạo trong toàn bộ tháng.
        -   ``_count_l5b_aof_in_month``: Đếm số lead đạt L5B AOF trong tháng, có ngày th_l5b_aof_date_getfly nằm trong khoảng tháng.
        -	``export_excel_program_report``: Tạo file Excel báo cáo năng suất theo chương trình theo ngày.


7. Xuất báo cáo kênh triển khai theo ngày 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    7.1. Luồng hoạt động
        -   Vào menu Báo cáo -> Chọn "Báo cáo kênh triển khai theo ngày" -> Popup sẽ có nút xuất.
        -   Chọn ngày bắt đầu và kết thúc.
        -   Xuất báo cáo Excel gồm: Ngày, Kênh, L0, L2, Tỷ lệ L2/L0, Chi phí ngày, Chi phí L0, Chi phí L2, L5B mới, L5B lũy kế.

    7.2. Các hàm liên quan
        -	``action_export_excel``: Tạo file Excel báo cáo năng kênh triển khai theo ngày.


8. Xuất báo cáo tiến độ theo tuần 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    8.1. Luồng hoạt động
        -   Vào menu Báo cáo -> Chọn "Báo cáo tiến độ theo tuần" -> Popup sẽ có nút xuất.
        -   Chọn dự án, ngày bắt đầu và kết thúc.
        -   Xuất báo cáo Excel gồm: Chương trình, Kế hoạch thực hiện theo tuần (Tổng, L5B mới, L5B tồn), Thực đạt 5B theo tuần (Tổng, L5B mới, L5B tồn, %Thực đạt).

    8.2. Các hàm liên quan
        -	``action_export_excel``: Tạo file Excel báo cáo tiến độ theo tuần.



D.  Cấu hình
~~~~~~~~~~~~~~~~~~~~~~~~

Menu cấu hình chỉ có thể xem bởi quản trị viên
    - Giai đoạn dự án: Cấu hình các giai đoạn của dự án.
    - Giai đoạn nhiệm vụ: Cấu hình các giai đoạn nhiệm vụ của dự án.
    - Đội nhóm: Cấu hình đội nhóm MKT.
