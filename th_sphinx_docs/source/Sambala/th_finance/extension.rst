Mở rộng
-------

Tổng quan
~~~~~~~~~
**Kế thừa module**:

- ``account_accountant``
- ``account_payment``
- ``sale``

**Mục tiêu**:

- Module ``th_finance`` được kế thừa và mở rộng các chức năng thuộc nghiệp vụ kế toán trong module gốc ``account`` và ``account_accountant`` của Odoo.
- Module này bổ sung các tính năng như quản lý hóa đơn thu chi nội bộ, chuyển quỹ nội bộ, thu tiền hóa đơn theo khách hàng, chi tiền hóa đơn theo nhà cung cấp, sổ thu chi và phân quyền theo nhóm sổ nhật ký.

Chức năng chỉnh sửa
~~~~~~~~~~~~~~~~~~~

1. Quản lý chứng từ/hóa đơn (AccountMove)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Model kế thừa**:

- ``account.move`` (từ module gốc ``account``)

**Mục đích kế thừa**:

- Mở rộng model ``account.move`` để thêm các trường và logic hỗ trợ quản lý chứng từ/hóa đơn, tính toán số tiền trả thừa, thêm trạng thái ``Thanh toán dư`` khi thanh toán hóa đơn, ghi nhận Ngày thanh toán, tích hợp Sổ thu chi và tích hợp thông báo cho kế toán về hóa đơn cần thanh toán qua email.
- Tùy chỉnh các hàm xử lý hóa đơn để đáp ứng các yêu cầu đặc thù của nghiệp vụ kế toán như bắt buộc hủy sổ thu chi trước khi đưa hóa đơn về dự thảo, ngăn chặn đưa về dự thảo bút toán của phiếu Thu chi tiền theo hóa đơn và Chuyển quỹ nội bộ, loại bút toán ra khỏi các loại chứng từ có thể import khi import bản ghi ``account.move`` và tính toán Ngày hoàn tất thanh toán.

**Logic hoặc hàm thay đổi**:

- **Hàm ghi đè/thay đổi**:
    - ``button_draft``: Ghi đè hàm gốc để đặt các điều kiện, giới hạn theo nghiệp vụ kế toán như là chặn không cho đưa về dự thảo bút toán trước ngày khóa kì kế toán hoặc bút toán của phiếu Thu chi tiền theo hóa đơn và Chuyển quỹ nội bộ và bắt buộc hủy sổ thu chi trước khi đưa hóa đơn về dự thảo.
    - ``name_search``: Ghi đè hàm gốc để loại bút toán ra khỏi các loại chứng từ có thể import khi import bản ghi ``account.move``.
    - ``_compute_invoice_date_due``: Ghi đè hàm gốc để tính toán lấy thời điểm Thanh toán đủ hoặc Thanh toán dư Hóa đơn làm Ngày hoàn tất thanh toán.

**View / Action / Menu**:

- **Views**:
    - ``th_view_invoice_tree_inherit``: Tree view tùy chỉnh chung cho các loại Hóa đơn thông thường.
    - ``th_out_invoice_tree_inherit``: Tree view tùy chỉnh cho Hóa đơn thu.
    - ``th_view_move_form_inherit``: Form view tùy chỉnh chung cho các loại Hóa đơn thông thường.
    - ``th_view_account_invoice_filter_inherit``: Bộ lọc tìm kiếm tùy chỉnh chung cho các loại Hóa đơn thông thường.

- **Actions**:
    - ``th_action_move_out_internal_type``: Hiển thị Hóa đơn thu nội bộ.
    - ``th_action_move_in_internal_type``: Hiển thị Hóa đơn chi nội bộ.
    - ``action_move_journal_line``: Thêm domain lọc nhân viên có quyền truy cập Bút toán trong nhóm sổ nhật ký.
    - ``action_move_out_invoice_type``: Thêm domain lọc nhân viên có quyền truy cập Hóa đơn thu trong nhóm sổ nhật ký và loại hóa đơn thu nội bộ ra khỏi action.
    - ``action_move_in_invoice_type``: Thêm domain lọc nhân viên có quyền truy cập Hóa đơn chi trong nhóm sổ nhật ký và loại hóa đơn chi nội bộ ra khỏi action.
    - ``action_move_out_refund_type``: Thêm domain lọc nhân viên có quyền truy cập Hóa đơn hoàn tiền KH trong nhóm sổ nhật ký.
    - ``action_move_in_refund_type``: Thêm domain lọc nhân viên có quyền truy cập Hóa đơn hoàn tiền NCC trong nhóm sổ nhật ký.
    - ``action_move_out_receipt_type``: Thêm domain lọc nhân viên có quyền truy cập Biên lai thu trong nhóm sổ nhật ký.
    - ``action_move_in_receipt_type``: Thêm domain lọc nhân viên có quyền truy cập Biên nhận trong nhóm sổ nhật ký.

