Chi tiết chức năng
------------------


A.  Tạo hồ sơ từ cơ hội CRM
~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Luồng hoạt động
^^^^^^^^^^^^^^^^^^
    -   Truy cập cơ hội CRM, trên giao diện chi tiết (form view) cơ hội, ấn nút "Tạo hồ sơ" sẽ mở ra cửa sổ tạo mới hồ sơ sau đó ấn nút "Lưu". 
    -   Hồ sơ sau khi tạo thành công sẽ có nút smart button hồ sơ để xem chi tiết hồ sơ của cơ hội đó.
    -   Khi đã có hồ sơ, nút "Tạo hồ sơ" sẽ biến mất thay vào đó là nút "Rút hồ sơ", khi nhấn nút "Rút hồ sơ" thì sẽ xóa đi hồ sơ của cơ hội.

2. Các hàm liên quan
^^^^^^^^^^^^^^^^^^^^
    -   ``action_create_profile``: Tạo mới hồ sơ
    -   ``action_open_profile``: Xem chi tiết hồ sơ
    -   ``action_withdraw_profile``: Rút hồ sơ



B.  Quản lý hồ sơ khách hàng
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Luồng hoạt động
^^^^^^^^^^^^^^^^^^
    -   Truy cập Menu Hồ sơ -> Chọn menu "Quản lý hồ sơ" -> Chọn "Tất cả hồ sơ". Mở ra danh sách (listview) chứa tất cả hồ sơ.
    -   Truy cập Menu Hồ sơ -> Chọn menu "Quản lý hồ sơ" -> Chọn "Hồ sơ" -> Chọn trường học. Mở ra danh sách (listview) hồ sơ được lọc sẵn theo trường học đã chọn.
    -   Chọn 1 bản ghi truy cập vào form view chi tiết của hồ sơ. Người dùng có thể thêm, sửa, xóa hồ sơ trên giao diện.

2. Các hàm liên quan
^^^^^^^^^^^^^^^^^^^^



C.  Đợt bàn giao hồ sơ
~~~~~~~~~~~~~~~~~~~~~~

1. Tạo đợt bàn giao hồ sơ và chọn danh sách hồ sơ thủ công
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    1.1. Luồng hoạt động
        -   Truy cập Menu Hồ sơ -> Chọn Đợt bàn giao hồ sơ -> Tạo mới đợt bàn giao hồ sơ.
        -   Ấn nút "Duyệt hồ sơ" sẽ mở Popup để lựa chọn thủ công các hồ sơ ở tình trạng chờ bàn giao cần duyệt. 
        -   Lựa chọn các hồ sơ mong muốn, sau đó ấn nút "Thêm vào danh sách" để thêm danh sách hồ sơ vào đợt bàn giao vừa tạo.

    1.2. Các hàm liên quan
        -   ``action_take_profile``: Chọn danh sách hồ sơ thủ công

2. Tạo đợt bàn giao hồ sơ và chọn danh sách hồ sơ từ file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    2.1. Luồng hoạt động
        -   Truy cập Menu Hồ sơ -> Chọn Đợt bàn giao hồ sơ -> Tạo mới đợt bàn giao hồ sơ.
        -   Tải file mẫu xét duyệt bằng cách ấn nút "Tải file mẫu", sau đó nhập thông tin danh sách cơ hội có hồ sơ ở tình trạng chờ bàn giao vào trong file xét duyệt.
        -   Import file xét duyệt vào danh sách hồ sơ tải lên(th_handover_list) và ấn nút "Duyệt hồ sơ tải lên" để thêm danh sách hồ sơ vào đợt bàn giao vừa tạo.
        
    2.2. Các hàm liên quan
        -   ``action_take_upload_profile``: Chọn danh sách hồ sơ từ file
        -   ``action_download_template``: Tải mẫu danh sách hồ sơ

3. Xem danh sách hồ sơ đã chọn trong đợt bàn giao
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    3.1. Luồng hoạt động
        -   Trong Formview đợt bàn giao hồ sơ, sau khi thêm danh sách hồ sơ thủ công hoặc bằng file sẽ xuất hiện Smart button số lượng hồ sơ đã chọn.
        -   Bấm nút Smart button để mở danh sách(listview) các hồ sơ đã được duyệt.
        -   Người dùng có thể loại những hồ sơ khỏi danh sách bằng cách chọn trên listview và ấn nút "Xóa khỏi danh sách".
        
    3.2. Các hàm liên quan
        -   ``action_take_upload_profile``: Chọn danh sách hồ sơ từ file
        -   ``action_download_template``: Tải mẫu danh sách hồ sơ
        -   ``th_action_cancel_select_profile_handover``: Loại hồ sơ khỏi đợt bàn giao
        -   ``_compute_th_student_profile_count``: Tính toán số hồ sơ trong đợt bàn giao

