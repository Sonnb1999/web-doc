Phân quyền người dùng
---------------------

1. Cấu trúc phân quyền
~~~~~~~~~~~~~~~~~~~~~~

Ba nhóm quyền chính:

* Nhân viên (group_lpm_user): Quyền cơ bản, truy cập chức năng thông thường
* Quản lý (group_lpm_leader): Kế thừa quyền Nhân viên, thêm quyền phê duyệt
* Quản trị viên (group_lpm_administrator): Kế thừa quyền Quản lý, thêm quyền cấu hình hệ thống

2. Phân quyền theo menu
~~~~~~~~~~~~~~~~~~~~~~~

* Nhân viên: Quản lý dự án, Tiêu chuẩn sản xuất, Tiêu chuẩn đóng gói
* Quản lý: Thêm menu Phê duyệt sản phẩm
* Quản trị viên: Thêm menu Cấu hình (Danh mục học liệu, Thành phần học liệu, Tham số sản xuất...)

3. Phân quyền theo hành động
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Phê duyệt/từ chối tiêu chuẩn: Chỉ Quản lý và Quản trị viên
* Tiêu chuẩn sản xuất:

  * Nhân viên chỉ thấy tiêu chuẩn do họ tạo hoặc được chia sẻ
  * Quản lý/Quản trị viên thấy tất cả tiêu chuẩn đã phê duyệt

4. Hạn chế sau phê duyệt
~~~~~~~~~~~~~~~~~~~~~~~~

* Không thể thêm sản phẩm vào dự án đã phê duyệt
* Các trường chuyển sang chế độ chỉ đọc sau phê duyệt
* Quy trình kiểm soát: đảm bảo dữ liệu không bị thay đổi sau khi phê duyệt