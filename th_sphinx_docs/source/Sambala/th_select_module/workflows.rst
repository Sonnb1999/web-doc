Chi tiết chức năng
------------------

A. Khai báo trường phân loại module
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động:**

- Là nơi khai báo trường selection trong các model có các giá trị dùng để phân biệt các module khối kinh doanh.
- Nhằm mục đích làm điều kiện để phân loại, customise các logic hoặc các view cho các model liên quan đến nghiệp vụ kế toán, bán hàng.

**2. Các trường thông tin liên quan:**

- ``th_account_move`` (account.move)
- ``th_account_move`` (account.move.line)
- ``th_sale_order`` (sale.order)
- ``th_sale_order`` (sale.order.line)
- ``th_module`` (th.receipt.expenditure.book)
- ``th_module`` (account.bank.statement.line)

B. Khai báo trường Related
~~~~~~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động:**

- Là nơi khai báo các trường related từ các trường trong model của Odoo (partner_id, move_id, order_id,...).
- Nhằm mục đích quy hoạch, tinh gọn các trường thông tin, vừa đủ để sử dụng, tránh việc khai báo dư thừa các trường thông tin tương tự nhau.
- Ví dụ cụ thể như việc khai báo một trường số điện thoại related từ partner_id với mục đích hiển thị lên view của Hóa đơn CRM. Thay vì khai báo trong account.move CRM thì sẽ phải khai báo trong Select Module để các module khác như APM, SRM cũng có trường thông tin tương tự để dùng, tránh việc khai báo thêm bất kỳ trường số điện thoại của partner nào khác.

**2. Các trường thông tin liên quan:**

- ``th_invoice_phone`` (account.move)
- ``th_invoice_phone2`` (account.move)
- ``th_invoice_email`` (account.move)
- ``th_customer_code`` (account.move)
- ``th_invoice_birthday`` (account.move)
- ``th_customer_phone`` (sale.order)
- ``th_customer_email`` (sale.order)
- ``th_customer_birthday`` (sale.order)
- ``th_customer_code`` (sale.order)

C. Khai báo trường dùng chung
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động:**

- Là nơi khai báo các trường thông tin với mục đích customise logic các model nghiệp vụ kế toán, bán hàng liên quan đến các module kinh doanh.
- Là nơi khai báo kế thừa để customise các trường thông tin của Odoo, ví dụ như dịch label, sửa compute, sửa các thuộc tính...

**2. Các trường thông tin liên quan:**

- ``partner_id`` (sale.order)
- ``pricelist_id`` (sale.order)
- ``state`` (sale.order)
- ``order_line`` (sale.order)

D. Tính toán số tiền thực thu của Hóa đơn
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động:**

- Hàm dùng để tính toán số tiền thực thu dựa trên tổng số tiền đã thu với số tiền phải trả của hóa đơn, có giá trị âm khi có hóa đơn hoàn
- Tính toán trường th_real_revenue (số tiền thực thu)

**2. Các hàm liên quan:**

- ``_compute_th_real_revenue`` (account.move)

E. Tính toán số tiền đã nhận và số tiền đã hoàn của Hóa đơn
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động:**

- Hàm dùng để tính toán số tiền đã nhận với hóa đơn thu và số tiền đã hoàn với hóa đơn hoàn dựa trên tổng giá trị của Sổ thu chi đã liên kết với hóa đơn
- Tính toán trường th_receive_amount (số tiền đã nhận)
- Tính toán trường th_refund_amount (số tiền đã hoàn)

**2. Các hàm liên quan:**

- ``_compute_th_payment_status`` (account.move)

F. Đánh dấu đơn hàng đã thanh toán
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động:**

- Đánh dấu đơn hàng đã liên kết với hóa đơn là đã thanh toán dựa trên trạng thái thu chi là thanh toán đủ hoặc thanh toán thừa
- Gán giá trị trường th_complete_payment (hoàn thành thanh toán) bên Đơn hàng

**2. Các hàm liên quan:**

- ``_compute_payment_state`` (account.move)

G. Tính toán các loại số tiền và trạng thái hoàn tiền trong Đơn hàng
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động:**

- Hàm dùng để tính toán số tiền thừa, số tiền thực thu, số tiền hoàn,... phục vụ cho các logic trong các đơn hàng của module khối kinh doanh
- Tính toán trường th_total_received (số tiền thừa)
- Tính toán trường th_total_received_excessive (số tiền thực thu)
- Tính toán trường th_total_refund_excessive (số tiền hoàn)
- Tính toán trường th_total_missing (số tiền thiếu)
- Tính toán trường th_compare_total (so sánh số tiền nhận với số tiền hoàn)
- Tính toán trường th_status_refund (trạng thái hoàn tiền)

**2. Các hàm liên quan:**

- ``_compute_th_total_received`` (sale.order)

H. Đánh dấu đơn hàng
~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động:**

- Hàm dùng để đánh dấu đơn hàng đã thanh toán hoặc có thể hoàn tiền
- Gán giá trị trường th_paid_order (đánh dấu đơn hàng đã thanh toán)
- Gán giá trị trường th_paid_order_compute
- Gán giá trị trường th_no_cancel_order
- Gán giá trị trường th_need_refund (có thể hoàn tiền)

**2. Các hàm liên quan:**

- ``_compute_th_paid_order`` (sale.order)

