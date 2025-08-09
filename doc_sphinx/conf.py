# -- Project information -----------------------------------------------------
project = "Tên dự án của bạn"
author = "Tên tác giả"
copyright = "2025, " + author
release = "1.0.0"

# -- General configuration ---------------------------------------------------
extensions = [
    "sphinx.ext.autodoc",
    "sphinx.ext.napoleon",     # Google/NumPy docstrings
    "sphinx.ext.viewcode",
    "sphinx.ext.todo",
    # "myst_parser",           # Bật nếu dùng Markdown (xem mẹo ở cuối)
]
templates_path = ["_templates"]
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]

# Ngôn ngữ (vi, en,...)
language = "vi"

# -- Options for HTML output -------------------------------------------------
html_theme = "furo"  # theme đẹp, không cần cấu hình nhiều
html_static_path = ["_static"]
html_title = project
html_baseurl = ""  # có thể để trống; Pages sẽ tự lo

# Todo extension
todo_include_todos = True

# Build cảnh báo nghiêm khắc (optional)
nitpicky = False

# Nếu dùng Markdown (myst_parser), mở comment và cấu hình:
# myst_enable_extensions = [
#     "deflist", "fieldlist", "attrs_block", "attrs_inline",
#     "linkify", "substitution"
# ]
