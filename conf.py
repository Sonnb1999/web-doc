# -- Project information -----------------------------------------------------
project = "Tài liệu kỹ thuật"
author = "AUM Deverloper"
copyright = "2025, " + author
release = "1.0.0"

# Ngôn ngữ
language = "vi"

extensions = ["sphinx_design", "sphinxcontrib.mermaid"]
html_theme = "piccolo_theme"
html_static_path = ["_static"]
html_css_files = ["custom.css", "process_cusstom.css", "process_page.css"]
html_js_files  = ["sidebar_icons.js"]

html_theme_options = {
    "globaltoc_maxdepth": 3,
    "globaltoc_collapse": True,
    "show_theme_credit": False,
    "banner_text": False,
}
html_title = "Tài liệu trung tâm CNTT"

# Hiển thị global TOC ở sidebar trên mọi trang
html_sidebars = {
    "**": ["globaltoc.html"],
}

# Build cảnh báo nghiêm khắc (optional)
nitpicky = False

exclude_patterns = [
    ".claude",
]