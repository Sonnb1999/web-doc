Chi tiết chức năng
------------------

A. Theo dõi và quản lý cơ hội (crm.lead)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Truy cập CRM – Cơ hội – menu Danh sách cơ hội hoặc CRM – Cơ hội – menu Trường học – chọn trường: Mở ra list danh sách Cơ hội (tree view) có thể theo dõi tất cả Cơ hội mà mình được nhìn thấy và không phân biệt Trường học, nếu chọn menu Trường học - chọn trường, danh sách Cơ hội sẽ được hiển thị và tự động lọc các Cơ hội chỉ thuộc Trường học đó.

*Các hàm liên quan: th_action_view_lead(nhấn kanban trường học mở ra danh sách)*

- Chọn vào 1 cơ hội bất kỳ sẽ mở ra chi tiết các thông tin của cơ hội đó. Cơ hội (crm.lead) là dùng để theo dõi chi tiết thông tin, trạng thái và lịch sử tương tác của 1 khách hàng(res.partner), mỗi cơ hội sẽ tương ứng với theo dõi 1 khách hàng, phục vụ cho việc chăm sóc và theo dõi chốt L8.
- Tạo mới cơ hội: Tạo mới cơ hội bằng cách nhập email hoặc sdt có sẵn từ bảng liên hệ(res.partner). Nếu chưa có sẽ cần thêm mới liên hệ thủ công rồi mới tạo mới Cơ hội – phải có khách hàng mới tạo mới được Cơ hội.
- Tạo mới khách hàng(liên hệ): Trên giao diện, nhập tên khách hàng và chọn options Create and Edit bên dưới, mở ra bảng tạo mới khách hàng – nhập thông tin email, sdt – Lưu và đóng, khách hàng mới sẽ được tạo và được đánh dấu là khách hàng của CRM.
- Thu hồi về kho: Trên giao diện danh sách cơ hội, khi chọn nhiều cơ hội và ấn nút Thu hồi về kho, cơ hội CRM sẽ mất đi và được chuyển về kho

*Các hàm liên quan: create, write, th_archive_lead ,…*

- Cơ hội được chăm sóc và theo dõi, thao tác chỉnh sửa dữ liệu, chuyển đổi Level: L0 – L4, ghi chú log note ,…
- Tính năng chia cơ hội cho người chăm sóc.
    + Chọn các cơ hội muốn được chia đều lại cho người chăm sóc trên treeview
    + Chọn option chia cơ hội, bảng chia cơ hội sẽ hiển thị với các thông tin:Chia theo, mối quan hệ, nhóm tình trạng, trạng thái chi tiết.

*Các hàm liên quan: th_action_assign_user1*

- Khi chọn chia theo cá nhân hoặc vòng chia thì trường người phụ trách hoặc trường vòng chia cũng sẽ tự động hiện ra.
- Sau khi chọn xong và ấn xác nhận: Cơ hội sẽ được tự động chia đều người phụ trách theo option đã chọn
    + Nếu chọn vòng chia, cơ hội sẽ chia đều người phụ trách trong vòng chia đó
    + Chọn người phụ trách, chia đều cơ hội cho người phụ trách đã chọn.
    + Chọn mối quan hệ, nhóm tình trạng, trạng thái chi tiết, các cơ hội được chọn sẽ tự động thay đổi các trường thông tin này


B. Theo dõi các cơ hội trùng, khiếu nại và xử lý cơ hội giữa các bên.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Chức năng check trùng cơ hội và xử lý cơ hội trùng tự động:
    + Khi cơ hội mới tạo, hệ thống sẽ xem xét và kiểm tra cơ hội có trùng hay không dựa trên các điều kiện: Cơ hội đang được chăm sóc(th_is_a_duplicate_opportunity=False),cùng 1 liên hệ(partner_id) và cùng trường(th_origin_id) với cơ hội mới.
    + Nếu tìm thấy có tồn tại cơ hội cũ đã có dựa trên các điều kiện bên trên, cơ hội mới và cơ hội cũ sẽ được tính là trùng nhau, hai cơ hội sẽ được tự động check trùng và loại bỏ 1 trong 2 vào menu trùng cơ hội. Tự động check trùng sẽ được xét dựa trên bảng ma trận check trùng đã được cấu hình sẵn, trường hợp không có ma trận thì sẽ mặc định cơ hội mới sẽ vào menu Trùng cơ hội

