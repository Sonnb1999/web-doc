Chi tiết chức năng
------------------

A. Quản lý nghỉ phép
~~~~~~~~~~~~~~~~~~~~
1. Hr_leave.py
^^^^^^^^^^^^^^
1.1 Trạng thái nghỉ phép

- Mở rộng quy trình phê duyệt với trạng thái "Đã duyệt lần 1" (validate2)
- Quy trình: confirm -> validate(duyệt lần 1) -> validate2 (duyệt lần 2)

1.2 Tính toán ngày nghỉ

- Tổng số ngày phép được cấp trong năm 
- Số ngày phép còn lại
- Tổng số ngày đã nghỉ trong năm

1.3 Xử lý ngày làm bù

- Hỗ trợ làm bù cho ngày nghỉ lễ/phép
- Có thể làm bù cả ngày hoặc nửa ngày (sáng/chiều)
- Tự động tính toán số ngày/giờ làm bù vào tổng ngày nghỉ

1.4 Quy trình phê duyệt

- Kiểm tra quyền phê duyệt của người dùng
- Hỗ trợ 2 cấp phê duyệt: quản lý trực tiếp và phòng nhân sự
- Gửi thông báo email khi phê duyệt/từ chối

1.5 Tính toán thời gian nghỉ

- Hỗ trợ nghỉ cả ngày/nửa ngày/theo giờ
- Tính toán dựa trên lịch làm việc của nhân viên
- Xử lý các trường hợp đặc biệt như nghỉ thứ 7, chủ nhật

1.6 Theo dõi ngày nghỉ

- Lưu chi tiết thông tin nghỉ phép: thời gian, loại nghỉ, nhân viên
- Hỗ trợ nhiều nhân viên cùng đăng ký nghỉ
- Kiểm tra trùng lặp thời gian nghỉ

1.7 Ràng buộc

- Thời gian nghỉ phải nằm trong năm hiện tại và năm sau
- Không được đăng ký nghỉ quá 40 ngày so với hiện tại 
- Kiểm tra số ngày phép còn lại trước khi cho phép đăng ký

1.8 Các hàm liên quan

- ``_compute_th_allocation_number_of_days``: Tính tổng số ngày phép được cấp
- ``_compute_th_total_leave_of_this_year``: Tính tổng số ngày nghỉ trong năm
- ``_compute_th_remaining_number_of_days``: Tính số ngày phép còn lại
- ``get_work_days_compensate_for_holidays(self, th_date)``:
    + Kiểm tra các ngày làm bù cho ngày nghỉ lễ/phép
    + Hỗ trợ làm bù cả ngày hoặc nửa ngày (sáng/chiều)
- ``check_and_create_values_used_time_off(self, data, th_date)``:
    + Lưu lại thông tin chi tiết về các ngày nghỉ phép:
        * Số ngày/giờ nghỉ
        * Loại nghỉ (cả ngày/nửa ngày/giờ)
        * Thời gian bắt đầu, kết thúc
        * Nhân viên, loại phép
- ``_get_number_of_days_change(self, date_from, date_to, employee_id)``:
    + Tính toán số ngày/giờ nghỉ dựa trên:
        * Ngày bắt đầu, kết thúc
        * Loại nghỉ (cả ngày/nửa ngày/theo giờ)
        * Lịch làm việc của nhân viên
        * Ngày làm bù nếu có

2. Hr_leave_type.py
^^^^^^^^^^^^^^^^^^^
2.1 Tính toán ngày phép (get_employees_days)

- Tính toán cho từng nhân viên:
    + Tổng số ngày được cấp (max_leaves)
    + Số ngày đã sử dụng (leaves_taken)
    + Số ngày còn lại (remaining_leaves)
    + Số ngày dự kiến còn lại (virtual_remaining_leaves)
- Tính toán dựa trên:
    + Các đơn xin nghỉ phép đã duyệt
    + Số ngày phép được cấp
    + Có thể tính theo giờ hoặc theo ngày

2.2 Quản lý theo thời gian

- Tính toán trong phạm vi năm:
    + Từ ngày 1/1 đến 31/12
    + Theo trạng thái phê duyệt (confirm, validate1, validate2, validate)
- Cập nhật số ngày nghỉ real-time khi có:
    + Đơn xin nghỉ phép mới
    + Cấp phép mới
