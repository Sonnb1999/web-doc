Mở rộng QLTS (th_maintenance)
=============================

Tổng quan
---------

**Kế thừa module**:

- ``base``
- ``maintenance``
- ``web_domain_field``
- ``th_employee``

**Mục tiêu**:

Module ``th_maintenance`` được kế thừa và mở rộng các chức năng quản lý chấm công trong module gốc ``maintenance`` của Odoo. Module này bổ sung các tính năng như lưu trữ thông tin tài sản, thực hiện kiểm kê, sửa chữa các loại tài sản, bảo trì, nâng cấp các loại tài sản, thanh lý các tài sản không còn được sử dụng.

Chức năng chỉnh sửa
-------------------

1. Quản lý tài sản (MaintenanceEquipment)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**:

- ``maintenance.equipment`` (từ module gốc ``maintenance``)

**Mục đích kế thừa**:

- Mở rộng model ``maintenance.equipment`` trong module gốc ``maintenance``. Thêm các trường thông tin quan trọng như thông tin thanh lý, thông tin đội nhóm bảo trì, thông tin đơn vị sở hữu,thông số kỹ thuật, trạng thái của sản phẩm, phân loại sim thẻ và tài sản thông thường,....
- Tùy chỉnh các hàm xử lý để phân loại rõ ràng tài sản sim thẻ và tài sản bình thường, để chỉnh sửa các thông tin dựa theo từng thái thái của sản phẩm và danh mục sản phẩm. Thêm cron job để gửi mail bảo trì

**Logic hoặc hàm thay đổi**:

- **Hàm ghi đè/thay đổi**:
  - ``write``: Ghi đè hàm write để khi thay đổi thông tin, thì các trường thông tin phụ thuộc nó cũng sẽ thay đổi.
  - ``default_get``: Cung cấp giá trị mặc định là quyền sở hữu tài sản, kết hợp với th_action_maintenance_equipment sử dụng trong kaban view.

**View / Action / Menu**:

- **Views**:
  - ``view_owner_equipment_kanban``: Kaban view thể hiện các danh mục tài sản (Hiện nay có danh mục cá nhân và dùng chung).
  - ``inherit_hr_equipment_tree``: Thêm các thông tin của tài sản cho tree view kế thừa từ maintenance.hr_equipment_view_tree.
  - ``hr_equipment_view_form``: Thêm các thông tin của tài sản cho form view như trạng thái tài sản, thông tin về trạng thái thanh lý, thông tin về thiết bị, thông số thiết bị , các thông tin riêng về sim. Ẩn button xem trạng thái bảo trì với người dùng không có quyền. Kế thừa từ maintenance.hr_equipment_view_form
  - ``hr_equipment_view_search_inherit``: Tùy chỉnh lại 4 bộ lọc (my, assigned, available, inactive) và thêm 1 bộ lọc mới để nhóm theo loại tài sản (th_asset_type) kế thừa từ maintenance.hr_equipment_view_search.

- **Actions**:
  - ``view_owner_equipment_kanban``: Hiển thị kaban view của tài sản theo quyền sở hữu tài sản

- **Menus**:
  - ``menu_equipment_form``: Được định nghĩa trong ``maintenance_menu_views.xml`` dưới mục cha ``th_maintenance.menu_asset_list``.

2. Nhóm thiết bị (MaintenanceEquipmentCategory)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**:

- ``maintenance.equipment.category`` (từ module gốc ``maintenance``)

**Mục đích kế thừa**:

- Bổ sung các mối quan hệ với đội bảo trì, thông số kĩ thuật và loại tài sản

**Logic hoặc hàm thay đổi**:

**View / Action / Menu**:

- **Views**:
  - ``hr_equipment_category_view_tree_inherit``: Kế thừa từ maintenance.hr_equipment_category_view_tree để thêm đội nhóm bảo trì
  - ``hr_equipment_category_view_form_inherit``: Kế thừa từ maintenance.hr_equipment_category_view_form để thêm đội nhóm bảo trì, thông số kĩ thuật và loại tài sản

- **Actions**:

- **Menus**:

3. Yêu cầu bảo trì (MaintenanceRequest)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**:

- ``maintenance.request`` (từ module gốc ``maintenance``)

**Mục đích kế thừa**:

- Mở rộng model ``hr.employee`` để thêm các thông tin như đội nhóm bảo trì, người bảo trì, phòng ban sở hữu thiết bị

**Logic hoặc hàm thay đổi**:

- **Hàm ghi đè/thay đổi**:
  - ``onchange_equipment_id``: Khi đổi tài sản thì cập nhật đội bảo trì và người bảo trì

**View / Action / Menu**:

- **Views**:
  - ``hr_equipment_request_view_form_inherit``: Kế thừa từ maintenance.hr_equipment_request_view_form để thay thế các thông tin như đội nhóm bảo trì và người bảo trì

- **Menus**:


View / Action / Menu (Tổng quan)
--------------------------------

- **Views**:
    - ``view_owner_equipment_kanban``
    - ``inherit_hr_equipment_tree``
    - ``hr_equipment_view_form``
    - ``hr_equipment_view_search_inherit``
    - ``hr_equipment_category_view_tree_inherit``
    - ``hr_equipment_category_view_form_inherit``
    - ``hr_equipment_request_view_form_inherit``

- **Actions**:
    - `view_owner_equipment_kanban`

- **Menus**:
    - `Tài sản`
        - `Danh mục tài sản`
