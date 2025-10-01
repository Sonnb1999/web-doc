Chi tiết chức năng
------------------

A. Quản lý phiếu feedback
~~~~~~~~~~~~~~~~~~~~~~~~~
**1. Luồng hoạt động:**

*Luồng 1: Tạo phiếu feedback mới*

    1.1. Khởi tạo phiếu:

    - Người dùng truy cập menu Feedback và có thể tạo phiếu từ:
        • Menu tổng quan (chọn danh mục trước)
        • Menu phiếu feedback (tạo trực tiếp)
    - Thông tin bắt buộc khi tạo:
        • Tên phiếu
        • Khách hàng
        • Danh mục feedback (người dùng chọn)
        • Chủ đề (người dùng chọn)

    1.2. Xử lý tự động:

    - Hệ thống tự động:
        • Cập nhật giai đoạn L0 (Tạo phiếu Feedback)
        • Ghi log hoạt động

*Luồng 2: Phân loại và gom nhóm feedback*

    2.1. Phân loại:

    - Người phân loại nhận feedback và kiểm tra:
        • Xác nhận hoặc điều chỉnh danh mục
        • Xác nhận hoặc điều chỉnh chủ đề
        • Đánh giá mức độ ưu tiên
        • Chọn đội xử lý phù hợp

    2.2. Gom nhóm lỗi:

    - Tại view danh sách các phiếu, tích các phiếu có lỗi tương tự và thực hiện gom nhóm nếu cần (Phải chọn ít nhất 2 lỗi/feedback có đầy đủ các điều kiện giống nhau để hợp nhất và phiếu đang ở trạng thái Phân loại)

*Luồng 3: Xử lý feedback*

    3.1. Tiếp nhận:

    - Người xử lý được phân công:
        • Nhận thông báo phiếu mới
        • Kiểm tra thông tin phiếu
        • Bắt đầu xử lý

    3.2. Xử lý:

    - Các trạng thái phiếu:
        • L0: Tạo phiếu Feedback
        • L1: Hủy phiếu
        • L2: Phân loại
        • L3: Tiếp nhận và xử lý
        • L4: Chờ phản hồi / Xác minh thêm
        • L5: Đã xử lý
        • L6: Đóng phiếu

    - Hoạt động xử lý:
        • Cập nhật tiến độ qua log note
        • Đính kèm tài liệu giải pháp

2.	Các hàm liên quan:

- create()
- write()
- th_action_create_ticket()
- _compute_get_team()
- th_action_merge_tickets()
- button_add_transferring_feedback()

B. Cấu hình
~~~~~~~~~~~
1.	Danh mục feedback (th_feedback_category)

- Mục đích: Phân loại các loại phản hồi để dễ dàng quản lý và xử lý
- Thông tin cơ bản:
    • Tên danh mục
    • Mô tả
    • Tên chủ đề
    • Mô tả chủ đề
    • Nhóm hỗ trợ

2.	Giai đoạn (th_feedback_stage)

- Mục đích: Quản lý các trạng thái của phiếu feedback trong quy trình xử lý
- Thông tin:
    • Tên giai đoạn
    • Đội hỗ trợ
    • Giai đoạn phiếu
    • Hiển thị trên kanban
    • Mô tả giai đoạn và ý nghĩa trạng thái

3.	Đội xử lý (th_feedback_team)

- Mục đích: Quản lý nhóm và phân công xử lý feedback
- Thông tin:
    • Tên đội
    • Quản trị viên
    • Công ty
    • Phân công và hiển thị

4.	Đối tác (th_feedback_partner)

- Mục đích: Quản lý thông tin đối tác liên quan đến feedback
- Thông tin:
    • Mã đối tác
    • Tên đối tác
    • Ngành học
    • Mô tả

5.	Vị trí thành phần (th_feedback_position)

- Mục đích: Xác định vị trí phát sinh feedback trong hệ thống
- Thông tin:
    • Tên thành phần
    • Mô tả

6.	Cấu hình phân loại lỗi (th_feedback_error)

- Mục đích: Quản lý và phân loại các loại lỗi thường gặp
- Thông tin:
    • Phân loại
    • Đặc điểm
    • Đặc điểm chi tết lỗi
    • Mô tả chi tiết đặc điểm lỗi

7.	Chính sách SLA (th_sla_policy)

- Mục đích: Thiết lập các cam kết về thời gian xử lý feedback
- Thông tin:
    • Tiêu đề(VD: xử lý lỗi trong vòng 4h)
    • Mô tả chính sách
    • Mục tiêu xử lý trong khoảng thời gian bao lâu

8.	Các hàm xử lý chính

- Kiểm tra trùng lặp:
    • check_duplicate_name(): Kiểm tra tên vị trí
    • check_duplicate_error(): Kiểm tra tên lỗi
    • check_duplicate_category(): Kiểm tra tên danh mục
