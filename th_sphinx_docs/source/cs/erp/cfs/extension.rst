.. _abs_attendances_module:

Module CFS (th_cfs)
=====================

Tổng quan
---------

**Kế thừa module**:

- ``th_crm``

**Mục tiêu**: 

- Module ``th_cfs`` được kế thừa và mở rộng các chức năng quản lý chăm sóc khách hàng

Chức năng chỉnh sửa
-------------------

1. Quản lý cơ hội (crm)
~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**:

- ``crm.lead`` (từ module gốc ``crm.lead``)


**Mục đích kế thừa**:

- Kế thừa crm.lead để thêm chức năng tái kho lên cskh từ kho


2. Quản lý đội nhóm CRM (crm team)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**:

- ``crm.team`` (từ module gốc ``th_crm``)

**Mục đích kế thừa**:

- Kế thừa crm.team để thêm mới các trường thông tin cần thiết..


3. Quản lý người dùng (res.users)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Mục đích kế thừa**:

- Kế thừa res.user để thêm mới trường thông tin cần thiết.

