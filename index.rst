.. Tài liệu Sphinx demo

Dự án TTIT AUM document

=================

Chào mừng đến với tài liệu AUM!

Nội dung
--------

.. toctree::
   :maxdepth: 3
   :caption: Nội dung

   getting_started
   huong_dan
   build_doc_sphinx/build_sphinx
   API/getting_started_with_API

Bắt đầu nhanh
-------------

1. Cài đặt phụ thuộc trong ``requirements.txt``.
2. Build local: ``sphinx-build -b html . _build/html``.
3. Deploy lên GitHub Pages bằng workflow.

Ghi chú
-------

- Tích hợp theme `furo` để có giao diện đẹp.
