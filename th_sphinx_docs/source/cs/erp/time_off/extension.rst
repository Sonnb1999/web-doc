.. _abs_timeoff_module:

Mở rộng
=======

Tổng quan
---------

**Kế thừa module**:

- ``base``
- ``hr_holidays``
- ``th_base``
- ``th_employee``

**Mục tiêu**:

Module ``th_time_off`` được kế thừa và mở rộng các chức năng quản lý nghỉ phép trong module gốc ``hr_holidays`` của Odoo.
Module này bổ sung các tính năng như quản lý phê duyệt 2 cấp, tính toán số ngày nghỉ phép còn lại, quản lý phân bổ nghỉ phép có điều kiện, và cải tiến quy trình phê duyệt nghỉ phép.

Chức năng chỉnh sửa
-------------------

1. Quản lý đơn nghỉ phép (HrLeave)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**:

- ``hr.leave`` (từ module gốc ``hr_holidays``)

**Mục đích kế thừa**:

- Mở rộng model ``hr.leave`` để thêm các trường và logic hỗ trợ quy trình phê duyệt 2 cấp
- Bổ sung tính năng tính toán số ngày nghỉ phép đã sử dụng và còn lại
- Tùy chỉnh giao diện và quy trình xử lý đơn nghỉ phép

**Logic hoặc hàm thay đổi**:

- **Fields bổ sung**:

  - ``state``: Mở rộng trạng thái với "Đã duyệt lần 1" (validate2)
  - ``th_reason_refuse``: Lý do từ chối đơn nghỉ phép, dùng để ghi nhận feedback từ người phê duyệt
  - ``th_allocation_number_of_days``: Số ngày phép được phân bổ trong năm hiện tại
  - ``th_remaining_number_of_days``: Số ngày phép còn lại có thể sử dụng
  - ``th_used_time_off``: Danh sách chi tiết các đơn nghỉ phép đã sử dụng
  - ``th_total_leave_of_this_year``: Tổng số ngày nghỉ trong năm hiện tại
  - ``th_count_member_selected``: Đánh dấu khi có nhiều nhân viên được chọn
  - ``th_requires_allocation``: Loại phân bổ nghỉ phép
  - ``employee_ids``: Danh sách nhân viên được chọn khi tạo đơn nghỉ phép hàng loạt

- **Hàm ghi đè/thay đổi**:
    - ``_compute_th_total_leave_of_this_year``:
        - Tính tổng số ngày nghỉ phép trong năm hiện tại
        - Lọc theo nhân viên và loại nghỉ phép
        - Chỉ tính các đơn đã được phê duyệt (state = 'validate')

    - ``_compute_th_used_time_off``:
        - Tìm và gán danh sách các ngày nghỉ phép đã sử dụng
        - Lọc theo năm hiện tại và loại nghỉ phép
        - Lưu trữ trong bảng ``th.used.time.off``

    - ``_compute_th_allocation_number_of_days``:
        - Tính toán số ngày phép được phân bổ trong năm
        - Chỉ tính các phân bổ đã được phê duyệt
        - Áp dụng riêng cho nghỉ phép có lương (is_paid_leave)

  - ``_compute_th_remaining_number_of_days``:
    - Tính số ngày phép còn lại = Số ngày được phân bổ - Số ngày đã dùng
    - Loại trừ các đơn bị từ chối

  - ``get_work_days_compensate_for_holidays``:
    - Lấy danh sách các ngày làm bù cho ngày nghỉ lễ
    - Kiểm tra xem ngày làm bù có trong năm hiện tại hay không
    - Trả về danh sách các ngày và giờ làm bù

  - ``check_offset_date``:
    - Xử lý ngày cuối tuần và các ca làm bù
    - Tính toán thời gian bù dựa trên ngày bắt đầu và kết thúc
    - Trả về thông tin ngày làm bù

2. Quản lý phân bổ nghỉ phép (HrLeaveAllocation)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**:

- ``hr.leave.allocation`` (từ module gốc ``hr_holidays``)

**Mục đích kế thừa**:

- Bổ sung tính năng phân bổ nghỉ phép có điều kiện
- Tùy chỉnh quy trình phê duyệt phân bổ nghỉ phép
- Thêm các trường tính toán số ngày phép và hiển thị

**Logic hoặc hàm thay đổi**:

- **Fields bổ sung**:
    - ``state``: Đơn giản hóa trạng thái phê duyệt:
        - draft: Nháp
        - confirm: Chờ duyệt
        - refuse: Từ chối
        - validate: Đã duyệt

  - ``th_condition``: Điều kiện phân bổ (có/không)
  - ``th_model_name``: Model để áp dụng điều kiện phân bổ
  - ``th_domain``: Domain để lọc đối tượng được phân bổ
  - ``th_max_leaves``: Số ngày phép tối đa có thể phân bổ
  - ``th_leaves_taken``: Số ngày phép đã được sử dụng
  - ``th_duration_display``: Hiển thị thời lượng theo định dạng ngày/giờ
  - ``th_reason_refuse``: Lý do từ chối phân bổ
  - ``date_from``: Ngày bắt đầu hiệu lực (mặc định 1/1)
  - ``date_to``: Ngày kết thúc hiệu lực (mặc định 31/12)

- **Hàm ghi đè/thay đổi**:
    - ``write``:
        - Xử lý logic phân bổ có điều kiện
        - Cập nhật trạng thái và thông báo
        - Kiểm tra ràng buộc trước khi lưu

  - ``check_holiday_type``:
    - Reset điều kiện khi chọn phân bổ cho nhân viên cụ thể
    - Xóa domain khi không áp dụng điều kiện

  - ``_action_validate_create_childs``:
    - Tạo các phân bổ con dựa trên điều kiện
    - Tự động phân bổ ngày phép cho nhân viên

  - ``th_get_allocation_employee``:
    - Lấy danh sách nhân viên được phân bổ
    - Kiểm tra điều kiện và domain trước khi phân bổ


3. Loại nghỉ phép (HrLeaveType)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**:

- ``hr.leave.type`` (từ module gốc ``hr_holidays``)

**Mục đích kế thừa**:

- Bổ sung các tùy chọn cho loại nghỉ phép
- Tùy chỉnh cách tính toán số ngày phép

**Logic hoặc hàm thay đổi**:

- **Fields bổ sung**:
    - ``leave_validation_type``: Bổ sung loại phê duyệt:
        - manager: Quản lý phê duyệt
        - th_second_approval: Phê duyệt 2 cấp

  - ``th_check_type``: Phân loại nghỉ phép:
    - is_paid_leave: Nghỉ phép có lương
    - is_paternity_leave: Nghỉ khi vợ sinh con
    - is_maternity_leave: Nghỉ thai sản
    - is_wedding_leave: Nghỉ kết hôn
    - is_funeral_leave: Nghỉ tang

  - ``responsible_id``: Người phụ trách phê duyệt
  - ``employee_requests``: Cho phép yêu cầu thêm ngày nghỉ

- **Tính năng đặc biệt**:
  - Phân quyền phê duyệt theo cấp
  - Cấu hình riêng cho từng loại nghỉ phép
  - Tích hợp với hệ thống thông báo


**View / Action / Menu**:

- **Views**:
  - ``hr_leave_view_form``: Form view cho đơn nghỉ phép
  - ``hr_leave_view_tree``: Tree view cho danh sách đơn nghỉ phép
  - ``hr_leave_allocation_view_form``: Form view cho phân bổ nghỉ phép
  - ``th_leave_allocation_report_view``: View báo cáo phân bổ nghỉ phép

- **Actions**:
  - ``Time Off``: Quản lý đơn nghỉ phép
  - ``Allocation``: Quản lý phân bổ nghỉ phép
  - ``Time Off Types``: Quản lý loại nghỉ phép

- **Menus**:
  - ``Time Off``: Menu chính cho quản lý nghỉ phép
  - ``My Time Off``: Đơn nghỉ phép của nhân viên
  - ``Team Time Off``: Đơn nghỉ phép của nhóm
  - ``All Time Off``: Tất cả đơn nghỉ phép
  - ``Allocations``: Quản lý phân bổ
  - ``Configuration``: Cấu hình hệ thống
