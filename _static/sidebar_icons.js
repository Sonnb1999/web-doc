document.addEventListener("DOMContentLoaded", function () {

  /* ── Icon SVG map — key phải khớp chính xác với :caption: trong index.rst ── */
  const iconMap = {
    "Kiến trúc & Nghiệp vụ": `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 21h18M5 21V10l7-7 7 7v11" stroke="#714B67" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="9" y="14" width="6" height="7" rx="1" fill="#714B67" opacity=".4"/>
      </svg>`,

    "Core Systems": `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="8" height="8" rx="1.5" fill="#714B67"/>
        <rect x="13" y="3" width="8" height="8" rx="1.5" fill="#714B67" opacity=".5"/>
        <rect x="3" y="13" width="8" height="8" rx="1.5" fill="#714B67" opacity=".5"/>
        <rect x="13" y="13" width="8" height="8" rx="1.5" fill="#714B67" opacity=".3"/>
      </svg>`,

    "Partner & Customer": `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="7" r="4" fill="#714B67"/>
        <circle cx="17" cy="9" r="3" fill="#714B67" opacity=".5"/>
        <path d="M2 20c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="#714B67" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M16 14.5c2.5.5 5 2 5 5.5" stroke="#714B67" stroke-width="1.8" stroke-linecap="round" opacity=".5"/>
      </svg>`,

    "Marketing Systems": `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12h3M5.5 6.5l2 2M5.5 17.5l2-2" stroke="#714B67" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M8 8v8l11 3V5L8 8z" fill="#714B67" opacity=".5"/>
        <circle cx="19" cy="19" r="3" fill="#714B67" opacity=".3"/>
      </svg>`,

    "E-Teaching & E-Commerce": `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="20" height="13" rx="2" fill="#714B67" opacity=".2"/>
        <rect x="2" y="4" width="20" height="13" rx="2" stroke="#714B67" stroke-width="1.5"/>
        <path d="M10 8.5l5 3-5 3v-6z" fill="#714B67"/>
        <path d="M8 20h8" stroke="#714B67" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
  };

  /* ── Inject icon vào caption ── */
  document.querySelectorAll(".sphinxsidebarwrapper p.caption .caption-text").forEach(function (el) {
    const text = el.textContent.trim();
    const svg  = iconMap[text];
    if (svg) {
      el.innerHTML =
        '<span class="sb-cap-icon">' + svg + '</span>' +
        '<span class="sb-cap-text">' + text + '</span>';
    }
  });

  /* ── Override sidebar toggle — co dãn nội dung khi ẩn/hiện ── */
  setTimeout(function () {
    const toggleBtn = document.querySelector('#toggle_sidebar a');
    if (toggleBtn) {
      toggleBtn.onclick = function (event) {
        event.preventDefault();
        document.querySelector('.sphinxsidebar').style.display = '';
        document.body.classList.toggle('sidebar-collapsed');
      };
    }
  }, 0);

  /* ── Thêm chevron + expand/collapse cho item có submenu ── */
  document.querySelectorAll(".sphinxsidebarwrapper li").forEach(function (li) {
    const ul = li.querySelector(":scope > ul");
    const link = li.querySelector(":scope > a");
    if (!ul || !link) return;

    /* Thêm chevron */
    const chevron = document.createElement("span");
    chevron.className = "sb-chevron";
    chevron.innerHTML =
      '<svg viewBox="0 0 10 10" width="10" height="10" fill="none">' +
      '<path d="M3 2l4 3-4 3" stroke="currentColor" stroke-width="1.5" ' +
      'stroke-linecap="round" stroke-linejoin="round"/></svg>';
    link.prepend(chevron);

    /* Thu gọn những item không active */
    if (!li.classList.contains("current")) {
      ul.style.display = "none";
      li.classList.add("sb-collapsed");
    }

    /* Click chevron: toggle mở/đóng, không điều hướng */
    chevron.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var isCollapsed = li.classList.toggle("sb-collapsed");
      ul.style.display = isCollapsed ? "none" : "block";
      chevron.style.transform = isCollapsed ? "" : "rotate(90deg)";
    });
  });

  /* ── Ẩn RST title (h1) khi trang đã có hero section ── */
  if (document.querySelector(".odoo-hero")) {
    var h1 = document.querySelector(".bodywrapper h1, div.body h1");
    if (h1) h1.style.display = "none";
  }

});