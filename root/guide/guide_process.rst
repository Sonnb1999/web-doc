Hướng dẫn viết tài liệu Process
=================================

.. raw:: html

   <div class="proc-notice">
     <div class="notice-title">Phạm vi áp dụng</div>
     Dùng cho tất cả tài liệu quy trình bên trong <code>root/process/</code>.
     Mỗi quy trình tương ứng một thư mục <code>process_XX/</code> chứa một file <code>index.rst</code>.
   </div>

Cấu trúc một quy trình
-----------------------

.. code-block:: text

   root/process/
   ├── index.rst              ← Danh sách quy trình (KHÔNG sửa trừ khi thêm thẻ mới)
   └── process_XX/
       └── index.rst          ← Toàn bộ nội dung quy trình nằm ở đây

.. warning::

   Chỉ **một file** ``index.rst`` cho mỗi quy trình. Không tạo thêm ``business.rst``
   hay ``technical.rst`` — tất cả nội dung viết trong cùng một file.

----

Cấu trúc nội dung một file ``index.rst``
------------------------------------------

File quy trình gồm **4 phần theo thứ tự**:

.. raw:: html

   <table class="proc-table">
     <thead>
       <tr><th>#</th><th>Phần</th><th>Nội dung</th><th>Bắt buộc?</th></tr>
     </thead>
     <tbody>
       <tr><td>①</td><td>Metadata</td><td>Số hiệu, phiên bản, mục đích, phạm vi, ghi chú quan trọng</td><td>✅</td></tr>
       <tr><td>②</td><td>Sơ đồ tổng quan</td><td>Mermaid flowchart thể hiện luồng chính</td><td>✅</td></tr>
       <tr><td>③</td><td>Bảng tham chiếu nhanh</td><td>Stage · Owner · SLA · Đầu ra</td><td>✅</td></tr>
       <tr><td>④</td><td>Stage Cards</td><td>Chi tiết từng giai đoạn</td><td>✅</td></tr>
     </tbody>
   </table>

----

① Metadata
-----------

.. code-block:: rst

   Tên Quy trình
   =============

   .. raw:: html

      <!-- ① Metadata -->
      <div class="proc-meta-card">
        <div class="proc-meta-row">
          <div class="proc-meta-label">Định danh</div>
          <div class="proc-meta-val">
            <span class="proc-meta-chip"><strong>Số hiệu:</strong>&nbsp;0X/2026/QT-TTCNTT</span>
            <span class="proc-meta-chip"><strong>Phiên bản:</strong>&nbsp;V1.0</span>
            <span class="proc-meta-chip"><strong>Ngày ban hành:</strong>&nbsp;DD/MM/YYYY</span>
          </div>
        </div>
        <div class="proc-meta-row">
          <div class="proc-meta-label">Mục đích</div>
          <div class="proc-meta-val">Mô tả mục đích của quy trình này.</div>
        </div>
        <div class="proc-meta-row">
          <div class="proc-meta-label">Phạm vi</div>
          <div class="proc-meta-val">
            Áp dụng cho <strong>AI, B, C</strong> và ... Bắt đầu khi ... kết thúc khi ...
          </div>
        </div>
      </div>
      <div class="proc-notice">
        <div class="notice-title">Quan trọng</div>
        Ghi chú quan trọng về phạm vi, ngoại lệ, hoặc điều kiện áp dụng.
      </div>

----

② Sơ đồ Mermaid
-----------------

.. code-block:: rst

   .. mermaid::

      flowchart TD

          START([Điểm bắt đầu]):::start --> L1

          L1["L1 · Tên giai đoạn\n(Owner)"]:::auto --> L2

          L2{"L2 · Điều kiện\nrẽ nhánh"}:::branch

          L2 -->|"Nhánh A"| L3A["L3A · ..."]:::ba
          L2 -->|"Nhánh B"| L3B["L3B · ..."]:::ba

          L3A --> DONE([Hoàn thành]):::done
          L3B --> DONE

          classDef start   fill:#714B67,color:#fff,stroke:none
          classDef done    fill:#2e7d32,color:#fff,stroke:none
          classDef auto    fill:#d4e8ff,stroke:#5588bb,color:#1a1a1a
          classDef ba      fill:#f0eaf5,stroke:#9b72a8,color:#1a1a1a
          classDef branch  fill:#fff8e1,stroke:#e6a817,color:#1a1a1a
          classDef external fill:#e8f5e9,stroke:#4caf50,color:#1a1a1a

