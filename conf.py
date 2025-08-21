# -- Project information -----------------------------------------------------
project = "Tài liệu kỹ thuật"
author = "AUM Deverloper"
copyright = "2025, " + author
release = "1.0.0"

# -- General configuration ---------------------------------------------------
extensions = [
    "sphinx.ext.autodoc",
    "sphinx.ext.napoleon",     # Google/NumPy docstrings
    "sphinx.ext.viewcode",
    "sphinx.ext.todo",
    "sphinx_design",
]
templates_path = ["_templates"]
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]

# Ngôn ngữ
language = "vi"

# -- Options for HTML output -------------------------------------------------
html_theme = "piccolo_theme"
html_static_path = ["_static"]
html_title = project
html_baseurl = ""

# Todo extension
todo_include_todos = True

# Build cảnh báo nghiêm khắc (optional)
nitpicky = False
