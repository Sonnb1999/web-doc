LPM
===

Tổng quan
---------

1.Mô tả module
~~~~~~~~~~~~~~

Module "ABS Kế hoạch sản Xuất" (th_lpm) là một phần của hệ thống AUM Business System (ABS), được phát triển để quản lý kế hoạch sản xuất học liệu. Module này cung cấp các công cụ để:

* Quản lý dự án sản xuất học liệu
* Quản lý tiêu chuẩn sản xuất
* Quản lý sản phẩm học liệu cần sản xuất
* Tính toán chi phí sản xuất

Module được thiết kế để hỗ trợ việc lập kế hoạch, theo dõi, và phê duyệt quy trình sản xuất học liệu.

2.Đối tượng sử dụng
~~~~~~~~~~~~~~~~~~~

Module này được thiết kế cho các đối tượng sau:

* Nhân viên quản lý kế hoạch sản xuất học liệu
* Quản lý dự án sản xuất học liệu
* Quản trị viên hệ thống phụ trách cấu hình và phê duyệt
* Các đơn vị và trường đại học cần sản xuất học liệu

Cụ thể, module phân chia người dùng thành 3 nhóm chính:

* Nhân viên (group_lpm_user): Có quyền truy cập cơ bản vào hệ thống
* Quản lý (group_lpm_leader): Có quyền phê duyệt sản phẩm và các chức năng nâng cao hơn
* Quản trị viên (group_lpm_administrator): Có quyền cấu hình toàn bộ hệ thống

3.Phụ thuộc (các module liên quan)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Module th_lpm phụ thuộc vào các module sau:

* mail: Hỗ trợ tính năng thảo luận và theo dõi
* approvals: Hỗ trợ quy trình phê duyệt
* base: Module cơ bản của Odoo
* th_setup_parameters: Module cài đặt tham số
* product: Quản lý sản phẩm
* form_readonly: Hỗ trợ form chỉ đọc sau khi phê duyệt

4.Chức năng chính
~~~~~~~~~~~~~~~~~

1. Quản lý dự án sản xuất học liệu:
    * Tạo và quản lý dự án sản xuất học liệu (th.project.lpm)
    * Theo dõi thông tin dự án như mã dự án, tên, mô tả, phạm vi, đơn vị thực hiện,...
    * Quản lý người chủ trì và thành viên dự án
    * Thiết lập thời gian bắt đầu và kết thúc dự án
    * Tổng hợp chi phí dự án theo nhiều cách tính (tín chỉ, môn học)

2. Quản lý sản phẩm học liệu sản xuất:
    * Quản lý chi tiết sản phẩm học liệu (th.product.manufacturing)
    * Hỗ trợ nhiều loại học liệu: lý thuyết, thực hành, đồ án
    * Phân loại môn học: cơ sở, chuyên ngành, đại cương, thực tập
    * Theo dõi thông tin chi tiết như mã học phần, số tín chỉ, ngành học

3. Tiêu chuẩn sản xuất học liệu:
    * Xây dựng tiêu chuẩn sản xuất (th.production.standard)
    * Quản lý phiên bản sản xuất và đơn vị sử dụng

Chi tiết module:
----------------

.. toctree::
   :maxdepth: 2

   workflows
   security
