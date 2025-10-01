Chi tiết chức năng
------------------

A. Chuyển đổi phê duyệt thành nhiệm vụ
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Luồng hoạt động
^^^^^^^^^^^^^^^^^^
- Người dùng chọn một hoặc nhiều phê duyệt cần chuyển đổi
- Nhấn nút "Convert to Task" trên giao diện danh sách hoặc form phê duyệt
- Hệ thống hiển thị wizard cho phép chọn dự án và giai đoạn nhiệm vụ
- Sau khi xác nhận, hệ thống tạo nhiệm vụ mới với thông tin từ phê duyệt
- Hệ thống tự động gửi email thông báo cho người yêu cầu phê duyệt
- Phê duyệt và nhiệm vụ được liên kết với nhau để dễ dàng theo dõi

2. Hàm liên quan
^^^^^^^^^^^^^^^^
- action_convert_to_task: Hiển thị wizard chuyển đổi phê duyệt thành nhiệm vụ
- _get_approvals_to_convert: Lấy danh sách phê duyệt cần chuyển đổi từ context
- _get_task_values: Chuẩn bị giá trị cho việc tạo nhiệm vụ từ phê duyệt
- action_convert: Thực hiện chuyển đổi phê duyệt thành nhiệm vụ, bao gồm:
    + Tạo nhiệm vụ mới từ thông tin phê duyệt
    + Cập nhật liên kết giữa phê duyệt và nhiệm vụ
    + Sao chép tệp đính kèm từ phê duyệt sang nhiệm vụ
    + Gửi email thông báo cho người yêu cầu phê duyệt

B. Theo dõi liên kết giữa phê duyệt và nhiệm vụ
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Luồng hoạt động
^^^^^^^^^^^^^^^^^^
- Người dùng xem chi tiết phê duyệt đã được chuyển đổi
- Hệ thống hiển thị nút "Nhiệm vụ" trong phần thông tin phê duyệt
- Khi nhấn nút, hệ thống hiển thị danh sách hoặc chi tiết nhiệm vụ liên quan
- Người dùng có thể theo dõi tiến độ nhiệm vụ từ giao diện phê duyệt

2. Hàm liên quan
^^^^^^^^^^^^^^^^
- th_open_task: Mở giao diện xem nhiệm vụ liên quan đến phê duyệt

C. Thông báo tự động cho người yêu cầu
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Luồng hoạt động
^^^^^^^^^^^^^^^^^^
- Khi phê duyệt được chuyển đổi thành nhiệm vụ
- Hệ thống tự động gửi email thông báo cho người yêu cầu phê duyệt
- Email chứa thông tin về nhiệm vụ và liên kết để theo dõi tiến độ
- Người yêu cầu có thể theo dõi tiến độ xử lý yêu cầu của mình

2. Hàm liên quan
^^^^^^^^^^^^^^^^
- th_project_approvals_mail_template_data1: Mẫu email thông báo cho người yêu cầu
- action_convert: Phần gửi email thông báo trong quá trình chuyển đổi
