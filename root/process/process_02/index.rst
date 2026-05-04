QT02 — Helpdesk: Giao tiếp một cửa
====================================

.. raw:: html

   <!-- ① Metadata -->
   <div class="proc-meta-card">
     <div class="proc-meta-row">
       <div class="proc-meta-label">Định danh</div>
       <div class="proc-meta-val">
         <span class="proc-meta-chip"><strong>Số hiệu:</strong>&nbsp;02/2026/QT-TTCNTT</span>
         <span class="proc-meta-chip"><strong>Phiên bản:</strong>&nbsp;V3.0</span>
         <span class="proc-meta-chip"><strong>Ngày ban hành:</strong>&nbsp;01/01/2026</span>
       </div>
     </div>
     <div class="proc-meta-row">
       <div class="proc-meta-label">Mục đích</div>
       <div class="proc-meta-val">Chuẩn hóa toàn bộ luồng tiếp nhận, phân loại và điều phối yêu cầu hỗ trợ tới người dùng nội bộ hệ thống Helpdesk Odoo.</div>
     </div>
     <div class="proc-meta-row">
       <div class="proc-meta-label">Phạm vi</div>
       <div class="proc-meta-val">Áp dụng cho <strong>BA, DEV, PM</strong> và người dùng nội bộ. Bắt đầu khi ticket được tạo, kết thúc khi ticket chuyển trạng thái hoàn thành.</div>
     </div>
   </div>
   <div class="proc-notice">
     <div class="notice-title">Quan trọng</div>
     Quy trình này chỉ áp dụng cho yêu cầu nội bộ qua Helpdesk Odoo. Yêu cầu từ khách hàng bên ngoài được xử lý theo quy trình riêng.
   </div>

.. mermaid::

   flowchart TD

       START([Người dùng gửi yêu cầu]):::start --> L1

       L1["L1 · Tiếp nhận & Kiểm tra hợp lệ (Odoo tự động)"]:::auto --> L2

       L2["L2 · Phân loại & Sizing (BA)"]:::ba --> L3

       L3{"L3 · Định tuyến theo size"}:::branch

       L3 -->|"Size S"| QT04["QT04 DEV Flow"]:::external
       L3 -->|"Size M / L"| L4

       QT04 --> L6

       L4["L4 · Thông báo sơ bộ (BA)"]:::ba --> L5

       L5["L5 · Thông báo go-live chính thức (BA + PM)"]:::ba --> L7

       L6["L6 · Theo dõi xử lý Size S (BA owner · DEV thực thi)"]:::ba

       L7["L7 · Cập nhật trạng thái (chỉ áp dụng Size M/L)"]:::ba

       L6 --> L8
       L7 --> L8

       L8["L8 · Verify & Thông báo\nhoàn thành (BA)"]:::ba --> DONE([Hoàn thành]):::done

       classDef start fill:#714B67,color:#fff,stroke:none
       classDef done fill:#2e7d32,color:#fff,stroke:none
       classDef auto fill:#d4e8ff,stroke:#5588bb,color:#1a1a1a
       classDef ba fill:#f0eaf5,stroke:#9b72a8,color:#1a1a1a
       classDef branch fill:#fff8e1,stroke:#e6a817,color:#1a1a1a
       classDef external fill:#e8f5e9,stroke:#4caf50,color:#1a1a1a

