.. _abs_employee_module:

Mở rộng module Quản lý Nhân viên
================================

Tổng quan
---------

**Kế thừa module**:

- ``base``
- ``hr``

**Mục tiêu**:

Module ``th_employee`` được kế thừa và mở rộng các chức năng quản lý nhân viên trong module gốc ``hr`` của Odoo.
Module này bổ sung các tính năng như quản lý thông tin cá nhân chi tiết, trình độ học vấn, thông tin người phụ thuộc, mã ngạch bậc lương, lịch sử lương.

Chức năng chỉnh sửa
-------------------

1. Quản lý nhân viên (HrEmployee)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**:

- ``hr.employee`` (từ module gốc ``hr``)

**Mục đích kế thừa**:

- Mở rộng model ``hr.employee`` để thêm các trường thông tin cá nhân chi tiết như ngày vào làm, ngày nghỉ việc, trạng thái hoạt động, thông tin thuế, loại giấy tờ tùy thân, thông tin liên hệ khẩn cấp.
- Bổ sung quản lý trình độ học vấn, thông tin người phụ thuộc, và các thông tin đặc thù cho môi trường giáo dục.
- Tùy chỉnh quyền truy cập và hiển thị các trường theo nhóm người dùng.

**Logic hoặc hàm thay đổi**:

- **Trường mới được thêm**:
  - ``th_joined_date``: Ngày vào làm
  - ``th_left_date``: Ngày nghỉ việc
  - ``th_activeness``: Trạng thái hoạt động (working, quit, maternity, unpaid)
  - ``th_company_name``: Tên công ty (aum, th, hcm)
  - ``th_state``: Trạng thái nhân viên (collaborators, intern, probationary, official_staff, employee_quit)
  - ``th_time_of_service``: Thời gian phục vụ (năm)
  - ``th_tax_no``: Mã số thuế
  - ``th_type_of_id``: Loại giấy tờ tùy thân
  - ``th_qualifications``: Trình độ học vấn (One2many với th.qualifications)
  - ``child_information``: Thông tin người phụ thuộc (One2many với children.employee)

- **Hàm tính toán**:
  - ``_compute_th_type_of_id_string``: Tính toán tên loại giấy tờ tùy thân
  - ``_inverse_th_employee_quit_date``: Xử lý ngược khi thay đổi ngày nghỉ việc

**View / Action / Menu**:

- **Views**:
  - Tùy chỉnh form view nhân viên với các tab mới: "Academic Qualifications", "Personal Information"
  - Thêm các trường thông tin cá nhân vào form view
  - Ẩn/hiện các trường theo quyền người dùng

2. Quản lý nhân viên cơ sở (HrEmployeeBase)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**:

- ``hr.employee.base`` (từ module gốc ``hr``)

**Mục đích kế thừa**:

- Mở rộng model abstract ``hr.employee.base`` để thêm thông tin địa chỉ làm việc và quản lý nghỉ phép.

**Logic hoặc hàm thay đổi**:

- **Trường mới được thêm**:
  - ``th_address``: Địa chỉ làm việc (related từ work_location_id)
  - ``leave_manager_id``: Người quản lý nghỉ phép và chấm công bù

3. Quản lý nhân viên công khai (HrEmployeePublic)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**:

- ``hr.employee.public`` (từ module gốc ``hr``)

**Mục đích kế thừa**:

- Mở rộng model ``hr.employee.public`` để hiển thị thông tin cơ bản cho người dùng không có quyền truy cập đầy đủ.

**Logic hoặc hàm thay đổi**:

- **Trường mới được thêm**:
  - ``th_state``: Trạng thái nhân viên
  - ``th_joined_date``: Ngày vào làm


4. Cấu hình hệ thống (ResConfigSettings)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**:

- ``res.config.settings`` (từ module gốc ``base``)

**Mục đích kế thừa**:

- Bổ sung các tham số cấu hình cho quản lý nhân viên, đặc biệt là cấu hình người duyệt nghỉ phép và chấm công bù lần 2.

**Logic hoặc hàm thay đổi**:

