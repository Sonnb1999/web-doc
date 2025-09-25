Chi tiết chức năng
------------------

A. Thêm sinh viên/cơ hội
~~~~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động:**

- Tại menu Danh sách sinh viên bên trong Sinh viên
- Người dùng có thể chọn 1 trường học trong các kanban, tạo mới, nhập thông tin sinh viên và lưu:

   - Nếu trường th_semester (kỳ học) có giá trị, bản ghi trở thành một sinh viên và xuất hiện trong Danh sách sinh viên
   - Nếu trường th_semester (kỳ học) không được đặt, bản ghi trở thành một cơ hội chưa phải sinh viên và xuất hiện trong
     Kho tiếp nhận, người dùng có thể chuyển cơ hội thành sinh viên tại Kho tiếp nhận

- Người dùng có thể thấy toàn bộ sinh viên trên SRM, thêm mới, import file sinh viên lên hệ thống; xuất, xóa, thay đổi thông tin sinh viên

**2. Các hàm liên quan:**

- ``create`` (th.student)
- ``write`` (th.student)

B. Tiếp nhận cơ hội, chuyển thành sinh viên
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động:**

- Tại Kho tiếp nhận bên trong Sinh viên, hiển thị lên các cơ hội từ CRM, hoặc được tạo mới từ Danh sách sinh viên
- Chọn những cơ hội muốn chuyển thành sinh viên
- Ấn chọn “Chuyển cơ hội thành sinh viên”, hiện lên một popup, điền thông tin chia cơ hội và xác nhận
- Những cơ hội được chọn trở thành sinh viên, bản ghi được chuyển sang view sinh viên, với giá trị trường th_semester (kỳ học) được đặt tự động là “L0”

**2. Các hàm liên quan:**

- ``action_share_the_chance``

C. Rút học phí đã nộp
~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động:**

- Tại FormView một cơ hội tại Kho tiếp nhận, ấn vào nút Rút học phí đã nộp, hiện lên một popup
- Điền thông tin vào popup và Xác nhận
- ... (gọi lại hàm từ CRM)

**2. Các hàm liên quan:**

- ``action_tuition_withdrawal_CRM``
- ``reverse_moves``

D. Quản lý đợt, phiếu chăm sóc học phí
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**1. Quản lý đợt**

1.1. Luồng hoạt động

- Người dùng có thể tạo, xem, sửa, xóa đợt chăm sóc học phí
- Hành động định kỳ hàng ngày kiểm tra ngày hết hạn của đợt chăm sóc học phí, khi đã qua đợt chăm sóc thì trạng thái của
  đợt chuyển thành “Hoàn thành”

1.2. Các hàm liên quan

- ``action_check_expiration_date_of_tuition_period``

**2. Tạo phiếu học phí hàng loạt**

2.1. Luồng hoạt động

- Để tạo phiếu học phí hàng loạt, người dùng cần import file .xlsx danh sách sinh viên muốn tạo phiếu
- Người dùng ấn nút “Tạo Phiếu Học Phí” (nút này chỉ hiển thị khi trạng thái của đợt học phí là “Nháp”, đang ngoài giờ làm
  việc 6h->18h và người dùng có vai trò người quản trị SRM)
- Khi ấn nút và xác nhận, hệ thống đưa yêu cầu tạo phiếu vào hàng đợi và tạo phiếu sau, mỗi phiếu được tạo kèm tương ứng
  1 đơn hàng và hóa đơn

2.2. Các hàm liên quan

- ``get_tuition_fee_template``
- ``action_import_student_list``
- ``action_create_tuition_ticket``
- ``action_create_sale_order``

**3. Tạo phiếu học phí thủ công**

3.1. Luồng hoạt động

- Tại Form View của 1 đợt học phí, người dùng có thể tạo học phí thủ công cho từng sinh viên bằng nút “Tạo phiếu học phí thủ công”
  (nút này ẩn đi nếu trạng thái đợt đang là “Nháp”)
