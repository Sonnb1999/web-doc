5. Ví dụ điển hình
=============================

5.1 Lấy danh sách người dùng
----------------------------
**Endpoint**::

    GET /users

**Request**::

    curl -X GET https://api.example.com/v1/users \
      -H "Authorization: Bearer <token>"

**Response**::

    [
      {
        "id": 1,
        "name": "Nguyen Van A",
        "email": "a@example.com"
      },
      {
        "id": 2,
        "name": "Tran Van B",
        "email": "b@example.com"
      }
    ]

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
