FASTAPI E2
==========

Tổng quan
---------

A. Mô tả module
~~~~~~~~~~~~~~~
Module FastAPI E2 là hệ thống API cho phép tích hợp và trao đổi dữ liệu giữa Odoo và các ứng dụng bên ngoài. Mục tiêu chính là hỗ trợ:

1. Cung cấp API để truy xuất thông tin sản phẩm
2. Cung cấp API để truy xuất thông tin danh mục sản phẩm
3. Cung cấp API để truy xuất thông tin đơn hàng
4. Cung cấp API để truy xuất thông tin chương trình khuyến mãi

B. Đối tượng sử dụng
~~~~~~~~~~~~~~~~~~~~
1. Các ứng dụng bên ngoài cần tích hợp với hệ thống Odoo
2. Các website thương mại điện tử cần đồng bộ dữ liệu với Odoo

C. Phụ thuộc (các module liên quan)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. th_fastapi
2. fastapi
3. th_setup_parameters

D. Chức năng chính
~~~~~~~~~~~~~~~~~~
1. API lấy danh sách sản phẩm theo loại sản phẩm
2. API lấy danh mục sản phẩm theo loại danh mục
3. API lấy danh sách đơn hàng theo khoảng thời gian và loại đơn hàng
4. API lấy danh sách chương trình khuyến mãi theo loại

Chi tiết module:
----------------

.. toctree::
   :maxdepth: 2

   workflows
   api