- Khi ấn nút, điền thông tin sinh viên cần tạo vào form và lưu, phiếu học phí của sinh viên đó tương ứng đợt học phí đó
  được tạo, kèm theo đơn hàng và hóa đơn

3.2. Các hàm liên quan

- ``action_create_manual_tuition_ticket``

E. Quản lý đợt, phiếu chăm sóc học tập
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**1.Quản lý đợt**

1.1. Luồng hoạt động:

- Người dùng có thể tạo, xem, sửa, xóa đợt chăm sóc học tập
- Hành động định kỳ hàng ngày kiểm tra ngày hết hạn của đợt chăm sóc học tập, khi đã qua đợt chăm sóc thì trạng thái của
  đợt chuyển thành “Hoàn thành”

1.2. Các hàm liên quan

- ``action_check_expiration_date_of_learning_period``

**2. Tạo phiếu học tập**

2.1. Luồng hoạt động

- Người dùng chọn trường học và ấn nút tìm sinh viên, có thể lọc từ danh sách sinh viên tìm được
- Để tạo phiếu học tập, ấn nút “Tạo phiếu học tập” (chỉ hiển thị khi trạng thái đợt là “Nháp”), hệ thống sẽ tạo phiếu dựa
  vào danh sách sinh viên đã chọn
- Sau khi tạo phiếu, hệ thống chuyển trạng thái của đợt thành “Đã tạo phiếu học tập”
- Người dùng có thể xem các phiếu học tập tương ứng của đợt bằng smart button “Phiếu học tập”

2.2. Các hàm liên quan

- ``action_create_learning_ticket``
- ``action_view_learning_ticket``
- ``action_view_details_students_find``

F. Quản lý đơn hàng học phí
~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Luồng hoạt động:

- Tại menu Đơn hàng trong menu Sinh viên, người dùng có thể thấy những đơn hàng được tạo tự động từ phiếu chăm sóc học
  phí (model sale.order)
- Khi vào một đơn hàng, có thể mở được phiếu học phí và hóa đơn tương ứng của đơn hàng đó bằng smart button
- Người dùng có thể xem, xuất, xóa đơn hàng

**2. Các hàm liên quan:**

- ``action_view_invoice_new``
- ``action_preview_sale_order``
- ``action_view_tuition_ticket_from_sale_order``

G. Kiểm tra tương tác của nhân viên
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động:**

- Chọn “Kiểm tra tương tác của nhân viên” trong menu Kiểm tra, hiển thị lên một popup, có thể kiểm tra tương tác theo đội
  nhóm hoặc nhân viên
- Ấn xác nhận, danh sách lognote trên hệ thống của đội nhóm/cá nhân được chọn hiện lên

**2. Các hàm liên quan:**

- ``action_open_srm_lognote_list``

H. Kiểm tra điều kiện thi của sinh viên
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động:**

- Chọn “Kiểm tra điều kiện thi của sinh viên” trong menu Kiểm tra, hiển thị lên một popup
- Người dùng nhập “Môn học” và “Điều kiện thi” muốn kiểm tra, hệ thống sẽ tìm kiếm danh sách sinh viên theo điều kiện và hiển thị

**2. Các hàm liên quan:**

- ``check_exam_conditions``

I. Import kết quả học tập cho sinh viên
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động:**

- Luồng 1: Import hàng loạt từ Listview

   - Từ ListView Danh sách sinh viên, người dùng ấn vào nút “Import kết quả học tập”, hiện lên một popup
   - Người dùng có thể download file .xlsx mẫu từ nút |icon_download|, sau đó tải file excel từ máy để import dữ liệu,
     hệ thống sẽ đọc và ghi

- Luồng 2: Import kết quả học tập cho 1 sinh viên

   - Tại tab “Kết quả học tập” trong form view của 1 sinh viên, người dùng có thể ấn nút “Import kết quả học tập” để hiển
     thị popup import
   - Người dùng có thể download file .xlsx mẫu từ nút |icon_download|, sau đó tải file excel từ máy để import dữ liệu,
     hệ thống sẽ đọc và ghi

- Lưu ý: những kết quả học tập được ghi tiếp, không ảnh hưởng tới những kết quả đã có sẵn trên hệ thống

