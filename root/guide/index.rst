Hướng dẫn đóng góp tài liệu
=============================

.. raw:: html

   <div class="proc-notice">
     <div class="notice-title">Mục đích</div>
     Trang này giúp nhân sự hiểu cấu trúc thư mục tài liệu, xác định đúng vị trí cần làm việc
     và thực hiện đúng chuẩn định dạng cho từng loại tài liệu.
   </div>

Sơ đồ cấu trúc thư mục
-----------------------

.. code-block:: text

   root/
   ├── architect/                  ← Kiến trúc tổng thể hệ thống
   ├── business/                   ← Nghiệp vụ chung toàn công ty
   │
   ├── system/                     ← TÀI LIỆU HỆ THỐNG  ★ xem guide_system
   │   ├── index.rst               ← Danh sách tất cả hệ thống (app-grid)
   │   ├── cos/                    ← Nhóm Core Systems
   │   │   ├── index.rst
   │   │   └── crm/                ← Một module cụ thể
   │   │       ├── index.rst       ← Trang giới thiệu module
   │   │       ├── business.rst    ← Đặc tả nghiệp vụ
   │   │       └── technical.rst   ← Đặc tả kỹ thuật
   │   ├── pcs/
   │   ├── scs/
   │   ├── ecommerce/
   │   ├── marketing/
   │   └── internal_system/
   │
   ├── process/                    ← QUY TRÌNH  ★ xem guide_process
   │   ├── index.rst               ← Danh sách tất cả quy trình (process-grid)
   │   ├── process_00/             ← QT00: R&D
   │   │   └── index.rst
   │   ├── process_01/             ← QT01: Quy hoạch & Giám sát
   │   │   └── index.rst
   │   └── process_XX/             ← Thêm quy trình mới tại đây
   │       └── index.rst
   │
   └── guide/                      ← Thư mục hướng dẫn (trang này)
       ├── index.rst
       ├── guide_system.rst
       └── guide_process.rst

.. raw:: html

   <p class="proc-section-title">Tôi cần làm ở đâu?</p>
   <table class="proc-table">
     <thead>
       <tr>
         <th>Loại tài liệu</th>
         <th>Thư mục đích</th>
         <th>File cần tạo / sửa</th>
         <th>Hướng dẫn</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td>Tài liệu module hệ thống mới</td>
         <td><code>root/system/&lt;nhóm&gt;/&lt;module&gt;/</code></td>
         <td><code>index.rst</code>, <code>business.rst</code>, <code>technical.rst</code></td>
         <td><a href="guide_system.html">Hướng dẫn System →</a></td>
       </tr>
       <tr>
         <td>Cập nhật danh sách hệ thống</td>
         <td><code>root/system/</code></td>
         <td><code>index.rst</code> (thêm link vào app-grid)</td>
         <td><a href="guide_system.html">Hướng dẫn System →</a></td>
       </tr>
       <tr>
         <td>Quy trình mới (QT0X)</td>
         <td><code>root/process/process_0X/</code></td>
         <td><code>index.rst</code></td>
         <td><a href="guide_process.html">Hướng dẫn Process →</a></td>
       </tr>
       <tr>
         <td>Cập nhật danh sách quy trình</td>
         <td><code>root/process/</code></td>
         <td><code>index.rst</code> (thêm thẻ process-card)</td>
         <td><a href="guide_process.html">Hướng dẫn Process →</a></td>
       </tr>
     </tbody>
   </table>

Quy tắc chung
-------------

.. warning::

   **Không được** đặt CSS tùy chỉnh trực tiếp vào thẻ ``<style>`` trong file RST.
   Toàn bộ CSS dùng chung được quản lý tập trung trong ``_static/``.

.. note::

   Sau mỗi lần chỉnh sửa, chạy lệnh build để kiểm tra kết quả::

      sphinx-build . _build/html -q

   Mở file ``_build/html/<tên-trang>/index.html`` trong trình duyệt để xem kết quả.

.. important::

   Khi thêm file hoặc thư mục mới, luôn khai báo trong ``toctree`` của file cha
   để tránh cảnh báo **"document not included in any toctree"**.

.. toctree::
   :maxdepth: 1
   :hidden:

   guide_system
   guide_process
