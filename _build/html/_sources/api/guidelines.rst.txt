2. Quy tắc & Phương thức thực hiện
==================================

2.1 Quy tắc đặt tên
-------------------
- Dùng **danh từ số nhiều**: ``/users``, ``/orders``.
- Dùng **snake_case** cho field trong JSON (Snake case là khi tất cả các chữ cái trong từ đều viết thường nhưng được phân cách bằng dấu gạch dưới).
- Tránh động từ trong endpoint (sai: ``/getUsers``, đúng: ``/users``).
- Tránh lồng route quá sâu (``/a/b/c/d/f/g`` ...).

2.2 Versioning
--------------
- Tích hợp version trong URL: ``/v1/users``
- Các thay đổi breaking sẽ ra bản ``/v2/``.

2.3 Status Codes chuẩn
----------------------
.. list-table:: Status Codes
   :header-rows: 1

   * - Code
     - Ý nghĩa
     - Mô tả
   * - 200
     - OK
     - Thành công
   * - 201
     - Created
     - Tạo mới thành công
   * - 400
     - Bad Request
     - Request không hợp lệ
   * - 401
     - Unauthorized
     - Thiếu hoặc sai token
   * - 403
     - Forbidden
     - Không có quyền truy cập
   * - 404
     - Not Found
     - Không tìm thấy resource
   * - 500
     - Internal Server Error
     - Lỗi server

2.4 Error Handling
------------------
Trả về JSON có cấu trúc thống nhất::

    {
      "status": "error",
      "message": "Invalid email format",
      "code": 400
    }

2.5 Successful processing:
Trả về JSON có cấu trúc thống nhất::
.. code-block:: json

   {
     "status": "success",
     "message": "Thành công.",
     "code": 200,
     "data": { "...": "..." }
   }


2.5 Rate Limiting
-----------------
- Tối đa **100 requests/phút** cho mỗi API key.
- Quá giới hạn → trả về ``429 Too Many Requests``.