.. raw:: html

   <!-- ③ Quick Reference Table -->
   <p class="proc-section-title">Bảng tham chiếu nhanh</p>
   <table class="proc-table">
     <thead>
       <tr>
         <th>Giai đoạn</th>
         <th>Tên</th>
         <th>Owner</th>
         <th>SLA</th>
         <th>Đầu ra chính</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td><strong>L1</strong></td>
         <td>Tiếp nhận yêu cầu</td>
         <td><span class="proc-badge bg-auto">Odoo Auto</span></td>
         <td>Ngay lập tức</td>
         <td>Ticket được tạo, ID ghi nhận</td>
       </tr>
       <tr>
         <td><strong>L2</strong></td>
         <td>Phân loại &amp; Sizing</td>
         <td><span class="proc-badge bg-ba">BA</span></td>
         <td>≤ 4 giờ làm việc</td>
         <td>Label, độ ưu tiên, size (S/M/L)</td>
       </tr>
       <tr>
         <td><strong>L3</strong></td>
         <td>Định tuyến</td>
         <td><span class="proc-badge bg-ba">BA</span></td>
         <td>≤ 2 giờ sau L2</td>
         <td>Ticket được assign đúng team</td>
       </tr>
       <tr>
         <td><strong>L4</strong></td>
         <td>Thông báo sơ bộ</td>
         <td><span class="proc-badge bg-lead">Team Lead</span></td>
         <td>≤ 1 ngày làm việc</td>
         <td>Email/message xác nhận tiếp nhận</td>
       </tr>
       <tr>
         <td><strong>L5</strong></td>
         <td>Go-live deadline</td>
         <td><span class="proc-badge bg-lead">Team Lead</span></td>
         <td>≤ 2 ngày làm việc</td>
         <td>Ngày hoàn thành dự kiến được cam kết</td>
       </tr>
       <tr>
         <td><strong>L6</strong></td>
         <td>Theo dõi &amp; Hỗ trợ</td>
         <td><span class="proc-badge bg-ba">BA</span></td>
         <td>Liên tục đến khi xong</td>
         <td>Log cập nhật, phản hồi khách hàng</td>
       </tr>
       <tr>
         <td><strong>L7</strong></td>
         <td>Cập nhật trạng thái</td>
         <td><span class="proc-badge bg-ba">BA</span></td>
         <td>Mỗi 2 ngày làm việc</td>
         <td>Ticket status updated, note ghi nhận</td>
       </tr>
       <tr>
         <td><strong>L8</strong></td>
         <td>Verify &amp; Xác nhận</td>
         <td><span class="proc-badge bg-cus">Khách hàng</span></td>
         <td>≤ 2 ngày sau bàn giao</td>
         <td>Biên bản nghiệm thu / xác nhận UAT</td>
       </tr>
       <tr>
         <td><strong>L9</strong></td>
         <td>Đóng ticket</td>
         <td><span class="proc-badge bg-auto">Odoo Auto</span></td>
         <td>Ngay sau xác nhận</td>
         <td>Ticket trạng thái Done, lưu trữ</td>
       </tr>
     </tbody>
   </table>

   <!-- ④ Stage Card Grid -->
   <p class="proc-section-title">Chi tiết từng giai đoạn</p>
   <div class="proc-grid">

     <!-- L1 -->
     <div class="sc sc-auto">
       <div class="sc-header">
         <div class="sc-header-top">
           <span class="sc-num">L1</span>
           <div>
             <div class="sc-title">Tiếp nhận yêu cầu</div>
             <div class="sc-sub">Odoo Helpdesk tự động tạo ticket</div>
           </div>
         </div>
       </div>
       <div class="sc-stats">
         <div class="sc-row"><span class="sc-lbl">Owner</span><span class="sc-val">Odoo (Auto)</span></div>
         <div class="sc-row"><span class="sc-lbl">SLA</span><span class="sc-val">Ngay lập tức</span></div>
         <div class="sc-row"><span class="sc-lbl">Stakeholder</span><span class="sc-val">Người yêu cầu</span></div>
         <div class="sc-row"><span class="sc-lbl">Kênh</span><span class="sc-val">Portal / Email / Chat</span></div>
       </div>
       <div class="sc-body">
         <div class="sc-row"><span class="sc-lbl">Đầu vào</span>
           <ul class="sc-list"><li>Yêu cầu từ người dùng nội bộ</li><li>Thông tin mô tả vấn đề</li></ul>
         </div>
         <div class="sc-row" style="margin-top:6px"><span class="sc-lbl">Đầu ra</span>
           <ul class="sc-list"><li>Ticket được tạo với ID duy nhất</li><li>Email xác nhận gửi người yêu cầu</li></ul>
         </div>
         <div class="sc-exit">
           <span class="sc-lbl">Tiêu chí hoàn thành</span>
           Ticket tồn tại trong Odoo, ID được ghi nhận
         </div>
       </div>
     </div>

     <!-- L2 -->
     <div class="sc sc-ba">
       <div class="sc-header">
         <div class="sc-header-top">
           <span class="sc-num">L2</span>
           <div>
             <div class="sc-title">Phân loại &amp; Sizing</div>
             <div class="sc-sub">BA đánh giá độ phức tạp</div>
           </div>
         </div>
       </div>
       <div class="sc-stats">
         <div class="sc-row"><span class="sc-lbl">Owner</span><span class="sc-val">BA</span></div>
         <div class="sc-row"><span class="sc-lbl">SLA</span><span class="sc-val">≤ 4 giờ làm việc</span></div>
         <div class="sc-row"><span class="sc-lbl">Stakeholder</span><span class="sc-val">Team Lead, Dev</span></div>
         <div class="sc-row"><span class="sc-lbl">Công cụ</span><span class="sc-val">Odoo Helpdesk</span></div>
       </div>
       <div class="sc-body">
         <div class="sc-row"><span class="sc-lbl">Đầu vào</span>
           <ul class="sc-list"><li>Ticket mới từ L1</li><li>Mô tả yêu cầu ban đầu</li></ul>
         </div>
         <div class="sc-row" style="margin-top:6px"><span class="sc-lbl">Đầu ra</span>
           <ul class="sc-list"><li>Label phân loại (Bug / Feature / Support)</li><li>Size: S / M / L</li><li>Độ ưu tiên: Low / Normal / High</li></ul>
         </div>
         <div class="sc-exit">
           <span class="sc-lbl">Tiêu chí hoàn thành</span>
           Ticket có đầy đủ label, size và mức ưu tiên
         </div>
         <div class="sc-warn">⚠ Nếu thiếu thông tin → yêu cầu bổ sung trước khi phân loại</div>
       </div>
     </div>

     <!-- L3 -->
     <div class="sc sc-ba">
       <div class="sc-header">
         <div class="sc-header-top">
           <span class="sc-num">L3</span>
           <div>
             <div class="sc-title">Định tuyến</div>
             <div class="sc-sub">Phân bổ đến đúng team xử lý</div>
           </div>
         </div>
       </div>
       <div class="sc-stats">
         <div class="sc-row"><span class="sc-lbl">Owner</span><span class="sc-val">BA</span></div>
         <div class="sc-row"><span class="sc-lbl">SLA</span><span class="sc-val">≤ 2 giờ sau L2</span></div>
         <div class="sc-row"><span class="sc-lbl">Stakeholder</span><span class="sc-val">Team Lead nhận ticket</span></div>
         <div class="sc-row"><span class="sc-lbl">Quy tắc</span><span class="sc-val">Size S → Dev trực tiếp</span></div>
       </div>
       <div class="sc-body">
         <div class="sc-row"><span class="sc-lbl">Đầu vào</span>
           <ul class="sc-list"><li>Ticket đã phân loại từ L2</li><li>Ma trận định tuyến theo size &amp; loại</li></ul>
         </div>
         <div class="sc-row" style="margin-top:6px"><span class="sc-lbl">Đầu ra</span>
           <ul class="sc-list"><li>Ticket được assign đúng team</li><li>Size S → QT04 Dev xử lý ngay</li><li>Size M/L → tiếp tục L4</li></ul>
         </div>
         <div class="sc-exit">
           <span class="sc-lbl">Tiêu chí hoàn thành</span>
           Ticket có assignee, team xử lý xác nhận nhận việc
         </div>
       </div>
     </div>

     <!-- L4 -->
     <div class="sc sc-lead">
       <div class="sc-header">
         <div class="sc-header-top">
           <span class="sc-num">L4</span>
           <div>
             <div class="sc-title">Thông báo sơ bộ</div>
             <div class="sc-sub">Xác nhận tiếp nhận đến khách hàng</div>
           </div>
         </div>
       </div>
       <div class="sc-stats">
         <div class="sc-row"><span class="sc-lbl">Owner</span><span class="sc-val">Team Lead</span></div>
         <div class="sc-row"><span class="sc-lbl">SLA</span><span class="sc-val">≤ 1 ngày làm việc</span></div>
         <div class="sc-row"><span class="sc-lbl">Stakeholder</span><span class="sc-val">Người yêu cầu, BA</span></div>
         <div class="sc-row"><span class="sc-lbl">Kênh</span><span class="sc-val">Email / Odoo message</span></div>
       </div>
       <div class="sc-body">
         <div class="sc-row"><span class="sc-lbl">Đầu vào</span>
           <ul class="sc-list"><li>Ticket đã được định tuyến (L3)</li><li>Thông tin team phụ trách</li></ul>
         </div>
         <div class="sc-row" style="margin-top:6px"><span class="sc-lbl">Đầu ra</span>
           <ul class="sc-list"><li>Email / message xác nhận tiếp nhận</li><li>Tên người phụ trách được thông báo</li></ul>
         </div>
         <div class="sc-exit">
           <span class="sc-lbl">Tiêu chí hoàn thành</span>
           Khách hàng nhận được xác nhận tiếp nhận
         </div>
       </div>
     </div>

     <!-- L5 -->
     <div class="sc sc-lead">
       <div class="sc-header">
         <div class="sc-header-top">
           <span class="sc-num">L5</span>
           <div>
             <div class="sc-title">Go-live Deadline</div>
             <div class="sc-sub">Cam kết ngày hoàn thành</div>
           </div>
         </div>
       </div>
       <div class="sc-stats">
         <div class="sc-row"><span class="sc-lbl">Owner</span><span class="sc-val">Team Lead</span></div>
         <div class="sc-row"><span class="sc-lbl">SLA</span><span class="sc-val">≤ 2 ngày làm việc</span></div>
         <div class="sc-row"><span class="sc-lbl">Stakeholder</span><span class="sc-val">PM, Người yêu cầu</span></div>
         <div class="sc-row"><span class="sc-lbl">Công cụ</span><span class="sc-val">Odoo Project / Calendar</span></div>
       </div>
       <div class="sc-body">
         <div class="sc-row"><span class="sc-lbl">Đầu vào</span>
           <ul class="sc-list"><li>Ticket đã thông báo sơ bộ (L4)</li><li>Đánh giá workload hiện tại</li></ul>
         </div>
         <div class="sc-row" style="margin-top:6px"><span class="sc-lbl">Đầu ra</span>
           <ul class="sc-list"><li>Ngày go-live được ghi vào ticket</li><li>Khách hàng đồng thuận với deadline</li></ul>
         </div>
         <div class="sc-exit">
           <span class="sc-lbl">Tiêu chí hoàn thành</span>
           Deadline được ghi nhận, khách hàng xác nhận
         </div>
         <div class="sc-warn">⚠ Deadline phải thực tế — không cam kết khi chưa đánh giá workload</div>
       </div>
     </div>

     <!-- L6 -->
     <div class="sc sc-ba">
       <div class="sc-header">
         <div class="sc-header-top">
           <span class="sc-num">L6</span>
           <div>
             <div class="sc-title">Theo dõi &amp; Hỗ trợ</div>
             <div class="sc-sub">Giám sát tiến độ xử lý</div>
           </div>
         </div>
       </div>
       <div class="sc-stats">
         <div class="sc-row"><span class="sc-lbl">Owner</span><span class="sc-val">BA</span></div>
         <div class="sc-row"><span class="sc-lbl">SLA</span><span class="sc-val">Liên tục đến khi xong</span></div>
         <div class="sc-row"><span class="sc-lbl">Stakeholder</span><span class="sc-val">Dev, Team Lead, KH</span></div>
         <div class="sc-row"><span class="sc-lbl">Chu kỳ</span><span class="sc-val">Check-in mỗi 2 ngày</span></div>
       </div>
       <div class="sc-body">
         <div class="sc-row"><span class="sc-lbl">Đầu vào</span>
           <ul class="sc-list"><li>Ticket đang trong trạng thái xử lý</li><li>Cập nhật tiến độ từ Dev/Team</li></ul>
         </div>
         <div class="sc-row" style="margin-top:6px"><span class="sc-lbl">Đầu ra</span>
           <ul class="sc-list"><li>Log tiến độ được cập nhật trên ticket</li><li>Vấn đề phát sinh được escalate kịp thời</li></ul>
         </div>
         <div class="sc-exit">
           <span class="sc-lbl">Tiêu chí hoàn thành</span>
           Ticket chuyển sang trạng thái "Chờ verify"
         </div>
       </div>
     </div>

     <!-- L7 -->
     <div class="sc sc-ba">
       <div class="sc-header">
         <div class="sc-header-top">
           <span class="sc-num">L7</span>
           <div>
             <div class="sc-title">Cập nhật trạng thái</div>
             <div class="sc-sub">Đồng bộ thông tin với khách hàng</div>
           </div>
         </div>
       </div>
       <div class="sc-stats">
         <div class="sc-row"><span class="sc-lbl">Owner</span><span class="sc-val">BA</span></div>
         <div class="sc-row"><span class="sc-lbl">SLA</span><span class="sc-val">Mỗi 2 ngày làm việc</span></div>
         <div class="sc-row"><span class="sc-lbl">Stakeholder</span><span class="sc-val">Người yêu cầu</span></div>
         <div class="sc-row"><span class="sc-lbl">Kênh</span><span class="sc-val">Odoo Chatter / Email</span></div>
       </div>
       <div class="sc-body">
         <div class="sc-row"><span class="sc-lbl">Đầu vào</span>
           <ul class="sc-list"><li>Tiến độ từ team Dev / QA</li><li>Vướng mắc phát sinh (nếu có)</li></ul>
         </div>
         <div class="sc-row" style="margin-top:6px"><span class="sc-lbl">Đầu ra</span>
           <ul class="sc-list"><li>Status ticket được cập nhật</li><li>Note nội dung gửi khách hàng</li></ul>
         </div>
         <div class="sc-exit">
           <span class="sc-lbl">Tiêu chí hoàn thành</span>
           Khách hàng biết trạng thái mới nhất, không có câu hỏi treo
         </div>
       </div>
     </div>

     <!-- L8 -->
     <div class="sc sc-cus">
       <div class="sc-header">
         <div class="sc-header-top">
           <span class="sc-num">L8</span>
           <div>
             <div class="sc-title">Verify &amp; Xác nhận</div>
             <div class="sc-sub">Khách hàng nghiệm thu kết quả</div>
           </div>
         </div>
       </div>
       <div class="sc-stats">
         <div class="sc-row"><span class="sc-lbl">Owner</span><span class="sc-val">Khách hàng</span></div>
         <div class="sc-row"><span class="sc-lbl">SLA</span><span class="sc-val">≤ 2 ngày sau bàn giao</span></div>
         <div class="sc-row"><span class="sc-lbl">Stakeholder</span><span class="sc-val">BA, Team Lead</span></div>
         <div class="sc-row"><span class="sc-lbl">Hình thức</span><span class="sc-val">UAT / Demo trực tiếp</span></div>
       </div>
       <div class="sc-body">
         <div class="sc-row"><span class="sc-lbl">Đầu vào</span>
           <ul class="sc-list"><li>Sản phẩm / giải pháp đã hoàn thiện</li><li>Tài liệu hướng dẫn sử dụng (nếu có)</li></ul>
         </div>
         <div class="sc-row" style="margin-top:6px"><span class="sc-lbl">Đầu ra</span>
           <ul class="sc-list"><li>Biên bản nghiệm thu / xác nhận UAT</li><li>Danh sách lỗi còn tồn đọng (nếu có)</li></ul>
         </div>
         <div class="sc-exit">
           <span class="sc-lbl">Tiêu chí hoàn thành</span>
           Khách hàng ký xác nhận hoặc approve trên Odoo
         </div>
         <div class="sc-warn">⚠ Nếu không đạt → quay lại L6 xử lý lỗi tồn đọng</div>
       </div>
     </div>

     <!-- L9 -->
     <div class="sc sc-auto">
       <div class="sc-header">
         <div class="sc-header-top">
           <span class="sc-num">L9</span>
           <div>
             <div class="sc-title">Đóng ticket</div>
             <div class="sc-sub">Hệ thống tự động đóng sau xác nhận</div>
           </div>
         </div>
       </div>
       <div class="sc-stats">
         <div class="sc-row"><span class="sc-lbl">Owner</span><span class="sc-val">Odoo (Auto)</span></div>
         <div class="sc-row"><span class="sc-lbl">SLA</span><span class="sc-val">Ngay sau xác nhận L8</span></div>
         <div class="sc-row"><span class="sc-lbl">Stakeholder</span><span class="sc-val">BA, Người yêu cầu</span></div>
         <div class="sc-row"><span class="sc-lbl">Lưu trữ</span><span class="sc-val">Odoo Archive</span></div>
       </div>
       <div class="sc-body">
         <div class="sc-row"><span class="sc-lbl">Đầu vào</span>
           <ul class="sc-list"><li>Xác nhận hoàn thành từ khách hàng (L8)</li></ul>
         </div>
         <div class="sc-row" style="margin-top:6px"><span class="sc-lbl">Đầu ra</span>
           <ul class="sc-list"><li>Ticket trạng thái "Done"</li><li>Dữ liệu được lưu trữ, có thể tra cứu</li><li>Báo cáo tổng hợp (nếu cần)</li></ul>
         </div>
         <div class="sc-exit">
           <span class="sc-lbl">Tiêu chí hoàn thành</span>
           Ticket đóng, không còn action item nào mở
         </div>
       </div>
     </div>

   </div><!-- /proc-grid -->

.. toctree::
   :maxdepth: 1
   :hidden:
