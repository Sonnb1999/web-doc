Hướng dẫn viết tài liệu System
================================

.. raw:: html

   <div class="proc-notice">
     <div class="notice-title">Phạm vi áp dụng</div>
     Dùng cho tất cả tài liệu bên trong <code>root/system/</code> — bao gồm các nhóm
     COS, PCS, SCS, E-commerce, Marketing, Internal System.
   </div>

Cấu trúc một module
--------------------

Mỗi module cần có **đúng 3 file** trong thư mục riêng:

.. code-block:: text

   root/system/<nhóm>/<tên-module>/
   ├── index.rst        ← Trang giới thiệu module (bắt buộc)
   ├── business.rst     ← Đặc tả nghiệp vụ
   └── technical.rst    ← Đặc tả kỹ thuật

.. warning::

   Tên thư mục và file **chỉ dùng chữ thường, không dấu, dùng gạch ngang** nếu cần.
   Ví dụ: ``email-marketing/``, ``quality-control/``.

----

Template: ``index.rst`` (trang module)
-----------------------------------------

Copy nguyên mẫu sau và điền thông tin:

.. code-block:: rst

   Tên Module — Tên nhóm
   ======================

   Mô tả ngắn về module này làm gì, phục vụ ai, tích hợp với gì.

   .. toctree::
      :maxdepth: 1

      business
      technical

.. raw:: html

   <div class="proc-notice">
     <div class="notice-title">Chú ý — toctree</div>
     Khai báo <code>business</code> và <code>technical</code> trong toctree của <code>index.rst</code>
     để Sphinx nhận biết và đưa vào sidebar. Không khai báo = cảnh báo khi build.
   </div>

----

Template: ``business.rst``
----------------------------

.. code-block:: rst

   Đặc tả Nghiệp vụ — Tên Module
   ================================

   Tổng quan
   ----------

   Mô tả bối cảnh nghiệp vụ, vấn đề mà module giải quyết.

   Đối tượng sử dụng
   ------------------

   - **Sales**: ...
   - **Kế toán**: ...

   Luồng nghiệp vụ chính
   ----------------------

   .. mermaid::

      flowchart LR
        A[Bắt đầu] --> B[Bước 1] --> C[Kết thúc]

   Các trường hợp đặc biệt
   ------------------------

   - Trường hợp 1: ...
   - Trường hợp 2: ...

   .. note::

      Lưu ý nghiệp vụ quan trọng cần nhấn mạnh.

----

Template: ``technical.rst``
-----------------------------

.. code-block:: rst

   Đặc tả Kỹ thuật — Tên Module
   ==============================

   Module / Model liên quan
   -------------------------

   .. list-table::
      :header-rows: 1
      :widths: 25 25 50

      * - Model
        - Tên kỹ thuật
        - Mô tả
      * - Đơn hàng
        - ``sale.order``
        - Quản lý đơn bán hàng

   Cấu hình & Tham số
   -------------------

   .. code-block:: python

      # Ví dụ cấu hình
      SETTING_KEY = "value"

   API / Tích hợp
   ---------------

   Mô tả các endpoint, webhook, hoặc kết nối với hệ thống bên ngoài.

   .. warning::

      Ghi chú kỹ thuật quan trọng, ví dụ: cần cài module bổ sung, lưu ý hiệu năng...

----

Cập nhật danh sách hệ thống
-----------------------------

Sau khi tạo module mới, thêm link vào **``root/system/index.rst``**:

.. code-block:: html

   <div class="app-section">
     <h2 class="app-section-title">Tên nhóm — Mô tả nhóm</h2>
     <ul class="app-link-list">
       <li><a href="../<nhóm>/<module>/index.html">Tên Module</a></li>
     </ul>
   </div>

.. raw:: html

   <div class="proc-notice">
     <div class="notice-title">Chú ý — Đường dẫn href</div>
     Đường dẫn <code>href</code> phải là <strong>đường dẫn tương đối từ vị trí file HTML output</strong>,
     không phải từ vị trí file RST nguồn.<br><br>
     File <code>root/system/index.html</code> → link đến module phải là
     <code>../system/cos/crm/index.html</code> (relative từ thư mục <code>system/</code>).
   </div>

Cũng cần khai báo module mới trong ``toctree`` của file cha tương ứng:

.. code-block:: rst

   .. toctree::
      :hidden:
      :maxdepth: 5

      cos/index
      cos/crm/index      ← thêm dòng này

----

Các directive hay dùng
-----------------------

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Directive
     - Dùng khi nào
   * - ``.. note::``
     - Thông tin bổ sung, không bắt buộc đọc ngay
   * - ``.. warning::``
     - Cảnh báo, dễ gây lỗi nếu bỏ qua
   * - ``.. important::``
     - Thông tin bắt buộc phải biết
   * - ``.. code-block:: python``
     - Hiển thị code với syntax highlighting
   * - ``.. list-table::``
     - Bảng dữ liệu dạng danh sách, dễ duy trì hơn table RST thuần
   * - ``.. mermaid::``
     - Vẽ sơ đồ luồng, sequence diagram

.. important::

   Không dùng thẻ ``<style>`` inline trong file RST. Nếu cần style đặc biệt,
   báo lại để thêm vào file ``_static/`` tương ứng.
