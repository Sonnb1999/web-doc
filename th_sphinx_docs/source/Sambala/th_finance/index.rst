FINANCE
=======

Tổng quan
---------

A. Mô tả module
~~~~~~~~~~~~~~~
Finance là module dùng để kế thừa và customise các tính năng, logic của các model thuộc nghiệp vụ kế toán (account.move, sale.order,...) nhằm phục vụ cho logic nghiệp vụ Kế toán chung của cả hệ thống Sambala.

B. Đối tượng sử dụng
~~~~~~~~~~~~~~~~~~~~
1. Nhân viên Kế toán

C. Phụ thuộc (các module liên quan)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. account_accountant
2. account_payment
3. sale

D. Chức năng chính
~~~~~~~~~~~~~~~~~~
1. Quản lý Hóa đơn
2. Quản lý Sản phẩm
3. Chuyển quỹ nội bộ
4. Sổ thu chi

E. Các quyền trong module
~~~~~~~~~~~~~~~~~~~~~~~~~
1. Phân quyền theo nhóm sổ nhật ký


Chi tiết module:
----------------

.. toctree::
   :maxdepth: 2

   workflows
   security
   extension