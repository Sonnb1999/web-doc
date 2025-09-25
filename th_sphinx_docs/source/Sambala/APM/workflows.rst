Chi tiết chức năng
------------------

A. Quản lý Cơ hội
~~~~~~~~~~~~~~~~~
1. Xem cơ hội
^^^^^^^^^^^^^
1.1 Luồng hoạt động
    * Truy cập APM –> menu Cơ hội: Mở ra danh sách tất cả Cơ hội mà bản thân người dùng được nhìn thấy và không phân biệt Dòng sản phẩm.
    * Chọn 1 cơ hội bất kỳ sẽ mở ra chi tiết các thông tin của cơ hội đó, dùng để theo dõi chi tiết thông tin, trạng thái và lịch sử tương tác của 1 khách hàng.
    * Mỗi cơ hội sẽ tương ứng với việc theo dõi 1 khách hàng, phục vụ cho việc chăm sóc và chốt đơn. Đối với dòng sản phẩm VMC có thể nhiều cơ hội có cùng 1 khách hàng.

1.2 Một số hàm quan trọng
    * th_action_view_apm_lead

2. Tạo cơ hội thủ công
^^^^^^^^^^^^^^^^^^^^^^
2.1 Luồng hoạt động
    * Tạo mới cơ hội bằng cách nhập email hoặc số điện thoại có sẵn từ bảng liên hệ (res.partner). Nếu chưa có, sẽ cần thêm mới liên hệ thủ công rồi mới tạo mới Cơ hội – phải có khách hàng mới tạo mới được Cơ hội.
    * Tạo mới khách hàng (liên hệ): Trên giao diện, nhập tên khách hàng và chọn option Create and Edit bên dưới, mở ra bảng tạo mới khách hàng – nhập thông tin email, số điện thoại – Lưu và đóng, khách hàng mới sẽ được tạo và được đánh dấu là khách hàng của APM.
    * Thông tin cơ hội:
        * Đơn vị sở hữu: tên của đơn vị sở hữu (mặc định là đơn vị sở hữu người dùng chọn khi ở giao diện dạng thẻ và không được sửa).
        * Người giới thiệu: Tên người giới thiệu khách hàng.
        * Nhóm trạng thái, trạng thái chi tiết: Tình trạng chăm sóc khách hàng.
        * Liên hệ lần cuối: thể hiện thời gian liên hệ với khách hàng (không được sửa), mặc định khi tạo bản ghi sẽ là Hôm nay. Khi có sự thay đổi ở trường Trạng thái chi tiết, Mối quan hệ, Ghi chú phía bên phải của giao diện, Liên hệ lần cuối sẽ tự động cập nhật thời điểm hiện tại (tức Hôm nay).
        * Thanh trạng thái: là thông tin hiển thị góc trên cùng bên phải, thể hiện các mối quan hệ có phân loại là APM và được sắp xếp theo thứ tự đã cấu hình.
        * Chiến dịch: Thể hiện Cơ hội được sinh ra trong đợt quảng cáo nào.
        * Dòng sản phẩm, nhóm sản phẩm, sản phẩm: Xác định nhu cầu khách hàng quan tâm.
        * Đội chăm sóc: Đơn vị Người phụ trách công tác.
        * Người phụ trách: tên của người phụ trách quản lý cơ hội (mặc định là tên của người dùng khi tạo bản ghi và không được sửa).
        * Nhóm nguồn: Nguồn gốc phát sinh cơ hội.
        * Kênh: Nền tảng phát sinh cơ hội.
        * Tab Mô tả: Mô tả khi chăm sóc cũng như thông tin về cơ hội.
        * Tab Đặc điểm: Lưu đặc điểm khách hàng.
        * Tab Cơ hội: Hiển thị các cơ hội trùng với cơ hội hiện tại.

2.2 Một số hàm quan trọng
    * create
    * write

3. Tạo cơ hội từ form
^^^^^^^^^^^^^^^^^^^^^
3.1 Luồng hoạt động
    * Form nhúng khách hàng nhập sẽ trả về thông tin khách hàng, nhóm sản phẩm, đơn vị sở hữu tự động tạo cơ hội.

3.2 Một số hàm quan trọng
    * create_lead_aff

4. Tạo cơ hội có đơn hàng shopee
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4.1 Luồng hoạt động
    * Khi tích trường Đơn hàng từ sàn: trường Số điện thoại sẽ tự động sinh ra 1 số điện thoại ngẫu nhiên để tạo cơ hội.
    * Update thông tin khách hàng: Khi khách hàng update thông tin từ Form sẽ tư động update thoog tin vào cơ hội
4.2 Một số hàm quan trọng
    * onchange_th_ecommerce_platform
    * _generate_unique_phone_number
    * async_data_from_b2b_template

B. Chăm sóc Cơ hội
~~~~~~~~~~~~~~~~~~
1.1 Luồng hoạt động
    * Ghi chú và lịch sử chăm sóc: Ghi lại lịch sử liên hệ và tự động cập nhật "Liên hệ lần cuối" khi thêm ghi chú mới.
    * Cập nhật trạng thái chăm sóc: Cho phép thay đổi trạng thái chăm sóc khách hàng.
    * Đặc điểm: Cho phép cập nhật đặc điểm liên hệ phục vụ cho quá trình chăm sóc khách hàng.
    * Tạo đơn hàng: Khi Cơ hội đạt đến mối quan hệ ở trạng thái cuối (được cấu hình trong menu Mối quan hệ), hệ thống sẽ tạo đơn hàng. Sản phẩm trong đơn hàng sẽ lấy từ danh sách sản phẩm đã được chọn trong Cơ hội.
    * Chia cơ hội: Từ động chia theo vòng chia đã chọn trong chiến dịch

