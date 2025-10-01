TH_EMPLOYEE
===========

Tổng quan
---------

A. Mô tả module
~~~~~~~~~~~~~~~
Module th_mployee là hệ thống quản lý thông tin nhân viên. Mục tiêu chính là hỗ trợ:

1. Quản lý hồ sơ nhân viên
2. Theo dõi quá trình làm việc của nhân viên
3. Quản lý thông tin học vấn và trình độ chuyên môn
4. Quản lý thông tin lương và ngạch bậc
5. Theo dõi trạng thái làm việc của nhân viên

B. Đối tượng sử dụng
~~~~~~~~~~~~~~~~~~~~
1. Nhân viên phòng nhân sự
2. Quản lý phòng nhân sự
3. Quản lý các bộ phận
4. Người quản trị hệ thống

C. Phụ thuộc (các module liên quan)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. base
2. hr

D. Chức năng chính
~~~~~~~~~~~~~~~~~~
1. Quản lý thông tin nhân viên
2. Quản lý bằng cấp và trình độ học vấn
3. Quản lý thông tin lương và ngạch bậc
4. Theo dõi lịch sử lương
5. Quản lý thông tin người phụ thuộc (con cái)
6. Theo dõi trạng thái làm việc của nhân viên
7. Quản lý tài khoản ngân hàng của nhân viên
8. Quản lý thông tin địa điểm làm việc

E. Các quyền trong module
~~~~~~~~~~~~~~~~~~~~~~~~~
1. Người dùng cơ bản: Xem thông tin cơ bản về nhân viên
2. Nhân viên nhân sự: Quản lý thông tin nhân viên
3. Quản lý nhân sự: Quản lý đầy đủ thông tin nhân viên và cấu hình hệ thống
4. Quản trị viên: Toàn quyền quản lý module

Chi tiết module:
----------------

.. toctree::
   :maxdepth: 2

   workflows
   security
   extension
