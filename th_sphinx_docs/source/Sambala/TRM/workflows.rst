Chi tiết chức năng
------------------

A. Quản lý cơ hội sản xuất
~~~~~~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động**

Mỗi một giảng viên đều có các cơ hội sản xuất riêng, cơ hội sản xuất tạo từ kho giảng viên thông qua nút Tạo cơ hội sản xuất,
khi nhấn nút sẽ hiển thị biểu mẫu tạo cơ hội sản xuất.

**2. Các hàm liên quan**

``action_create_trm_lead`` (tạo mới cơ hội sản xuất)

B. Quản lý kho giảng viên
~~~~~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động**

Chứa các thông tin của giảng viên, được tạo mới sau khi đã có liên hệ, nếu chưa có liên hệ (res.partner) thì khi tạo mới giảng viên
sẽ cần thêm bước tạo mới liên hệ. Trên giao diện, nhập tên khách hàng và chọn options Create and Edit bên dưới, mở ra bảng tạo
mới khách hàng – nhập thông tin email, sđt – Lưu và đóng, khách hàng mới sẽ được tạo và được đánh dấu là khách hàng của TRM.

Khi giảng viên có cơ hội sản xuất sẽ có nút smart button nối tới các Cơ hội sản xuất của giảng viên đó.

C. Kiểm tra import TRM
~~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động**

Kiểm tra file import Cơ hội sản xuất xem trước có bị trùng hay không. Nếu có trùng sẽ trả ra file những cơ hội trùng.


D. Cấu hình giai đoạn
~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động**

Là giai đoạn của cơ hội sản xuất, người dùng thêm các tên giai đoạn tương ứng cần tạo, sau đó đánh dấu giai đoạn đầu và
giai đoạn cuối, chỉ có thể có 1 giai đoạn đầu và 1 giai đoạn cuối.

E. Cấu hình tình trạng gọi
~~~~~~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động**

Là nhóm trạng thái của cơ hội, dùng để biểu thị tình trạng của cơ hội sản xuất theo các giai đoạn.

Thêm sửa xóa các trường thông tin để cấu hình tình trạng gọi:

- Nhóm trạng thái: Tên của nhóm trạng thái đó
- Mối quan hệ: Các giai đoạn chứa nhóm trạng thái này
- Mô tả: Mô tả chi tiết về nhóm trạng thái.
- Trạng thái chi tiết: Các trạng thái con của nhóm trạng thái, mô tả tỉ mỉ về trạng thái của cơ hội sản xuất gắn liền với từng giai đoạn.

F. Cấu hình thành viên nhóm
~~~~~~~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động**

Là đội nhóm người tham gia, gồm tên đội, quản lý, đội nhóm cha và các thành viên nhóm.

Cấu hình chi tiết:

- Tên đội: Tên của đội nhóm
- Quản lý: Tên quản lý của đội nhóm này (chỉ có những nhân viên có quyền quản lý mới có trong danh sách chọn)
- Đội/Nhóm cha: Đội nhóm cha của đội này, nếu đội nhóm này có đội nhóm cha, thì các thành viên trong đội này sẽ được chọn
  từ các thành viên của đội cha, không có thì sẽ cho chọn toàn bộ từ liên hệ.
- Thành viên nhóm: Thành viên của đội nhóm.

G. Cấu hình nguồn khách hàng và kênh thông tin
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**1. Luồng hoạt động**

Tạo sẵn tên nguồn khách hàng và kênh thông tin hiện có cùng mô tả (nếu có).

