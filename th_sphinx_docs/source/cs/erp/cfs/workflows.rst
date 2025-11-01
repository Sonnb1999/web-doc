Chi tiết chức năng
------------------


A.  Quản lý chăm sóc khách hàng.
~~~~~~~~~~~~~~~~~~~~~~~~

1. Luồng hoạt động
^^^^^^^^^^^^^^^^^^
-   Truy cập Menu CFS – Chăm sóc khách hàng – Chăm sóc khách hàng hoặc Chăm sóc khách hàng - Trường học
-   Mở ra danh sách(listview) chứa tất cả cơ hội chăm sóc khách hàng, nếu chọn theo Trường học trước khi mở ra danh sách CSKH, cơ hội CSKH sẽ được lọc sẵn theo trường học đã chọn.
-   Cơ hội CSKH gồm danh sách (list view), chi tiết giao diện cơ hội CSKH (formview). Cơ hội CSKH sẽ dùng để chăm sóc, theo dõi các khách hàng tiềm năng có tiềm năng trở thành cơ hội CRM. Khi cơ hội CSKH có đủ điều kiện tạo cơ hội CRM, trên formview sẽ xuất hiện nút Tạo cơ hội, khi ấn nút sẽ hiện bảng thông tin cần điền khi tạo mới cơ hội. Khi cơ hội được tạo thành công, sẽ hiển thị smart button nối từ Cơ hội CSKH sang Cơ hội CRM.
-   Trên formview cơ hội CSKH có nút Danh sách đen, khi ấn nút sẽ đưa cơ hội CSKH vào danh sách đen.
-   Trên listview danh sách cơ hội CSKH khi lựa chọn nhiều cơ hội cũng có nút Danh sách đen và Tạo cơ hội phục vụ việc thao tác nhiều cơ hội CSKH cùng lúc.
2. Các hàm liên quan
^^^^^^^^^^^^^^^^^^^^
-   th_create_and_divide_lead: Tạo mới cơ hội
-   action_black_list_ccs_lead: Danh sách đen



B.  Cấu hình
~~~~~~~~~~~~~~~~~~~~~~~~

-   Đội CSKH: Quản lý các đội nhóm của CRM và thành viên trong đội. Các đội được liên kết theo kiểu nhóm cha nhóm con. Khi được set up xong đội nhóm, tài khoản trưởng nhóm(res.user) của nhóm đó sẽ tự động được thêm vào danh sách quản lý của từng thành viên.
-   Thành viên đội: Toàn bộ thành viên của các đội.
-   Tình trạng gọi CSKH: quản lý tình trạng gọi của CSKH.
-   Phân loại thái độ khách hàng: Quản lý phân loại thái độ khách hàng
-   Mối quan hệ CSKH: Quản lý các mối quan hệ hay còn gọi là các level của cơ hội CRM, cơ hội CSKH.
