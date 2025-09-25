Chi tiết chức năng
------------------

A. API Sản phẩm
~~~~~~~~~~~~~~~
1. Lấy danh sách sản phẩm
^^^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động

- Gửi yêu cầu POST đến endpoint /api/products với thông tin loại sản phẩm (VMC, VSTEP)
- API xác thực quyền truy cập thông qua API Key
- Hệ thống trả về danh sách sản phẩm theo loại được yêu cầu
- Thông tin sản phẩm bao gồm: ID, loại, tên, giá, mã sản phẩm, trạng thái bán, thông tin combo

1.2 Một số hàm quan trọng

- get_products_template: Xử lý yêu cầu lấy danh sách sản phẩm. Hàm này thực hiện:
    + Kiểm tra xác thực người dùng thông qua API Key
    + Xác định loại sản phẩm (VMC, VSTEP) từ yêu cầu
    + Truy vấn danh sách sản phẩm từ model product.template theo loại
    + Định dạng dữ liệu sản phẩm theo cấu trúc JSON để trả về

B. API Danh mục sản phẩm
~~~~~~~~~~~~~~~~~~~~~~~~
1. Lấy danh mục sản phẩm
^^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động

- Gửi yêu cầu POST đến endpoint /api/categories với thông tin loại danh mục
- API xác thực quyền truy cập thông qua API Key
- Hệ thống trả về danh sách danh mục sản phẩm theo loại được yêu cầu
- Thông tin danh mục bao gồm: ID, tên, ID danh mục cha, loại danh mục

1.2 Một số hàm quan trọng

- get_categories: Xử lý yêu cầu lấy danh mục sản phẩm. Hàm này thực hiện:
    + Kiểm tra xác thực người dùng thông qua API Key
    + Truy vấn danh sách danh mục từ model product.category theo loại
    + Định dạng dữ liệu danh mục theo cấu trúc JSON để trả về

C. API Đơn hàng
~~~~~~~~~~~~~~~
1. Lấy danh sách đơn hàng
^^^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động

- Gửi yêu cầu POST đến endpoint /api/saleorders với thông tin khoảng thời gian và loại đơn hàng
- API xác thực quyền truy cập thông qua API Key
- Hệ thống trả về danh sách đơn hàng theo khoảng thời gian và loại được yêu cầu
- Thông tin đơn hàng bao gồm: thông tin khách hàng, chi tiết đơn hàng, trạng thái, mã giảm giá

1.2 Một số hàm quan trọng

- get_saleorders: Xử lý yêu cầu lấy danh sách đơn hàng. Hàm này thực hiện:
    + Kiểm tra xác thực người dùng thông qua API Key
    + Xác định khoảng thời gian và loại đơn hàng từ yêu cầu
    + Truy vấn danh sách đơn hàng từ model sale.order theo điều kiện
    + Lấy thông tin chi tiết đơn hàng, khách hàng, mã giảm giá
    + Định dạng dữ liệu đơn hàng theo cấu trúc JSON để trả về

D. API Chương trình khuyến mãi
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Lấy danh sách chương trình khuyến mãi
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động

- Gửi yêu cầu POST đến endpoint /api/loyaltyprograms với thông tin loại chương trình
- API xác thực quyền truy cập thông qua API Key
- Hệ thống trả về danh sách chương trình khuyến mãi theo loại được yêu cầu
- Thông tin chương trình bao gồm: tên, loại, ngày bắt đầu, ngày kết thúc, quy tắc, phần thưởng

1.2 Một số hàm quan trọng

- get_loyalty_programs: Xử lý yêu cầu lấy danh sách chương trình khuyến mãi. Hàm này thực hiện:
    + Kiểm tra xác thực người dùng thông qua API Key
    + Xác định loại chương trình (VMC, VSTEP) từ yêu cầu
    + Truy vấn danh sách chương trình từ model loyalty.program theo loại
    + Lấy thông tin chi tiết về quy tắc và phần thưởng của từng chương trình
    + Định dạng dữ liệu chương trình theo cấu trúc JSON để trả về
