Build & Deploy Sphinx với GitHub Actions
========================================

Mục tiêu
--------
Hướng dẫn các bước sử dụng GitHub Actions để build và deploy tài liệu Sphinx lên GitHub Pages.

Bước 1: Chuẩn bị repo
---------------------
- Repo chứa:
  
  - ``conf.py``
  - ``index.rst`` và các file ``.rst`` khác
  - ``requirements.txt`` (ví dụ):

    .. code-block:: text

       sphinx>=7
       furo>=2024.8.6
       # myst-parser>=3    # nếu dùng Markdown

Bước 2: Tạo workflow Sphinx
---------------------------
Tạo file **``.github/workflows/gh-pages.yml``**.

**Trường hợp A — Tài liệu ở thư mục gốc repo** (``conf.py`` ở root):

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

**Trường hợp B — Tài liệu ở thư mục con** (ví dụ ``doc_sphinx/``):

.. code-block:: yaml

   name: Build & Deploy Sphinx (subdir) to GitHub Pages
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
             pip install -r doc_sphinx/requirements.txt
         - name: Build Sphinx (doc_sphinx)
           working-directory: doc_sphinx
           run: |
             sphinx-build -b html . _build/html
             touch _build/html/.nojekyll
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: doc_sphinx/_build/html

     deploy:
       runs-on: ubuntu-latest
       needs: build
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - id: deployment
           uses: actions/deploy-pages@v4

Bước 3: Bật Pages dùng Actions
------------------------------
- Vào **Settings → Pages → Source = GitHub Actions**.

Bước 4: Commit & Push
---------------------
- Commit file workflow và push lên nhánh ``main``.
- Vào tab **Actions** → chờ job ``deploy`` xanh.
- Mở **Environments → github-pages → View deployment** để xem site.

Ghi chú quan trọng
------------------
- Chỉ để 1 workflow deploy Sphinx trong ``.github/workflows/``. Xoá workflow Jekyll cũ nếu có.
- Artifact phải chứa ``index.html`` và có file ``.nojekyll`` để tránh bị GitHub xử lý bằng Jekyll.
- Nếu site vẫn hiển thị bản cũ: ấn **Ctrl+F5** hoặc mở tab ẩn danh.
