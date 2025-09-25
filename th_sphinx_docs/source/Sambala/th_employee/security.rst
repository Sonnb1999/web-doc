Phân quyền
----------

1. Người dùng cơ bản (base.group_user)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* Cho phép xem thông tin cơ bản về nhân viên trong công ty.
* Không cho phép chỉnh sửa hoặc xóa thông tin nhân viên.
* Chỉ nhìn thấy thông tin công khai của nhân viên.

2. Nhân viên nhân sự (hr.group_hr_user)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* Cho phép xem và chỉnh sửa thông tin chi tiết của nhân viên.
* Có quyền truy cập vào các thông tin về lương, bằng cấp, người phụ thuộc và lịch sử làm việc.
* Có quyền thêm mới và cập nhật thông tin nhân viên.
* Có quyền theo dõi trạng thái làm việc của nhân viên.
* Không có quyền xóa hồ sơ nhân viên.
* Được phép lưu trữ và quản lý các tài liệu liên quan đến nhân viên.

3. Quản lý nhân sự (hr.group_hr_manager)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* Có tất cả các quyền của nhóm Nhân viên nhân sự.
* Có quyền cấu hình các thông số của hệ thống.
* Có quyền quản lý mã ngạch bậc và mức lương.
* Có quyền thiết lập và quản lý các cấu hình liên quan đến nhân viên.
* Có quyền xóa hồ sơ nhân viên.
* Có quyền lưu trữ nhân viên (đánh dấu nhân viên đã nghỉ việc).

4. Quản trị viên
~~~~~~~~~~~~~~~~
* Có toàn quyền trong module th_employee.
* Có quyền quản lý và thiết lập các cấu hình nâng cao.
* Có quyền phân quyền cho người dùng khác.
* Có quyền xuất báo cáo và dữ liệu từ hệ thống.
