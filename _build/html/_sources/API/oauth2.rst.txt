OAuth 2.0 – Lấy Token
=====================

Tổng quan
---------
- **Grant type**: ``client_credentials`` (server-to-server).
- **Token type**: ``Bearer``.
- Sau khi nhận token, gửi kèm ở mọi API qua header: ``Authorization: Bearer <access_token>``.

Endpoint
--------
- **POST** ``/v1/auth/token``  (ví dụ: ``http://localhost:8016/v1/auth/token``)

Yêu cầu
-------
**Headers**

.. list-table::
   :header-rows: 1
   :widths: 25 45 10 40

   * - Trường
     - Mô tả
     - M/O
     - Giá trị mẫu
   * - Content-Type
     - Loại dữ liệu gửi
     - M
     - application/json
   * - api-key
     - Khóa truy cập (nếu hệ thống yêu cầu)
     - O
     - 1

**Body**

.. list-table::
   :header-rows: 1
   :widths: 25 45 10 20

   * - Trường
     - Mô tả
     - M/O
     - Kiểu
   * - client_id
     - Mã hệ thống được cấp
     - M
     - string
   * - client_secret
     - Khóa bí mật được cấp
     - M
     - string
   * - grant_type
     - Loại phát hành token (chỉ chấp nhận ``client_credentials``)
     - M
     - string

Ví dụ request (cURL)
--------------------
.. code-block:: bash

   curl -X POST 'http://localhost:8016/v1/auth/token' \
     -H 'accept: application/json' \
     -H 'Content-Type: application/json' \
     -H 'api-key: 1' \
     -d '{
           "grant_type": "client_credentials",
           "client_id": "your_client_id",
           "client_secret": "your_client_secret"
         }'

Phản hồi
--------
**HTTP 200 – Success**

.. code-block:: json

   {
     "access_token": "eyJ...snip...",
     "scope": "default",
     "token_type": "Bearer",
     "expires_in": 3600
   }

**Mô tả trường trả về**

.. list-table::
   :header-rows: 1
   :widths: 25 45 10 20

   * - Trường
     - Mô tả
     - M/O
     - Kiểu
   * - access_token
     - Token dùng cho các API tiếp theo (đặt vào header Authorization)
     - M
     - string
   * - scope
     - Phạm vi token
     - M
     - string
   * - token_type
     - Loại token (``Bearer``)
     - M
     - string
   * - expires_in
     - Thời gian hết hạn (giây)
     - M
     - integer

Lỗi thường gặp
--------------
**HTTP 401 – invalid_client (sai ``client_id``)**

.. code-block:: json

   {
     "error": "invalid_client",
     "error_description": "A valid OAuth client could not be found for client_id: <id>"
   }

**HTTP 401 – invalid_client (sai ``client_secret``)**

.. code-block:: json

   {
     "error": "invalid_client",
     "error_description": "Client credentials are invalid."
   }
