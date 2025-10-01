FEEDBACK
========

Tổng quan
---------

A. Mô tả module:
~~~~~~~~~~~~~~~~

Module Feedback là hệ thống quản lý và xử lý các phản hồi từ người dùng.

B. Đối tượng sử dụng
~~~~~~~~~~~~~~~~~~~~

Nhân viên công ty có nhiệm vụ thu thập và xử lý phản hồi từ khách hàng.

C. Phụ thuộc (các module liên quan)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1.	base
2.	mail
3.	sale
4.	th_setup_parameters

D. Chức năng chính
~~~~~~~~~~~~~~~~~~
1. Quản lý phiếu feedback

- Tạo và theo dõi phản hồi
- Phân loại và đánh giá mức độ ưu tiên
- Gom nhóm các lỗi
- Phân công và xử lý

2. Cấu hình: Thiết lập danh mục, giai đoạn, đội, đối tác, vị trí thành phần, cấu hình phân loại, SLA

E. Các quyền trong module
~~~~~~~~~~~~~~~~~~~~~~~~~

1.	Người dùng
2.	Người phân loại
3.	Người xử lý
4.	Quản lý
5.	Quản trị viên

Chi tiết module:
----------------

.. toctree::
   :maxdepth: 2

   workflows
   security