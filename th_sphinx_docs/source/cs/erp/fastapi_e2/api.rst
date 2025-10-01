Endpoint
--------

A. Cấu hình Endpoint
~~~~~~~~~~~~~~~~~~~~
1. Tạo Endpoint
^^^^^^^^^^^^^^^
1.1 Luồng hoạt động

- Truy cập menu FastAPI -> Endpoints
- Tạo mới endpoint với thông tin:
    + Tên: Tên của endpoint
    + Ứng dụng: Chọn "E2"
    + Phương thức xác thực: Chọn "Api Key"
    + API Key: Nhập khóa API để xác thực
    + URL truy cập: Thêm các URL được phép truy cập API

1.2 Một số lưu ý

- API Key phải được bảo mật và chỉ chia sẻ với các ứng dụng đáng tin cậy
- URL truy cập cần được cấu hình chính xác để tránh lỗi CORS
- Endpoint cần được khởi động lại sau khi thay đổi cấu hình

B. Danh sách API
~~~~~~~~~~~~~~~~
1. API Sản phẩm
^^^^^^^^^^^^^^^
1.1 Thông tin API

- Endpoint: /api/products
- Phương thức: POST
- Tham số đầu vào:
    + product_type: Loại sản phẩm (VMC, VSTEP)
- Kết quả trả về:
    + Danh sách sản phẩm theo loại
    + Mỗi sản phẩm bao gồm: ID, tên, giá, mã, loại, trạng thái bán, thông tin combo

2. API Danh mục sản phẩm
^^^^^^^^^^^^^^^^^^^^^^^^
2.1 Thông tin API

- Endpoint: /api/categories
- Phương thức: POST
- Tham số đầu vào:
    + categ_type: Loại danh mục
- Kết quả trả về:
    + Danh sách danh mục sản phẩm theo loại
    + Mỗi danh mục bao gồm: ID, tên, ID danh mục cha, loại danh mục

3. API Đơn hàng
^^^^^^^^^^^^^^^
3.1 Thông tin API

- Endpoint: /api/saleorders
- Phương thức: POST
- Tham số đầu vào:
    + time_start: Thời gian bắt đầu
    + time_end: Thời gian kết thúc
    + order_type: Loại đơn hàng
- Kết quả trả về:
    + Danh sách đơn hàng theo khoảng thời gian và loại
    + Mỗi đơn hàng bao gồm: thông tin khách hàng, chi tiết đơn hàng, trạng thái, mã giảm giá

4. API Chương trình khuyến mãi
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4.1 Thông tin API

- Endpoint: /api/loyaltyprograms
- Phương thức: POST
- Tham số đầu vào:
    + loyal_type: Loại chương trình (VMC, VSTEP)
- Kết quả trả về:
    + Danh sách chương trình khuyến mãi theo loại
    + Mỗi chương trình bao gồm: tên, loại, ngày bắt đầu, ngày kết thúc, quy tắc, phần thưởng
