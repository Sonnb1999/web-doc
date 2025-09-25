Chi tiết chức năng
------------------

A. Quản lý Hóa đơn (account.move)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1.1 Luồng hoạt động

- Hoá đơn là một loại chứng từ yêu cầu thanh toán các mặt hàng với số lượng và đơn giá tương ứng được liệt kê bên trong.
- Hóa đơn có thể được tạo bằng nhiều hình thức khác nhau, có thể được tạo thủ công hoặc sinh ra từ các cơ hội.
- Có 6 loại hóa đơn khác nhau mặc định có sẵn của base Odoo và 2 loại hóa đơn customise.
- Khi tạo hóa đơn thì bắt buộc cần phải có đối tượng (có thể là Khách hàng hoặc Nhà cung cấp) và ít nhất một sản phẩm được cấu hình dưới Chi tiết hóa đơn. Sau khi xác nhận sẽ tạo ra Mã hóa đơn và chuyển trạng thái hóa đơn thành Đã vào sổ.
- Khi hóa đơn ở trạng thái Đã vào sổ thì người dùng có thể tiến hành tạo Sổ thu chi với hóa đơn.
- Ngày thanh toán, Trạng thái hóa đơn và Số tiền trả thừa (nếu có) sẽ tự động tính toán dựa trên các phiếu Sổ thu chi đã liên kết với Hóa đơn.
    + Ngày thanh toán sẽ lấy theo ngày gần nhất trong các Ngày thanh toán của phiếu Sổ thu chi.
    + Trạng thái hóa đơn sẽ tự động tính toán và so sánh với tổng giá trị các phiếu Sổ thu chi.
    + Số tiền trả thừa là số tiền chênh lệch giữa tổng giá trị các phiếu Sổ thu chi với Số tiền phải trả của Hóa đơn ở trạng thái Thanh toán dư.
- Khi có Sổ thu chi đang liên kết thì không thể đưa về dự thảo mà bắt buộc cần phải hủy liên kết tất cả Sổ thu chi đang liên kết hiện tại.
- Tính năng ghi nhận trạng thái thu chi của hóa đơn thông qua trường th_payment_status.
- Tính năng tính toán số tiền trả thừa của hóa đơn thông qua trường th_amount_excess.
- Tính năng ghi nhận ngày thanh toán của hóa đơn thông qua trường th_final_payment_date.
- Phân loại hóa đơn thu nội bộ và chi nội bộ thông qua trường th_internal_move_type.

1.2 Một số hàm quan trọng

- button_draft
- _compute_amount_excess_and_final_payment_date
- _compute_th_payment_status
- th_action_register_receipt_expenditure

B. Quản lý Sản phẩm (product.template)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1.1 Luồng hoạt động

- Cho phép tạo và quản lý các sản phẩm với mục đích để bán cho khách hàng hoặc để mua từ nhà cung cấp.
- Với các sản phẩm để bán có thể cấu hình giá bán để tự động lấy ra khi tạo đơn bán hàng hoặc khi tạo hóa đơn thu tiền. Tương tự với các sản phẩm để mua thì có thể cấu hình giá vốn để tự động lấy ra khi tạo đơn mua hàng hoặc khi tạo hóa đơn chi tiền.
- Tách biệt bộ sản phẩm của bộ phận Kế toán với bộ sản phẩm kinh doanh của công ty thông qua trường is_product_finance.

1.2 Các hàm liên quan

C. Chuyển quỹ nội bộ (th.internal.transfer)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1.1 Luồng hoạt động

- Tạo một phiếu giao dịch nhằm mục đích chuyển tiền qua lại 2 Tài khoản tương ứng với với 2 Sổ quỹ khác nhau.
- Tài khoản có sẽ lấy theo Ngân hàng/Quỹ đi, tài khoản nợ sẽ lấy theo Ngân hàng/Quỹ đến.
- Cột giá trị quy đổi sẽ hiện khi loại tiền tệ không phải VNĐ và sẽ tự tính toán theo giá trị và tỷ giá đã được cấu hình.
- Ấn nút vào sổ sau khi tạo sẽ tự động sinh bút toán và chi tiết bút toán theo thông tin chi tiết bên dưới bảng Hạch toán (th.internal.transfer.detail).
- Sau khi vào sổ có thể ấn nút quay lại để xóa bút toán cũng như để sửa thông tin của phiếu.

1.2 Các hàm liên quan

- action_post
- prepare_data_account_move_line
- _get_th_move_ids
- _compute_th_amount_total
- action_draft

D. Sổ thu chi (th.receipt.expenditure.book)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1.1 Luồng hoạt động

- Là giải pháp tương tự, thay thế cho phiếu thanh toán (account.payment) và giao dịch ngân hàng (account.bank.statement.line) của base Odoo.
- Liên kết chặt chẽ với hóa đơn (account.move), có thể tạo Sổ thu chi ngay bên trong hóa đơn.
- Ngoài hình thức tạo Sổ thu chi bên trong hóa đơn, người dùng còn có thể tạo Sổ thu chi bằng 2 hình thức thủ công và import hàng loạt.
- Khi tạo thì bắt buộc phải có đầy đủ 3 trường thông tin Ngày thanh toán, Sổ nhật ký và Mã hóa đơn hợp lệ.
- Với những phiếu không có Mã hóa đơn thì sẽ được tự động cho vào danh sách Sổ thu chi khác, thể hiện việc đã thu tiền nhưng không liên kết với Hóa đơn và vẫn có thể liên kết với Hóa đơn hợp lệ trong tương lai.
- Mã hóa đơn hợp lệ được cho phép tạo Sổ thu chi là mã hóa đơn ở trạng thái Đã vào sổ. Với hóa đơn ở trạng thái Nháp thì sẽ bắt buộc cần phải Vào sổ trước khi tạo Sổ thu chi và không cho phép tạo Sổ thu chi với hóa đơn ở trạng thái Đã hủy.
- Tự đánh dấu loại Sổ thu hoặc chi dựa trên loại Hóa đơn thu hoặc Hóa đơn chi.
- Tự đánh dấu loại module kinh doanh tương ứng dựa trên loại hóa đơn kinh doanh.
- Tự đánh dấu là giao dịch nội bộ nếu là Hóa đơn thu chi nội bộ.
- Sau khi liên kết với Hóa đơn có thể thông qua smart button trong phiếu để đi tới giao diện của Hóa đơn.
- Muốn xóa phiếu thì bắt buộc phải hủy liên kết với hóa đơn.
- Có phân loại rõ ràng thu và chi thông qua trường th_payment_type.
- Có khả năng đánh dấu phân biệt giao dịch nội bộ thông qua trường th_is_internal.
- Liên kết với Sổ nhật ký (account.journal) thông qua trường th_account_journal_id.
- Phân loại menu rõ ràng thu, chi riêng và thu chi tổng, thu chi nội bộ với thu chi khác riêng.

1.2 Các hàm liên quan

- create
- unlink
- write
- action_change_link_state
- _onchange_th_is_internal_and_th_payment_type
- th_check_non_posted_invoice
