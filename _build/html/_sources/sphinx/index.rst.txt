Sphinx document
===============

Mục tiêu
--------
Tài liệu này hướng dẫn cách:
- Cài đặt Sphinx và theme
- Tổ chức thư mục dự án
- Cấu hình ``conf.py`` (extensions, theme, i18n, đường dẫn, build strict)
- Viết mục lục với ``toctree``
- Quản lý static assets
- Build local và deploy GitHub Pages

Yêu cầu
-------
- Python 3.8+
- ``pip`` mới
- Quyền ghi vào thư mục dự án

Chú ý
-----
- Nếu file của bạn ko chạy hãy xoá tất cả dữ liệu trong file ``_build/html`` rồi chạy lại
- Lệnh build: ``sphinx-build -b html . _build/html``
- Lệnh chạy: ``start _build/html/index.html``


Nội dung
--------

.. toctree::
   :maxdepth: 1

   build_sphinx
   build_github_actions
