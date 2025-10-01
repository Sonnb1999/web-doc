Endpoints
---------

A. APM
~~~~~~

.. list-table:: Bảng endpoints APM
   :widths: 5 10 25 20 40
   :header-rows: 1

   * - STT
     - Phương thức
     - URL
     - Hàm
     - Chức năng
   * - 1
     - POST
     - /api/apmleads/{id_b2b}
     - create_apm_lead
     - Đồng bộ tạo cơ hội APM từ Sambala sang B2B
   * - 2
     - DELETE
     - /api/apmleads/{id_b2b}
     - delete_apm_lead
     - Đồng bộ xóa cơ hội APM từ Sambala sang B2B
   * - 3
     - POST
     - /api/thapmtrait/{id_b2b}
     - create_apm_trait
     - Đồng bộ tạo đặc điểm APM từ Sambala sang B2B


B. CRM
~~~~~~

.. raw:: html

   <style>
      table {
         width: 100%;
         border-collapse: collapse;
      }
      th, td {
         padding: 4px;
         border: 1px solid #ddd;
      }
      th {
         text-align: left;
      }
      td {
         text-align: left;
      }
   </style>

   <table>
      <thead>
         <tr>
            <th style="width: 5%; text-align: center;">STT</th>
            <th style="width: 10%;">Phương thức</th>
            <th style="width: 25%;">URL</th>
            <th style="width: 20%;">Hàm</th>
            <th style="width: 40%;">Chức năng</th>
         </tr>
      </thead>
      <tbody>
         <tr>
            <td style="text-align: center;">1</td>
            <td>POST</td>
            <td>/api/crmlead/{id_b2b}</td>
            <td>call_crm_lead, update_data_crm</td>
            <td>Đồng bộ tạo cơ hội CRM từ Sambala sang B2B</td>
         </tr>
         <tr>
            <td style="text-align: center;">2</td>
            <td>DELETE</td>
            <td>/api/crmlead/{id_b2b}</td>
            <td>delete_crm_lead</td>
            <td>Đồng bộ xóa cơ hội CRM từ Sambala sang B2B</td>
         </tr>
         <tr>
            <td style="text-align: center;">3</td>
            <td>POST</td>
            <td>/api/updatecrm</td>
            <td>sync_crm, update_data_crm</td>
            <td>Đồng bộ thông tin cơ hội CRM từ Sambala sang B2B</td>
         </tr>
         <tr>
            <td style="text-align: center;">4</td>
            <td>POST</td>
            <td>/api/mailmessages/{id_b2b}</td>
            <td>create_mail_messages, create_mail_message</td>
            <td>Đồng bộ tạo log note từ Sambala sang B2B</td>
         </tr>
         <tr>
            <td style="text-align: center;">5</td>
            <td>DELETE</td>
            <td>/api/mailmessage/{id}</td>
            <td>delete_mail_message</td>
            <td>Đồng bộ xóa log note từ Sambala sang B2B</td>
         </tr>
         <tr>
            <td style="text-align: center;">6</td>
            <td>POST</td>
            <td>/api/carehistory/{id_crm_b2b}</td>
            <td>create_th_care_history</td>
            <td>Đồng bộ tạo lịch sử chăm sóc từ Sambala sang B2B</td>
         </tr>
         <tr>
            <td style="text-align: center;">7</td>
            <td>POST</td>
            <td>/api/duplicateleadnotify/</td>
            <td>create_duplicate_lead_notify</td>
            <td>Đồng bộ tạo thông báo cơ hội trùng từ Sambala sang B2B</td>
         </tr>
         <tr>
            <td style="text-align: center;">8</td>
            <td>POST</td>
            <td>/api/mappingidcrmstage/</td>
            <td>mapping_id_crm_stage</td>
            <td>Đồng bộ tạo bản ghi bảng Map ID từ Sambala sang B2B</td>
         </tr>
         <tr>
            <td style="text-align: center;">9</td>
            <td>POST</td>
            <td>/api/contact/{id_b2b}</td>
            <td>call_contact, update_contact</td>
            <td>Đồng bộ thông tin liên hệ từ Sambala sang B2B</td>
         </tr>
      </tbody>
   </table>

C. SRM
~~~~~~

.. list-table:: Bảng endpoints CRM
   :widths: 5 10 25 20 40
   :header-rows: 1

   * - STT
     - Phương thức
     - URL
     - Hàm
     - Chức năng
   * - 1
     - GET
     - /{item_id}
     - get_partners
     - Lấy thông tin sinh viên từ B2C
