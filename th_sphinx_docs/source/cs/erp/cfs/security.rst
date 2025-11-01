Phân quyền CSKH
===============

A. Nhóm quyền CSKH
------------------

1. Quyền cơ bản
~~~~~~~~~~~~~~~

- **Cộng tác viên CSKH**  
    + Xem/sửa/tạo cơ hội CRM và phiếu CSKH do chính mình phụ trách.  
    + Xem lognote của cơ hội mình phụ trách.  
    + Không được phép xóa bản ghi.  

- **Nhân viên CSKH**  
    + Kế thừa quyền của Cộng tác viên.  
    + Xem/sửa/tạo cơ hội và phiếu CSKH của cộng tác viên mình quản lý.  
    + Được phép xóa bản ghi.  

- **Trưởng nhóm CSKH**  
    + Kế thừa quyền của Nhân viên.  
    + Xem/sửa/tạo cơ hội và phiếu CSKH của toàn bộ thành viên trong đội mình quản lý.  
    + Có quyền truy cập tất cả các phiếu CSKH trong team.  

- **Quản trị viên CSKH**  
    + Toàn quyền trên tất cả cơ hội và phiếu CSKH.  
    + Truy cập toàn bộ chức năng, menu, cấu hình liên quan đến CSKH.  

2. Phân quyền theo dữ liệu
~~~~~~~~~~~~~~~~~~~~~~~~~~

- **Cộng tác viên CSKH**  
    + Cơ hội CRM: chỉ xem/sửa các cơ hội do chính mình phụ trách.  
    + Phiếu CSKH: chỉ xem/sửa các phiếu liên kết với cơ hội của mình.  
    + Lognote: chỉ xem ghi chú (lognote) gắn với cơ hội mình phụ trách.  

- **Nhân viên CSKH**  
    + Cơ hội CRM: xem/sửa các cơ hội của cộng tác viên mình quản lý.  
    + Phiếu CSKH: xem/sửa các phiếu của cộng tác viên mình quản lý.  

- **Trưởng nhóm CSKH**  
    + Cơ hội CRM: xem/sửa toàn bộ cơ hội của team (bao gồm mình và thành viên).  
    + Phiếu CSKH: xem/sửa toàn bộ phiếu CSKH của team.  

- **Quản trị viên CSKH**  
    + Không giới hạn dữ liệu.  

B. Quyền truy cập Menu
----------------------

1. Menu Chăm sóc khách hàng
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- **Cộng tác viên / Nhân viên / Trưởng nhóm / Quản trị viên** đều có quyền truy cập:  
    + *Chăm sóc khách hàng* (Kanban trường học).  
    + *Kho CSKH tổng* (dành cho nhóm admin CRM).  
    + *Danh sách đen*.  

2. Menu Cấu hình (chỉ dành cho Quản trị viên CSKH)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Đội CSKH.  
- Thành viên đội.  
- Tình trạng gọi CSKH.  
- Phân loại thái độ khách hàng.  
- Mối quan hệ CSKH (Stages).  

---
