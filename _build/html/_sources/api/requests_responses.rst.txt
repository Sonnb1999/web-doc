3. Các phương thức phổ biến
===========================

3.1 HTTP Methods
----------------
- ``GET`` → Lấy dữ liệu
- ``POST`` → Tạo dữ liệu mới
- ``PUT`` → Cập nhật toàn bộ resource
- ``PATCH`` → Cập nhật một phần resource
- ``DELETE`` → Xoá resource

3.2 Request Format
------------------
Body gửi bằng **JSON** (application/json).

Ví dụ request tạo user::

    {
      "name": "Nguyen Van A",
      "email": "nguyenvana@example.com",
      "password": "123456"
    }

3.3 Response Format
-------------------
Trả về JSON, kèm ``status_code`` phù hợp.

Ví dụ::

    {
      "id": 101,
      "name": "Nguyen Van A",
      "email": "nguyenvana@example.com",
      "created_at": "2025-08-21T12:00:00Z"
    }

3.4 Headers
-----------
- **Content-Type**: ``application/json``
- **Authorization**: ``Bearer <token>``