4. Bàn giao hồ sơ cho đợt bàn giao
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    4.1. Luồng hoạt động
        -   Trong Formview đợt bàn giao hồ sơ, sau khi thêm danh sách hồ sơ thủ công hoặc bằng file, người dùng ấn nút "Bàn giao hồ sơ". Hệ thống sẽ xử lý và đổi tình trạng hồ sơ thành đã bàn giao và trạng thái đợt bàn giao sang chờ chốt.
        -   Sau khi ấn nút "Bàn giao hồ sơ" sẽ xuất hiện nút "Hoàn thành bàn giao", bấm nó giúp chuyển trạng thái đợt bàn giao hồ sơ sang hoàn thành.
        -   Sau khi ấn nút "Bàn giao hồ sơ" sẽ xuất hiện nút "Xuất hồ sơ bàn giao", bấm nó giúp tải xuống file excel chứa danh sách tất cả hồ sơ đã bàn giao gồm stt, mã KH, mã cơ hội, họ tên, ngày sinh, giới tính,...
        
    4.2. Các hàm liên quan
        -   ``action_handover``: Hành động bàn giao hồ sơ
        -   ``change_handover_status``: Thay đổi tình trạng hồ sơ sang đã bàn giao
        -   ``action_complete``: Chuyển trạng thái đợt bàn giao sang hoàn thành
        -   ``action_export_profile``: Xuất file hồ sơ bàn giao

5. Xuất file danh sách xét tuyển trong đợt bàn giao
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    5.1. Luồng hoạt động
        -   Sau khi ấn nút "Bàn giao hồ sơ" sẽ xuất hiện nút "Danh sách xét tuyển", bấm nó giúp tải xuống file excel chứa danh sách xét tuyển gồm mã cơ hội, họ tên, ngày sinh, giới tính, hệ tốt nghiệp, ngành đăng ký, nơi sinh.
        -   File danh sách xét tuyển sẽ phục vụ cho chức năng xét tuyển trong CRM thay vì phải nhập thủ công.
        
    5.2. Các hàm liên quan
        -   ``action_export_admission_list``: Xuất file danh sách xét tuyển



D.  Quản lý danh sách xét tuyển
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Luồng hoạt động
^^^^^^^^^^^^^^^^^^
    -   Truy cập Menu CRM -> Xét tuyển -> Danh sách xét tuyển.
    -   Chức năng dùng để duyệt file xét tuyển, khi file đã được duyệt, các cơ hội gắn với cột Mã cơ hội (cột đầu tiên trong file) sẽ được tự động đánh dấu là chờ xét tuyển.File mẫu có nút Download file mẫu.
    -   Tạo mới danh sách xét tuyển, gắn file xét tuyển và nhấn nút duyệt danh sách, cơ hội sẽ tự động chuyển sang chờ xét tuyển với các cơ hội đã có mã trong file.

2. Các hàm liên quan
^^^^^^^^^^^^^^^^^^^^
    -   ``action_check_list``: Duyệt danh sách
    -   ``action_down_template``: Tải danh sách mẫu



E.  Danh sách trúng tuyển
~~~~~~~~~~~~~~~~~~~~~~~~~

1. Luồng hoạt động
^^^^^^^^^^^^^^^^^^
    -   Truy cập Menu CRM -> Xét tuyển -> Quyết định trúng tuyển.
    -   Chức năng dùng để duyệt danh sách các cơ hội đang chờ xét tuyển. Quyết định trúng tuyển sau khi tạo sẽ cần có file quyết định trúng tuyển và danh sách xét tuyển(có thể gộp nhiều đợt danh sách).
    -   Khi duyệt danh sách, hệ thống lấy mã cơ hội từ file quyết định trúng tuyển tới

2. Các hàm liên quan
^^^^^^^^^^^^^^^^^^^^
    -   ``th_action_confirm``: Duyệt quyết định trúng tuyển



F.  Danh sách khai giảng
~~~~~~~~~~~~~~~~~~~~~~~~

1. Luồng hoạt động
^^^^^^^^^^^^^^^^^^
-   Truy cập Menu CRM – Xét tuyển – Danh sách khai giảng.
-   Chức năng dùng để duyệt các cơ hội nằm trong danh sách khai giảng. Khi duyệt danh sách file sẽ đánh dấu các cơ hội CRM có nằm trong danh sách khai giảng của trường.Các cơ hội được duyệt từ danh sách này sẽ hiển thị dưới dạng smart button cơ hội trong formview danh sách.

2. Các hàm liên quan
^^^^^^^^^^^^^^^^^^^^
-   ``th_action_confirm``: Nút xác nhận duyệt danh sách khai giảng



G.  Cấu hình
~~~~~~~~~~~~

-   Tình trạng gọi hồ sơ: Quản lý tình trạng gọi của hồ sơ khách hàng
-   Điều kiện chuyển mối quan hệ tự động: Quản lý các điều kiện để chuyển level tự động cho cơ hội của CRM. Khi cơ hội thỏa mãn tất cả các điều kiện được setup, level (mối quan hệ) sẽ được tự động nhảy theo level đã cấu hình trong bảng.
-   Điều kiện nhảy level trong cấu hình:

    + Chưa có hồ sơ: Hồ sơ trên cơ hội chưa được tạo
    + Hồ sơ thiếu: Đã có hồ sơ và hồ sơ có tình trạng thiếu hoặc đủ tối thiểu
    + Hồ sơ đủ: Đã có hồ sơ và hồ sơ có tình trạng đủ
    + Đã bàn giao hồ sơ đủ: Cơ hội được đánh dấu chờ xét tuyển(th_check_admission)
    + Quyểt định trúng tuyển: Cơ hội đã được đánh dấu trúng tuyển(th_admission_decision)
    + Danh sách khai giảng: Cơ hội được đánh dấu có danh sách khai giảng(th_enrollment_list)
    + Level: Các level sẽ tự động nhảy theo cấu hình level

*Hàm liên quan:th_auto_next_level (chuyển level tự động)*

