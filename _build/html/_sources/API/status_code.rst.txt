HTTP Status Code
================

Nhóm mã thường dùng (chuẩn REST)
--------------------------------

- **200 OK** – Thành công.
- **201 Created** – Tạo mới thành công.
- **202 Accepted** – Đã nhận xử lý bất đồng bộ.
- **204 No Content** – Thành công, không có nội dung trả về.

- **400 Bad Request** – Dữ liệu đầu vào không hợp lệ.
- **401 Unauthorized** – Thiếu hoặc sai xác thực.
- **403 Forbidden** – Không có quyền.
- **404 Not Found** – Không tìm thấy resource.
- **409 Conflict** – Xung đột dữ liệu.
- **422 Unprocessable Entity** – Sai hợp lệ hoá chi tiết.

- **500 Internal Server Error** – Lỗi hệ thống.
- **503 Service Unavailable** – Tạm ngừng dịch vụ.

Gợi ý mapping theo chuẩn response chung
---------------------------------------

- Lỗi nghiệp vụ/validate: trả ``status=error``, ``code`` = 400/422, kèm ``message`` chi tiết.
- Lỗi xác thực: 401 (thiếu token, token hết hạn), 403 (đúng token nhưng không có quyền).