*Các hàm liên quan:*
    + th_check_condition_lead (check trùng xử lý 2 cơ hội trùng).*

- Truy cập CRM – Cơ hội – Cơ hội đang trùng.
    + Khi tạo mới cơ hội sẽ xảy ra trùng, điều kiện để xác định 2 cơ hội bị trùng là có chung 1 khách hàng, trường học. Khi cơ hội đã bị trùng, cơ hội tạo sau sẽ được xử lý tự động thắng thua theo cấu hình ma trận trùng để quyết định 1 trong 2 cơ hội sẽ bị đánh dấu cơ hội trùng và đưa vào menu Cơ hội bị trùng.
    + Cơ hội bị trùng thua sẽ không được chăm sóc và có thể khiếu nại để xử lý check trùng lại khi cơ hội nhập vào bị check thua tự động theo ma trận. Từ menu Cơ hội đang trùng mở giao diện cơ hội cần khiếu nại, ấn nút Khiếu nại và nhập mô tả, khi ấn nút Gửi sẽ gửi một phiếu xử lý cơ hội trùng cho admin xử lý lại.

*Các hàm liên quan:*
    + th_check_message(lịch sử chăm sóc cơ hội)
    + th_send_noti(gửi khiếu nại)
    + th_action_merge(xét lại cơ hội thua thành thắng)
    + th_keep_lead(giữ nguyên kết quả sau khiếu nại)

- Truy cập CRM – Trùng cơ hội
    + Các phiếu khiếu nại khi nhân viên khiếu nại về cơ hội trùng sẽ được admin xử lý tại đây, Menu Trùng cơ hội này sẽ chỉ admin được thao tác. Sau khi xem xét cơ hội sẽ xử lý khiếu nại cho phiếu đó, nếu khiếu nại thành công thì admin sẽ phân xử lại - cơ hội đó sẽ được xét lại từ thua thành thắng, cơ hội còn lại được đánh dấu trùng. Khi khiếu nại không thành công thì admin sẽ giữ lại kết quả check trùng như cũ và ấn nút Giữ cơ hội

C. Tạo đơn hàng, hóa đơn.
~~~~~~~~~~~~~~~~~~~~~~~~~

- Trên giao diện chi tiết (form view) cơ hội, ấn nút tạo đơn hàng sẽ mở ra cửa sổ tạo mới đơn hàng, chọn sản phẩm rồi tạo đơn hàng, sau đó ấn Lưu. Đơn hàng sẽ tự động tạo, tự động xác nhận đơn hàng và tự động tạo hóa đơn. Sau khi tạo xong đơn hàng sẽ có nút (smart button) Đơn hàng để xem chi tiết đơn hàng và hóa đơn của cơ hội đó.

*Các hàm liên quan:*
    + action_sale_quotations_new (nút tạo mới đơn hàng)
    + action_view_sale_order (nút xem chi tiết đơn hàng)

.. warning::
    Lưu ý khi muốn xóa đơn hàng, cần xóa từ hóa đơn xong mới xóa tới đơn hàng.

D. Tạo hồ sơ
~~~~~~~~~~~~

- Trên giao diện chi tiết (form view) cơ hội, ấn nút tạo hồ sơ sẽ mở ra cửa sổ tạo mới hồ sơ sau đó ấn Lưu. Hồ sơ sau khi tạo thành công sẽ có nút smart button Hồ sơ để xem chi tiết hồ sơ của cơ hội đó.
- Khi đã có hồ sơ, nút Tạo hồ sơ sẽ biến mất thay vào đó là nút Rút hồ sơ, khi nhấn nút Rút hồ sơ thì sẽ xóa đi hồ sơ của cơ hội.

*Các hàm liên quan:*
    + action_create_profile (tạo mới hồ sơ)
    + action_open_profile (xem chi tiết hồ sơ)
    + action_withdraw_profile (Rút hồ sơ)

E. Quản lý hồ sơ khách hàng
~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Truy cập Menu CRM – Quản lý hồ sơ - Trường học hoặc CRM – Quản lý hồ sơ – Tất cả hồ sơ.
- Mở ra danh sách(listview) chứa tất cả hồ sơ, nếu chọn theo Trường học trước khi mở ra danh sách hồ sơ, hồ sơ sẽ được lọc sẵn theo trường học đã chọn.
- Chọn 1 bản ghi truy cập vào form view chi tiết của hồ sơ, thao tác chỉnh sửa dữ liệu hồ sơ,…

F. Quản lý chăm sóc khách hàng
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Truy cập Menu CRM – Chăm sóc khách hàng – Chăm sóc khách hàng hoặc Chăm sóc khách hàng - Trường học
- Mở ra danh sách(listview) chứa tất cả cơ hội chăm sóc khách hàng, nếu chọn theo Trường học trước khi mở ra danh sách CSKH, cơ hội CSKH sẽ được lọc sẵn theo trường học đã chọn.
- Cơ hội CSKH gồm danh sách (list view), chi tiết giao diện cơ hội CSKH (formview). Cơ hội CSKH sẽ dùng để chăm sóc, theo dõi các khách hàng tiềm năng có tiềm năng trở thành cơ hội CRM. Khi cơ hội CSKH có đủ điều kiện tạo cơ hội CRM, trên formview sẽ xuất hiện nút Tạo cơ hội, khi ấn nút sẽ hiện bảng thông tin cần điền khi tạo mới cơ hội. Khi cơ hội được tạo thành công, sẽ hiển thị smart button nối từ Cơ hội CSKH sang Cơ hội CRM.
- Trên formview cơ hội CSKH có nút Danh sách đen, khi ấn nút sẽ đưa cơ hội CSKH vào danh sách đen.
- Trên listview danh sách cơ hội CSKH khi lựa chọn nhiều cơ hội cũng có nút Danh sách đen và Tạo cơ hội phục vụ việc thao tác nhiều cơ hội CSKH cùng lúc.

*Các hàm liên quan:*
    + th_create_and_divide_lead (tạo mới cơ hội)
    + action_black_list_ccs_lead( danh sách đen)

G. Lưu kho
~~~~~~~~~~

- Truy cập Menu CRM – Kho lưu trữ - Kho lưu trữ - Trường học hoặc Kho lưu trữ - Kho tổng
- Tại đây chứa các cơ hội được đánh dấu thu hồi về kho từ danh sách cơ hội CRM.
- Trên danh sách(treeview) cơ hội trong Cơ hội của tôi. Khi chọn các cơ hội và ấn nút Thu hồi về kho, các cơ hội sẽ được chuyển về Kho lưu trữ

*Các hàm liên quan:*
    + th_archive_lead(Thu hồi cơ hội về kho)

H. Quản lý liên hệ tiềm năng
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Truy cập Menu CRM – Liên hệ tiềm năng
- Chứa các liên hệ được đánh dấu module CRM - liên hệ đang có cơ hội CRM.

I. Quản lý các sản phẩm
~~~~~~~~~~~~~~~~~~~~~~~

- Truy cập Menu CRM – Sản phẩm
- Chứa các sản phẩm của CRM, phục vụ lựa chọn sản phẩm khi tạo đơn hàng.

J. Quản lý danh sách xét tuyển
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Truy cập Menu CRM – Xét tuyển – Danh sách xét tuyển.
- Chức năng dùng để duyệt file xét tuyển, khi file đã được duyệt, các cơ hội gắn với cột Mã cơ hội (cột đầu tiên trong file) sẽ được tự động đánh dấu là chờ xét tuyển.File mẫu có nút Download file mẫu.
- Tạo mới danh sách xét tuyển, gắn file xét tuyển và nhấn nút duyệt danh sách, cơ hội sẽ tự động chuyển sang chờ xét tuyển với các cơ hội đã có mã trong file.

