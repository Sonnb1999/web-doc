.. _abs_attendances_module:

Module PMS (th_pms)
=====================

Tổng quan
---------

**Kế thừa module**:

- ``th_crm``
- ``th_setup_parameter``

**Mục tiêu**:

Module ``th_pms`` được kế thừa và mở rộng các chức năng quản lý hồ sơ chấm công trong module gốc ``th_setup_parameter`` và ``th_crm`` có thêm các chức năng như check trùng xử lý cơ hội, tạo hồ sơ, bàn giao hồ sơ,...

Chức năng chỉnh sửa
------------------

1. Quản lý cơ hội (th_crm)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**:

- ``crm.lead`` (từ module gốc ``crm.lead``)

**Mục đích kế thừa**:

- Kế thừa crm.lead để thêm mới các trường thông tin cần thiết và xử lý tạo mới hồ sơ từ cơ hội CRM, thêm các logic check trùng theo ma trận đã cấu hình.

**Hàm ghi đè/thay đổi**:

- ``write``: Ghi đè hàm gốc để cấu hình tự động nhảy level khi có hồ sơ.

**View / Action / Menu**:

- **Views**:
    - ``crm_views.xml``: Kế thừa các formview và chỉnh sửa giao diện cho phù hợp.


2. Quản lý hồ sơ (th.student.profile)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**:

- ``th_student_profile`` (từ module gốc ``th_setup_parameters``)

**Mục đích kế thừa**:

- Kế thừa th_student_profile để thêm mới các trường thông tin cần thiết và liên kết với cơ hội CRM.

**Hàm ghi đè/thay đổi**:

- ``create``: Ghi đè hàm gốc để đồng bộ với dữ liệu cơ hội và tự động đẩy cơ hội sang level phù hợp.
- ``write``: Ghi đè hàm gốc để cập nhật hồ sơ thì ghi lại ngày check, đồng bộ batch và ngày bàn giao, đồng thời tự động đẩy cơ hội sang level phù hợp.

**View / Action / Menu**:

- **Views**:
    - ``th_student_profile.xml``: Kế thừa các formview,treeview và chỉnh sửa giao diện cho phù hợp.



3. Quản lý Lognote (mail.message)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Mục đích kế thừa**:

- Kế thừa mail.message để đồng bộ lognote giữa cơ hội và hồ sơ.

4. Quản lý ma trận Level (th.level.condition)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
**Model kế thừa**:

- ``th.level.condition`` (từ module gốc ``th_crm``)

**Mục đích kế thừa**:

- Kế thừa để cấu hình ma trận tự động nhảy level.

