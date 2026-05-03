.. ============================================================
.. TEMPLATE: business.rst — Tài liệu Nghiệp vụ Hệ thống
.. Phiên bản: v0.2 | 25/03/2026
.. Người viết: BA + Dev senior hiểu nghiệp vụ
.. Người đọc: BA, DEV, QA, PM (tất cả cần hiểu nghiệp vụ để làm việc hiệu quả)
.. Nguyên tắc: Mô tả "chuyện gì xảy ra" — KHÔNG mô tả "nhấn nút nào"
.. ============================================================

=======================
[Tên Module] — Nghiệp vụ
=======================

.. meta::
   :module: [tên kỹ thuật, ví dụ: th_crm]
   :cluster: [ví dụ: CS > ERP (Sambala)]
   :owner: [tên BA/Dev senior phụ trách]
   :updated: [ngày cập nhật]


1. Tổng quan Nghiệp vụ
======================

.. Hướng dẫn: 3-5 câu. Trả lời: module tồn tại để phục vụ nghiệp vụ gì?
.. Đặt trong bối cảnh chuỗi nghiệp vụ tổng thể (module này đứng ở đâu trong hành trình?).

[Viết tổng quan ở đây]


2. Đối tượng Sử dụng
====================

.. Hướng dẫn: Mô tả từ góc nhìn nghiệp vụ — họ dùng module để làm gì, không phải phân quyền kỹ thuật.
.. Phân quyền chi tiết (read/write trên model nào) nằm ở technical.rst.

.. list-table::
   :header-rows: 1
   :widths: 20 50 30

   * - Vai trò
     - Công việc nghiệp vụ
     - Tần suất
   * - [Vai trò 1]
     - [Làm gì với module này]
     - [Hàng ngày / Hàng tuần / Khi cần]
   * - [Vai trò 2]
     - [Làm gì với module này]
     - [...]


3. Luồng Nghiệp vụ Chính
========================

.. Hướng dẫn: Đây là phần chính. Mỗi luồng: "Ai → làm gì → kết quả gì".
.. Gắn mã C4 QHSP vào header mỗi luồng (loose coupling, không bắt buộc 1:1).
.. Rule đơn giản chỉ áp dụng trong 1 bước → lồng vào cột Mô tả hoặc ghi "Điều kiện".
.. Rule áp dụng nhiều luồng → đưa lên Section 4.


3.1. Luồng [Tên luồng] ``[C4: XXX-001, 002]``
----------------------------------------------

**Mục đích:** [Luồng này phục vụ nghiệp vụ gì]

**Điều kiện tiên quyết:** [Nếu có — ví dụ: phải có X trước khi thực hiện]

.. list-table::
   :header-rows: 1
   :widths: 5 30 65

   * - #
     - Bước
     - Mô tả
   * - 1
     - [Tên bước]
     - [Ai làm gì → kết quả gì. Nếu có điều kiện: "Điều kiện: ..."]
   * - 2
     - [Tên bước]
     - [...]
   * - 3
     - [Tên bước]
     - [...]


3.2. Luồng [Tên luồng] ``[C4: XXX-003]``
-----------------------------------------

**Mục đích:** [...]

.. list-table::
   :header-rows: 1
   :widths: 5 30 65

   * - #
     - Bước
     - Mô tả
   * - 1
     - [Tên bước]
     - [...]

.. Thêm luồng 3.3, 3.4... nếu cần. Mỗi module thường có 3-8 luồng chính.


4. Quy tắc Nghiệp vụ (Business Rules)
======================================

.. Hướng dẫn: Liệt kê rule áp dụng NHIỀU luồng hoặc cần tra cứu độc lập (QA, AI).
.. Rule chỉ áp dụng 1 bước cụ thể → đã lồng vào Section 3, không cần lặp lại ở đây.
.. Đánh mã: BR-{MODULE}-{STT}, ví dụ: BR-CRM-01.
.. Nguồn: YCNV + YCCN + code thực tế.

.. list-table::
   :header-rows: 1
   :widths: 15 55 30

   * - Mã
     - Quy tắc
     - Áp dụng khi
   * - BR-[MODULE]-01
     - [Mô tả ràng buộc mà hệ thống enforce]
     - [Tình huống kích hoạt rule này]
   * - BR-[MODULE]-02
     - [...]
     - [...]


5. Liên kết với Module Khác
============================

.. Hướng dẫn: Mô tả data/hành động chảy đi đâu từ góc nhìn nghiệp vụ.
.. Chi tiết kỹ thuật (gọi hàm nào, qua API nào) → technical.rst Section 6.

.. list-table::
   :header-rows: 1
   :widths: 20 15 65

   * - Module
     - Hướng
     - Mô tả nghiệp vụ
   * - [Tên module]
     - [Module này] → [Module kia]
     - [Data/hành động gì chảy sang]
   * - [Tên module]
     - [Module kia] → [Module này]
     - [Data/hành động gì nhận về]


6. Thuật ngữ Nghiệp vụ
=======================

.. Hướng dẫn: Chỉ liệt kê thuật ngữ xuất hiện trong file này.
.. Đặc biệt quan trọng với nghiệp vụ tuyển sinh (nhiều thuật ngữ nội bộ).

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Thuật ngữ
     - Giải thích
   * - [Thuật ngữ]
     - [Giải thích ngắn gọn]
   * - [Thuật ngữ]
     - [...]


7. Lịch sử Thay đổi Nghiệp vụ
==============================

.. Hướng dẫn: Chỉ ghi thay đổi LỚN ảnh hưởng luồng hoặc business rule.
.. Cột Thời gian có thể để "(cần xác nhận)" với các thay đổi trước khi tổ chức tài liệu — bổ sung dần.

.. list-table::
   :header-rows: 1
   :widths: 20 55 25

   * - Thời gian
     - Thay đổi
     - Tham chiếu
   * - (cần xác nhận)
     - Khởi tạo module
     - -
   * - [Quý/Năm]
     - [Mô tả thay đổi nghiệp vụ]
     - [YCNV nào / dự án nào]