**2. Các hàm liên quan:**

- Luồng 1:

   - ``action_download_template``
   - ``th_import_learning_results``

- Luồng 2:

   - ``action_open_import_study_result``
   - ``action_download_template_study_result_individual``
   - ``action_import_study_result``

J. Cập nhật kỳ học hàng loạt cho sinh viên
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động:**

- Tại ListView Danh sách sinh viên, người dùng có thể chọn một hoặc nhiều bản ghi sinh viên
- Hiển thị nút “Cập nhật kỳ học”, người dùng ấn vào thì hiện lên popup
- Nhập kỳ học muốn cập nhật và ấn Xác nhận, hệ thống sẽ cập nhật trường kỳ học của các bản ghi được chọn

**2. Các hàm liên quan:**

- ``action_change_semester``

K. Chia cơ hội
~~~~~~~~~~~~~~

**1. Luồng hoạt động:**

- Luồng 1: Chia cơ hội hàng loạt sinh viên

   - Từ ListView Danh sách sinh viên, chọn một/nhiều bản ghi sinh viên, hoặc từ FormView của 1 sinh viên
   - Ấn nút Thực hiện và chọn hành động Chia cơ hội, hiện lên một popup
   - Điền thông tin và ấn Xác nhận, các bản ghi sinh viên được chọn được chia cơ hội cho cá nhân/đội nhóm

- Luồng 2: Chia cơ hội hàng loạt phiếu học phí

   - Từ ListView Phiếu chăm sóc học phí, chọn một hoặc nhiều bản ghi phiếu học phí, hoặc từ FormView của 1 phiếu học phí
   - Ấn nút Thực hiện và chọn hành động Chia cơ hội, hiện lên một popup tương tự
   - Thực hiện tương tự Luồng 1

- Luồng 3: Chia cơ hội hàng loạt phiếu học tập

   - Từ ListView Phiếu chăm sóc học tập, chọn một hoặc nhiều bản ghi phiếu học tập, hoặc từ FormView của 1 phiếu học tập
   - Ấn nút Thực hiện và chọn hành động Chia cơ hội, hiện lên một popup tương tự
   - Thực hiện tương tự Luồng 1

**2. Các hàm liên quan:**

- ``action_share_the_chance``

L. Cập nhật trạng thái học phí cho phiếu chăm sóc học phí
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động:**

- Từ ListView Phiếu chăm sóc học phí, người dùng có thể chọn một hoặc nhiều bản ghi phiếu học phí
- Ấn nút “Cập nhật trạng thái học phí”, hiện lên một popup wizard
- Lựa chọn giá trị cho các trường và ấn “Xác nhận”, hệ thống sẽ update trạng thái học phí của các bản ghi được chọn

**2. Các hàm liên quan:**

- ``action_change_fee_status``

M. Cấu hình
~~~~~~~~~~~

**1. Luồng hoạt động:**

- Hệ thống cho phép quản trị viên cấu hình các model phụ để liên kết với các trường trong model chính
- Cụ thể:

  - Tình trạng học tập (th.student.status)
  - Tình trạng học tập chi tiết (th.student.status.detail)
  - Đội chăm sóc (th.srm.team)
  - Môn học (th.subject)
  - Loại phiếu (th.ballot.type)
  - Trạng thái chi tiết (th.status.detail)
  - Điều kiện thực tập (th.internship.conditions)
  - Tình trạng miễn môn (th.exempted.subject)
  - Chi tiết tình trạng sinh viên (th.status.student.particular)
  - Chi tiết trạng thái học phí (th.fee.status.particular)
  - Lịch chăm sóc sau bảo lưu (th.care.schedule.of.defer)
  - Tình trạng đăng ký môn (th.subject.registration.status)
  - Tình trạng gọi (th.status.category)
  - Chi tiết tình trạng sinh viên VSTEP (th.status.student.particular)

**2. Các hàm liên quan:**


.. |icon_download| image:: ../../_static/images/download.png
   :width: 20px
   :height: 20px
   :align: middle
