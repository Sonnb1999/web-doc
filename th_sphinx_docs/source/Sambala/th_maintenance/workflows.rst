Chi tiết chức năng
------------------

A. Quản lý tài sản chung
~~~~~~~~~~~~~~~~~~~~~~~~
1. Xem tài sản
^^^^^^^^^^^^^^
1.1 Luồng hoạt động

- Truy cập module QLTS -> Màn hình hiển thị Kaban view với 2 loại tài sản là cá nhân và dùng chung (Hệ thống đã kích hoạt action_owner_equipment_kanban đây là menuitem mặc định tương ứng với menu Danh mục tài sản khi vào QLTS)
- Ở kaban view sẽ hiển thị số lượng của từng loại tài sản theo maintenance_equipment_count được tính toán theo hàm _compute_maintenance_equipment_count 
- Truy cập vào cá nhân hoặc dùng chung sẽ chạy action th_action_maintenance_equipment hiển thị các tài sản tương ứng theo action_view_maintenance_equipment
	
1.2 Hàm liên quan

- action_owner_equipment_kanban
- _compute_maintenance_equipment_count
- th_action_maintenance_equipment
- action_view_maintenance_equipment

2. Tạo tài sản
^^^^^^^^^^^^^^
2.1 Luồng hoạt động

- Khi vào xem tài sản, chọn thêm mới
- Màn hình hiển thị formview của maintenance.equipment
- Có 2 loại tài sản là sim thẻ hoặc không được thể hiện ở trường Là tài sản sim (th_is_sim_asset). Cần điền trường này trước khi điền thông tin để tránh phải điền lại vì tài sản sim và tài sản thường có các trường thông tin khác nhau (_onchange_th_is_sim_asset)
- Khi điền nhóm thiết bị sẽ tự động điền ra các thông số kỹ thuật (_onchange_category_id) và hạn chế đội bảo trì(_compute_th_maintenance_team_id_domain) (Sim thì chỉ có nhóm thiết bị là sim thẻ)
- Khi chọn Được dùng bởi (equipment_assign_to) sẽ làm ẩn hiện trường thông tin Nhân viên sử dụng / Phòng ban sử dụng
- Trạng thái của tài sản (Tùy theo là sim (th_sim_state_selection) hay tài sản (th_equipment_state_selection)) sẽ nhảy theo th_equipment_states và th_sim_states theo cả 2 chiều theo bảng đã được cấu hình trong phần cấu hình
- Lưu ý phần trạng thái tài sản có 2 phần đặc biệt liên quan tới bàn giao và thanh lý sẽ giải thích ở phần dưới 3 và 4
- Chỉ được chọn các kỹ thuật viên có trong đội bảo trì (Hàm có sẵn của base)
- Người dùng điền đầy đủ các thông tin và ấn lưu (Các trường bắt buộc Mã nội bộ: th_default_code , Tên thiết bị : name)
	
2.2 Hàm liên quan

- write
- _onchange_th_is_sim_asset
- _compute_th_maintenance_team_id_domain
- _onchange_category_id

3. Bàn giao tài sản
^^^^^^^^^^^^^^^^^^^
3.1 Luồng hoạt động

- Truy cập vào tài sản cần bàn giao
- Chọn được dùng bởi (Phòng/ban hoặc nhân viên hoặc khác) equipment_assign_to
- Điền nhân viên (employee_id) hoặc phòng ban sử dụng (department_id) . Nếu không điền hệ thống sẽ check lỗi qua _check_employee_equipment_required và _check_employee_sim_required
- Chuyển trạng thái sang bàn giao , hệ thống sẽ tự cập nhật trạng thái tài sản _onchange_category_id

3.2 Hàm liên quan

- _check_employee_equipment_required
- _check_employee_sim_required
- _onchange_category_id

4. Thanh lý tài sản
^^^^^^^^^^^^^^^^^^^
4.1 Luồng hoạt động

- Truy cập vào tài sản cần thanh ly
- Để thanh lý tài sản trước tiên tài sản phải ở trạng thái là kho
- Sau đó ấn xác nhận hỏng thì mới có thể chuyển trạng thái sang thanh lý hoặc chờ thanh lý
- Sau khi ấn hỏng thì hiển thị ra button thanh lý , ấn thanh lý hệ thống kích hoạt hàm action_open_scrap_popup
- Màn hình hiển thị form thanh lý (scrap_equipment_view_form), điền đầy đủ các thông tin rồi xác nhận thanh lý kích hoạt hàm action_scrap

4.2 Hàm liên quan

- action_open_scrap_popup
- action_open_scrap_popup
- _onchange_category_id
- action_scrap

5. Gửi mail gia hạn sản phẩm
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
5.1 Luồng hoạt động

- Mail sẽ tự động gửi gia hạn sản phẩm trước 30 ngày so với ngày hết hạn sản phẩm.
- Ngoài ra sản phẩm không được ở trạng thái hủy và phải điền người bảo trì

5.2 Hàm liên quan

- cron_send_maintenance_reminder

