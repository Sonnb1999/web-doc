QT02 — Helpdesk: Tiếp nhận Yêu cầu
==================================

Số hiệu: 01/2026/QT-TTCNTT | Phiên bản: V3.0

.. mermaid::

   flowchart TD
     L1[L1: Tiếp nhận] --> L2[L2: Phân loại & Sizing]
     L2 --> L3{L3: Định tuyến}
     L3 -->|Size S| QT04[→ QT04 DEV]
     L3 -->|Size M/L| L4[L4: Thông báo sơ bộ]
     L4 --> L5[L5: Go-live deadline]
     L5 --> L7[L7: Cập nhật trạng thái]
     L7 --> L8[L8: Verify & Hoàn thành]

.. grid:: 4

   .. grid-item-card:: L1 · Tiếp nhận
      :link: L1-tiep-nhan
      Owner: Odoo (auto)

   .. grid-item-card:: L2 · Phân loại
      :link: L2-phan-loai
      Owner: BA

.. toctree::
   :maxdepth: 1
