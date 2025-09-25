Chi tiết chức năng
------------------

A. Quản lý tài sản chung
~~~~~~~~~~~~~~~~~~~~~~~~
1. Tạo task từ task đã có
^^^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động

- Truy cập module Dự án -> Truy cập task -> Ấn thực hiện -> Chuyển thành nhiệm vụ
- Hiển thị ra form -> Điền thông tin cho form  -> Bấm chuyển

1.2 Hàm liên quan

- ``action_convert_to_task``

2. Quản lý deadline cho task
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2.1 Luồng hoạt động

- Truy cập module Dự án -> Truy cập task -> Điền deadline cho task
- Khi người dùng ấn thực hiện task, odoo sẽ tự động tính toán tiến độ của task

2.2 Hàm liên quan

- ``_compute_th_evaluate_type``
- ``get_th_evaluate_type_value``
- ``_compute_th_domain_stage``