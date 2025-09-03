5. Ví dụ điển hình
=============================

5.1 Lấy danh sách người dùng
----------------------------
**Endpoint**::

    GET /users

**Request**::

    curl -X 'GET' \
  'https://samdev.aumpilot.com/v4/demo' \
  -H 'accept: application/json' \
  -H 'api-key: 1'

**Response**::

    {
      "Hello": "World"
    }

5.2 Tạo mới người dùng
----------------------
**Endpoint**::

    POST /users

**Request**::

    curl -X POST https://api.example.com/v1/users \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer <token>" \
      -d '{
            "name": "Le Thi C",
            "email": "c@example.com",
            "password": "123456"
          }'

**Response**::

    {
      "id": 3,
      "name": "Le Thi C",
      "email": "c@example.com",
      "created_at": "2025-08-21T12:00:00Z"
    }

5.3 Cập nhật người dùng
-----------------------
**Endpoint**::

    PUT /users/{id}

**Request**::

    curl -X PUT https://api.example.com/v1/users/3 \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer <token>" \
      -d '{
            "name": "Le Thi C Updated"
          }'

**Response**::

    {
      "id": 3,
      "name": "Le Thi C Updated",
      "email": "c@example.com",
      "updated_at": "2025-08-21T13:00:00Z"
    }

5.4 Xoá người dùng
------------------
**Endpoint**::

    DELETE /users/{id}

**Request**::

    curl -X DELETE https://api.example.com/v1/users/3 \
      -H "Authorization: Bearer <token>"

**Response**::

    {
      "success": true,
      "message": "User deleted successfully"
    }
