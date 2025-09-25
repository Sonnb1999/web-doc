Chi tiết chức năng
------------------

A. Quản lý chấm công
~~~~~~~~~~~~~~~~~~~~
1. Xem dữ liệu chấm công
^^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động

- Truy cập menu Chấm công –> Công máy: Hiển thị danh sách chấm công theo quyền hạn.
- Xem chi tiết chấm công: Thông tin về giờ vào, giờ ra, thời gian làm việc, đi trễ, ngày công làm việc.
- Lọc dữ liệu chấm công theo nhân viên, thời gian, trạng thái đi trễ.

1.2 Một số hàm quan trọng

- ``compute_th_is_late_in``: Tính toán trạng thái đi muộn dựa trên giờ chấm công vào. Hàm này thực hiện:
    + Lấy cấu hình thời gian đi muộn được phép từ th_spec_att của nhân viên (th_time_is_late)
    + Trường hợp thứ 7, thời gian cho phép đi muộn giảm đi một nửa
    + Phân biệt xử lý ca làm việc buổi sáng (1:00-5:00) và ca chiều (6:00-10:00)
    + Tính toán thời gian đi muộn và so sánh với cấu hình cho phép
    + Nếu đi muộn vượt quá thời gian cho phép, đánh dấu th_is_late_in = True
    + Xử lý đặc biệt cho nhân viên có nhiều lần chấm công trong ngày

2. Quản lý làm tròn công
^^^^^^^^^^^^^^^^^^^^^^^^
2.1 Luồng hoạt động

- Cấu hình quy tắc làm tròn công: Thời gian được đi muộn, thời gian làm tròn công.
- Áp dụng quy tắc làm tròn công cho nhân viên theo nhóm.

2.2 Một số hàm quan trọng

- ``_th_compute_worked_hours``: Tính toán ngày công làm việc dựa trên giờ chấm công vào, ra. Hàm này thực hiện:
    + Điều chỉnh múi giờ cho check_in và check_out (+7 giờ)
    + Xử lý đặc biệt cho các ngày trong tuần (thứ 7 chỉ tính nửa ngày, chủ nhật tùy theo cấu hình)
    + Chuẩn hóa giờ vào, ra theo quy tắc của công ty (8h-12h, 13h-17h)
    + Trừ thời gian nghỉ trưa (1 giờ) nếu làm việc qua khoảng giờ trưa
    + Tính toán ngày công bằng cách chia tổng số giờ làm cho 8 (1 ngày công = 8 giờ)
    + Áp dụng các quy tắc làm tròn công khác nhau cho nhân viên chấm công 2 lần và 4 lần
- ``_run_vacuum_invalid_attendance``: Dọn dẹp dữ liệu chấm công không hợp lệ, vô hiệu hóa các bản ghi chấm công không nằm trong khung giờ quy định

B. Tính toán ngày công
~~~~~~~~~~~~~~~~~~~~~~
1. Tính ngày công làm việc
^^^^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động

- Dựa trên dữ liệu chấm công vào, ra của nhân viên.
- Tính toán thời gian làm việc sau khi trừ thời gian nghỉ trưa.
- Áp dụng quy tắc làm tròn công theo cấu hình.
- Xử lý đặc biệt cho các ngày làm việc vào thứ 7, chủ nhật.

1.2 Một số hàm quan trọng

- ``_th_compute_worked_hours``: Tính toán số ngày công từ giờ làm việc. Chi tiết:
    + Xác định các ngày đặc biệt (thứ 7, chủ nhật) và các ngày làm bù
    + Áp dụng các quy tắc riêng cho ngày thường, thứ 7 và chủ nhật
    + Đối với thứ 7 thông thường, tối đa chỉ tính 0.5 ngày công (làm việc buổi sáng)
    + Đối với thứ 7 làm bù buổi chiều hoặc chủ nhật làm bù cả ngày, tối đa tính 1 ngày công

2. Xử lý ngày bù nghỉ
^^^^^^^^^^^^^^^^^^^^^
2.1 Luồng hoạt động

- Xác định ngày làm bù vào thứ 7, chủ nhật.
- Tính toán ngày công cho các ngày làm bù dựa trên cấu hình ca làm việc.

2.2 Một số hàm quan trọng

- ``get_work_days_compensate_for_holidays``: Lấy danh sách ngày làm bù. Chi tiết:
    + Truy vấn ngày làm bù từ module th_time_off
    + Lọc chỉ lấy các ngày bù trong năm hiện tại
    + Trả về danh sách với các thông tin: ngày bù, giờ công, ngày công, phiên làm việc (sáng/chiều/cả ngày)
