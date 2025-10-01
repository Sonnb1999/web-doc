PROJECT ITC
===========

Tổng quan
---------

A. Mô tả module
~~~~~~~~~~~~~~~
Quản lý và theo dõi phục vụ quy trình quản lý dự án cho trung tâm CNTT

B. Đối tượng sử dụng
~~~~~~~~~~~~~~~~~~~~
Nhân viên trung tâm CNTT

C. Module phụ thuộc
~~~~~~~~~~~~~~~~~~~

================    ======================================================================
    MODULE	            Mục đích
================    ======================================================================
analytic	        Hỗ trợ kế toán phân tích cho dự án, nhiệm vụ
base_setup	        Thiết lập cơ bản cho Odoo
mail	            Quản lý thảo luận, theo dõi thay đổi nhiệm vụ
portal	            Hỗ trợ chia sẻ nhiệm vụ/dự án với cộng tác viên (portal user)
rating	            Cho phép đánh giá nhiệm vụ từ phía khách hàng
resource	        Quản lý thời gian làm việc, lịch trình (cho timer & planning)
web	                Các thành phần web cơ bản trong giao diện Odoo
web_tour	        Hướng dẫn người dùng thao tác thông qua tour
digest	            Gửi báo cáo tổng hợp định kỳ qua email
report_xlsx	        Xuất báo cáo dạng Excel (.xlsx)
web_domain_field	Cho phép dùng trường domain động trong form
timesheet_grid	    Ghi nhận thời gian làm việc dạng lưới (grid timesheet)
th_approvals	    module duyệt nội bộ tùy chỉnh cho tổ chức (duyệt task, bug,...)
================    ======================================================================

D. Chức năng chính
~~~~~~~~~~~~~~~~~~

===========================    ======================================================================
Nhóm chức năng                  Mô tả cụ thể
===========================    ======================================================================
Quản lý dự án (Project)	        Tạo, phân quyền truy cập dự án (theo privacy_visibility), theo dõi tiến độ
Quản lý nhiệm vụ (Task)	        Tạo nhiệm vụ con, gán dev/tester, phân chia theo stage, điểm độ khó
Kiểm thử & Testcase	            Tạo test case, kiểm thử đa bước, tạo bug trực tiếp từ test case
Theo dõi deadline chi tiết	    Quản lý deadline theo từng giai đoạn của nhiệm vụ, đánh giá tiến độ (nhanh, đúng tiến độ, chậm)
Phân công theo đội nhóm	        Quản lý thành viên theo nhóm lập trình/ kiểm thử / dự án, có phân quyền team và người quản lý nhóm
Chia sẻ với cộng tác viên	    Cho phép khách hàng xem các nhiệm vụ /dự án được chia sẻ, đánh giá nhiệm vụ
Ghi nhận thời gian làm việc	    Chấm công theo lập trình hoặc kiểm thử (program_or_test_day), theo dõi tiến độ bằng timer
Báo cáo & Phân tích	            Báo cáo dev, testcase, thống kê công nhật
===========================    ======================================================================


E. Các quyền trong module.
~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Quyền ITC

- Nhân viên
- Trưởng nhóm
- Quản trị viên

2. Quyền Quản lý test case

 Quản lý testcase

3. Các quyền khác

- Use Subtasks ITC
- Use Rating on Project ITC
- Use Stages on Project ITC
- Use Recurring Tasks ITC
- Use Task Dependencies ITC
- Use Milestones ITC

Chi tiết module:
----------------

.. toctree::
   :maxdepth: 2

   workflow
   security
   stage_status
   changelog