*Các hàm liên quan:*
    + action_check_list( duyệt danh sách)
    + action_down_template( tải danh sách mẫu),…

K. Danh sách trúng tuyển
~~~~~~~~~~~~~~~~~~~~~~~~

- Truy cập Menu CRM – Xét tuyển – Quyết định trúng tuyển.
- Chức năng dùng để duyệt danh sách các cơ hội đang chờ xét tuyển. Quyết định trúng tuyển sau khi tạo sẽ cần có file quyết định trúng tuyển và danh sách xét tuyển(có thể gộp nhiều đợt danh sách).
- Khi duyệt danh sách, hệ thống lấy mã cơ hội từ file quyết định trúng tuyển tới

*Các hàm liên quan:*
    + th_action_confirm (duyệt quyết định trúng tuyển)

L. Danh sách khai giảng
~~~~~~~~~~~~~~~~~~~~~~~

- Truy cập Menu CRM – Xét tuyển – Danh sách khai giảng.
- Chức năng dùng để duyệt các cơ hội nằm trong danh sách khai giảng. Khi duyệt danh sách file sẽ đánh dấu các cơ hội CRM có nằm trong danh sách khai giảng của trường.Các cơ hội được duyệt từ danh sách này sẽ hiển thị dưới dạng smart button cơ hội trong formview danh sách.

*Các hàm liên quan:*
    + th_action_confirm (Nút xác nhận duyệt danh sách khai giảng)

M. Đợt bàn giao hồ sơ
~~~~~~~~~~~~~~~~~~~~~

- Truy cập Menu CRM – Xét tuyển – Đợt bàn giao hồ sơ.
- Chức năng dùng để duyệt hồ sơ của khách hàng, tạo mới đợt bàn giao hồ sơ rồi dùng file xét duyệt bàn giao hồ sơ sau đó nhấn nút Duyệt hồ sơ tải lên, nếu không dùng file thì ấn nút Duyệt hồ sơ để lựa chọn thủ công các hồ sơ cần duyệt.Sau khi duyệt xong sẽ có nút Tải xuống hồ sơ duyệt.

*Các hàm liên quan:*
    + action_open_selected_profile (Chọn thủ công hồ sơ)
    + action_take_upload_profile (Duyệt hồ sơ tải lên)

N. Kiểm tra năng suất nhân viên
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Truy cập CRM – Kiểm tra năng suất nhân viên.
- Tính năng dùng để theo dõi tương tác của nhân viên với các cơ hội.
- Khi truy cập tính năng Kiểm tra năng suất nhân viên sẽ hiện giao diện lựa chọn đội nhóm hoặc cá nhân, sau đó ấn nút Kiểm tra sẽ hiển thị ra các tương tác với cơ hội theo đội nhóm hoặc theo nhân viên.
- Khi ấn nút kiểm tra sẽ tự động mở ra bảng các lognote(mail.message) của người dùng theo từng đội nhóm hoặc cá nhân tuy điều kiện lọc

*Các hàm liên quan:*
    + action_open_lognote_list

O. Cấu hình
~~~~~~~~~~~

- Cấu hình: có sẵn của CRM. Các chức năng hiện đang để mặc định
- Đội tư vấn: Quản lý các đội nhóm của CRM và thành viên trong đội. Các đội được liên kết theo kiểu nhóm cha nhóm con. Khi được set up xong đội nhóm, tài khoản trưởng nhóm(res.user) của nhóm đó sẽ tự động được thêm vào danh sách quản lý của từng thành viên.
- Thành viên đội: Toàn bộ thành viên của các đội.
- Vòng chia: Quản lý các vòng chia, trong vòng chia sẽ chứa một hoặc nhiều người dùng. Sử dụng vòng chia để phục vụ chức năng chia cơ hội. Mỗi khi sử dụng vòng chia sẽ đều trả về 1 người dùng, sau đó sẽ cập nhật cờ. Trong vòng chia có trường cắm cờ (flag) để đánh dấu lưu vết cho các lần dùng vòng chia. Cờ sẽ lần lượt đánh dấu từng thành viên trong vòng, khiến cho các thành viên sẽ luôn luôn được phân công sau mỗi lần vòng chia được sử dụng.