- ``check_offset_date``: Kiểm tra và áp dụng quy tắc đặc biệt với ngày làm bù

C. Quản lý nghỉ phép
~~~~~~~~~~~~~~~~~~~~
1. Yêu cầu nghỉ phép
^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động

- Nhân viên tạo yêu cầu nghỉ phép với thông tin ngày bắt đầu, kết thúc, loại nghỉ phép.
- Quản lý phê duyệt hoặc từ chối yêu cầu.
- Hệ thống tự động tính toán số ngày nghỉ dựa trên lịch làm việc của nhân viên.

1.2 Một số hàm quan trọng

- ``_get_number_of_days``: Tính toán số ngày nghỉ phép. Hàm này thực hiện:
    + Gọi hàm của lớp cha để lấy số ngày nghỉ ban đầu
    + Điều chỉnh số ngày nghỉ dựa trên loại nghỉ phép, lịch làm việc của nhân viên, và các ngày làm bù/ngày lễ

2. Cấu hình loại nghỉ phép
^^^^^^^^^^^^^^^^^^^^^^^^^^
2.1 Luồng hoạt động

- Quản trị viên cấu hình các loại nghỉ phép.
- Cấu hình chế độ trả lương cho từng loại nghỉ phép.

2.2 Một số hàm quan trọng

- HrLeaveTypes: Mô hình quản lý loại nghỉ phép với các thuộc tính:
    + th_pay_wage: Quy định loại nghỉ phép có trả lương hay không
    + th_law_leave: Đánh dấu loại nghỉ phép theo luật lao động

D. Nhập dữ liệu chấm công
~~~~~~~~~~~~~~~~~~~~~~~~~
1. Nhập chấm công từ file
^^^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động

- Truy cập menu Máy vân tay -> Tải lên chấm công.
- Tải lên file dữ liệu chấm công.
- Hệ thống xử lý và nhập dữ liệu chấm công vào hệ thống.

1.2 Một số hàm quan trọng

- import_attendance_wizard: Xử lý nhập dữ liệu chấm công từ file. Hàm này thực hiện:
    + Đọc và xử lý dữ liệu từ file Excel/CSV đã tải lên
    + Ánh xạ dữ liệu từ file với cấu trúc dữ liệu của hệ thống
    + Kiểm tra và xử lý các trường hợp lỗi (nhân viên không tồn tại, định dạng giờ không đúng)
    + Tạo các bản ghi chấm công mới trong hệ thống

E. Quản lý thời gian vắng mặt
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Theo dõi lần quét vắng mặt
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động

- Hiển thị các lần quét vắng mặt (check-in hoặc check-out) của nhân viên
- Tự động phát hiện các lần quét thiếu theo quy tắc chấm công
- Cảnh báo các lần vắng mặt mới trong 3 ngày gần đây

1.2 Một số hàm quan trọng

- _compute_is_colored: Đánh dấu màu cho các lần vắng mặt mới (trong 3 ngày gần đây)
- clear_all_miss_att_line: Xóa tất cả dữ liệu vắng mặt để tính toán lại
- get_set_of_working_date: Xác định tập hợp các ngày làm việc trong khoảng thời gian, phân biệt buổi sáng và buổi chiều

2. Kiểm tra công
^^^^^^^^^^^^^^^^
2.1 Luồng hoạt động

- Truy cập menu -> Kiểm tra công để xem thông tin chấm công theo tháng
- Hiển thị tổng hợp dữ liệu chấm công, ngày công, ngày nghỉ theo tháng
- Theo dõi được dữ liệu chấm công của nhân viên theo tháng

2.2 Một số hàm quan trọng

- get_data_work_numbers: Tính toán số ngày công theo dữ liệu chấm công, xử lý các trường hợp đặc biệt như ngày nghỉ, ngày làm bù
- default_get: Tự động lấy tháng và năm hiện tại làm mặc định
- _compute_preview: Tạo báo cáo HTML hiển thị tổng hợp dữ liệu chấm công

F. Báo cáo chấm công
~~~~~~~~~~~~~~~~~~~~
Báo cáo chấm công theo kỳ
^^^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động

- Truy cập menu Bảng lương -> Chốt công -> xuất dữ liệu chấm công 1 nhân viên
- Chọn khoảng thời gian (tháng, năm) và nhân viên cần xem báo cáo
- Hệ thống hiển thị báo cáo chi tiết với thông tin ngày công, giờ vào, giờ ra, ngày nghỉ
- Báo cáo tổng hợp thông tin chấm công, ngày công, ngày nghỉ phép, ngày làm bù