.. raw:: html

   <p class="proc-section-title">Bảng màu classDef Mermaid</p>
   <table class="proc-table">
     <thead><tr><th>classDef</th><th>Dùng cho</th><th>Màu</th></tr></thead>
     <tbody>
       <tr><td><code>start</code> / <code>done</code></td><td>Node đầu và cuối</td><td>Tím / Xanh lá</td></tr>
       <tr><td><code>auto</code></td><td>Hệ thống tự động (Odoo)</td><td>Xanh dương nhạt</td></tr>
       <tr><td><code>ba</code></td><td>BA thực hiện</td><td>Tím nhạt</td></tr>
       <tr><td><code>branch</code></td><td>Node điều kiện (hình thoi)</td><td>Vàng nhạt</td></tr>
       <tr><td><code>external</code></td><td>Luồng sang quy trình khác</td><td>Xanh lá nhạt</td></tr>
     </tbody>
   </table>

----

③ Bảng tham chiếu nhanh
------------------------

.. code-block:: html

   <p class="proc-section-title">Bảng tham chiếu nhanh</p>
   <table class="proc-table">
     <thead>
       <tr>
         <th>Giai đoạn</th><th>Tên</th><th>Owner</th><th>SLA</th><th>Đầu ra chính</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td><strong>L1</strong></td>
         <td>Tên giai đoạn</td>
         <td><span class="proc-badge bg-auto">Odoo Auto</span></td>
         <td>Ngay lập tức</td>
         <td>Mô tả đầu ra</td>
       </tr>
       <!-- Thêm các dòng tương tự cho L2, L3... -->
     </tbody>
   </table>

Các class badge owner:

.. raw:: html

   <table class="proc-table">
     <thead><tr><th>Class</th><th>Hiển thị</th><th>Dùng cho</th></tr></thead>
     <tbody>
       <tr><td><code>bg-auto</code></td><td><span class="proc-badge bg-auto">Odoo Auto</span></td><td>Hệ thống tự động</td></tr>
       <tr><td><code>bg-ba</code></td><td><span class="proc-badge bg-ba">BA</span></td><td>Business Analyst</td></tr>
       <tr><td><code>bg-lead</code></td><td><span class="proc-badge bg-lead">Team Lead</span></td><td>Trưởng nhóm / PM</td></tr>
       <tr><td><code>bg-dev</code></td><td><span class="proc-badge bg-dev">DEV</span></td><td>Developer</td></tr>
       <tr><td><code>bg-cus</code></td><td><span class="proc-badge bg-cus">Khách hàng</span></td><td>Người yêu cầu / KH nội bộ</td></tr>
     </tbody>
   </table>

----

④ Stage Cards
--------------

Mỗi giai đoạn là một thẻ ``.sc`` với class màu tương ứng owner:

.. raw:: html

   <table class="proc-table">
     <thead><tr><th>Class card</th><th>Owner</th><th>Màu hover</th></tr></thead>
     <tbody>
       <tr><td><code>sc sc-auto</code></td><td>Odoo Auto</td><td>Xanh dương nhạt</td></tr>
       <tr><td><code>sc sc-ba</code></td><td>BA</td><td>Tím nhạt</td></tr>
       <tr><td><code>sc sc-lead</code></td><td>Team Lead / PM</td><td>Xanh lá nhạt</td></tr>
       <tr><td><code>sc sc-dev</code></td><td>Developer</td><td>Đỏ nhạt</td></tr>
       <tr><td><code>sc sc-cus</code></td><td>Khách hàng</td><td>Vàng nhạt</td></tr>
     </tbody>
   </table>

Template một thẻ stage card đầy đủ:

