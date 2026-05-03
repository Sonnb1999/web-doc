:html_theme.sidebar_secondary.hidden: true

.. raw:: html

   <div class="hero-section">
     <div class="hero-content">
       <div class="hero-badge">📚 Technical Documentation</div>
       <h1 class="hero-title">Tài liệu kỹ thuật hệ thống</h1>
       <p class="hero-subtitle">
         Tài liệu module đầy đủ cho <strong>Core Systems</strong>,
         <strong>Partner &amp; Customer Interaction</strong>,
         <strong>Marketing</strong> và <strong>E-Teaching / E-Commerce</strong>.
       </p>
     </div>
   </div>

.. raw:: html

   <div class="section-title">Danh mục tài liệu</div>

.. grid:: 2 2 2 4
   :gutter: 3
   :padding: 0

   .. grid-item-card::
      :link: root/architect/index
      :link-type: doc
      :class-card: custom-card custom-card--purple

      .. raw:: html

         <div class="card-icon">🏗️</div>

      **Architect**
      ^^^
      Kiến trúc tổng thể hệ thống, sơ đồ thành phần và các quyết định thiết kế kỹ thuật.

   .. grid-item-card::
      :link: root/business/index
      :link-type: doc
      :class-card: custom-card custom-card--teal

      .. raw:: html

         <div class="card-icon">💼</div>

      **Business**
      ^^^
      Nghiệp vụ chung của công ty, quy tắc kinh doanh và các domain chức năng.

   .. grid-item-card::
      :link: root/process/index
      :link-type: doc
      :class-card: custom-card custom-card--orange

      .. raw:: html

         <div class="card-icon">🔄</div>

      **Process**
      ^^^
      Quy trình vận hành, workflow và các standard operating procedures.

   .. grid-item-card::
      :link: root/system/index
      :link-type: doc
      :class-card: custom-card custom-card--blue

      .. raw:: html

         <div class="card-icon">⚙️</div>

      **System**
      ^^^
      Tài liệu hệ thống đầy đủ bao gồm cả Business spec và Technical spec.

.. raw:: html

   <div class="section-title">Các hệ thống</div>

.. grid:: 2 2 4 4
   :gutter: 2
   :padding: 0

   .. grid-item-card::
      :link: cs/index
      :link-type: doc
      :class-card: custom-card-sm

      .. raw:: html

         <span class="sys-tag sys-tag--core">CORE</span>

      **Core Systems**

   .. grid-item-card::
      :link: pcis/index
      :link-type: doc
      :class-card: custom-card-sm

      .. raw:: html

         <span class="sys-tag sys-tag--partner">PARTNER</span>

      **Partner & Customer**

   .. grid-item-card::
      :link: mkt/index
      :link-type: doc
      :class-card: custom-card-sm

      .. raw:: html

         <span class="sys-tag sys-tag--mkt">MKT</span>

      **Marketing Systems**

   .. grid-item-card::
      :link: e2e/index
      :link-type: doc
      :class-card: custom-card-sm

      .. raw:: html

         <span class="sys-tag sys-tag--e2e">E2E</span>

      **E-Teaching & E-Commerce**

.. toctree::
   :hidden:
   :maxdepth: 2
   :caption: Các hệ thống:

   cs/index
   pcis/index
   mkt/index
   e2e/index