# -- Project information -----------------------------------------------------
project = "Tài liệu kỹ thuật"
author = "AUM Deverloper"
copyright = "2025, " + author
release = "1.0.0"

# Ngôn ngữ
language = "vi"

# # -- Options for HTML output -------------------------------------------------
# html_theme = "piccolo_theme"
# html_static_path = ["_static"]
# html_title = project
# html_baseurl = ""

# # Todo extension
# todo_include_todos = True

extensions = ["sphinx_design"]
html_theme = "piccolo_theme"
html_static_path = ["_static"]
html_css_files = ["custom.css"]

html_theme_options = {
    "globaltoc_maxdepth": 3,
    "globaltoc_collapse": True,
    "show_theme_credit": False,
    "banner_text": False,
}
sidebars = {"**": ["globaltoc.html"]}
html_title = "Tài liệu TT - ITC"

# Build cảnh báo nghiêm khắc (optional)
nitpicky = False