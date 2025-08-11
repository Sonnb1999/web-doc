Định dạng API chung
===================

Thông tin URL
-------------

- Ví dụ: ``POST domain/v1/api/category/status``  
- **Headers**: ``Content-Type: application/json`` + ``Authorization: Bearer <token>`` *hoặc* ``api-key: <key>``

Request mẫu
-----------

.. code-block:: json

   {
     "name": true,
     "th_type": true,
     "th_description": true,
     "th_status_detail_ids": true
   }

Response – Success
------------------

.. code-block:: json

   {
     "status": "success",
     "message": "Tạo dữ liệu thành công.",
     "data": { "id": 123 }
   }

Response – Error
----------------

.. code-block:: json

   {
     "status": "error",
     "message": "Đã có lỗi xảy ra vui lòng thử lại sau. {Thông tin lỗi}",
     "code": 400
   }
