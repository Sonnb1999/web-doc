PROJECT APPROVALS
=================

Tổng quan
---------

A. Mô tả module
~~~~~~~~~~~~~~~
Module Project Approvals là cầu nối giữa module Phê duyệt (Approvals) và module Dự án (Project). Mục tiêu chính là hỗ trợ:

1. Chuyển đổi các yêu cầu phê duyệt thành nhiệm vụ dự án
2. Theo dõi liên kết giữa phê duyệt và nhiệm vụ
3. Tự động thông báo cho người yêu cầu khi phê duyệt được chuyển thành nhiệm vụ

B. Đối tượng sử dụng
~~~~~~~~~~~~~~~~~~~~
1. Quản lý dự án
2. Nhân viên phê duyệt
3. Người yêu cầu phê duyệt

C. Phụ thuộc (các module liên quan)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. approvals
2. project_enterprise
3. th_project_itc

D. Chức năng chính
~~~~~~~~~~~~~~~~~~
1. Chuyển đổi phê duyệt thành nhiệm vụ
2. Theo dõi liên kết giữa phê duyệt và nhiệm vụ
3. Thông báo tự động cho người yêu cầu

E. Các quyền trong module
~~~~~~~~~~~~~~~~~~~~~~~~~
1. Người dùng cơ bản: Có thể xem liên kết giữa phê duyệt và nhiệm vụ
2. Quản lý dự án: Có thể chuyển đổi phê duyệt thành nhiệm vụ

Chi tiết module:
----------------

.. toctree::
   :maxdepth: 2

   workflows
