Chi tiết chức năng
------------------

A. Quản lý dự án sản xuất học liệu
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Tạo và quản lý dự án
^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động
    * Tạo dự án mới: Menu LPM -> Quản lý dự án -> Kế hoạch -> view kanban với thông tin cơ bản (mã, tên, phạm vi, đơn vị thực hiện)
    * Cấu hình người chủ trì và thành viên dự án
    * Thiết lập thời gian bắt đầu và kết thúc dự án
    * Chọn danh mục sản xuất và trường đại học
    * Thêm các môn học cần sản xuất vào dự án
    * Hệ thống tự động tính toán chi phí dự án theo nhiều cách tính

1.2 Hàm liên quan
    * _compute_readonly_domain: Xác định trạng thái chỉ đọc khi dự án đã được phê duyệt
    * _compute_th_costs_incurred: Tính toán chi phí phát sinh và chi phí QA dựa trên tổng chi phí và phần trăm
    * _get_warehouse_selection: Lấy danh sách danh mục kho sản xuất
    * _th_total_production_costs: Tính tổng chi phí sản xuất, chi phí theo tín chỉ, chi phí theo môn

2. Phê duyệt dự án
^^^^^^^^^^^^^^^^^^
2.1 Luồng hoạt động phê duyệt
    * Menu LPM -> Phê duyệt -> Phê duyệt dự án
    * Tạo dự án mới hoặc chọn dự án đã có
    * Tạo yêu cầu phê duyệt dự án hoặc chọn dự án cần duyệt
    * Hệ thống hiển thị tổng chi phí, số lượng môn, thông tin chi tiết
    * Người có quyền phê duyệt xem xét và phê duyệt/từ chối
    * Khi được phê duyệt, dự án chuyển sang trạng thái chỉ đọc

2.2 Hàm liên quan
    * _compute_th_state: Tính toán danh sách người đã/chưa phê duyệt
    * _compute_th_hidden_button: Ẩn/hiện nút phê duyệt dựa trên quyền người dùng
    * _compute_production_standard: Lấy và sắp xếp danh sách tiêu chuẩn sản xuất
    * action_approved, action_refuse, action_draft, action_pending, action_cancel: Quản lý trạng thái phê duyệt
    * _compute_state: Tính toán trạng thái dựa trên phê duyệt của từng người
    * write: Khi phê duyệt/từ chối, cập nhật trạng thái dự án

B. Quản lý tiêu chuẩn sản xuất
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Tạo và quản lý tiêu chuẩn sản xuất
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động
    * Cấu hình thành phần học liệu và thuộc tính cho từng thành phần
    * Tạo tiêu chuẩn mới với thông tin cơ bản (mã, phiên bản, đơn vị sử dụng)
    * Thêm các giá trị tiêu chuẩn cho từng thành phần học liệu
    * Chọn độ phức tạp và cấu hình thời lượng
    * Gửi tiêu chuẩn để phê duyệt
    * Theo dõi số môn đang sử dụng tiêu chuẩn

1.2 Hàm liên quan
    * _compute_subjects_used: Tính toán số môn đang sử dụng tiêu chuẩn này
    * _compute_value_attribute: Tính toán và sắp xếp danh sách giá trị thuộc tính
    * _compute_description_attribute: Tạo mô tả HTML cho các giá trị thuộc tính
    * default_get: Tự động tạo các giá trị tiêu chuẩn mặc định
    * _compute_duration: Tính toán thời lượng môn, bài, mục dựa trên cấu hình
    * action_send_for_approval, action_approved, action_refuse, action_draft, action_cancel: Quản lý trạng thái tiêu chuẩn


C. Cấu hình
~~~~~~~~~~~
- Danh mục Học liệu:
    * Quản lý danh sách các loại học liệu
    * Phân loại học liệu theo mục đích sử dụng
    * Cấu hình thông tin cơ bản về học liệu
- Thành phần học liệu:
    * Định nghĩa các thành phần cấu thành nên học liệu
    * Cấu hình các thuộc tính cơ bản của từng thành phần
- Thuộc tính thành phần:
    * Định nghĩa các thuộc tính cho thành phần học liệu
    * Cấu hình loại thuộc tính và cách tính toán
- Giá trị thuộc tính:
    * Định nghĩa các giá trị cụ thể cho từng thuộc tính
    * Thiết lập mức độ ảnh hưởng đến chi phí và thời gian sản xuất
    * Cấu hình tỷ lệ phần trăm cho từng giá trị
- Tham số sản xuất:
    * Cấu hình các tham số ảnh hưởng đến quá trình sản xuất
    * Định nghĩa thời gian sản xuất chuẩn cho từng loại học liệu
    * Thiết lập các tham số môn học (is_subject_parameter)
- Tham số chi phí theo giờ:
    * Cấu hình chi phí sản xuất tính theo giờ
    * Thiết lập mức giá cho từng loại công việc
    * Định nghĩa đơn vị tính và mô tả chi tiết
- Tham số chi phí theo tín chỉ:
    * Cấu hình chi phí sản xuất tính theo tín chỉ
    * Thiết lập mức giá cho từng loại môn học
    * Định nghĩa đơn vị tính và mô tả chi tiết
