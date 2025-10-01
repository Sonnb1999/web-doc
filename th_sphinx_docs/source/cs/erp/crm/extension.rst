.. _abs_attendances_module:

Mở rộng CRM (th_crm)
====================

Tổng quan
---------

**Kế thừa module**:

- ``crm``
- ``sales_team``
- ``sale_crm``
- ``account``

**Mục tiêu**:

Module ``th_crm`` được kế thừa và mở rộng các chức năng quản lý chấm công trong module gốc ``crm`` của Odoo.Module này có thêm các chức năng như check trùng xử lý cơ hội, tạo hồ sơ, hệ thống xét tuyển,...

Chức năng chỉnh sửa
-------------------

1. Quản lý cơ hội (crm)
~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**:

- ``crm.lead`` (từ module gốc ``crm.lead``)


**Mục đích kế thừa**:

- Kế thừa crm.lead để thêm mới các trường thông tin cần thiết và xử lý tạo mới cơ hội CRM, thêm các logic check trùng theo ma trận đã cấu hình.
- Xử lý khi tạo mới đơn hàng trong crm.lead sẽ tự động xác nhận đơn hàng và tạo hóa đơn.

- **Hàm ghi đè/thay đổi**:
  - ``create``: Ghi đè hàm gốc để hỗ trợ import file, tạo mới 'partner_id' khi chưa có liên hệ để tạo cơ hội. Xử lý trùng cơ hội khi cơ hội mới bị đánh dấu trùng với cơ hội đã có.
  - ``write``: Ghi đè hàm gốc để lưu lại ngày liên hệ cuối của cơ hội,  Xử lý trùng cơ hội khi cơ hội bị đánh dấu trùng với cơ hội đã có.
  - ``action_sale_quotations_new``: Ghi đè để bổ sung các thông tin cho đơn hàng CRM, đánh dấu đơn hàng là của CRM và tự động tạo hóa đơn.

**View / Action / Menu**:

- **Views**:
  - ``crm_views.xml``: Kế thừa các formview,treeview,searchview và chỉnh sửa giao diện cho phù hợp.

- **Actions**:
  - ``action_mark_as_lost``: Kế thừa Hành động mở treeview cơ hội, đưa action này về chế độ người phát triển.

- **Menus**:
  - ``res_partner_menu_customer``: Kế thừa Menu mở treeview khách hàng, lưu trữ Menu này(ẩn đi) .
  - ``menu_crm_lost_reason``: Kế thừa Menu mở treeview Lý do thua, lưu trữ Menu này(ẩn đi) .
  - ``crm_menu_root``: Kế thừa Menu mở module CRM, thêm và bỏ 1 số quyền người dùng truy cập .
  - ``crm_menu_config``: Kế thừa Menu mở module Cấu hình, thêm và bỏ 1 số quyền người dùng truy cập .

2. Quản lý đội nhóm CRM (crm team)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**:
- ``crm.team`` (từ module gốc ``crm.team``)
**Mục đích kế thừa**:

- Kế thừa crm.team để thêm mới các trường thông tin cần thiết và quy chuẩn các cấp bậc đội nhóm, thêm các logic cắm cờ khi cần chia cơ hội.

- **Hàm ghi đè/thay đổi**:
  - ``create``: Ghi đè hàm gốc để hỗ trợ đánh dấu trưởng nhóm cho user.
  - ``write``: Ghi đè hàm gốc để cập nhật lại thành viên, trưởng nhóm giám sát của từng đội nhóm.

3. Quản lý mối quan hệ CRM (crm.stage)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**:
- ``crm.stage`` (từ module gốc ``crm.stage``)

**Mục đích kế thừa**:

- Kế thừa crm.stage để thêm mới các trường thông tin cần thiết, phân biệt stage cho crm.lead và ccs.lead.
- Thêm ràng buộc khi tạo mới Mối quan hệ

- **Hàm ghi đè/thay đổi**:
  - ``create``: Ghi đè hàm gốc để hỗ trợ đánh dấu trưởng nhóm cho user.
  - ``write``: Ghi đè hàm gốc để cập nhật lại thành viên, trưởng nhóm giám sát của từng đội nhóm.

4. Quản lý người dùng (res.users)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Mục đích kế thừa**:
- Kế thừa res.user để thêm mới trường thông tin cần thiết(thêm trường lưu các quản lý CRM).

5. Quản lý người dùng (sale.order)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Mục đích kế thừa**:
- Kế thừa sale.order để thêm mới trường thông tin cần thiết được related từ bên CRM.
- Tạo mới đơn hàng sẽ tự động đánh dấu đơn hàng thuộc CRM và tạo hóa đơn
- Hủy đơn hàng CRM cần có quyền admin mới được tạo

- **Hàm ghi đè/thay đổi**:
  - ``create``: Ghi đè hàm gốc để hỗ trợ kiểm tra sản phẩm của đơn hàng, đánh dấu đơn hàng thuộc CRM.
  - ``action_cancel``: Ghi đè hàm gốc để hỗ trợ kiểm tra quyền, nếu là admin mới hủy đơn

**View / Action / Menu**:
  -file ``sale_order_view.xml``: Kế thừa các formview,treeview,searchview và chỉnh sửa giao diện cho phù hợp yêu cầu từ người dùng.

6. Quản lý Lognote (mail.message)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Mục đích kế thừa**:

- Kế thừa mail.message để đồng bộ lognote giữa cơ hội và hồ sơ.

- **Hàm ghi đè/thay đổi**:
  - ``create``: Ghi đè hàm gốc để hỗ trợ kiểm tra sản phẩm của đơn hàng, đánh dấu đơn hàng thuộc CRM.

7. Quản lý người dùng (account.move)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Mục đích kế thừa**:
- Kế thừa account.move để thêm mới trường thông tin cần thiết được related từ bên CRM.
- Tạo mới hóa đơn sẽ tự động đánh dấu đơn hàng thuộc CRM và xác nhận hóa đơn


- **Hàm ghi đè/thay đổi**:
  - ``create``: Ghi đè hàm gốc để hỗ trợ thông báo mã hóa đơn về cơ hội CRM khi hóa đơn đã được tạo.

**View / Action / Menu**:
  -file ``account_move_view.xml``: Kế thừa các formview,treeview,searchview và chỉnh sửa giao diện cho phù hợp yêu cầu từ người dùng.