- **Trường mới được thêm**:
  - ``th_l_a_manager_ids``: Người duyệt lần 2 (Many2many với res.users)

- **Hàm ghi đè**:
  - ``set_values``: Lưu danh sách người duyệt vào ir.config_parameter
  - ``get_values``: Lấy danh sách người duyệt từ ir.config_parameter

**View / Action / Menu**:

- **Views**:
  - ``res_config_settings_view_form_inherit_th``: Tùy chỉnh form cấu hình HR, thêm trường người duyệt lần 2


5. Quản lý đối tác (ResPartner)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model kế thừa**:

- ``res.partner`` (từ module gốc ``base``)

**Mục đích kế thừa**:

- Mở rộng model ``res.partner`` để phân loại loại liên hệ và thêm thông tin địa chỉ chi tiết.

**Logic hoặc hàm thay đổi**:

- **Trường mới được thêm**:
  - ``th_type``: Loại liên hệ (employees, customers, suppliers, contractors)
  - ``th_street``, ``th_street2``, ``th_zip``, ``th_city``: Thông tin địa chỉ chi tiết
  - ``th_state_id``, ``th_country_id``: Thông tin tỉnh/thành và quốc gia

**View / Action / Menu**:

- **Views**:
  - ``view_partner_form``: Tùy chỉnh form view đối tác, thêm trường phân loại và địa chỉ chi tiết

6. Các model khác được kế thừa
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**HrDepartment**:
- Tùy chỉnh tree view để hiển thị thông tin phòng ban chi tiết hơn

**HrWorkLocation**:
- Mở rộng thông tin địa điểm làm việc

**ResPartnerBank**:
- Tùy chỉnh thông tin ngân hàng của nhân viên

**ResourceCalendar**:
- Thêm logic xử lý lịch làm việc với hàm ``delete_values_resource_calendar``

**IrUiMenu**:
- Tùy chỉnh hiển thị menu theo quyền người dùng

Models mới được tạo
-------------------

7. Trình độ học vấn (ThQualifications)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model mới**:

- ``th.qualifications``

**Mục đích**:

- Quản lý thông tin trình độ học vấn của nhân viên bao gồm tên trường, tên bằng cấp, ngày cấp, và chuyên ngành.

**Trường chính**:

- ``th_employee_id``: Nhân viên
- ``th_institution``: Trường học (Many2one với th.academic)
- ``th_name_qlf``: Tên bằng cấp
- ``th_date_qlf``: Ngày cấp bằng
- ``th_major``: Chuyên ngành

8. Cơ sở giáo dục (ThAcademic)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model mới**:

- ``th.academic``

**Mục đích**:

- Quản lý danh sách các cơ sở giáo dục/trường học để sử dụng trong quản lý trình độ học vấn.

**Trường chính**:

- ``name``: Tên trường học

9. Thông tin người phụ thuộc (ChildrenEmployee)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model mới**:

- ``children.employee``

**Mục đích**:

- Quản lý thông tin người phụ thuộc của nhân viên cho mục đích tính thuế và phúc lợi.

**Trường chính**:

- ``th_child_information``: Nhân viên (Many2one với hr.employee)
- ``th_children_name``: Họ và tên
- ``th_birthday``: Ngày sinh
- ``th_relationship``: Mối quan hệ

**Logic hoặc hàm thay đổi**:

- ``onchange_th_birthday``: Kiểm tra ngày sinh không được lớn hơn ngày hiện tại

10. Mã ngạch (ThRankCode)
~~~~~~~~~~~~~~~~~~~~~~~~~

**Model mới**:

- ``th.rank.code``

**Mục đích**:

- Quản lý mã ngạch theo phòng ban để phục vụ việc phân loại và quản lý lương bậc.

**Trường chính**:

- ``name``: Mã ngạch
- ``th_department_id``: Phòng ban

11. Mã ngạch bậc lương (ThSalaryRangeCode)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model mới**:

- ``th.salary.range.code``

**Mục đích**:

- Quản lý chi tiết mã ngạch bậc lương bao gồm mức lương, bảo hiểm, và đơn vị chịu trách nhiệm.

**Trường chính**:

- ``th_rank_code_id``: Mã ngạch
- ``th_rank_code``: Mã bậc (00-09)
- ``th_code``: Mã ngạch bậc (computed)
- ``th_level``: Mức lương (1-5)
- ``th_insurance_paid``: Mức đóng bảo hiểm
- ``th_responsible_unit``: Đơn vị chịu trách nhiệm (aum, vmc, th)
- ``th_date_from``, ``th_date_to``: Thời gian hiệu lực
- ``th_state``: Trạng thái (new, old)

**Logic hoặc hàm thay đổi**:

- ``_compute_th_code``: Tính toán mã ngạch bậc từ mã ngạch và mã bậc
- ``constrains_th_code``: Ràng buộc mã ngạch bậc duy nhất theo đơn vị
- ``constrains_date``: Ràng buộc từ ngày không lớn hơn đến ngày
- ``constrains_th_insurance_paid``: Ràng buộc mức bảo hiểm phải lớn hơn 0

12. Lịch sử mã ngạch bậc (ThSalaryRangeCodeHistory)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model mới**:

- ``th.salary.range.code.history``

**Mục đích**:

- Theo dõi lịch sử thay đổi mã ngạch bậc của từng nhân viên.

**Trường chính**:

- ``th_employee_id``: Nhân viên
- ``th_department_id``: Phòng ban (related)
- ``th_job_id``: Chức vụ (related)
- ``th_salary_range_code_id``: Lịch sử mã ngạch bậc (One2many)

View / Action / Menu (Tổng quan)
--------------------------------

**Views**:
  - ``hr_employee.xml``: Tùy chỉnh form và tree view nhân viên
    - ``abs_hr_employee_view_form``: Form view nhân viên với các tab mới
    - ``th_hr_employee_view_tree``: Tree view nhân viên tùy chỉnh
    - ``th_view_department_tree``: Tree view phòng ban tùy chỉnh
  - ``res_config_settings_views.xml``: Tùy chỉnh cấu hình hệ thống
    - ``res_config_settings_view_form_inherit_th``: Form cấu hình HR
  - ``th_academic.xml``: Views cho cơ sở giáo dục
    - ``th_academic_view_tree``: Tree view cơ sở giáo dục
  - ``th_rank_code_view.xml``: Views cho mã ngạch
    - ``th_rank_code_view_tree``: Tree view mã ngạch
  - ``th_salary_range_code.xml``: Views cho mã ngạch bậc lương
  - ``th_salary_range_code_history.xml``: Views cho lịch sử mã ngạch bậc
  - ``th_wage_history.xml``: Views cho lịch sử lương
  - ``hr_employee_public_views.xml``: Views cho nhân viên công khai
    - ``th_employee_public_view_form``: Form view nhân viên công khai
  - ``res_partner_view.xml``: Tùy chỉnh view đối tác
    - ``view_partner_form``: Form view đối tác với thông tin địa chỉ chi tiết
  - ``res_partner_bank.xml``: Views cho thông tin ngân hàng
  - ``hr_work_location.xml``: Views cho địa điểm làm việc
  - ``resource_calendar_form.xml``: Views cho lịch làm việc

- **Actions**:
  - ``th_academic_action``: Quản lý cơ sở giáo dục
  - ``th_rank_code_view_act``: Quản lý mã ngạch
  - ``th_salary_range_code_action``: Quản lý mã ngạch bậc lương
  - ``th_salary_range_code_history_action``: Quản lý lịch sử mã ngạch bậc
  - ``th_basic_salary_action``: Quản lý lịch sử lương

- **Menus**:
  - ``Academic Institutions``: Quản lý cơ sở giáo dục (dưới menu cấu hình nhân viên)
  - ``Mã ngạch``: Quản lý mã ngạch
  - ``Salary Range Code``: Quản lý mã ngạch bậc lương
  - ``Lịch sử lương``: Quản lý lịch sử lương (dưới menu lương)
