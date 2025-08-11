Cấu hình Sphinx
===============

Cài đặt nhanh
-------------
Tạo ``requirements.txt``:

.. code-block:: text

   sphinx>=7
   furo>=2024.8.6
   # Bật Markdown nếu cần:
   # myst-parser>=3

Cài đặt:

.. code-block:: bash

   pip install -r requirements.txt

Cấu trúc thư mục mẫu
--------------------
Đặt ``conf.py`` ở thư mục *source root* (thư mục bạn sẽ build):

.. code-block:: text

   docs/
   ├─ conf.py
   ├─ index.rst
   ├─ getting_started.rst
   ├─ API/
   │  └─ getting_started_with_API.rst
   ├─ _static/
   └─ requirements.txt

- **Quan trọng**: Các file được tham chiếu trong ``toctree`` phải nằm *bên trong* thư mục chứa ``conf.py`` (hoặc thư mục con của nó).

Cấu hình cơ bản trong ``conf.py``
---------------------------------
Ví dụ tối ưu, đơn giản và đủ dùng:

.. code-block:: python

   # -- Project information -----------------------------------------------------
   project = "Tên dự án của bạn"
   author = "Tên tác giả"
   release = "1.0.0"
   language = "vi"            # en, vi, ...

   # -- General configuration ---------------------------------------------------
   extensions = [
       "sphinx.ext.autodoc",
       "sphinx.ext.napoleon",   # Google/NumPy docstrings
       "sphinx.ext.viewcode",
       "sphinx.ext.todo",
       # "myst_parser",         # Bật nếu dùng Markdown (.md)
   ]

   templates_path = ["_templates"]
   exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]

   # Nâng độ nghiêm ngặt khi build (bật khi CI/CD)
   nitpicky = False           # True: cảnh báo thiếu tham chiếu thành lỗi
   todo_include_todos = True  # hiện TODO trong tài liệu

   # -- Options for HTML output -------------------------------------------------
   html_theme = "furo"        # theme nhẹ, đẹp, không cần cấu hình nhiều
   html_static_path = ["_static"]
   html_title = project
   html_baseurl = ""          # (optional) để trống nếu dùng GitHub Pages

   # Nếu dùng Markdown (MyST)
   # myst_enable_extensions = [
   #     "deflist", "fieldlist", "attrs_block", "attrs_inline",
   #     "linkify", "substitution"
   # ]

   # Đường dẫn module nếu dùng autodoc (tuỳ dự án)
   # import os, sys
   # sys.path.insert(0, os.path.abspath("../src"))

Ghi chú về Theme
----------------
- ``furo``: mặc định đẹp, dark/light mode, hầu như không cần tinh chỉnh.
- Thay theme: đổi ``html_theme`` sang ``sphinx_rtd_theme`` (cần cài thêm gói).

Quốc tế hóa (i18n)
------------------
- Đặt ``language = "vi"`` trong ``conf.py``.
- Dịch chuỗi template Sphinx (search box, next/prev) sẽ tự áp dụng.

Viết mục lục với ``toctree``
----------------------------
Ví dụ ``index.rst``:

.. code-block:: rst

   Tên dự án của bạn
   =================

   Chào mừng đến với tài liệu *Sphinx*! Đây là trang chủ.

   .. toctree::
      :maxdepth: 2
      :caption: Nội dung

      getting_started
      API/getting_started_with_API

- Dòng trống **sau** ``.. toctree::`` là bắt buộc.
- Không thêm ``.rst`` ở cuối tên.
- Nếu dùng thư mục con, ghi ``Folder/File`` (không dấu cách).

Tự động quét tệp với ``:glob:``
-------------------------------
Áp dụng khi có nhiều file và bạn không muốn liệt kê tay:

.. code-block:: rst

   .. toctree::
      :maxdepth: 2
      :caption: Nội dung
      :glob:

      getting_*
      API/*

Static assets (ảnh, CSS, JS)
----------------------------
- Đặt file tĩnh vào ``_static/``.
- Tham chiếu ảnh trong ``.rst``:

  .. code-block:: rst

     .. image:: _static/diagram.png
        :alt: Sơ đồ hệ thống
        :align: center
        :width: 600

- Tuỳ biến CSS (optional): tạo ``_static/custom.css`` và thêm:

  .. code-block:: python

     html_css_files = ["custom.css"]

Build local
-----------
Trong thư mục chứa ``conf.py``:

.. code-block:: bash

   sphinx-build -b html . _build/html
   # Mở _build/html/index.html trong trình duyệt

Hoặc dùng Make (nếu có):

.. code-block:: bash

   make html          # Linux/Mac
   .\make.bat html    # Windows

Triển khai GitHub Pages (với GitHub Actions)
--------------------------------------------
1) **Settings → Pages → Source = GitHub Actions**  
2) Tạo ``.github/workflows/gh-pages.yml``:

.. code-block:: yaml

   name: Build & Deploy Sphinx to GitHub Pages
   on:
     push:
       branches: ["main"]
     workflow_dispatch:
   permissions:
     contents: read
     pages: write
     id-token: write
   concurrency:
     group: "pages"
     cancel-in-progress: true
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-python@v5
           with:
             python-version: "3.x"
         - name: Install deps
           run: |
             python -m pip install --upgrade pip
             pip install -r requirements.txt
         - name: Build Sphinx
           run: |
             sphinx-build -b html . _build/html
             touch _build/html/.nojekyll
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: _build/html
     deploy:
       runs-on: ubuntu-latest
       needs: build
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - id: deployment
           uses: actions/deploy-pages@v4

**Lưu ý**: Workflow *phải* nằm trong ``.github/workflows/`` (có dấu chấm).

Debug lỗi thường gặp
--------------------
- ``toctree contains reference to nonexisting document``  
  → Tên file/đường dẫn sai, hoặc file nằm ngoài source dir chứa ``conf.py``.
- ``html_static_path entry '_static' does not exist``  
  → Tạo thư mục ``_static/`` hoặc bỏ dòng ``html_static_path``.
- Pages hiển thị “trắng”:  
  - Đảm bảo Pages dùng **GitHub Actions**, không phải Jekyll/branch.  
  - Chỉ giữ **1** workflow deploy Sphinx.  
  - Trong log build phải có ``_build/html/index.html`` được upload artifact.  
  - Refresh hard (Ctrl+F5) hoặc xem **Environments → github-pages → View deployment**.
- Windows build OK, Pages lỗi link:  
  → Tên file phân biệt HOA/thường trên Linux. Đồng bộ chính xác chữ hoa/thường.

Mẹo nâng cao
------------
- Bật **Markdown** (MyST): cài ``myst-parser`` và thêm ``"myst_parser"`` vào ``extensions``.
- Bật **nitpicky = True** trong CI để không bỏ sót tham chiếu.
- Tách tài liệu theo module: tạo ``<Module>/index.rst`` với toctree con, rồi include vào toctree gốc.

Kết luận
--------
- Giữ tất cả nguồn (``.rst/.md``) **bên trong** thư mục có ``conf.py``.  
- Quản lý mục lục bằng ``toctree`` (đúng tên, đúng đường dẫn, có dòng trống).  
- Dùng GitHub Actions để build & deploy tự động từ ``_build/html``.