1.2 Một số hàm quan trọng

- get_data_work_numbers: Tính toán số ngày công dựa trên dữ liệu chấm công. Hàm này thực hiện:
    + Lấy dữ liệu chấm công trong khoảng thời gian được chọn
    + Tính toán ngày công dựa trên giờ vào, giờ ra
    + Xử lý các trường hợp đặc biệt như ngày nghỉ, ngày làm bù
    + Tổng hợp dữ liệu theo từng ngày trong kỳ báo cáo
- _get_attendances: Lấy dữ liệu chấm công của nhân viên trong khoảng thời gian. Hàm này thực hiện:
    + Truy vấn dữ liệu chấm công từ bảng hr.attendance
    + Lọc theo nhân viên và khoảng thời gian
    + Sắp xếp dữ liệu theo thời gian
- _compute_preview: Tạo báo cáo HTML hiển thị tổng hợp dữ liệu chấm công:
    + Tạo bảng hiển thị dữ liệu chấm công theo ngày
    + Hiển thị thông tin giờ vào, giờ ra, ngày công
    + Tính tổng số ngày công trong kỳ báo cáo

**Báo cáo tổng hợp chấm công**

2.1 Luồng hoạt động

- Truy cập menu Bảng lương -> Chốt công -> xuất dữ liệu chấm công toàn nhân viên
- Chọn khoảng thời gian (tháng, năm) và phòng ban/nhóm nhân viên
- Hệ thống hiển thị báo cáo tổng hợp với thông tin tổng ngày công, ngày nghỉ phép, đi muộn của từng nhân viên
- Có thể xuất báo cáo ra file Excel để phục vụ tính lương và quản lý nhân sự
- Báo cáo phân loại rõ các loại ngày công: ngày thường, ngày làm bù, ngày nghỉ có lương, ngày nghỉ không lương

2.2 Một số hàm quan trọng

- get_report_values: Lấy dữ liệu cho báo cáo tổng hợp. Hàm này thực hiện:
    + Lấy danh sách nhân viên theo phòng ban/nhóm được chọn
    + Tính toán tổng ngày công, ngày nghỉ phép, số lần đi muộn của từng nhân viên
    + Tổng hợp dữ liệu theo từng nhân viên và loại ngày công
- _get_leaves: Lấy dữ liệu nghỉ phép của nhân viên trong khoảng thời gian. Hàm này thực hiện:
    + Truy vấn dữ liệu nghỉ phép từ bảng hr.leave
    + Lọc theo nhân viên, khoảng thời gian và trạng thái phê duyệt
    + Phân loại theo loại nghỉ phép (có lương/không lương)
- _get_work_for_leave_days: Lấy danh sách ngày làm bù. Hàm này thực hiện:
    + Truy vấn ngày làm bù từ module th_time_off
    + Lọc theo khoảng thời gian báo cáo
    + Tính toán ngày công cho các ngày làm bù

**Xuất báo cáo chấm công**

3.1 Luồng hoạt động

- Truy cập các báo cáo chấm công và sử dụng chức năng xuất báo cáo
- Hệ thống tạo file báo cáo theo định dạng được chọn (PDF, Excel)
- Báo cáo được tạo với đầy đủ thông tin về chấm công, ngày công, ngày nghỉ
- Người dùng có thể tải xuống, lưu trữ hoặc in ấn báo cáo

3.2 Một số hàm quan trọng

- generate_xlsx_report: Tạo báo cáo Excel. Hàm này thực hiện:
    + Tạo workbook và worksheet mới
    + Định dạng các cột, hàng và tiêu đề
    + Điền dữ liệu chấm công vào các ô tương ứng
    + Tạo file Excel và trả về cho người dùng
- _get_report_values: Chuẩn bị dữ liệu cho báo cáo PDF. Hàm này thực hiện:
    + Lấy dữ liệu chấm công, ngày công, ngày nghỉ
    + Định dạng dữ liệu để hiển thị trong báo cáo PDF
    + Trả về dữ liệu cho template báo cáo tổng hợp dữ liệu chấm công:
    + Tạo bảng hiển thị dữ liệu chấm công theo ngày
    + Hiển thị thông tin giờ vào, giờ ra, ngày công
    + Tính tổng số ngày công trong kỳ báo cáo