B. Cấp phát tài sản
~~~~~~~~~~~~~~~~~~~
1. Quản lý phiếu cấp phát tài sản
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động

- Truy cập module QLTS -> Cấp phát tài sản kích hoạt hàm action_asset_allocation
- Hiển thị các phiếu cấp phát tài sản (view_asset_allocation_tree)
- Ấn vào phiếu để xem chi tiết (view_asset_allocation_form)
	
1.2 Hàm liên quan

- action_asset_allocation

C. Bảo trì
~~~~~~~~~~
1. Quản lí phiếu bảo trì
^^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động

- Truy cập module QLTS -> Bảo trì -> Yêu cầu bảo trì (Hàm có sẵn của base)
- Hiển thị các phiếu bảo trì (hr_equipment_request_view_kanban)
- Ấn vào phiếu để xem chi tiết (hr_equipment_request_view_form)

2. Tạo phiếu bảo trì
^^^^^^^^^^^^^^^^^^^^
2.1 Luồng hoạt động

- Truy cập module QLTS -> Bảo trì -> Yêu cầu bảo trì
- Hiển thị form tạo yêu cầu bảo trì (hr_equipment_request_view_form)
- Ấn tạo mới
- Hiển thị form tạo yêu cầu bảo trì
- Khi chọn trang thiết bị thị các trường danh mục, đội, kỹ thuật viên sẽ bị điều chỉnh theo (onchange_equipment_id, _compute_department_equipment, _compute_th_maintenance_team_id_domain, _compute_th_technician_user_id_domain)
- Điền đày đủ các thông tin (Các trường bắt buộc Chủ đề, Đội)
- Lưu thông tin

2.2 Hàm liên quan

- write
- _compute_th_technician_user_id_domain
- _compute_th_maintenance_team_id_domain
- _compute_department_equipment
- onchange_equipment_id

3. In phiếu bảo trì
^^^^^^^^^^^^^^^^^^^
3.1 Luồng hoạt động

- Truy cập module QLTS -> Bảo trì -> Yêu cầu bảo trì 
- Bấm in -> Báo cáo bảo trì (Hệ thống chạy hàm action_print_maintenance_request, action_report_maintenance_request)
	
3.2 Hàm liên quan

- action_print_maintenance_request
- action_report_maintenance_request

D. Sửa chữa
~~~~~~~~~~~
1. Quản lý phiếu sửa chữa
^^^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động

- Truy cập module QLTS -> Sửa chữa (Hệ thống chạy hàm action_th_fix_request)
- Hiển thị các phiếu sửa chữa (view_th_fix_request_tree)
- Ấn vào sửa chữa sẽ hiển thị chi tiết (view_th_fix_request_form)
	
1.2 Hàm liên quan

- action_th_fix_request

2. Tạo phiếu sửa chữa
^^^^^^^^^^^^^^^^^^^^^
2.1 Luồng hoạt động

- Truy cập module QLTS -> Sửa chữa 
- Ấn tạo mới
- Hiển thị form tạo yêu cầu sửa chữa  (view_th_fix_request_form)
- Điền đ/ay đủ các thông tin (Các trường bat buộc Lý do hỏng, Khách hàng, Phân công cho, Thiết bị sửa chữa)

2.2 Hàm liên quan

- write

3. In phiếu sửa chữa
^^^^^^^^^^^^^^^^^^^^
3.1 Luồng hoạt động

- Truy cập module QLTS -> Sửa chữa
- Chọn phiếu sửa chữa
- Bấm in (action_report_fix_request, action_print_fix_request_report_multi)
	
3.2 Hàm liên quan

- action_print_fix_request_report_multi
- action_report_fix_request

E. Kiểm kê
~~~~~~~~~~
1. Quản lý phiếu kiểm kê
^^^^^^^^^^^^^^^^^^^^^^^^
1.1 Luồng hoạt động

- Truy cập module QLTS -> Kiểm kê (Hệ thống kích hoạt stocktaking_view_type_action)
- Hiển thị các phiếu kiểm kê (stocktaking_view_tree)
- Ấn vào phiếu sẽ hiển thị chi tiết (stocktaking_view_form)
	
1.2 Hàm liên quan

- stocktaking_view_type_action
	
2. Tạo phiếu kiểm kê
^^^^^^^^^^^^^^^^^^^^
2.1 Luồng hoạt động

- Truy cập module QLTS -> Kiểm kê
- Ấn tạo mới 
- Hiển thị form tạo yêu cầu kiểm kê (stocktaking_view_form)
- Điền các thông tin nhóm thiết bị, ngày kiểm kê và ngày kiểm kê tiếp theo
- Ấn nút kiểm kê tài sản (Kích hoạt action_compute_assets , trong hàm action_compute_assets sẽ tự động chạy _update_equipment_in_stocktaking, compute_amount_of_assets ) để cập nhật danh sách cần kiểm kê theo các thông tin vừa điền
- Lưu thông tin

2.2 Hàm liên quan

- write
- action_compute_assets
- _update_equipment_in_stocktaking
- compute_amount_of_assets
