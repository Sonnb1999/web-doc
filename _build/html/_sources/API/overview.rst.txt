1. Tổng quan
============

1.1 Giới thiệu
--------------
API này cung cấp các chức năng cho ứng dụng **ExampleApp** theo chuẩn **RESTful API**.

Mục tiêu:
_________
- Cho phép các ứng dụng client (web, mobile, dịch vụ bên thứ ba) kết nối đến hệ thống.
- Đảm bảo tính **stateless**, dễ mở rộng và bảo mật.
- Chuẩn hoá giao tiếp thông qua **HTTP + JSON**.

1.2 Kiến trúc RESTful
---------------------
- **Resource-Oriented**: Mọi đối tượng (User, Order, Product) được coi là một tài nguyên.
- **Uniform Interface**: Sử dụng các HTTP methods chuẩn (``GET``, ``POST``, ``PUT``, ``DELETE``).
- **Stateless**: Server không lưu trạng thái của client, mọi request đều độc lập.

1.3 URL cơ bản
--------------
::

    Base URL: https://api.example.com/v1/

1.4 Authentication
------------------
API hỗ trợ xác thực bằng **Bearer Token (JWT)**.

Ví dụ header::

    Authorization: Bearer <access_token>
