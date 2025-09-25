Phân quyền
----------

A. Người dùng (base.group_user)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1.	Quyền truy cập

- Tạo phiếu feedback mới
- Xem và theo dõi phiếu do mình tạo

2.	Giới hạn

- Không xem được phiếu của người khác
- Không được thay đổi giai đoạn phiếu

B. Người xử lý (group_feedback_handler)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1.	Quyền truy cập

- Xem danh sách phiếu được phân công
- Được phép cập nhật giai đoạn xử lý

2.	Giới hạn

- Chỉ xem và xử lý phiếu được phân công
- Không thay đổi cấu hình hệ thống
- Không được phân công đội xử lý

C. Người phân loại (group_feedback_classifier)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1.	Quyền truy cập

- Xem tất cả phiếu feedback
- Phân loại và chuyển giao phiếu
- Phân công cho đội xử lý

2.	Giới hạn

- Không thay đổi cấu hình hệ thống

D. Quản lý (group_feedback_category_manager)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1.	Quyền truy cập

- Theo dõi tiến độ và xuất báo cáo

2.	Giới hạn

- Không thay đổi cấu hình hệ thống

E. Quản trị viên (group_feedback_admin)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Xem được toàn bộ dữ liệu của module
- Có tất cả các quyền và cấu hình dữ liệu