.. code-block:: html

   <div class="sc sc-ba">
     <div class="sc-header">
       <div class="sc-header-top">
         <span class="sc-num">L1</span>
         <div>
           <div class="sc-title">Tên giai đoạn</div>
           <div class="sc-sub">Mô tả ngắn một dòng</div>
         </div>
       </div>
     </div>
     <div class="sc-stats">
       <div class="sc-row"><span class="sc-lbl">Owner</span><span class="sc-val">BA</span></div>
       <div class="sc-row"><span class="sc-lbl">SLA</span><span class="sc-val">≤ 4 giờ</span></div>
       <div class="sc-row"><span class="sc-lbl">Stakeholder</span><span class="sc-val">Team Lead, Dev</span></div>
       <div class="sc-row"><span class="sc-lbl">Công cụ</span><span class="sc-val">Odoo Helpdesk</span></div>
     </div>
     <div class="sc-body">
       <div class="sc-row"><span class="sc-lbl">Đầu vào</span>
         <ul class="sc-list">
           <li>Mục đầu vào 1</li>
           <li>Mục đầu vào 2</li>
         </ul>
       </div>
       <div class="sc-row" style="margin-top:6px"><span class="sc-lbl">Đầu ra</span>
         <ul class="sc-list">
           <li>Mục đầu ra 1</li>
         </ul>
       </div>
       <div class="sc-exit">
         <span class="sc-lbl">Tiêu chí hoàn thành</span>
         Mô tả điều kiện để giai đoạn này được coi là xong.
       </div>
       <!-- Chỉ thêm sc-warn nếu có rủi ro / chú ý đặc biệt -->
       <div class="sc-warn">⚠ Cảnh báo hoặc điều kiện ngoại lệ cần lưu ý.</div>
     </div>
   </div>

Đặt tất cả thẻ card bên trong ``.proc-grid``:

.. code-block:: html

   <p class="proc-section-title">Chi tiết từng giai đoạn</p>
   <div class="proc-grid">
     <!-- card L1 -->
     <!-- card L2 -->
     <!-- ... -->
   </div>

----

Thêm quy trình vào danh sách
-----------------------------

Sau khi tạo file xong, làm 2 việc:

**1. Thêm thẻ card vào ``root/process/index.rst``:**

.. code-block:: html

   <a class="process-card" href="../process/process_0X/index.html">
     <span class="process-number">QT0X</span>
     <h2>QT0X - Tên quy trình</h2>
     <p>Mô tả ngắn 1–2 câu về quy trình này.</p>
   </a>

**2. Khai báo trong toctree của ``root/process/index.rst``:**

.. code-block:: rst

   .. toctree::
     :hidden:
     :maxdepth: 5

     process_0X/index

----

Checklist trước khi hoàn thành
--------------------------------

.. raw:: html

   <table class="proc-table">
     <thead><tr><th>✓</th><th>Hạng mục kiểm tra</th></tr></thead>
     <tbody>
       <tr><td>☐</td><td>Metadata card có đủ: Số hiệu, Phiên bản, Ngày ban hành, Mục đích, Phạm vi</td></tr>
       <tr><td>☐</td><td>Mermaid diagram hiển thị đúng, không lỗi build</td></tr>
       <tr><td>☐</td><td>Bảng tham chiếu nhanh có đủ tất cả giai đoạn</td></tr>
       <tr><td>☐</td><td>Mỗi stage card có đủ: Owner, SLA, Stakeholder, Đầu vào, Đầu ra, Tiêu chí hoàn thành</td></tr>
       <tr><td>☐</td><td>Class card (<code>sc-auto</code>, <code>sc-ba</code>...) khớp với Owner thực tế</td></tr>
       <tr><td>☐</td><td>Đã thêm thẻ card vào <code>root/process/index.rst</code></td></tr>
       <tr><td>☐</td><td>Đã khai báo trong toctree</td></tr>
       <tr><td>☐</td><td><code>sphinx-build . _build/html -q</code> không có warning hay error</td></tr>
     </tbody>
   </table>

.. important::

   **Không dùng ``<style>`` inline trong RST.** Tất cả class (``proc-*``, ``sc-*``) đã có
   sẵn trong ``_static/process_page.css``. Nếu thiếu style, báo lại để bổ sung vào file CSS chung.