1.2 Các hàm liên quan
    * action_create_order
    * action_share_the_chance
    * action_assign_leads_dividing_ring

C. Quản lý Đơn hàng
~~~~~~~~~~~~~~~~~~~
1.1 Luồng hoạt động
    * Xem danh sách đơn hàng: Hiển thị danh sách đơn hàng phát sinh từ cơ hội bao gồm thông tin khách hàng, sản phẩm và tình trạng thanh toán. Cho phép lognote, chỉnh sửa đơn hàng ở trạng thái nháp.
    * Khi tạo đơn hàng là đơn hàng từ sàn: sẽ tự sinh ra mã qr code ở phải màn hình.

1.2 Các hàm liên quan
    * generate_qr_code
    * create
    * write

D. Quản lý Sản phẩm
~~~~~~~~~~~~~~~~~~~
1.1 Luồng hoạt động
    * Xem danh sách sản phẩm: Hiển thị danh sách các sản phẩm ngắn hạn.
    * Cho phép cấu hình Tên sản phẩm, Loại sản phẩm, Đơn vị tính, Giá bán, Giá vốn, Mã nội bộ, Danh mục sản phẩm và Thẻ sản phẩm.

1.2 Các hàm liên quan
    * default_get

E. Quản lý Chiến dịch
~~~~~~~~~~~~~~~~~~~~~
1.1 Luồng hoạt động
    * Xem danh sách chiến dịch: Hiển thị danh sách các chiến dịch, đại diện cho các đợt quảng cáo.
    * Khi tạo mới chiến dịch sẽ cần bắt buộc cấu hình Tên chiến dịch, Dòng sản phẩm và Vòng chia (nếu không chọn cách chia là Không chia).
    * Khi tạo chiến dịch xong sẽ cần gửi duyệt để Quản lý kho phê duyệt hoặc từ chối thông qua Chiến dịch.
    * Sau khi triển khai xong chiến dịch có thể ấn hoàn thành rồi lựa chọn đồng ý để kết thúc chiến dịch.

1.2 Các hàm liên quan
    * action_send_for_approval
    * action_approved
    * action_refuse
    * action_completed

F. Quản lý Liên hệ tiềm năng
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1.1 Luồng hoạt động
    * Xem danh sách liên hệ tiềm năng: Hiển thị danh sách các liên hệ tiềm năng.
    * Khi tạo một khách hàng của APM mới sẽ tự động thêm vào liên hệ tiềm năng.

1.2 Các hàm liên quan
    * create

G. Quản lý Chăm sóc sau bán
~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Liên hệ sau bán
^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động
    * Xem danh sách liên hệ sau bán: Hiển thị danh sách các liên hệ sau bán hàng.
    * Khi liên hệ có cơ hội phát sinh đơn hàng đã thanh toán sẽ được thêm vào liên hệ sau bán.
    * Có thể tạo cơ hội sau bán trong danh sách liên hệ sau bán.
    * Có thể xóa liên hệ sau bán trong danh sách.

1.2 Các hàm liên quan
    * _compute_payment_state

2. Cơ hội sau bán
^^^^^^^^^^^^^^^^^
2.1 Luồng hoạt động
    * Cho phép quản lý các cơ hội sau bán hàng: xem danh sách cơ hội sau bán, khi ấn chọn một cơ hội sẽ mở ra biểu mẫu chứa các thông tin chi tiết của cơ hội sau bán.
    * Các trường thông tin về cơ bản giống với cơ hội trước bán, ngoài ra có thêm các trường thông tin mới như Tái ký, Ngày mua gần nhất, Ngày mua lần 1, Ngày tạo cơ hội, Bảng Lịch sử mua hàng và Bảng Tình trạng học viên.

2.2 Các hàm liên quan
    * th_create_lead_apm_after_sales_care

H. Trạng thái kích hoạt tài khoản
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1.1 Luồng hoạt động
    * Cho phép theo dõi các trạng thái kích hoạt tài khoản của các tài khoản học viên.
    * Khi cơ hội có đơn hàng đã xác nhận, tài khoản học viên sẽ được tạo ở trạng thái Đợi kích hoạt.
    * Khi đơn hàng được thanh toán thành công, hệ thống sẽ gửi yêu cầu kích hoạt tài khoản sang hệ thống của sản phẩm học viên đăng ký, tài khoản học viên sẽ chuyển sang trạng thái Đã gửi yêu cầu.

1.2 Hàm liên quan
    * stage_computed
    * create_record_from_sale_order

I. Kiểm tra tương tác của nhân viên
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1.1 Luồng hoạt động
    * Cho phép xem danh sách các log note trong các cơ hội tương ứng của các nhân viên trong đội nhóm của bản thân.

1.2 Hàm liên quan
    * th_apm_action_open_lognote_list
