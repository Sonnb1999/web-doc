Chi tiết chức năng
------------------

A. Đơn vị sở hữu
~~~~~~~~~~~~~~~~

**1. Luồng hoạt động:**

- Người dùng truy cập menu "Cài đặt thông số" -> "Đơn vị sở hữu", tạo hoặc cập nhật bản ghi đơn vị sở hữu:

    - Kiểm tra nếu đã tồn tại đơn vị với name và th_code tương ứng.
        + Nếu chưa có: gọi ``th_create_ownership_unit`` để tạo mới bản ghi.
        + Nếu đã có hoặc đang cập nhật: gọi ``th_create_or_update_ownership_unit``.
    - Hệ thống đồng bộ dữ liệu nếu ``is_mapping=True``:
        + Lấy dữ liệu qua ``get_data_sync``.
        + Truyền dữ liệu vào hàm ``th_func_create_or_update`` để đẩy sang hệ thống ngoài.
    - Khi người dùng xóa bản ghi:
        + Hệ thống gọi ``th_delete_ownership_unit``, truyền dữ liệu vào ``th_func_delete`` để đồng bộ xóa.

**2. Các hàm liên quan:**

- ``th_create_ownership_unit``: tạo mới một bản ghi trong model ``ThOwnershipUnitAFF`` nếu chưa tồn tại bản ghi trùng ``name`` và ``th_code``
- ``get_data_sync``: lấy thông tin data từ record để lưu vào th_data và gửi đồng bộ nếu ``is_mapping=True``
- ``th_create_or_update_ownership_unit``: được gọi khi tạo hoặc cập nhật đơn vị sở hữu, lấy dữ liệu (val) truyền qua hàm ``th_func_create_or_update`` để đồng bộ
- ``th_delete_ownership_unit``: được gọi khi xóa đơn vị sở hữu, lấy dữ liệu (val) truyền qua hàm ``th_func_delete`` để đồng bộ

B. Xuất xứ
~~~~~~~~~~
**1. Luồng hoạt động:**

- Người dùng thao tác tại "Cài đặt thông số" → "Xuất xứ và ngành học" → "Xuất xứ". Khi tạo/cập nhật bản ghi, hệ thống:

    - Cập nhật thông tin xuất xứ, ngành học, module sử dụng.
    - Nếu được cấu hình, hệ thống gọi ``update_th_warehouse`` để đồng bộ dữ liệu kho ra hệ thống ngoài thông qua XML-RPC.

**2. Các hàm liên quan:**

- ``update_th_warehouse``: đồng bộ dữ liệu kho từ Odoo lên một hệ thống bên ngoài qua API XML-RPC. Nó có thể tạo mới hoặc cập nhật kho trong hệ thống ngoài tùy theo hành động (create/write).

C. Ngành học
~~~~~~~~~~~~
**1. Luồng hoạt động:**

- Tại menu "Ngành học", người dùng thêm hoặc sửa thông tin ngành học (tên, mã, mô tả). Dữ liệu được lưu trong hệ thống.

D. Kênh
~~~~~~~
**1. Luồng hoạt động:**

- Người dùng truy cập menu "Kênh" để tạo/sửa thông tin kênh (tên, mô tả). Dữ liệu được lưu vào hệ thống nội bộ.

E. Vùng
~~~~~~~
**1. Luồng hoạt động:**

- Người dùng thao tác tại "Vùng và Trạm" → "Vùng". Khi tạo mới hoặc cập nhật, hệ thống lưu thông tin mã vùng và mô tả.

F. Trạm
~~~~~~~
1. Luồng hoạt động:

- Người dùng thao tác tại "Vùng và Trạm" → "Trạm". Khi tạo hoặc sửa, hệ thống lưu mã trạm và mô tả vào cơ sở dữ liệu.

G. Nhóm nguồn
~~~~~~~~~~~~~
1. Luồng hoạt động:

- Người dùng quản lý danh sách nhóm nguồn tại "Nhóm nguồn". Hệ thống lưu thông tin nhóm nguồn và mô tả tương ứng.

H. Tổ hợp môn
~~~~~~~~~~~~~
**1. Luồng hoạt động:**

- Người dùng tạo/sửa thông tin tổ hợp môn. Hệ thống lưu lại tên tổ hợp và mô tả phục vụ cho các logic tuyển sinh/đào tạo khác.

I. Nhóm trạng thái
~~~~~~~~~~~~~~~~~~
**1. Luồng hoạt động:**

- Người dùng truy cập menu "Trạng thái" → "Nhóm trạng thái" để cấu hình. Hệ thống lưu lại tên nhóm và mô tả.

J. Trạng thái chi tiết
~~~~~~~~~~~~~~~~~~~~~~
**1. Luồng hoạt động:**

- Tại menu "Trạng thái chi tiết", người dùng tạo/cập nhật trạng thái chi tiết. Dữ liệu được lưu trong hệ thống để liên kết tới các quy trình sử dụng trạng thái.

K. Hệ tốt nghiệp
~~~~~~~~~~~~~~~~
**1. Luồng hoạt động:**

- Người dùng tạo hệ tốt nghiệp tại menu tương ứng, hệ thống lưu mã và tên hệ tốt nghiệp vào cơ sở dữ liệu.

N. Phân hệ
~~~~~~~~~~
**1. Luồng hoạt động:**

- Hiển thị danh sách các module (phân hệ) đang có, không cho phép chỉnh sửa. Chỉ dùng để tra cứu và theo dõi.

M. Nhóm sản phẩm
~~~~~~~~~~~~~~~~
**1. Luồng hoạt động:**

- Người dùng tạo/cập nhật nhóm sản phẩm. Hệ thống xử lý:

    - Lưu các thông tin: danh mục, xuất xứ, logistics, loại sản phẩm...
    - Liên kết với sản phẩm qua smart button để truy xuất nhanh danh sách sản phẩm thuộc nhóm.

L. Form nhúng
~~~~~~~~~~~~~
**1. Luồng hoạt động:**

- Khi hệ thống ngoài gửi mã form nhúng về, hệ thống lưu thông tin tại menu "Form nhúng". Các bước gồm:

    - Nhận UUID, module, đơn vị sở hữu,...
    - Lưu thông tin form để phục vụ thống kê, theo dõi chiến dịch đăng ký hoặc marketing.

O. Ẩn log
~~~~~~~~~
P. Log api
~~~~~~~~~~
**1. Luồng hoạt động:**

- Dùng để lưu lại log của fastapi luồng tự động của hệ thống
