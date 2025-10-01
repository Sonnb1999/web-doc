Chi tiết chức năng
------------------

A. Quản lý thông tin nhân viên
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Xem danh sách nhân viên
^^^^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động
    * Truy cập vào menu Nhân viên -> Nhân viên để xem danh sách nhân viên hiện có trong hệ thống.
    * Tìm kiếm nhân viên theo các tiêu chí như tên, phòng ban, vị trí công việc, trạng thái.
    * Có thể lọc nhân viên theo trạng thái làm việc: đang làm việc, đã nghỉ việc, nghỉ không lương.
    * Chọn một nhân viên để xem chi tiết thông tin.

1.2 Một số hàm quan trọng
    * _read: Quản lý phân quyền đọc thông tin nhân viên.

2. Tạo mới và cập nhật thông tin nhân viên
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2.1 Luồng hoạt động
    * Tạo mới nhân viên bằng cách điền các thông tin cần thiết như tên, ngày sinh, địa chỉ, số điện thoại, email.
    * Cập nhật thông tin cá nhân: thông tin định danh, ngày cấp, nơi cấp, mã số thuế.
    * Cập nhật thông tin công việc: phòng ban, quản lý trực tiếp, ngày vào làm, vị trí công việc.
    * Cập nhật thông tin lương và ngạch bậc: mã ngạch, lương cơ bản, lương đóng bảo hiểm.
    * Cập nhật trạng thái làm việc: cộng tác viên,thực tập sinh, nhân viên thử việc, nhân viên chính thức, nhân viên nghỉ việc.
    * Khi cập nhật trạng thái nhân viên thành "nhân viên thử việc","nhân viên chính thức","nhân viên nghỉ việc", cần nhập ngày lên thử việc, ngày lên chính thức, ngày nghỉ việc.

2.2 Một số hàm quan trọng
    * _onchange_th_state: Xử lý khi thay đổi trạng thái nhân viên.
    * _inverse_th_employee_quit_date: Xử lý khi cập nhật ngày nghỉ việc.
    * _inverse_departure_date: Đồng bộ ngày nghỉ việc với trường departure_date.

3. Lưu trữ (Archive) và khôi phục (Unarchive) nhân viên
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3.1 Luồng hoạt động
    * Khi nhân viên nghỉ việc, có thể lưu trữ hồ sơ nhân viên để không hiển thị trong danh sách mặc định.
    * Để lưu trữ nhân viên, cần cập nhật trạng thái thành "Nhân viên đã nghỉ việc" và nhập ngày nghỉ việc.
    * Có thể khôi phục nhân viên khi cần thiết để đưa họ trở lại danh sách nhân viên đang hoạt động.

3.2 Một số hàm quan trọng
    * action_archive_custom: Lưu trữ nhân viên với các điều kiện kiểm tra.
    * action_unarchive_custom: Khôi phục nhân viên đã lưu trữ.

B. Quản lý bằng cấp và trình độ học vấn
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Xem và cập nhật thông tin bằng cấp
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động
    * Truy cập vào thông tin chi tiết nhân viên, tab thông tin ngành học.
    * Xem danh sách bằng cấp và trình độ học vấn hiện có của nhân viên.
    * Thêm mới bằng cấp với các thông tin: tên bằng/chứng chỉ, cơ sở đào tạo, chuyên ngành, ngày cấp.
    * Cập nhật thông tin bằng cấp khi có thay đổi.

1.2 Các đối tượng liên quan
    * th.qualifications: Lưu trữ thông tin về bằng cấp của nhân viên.
    * th.academic: Danh sách các cơ sở đào tạo.

C. Quản lý thông tin lương và ngạch bậc
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Cấu hình mã ngạch bậc
^^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động
    * Thiết lập mã ngạch: định nghĩa các mã ngạch theo phòng ban.
    * Thiết lập mã bậc: định nghĩa các mức bậc lương và mức lương đóng bảo hiểm tương ứng.
    * Cập nhật mã ngạch bậc cho nhân viên dựa trên vị trí và thâm niên.

1.2 Các đối tượng liên quan
    * th.rank.code: Quản lý mã ngạch.
    * th.salary.range.code: Quản lý mã ngạch bậc và mức lương đóng bảo hiểm.

2. Theo dõi lịch sử thay đổi lương
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2.1 Luồng hoạt động
    * Khi thay đổi lương cơ bản hoặc mã ngạch bậc của nhân viên, hệ thống tự động lưu lại lịch sử thay đổi.
    * Xem lịch sử thay đổi lương theo thời gian.
    * Phân biệt các mức lương hiện tại và cũ.

2.2 Các đối tượng liên quan
    * th.wage.history: Lưu trữ lịch sử thay đổi lương.
    * th.salary.range.code.history: Lưu trữ lịch sử thay đổi mã ngạch bậc.

D. Quản lý thông tin người phụ thuộc
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Xem và cập nhật thông tin người phụ thuộc
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động
    * Truy cập vào thông tin chi tiết nhân viên, tab Người phụ thuộc.
    * Xem danh sách người phụ thuộc hiện có của nhân viên.
    * Thêm mới người phụ thuộc với các thông tin: họ tên, ngày sinh, mối quan hệ.
    * Cập nhật thông tin người phụ thuộc khi có thay đổi.
    * Hệ thống tự động tính số lượng người phụ thuộc.

1.2 Một số hàm quan trọng
    * _compute_children: Tính toán số lượng người phụ thuộc.
    * onchange_th_birthday: Kiểm tra ngày sinh của người phụ thuộc không được lớn hơn ngày hiện tại.

E. Quản lý tài khoản ngân hàng
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Xem và cập nhật thông tin tài khoản ngân hàng
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động
    * Truy cập vào thông tin chi tiết nhân viên, tab Tài khoản ngân hàng.
    * Xem danh sách tài khoản ngân hàng hiện có của nhân viên.
    * Thêm mới tài khoản ngân hàng với các thông tin: ngân hàng, số tài khoản, chi nhánh.
    * Cập nhật thông tin tài khoản ngân hàng khi có thay đổi.

1.2 Các đối tượng liên quan
    * res.partner.bank: Lưu trữ thông tin tài khoản ngân hàng, mở rộng với trường th_employee_id.

F. Theo dõi thời gian công tác
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Tính toán thời gian công tác
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động
    * Hệ thống tự động tính toán thời gian công tác dựa trên ngày vào làm và ngày hiện tại hoặc ngày nghỉ việc.
    * Thời gian công tác được hiển thị theo đơn vị năm.
    * Thời gian công tác được sử dụng trong các báo cáo và quyết định liên quan đến nhân viên.

1.2 Một số hàm quan trọng
    * th_TimeofService: Tính toán thời gian công tác của nhân viên.