*Các hàm liên quan:*
    + action_assign_leads (trả ra 1 người trong vòng chia và cắm cờ vào người tiếp theo)

- Nhóm tình trạng cơ hội: Chứa các nhóm tình trạng của cơ hội, trong các nhóm tình trạng sẽ có những trạng thái chi tiết. Mỗi nhóm tình trạng sẽ được đánh dấu theomối quan hệ, khi cơ hội ở mối quan hệ được setup mới có thể chọn nhóm trạng thái đó.
- Kiểu hoạt động: Quản lý các kiểu hoạt động của cơ hội.
- Tình trạng gọi hồ sơ: Quản lý tình trạng gọi của hồ sơ khách hàng
- Tình trạng gọi CSKH: quản lý tình trạng gọi của CSKH.
- Phân loại thái độ khách hàng: Quản lý phân loại thái độ khách hàng
- Mối quan hệ: Quản lý các mối quan hệ hay còn gọi là các level của cơ hội CRM, cơ hội CSKH.
- Nhóm cơ hội: Quản lý các nhóm cơ hội
- Điều kiện kiểm tra trùng cơ hội: Quản lý ma trận check trùng cho cơ hội CRM khi cơ hội rơi vào tình trạng trùng. Khi cơ hội bị trùng, hệ thống sẽ sử dụng ma trận đã được cấu hình trong bảng để đưa ra kết quả xử lý.
- Điều kiện chuyển mối quan hệ tự động: Quản lý các điều kiện để chuyển level tự động cho cơ hội của CRM. Khi cơ hội thỏa mãn tất cả các điều kiện được setup, level (mối quan hệ) sẽ được tự động nhảy theo level đã cấu hình trong bảng.
    + Điều kiện nhảy level trong cấu hình:
        Điều kiện:
            Chưa có đơn hàng: Đơn hàng trên cơ hội chưa có(order_ids) hoặc đã có đơn hàng và hóa đơn nhưng chưa được thanh toán.

            Đã nộp lệ phí, học phi 1 phần: Đã có đơn hàng và thanh toán hóa đơn, nhưng chưa thanh toán đủ
            Đã nộp đủ HP, LP:
        Chưa có hồ sơ:
            Chưa có: Hồ sơ trên cơ hội chưa được tạo
            Đã có: Hồ sơ đã được tạo
        * Hồ sơ thiếu: Đã có hồ sơ và hồ sơ có tình trạng thiếu hoặc đủ tối thiểu
        * Hồ sơ đủ: Đã có hồ sơ và hồ sơ có tình trạng đủ
        * Đã bàn giao hồ sơ đủ: Cơ hội được đánh dấu chờ xét tuyển(th_check_admission)
        * Quyểt định trúng tuyển: Cơ hội đã được đánh dấu trúng tuyển(th_admission_decision)
        * Danh sách khai giảng: Cơ hội được đánh dấu có danh sách khai giảng(th_enrollment_list)
        * Level: Các level sẽ tự động nhảy theo cấu hình level bên dưới

- Điều kiện: kiểm tra đơn hàng và hóa đơn của cơ hội.
- Kiểm tra hồ sơ: kiểm tra hồ sơ thiếu, đủ, chưa có.
- Đã bàn giao hồ sơ đủ: Kiểm tra hồ sơ có ở trạng thái “đã bàn giao” hay chưa
- Quyết định trúng tuyển: Kiểm tra cơ hội có được đánh dấu đã xét tuyển hay chưa.
- Danh sách khai giảng: Kiểm tra cơ hội có được đánh dấu trong danh sách khai giảng.
- Mối quan hệ: Mối quan hệ tương ứng được trả về khi các điều kiện đều thỏa mãn.

*Hàm liên quan:th_auto_next_level (chuyển level tự động)*
