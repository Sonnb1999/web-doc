Chi tiết chức năng
------------------

A. Tạo bản ghi sinh viên tương ứng
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động**

- Gọi super() để ghi đè phương thức write, tránh làm hỏng các chức năng CRM có sẵn
- Kiểm tra nếu **stage_id** thay đổi, nghĩa là mối quan hệ của cơ hội thay đổi, thì mới tiếp tục logic
- Kiểm tra các điều kiện:

   - Cơ hội chưa từng chuyển sang SRM (giá trị trường has_been_created_to_srm = False)
   - Đang không trong context chia cơ hội (divide_caregivers)
   - Cơ hội đã chuyển sang giai đoạn won (is_won = True)

- Thỏa mãn các điều kiện trên thì sẽ:

   - Tạo sinh viên mới trong th.student dựa trên thông tin từ cơ hội, dùng sudo() để bỏ qua các hạn chế phân quyền
   - Đánh dấu cơ hội này đã tạo sinh viên, tránh tạo trùng sinh viên
   - Thêm module SRM vào danh sách các module của partner, nếu chưa có

- Nếu không thỏa mãn điều kiện, không thực hiện thao tác nào

**2. Các hàm liên quan**

- ``write`` (crm.lead)