- **Menus**:
    - ``Hóa đơn thu nội bộ``, ``Hóa đơn chi nội bộ``: Được định nghĩa trong ``menus.xml`` dưới mục cha ``Giao dịch nội bộ``.

2. Quản lý chi tiết bút toán (AccountMoveLine)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Model kế thừa**:

- ``account.move.line`` (từ module gốc ``account``)

**Mục đích kế thừa**:

- Mở rộng model ``account.move.line`` để thêm các trường và logic hỗ trợ quản lý chi tiết bút toán.
- Tùy chỉnh các hàm xử lý chi tiết bút toán để đáp ứng các yêu cầu đặc thù của nghiệp vụ kế toán như đối soát thu/chi theo hóa đơn.

**Logic hoặc hàm thay đổi**:

- **Hàm ghi đè/thay đổi**:
    - ``_create_reconciliation_partials``: Ghi đè hàm gốc để chỉnh sửa chi tiết bút toán phục vụ cho logic thu/chi tiền theo hóa đơn.

**View / Action / Menu**:

- **Actions**:
    - ``action_account_moves_all``: Thêm domain lọc nhân viên có quyền truy cập Chi tiết bút toán trong nhóm sổ nhật ký.

3. Quản lý phiếu thanh toán (AccountPayment)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Model kế thừa**:

- ``account.payment`` (từ module gốc ``account``)

**Mục đích kế thừa**:

- Mở rộng model ``account.payment`` để thêm các trường và logic hỗ trợ quản lý phiếu thanh toán, tích hợp tính năng Thu/chi theo hóa đơn.
- Tùy chỉnh các hàm xử lý phiếu thanh toán để đáp ứng các yêu cầu đặc thù của nghiệp vụ kế toán như tự động đánh dấu phiếu thu nội bộ khi tạo phiếu thu nội bộ thủ công.

**Logic hoặc hàm thay đổi**:

- **Hàm ghi đè/thay đổi**:
    - ``_compute_is_internal_transfer``: Ghi đè hàm gốc để đáp ứng các yêu cầu đặc thù của nghiệp vụ kế toán như tự động đánh dấu phiếu thu nội bộ khi tạo phiếu thu nội bộ thủ công.

**View / Action / Menu**:

- **Views**:
    - ``th_view_account_payment_search_inherit``: Bộ lọc tìm kiếm tùy chỉnh chung cho các loại phiếu thanh toán.

- **Actions**:
    - ``action_account_payments``: Thêm domain lọc nhân viên có quyền truy cập Bút toán trong nhóm sổ nhật ký.
    - ``action_account_payments_payable``: Thêm domain lọc nhân viên có quyền truy cập Bút toán trong nhóm sổ nhật ký.
    - ``th_export_inbound_account_payment_action``: Action xuất phiếu thu theo template.
    - ``th_export_outbound_account_payment_action``: Action xuất phiếu chi theo template.

- **Menus**:
    - ``menu_action_account_payments_receivable``, ``menu_action_account_payments_payable``: Ẩn menu phiếu thu, phiếu chi trong ``menus.xml``.

4. Quản lý hệ thống tài khoản (AccountAccount)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Model kế thừa**:

- ``account.account`` (từ module gốc ``account``)

**Mục đích kế thừa**:

- Mở rộng model ``account.account`` để thêm các trường và logic hỗ trợ quản lý hệ thống tài khoản, đánh dấu là tài khoản ghi chênh và cho phép lưu trữ tài khoản.

**View / Action / Menu**:

- **Views**:
    - ``th_inherit_view_account_form``: Form view tùy chỉnh chung cho hệ thống tài khoản.

5. Quản lý sao kê ngân hàng (AccountBankStatementLine)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Model kế thừa**:

- ``account.bank.statement.line`` (từ module gốc ``account``)

**Mục đích kế thừa**:

- Mở rộng model ``account.bank.statement.line`` để thêm các trường và logic hỗ trợ quản lý sao kê ngân hàng, lịch hẹn tự động đối soát với các khoản thanh toán đầy đủ hàng loạt.

**View / Action / Menu**:

- **Cron Job**:
    - ``th_auto_reconcile_bank_statement_line``: Lịch hẹn chạy hàm tự động đối soát với các khoản thanh toán đầy đủ hàng loạt vào lúc 23h hàng ngày.

6. Quản lý sổ nhật ký (AccountJournal)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Model kế thừa**:

- ``account.journal`` (từ module gốc ``account``)

**Mục đích kế thừa**:

- Mở rộng model ``account.journal`` để thêm các trường và logic hỗ trợ quản lý sổ nhật ký, đánh dấu là sổ nhật ký để thanh toán tự động cho VNPay.

**View / Action / Menu**:

- **Views**:
    - ``th_account_journal_form_inherit_view``: Form view tùy chỉnh chung cho sổ nhật ký.

- **Actions**:
    - ``open_account_journal_dashboard_kanban``: Thêm domain lọc nhân viên có quyền truy cập Bút toán trong nhóm sổ nhật ký.

- **Menus**:
    - ``menu_board_journal_1``: Ẩn menu dashboard sổ nhật ký khi vào module Kế toán của base trong ``menus.xml``.

7. Quản lý nhóm sổ nhật ký (AccountJournalGroup)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Model kế thừa**:

- ``account.journal.group`` (từ module gốc ``account``)

**Mục đích kế thừa**:

- Mở rộng model ``account.journal.group`` để thêm các trường và logic hỗ trợ quản lý nhóm sổ nhật ký, hỗ trợ thêm nhân viên vào từng nhóm cho mục đích phân quyền.

**View / Action / Menu**:

- **Views**:
    - ``th_inherit_view_account_journal_group_tree``: Tree view tùy chỉnh chung cho nhóm sổ nhật ký.

8. Tạo bút toán khi đối soát hóa đơn với phiếu thanh toán (AccountReconcileModel)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Model kế thừa**:

- ``account.reconcile.model`` (từ module gốc ``account``)

**Mục đích kế thừa**:

- Mở rộng model ``account.reconcile.model`` để thêm các trường và logic hỗ trợ tạo bút toán khi đối soát hóa đơn với phiếu thanh toán, thêm hành động chạy thủ công gọi vào hàm tự động đối soát giao dịch ngân hàng hàng loạt với hóa đơn.

**View / Action / Menu**:

- **Views**:
    - ``th_view_account_reconcile_model_form_inherit``: Form view tùy chỉnh chung cho chức năng tạo bút toán khi đối soát hóa đơn với phiếu thanh toán.

9. Đối soát sao kê ngân hàng (BankRecWidget)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Model kế thừa**:

- ``bank.rec.widget`` (từ module gốc ``account``)

**Mục đích kế thừa**:

- Mở rộng model ``bank.rec.widget`` để thêm các trường và logic hỗ trợ đối soát sao kê ngân hàng, sửa domain lọc theo các tài khoản ghi chênh.

**View / Action / Menu**:

- **Views**:
    - ``th_view_bank_statement_line_tree_bank_rec_widget_inherit``: Tree view tùy chỉnh chung cho tính năng đối soát sao kê ngân hàng.

10. Quản lý sản phẩm (ProductTemplate)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Model kế thừa**:

- ``product.template`` (từ module gốc ``account``)

**Mục đích kế thừa**:

- Mở rộng model ``product.template`` để thêm các trường và logic hỗ trợ quản lý sản phẩm, phân biệt bộ sản phẩm của kế toán và các bên kinh doanh.

**View / Action / Menu**:

- **Actions**:
    - ``product_product_action_sellable``: Thêm domain phân biệt bộ sản phẩm của kế toán và các bên kinh doanh với menu sản phẩm bán.
    - ``product_product_action_purchasable``: Thêm domain phân biệt bộ sản phẩm của kế toán và các bên kinh doanh với menu sản phẩm mua.

11. Cấu hình hệ thống (ResConfigSettings)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Model kế thừa**:

- ``res.config.settings`` (từ module gốc ``account``)

**Mục đích kế thừa**:

- Mở rộng model ``res.config.settings`` để thêm các trường và logic hỗ trợ cấu hình hệ thống, thêm nhân viên kế toán để nhận email thông báo hóa đơn cần thanh toán.
- Tùy chỉnh các hàm xử lý hóa đơn để đáp ứng các yêu cầu đặc thù của nghiệp vụ kế toán như thêm nhân viên kế toán để nhận email thông báo hóa đơn cần thanh toán.

**Logic hoặc hàm thay đổi**:

- **Hàm ghi đè/thay đổi**:
    - ``get_values``: Ghi đè hàm gốc để cho phép lựa chọn các nhân viên có tích quyền Nhân viên kế toán AUM để nhận email thông báo hóa đơn cần thanh toán.
    - ``set_values``: Ghi đè hàm gốc để cho phép lưu các nhân viên có tích quyền Nhân viên kế toán AUM để nhận email thông báo hóa đơn cần thanh toán.

**View / Action / Menu**:

- **Views**:
    - ``th_res_config_settings_view_form_finance``: Form view tùy chỉnh chung cho cấu hình hệ thống module Kế toán.
