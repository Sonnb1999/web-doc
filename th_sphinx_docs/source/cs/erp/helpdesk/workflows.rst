Chi tiết chức năng
------------------

A. Quản lý phiếu hỗ trợ
~~~~~~~~~~~~~~~~~~~~~~~
1. Luồng tạo phiếu mới

- Hệ thống cho phép người dùng tạo phiếu từ menu phiếu hỗ trợ menu tổng quan hoặc từ menu phiếu. Nếu người dùng tạo phiếu 
  từ menu tổng quan, cần phải chọn khu vực và danh mục trước khi nhập thông tin phiếu.
- Nhập thông tin bắt buộc:
    • Tên phiếu
    • Khu vực và danh mục
    • Đặc điểm danh mục
    • Chủ đề hỗ trợ
- Sau khi nhập các thông tin trên hệ thống tự động:
    • Gán "Nhóm hỗ tợ" và "phân công cho" (nhân viên theo quy tắc phân công đã thiết lập trong cấu hình "nhóm hỗ trợ").
- Tạo phiếu với trạng thái "Mới" và hệ thống gửi phiếu đến người được phân công (có hiển thị thông báo gửi phiếu trong ghi chú).

2. Luồng phân công và xử lý (người dùng phải là quản lý hỗ trợ hoặc quản trị viên)
    2.1. Luồng xử lý:
     + Tại phiếu hỗ trợ, người dùng có thể thực hiện các thao tác sau:
         • Chuyển trạng thái phiếu (Mới, Đang tiến hành, Đã giải quyết, Đang giữ, Nghiệm thu, Đã đóng, Hủy)
         • Thêm mô tả, những sửa đổi và phương án
         • Thêm bình luận trao đổi với người dùng
    2.2. Luồng phân công:
     + Tại phiếu hỗ trợ, người dùng có thể click vào nút "Chuyển giao phiếu" để chuyển phiếu cho nhân viên khác hoặc nhóm hỗ trợ khác.:
         • Người dùng có thể phân công lại phiếu cho nhân viên khác hoặc nhóm hỗ trợ khác.
         • Hệ thống sẽ tự động cập nhật trạng thái và thông báo cho người được phân công mới.
3. Các hàm liên quan

- create()
- write()
- button_add_transferring()

B. Cấu hình
~~~~~~~~~~~
1. Cấu hình khu vực hỗ trợ
        
- Mục đích: Phân chia các khu vực hỗ trợ khác nhau trong công ty để dễ dàng quản lý và phân luồng xử lý phiếu hỗ trợ.
- Ví dụ: Khu vực IT, Kế toán, PTML, TTHL,...
- Tại menu cấu hình, người dùng có thể tạo các khu vực hỗ trợ khác nhau để phân loại phiếu hỗ trợ.
  Người dùng cần nhập các thông tin sau:

    + Tên khu vực hỗ trợ
    + Mô tả

2. Danh mục hỗ trợ
       
- Mục đích: Chi tiết hóa các loại yêu cầu hỗ trợ trong từng khu vực, giúp phân loại và xử lý phiếu hiệu quả hơn.
- Ví dụ: Trong khu vực IT có thể có các danh mục như: Phần mềm, Update hệ thống, Lỗi mạng,...
    + Nhập thông tin tên danh mục
    + Mô tả
    + Khu vực hỗ trợ (ở bước trên)

3. Chủ đề hỗ trợ

- Mục đích: Cung cấp chi tiết cụ thể về vấn đề cần hỗ trợ, giúp người dùng chọn đúng loại yêu cầu và nhân viên hỗ trợ hiểu rõ vấn đề.
- Ví dụ: Trong danh mục Phần mềm có các chủ đề: Cài đặt phần mềm, Lỗi ứng dụng, Nâng cấp phiên bản,...
    + Nhập thông tin tên chủ đề
    + Mô tả đặc điểm danh mục

4. Nhóm hỗ trợ

- Mục đích: Tổ chức nhân sự thành các nhóm chuyên môn để xử lý các loại yêu cầu khác nhau.
- Ví dụ: Nhóm hỗ trợ phần cứng, Nhóm system admin, website admin,...
    + Tạo nhóm hỗ trợ mới bằng cách nhập tên nhóm
    + Gán quản trị viên, nhân viên vào nhóm
    + Tích SLA cho nhóm(nếu cần thiết)

5. Đặc điểm danh mục

- Mục đích: Định nghĩa các thuộc tính và yêu cầu đặc thù cho từng danh mục, chủ đề, giúp thu thập đầy đủ thông tin cần thiết khi tạo phiếu.
- Ví dụ: Đối với danh mục Phần cứng, cần có thông tin về model thiết bị, số serial,...
    + Nhập thông tin tên đặc điểm danh mục, danh mục hỗ trợ
    + Tại tab chủ đề chọn thêm chủ để và gán nhóm hỗ trợ

6. Chính sách SLA

- Mục đích: Thiết lập các cam kết về thời gian xử lý cho từng loại yêu cầu, giúp đảm bảo chất lượng dịch vụ và theo dõi hiệu suất.
- Ví dụ: Phiếu khẩn cấp cần phản hồi trong 30 phút, xử lý trong 2 giờ,...
    + Gán SLA cho khu vực/danh mục
    + Cấu hình thời gian xử lý

C. Báo cáo và thống kê (người dùng phải là quản lý hỗ trợ hoặc quản trị viên)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Tại menu báo cáo, người dùng có thể xem và xuất các báo cáo thống kê liên quan đến phiếu hỗ trợ. Các báo cáo bao gồm:

1. Phân tích phiếu
           
Người dùng vào phần bộ lọc, nhóm theo để xem phân tích các mục sau:
    + Số lượng phiếu theo trạng thái
    + Phân công cho
    + Tỷ lệ đúng SLA
    + Mức độ hài lòng
2. Phân tích đánh giá
    + Theo nhân viên/nhóm
    + Theo khu vực/danh mục
    + Đánh giá của người dùng
3. Xuất báo cáo
    + Dạng file Excel
    + Dạng biểu đồ
