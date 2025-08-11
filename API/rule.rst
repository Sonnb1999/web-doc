Rule chi tiết
==================

Quy tắc viết REST
-----------------

- Xác định **một** đối tượng cho mỗi router.
- Dùng **danh từ số nhiều** cho path endpoint (ví dụ: ``GET /users``, ``POST /products``).
- Gắn đúng HTTP method cho từng hành động (GET/POST/PUT/PATCH/DELETE).
- **Stateless**: mỗi request phải tự chứa đủ thông tin để xử lý, không phụ thuộc request khác.
- Định nghĩa rõ **response format** và **error handling**.
- Thêm **version** cho API (ví dụ: ``/v1/crm/lead``).
- Tránh lồng route quá sâu (``/a/b/c/d/f/g`` ...).

Response mẫu
------------

Thành công:

.. code-block:: json

   {
     "status": "success",
     "message": "Thành công.",
     "data": { "...": "..." }
   }

Thất bại:

.. code-block:: json

   {
     "status": "error",
     "message": "Đã có lỗi xảy ra. {Thông tin lỗi}",
     "code": 400
   }

Context bổ sung có thể đặt trong trường ``context`` tương tự trường ``data``.
