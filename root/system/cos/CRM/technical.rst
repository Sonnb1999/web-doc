.. ============================================================
.. TEMPLATE: technical.rst — Tài liệu Kỹ thuật Hệ thống
.. Phiên bản: v0.2 | 25/03/2026
.. Người viết: Dev sở hữu module
.. Người đọc: BA, DEV (đặc biệt dev mới), QA, PM (cần hiểu kỹ thuật để quản lý dự án hiệu quả)
.. Nguyên tắc: Mô tả "hệ thống được xây dựng thế nào"
.. ============================================================

=======================
ABS CRM — Kỹ thuật
=======================

.. meta::
   :module: th_crm
   :cluster: CS > ERP (Sambala)
   :owner: Bùi Trung Kiên
   :updated: 13/04/2026


1. Thông tin Module
===================

.. list-table::
   :widths: 30 70

   * - Tên kỹ thuật
     - ``th_crm``
   * - Module Odoo gốc kế thừa
     - ``base, crm, sales_team, sale_crm, account, data_merge``
   * - Module nội bộ phụ thuộc
     - ``th_setup_parameters, th_select_module, th_queue_job``
   * - Repository
     - `https://github.com/aumcntt/sambala/tree/master/th_crm`
   * - Cụm hệ sinh thái
     - CS > ERP (Sambala)


2. Data Model
=============

.. Hướng dẫn: Liệt kê field nếu thỏa mãn ít nhất 1 tiêu chí:
..   - Field điều kiện (quyết định luồng xử lý if/else)
..   - Field trạng thái/giai đoạn: state, stage_id, kanban_state
..   - Field trigger computed field quan trọng khác (@depends)
..   - Field liên kết sang module khác (Many2one, One2many quan trọng)
..   - Field đồng bộ qua API
..   - Tất cả field th_* có nghĩa nghiệp vụ rõ ràng
..   - Field gốc Odoo bị override hoặc dùng khác chuẩn
.. KHÔNG liệt kê: field gốc dùng đúng mặc định, field UI thuần, field tạm wizard.


2.1. crm.lead (cơ hội) — *kế thừa từ module gốc crm*
-------------------------------------------------------------------------

**Mục đích:** Bản ghi trung tâm của module CRM, dùng để quản lý toàn bộ vòng đời một cơ hội: chăm sóc từ khách hàng tiềm năng cho đến khi họ trở thành sinh viên.

**Field quan trọng:**

.. list-table::
   :header-rows: 1
   :widths: 30 20 50

   * - Field
     - Kiểu
     - Mô tả
   * - ``name_id_sequence``
     - Char
     - Mã cơ hội dùng để tra cứu, đối soát và xử lý import xét tuyển.
   * - ``email_from``
     - Char
     - Email chính của cơ hội; được khóa sửa trực tiếp trên lead.
   * - ``phone``
     - Char
     - Số điện thoại chính của cơ hội; là dữ liệu quan trọng cho check trùng và đối soát.
   * - ``name``
     - Char
     - Tên hiển thị của cơ hội; mặc định là ``MỚI`` khi tạo mới.
   * - ``partner_id``
     - Many2one → ``res.partner``
     - Sinh viên/khách hàng gắn với cơ hội; là liên kết dữ liệu trung tâm giữa CRM và liên hệ.
   * - ``street``
     - Char
     - Địa chỉ hiện tại, lấy theo dữ liệu partner.
   * - ``street2``
     - Char
     - Địa chỉ bổ sung, đồng bộ từ partner.
   * - ``zip``
     - Char
     - Mã bưu chính, đồng bộ từ partner.
   * - ``city``
     - Char
     - Thành phố/quận huyện dạng text, đồng bộ từ partner.
   * - ``state_id``
     - Many2one → ``res.country.state``
     - Tỉnh/thành thường trú hiện tại.
   * - ``country_id``
     - Many2one → ``res.country``
     - Quốc gia hiện tại.
   * - ``title``
     - Many2one
     - Danh xưng, đồng bộ từ partner.
   * - ``function``
     - Char
     - Nghề nghiệp/chức danh, đồng bộ từ partner.
   * - ``stage_id``
     - Many2one → ``crm.stage``
     - Mối quan hệ hiện tại của cơ hội; là trạng thái nghiệp vụ chính của CRM.
   * - ``th_is_stage_won``
     - Boolean
     - Đánh dấu stage hiện tại là stage thắng.
   * - ``user_id``
     - Many2one → ``res.users``
     - Người chăm sóc cơ hội.
   * - ``team_id``
     - Many2one → ``crm.team``
     - Đội tư vấn phụ trách cơ hội.
   * - ``tag_ids``
     - Many2many → ``crm.tag``
     - Nhóm cơ hội dùng để phân loại.
   * - ``th_description``
     - Text
     - Mô tả nghiệp vụ/bối cảnh của cơ hội.
   * - ``th_last_check``
     - Datetime
     - Thời điểm liên hệ cuối; là mốc quan trọng cho check trùng và đưa về kho.
   * - ``th_customer_code``
     - Char
     - Mã khách hàng lấy từ partner.
   * - ``th_gender``
     - Selection
     - Giới tính, đồng bộ từ partner.
   * - ``th_birthday``
     - Date
     - Ngày sinh, đồng bộ từ partner.
   * - ``th_place_of_birth_id``
     - Many2one → ``res.country.state``
     - Nơi sinh của khách hàng.
   * - ``th_ward_id``
     - Many2one → ``th.country.ward``
     - Phường/xã địa chỉ hiện tại.
   * - ``th_district_id``
     - Many2one → ``th.country.district``
     - Quận/huyện địa chỉ hiện tại.
   * - ``th_phone2``
     - Char
     - Số điện thoại phụ.
   * - ``th_ethnicity_id``
     - Many2one → ``th.ethnicity``
     - Dân tộc.
   * - ``th_religion_id``
     - Many2one → ``th.religion``
     - Tôn giáo.
   * - ``th_channel_id``
     - Many2one → ``th.info.channel``
     - Kênh tiếp cận cơ hội.
   * - ``th_source_name``
     - Char
     - Tên nguồn chi tiết.
   * - ``th_source_group_id``
     - Many2one → ``th.source.group``
     - Nhóm nguồn của cơ hội.
   * - ``th_admissions_station_id``
     - Many2one → ``th.admissions.station``
     - Trạm tuyển sinh.
   * - ``th_admissions_region_id``
     - Many2one → ``th.admissions.region``
     - Vùng tuyển sinh.
   * - ``th_registration_date``
     - Date
     - Ngày đăng ký của cơ hội.
   * - ``th_level_up_date``
     - Date
     - Ngày cơ hội lên level hiện tại.
   * - ``th_status_group_id``
     - Many2one → ``th.status.category``
     - Nhóm tình trạng của cơ hội theo level.
   * - ``th_status_detail_id``
     - Many2one → ``th.status.detail``
     - Trạng thái chi tiết của cơ hội.
   * - ``th_major_ids``
     - Many2many → ``th.major``
     - Danh sách ngành đăng ký(bỏ).
   * - ``th_major_id``
     - Many2one → ``th.major``
     - Ngành đăng ký hiện tại.
   * - ``th_graduation_system_id``
     - Many2one → ``th.graduation.system``
     - Hệ tốt nghiệp.
   * - ``th_partner_referred_id``
     - Many2one → ``res.partner``
     - Người giới thiệu.
   * - ``th_connector_referred_id``
     - Many2one → ``res.partner``
     - Người kết nối.
   * - ``th_affiliate_code``
     - Char
     - Mã tiếp thị liên kết lấy từ người giới thiệu.
   * - ``th_reuse_source``
     - Char
     - Thông tin tái sử dụng từ phía CSKH.
   * - ``th_reuse``
     - Char
     - Thông tin tái sử dụng từ phía TVTS.
   * - ``th_storage``
     - Boolean
     - Đánh dấu cơ hội đang ở kho lưu trữ.
   * - ``th_uuid_mail_channel``
     - Char
     - UUID kênh mail phục vụ liên kết kỹ thuật.
   * - ``th_ownership_id``
     - Many2one → ``th.ownership.unit``
     - Đơn vị sở hữu cơ hội.
   * - ``th_origin_id``
     - Many2one → ``th.origin``
     - Trường học gắn với cơ hội; là field cốt lõi cho phân quyền, check trùng.
   * - ``th_count_invoice``
     - Integer
     - Số hóa đơn liên quan đến cơ hội.
   * - ``th_invoice_status``
     - Boolean
     - Cờ kỹ thuật thể hiện trạng thái tất cả hóa đơn thanh toán hay chưa.
   * - ``th_tuition_handed``
     - Selection
     - Lưu trạng thái thanh toán học phí: đủ hoặc một phần, là một trong số các điều kiện để nhảy level tự động.
   * - ``th_fees``
     - Boolean
     - Đánh dấu đã thanh toán lệ phí, là một trong số các điều kiện để nhảy level tự động.
   * - ``th_admission_decision``
     - Boolean
     - Đánh dấu đã trúng tuyển, là một trong số các điều kiện để nhảy level tự động.
   * - ``th_decision_id``
     - Many2one → ``th.admission.decision``
     - Quyết định trúng tuyển gắn với cơ hội.
   * - ``th_street``
     - Char
     - Địa chỉ hộ khẩu thường trú, compute từ partner.
   * - ``th_ward_permanent_id``
     - Many2one → ``th.country.ward``
     - Phường/xã hộ khẩu, compute từ partner.
   * - ``th_district_permanent_id``
     - Many2one → ``th.country.district``
     - Quận/huyện hộ khẩu, compute từ partner.
   * - ``th_state_id``
     - Many2one → ``res.country.state``
     - Tỉnh/thành hộ khẩu, compute từ partner.
   * - ``th_country_id``
     - Many2one → ``res.country``
     - Quốc gia hộ khẩu, compute từ partner.
   * - ``th_student_code``
     - Char
     - Mã sinh viên sau khi chuyển đổi nghiệp vụ.
   * - ``th_result``
     - Selection
     - Kết quả xử lý trùng: giữ hoặc chuyển.
   * - ``th_is_a_duplicate_opportunity``
     - Boolean
     - Đánh dấu cơ hội là cơ hội trùng.
   * - ``th_admission_list_id``
     - Many2one → ``th.admission.list``
     - Danh sách xét tuyển gắn với cơ hội.
   * - ``th_enrollment_list``
     - Boolean
     - Đánh dấu đã vào danh sách khai giảng, là một trong số các điều kiện để nhảy level tự động.
   * - ``th_enrollment_list_id``
     - Many2one → ``th.enrollment.list``
     - Danh sách khai giảng gắn với cơ hội.
   * - ``th_crm_code``
     - Char
     - Mã CRM nội bộ.
   * - ``th_check_admission``
     - Boolean
     - Đánh dấu cơ hội đang chờ xét tuyển, là một trong số các điều kiện để nhảy level tự động.
   * - ``th_resolve_duplicate``
     - Boolean
     - Đánh dấu cơ hội đã được xử lý trùng.
   * - ``th_lead_aff_id``
     - Integer
     - ID cơ hội phía hệ thống affiliate.
   * - ``th_data_getfly``
     - Text
     - Dữ liệu đồng bộ/raw từ Getfly.
   * - ``th_crm_job``
     - Char
     - Nghề nghiệp của khách hàng.
   * - ``th_stage_auto``
     - Boolean
     - Cờ stage hiện tại là stage tự động hay không.
   * - ``th_withdraw_profile_id``
     - Integer
     - ID mối quan hệ trước khi tạo hồ sơ.
   * - ``th_opportunity_list_partner_crm_ids``
     - One2many → ``crm.lead.opportunity.list.partner``
     - Danh sách các cơ hội cùng khách hàng dùng để hiển thị/đối chiếu.
   * - ``th_is_refunded_tuition``
     - Boolean
     - Đánh dấu cơ hội đã hoàn học phí.
   * - ``th_is_refund_tuition``
     - Boolean
     - Đánh dấu cơ hội cần hoàn học phí.
   * - ``th_acceptance``
     - Char
     - Tên quyết đinh trúng tuyển.
   * - ``th_class``
     - Char
     - Khóa (khi có quyết định trúng tuyển).
   * - ``th_class_detail``
     - Char
     - Lớp chuyên ngành (khi có quyết định trúng tuyển).
   * - ``th_duplicate_processed_lead``
     - Boolean
     - Đánh dấu cơ hội đã qua bước xử lý trùng.
   * - ``th_duplicate_description``
     - Text
     - Mô tả kết quả kiểm tra trùng.
   * - ``th_duplicate_date``
     - Date
     - Ngày kiểm tra/xử lý trùng.
   * - ``th_duplicate_type``
     - Selection
     - Loại xử lý trùng: thủ công, tự động, cần xử lý, chưa có điều kiện.
   * - ``th_code_getfly``
     - Char
     - Mã khách hàng phía Getfly.
   * - ``th_check_crm_phone``
     - Char
     - Điện thoại CRM dùng để đối chiếu/check dữ liệu.
   * - ``th_check_crm_email``
     - Char
     - Email CRM dùng để đối chiếu/check dữ liệu.
   * - ``state``
     - Selection
     - Kiểu chăm sóc: đối tác tự chăm hoặc tư vấn chăm.
   * - ``th_crm_lead_b2b_id``
     - Integer
     - ID cơ hội tương ứng bên hệ thống B2B.
   * - ``th_import_phone``
     - Char
     - Giá trị điện thoại dùng để check trong quá trình import.
   * - ``th_import_email``
     - Char
     - Giá trị email dùng để check trong quá trình import.
   * - ``name_import``
     - Char
     - Tên import.
   * - ``th_utm_source``
     - Char
     - UTM source.
   * - ``th_utm_medium``
     - Char
     - UTM medium.
   * - ``th_utm_campaign``
     - Char
     - UTM campaign.
   * - ``th_utm_term``
     - Char
     - UTM term.
   * - ``th_utm_content``
     - Char
     - UTM content.
   * - ``th_dividing_ring_id``
     - Many2one → ``th.dividing.ring``
     - Vòng chia dùng để phân công danh sách cơ hội cho lần lượt các nhân viên trong vòng chia.
   * - ``th_create_lead_date_getfly``
     - Date
     - Ngày tạo cơ hội theo dữ liệu Getfly.
   * - ``th_level_up_date_getfly``
     - Date
     - Ngày dự kiến lên level theo dữ liệu Getfly.
   * - ``th_l5b_aof_date_getfly``
     - Date
     - Ngày lên L5B theo dữ liệu Getfly.
   * - ``th_reuse_ccs_getfly``
     - Char
     - Dữ liệu tái sử dụng từ Getfly.
   * - ``th_name_ccs_getfly``
     - Char
     - Tên CSKH theo Getfly.
   * - ``th_code_ccs_getfly``
     - Char
     - Mã nguồn CSKH theo Getfly.
   * - ``th_customer_code_gf``
     - Char
     - Mã khách hàng Getfly.
   * - ``th_old_partner_id``
     - Many2one → ``res.partner``
     - Lưu partner trước đó lại sau khi thay đổi sang partner mới.
   * - ``th_settlement_date``
     - Date
     - Ngày thanh toán/hạn thanh toán lấy từ hóa đơn của đơn hàng.
   * - ``th_training_system_id``
     - Many2one → ``th.training.system``
     - Hệ đào tạo.
   * - ``th_uuid_form``
     - Char
     - Mã form nhúng.
   * - ``th_form_name``
     - Char
     - Tên form nhúng tạo ra cơ hội.
   * - ``th_create_user_checked_id``
     - Many2one → ``res.users``
     - Người tạo khi check trùng thắng (không còn dùng).
   * - ``th_self_lead``
     - Boolean
     - Đánh dấu cơ hội tự chốt.
   * - ``th_is_close_lead``
     - Boolean
     - Đánh dấu cơ hội bị đóng.
   * - ``th_first_create_day``
     - Date
     - Lưu Ngày tạo của cơ hội cũ.
   * - ``th_dup_need_admin``
     - Boolean
     - Đánh dấu cơ hội bị đúp nhưng không vào ma trận, cần admin xử lý.
   * - ``th_customer_code_aum``
     - Char
     - Mã khách hàng nội bộ AUM, được gán là mã khách hàng của partner.
   * - ``th_can_be_lead``
     - Boolean
     - Là trạng thái đánh dấu cơ hội có nhu cầu.
   * - ``th_is_apply_lead``
     - Boolean
     - Đánh dấu cơ hội đã được admin duyệt tạo mới.
   * - ``th_date_lead_again``
     - Date
     - Ngày sau cùng vào hệ thống.
   * - ``th_confirm_self_lead``
     - Boolean
     - Đối soát cơ hội tự chốt.
   * - ``th_user_complaints``
     - Many2one → ``res.users``
     - Người khiếu nại trong quy trình xử lý trùng.
   * - ``th_student_profile_archived``
     - Boolean
     - Đánh dấu hồ sơ liên quan đã được lưu trữ.
   * - ``th_ccs_status_detail_id``
     - Many2one → ``th.status.detail``
     - Tình trạng gọi CSKH.
   * - ``th_ccs_customer_attitude_id``
     - Many2one → ``th.customer.attitude``
     - Phân loại thái độ khách hàng trong CSKH.
   * - ``th_ccs_reuse_origin_ids``
     - Many2many → ``th.origin``
     - Danh sách trường đã từng tái sử dụng.
   * - ``th_ccs_source_code_ccs``
     - Char
     - Mã nguồn CSKH.
   * - ``th_ccs_source_code_reused``
     - Char
     - Mã nguồn CSKH đã từng tái sử dụng.
   * - ``th_check_unlink_record``
     - Boolean
     - Đánh dấu cơ hội cần xóa khi tái kho.
   * - ``th_check_waiting_lead``
     - Boolean
     - Đánh dấu cơ hội đang ở hàng chờ xử lý.
   * - ``th_recheck_reason``
     - Many2one → ``th.recheck.reason``
     - Lý do xét lại.
   * - ``th_local``
     - Selection
     - Đối tượng khách hàng, lấy từ partner.
   * - ``th_admission_status``
     - Selection
     - Trạng thái xét tuyển: trượt, bảo lưu, xét lại.
   * - ``th_team_crm_user_ids``
     - Many2many → ``crm.team``
     - Các đội nhóm CRM liên quan.
   * - ``th_uuid``
     - Char
     - UUID kỹ thuật của cơ hội; dùng cho đồng bộ thông tin cơ hội sang B2B.
   * - ``th_is_invalid_phone``
     - Boolean
     - Đánh dấu số điện thoại không hợp lệ.
   * - ``th_developer_source``
     - Char
     - Nguồn người phát triển.
   * - ``th_c0_date``
     - Date
     - Ngày lên C0.


**Quan hệ chính:**

.. code-block:: text
   crm.lead ──Many2one──→ res.partner (khách hàng / sinh viên gắn với cơ hội)
   crm.lead ──Many2one──→ crm.stage (mối quan hệ của cơ hội)
   crm.lead ──Many2one──→ res.users (người chăm sóc cơ hội)
   crm.lead ──Many2one──→ crm.team (đội tư vấn phụ trách)
   crm.lead ──Many2one──→ th.origin (trường học)
   crm.lead ──Many2one──→ th.ownership.unit (đơn vị sở hữu cơ hội)
   crm.lead ──Many2one──→ th.status.category (nhóm tình trạng)
   crm.lead ──Many2one──→ th.status.detail (trạng thái chi tiết)
   crm.lead ──Many2one──→ th.major (ngành đăng ký chính)
   crm.lead ──Many2many──→ th.major (danh sách ngành đăng ký cũ)
   crm.lead ──Many2one──→ th.graduation.system (hệ tốt nghiệp)
   crm.lead ──Many2one──→ th.training.system (hệ đào tạo)
   crm.lead ──Many2one──→ th.info.channel (kênh tiếp cận)
   crm.lead ──Many2one──→ th.source.group (nhóm nguồn)
   crm.lead ──Many2one──→ th.admissions.station (trạm tuyển sinh)
   crm.lead ──Many2one──→ th.admissions.region (vùng tuyển sinh)
   crm.lead ──Many2one──→ th.admission.list (danh sách xét tuyển)
   crm.lead ──Many2one──→ th.admission.decision (quyết định trúng tuyển)
   crm.lead ──Many2one──→ th.enrollment.list (danh sách khai giảng)
   crm.lead ──Many2one──→ th.recheck.reason (lý do xét lại)
   crm.lead ──Many2one──→ th.dividing.ring (vòng chia cơ hội)
   crm.lead ──Many2one──→ crm.lead (cơ hội đối ứng trong xử lý trùng)
   crm.lead ──One2many──→ crm.lead.opportunity.list.partner (danh sách các cơ hội cùng khách hàng)
   crm.lead ──Many2one──→ res.partner (người giới thiệu)
   crm.lead ──Many2one──→ res.partner (người kết nối)
   crm.lead ──Many2one──→ res.partner (partner cũ trước khi đổi liên kết)
   crm.lead ──Many2one──→ th.country.ward (phường/xã hiện tại)
   crm.lead ──Many2one──→ th.country.district (quận/huyện hiện tại)
   crm.lead ──Many2one──→ res.country.state (tỉnh/thành hiện tại)
   crm.lead ──Many2one──→ res.country (quốc gia hiện tại)
   crm.lead ──Many2one──→ th.country.ward (phường/xã hộ khẩu)
   crm.lead ──Many2one──→ th.country.district (quận/huyện hộ khẩu)
   crm.lead ──Many2one──→ res.country.state (tỉnh/thành hộ khẩu)
   crm.lead ──Many2one──→ res.country (quốc gia hộ khẩu)
   crm.lead ──Many2one──→ th.ethnicity (dân tộc)
   crm.lead ──Many2one──→ th.religion (tôn giáo)
   crm.lead ──Many2one──→ th.customer.attitude (thái độ khách hàng ở ngữ cảnh CSKH)
   crm.lead ──Many2one──→ th.status.detail (tình trạng gọi ở ngữ cảnh CSKH)
   crm.lead ──Many2many──→ th.origin (danh sách trường đã tái sử dụng ở ngữ cảnh CSKH)
   crm.lead ──Many2many──→ crm.team (các đội nhóm CRM liên quan)
   crm.lead ──Many2one──→ res.users (người tạo khi check trùng thắng)
   crm.lead ──Many2one──→ res.users (người khiếu nại)


2.2. th.dividing.ring (vòng chia) — *model mới*
--------------------------------------------------

**Mục đích:** Lưu cấu hình vòng chia cơ hội cho đội CRM/CSKH/đối tác. Model này quyết định danh sách thành viên tham gia chia và vị trí cắm cờ hiện tại để hệ thống phân công tuần tự.

**Field quan trọng:**

.. list-table::
   :header-rows: 1
   :widths: 30 20 50

   * - Field
     - Kiểu
     - Mô tả
   * - ``name``
     - Char
     - Tên vòng chia.
   * - ``th_user_ids``
     - Many2many → ``res.users``
     - Danh sách thành viên tham gia vòng chia.
   * - ``th_flag``
     - Char
     - Cờ hiện tại dùng để xác định lượt chia kế tiếp.
   * - ``th_is_partner_dividing``
     - Boolean
     - Đánh dấu vòng chia dùng cho đối tác.
   * - ``th_is_css_dividing``
     - Boolean
     - Đánh dấu vòng chia dùng cho CSKH.
   * - ``th_is_crm_lead_dividing``
     - Boolean
     - Đánh dấu vòng chia dùng cho cơ hội CRM.
   * - ``th_origin_id``
     - Many2one → ``th.origin``
     - Trường học áp dụng vòng chia.
   * - ``th_dividing_ring_b2b_id``
     - Integer
     - ID vòng chia tương ứng ở hệ thống B2B.
   * - ``th_uuid``
     - Char
     - UUID kỹ thuật phục vụ đồng bộ sang B2B.


**Quan hệ chính:**

.. code-block:: text
   th.dividing.ring ──Many2many──→ res.users (thành viên tham gia vòng chia)
   th.dividing.ring ──Many2one──→ th.origin (trường học áp dụng vòng chia)
   crm.lead ──Many2one──→ th.dividing.ring (vòng chia gắn với cơ hội)
   th.duplicate.check.history ──Many2one──→ th.dividing.ring (vòng chia tại thời điểm check trùng)
   th.formio.builder.field.aff.default ──Many2one──→ th.dividing.ring (vòng chia mặc định khi tạo lead từ form)
   th.formio.builder.field.aff.default.line ──Many2one──→ th.dividing.ring (vòng chia theo từng cấu hình trường)



2.3. th.check.condition (điều kiện check trùng) — *model mới*
--------------------------------------------------------------

**Mục đích:** Lưu ma trận điều kiện để xử lý trùng cơ hội theo số ngày liên hệ cuối, mối quan hệ và trạng thái chi tiết.

**Field quan trọng:**

.. list-table::
   :header-rows: 1
   :widths: 30 20 50

   * - Field
     - Kiểu
     - Mô tả
   * - ``name``
     - Char
     - Tên điều kiện, compute từ khoảng ngày.
   * - ``th_date_from``
     - Integer
     - Số ngày liên hệ lần cuối từ.
   * - ``th_date_to``
     - Integer
     - Số ngày liên hệ lần cuối đến.
   * - ``th_crm_level_id``
     - Many2one → ``crm.stage``
     - Mối quan hệ áp dụng.
   * - ``th_status_detail_id``
     - Many2one → ``th.status.detail``
     - Tình trạng gọi áp dụng.
   * - ``th_result``
     - Selection
     - Kết quả xử lý khi trùng.

**Quan hệ chính:**

.. code-block:: text

   th.check.condition ──Many2one──→ crm.stage (mối quan hệ áp dụng để check trùng)
   th.check.condition ──Many2one──→ th.status.detail (tình trạng gọi áp dụng để check trùng)


2.4. th.duplicate.check.history (Lịch sử kiểm tra trùng) — *model mới*
--------------------------------------------------

**Mục đích:** Lưu lại từng lần hệ thống hoặc người dùng xử lý trùng cơ hội. Model này phục vụ tra cứu lịch sử, khiếu nại, đối soát kết quả thắng/thua và audit quá trình check trùng.


**Field quan trọng:**

.. list-table::
   :header-rows: 1
   :widths: 30 20 50

   * - Field
     - Kiểu
     - Mô tả
   * - ``th_name_lead_lose``
     - Char
     - Tên cơ hội thua.
   * - ``th_ownership_id``
     - Many2one → ``th.ownership.unit``
     - Đơn vị sở hữu tại thời điểm check.
   * - ``th_status_group_id``
     - Many2one → ``th.status.category``
     - Nhóm tình trạng tại thời điểm check.
   * - ``th_status_detail_id``
     - Many2one → ``th.status.detail``
     - Trạng thái chi tiết tại thời điểm check.
   * - ``th_stage_id``
     - Many2one → ``crm.stage``
     - Mối quan hệ tại thời điểm check.
   * - ``th_description``
     - Text
     - Mô tả lịch sử kiểm tra trùng.
   * - ``th_major_id``
     - Many2one → ``th.major``
     - Ngành đăng ký.
   * - ``th_registration_date``
     - Date
     - Ngày đăng ký.
   * - ``th_last_check``
     - Datetime
     - Thời điểm liên hệ cuối.
   * - ``th_lead_b2b_id``
     - Integer
     - ID cơ hội phía B2B.
   * - ``th_lead_samp_id_old``
     - Many2one → ``crm.lead``
     - Cơ hội SamP thua.
   * - ``th_lead_samp_id_new``
     - Many2one → ``crm.lead``
     - Cơ hội SamP thắng.
   * - ``th_graduation_system_id``
     - Many2one → ``th.graduation.system``
     - Hệ tốt nghiệp.
   * - ``th_admissions_station_id``
     - Many2one → ``th.admissions.station``
     - Trạm tuyển sinh.
   * - ``th_admissions_region_id``
     - Many2one → ``th.admissions.region``
     - Vùng tuyển sinh.
   * - ``th_channel_id``
     - Many2one → ``th.info.channel``
     - Kênh tiếp cận.
   * - ``th_dividing_ring_id``
     - Many2one → ``th.dividing.ring``
     - Vòng chia.
   * - ``user_id``
     - Many2one → ``res.users``
     - Người phụ trách cơ hội, người khiếu nại.
   * - ``th_source_name``
     - Char
     - Tên nguồn.
   * - ``th_source_group_id``
     - Many2one → ``th.source.group``
     - Nhóm nguồn.
   * - ``th_form_name``
     - Char
     - Tên form nhúng.
   * - ``th_uuid_form``
     - Char
     - Mã form nhúng.
   * - ``th_partner_referred_id``
     - Many2one → ``res.partner``
     - Người giới thiệu.
   * - ``th_duplicate_type``
     - Selection
     - Loại xử lý trùng: thủ công, tự động, cần xử lý, chưa có điều kiện.
   * - ``state``
     - Selection
     - Loại chăm sóc.
   * - ``th_self_lead``
     - Boolean
     - Đánh dấu cơ hội tự chốt.


**Quan hệ chính:**

.. code-block:: text

   th.duplicate.check.history ──Many2one──→ th.ownership.unit (đơn vị sở hữu)
   th.duplicate.check.history ──Many2one──→ th.status.category (nhóm tình trạng)
   th.duplicate.check.history ──Many2one──→ th.status.detail (trạng thái chi tiết)
   th.duplicate.check.history ──Many2one──→ crm.stage (mối quan hệ)
   th.duplicate.check.history ──Many2one──→ th.major (ngành đăng ký)
   th.duplicate.check.history ──Many2one──→ crm.lead (cơ hội SamP thua)
   th.duplicate.check.history ──Many2one──→ crm.lead (cơ hội SamP thắng)
   th.duplicate.check.history ──Many2one──→ th.graduation.system (hệ tốt nghiệp)
   th.duplicate.check.history ──Many2one──→ th.admissions.station (trạm tuyển sinh)
   th.duplicate.check.history ──Many2one──→ th.admissions.region (vùng tuyển sinh)
   th.duplicate.check.history ──Many2one──→ th.info.channel (kênh)
   th.duplicate.check.history ──Many2one──→ th.dividing.ring (vòng chia)
   th.duplicate.check.history ──Many2one──→ res.users (người phụ trách)
   th.duplicate.check.history ──Many2one──→ th.source.group (nhóm nguồn)
   th.duplicate.check.history ──Many2one──→ res.partner (người giới thiệu)


2.5. th.admission.list (danh sách xét tuyển) — *model mới*
-----------------------------------------------------------

**Mục đích:** Quản lý đợt xét tuyển đầu vào. Model này dùng để gom các cơ hội đủ điều kiện theo trường, sau đó đẩy sang bước quyết định trúng tuyển.

**Field quan trọng:**

.. list-table::
   :header-rows: 1
   :widths: 30 20 50

   * - Field
     - Kiểu
     - Mô tả
   * - ``name``
     - Char
     - Tên danh sách xét tuyển.
   * - ``th_settlement``
     - Boolean
     - Đã có quyết định trúng tuyển.
   * - ``th_settlement_batch``
     - Boolean
     - Đợt đã xét.
   * - ``th_origin_id``
     - Many2one → ``th.origin``
     - Trường học.
   * - ``th_crm_level_ids``
     - Many2many → ``crm.stage``
     - Các mối quan hệ đủ điều kiện đưa vào đợt xét tuyển.
   * - ``th_crm_lead_count``
     - Integer
     - Số cơ hội thuộc danh sách.
   * - ``th_crm_lead_ids``
     - One2many → ``crm.lead``
     - Các cơ hội thuộc danh sách xét tuyển.
   * - ``th_admission_list``
     - Binary
     - File danh sách xét tuyển.

**Quan hệ chính:**

.. code-block:: text

   th.admission.list ──Many2one──→ th.origin (trường học của đợt xét tuyển)
   th.admission.list ──Many2many──→ crm.stage (các mối quan hệ được phép đưa vào xét tuyển)
   th.admission.list ──One2many──→ crm.lead (các cơ hội thuộc danh sách xét tuyển)
   th.admission.decision ──Many2many──→ th.admission.list (quyết định trúng tuyển lấy dữ liệu từ các danh sách xét tuyển)
   crm.lead ──Many2one──→ th.admission.list (cơ hội thuộc danh sách xét tuyển nào)



2.6. th.admission.decision (quyết định trúng tuyển) — *model mới*
------------------------------------------------------------------

**Mục đích:** Quản lý quyết định trúng tuyển. Model này nhận danh sách xét tuyển và cập nhật kết quả lên các cơ hội tương ứng.

**Field quan trọng:**

.. list-table::
   :header-rows: 1
   :widths: 30 20 50

   * - Field
     - Kiểu
     - Mô tả
   * - ``name``
     - Char
     - Tên quyết định.
   * - ``th_origin_id``
     - Many2one → ``th.origin``
     - Nơi trúng tuyển.
   * - ``th_admission_list_id``
     - Many2many → ``th.admission.list``
     - Các danh sách xét tuyển liên quan.
   * - ``th_decision_ref``
     - Char
     - Quyết định trúng tuyển số.
   * - ``th_decision_date``
     - Date
     - Ngày có quyết định.
   * - ``th_scan_attachment_id``
     - Binary
     - Bản scan quyết định.
   * - ``th_attachment_id``
     - Binary
     - File danh sách trúng tuyển.
   * - ``th_lead_ids``
     - Many2many → ``crm.lead``
     - Các cơ hội thuộc quyết định.
   * - ``state``
     - Selection
     - Trạng thái xử lý: Nháp, hoàn thành.
   * - ``th_crm_lead_count``
     - Integer
     - Số cơ hội thuộc quyết định.
   * - ``th_added_enrollment_list``
     - Boolean
     - Đánh dấu đã có danh sách khai giảng.

**Quan hệ chính:**

.. code-block:: text

   th.admission.decision ──Many2one──→ th.origin (trường học ra quyết định)
   th.admission.decision ──Many2many──→ th.admission.list (các danh sách xét tuyển gắn với quyết định)
   th.admission.decision ──Many2many──→ crm.lead (các cơ hội thuộc quyết định trúng tuyển)
   crm.lead ──Many2one──→ th.admission.decision (quyết định trúng tuyển gắn với cơ hội)
   th.enrollment.list ──Many2one──→ th.admission.decision (danh sách khai giảng sinh ra từ quyết định)


2.7. th.enrollment.list (danh sách khai giảng) — *model mới*
-------------------------------------------------------------

**Mục đích:** Quản lý danh sách khai giảng sau khi đã có quyết định trúng tuyển. Model này cập nhật các cơ hội đã trúng tuyển sang bước khai giảng.

**Field quan trọng:**

.. list-table::
   :header-rows: 1
   :widths: 30 20 50

   * - Field
     - Kiểu
     - Mô tả
   * - ``name``
     - Char
     - Tên danh sách khai giảng.
   * - ``th_origin_id``
     - Many2one → ``th.origin``
     - Nơi khai giảng.
   * - ``th_enrollment_list``
     - Binary
     - File danh sách khai giảng.
   * - ``th_admission_decision_id``
     - Many2one → ``th.admission.decision``
     - Quyết định trúng tuyển nguồn.
   * - ``state``
     - Selection
     - Trạng thái xử lý: Nháp, hoàn thành.
   * - ``th_opportunity_enrollment_count``
     - Integer
     - Số cơ hội đã thuộc danh sách khai giảng.


**Quan hệ chính:**

.. code-block:: text

   th.enrollment.list ──Many2one──→ th.origin (trường học khai giảng)
   th.enrollment.list ──Many2one──→ th.admission.decision (quyết định trúng tuyển nguồn)
   crm.lead ──Many2one──→ th.enrollment.list (cơ hội thuộc danh sách khai giảng nào)


2.8. th.level.condition (điều kiện chuyển level tự động) — *model mới*
-----------------------------------------------------------------------

**Mục đích:** Cấu hình điều kiện để cơ hội tự động chuyển mối quan hệ dựa trên tình trạng đơn hàng, trạng thái hồ sơ, quyết định trúng tuyển và danh sách khai giảng.

**Field quan trọng:**

.. list-table::
   :header-rows: 1
   :widths: 30 20 50

   * - Field
     - Kiểu
     - Mô tả
   * - ``th_type_condition``
     - Selection
     - Điều kiện đơn hàng để chuyển level: Chưa có đơn hàng/ Đã nộp lệ phí,học phí một phần/ Đã nộp đủ HP, LP
   * - ``th_admission_decision``
     - Boolean
     - Có yêu cầu quyết định trúng tuyển hay không.
   * - ``th_crm_level``
     - Many2one → ``crm.stage``
     - Mối quan hệ đích sẽ tự động chuyển đến.
   * - ``th_enrollment_list``
     - Boolean
     - Có yêu cầu danh sách khai giảng hay không.

**Quan hệ chính:**

.. code-block:: text

   th.level.condition ──Many2one──→ crm.stage (mối quan hệ đích dùng cho tự động chuyển level)


2.9. th.summary.activity (tổng hợp lịch làm việc) — *model mới*
----------------------------------------------------------------

**Mục đích:** Bảng tổng hợp lịch làm việc phát sinh từ ``mail.activity`` của CRM. Model này giúp theo dõi deadline, trạng thái hoàn thành và lọc tập trung theo cơ hội/người phụ trách.

**Field quan trọng:**

.. list-table::
   :header-rows: 1
   :widths: 30 20 50

   * - Field
     - Kiểu
     - Mô tả
   * - ``th_activity_id``
     - Many2one → ``mail.activity``
     - Lịch làm việc nguồn.
   * - ``user_id``
     - Many2one → ``res.users``
     - Người được phân công.
   * - ``th_activity_type_id``
     - Many2one → ``mail.activity.type``
     - Kiểu hoạt động.
   * - ``th_res_model``
     - Char
     - Model liên quan.
   * - ``th_res_id``
     - Integer
     - ID bản ghi liên quan.
   * - ``th_res_name``
     - Char
     - Tên cơ hội.
   * - ``th_datetime_deadline``
     - Datetime
     - Hạn hoàn thành.
   * - ``th_datetime_done``
     - Datetime
     - Ngày hoàn thành.
   * - ``th_note``
     - Html
     - Ghi chú công việc.
   * - ``th_lead_id``
     - Many2one → ``crm.lead``
     - Cơ hội liên quan.
   * - ``th_stage_id``
     - Many2one → ``crm.stage``
     - Mối quan hệ của cơ hội.
   * - ``th_origin_id``
     - Many2one → ``th.origin``
     - Trường học của cơ hội.
   * - ``state``
     - Selection
     - Trạng thái pending/done.
   * - ``th_summary``
     - Char
     - Tổng kết.


**Quan hệ chính:**

.. code-block:: text

   th.summary.activity ──Many2one──→ mail.activity (lịch làm việc nguồn)
   th.summary.activity ──Many2one──→ res.users (người được phân công)
   th.summary.activity ──Many2one──→ mail.activity.type (kiểu hoạt động)
   th.summary.activity ──Many2one──→ crm.lead (cơ hội liên quan)
   th.summary.activity ──Related Many2one──→ crm.stage (mối quan hệ của cơ hội)
   th.summary.activity ──Related Many2one──→ th.origin (trường học của cơ hội)


2.10. crm.lead.opportunity.list.partner (danh sách cơ hội theo khách hàng) — *model mới*
-----------------------------------------------------------------------------------------

**Mục đích:** Lưu danh sách các cơ hội cùng khách hàng để phục vụ hiển thị/đối chiếu các cơ hội liên quan theo người học.

**Field quan trọng:**

.. list-table::
   :header-rows: 1
   :widths: 30 20 50

   * - Field
     - Kiểu
     - Mô tả
   * - ``name``
     - Char
     - Tên cơ hội.
   * - ``th_partner_id``
     - Many2one → ``res.partner``
     - Khách hàng.
   * - ``th_origin_id``
     - Many2one → ``th.origin``
     - Trường học.
   * - ``th_last_check``
     - Datetime
     - Liên hệ lần cuối.
   * - ``th_stage_id``
     - Many2one → ``crm.stage``
     - Mối quan hệ hiện tại.
   * - ``crm_lead_id``
     - Many2one → ``crm.lead``
     - Cơ hội nguồn.

**Quan hệ chính:**

.. code-block:: text

   crm.lead.opportunity.list.partner ──Many2one──→ res.partner (khách hàng)
   crm.lead.opportunity.list.partner ──Many2one──→ th.origin (trường học)
   crm.lead.opportunity.list.partner ──Many2one──→ crm.stage (mối quan hệ của cơ hội)
   crm.lead.opportunity.list.partner ──Many2one──→ crm.lead (cơ hội nguồn)


2.11. th.formio.builder.field.aff.default.line — *model mới*
------------------------------------------------------------

**Mục đích:** Lưu từng dòng cấu hình trường học/vòng chia khi bật chế độ cấu hình nhiều trường cho form nhúng.

**Field quan trọng:**

.. list-table::
   :header-rows: 1
   :widths: 30 20 50

   * - Field
     - Kiểu
     - Mô tả
   * - ``th_formio_default_id``
     - Many2one → ``th.formio.builder.field.aff.default``
     - Form nhúng.
   * - ``th_origin_id``
     - Many2one → ``th.origin``
     - Trường học.
   * - ``th_dividing_ring_id``
     - Many2one → ``th.dividing.ring``
     - Vòng chia.

**Quan hệ chính:**

.. code-block:: text

   th.formio.builder.field.aff.default.line ──Many2one──→ th.formio.builder.field.aff.default (form nhúng cha)
   th.formio.builder.field.aff.default.line ──Many2one──→ th.origin (trường học)
   th.formio.builder.field.aff.default.line ──Many2one──→ th.dividing.ring (vòng chia)


2.12. th.training.system — *model mới*
--------------------------------------

**Mục đích:** Danh mục hệ đào tạo dùng trên cơ hội CRM.

**Field quan trọng:**

.. list-table::
   :header-rows: 1
   :widths: 30 20 50

   * - Field
     - Kiểu
     - Mô tả
   * - ``name``
     - Char
     - Tên hệ đào tạo.
   * - ``th_description``
     - Text
     - Mô tả hệ đào tạo.

**Quan hệ chính:**

.. code-block:: text

   crm.lead ──Many2one──→ th.training.system (hệ đào tạo)
   sale.order ──Related Many2one──→ th.training.system (kế thừa từ cơ hội nếu có dùng)
   account.move ──Related/gián tiếp──→ th.training.system (qua cơ hội nếu có dùng)


2.13. th.customer.attitude — *model mới*
----------------------------------------

**Mục đích:** Danh mục thái độ khách hàng trong ngữ cảnh CSKH.

**Field quan trọng:**

.. list-table::
   :header-rows: 1
   :widths: 30 20 50

   * - Field
     - Kiểu
     - Mô tả
   * - ``name``
     - Char
     - Tên thái độ khách hàng.

**Quan hệ chính:**

.. code-block:: text

   crm.lead ──Many2one──→ th.customer.attitude (thái độ khách hàng ở ngữ cảnh CSKH)


2.14. th.recheck.reason — *model mới*
-------------------------------------

**Mục đích:** Danh mục lý do xét lại trong quy trình CRM, đơn hàng và hóa đơn.

**Field quan trọng:**

.. list-table::
   :header-rows: 1
   :widths: 30 20 50

   * - Field
     - Kiểu
     - Mô tả
   * - ``name``
     - Char
     - Lý do xét lại.

**Quan hệ chính:**

.. code-block:: text

   crm.lead ──Many2one──→ th.recheck.reason (lý do xét lại)
   sale.order ──Many2one──→ th.recheck.reason (lý do xét lại trên đơn hàng)
   account.move ──Many2one──→ th.recheck.reason (lý do xét lại trên hóa đơn)


2.15. Các model kế thừa khác
----------------------------

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Model
     - Mục đích kế thừa
   * - ``crm.team``
     - Bổ sung trường học, cấu trúc nhóm cha/con, danh sách quản lý và các field phục vụ chia cơ hội, phân cấp đội nhóm CRM.
   * - ``crm.stage``
     - Mở rộng stage để phân biệt stage CRM/CSKH, stage tự động, stage bắt buộc điền và đồng bộ mã stage với hệ thống ngoài.
   * - ``th.status.category``
     - Bổ sung danh sách mối quan hệ CRM áp dụng cho từng nhóm tình trạng để lọc và kiểm soát trạng thái theo stage.
   * - ``th.status.detail``
     - Bổ sung danh sách mối quan hệ CRM áp dụng cho trạng thái chi tiết và các cờ điều khiển luồng như chuyển kho, tạo lead, có nhu cầu.
   * - ``res.users``
     - Thêm quan hệ quản lý CRM nhiều-nhiều để phục vụ phân cấp quản lý người dùng trong CRM.
   * - ``res.partner``
     - Điều chỉnh dữ liệu liên hệ phục vụ CRM, trong đó số điện thoại là bắt buộc và có thêm mapping UUID liên hệ từ hệ thống ngoài.
   * - ``sale.order``
     - Mang theo dữ liệu CRM từ cơ hội sang đơn hàng, phục vụ xử lý học phí/lệ phí, xét lại, hoàn tiền và đối soát nghiệp vụ tuyển sinh.
   * - ``account.move``
     - Liên kết trực tiếp hóa đơn với cơ hội CRM và bổ sung dữ liệu tuyển sinh/nguồn/đơn vị sở hữu để phục vụ đối soát, báo cáo và cập nhật trạng thái cơ hội.
   * - ``mail.activity``
     - Mở rộng lịch làm việc với datetime đầy đủ và hỗ trợ đồng bộ sang bảng tổng hợp lịch làm việc CRM.
   * - ``mail.message``
     - Liên kết log note/message về cơ hội CRM để phục vụ theo dõi lịch sử trao đổi và đồng bộ message theo nghiệp vụ CRM.
   * - ``crm.tag``
     - Bổ sung liên kết ngược từ tag về danh sách cơ hội đang gắn tag.
   * - ``th.origin``
     - Mở rộng danh mục trường học để phục vụ hiển thị, liên kết nhanh và hành động điều hướng trong CRM.
   * - ``th.ownership.unit``
     - Bổ sung đội giám sát và đội CSKH mặc định cho đơn vị sở hữu, phục vụ phân quyền và phân công cơ hội.
   * - ``data_merge.group``
     - Tùy biến cơ chế nhóm merge dữ liệu để áp dụng riêng cho bản ghi ``crm.lead``.
   * - ``data_merge.model``
     - Tùy biến cấu hình merge model để hỗ trợ logic merge và gom nhóm dữ liệu cho cơ hội CRM.
   * - ``data_merge.record``
     - Bổ sung thông tin CRM như trường học, đơn vị sở hữu, điện thoại, email, ngày và loại trùng để hỗ trợ xử lý merge cơ hội.
   * - ``formio.builder``
     - Mở rộng form builder để bổ sung cấu hình giá trị mặc định khi sinh cơ hội CRM từ form nhúng.
   * - ``th.formio.builder.field.aff.default``
     - Bổ sung cấu hình đội CRM, vòng chia, nhóm tình trạng và trạng thái chi tiết mặc định khi đổ lead từ form.
   * - ``product.template``
     - Mở rộng sản phẩm để phục vụ liên kết/nghiệp vụ CRM trong luồng đơn hàng, học phí hoặc cấu hình sản phẩm liên quan.



3. Logic Nghiệp vụ Chính
=========================

.. Hướng dẫn: Giải thích logic THEO BƯỚC — không chỉ liệt kê tên hàm, chưa cần pseudo-code.
.. Nhóm theo chức năng khớp với các luồng trong business.rst.
.. Gắn mã C4 QHSP vào header mỗi nhóm (loose coupling).
.. Hàm infrastructure (check điều kiện, gửi notify...) không map C4 → không cần gắn mã.


3.1. Tạo mới & cập nhật cơ hội ``[C4: COS-SAM-CRM-001, 002]`` 
-------------------------------------------------------------

**``crm.lead.create()``** — *Ghi đè hàm gốc*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Tạo mới cơ hội (thủ công hoặc import)
   * - Logic
     - | 1. Sinh `th_uuid` nếu bản ghi chưa có UUID (dành cho đồng bộ sang B2B)
       | 2. Nếu tạo từ import và có `th_import_phone` / `th_import_email`:
       |    * tìm `res.partner` theo số điện thoại hoặc email
       |    * nếu không có thì tự tạo mới liên hệ
       |    * gán lại `partner_id` cho cơ hội
       | 3. Nếu chưa có `th_customer_code_aum` thì lấy từ partner
       | 4. Nếu chưa có `th_origin_id` thì gán trường mặc định AUM
       | 5. Nếu chưa có `th_last_check` thì gán thời điểm hiện tại
       | 6. Nếu tạo từ web form/livechat thì tự gán `th_channel_id` theo nguồn
       | 7. Sinh `th_crm_code` từ sequence
       | 8. Nếu có người giới thiệu thì bật cờ `th_check_partner_referred`
       | 9. Nếu chưa có vòng chia và chưa có người phụ trách thì mặc định gán người tạo hiện tại và đội CRM tương ứng
       | 10. Nếu import file thì tự gán `th_ownership_id` theo user hiện tại
       | 11. Sau khi create:
       |    * gán `th_registration_date` theo múi giờ user
       |    * đánh dấu partner `th_check_module=True`
       |    * đưa cơ hội về stage mặc định `th_stage_lead1 = L0`
       |    * sinh `name_id_sequence` và cập nhật tên hiển thị theo dạng `[Mã]-Tên khách hàng`
       | 12. Sau khi tạo xong, hệ thống tìm cơ hội CRM khác: cùng ``partner_id`` + cùng ``th_origin_id`` + chưa bị đánh dấu trùng + không `is_won` + không `th_is_close_lead`. Nếu có thì gọi ``th_check_condition_lead()`` để xử lý trùng tự động.
       | 13. Nếu không trùng và có ``th_dividing_ring_id`` nhưng chưa có ``user_id`` thì lấy người tiếp theo từ vòng chia
   * - Lưu ý
     - Hàm cũng xử lý trường hợp import file hàng loạt


**``crm.lead.write()``** — *Ghi đè hàm gốc*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Mỗi lần cập nhật cơ hội
   * - Logic
     - | 1. Chặn user thuộc nhóm `th_group_crm_can_create` nhưng không thuộc `th_group_admin_crm`, khi không phải luồng import (import_file), không phải luồng tạo CRM (crm_create), và đang sửa trực tiếp cơ hội với dữ liệu cập nhật không chỉ là `th_last_check` hoặc `message_main_attachment_id`
       | 2. Nếu thay đổi `partner_id` thì lưu lại partner cũ vào `th_old_partner_id`
       | 3. Nếu thao tác `manual` và không phải system user thì đánh dấu `th_duplicate_type = manual`
       | 4. Nếu thay đổi nội dung mô tả hoặc trạng thái chi tiết, hệ thống tự cập nhật ``th_last_check``
       | 5. Sau khi write:
       |    * nếu vừa gán `th_dividing_ring_id` mà chưa có người phụ trách, hệ thống tự lấy user từ vòng chia
       |    * nếu các field về học phí/lệ phí/xét tuyển/hồ sơ/khai giảng thay đổi thì gọi `th_auto_next_level()` để xét chuyển stage tự động
       | 6. Nếu thay đổi `partner_id` hoặc `th_origin_id` thì kiểm tra lại khả năng trùng với cơ hội khác cùng khách hàng/cùng trường
       | 7. Nếu bản ghi đang ở trạng thái trùng nhưng được duyệt tạo lại thì có thể gỡ cờ trùng theo logic nghiệp vụ


**``crm.lead.receive_data_from_module()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Module ngoài gửi dữ liệu sang CRM để tạo cơ hội
   * - Logic
     - | 1. Tìm partner theo số điện thoại + email
       | 2. Tìm người giới thiệu theo tên affiliate code
       | 3. Nếu đã có partner thì tạo mới `crm.lead` trên partner đó
       | 4. Nếu chưa có partner thì tạo mới `res.partner` trước, sau đó tạo `crm.lead`
   * - Lưu ý
     - Đây là luồng nhận dữ liệu ngoài hệ thống ở mức nghiệp vụ, không phải API controller riêng


3.2. Check trùng & Khiếu nại ``[C4: COS-SAM-CRM-003]`` 
------------------------------------------------------

**``crm.lead.th_check_condition_lead()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Được gọi từ `create()` và `write()` của lead
   * - Logic
     - | 1. Tìm cơ hội đang được chăm sóc (`th_is_a_duplicate_opportunity=False`) có cùng `partner_id` và cùng `th_origin_id`
       | 2. Nếu tìm thấy → kiểm tra ma trận trùng đã cấu hình → xác định cơ hội nào thắng/thua
       | 3. Nếu không có ma trận → cơ hội mới mặc định thua (`th_is_a_duplicate_opportunity=False`)
       | 4. Cơ hội thua: đánh dấu `th_is_a_duplicate_opportunity=True` và được đưa vào menu trùng
   * - Lưu ý
     - Hệ thống không chỉ đánh dấu trùng mà còn quyết định cơ hội nào thắng/thua, ghi lịch sử và chuyển toàn bộ log note.


**``crm.lead.th_send_noti_duplicate_lead()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Nhân viên nhấn nút "Khiếu nại" trên cơ hội trùng
   * - Logic
     - | Mở wizard khiếu nại để người dùng nhập thông tin khiếu nại và nút gửi xử lý cho admin.


**``th.duplicate.lead.notify.wr.th_send_noti()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Nhân viên ấn nút gửi khiếu nại cơ hội trùng
   * - Logic
     - | Tạo phiếu khiếu nại → gửi thông báo cho admin xử lý


**``crm.lead.action_view_history()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Người dùng ấn nút "Lịch sử chăm sóc" trong Formview cơ hội trùng
   * - Logic
     - | 1. Tìm các cơ hội khác theo khách hàng (`partner_id`), cùng trường (`th_origin_id`), không trùng lặp (`th_is_a_duplicate_opportunity=False`)
       | 2. Nếu tìm thấy nhiều hơn 1 cơ hội, ưu tiên lọc tiếp các cơ hội chưa đóng (`th_is_close_lead=False`)
       | 3. Nếu sau khi lọc chưa đóng mà không còn bản ghi nào, lấy lại 1 cơ hội phù hợp bất kỳ
       | 4. Với từng cơ hội tìm được, kiểm tra đã có lịch sử chăm sóc giữa cơ hội cũ (`th_crm_lead_old_id`) và cơ hội hiện tại (`th_crm_lead_new_id`)
       | 5. Nếu chưa có, tạo mới bản ghi lịch sử chăm sóc
       | 6. Mở danh sách lịch sử chăm sóc có liên quan đến cơ hội hiện tại


**``crm.lead.th_open_dup_lead()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Admin ấn nút "Danh sách lead trùng" trong Formview cơ hội cần xử lý khiếu nại
   * - Logic
     - | 1. Tìm tất cả cơ hội trùng với cơ hội hiện tại cần xử lý khiếu nại
       | 2. Hiển thị popup danh sách cơ hội tìm được kèm nút "Chuyển" để Admin xử lý thủ công


**``th.duplicate.check.history.th_action_merge()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Admin ấn nút "Chuyển" trên danh sách lead trùng cần xử lý
   * - Logic
     - | 1. Đảo kết quả: cơ hội thua → thắng, cơ hội thắng → thua
       | 2. Tạo thông báo/log note và gửi `activity_schedule` cho người liên quan


**``crm.lead.th_keep_lead()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Admin ấn nút "Giữ cơ hội" trên Formview cơ hội khiếu nại cần xử lý (`th_duplicate_type=manual`)
   * - Logic
     - | 1. Giữ nguyên kết quả xử lý và đóng phiếu khiếu nại
       | 2. Tạo thông báo/log note và gửi `activity_schedule` cho người liên quan


**``crm.lead.th_action_create_new_lead()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Admin duyệt cho phép mở lại cơ hội đang bị trùng nhưng không vào ma trận.
   * - Logic
     - | 1. Gỡ cờ trùng (`th_is_a_duplicate_opportunity=False`), gỡ cờ chờ admin (`th_dup_need_admin=False`) và đánh dấu cơ hội được phép tiếp tục xử lý (`th_is_apply_lead=True`)
       | 2. Hiện thông báo lên bên Chatter
   * - Lưu ý
     - Dùng cho trường hợp trùng không xử lý theo ma trận.


3.3. Tạo Đơn hàng & Hóa đơn ``[C4: COS-SAM-CRM-004]`` 
-----------------------------------------------------

**``crm.lead.action_sale_quotations_new()``** — *Ghi đè hàm gốc*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Nhấn "Tạo đơn hàng" trên Formview cơ hội
   * - Logic
     - | 1. Gọi action gốc tạo sale order
       | 2. Bổ sung context: `create_invoice = True`, `default_th_sale_order=crm`, `default_th_type_order=summary` và domain giới hạn sản phẩm thuộc module CRM
       | 3. Mở popup tạo đơn hàng ở `target = new`
       | 4. Gắn cờ UI để ẩn hành động xác nhận CRM.
   * - Lưu ý
     - Hàm này cấu hình đúng context để luồng ``sale.order.create()`` xử lý tiếp.


**``sale.order.create()``** — *Ghi đè hàm gốc*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Tạo mới đơn hàng từ cơ hội CRM
   * - Logic
     - | 1. Chặn việc tạo đơn CRM trùng theo rule nghiệp vụ nếu cần
       | 2. Sau khi create:
       |    * Nếu là đơn CRM thì đổi tên đơn bằng cách thêm `CRM-` ở đầu của tên
       |    * Sao chép ``th_recheck_reason`` từ cơ hội sang đơn hàng
       | 3. Nếu context có ``create_invoice`` và đơn là đơn CRM:
       |    * Tự động `action_confirm()`
       |    * Gọi wizard tạo hóa đơn
       |    * Lấy tên hóa đơn đầu tiên đưa về đơn hàng
       |    * Gán `th_crm_lead_id` cho hóa đơn
       |    * Gọi `th_auto_next_level()` trên cơ hội để xét nhảy level
       |    * Đánh dấu hóa đơn thuộc CRM
   * - Lưu ý
     - Phải chọn sản phẩm cho đơn hàng, sau đó mới ấn "Lưu"


**``account.move.create()``** — *Ghi đè hàm gốc*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Phát sinh hóa đơn từ đơn hàng CRM
   * - Logic
     - | 1. Sau khi tạo hóa đơn, tìm `sale.order` chứa hóa đơn đó
       | 2. Nếu đơn có `opportunity_id`:
       |    * gán `th_crm_lead_id` về hóa đơn
       |    * reset cờ hoàn học phí trên cơ hội
       |    * đánh dấu hóa đơn thuộc CRM
       | 3. Nếu hóa đơn là `out_invoice`:
       |    * tự động post hóa đơn
       |    * ghi log note lên cơ hội với mã hóa đơn vừa tạo
       |    * Sao chép `th_recheck_reason` từ đơn hàng sang hóa đơn
       | 4. Sao chép `th_recheck_reason` từ đơn hàng sang hóa đơn nếu có
       | 5. Gọi `th_auto_next_level()` để xét chuyển stage cho cơ hội nếu đủ điều kiện
   * - Lưu ý
     - Hàm này biến hóa đơn thành một phần trực tiếp của vòng đời cơ hội CRM.


**``sale.order.action_cancel()``** — *Ghi đè hàm gốc*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Người dùng hủy đơn hàng CRM
   * - Logic
     - | 1. Nếu là đơn CRM thì chỉ cho phép admin CRM hủy
       | 2. Nếu không có quyền thì raise ValidationError
       | 3. Nếu hợp lệ thì gọi luồng hủy đơn hàng gốc


**``account.move._compute_th_payment_status()``** — *Ghi đè hàm gốc*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Thanh toán tạo phiếu thu chi trên hóa đơn, gỡ phiếu thu, hoàn tiền hóa đơn
   * - Logic
     - | 1. Chạy compute trạng thái thu chi gốc trước → gọi `super()._compute_th_payment_status()`
       | 2. Duyệt từng hóa đơn move → chỉ xử lý khi `state=posted`
       | 3. Nếu hóa đơn có gắn cơ hội `th_crm_lead_id` và tìm được level `auto_next_level` → cập nhật `stage_id` cơ hội của hóa đơn
       | 4. Tìm đơn hàng liên quan sale_order_id → dùng để xử lý thêm nghiệp vụ hoàn học phí
       | 5. Nếu hóa đơn là hóa đơn hoàn `move.reversed_entry_id` → đánh dấu hóa đơn trong đơn hàng là đã hoàn / ngày hoàn
       | 6. Đồng thời cập nhật cờ hoàn học phí ở nhiều nơi:
       |    * sale_order_id.opportunity_id.th_is_refunded_tuition = True
       |    * sale_order_id.th_is_refund_tuition = False
       |    * move.th_is_refunded_tuition = True
       |    * move.th_crm_lead_id.th_is_refunded_tuition = True
       | 7. Nếu `sale_order_id.opportunity_id` tồn tại → tính lại level và cập nhật lại `stage_id` cho cơ hội
       | 8. Cuối cùng → ghi log note vào cơ hội: "Đơn hàng cơ hội đã được hoàn học phí!"



3.4. Quản lý Hồ sơ và đợt bàn giao hồ sơ ``[C4: COS-SAM-CRM-005]``
--------------------------------------------

**``crm.lead.action_create_profile()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Nhấn "Tạo hồ sơ" trên Formview cơ hội
   * - Logic
     - | 1. Kiểm tra cơ hội hiện tại → chỉ xử lý 1 bản ghi ensure_one()
       | 2. Khởi tạo giá trị mặc định ban đầu → lưu `stage` hiện tại vào `th_withdraw_profile_id`, mặc định trạng thái bàn giao hồ sơ là `not_handed`
       | 3. Kiểm tra đã có hồ sơ chưa → tìm `th.student.profile` theo `th_lead_id = self.id`
       | 4. Nếu đã có hồ sơ `profile_exist`:
       |    * gán lại `self.th_student_profile_id = profile_exist`
       |    * Nếu `th_auto_next_level()` tìm được level → cập nhật lại `stage_id`
       | 5. Nếu chưa có hồ sơ → mở popup tạo mới th.student.profile
       | 6. Khi mở popup → truyền sẵn context default_* từ cơ hội và partner, gồm thông tin cơ hội, nguồn, khách hàng, trạng thái hồ sơ mặc định và toàn bộ thông tin cá nhân/địa chỉ để đỡ nhập lại
   * - Lưu ý
     - Trên popup tạo hồ sơ nhập đủ thông tin cần thiết, sau đó ấn nút "Lưu" để tạo hồ sơ



**``crm.lead.action_withdraw_profile()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Nhấn "Rút hồ sơ" trên Formview cơ hội
   * - Logic
     - | 1. Kiểm tra có stage lưu trước khi tạo hồ sơ không → dùng `th_withdraw_profile_id`
       | 2. Nếu có và cơ hội chưa ở trạng thái `is_won` → trả `stage_id` về stage cũ
       | 3. Xoá hồ sơ đang gắn với cơ hội `th_student_profile_id.unlink()` và gỡ liên kết `th_student_profile_id = False`
       | 4. Cuối cùng → gọi lại `th_auto_next_level()` để tính lại level theo trạng thái mới


**``th.profile.handover.session.action_take_profile()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Ấn nút "Duyệt hồ sơ" trong Formview đợt bàn giao hồ sơ
   * - Logic
     - | 1. Kiểm tra quyền người dùng → chỉ user thuộc nhóm `th_group_leader_pms` mới được phép dùng chức năng này
       | 2. Nếu đủ quyền → tìm danh sách hồ sơ `th.student.profile` theo `th_origin_id`, trạng thái `th_handover_status=handing_over`, chưa được chọn bàn giao `th_selected_handover=False`, và chưa bàn giao `th_check_handover=False`
       | 3. Nếu tìm thấy hồ sơ phù hợp → gán các hồ sơ đó vào đợt bàn giao hiện tại qua `th_handover_list_id = self.id`. Mở popup danh sách hồ sơ dạng tree để người dùng xem/chọn tiếp, kèm context phục vụ luồng bàn giao
       | 4. Nếu không có hồ sơ phù hợp → báo lỗi không có hồ sơ hoặc hồ sơ đã được chọn ở đợt bàn giao khác


**``th.student.profile.th_action_select_profile_handover()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Chọn các hồ sơ cần thêm vào đợt bàn giao và ấn nút "Thêm vào danh sách"
   * - Logic
     - | Đánh dấu trường hồ sơ được chọn `th_selected_handover=True`


**``th.profile.handover.session.action_open_profile()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Bấm smart button "Hồ sơ đã chọn" trên Formview đợt bàn giao hồ sơ
   * - Logic
     - | 1. Tìm và hiển thị những hồ sơ thuộc đợt bàn giao hồ sơ `th_handover_list_id=self.id` và có `th_check_handover=True`
       | 2. Mở popup hiển thị danh sách hồ sơ tìm được


**``th.student.profile.th_action_cancel_select_profile_handover()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Bấm smart button "Hồ sơ đã chọn" trên Formview đợt bàn giao hồ sơ
   * - Logic
     - | 1. Bỏ chọn hồ sơ khỏi đợt bàn giao (`rec.th_selected_handover=False`)
       | 2. Bỏ liên kết với đợt bàn giao `rec.th_handover_list_id=False`


**``th.student.profile.th_action_cancel_select_profile_handover()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Bấm smart button "Hồ sơ đã chọn" trên Formview đợt bàn giao hồ sơ
   * - Logic
     - | 1. Kiểm tra quyền người dùng → chỉ nhóm `th_pms.th_group_leader_pms` mới được bàn giao hồ sơ
       | 2. Với từng đợt bàn giao `rec` → nếu chưa có hồ sơ nào được chọn (`th_student_selected_profile_count = 0`) thì báo lỗi
       | 3. Nếu đã có hồ sơ được chọn → lấy danh sách hồ sơ thuộc đợt bàn giao hiện tại `th_handover_list_id = self.id` và đã được chọn `th_selected_handover = True`
       | 4. Sau đó → gọi `change_handover_status()` để chuyển trạng thái các hồ sơ sang bước bàn giao
       | 5. Cuối cùng → cập nhật trạng thái đợt bàn giao `rec.state = waiting`


**``th.student.profile.change_handover_status()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Dùng khi hàm `th_action_cancel_select_profile_handover()` được gọi
   * - Logic
     - | 1. Lấy ngày bàn giao `th_date_of_delivery` → ưu tiên lấy từ `th_handover_list_id.th_date_of_delivery`, nếu không có thì lấy ngày hiện tại
       | 2. Cập nhật hàng loạt các hồ sơ đang chọn → set `th_handover_status = handed_over`, `th_check_handover = True`, `th_date_of_delivery = th_date_of_delivery`
       | 3. Cuối cùng → trả về True để báo xử lý xong


3.5. Danh sách xét tuyển ``[C4: COS-SAM-CRM-006]``
--------------------------------------------

**``th.admission.list.action_check_list()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Người dùng upload file danh sách xét tuyển và bấm nút "Duyệt danh sách"
   * - Logic
     - | 1. Kiểm tra file danh sách xét tuyển → nếu chưa có file thì báo lỗi
       | 2. Có file → đọc file Excel và lấy danh sách mã cơ hội ở cột đầu tiên
       | 3. Tìm các cơ hội theo danh sách mã cơ hội (`name_id_sequence`), trường học (`th_origin_id`), chưa được xét tuyển (`th_check_admission:False`), không phải cơ hội trùng (`th_is_a_duplicate_opportunity=False`)
       | 4. Nếu tìm thấy cơ hội phù hợp → cập nhật các cơ hội đó: Thêm danh sách xét tuyển (`th_admission_list_id`) và đã được xét tuyển (`th_check_admission=True`)
       | 5. Cập nhật xong toàn bộ → đánh dấu đợt xử lý đã hoàn thành (`th_settlement_batch=True`)
   * - Lưu ý
     - Là bước đưa lead vào quy trình xét tuyển chính thức


**``th.admission.list.action_open_crm_lead()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Người dùng ấn smart button danh sách cơ hội thuộc đợt xét tuyển
   * - Logic
     - | Mở action list cơ hội đã gắn với đợt xét tuyển hiện tại


3.6. Quyết định trúng tuyển ``[C4: COS-SAM-CRM-007]``
--------------------------------------------

**``th.admission.decision.th_action_confirm()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Người dùng upload file danh sách xét tuyển và bấm  nút "Xác nhận"
   * - Logic
     - | 1. Kiểm tra file kết quả trúng tuyển → nếu chưa có file thì báo lỗi
       | 2. Có file → đọc Excel và lấy danh sách thông tin từng dòng như: mã cơ hội, khóa, lớp chuyên ngành, quyết định, mã sinh viên
       | 3. Tìm các cơ hội theo danh sách mã cơ hội (`name_id_sequence`), trường (`th_origin_id`), được xét tuyển (`th_check_admission=True`), và thuộc đúng danh sách xét tuyển (`th_admission_list_id in rec.th_admission_list_id.ids`)
       | 4. Với các cơ hội tìm được → cập nhật kết quả trúng tuyển (`th_admission_decision`), mã sinh viên (`th_student_code`), khóa (`th_class`), lớp chuyên ngành (`th_class_detail`), trạng thái xét tuyển (`th_admission_status`), tên quyết định (`th_acceptance`)
       | 5. Cập nhật xong → đánh dấu danh sách xét tuyển đã có quyết đinh trúng tuyển (`th_settlement=True`)
       | 6. Cuối cùng → chuyển trạng thái của đợt danh sách khai giảng sang đã hoàn thành (`state=True`)


**``th.admission.decision.action_open_crm_lead()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Người dùng ấn smart button danh sách cơ hội thuộc quyết đinh trúng tuyển
   * - Logic
     - | Mở action list các cơ hội gắn với quyết định hiện tại


3.7. Danh sách khai giảng ``[C4: COS-SAM-CRM-008]``
---------------------------------------------------

**``th.enrollment.list.th_action_confirm()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Người dùng upload file danh sách khai giảng và bấm  nút "Xác nhận"
   * - Logic
     - | 1. Kiểm tra file danh sách nhập học → nếu chưa có file thì báo lỗi
       | 2. Có file → đọc Excel và lấy mã cơ hội trong từng dòng
       | 3. Tìm cơ hội theo mã cơ hội (`name_id_sequence`) và trường học (`th_origin_id`)
       | 4. Nếu cơ hội thuộc danh sách cơ hội có quyết định (`th_decision_id in self.th_admission_decision_id.id`) và đã trúng tuyển (`th_admission_decision=True`) → cập nhật cơ hội: Thêm danh sách khai giảng (`th_enrollment_list_id`) và đã trong danh sách khai giảng (`th_enrollment_list=True`)
       | 5. Cập nhật xong → đánh dấu quyết định đã có danh sách khai giảng (`th_added_enrollment_list=True`)
       | 6. Cuối cùng → chuyển trạng thái Formview danh sách khai giảng sang hoàn thành (`state=complete`)


**``th.enrollment.list.action_open_opportunity_enrollment()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Người dùng ấn smart button danh sách cơ hội thuộc danh sách khai giảng
   * - Logic
     - | Mở action list các cơ hội gắn với quyết định hiện tại


3.8. Tự động chuyển level ``[C4: COS-SAM-CRM-009]``
---------------------------------------------------

**````** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Được gọi sau các thay đổi về đơn hàng hóa đơn, hồ sơ, đợt bàn giao hồ sơ, xét tuyển
   * - Logic
     - | 1. Tìm toàn bộ hóa đơn `account.move` gắn với cơ hội
       | 2. Tìm toàn bộ đơn hàng `sale.order` gắn với cơ hội
       | 3. Nếu stage hiện tại đã là stage thắng (`is_won`) thì dừng
       | 4. Gọi `_get_invoice_condition()` để xác định trạng thái của đơn hàng hóa đơn.
       | 5. Nếu `_get_invoice_condition()` trả `None` thì dừng vì có hóa đơn thuộc loại `out_refund` và nó đã được thanh toán 1 phần hoặc đầy đủ 
       | 6. Dựng domain tìm `th.level.condition` theo điều kiện hóa đơn, đơn hàng.
       | 7. Ghép thêm điều kiện hồ sơ từ ``_get_profile_condition()``
       | 8. Tìm level condition phù hợp đầu tiên và trả về


**``crm.lead._get_invoice_condition(accounts, sale_order)``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Hàm con được gọi từ `th_auto_next_level()`
   * - Logic
     - | 1. Nếu chưa có hóa đơn thì trả `no_order`
       | 2. Nếu có hóa đơn refund đã thanh toán một phần/đủ thì trả `None` để dừng nhảy level
       | 3. Nếu có đơn tổng hợp: tất cả hóa đơn paid/overpaid → `handed_over_full` hoặc có thanh toán một phần → `handed_over_partial_tuition` hoặc tất cả chưa thanh toán → `no_order`
       | 4. Nếu không có đơn tổng hợp mà có đủ đơn học phí + lệ phí: tất cả hóa đơn paid/overpaid → `handed_over_full` hoặc có thanh toán một phần → `handed_over_partial_tuition` hoặc tất cả chưa thanh toán → `no_order`
       | 5. Nếu không có đơn tổng hợp mà chưa đủ đơn học phí + lệ phí: có thanh toán một phần → `handed_over_partial_tuition` hoặc tất cả chưa thanh toán → `no_order`
   * - Lưu ý
     - Đây là lõi xác định điều kiện thanh toán hóa đơn cho luồng tự động nhảy level


**``crm.lead._get_profile_condition()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Hàm con được gọi từ `th_auto_next_level()`
   * - Logic
     - | 1. Kiểm tra có hồ sơ: `th_no_profile = True/False` theo `rec.th_student_profile_id`
       | 2. Xác định trạng thái đủ hồ sơ: `enough_profile = True/False` theo `th_handover_status` hoặc `th_check_admission`
       | 3. Xử lý theo trạng thái hồ sơ `th_profile_status`:
       |    * Thiếu/tối thiểu → `th_missing_profile=True`, `th_enough_profile=enough_profile`, `th_handed_over_profile=enough_profile` 
       |    * Đủ → `th_enough_profile=True`, `th_handed_over_profile=enough_profile`
       |    * Thiếu/tối thiểu → `th_missing_profile=False`, `th_enough_profile=False`, `th_handed_over_profile=False` 
       | 4. Bổ sung điều kiện tuyển sinh: quyết đinh trúng tuyển (`th_admission_decision`) và danh sách khai giảng (`th_enrollment_list`)
       | 5. Trả về domain
   * - Lưu ý
     - Đây là hook mở rộng domain thêm điều kiện hồ sơ, đợt bàn giao hồ sơ, quyết định trúng tuyển và danh sách khai giảng cho `th_auto_next_level`


3.9. Chia cơ hội ``[C4: COS-SAM-CRM-010]``
--------------------------------------------

**``crm.lead.th_action_assign_user()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Trưởng nhóm chọn nhiều cơ hội → chia
   * - Logic
     - | 1. Mở wizard `crm.lead.reuse` chọn phương thức chia (cá nhân / vòng chia)
       | 2. Nếu vòng chia → chia đều cơ hội cho thành viên trong vòng
       | 3. Nếu cá nhân → gán cho người được chọn
       | 4. Cập nhật mối quan hệ, nhóm tình trạng, trạng thái chi tiết (nếu có chọn)
   * - Lưu ý
     - Hàm này chỉ là điểm mở wizard; việc chia cụ thể diễn ra trong wizard


**``th.dividing.ring.action_assign_leads_dividing_ring()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Được gọi khi hệ thống cần lấy người phụ trách tiếp theo từ vòng chia
   * - Logic
     - | 1. Lấy danh sách user trong vòng chia và sắp xếp
       | 2. Đọc `th_flag` hiện tại để biết vị trí thành viên đang đến lượt
       | 3. Trả về user ở vị trí hiện tại
       | 4. Tăng cờ sang user kế tiếp và lưu lại `th_flag`


**``crm.lead.reuse.open_lead()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Khi ấn nút "Xác nhận" trên popup chia cơ hội 
   * - Logic
     - | 1. Kiểm tra danh sách cơ hội đang chọn `active_ids` → nếu có cơ hội đang trong hàng đợi (th_check_waiting_lead_qty > 0) hoặc là cơ hội cần xóa khi tái kho (th_check_unlink_record = True) thì chặn không cho chia
       | 2. Nếu hợp lệ → đánh dấu các cơ hội đang được đưa vào hàng đợi bằng `th_check_waiting_lead = True`
       | 3. Nếu chia theo vòng `th_select_type = ring` → kiểm tra vòng chia (`th_dividing_ring_id`) đã có thành viên chưa, nếu chưa có thì báo lỗi
       | 4. Nếu đang ở luồng cơ hội trong kho (`default_th_storage=True`) → chặn không cho chia cơ hội trong kho
       | 5. Nếu là luồng chia cơ hội (`action_assign=True`) → chia danh sách `active_ids` thành từng batch 100 bản ghi
       | 6. Với từng batch → đưa job chia cơ hội `th_divide_lead` và job hoàn tất `th_finish_divide_lead` vào queue, chạy theo chuỗi chain(...).delay()
       | 7. Cuối cùng → gửi notification báo cho người dùng biết cơ hội đang được chia và không thao tác chia lại nữa
   * - Lưu ý
     - Hàm này sẽ đưa danh sách cơ hội vào queue job để xử lý nền


3.10. Thu hồi cơ hội về kho ``[C4: COS-SAM-CRM-011]``
--------------------------------------------

**``crm.lead.th_action_archive()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Người dùng chọn nhiều cơ hội và nhấn "Thu hồi về kho"
   * - Logic
     - | 1. Đánh dấu toàn bộ cơ hội đang chọn → `th_check_waiting_lead = True` để tránh thao tác trùng
       | 2. Chia danh sách cơ hội `self.ids` thành từng batch 100 bản ghi
       | 3. Với từng batch → đưa job lưu kho `th_archive_lead()` vào queue
       | 4. Sau khi xử lý xong từng batch → gọi job hoàn tất `th_finish_divide_lead()`
       | 5. Cuối cùng → reload lại giao diện để cập nhật dữ liệu mới


**``crm.lead.th_archive_lead()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Gọi khi hàm `th_action_archive()` được gọi
   * - Logic
     - | 1. Nhận danh sách cơ hội cần thu hồi data → cập nhật `th_storage = True` để đưa cơ hội về kho
       | 2. Tìm các bản ghi `ccs.lead` đang liên kết với các cơ hội này qua th_lead_id
       | 3. Nếu có liên kết `ccs.lead` → gỡ liên kết khỏi cơ hội (`th_lead_id = False`) và bỏ block cơ hội CSKH (`th_block_css = False`)


**``crm.lead.th_finish_divide_lead()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Sau khi hàm `th_archive_lead` được gọi
   * - Logic
     - | Cập nhật `th_check_waiting_lead = False` để bỏ cờ cơ hội đang trong hàng chờ xử lý


**``crm.lead.action_lead_reuse()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Người dùng ấn nút "Tái cơ hội" trong kho
   * - Logic
     - | 1. Mở popup chức năng tái cơ hội → dùng form crm.lead.reuse
       | 2. Truyền context `action_assign=True`, `reuse_lead=True` → để hệ thống hiểu đây là luồng tái sử dụng cơ hội
       | 3. Hiển thị popup dạng form target='new' → để người dùng thao tác trực tiếp trên cửa sổ bật lên
   * - Lưu ý
     - Chức năng chia cơ hội/tái kho đã được viết cùng hàm `crm.lead.reuse.open_lead()` ở luồng chia cơ hội


3.11. Lịch làm việc ``[C4: COS-SAM-CRM-012]``
---------------------------------------------

**``crm.lead.th_create_activities()``** — *Hàm mới*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Người dùng tạo lịch làm việc trên cơ hội
   * - Logic
     - | Mở popup ``mail.activity`` với mặc định là cơ hội hiện tại và người phụ trách hiện tại
   * - Lưu ý
     - Hỗ trợ tạo activity từ màn hình cơ hội.


**``mail.activity.create()``** — *Ghi đè hàm gốc*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Tạo mới activity trên cơ hội CRM
   * - Logic
     - | Khi tạo mới 1 lịch làm việc ở cơ hội sẽ tạo 1 bản ghi ở Tổng hợp lịch làm việc (`th.summary.activity`)


**``mail.activity.write()``** — *Ghi đè hàm gốc*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Tạo mới activity trên cơ hội CRM
   * - Logic
     - | Khi sửa 1 lịch làm việc ở cơ hội sẽ sửa bản ghi liên quan ở Tổng hợp lịch làm việc (`th.summary.activity`)


**``mail.activity.unlink()``** — *Ghi đè hàm gốc*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Tạo mới activity trên cơ hội CRM
   * - Logic
     - | Khi xóa 1 lịch làm việc ở cơ hội sẽ xóa bản ghi liên quan ở Tổng hợp lịch làm việc (`th.summary.activity`)


**``th.summary.activity.th_action_mark_as_done()``** — *Ghi đè hàm gốc*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Người dùng ấn nút "Hoàn thành" trong Formview Lịch làm việc
   * - Logic
     - | Nếu có gán lịch làm việc và đang ở trạng thái `state!=done` → gọi `rec.th_activity_id._action_done()`


**``mail.activity._action_done()``** — *Ghi đè hàm gốc*

.. list-table::
   :widths: 20 80

   * - Trigger
     - Người dùng đánh dấu hoàn thành activity
   * - Logic
     - | Cập nhật trạng thái hoàn thành ở lịch làm việc và ghi log note vào cơ hội


4. Mở rộng & Ghi đè (Odoo Inheritance)
========================================

.. Hướng dẫn: Liệt kê model nào kế thừa từ module Odoo gốc nào.
.. Nội dung này gộp từ extension.rst cũ.


4.1. ``crm.lead`` (từ module gốc ``crm``)
-----------------------------------------

**Hàm ghi đè:**

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Hàm
     - Thay đổi so với gốc
   * - ``create``
     - Thêm: tự tạo/gắn partner, hỗ trợ import, sinh mã cơ hội, check trùng và gán user theo vòng chia.
   * - ``write``
     - Thêm: cập nhật ngày liên hệ cuối, lưu partner cũ, kiểm tra lại trùng cơ hội và xét chuyển level tự động.
   * - ``unlink``
     - Thêm: kiểm tra điều kiện nghiệp vụ trước khi xóa cơ hội.
   * - ``action_sale_quotations_new``
     - Thêm: mở luồng tạo đơn hàng CRM với context riêng và giới hạn sản phẩm theo CRM.
   * - ``_message_add_suggested_recipient``
     - Thêm: điều chỉnh gợi ý người nhận theo ngữ cảnh cơ hội CRM.

**View thay đổi:**

- ``crm_views.xml``: Kế thừa form/tree/search view → thêm các trường custom, button nghiệp vụ, domain, readonly và logic hiển thị riêng cho CRM.
- ``archives_view.xml``: Kế thừa tree view kho cơ hội → thêm thao tác thu hồi/tái cơ hội.
- ``th_admission_list_views.xml``: Liên kết hiển thị cơ hội trong luồng xét tuyển.

**Menu thay đổi:**

- Ẩn: ``crm.res_partner_menu_customer``, ``crm.menu_crm_lost_reason``
- Thêm/sửa quyền: ``crm.crm_menu_root``, ``crm.crm_menu_config``
- Thêm: action/menu kho cơ hội và điều hướng cơ hội theo trường học


4.2. ``crm.team`` (từ module gốc ``crm`` / ``sales_team``)
-----------------------------------------------------------

**Hàm ghi đè:**

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Hàm
     - Thay đổi so với gốc
   * - ``create``
     - Thêm: chuẩn hóa dữ liệu đội nhóm và cập nhật cờ chia/leader khi tạo.
   * - ``write``
     - Thêm: cập nhật lại quản lý, thành viên và thông tin nhóm cha khi sửa đội.
   * - ``unlink``
     - Thêm: kiểm tra ràng buộc nghiệp vụ trước khi xóa đội.

**View thay đổi:**

- ``crm_team.xml``: Kế thừa form/tree view → thêm trường học, nhóm cha, leader và các field phục vụ phân công cơ hội.

**Menu thay đổi:**

- Sửa hiển thị/cấu hình menu đội CRM hiện có.


4.3. ``crm.stage`` (từ module gốc ``crm``)
------------------------------------------

**Hàm ghi đè:**

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Hàm
     - Thay đổi so với gốc
   * - ``create``
     - Thêm: chuẩn hóa dữ liệu stage và kiểm tra ràng buộc nghiệp vụ khi tạo.
   * - ``action_active_stage``
     - Thêm: action kỹ thuật để kích hoạt stage theo logic CRM.
   * - ``th_check_name``
     - Thêm: kiểm tra trùng tên stage trong ngữ cảnh CRM.
   * - ``th_check_is_won``
     - Thêm: kiểm tra tính hợp lệ của stage thắng/stage cuối.

**View thay đổi:**

- ``crm_stage.xml``: Kế thừa form/tree view → thêm field ``th_type``, ``th_auto``, ``th_auto_move_into_warehouse``, ``th_required_fill``.

**Menu thay đổi:**

- Sửa menu mối quan hệ/stage để phù hợp nghiệp vụ CRM.


4.4. ``sale.order`` (từ module gốc ``sale``)
---------------------------------------------

**Hàm ghi đè:**

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Hàm
     - Thay đổi so với gốc
   * - ``create``
     - Thêm: đánh dấu đơn hàng CRM, sao chép dữ liệu từ cơ hội, tự xác nhận đơn và tạo hóa đơn nếu đi từ luồng CRM.
   * - ``write``
     - Thêm: cập nhật các trạng thái nghiệp vụ của đơn CRM khi chỉnh sửa.
   * - ``action_cancel``
     - Thêm: chỉ admin CRM mới được hủy đơn CRM.
   * - ``th_action_create_invoices``
     - Thêm: tạo hóa đơn hàng loạt theo batch/queue job.
   * - ``th_create_new_invoice``
     - Thêm: xử lý tạo hóa đơn cho batch đơn hàng CRM.
   * - ``th_action_create_refund_invoice``
     - Thêm: mở wizard hoàn tiền cho đơn CRM.

**View thay đổi:**

- ``sale_order_view.xml``: Kế thừa form/tree/search view → thêm field CRM, button chờ xác nhận/hoàn tiền, ribbon trạng thái và filter riêng.

**Menu thay đổi:**

- Thêm menu đơn hàng trong CRM.
- Ẩn/sửa menu báo giá CRM gốc.


4.5. ``account.move`` (từ module gốc ``account``)
-------------------------------------------------

**Hàm ghi đè:**

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Hàm
     - Thay đổi so với gốc
   * - ``create``
     - Thêm: gắn hóa đơn với cơ hội CRM, sao chép dữ liệu liên quan, ghi log note và gọi xét chuyển level.
   * - ``js_assign_outstanding_line``
     - Thêm: đồng bộ trạng thái thanh toán cho hóa đơn CRM khi đối trừ công nợ.
   * - ``js_remove_outstanding_partial``
     - Thêm: cập nhật lại trạng thái thanh toán khi bỏ đối trừ.
   * - ``_compute_payment_state``
     - Thêm: điều chỉnh cách tính trạng thái thanh toán theo ngữ cảnh CRM.
   * - ``_compute_th_payment_status``
     - Thêm: tính trạng thái thanh toán riêng dùng cho logic CRM.

**View thay đổi:**

- ``account_move_view.xml``: Kế thừa form/tree/search view → thêm field CRM như trường học, ngành, người giới thiệu, đơn vị sở hữu, trạng thái xét tuyển.

**Menu thay đổi:**

- Không thêm menu riêng mới; chủ yếu mở rộng màn hình và logic hóa đơn.


4.6. ``mail.activity`` (từ module gốc ``mail``)
-----------------------------------------------

**Hàm ghi đè:**

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Hàm
     - Thay đổi so với gốc
   * - ``create``
     - Thêm: khi activity gắn với ``crm.lead`` thì tạo thêm bản ghi tổng hợp ở ``th.summary.activity``.
   * - ``write``
     - Thêm: đồng bộ thay đổi của activity sang bảng tổng hợp.
   * - ``_action_done``
     - Thêm: cập nhật bảng tổng hợp và ghi log note vào cơ hội khi hoàn thành activity.
   * - ``unlink``
     - Thêm: gỡ liên kết tổng hợp trước khi xóa activity.
   * - ``action_close_dialog``
     - Thêm: hỗ trợ tạo một activity cho nhiều cơ hội từ cùng một popup.
   * - ``_default_activity_type_for_model``
     - Thêm: điều chỉnh activity type mặc định theo model CRM.

**View thay đổi:**

- ``th_view_mail_activity.xml``: Kế thừa form/tree/search view activity → bổ sung dữ liệu deadline, bộ lọc và liên kết đến CRM.
- ``th_summary_activities_view.xml``: Thêm màn hình tổng hợp lịch làm việc từ activity CRM.

**Menu thay đổi:**

- Không có menu riêng mới; thay đổi chủ yếu ở hành vi popup và màn hình activity.


4.7. Tổng hợp các model kế thừa khác
------------------------------------

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Model gốc
     - Thay đổi chính
   * - ``mail.message``
     - Bổ sung liên kết ``crm_lead_id`` để gắn log note/message với cơ hội CRM.
   * - ``res.partner``
     - Điều chỉnh dữ liệu liên hệ phục vụ CRM, trong đó điện thoại bắt buộc và có thêm mapping ID từ hệ thống ngoài.
   * - ``res.users``
     - Bổ sung quan hệ nhiều quản lý CRM cho mỗi người dùng.
   * - ``th.status.category``
     - Bổ sung danh sách stage CRM áp dụng cho từng nhóm tình trạng.
   * - ``th.status.detail``
     - Bổ sung danh sách stage CRM áp dụng và các cờ điều khiển luồng như chuyển kho, tạo lead, có nhu cầu.
   * - ``crm.tag``
     - Bổ sung liên kết ngược từ tag về danh sách cơ hội đang gắn tag.
   * - ``th.ownership.unit``
     - Bổ sung đội giám sát và đội CSKH mặc định cho đơn vị sở hữu.
   * - ``th.origin``
     - Mở rộng trường học để phục vụ điều hướng nhanh sang danh sách cơ hội/kho cơ hội.
   * - ``data_merge.model``
     - Tùy biến logic tìm trùng để áp dụng riêng cho ``crm.lead``.
   * - ``data_merge.group``
     - Tùy biến cách chọn bản ghi master và merge dữ liệu cho nhóm trùng là cơ hội CRM.
   * - ``data_merge.record``
     - Bổ sung thông tin CRM như trường học, điện thoại, email, ngày và loại trùng để hỗ trợ merge.
   * - ``th.formio.builder.field.aff.default``
     - Bổ sung cấu hình đội CRM, vòng chia, nhóm tình trạng và trạng thái chi tiết mặc định khi đổ lead từ form.
   * - ``product.template``
     - Điều chỉnh giá trị mặc định/danh mục khi mở sản phẩm trong ngữ cảnh CRM.



5. Phân quyền
=============

.. Hướng dẫn: Chi tiết kỹ thuật — ai có quyền gì trên model/menu nào.
.. business.rst Section 2 mô tả "ai dùng để làm gì" (góc nhìn nghiệp vụ).
.. Section này mô tả "ai có quyền gì" (góc nhìn kỹ thuật).
.. Nội dung này gộp từ security.rst cũ.


5.1. Groups cơ bản
------------------

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Group
     - Quyền chính
   * - **Nhân viên**
     - Xem/sửa cơ hội ngoài kho mình phụ trách. Xem kho cơ hội của chính mình. Xem lịch làm việc của chính mình hoặc của cơ hội mình phụ trách.
   * - **Trưởng nhóm**
     - Như Nhân viên + tạo mới cơ hội + xem/sửa cơ hội của thành viên mình quản lý + xem kho cơ hội của nhóm + xem cơ hội trùng + theo dõi năng suất + thao tác danh sách xét tuyển và quyết định trúng tuyển.
   * - **Quản trị viên**
     - Toàn quyền trên CRM: xem/sửa/tạo/xóa toàn bộ cơ hội, xem toàn bộ lịch làm việc, truy cập cấu hình CRM, báo cáo CRM, xét tuyển, quyết định trúng tuyển, danh sách khai giảng và các menu quản trị liên quan.


5.2. Groups bổ sung
-------------------

.. list-table::
   :header-rows: 1
   :widths: 25 40 35

   * - Group
     - Mục đích
     - Mở thêm menu
   * - **TVTS – Xét tuyển**
     - Dùng cho người tham gia nghiệp vụ xét tuyển và theo dõi danh sách trúng tuyển.
     - ``Danh sách xét tuyển``, ``Quyết định trúng tuyển``
   * - **Quản lý hồ sơ**
     - Dùng cho người cần theo dõi nghiệp vụ hồ sơ liên quan CRM.
     - Không mở menu riêng, chủ yếu dành cho rule hồ sơ sinh viên bên module hồ sơ
   * - **Tạo và theo dõi cơ hội**
     - Dùng cho nhóm được phép tạo cơ hội và theo dõi cơ hội theo đơn vị sở hữu và đội giám sát, thường cho MKT.
     - ``Cơ hội đang trùng`` và các menu CRM cơ bản theo quyền được cấp
   * - **CRM: Theo dõi cơ hội của đối tác**
     - Dùng để xem dữ liệu cơ hội thuộc sở hữu đối tác.
     - Không mở menu riêng; chủ yếu mở quyền đọc trên cơ hội, đơn hàng, hóa đơn liên quan đối tác


5.3. Record Rules
-----------------

.. list-table::
   :header-rows: 1
   :widths: 25 50 25

   * - Model
     - Rule
     - Áp dụng cho
   * - ``crm.lead``
     - Chỉ xem/sửa cơ hội ngoài kho do chính mình phụ trách.
     - **Nhân viên**
   * - ``crm.lead``
     - Chỉ đọc cơ hội trong kho do chính mình phụ trách.
     - **Nhân viên**
   * - ``crm.lead``
     - Xem/sửa/tạo cơ hội ngoài kho của mình, của nhân viên mình quản lý/ của cơ hội do mình tạo/ của trường mình quản lý chương trình CRM.
     - **Trưởng nhóm**
   * - ``crm.lead``
     - Chỉ đọc cơ hội trong kho của mình, của nhân viên mình quản lý/ của cơ hội do mình tạo/ của trường mình quản lý chương trình CRM.
     - **Trưởng nhóm**
   * - ``crm.lead``
     - Xem/sửa/tạo/xóa toàn bộ cơ hội, không giới hạn domain.
     - **Quản trị viên**
   * - ``crm.lead``
     - Xem/sửa/tạo/xóa cơ hội ngoài kho nếu user là quản lý chương trình/ thuộc đội giám sát/ đội CSKH/ là người phụ trách.
     - **Chăm sóc khách hàng**
   * - ``crm.lead``
     - Chỉ đọc cơ hội trong kho nếu user là quản lý chương trình/ thuộc đội giám sát/ đội CSKH/ là người phụ trách.
     - **Chăm sóc khách hàng**
   * - ``crm.lead``
     - Xem/sửa/tạo/xóa cơ hội ngoài kho nếu user thuộc đội giám sát của đơn vị sở hữu/ là người tạo/ là người thắng khi check trùng/ thuộc quản lý chương trình MKT của trường.
     - **Tạo và theo dõi cơ hội**
   * - ``crm.lead``
     - Chỉ đọc cơ hội trong kho theo cùng điều kiện trên.
     - **Tạo và theo dõi cơ hội**
   * - ``crm.lead``
     - Chỉ đọc cơ hội thuộc sở hữu đối tác.
     - **CRM: Theo dõi cơ hội của đối tác**
   * - ``sale.order``
     - Chỉ xem đơn hàng của cơ hội do mình phụ trách hoặc do nhân viên mình quản lý phụ trách.
     - **Trưởng nhóm**
   * - ``th.summary.activity``
     - Chỉ xem activity của chính mình hoặc activity thuộc cơ hội do mình phụ trách.
     - **Nhân viên**
   * - ``th.summary.activity``
     - Xem activity của mình, của nhân viên mình quản lý hoặc của trường mình quản lý chương trình CRM.
     - **Trưởng nhóm**
   * - ``th.summary.activity``
     - Xem toàn bộ activity.
     - **Quản trị viên**
   * - ``th.summary.activity``
     - Xem activity nếu thuộc đội giám sát, đội CSKH hoặc người phụ trách liên quan.
     - **Chăm sóc khách hàng**
   * - ``th.summary.activity``
     - Xem activity nếu thuộc đội giám sát đơn vị sở hữu, người tạo hoặc MKT của trường.
     - **Tạo và theo dõi cơ hội**


6. Tích hợp Kỹ thuật
=====================

.. Hướng dẫn: Mô tả module gọi/được gọi bởi module nào, qua cơ chế kỹ thuật gì.
.. business.rst Section 5 mô tả liên kết nghiệp vụ (data chảy đi đâu).
.. Section này mô tả cách thực hiện kỹ thuật.
.. Nếu có API riêng → tham chiếu đến api.rst.

.. list-table::
   :header-rows: 1
   :widths: 20 15 65

   * - Module
     - Hướng
* - ``sale_crm`` / ``sale``
     - CRM → Sale
     - Gọi trực tiếp qua ORM: ``crm.lead.action_sale_quotations_new()`` mở luồng tạo ``sale.order`` từ ``opportunity_id``; ``sale.order.create()`` xử lý riêng cho đơn CRM, sao chép dữ liệu từ cơ hội và có thể tự xác nhận đơn.
   * - ``account``
     - CRM → Finance
     - Gọi trực tiếp qua ORM: từ ``sale.order.create()`` hoặc các wizard tạo hóa đơn/hoàn tiền để sinh ``account.move``; ``account.move.create()`` gắn ngược hóa đơn về ``crm.lead`` qua ``th_crm_lead_id`` và cập nhật trạng thái thanh toán.
   * - ``mail``
     - CRM ↔ Mail
     - Override ``mail.activity`` và ``mail.message`` để đồng bộ lịch làm việc/log note với cơ hội CRM; khi tạo/sửa/hoàn thành activity thì sinh/cập nhật ``th.summary.activity`` và ghi log note về ``crm.lead``.
   * - ``th_setup_parameters``
     - Setup → CRM
     - Đọc cấu hình dùng chung qua ``env.ref(...)`` và system parameter: module CRM, trường học mặc định, kênh web/chat web, kênh không xác định, danh mục áp dụng, domain theo module.
   * - ``data_merge``
     - CRM ↔ Data Merge
     - Kế thừa ``data_merge.model``, ``data_merge.group``, ``data_merge.record`` để tìm trùng và merge dữ liệu cho ``crm.lead``; gọi trực tiếp qua ORM và cron nội bộ.
   * - ``th_queue_job``
     - CRM → Queue Job
     - Xử lý batch nền qua ``with_delay(...)`` cho các tác vụ nặng như thu hồi lead về kho, xóa lead theo lịch, cập nhật team hàng loạt, tạo hóa đơn hàng loạt.
   * - ``formio.builder``
     - Form → CRM
     - Kế thừa ``formio.builder`` và các model cấu hình mặc định để sinh lead từ form nhúng; dùng ORM trực tiếp và cơ chế round-robin team/vòng chia để phân lead.
   * - ``product`` / ``product.category``
     - CRM → Product
     - Lọc sản phẩm/danh mục bằng ORM theo module CRM khi mở luồng tạo đơn hàng; ``product.template.default_get()`` được mở rộng để áp domain sản phẩm trong ngữ cảnh CRM.
   * - ``res.partner``
     - CRM ↔ Contact
     - Tạo/gắn partner trực tiếp trong ``crm.lead.create()`` và ``receive_data_from_module()``; đồng bộ dữ liệu địa chỉ, điện thoại, email từ partner sang lead qua compute/related logic.
   * - ``th.status.category`` / ``th.status.detail`` / ``th.check.condition`` / ``th.level.condition``
     - Setup → CRM
     - CRM đọc ma trận điều kiện qua ORM để xử lý check trùng và tự động chuyển level; các hàm chính là ``th_check_condition_lead()`` và ``th_auto_next_level()``.
   * - ``th.admission.list`` / ``th.admission.decision`` / ``th.enrollment.list``
     - CRM ↔ Xét tuyển
     - Tích hợp nội bộ qua ORM: cơ hội CRM được gắn vào danh sách xét tuyển, quyết định trúng tuyển và danh sách khai giảng; cập nhật trạng thái/field trên ``crm.lead`` từ các model nghiệp vụ này.
   * - ``ccs.lead``
     - CRM ↔ CSKH
     - CRM có gọi trực tiếp ``self.env['ccs.lead']`` trong một số luồng như thu hồi về kho, kiểm tra lead liên quan và đồng bộ trạng thái; đây là tích hợp ORM nội bộ nếu model CSKH tồn tại trong hệ thống.
   * - ``th_select_module``
     - CRM → Module nền
     - Dùng ``env.ref('th_select_module.th_refund_product')`` trong wizard hoàn tiền để lấy sản phẩm hoàn tiền mặc định.
   * - ``base`` / ``res.country.*`` / danh mục nền
     - Module nền → CRM
     - CRM đọc trực tiếp các danh mục nền như tỉnh/thành, quốc gia, quận/huyện, phường/xã, dân tộc, tôn giáo để chuẩn hóa dữ liệu liên hệ và dữ liệu tuyển sinh.


7. Cấu trúc Source Code
========================

.. Hướng dẫn: Mô tả folder/file layout chính — giúp dev mới biết tìm code ở đâu.
.. Không cần liệt kê toàn bộ file, chỉ cần cấu trúc tổng quan.

.. code-block:: text

   th_crm/
   ├── __manifest__.py
   ├── models/
   │   ├── crm_lead.py                           ← Model chính: cơ hội
   │   ├── crm_team.py                           ← Mở rộng đội nhóm
   │   ├── crm_stage.py                          ← Mở rộng stage
   │   ├── th_university.py                      ← Mở rộng trường học
   │   ├── res_partner.py                        ← Mở rộng partner
   │   ├── res_users.py                          ← Mở rộng người dùng
   │   ├── th_ownership_unit.py                  ← Mở rộng đơn vị sở hữu
   │   ├── check_condition.py                    ← Điều kiện check trùng
   │   ├── th_duplicate_check_history.py         ← Lịch sử kiểm tra trùng
   │   ├── account_move.py                       ← Mở rộng hóa đơn
   │   ├── sale_order.py                         ← Mở rộng đơn hàng
   │   ├── th_admission_list.py                  ← Danh sách cơ hội chờ xét tuyển
   │   ├── admission_decision.py                 ← Quyết định trúng tuyển
   │   ├── th_enrollment_list.py                 ← Danh sách khai giảng
   │   ├── sale_order.py                         ← Mở rộng đơn hàng
   │   ├── level_condition.py                    ← Điều kiện chuyển level tự động
   │   ├── sale_order.py                         ← Mở rộng đơn hàng
   │   ├── th_dividing_ring.py                   ← Cấu hình vòng chia
   │   ├── th_summary_activities.py              ← Lịch làm việc
   │   ├── th_training_system.py                 ← Hệ đào tạo
   │   └── mail_activity.py                      ← Mở rộng hoạt động
   ├── views/
   │   ├── crm_views.xml                         ← Views chính
   │   ├── archives_view.xml                     ← Views kho lưu trữ cơ hội
   │   ├── crm_stage.xml                         ← Mở rộng views stage
   │   ├── crm_team.xml                          ← Mở rộng views đội nhóm
   │   ├── account_move_view.xml                 ← Mở rộng views hóa đơn 
   │   ├── admission_decision_view.xml           ← Views quyết định trúng tuyển 
   │   ├── menus.xml                             ← Views danh sách menu module CRM
   │   ├── res_partner.xml                       ← Mở rộng views partner
   │   ├── sale_order_view.xml                   ← Mở rộng views đơn hàng 
   │   ├── th_admission_list_views.xml           ← Views danh sách xét tuyển
   │   ├── th_dividing_ring_view.xml             ← Views chia theo vòng chia cơ hội
   │   ├── th_duplicate_check_history_view.xml   ← Views danh sách khai giảng
   │   ├── th_level_condition_view.xml           ← Views điều kiện chuyển level tự động
   │   ├── th_ownership_unit_view.xml            ← Views đơn vị sở hữu
   │   ├── th_check_condition_view.xml           ← Views điều kiện check trùng lead
   │   ├── th_status_detail_view.xml             ← Views trạng thái chi tiết
   │   ├── th_summary_activities_view            ← Mở rộng views lịch làm việc
   │   ├── th_training_system.xml                ← Mở rộng views hệ đào tạo
   │   └── th_mail_message.xml                   ← Mở rộng views hoạt động
   ├── wizards/
   │   ├── crm_lead_reuse                        ← Tái sử dụng lead
   │   ├── th_activity_report                    ← Báo cáo tổng hợp lịch làm việc
   │   ├── th_refund_invoice                     ← Hoàn học phí
   │   ├── th_care_history                       ← Lịch sử chăm sóc
   │   └── duplicate_lead_notify                 ← Khiếu nại trùng cơ hội
   ├── security/
   │   ├── ir.model.access.csv
   │   └── crm_security.xml                      ← Groups + record rules
   ├── data/
   │   ├── crm_stage_data.xml                    ← Dữ liệu level mặc định
   │   ├── crm_team_data.xml                     ← Dữ liệu đội nhóm mặc định
   │   ├── ir_cron.xml                           ← Cron chạy tự động (schedule check trùng cơ hội crm và đồng bộ thông tin trùng sang AFF,...)
   │   └── th_data_module.xml                    ← Update dữ liệu module
   ├── static/
   │   ├── src
   │   │   ├── js
   │   │   │   ├── crm_lead_view.js              ← Custom js view lead
   │   │   │   ├── crm_university_kaban.js       ← Custom js view university kanban
   │   │   │   └── data_merge_list_view.xml      ← Xử lý view trùng
   │   │   ├── xml
   │   │   │   └── crm_lead_view.xml             ← Custom view lead

**Link repo:** `https://github.com/aumcntt/sambala/tree/master/th_crm`


8. Lịch sử Thay đổi Kỹ thuật
==============================

.. Hướng dẫn: Chỉ ghi thay đổi KỸ THUẬT LỚN: thêm model, refactor, thay đổi cấu trúc.
.. Cột Thời gian có thể để "(cần xác nhận)" với thay đổi cũ — bổ sung dần.

.. list-table::
   :header-rows: 1
   :widths: 20 50 30

   * - Thời gian
     - Thay đổi
     - Ảnh hưởng
   * - (cần xác nhận)
     - Khởi tạo module
     - -
   * - (cần xác nhận)
     - Mở rộng model trung tâm ``crm.lead``
     - Bổ sung nhiều field custom, override ``create/write`` và hình thành luồng CRM riêng cho cơ hội.
   * - (cần xác nhận)
     - Thêm hệ thống check trùng tự động
     - Bổ sung model ``th.duplicate.check.history``, ``th.check.condition``; ảnh hưởng trực tiếp đến logic tạo/sửa cơ hội.
   * - (cần xác nhận)
     - Bổ sung cơ chế vòng chia
     - Thêm model ``th.dividing.ring`` và logic round-robin; ảnh hưởng đến phân công user/team khi tạo hoặc chia lead.
   * - (cần xác nhận)
     - Tích hợp tạo đơn hàng từ CRM
     - Mở rộng ``sale.order`` và luồng ``action_sale_quotations_new()``; cơ hội có thể sinh đơn hàng trực tiếp.
   * - (cần xác nhận)
     - Tích hợp tạo hóa đơn và đồng bộ thanh toán về CRM
     - Mở rộng ``account.move``; ảnh hưởng đến trạng thái học phí/lệ phí, log note và chuyển level của cơ hội.
   * - (cần xác nhận)
     - Thêm cơ chế tự động chuyển level
     - Bổ sung model ``th.level.condition`` và nhóm hàm ``th_auto_next_level()``; ảnh hưởng tới stage của cơ hội theo thanh toán/hồ sơ/xét tuyển.
   * - (cần xác nhận)
     - Thêm luồng xét tuyển
     - Bổ sung model ``th.admission.list`` và màn hình nhập/xử lý file danh sách xét tuyển.
   * - (cần xác nhận)
     - Thêm luồng quyết định trúng tuyển
     - Bổ sung model ``th.admission.decision``; ảnh hưởng đến cập nhật kết quả trúng tuyển, mã sinh viên, lớp học và trạng thái xét tuyển trên ``crm.lead``.
   * - (cần xác nhận)
     - Thêm luồng danh sách khai giảng
     - Bổ sung model ``th.enrollment.list``; ảnh hưởng tới trạng thái khai giảng của cơ hội.
   * - (cần xác nhận)
     - Bổ sung tổng hợp lịch làm việc CRM
     - Thêm model ``th.summary.activity`` và mở rộng ``mail.activity``; ảnh hưởng đến theo dõi deadline và lịch sử chăm sóc.
   * - (cần xác nhận)
     - Mở rộng quản lý đội nhóm và stage CRM
     - Refactor ``crm.team`` và ``crm.stage`` để hỗ trợ nhóm cha/con, trường học, stage tự động, stage bắt buộc điền.
   * - (cần xác nhận)
     - Tùy biến phân quyền CRM theo nhóm và record rule riêng
     - Thay thế một phần rule mặc định của ``crm`` bằng rule riêng của ``th_crm``; ảnh hưởng đến quyền xem/sửa/tạo/xóa trên ``crm.lead`` và ``th.summary.activity``.
   * - (cần xác nhận)
     - Tích hợp cơ chế merge dữ liệu cho cơ hội CRM
     - Mở rộng ``data_merge.model``, ``data_merge.group``, ``data_merge.record``; ảnh hưởng đến xử lý dữ liệu trùng và gom bản ghi.
   * - (cần xác nhận)
     - Thêm tích hợp form nhúng để sinh lead CRM
     - Bổ sung các model cấu hình Formio như ``th.formio.builder.field.aff.default`` và line cấu hình; ảnh hưởng đến nguồn tạo lead từ form.
   * - (cần xác nhận)
     - Bổ sung xử lý batch/queue job cho các tác vụ nặng
     - Tích hợp ``th_queue_job`` cho các luồng như thu hồi lead, tạo hóa đơn hàng loạt, cập nhật dữ liệu số lượng lớn.
   * - Q3/2025
     - Bổ sung tài liệu kỹ thuật và tài liệu bảo mật nội bộ
     - Thêm thư mục ``docs/`` gồm ``index.rst``, ``extention.rst``, ``security.rst``, ``workflows.rst`` để mô tả module.
   * - Q3/2025
     - Bổ sung bộ test tự động cho CRM
     - Thêm test cho tạo cơ hội, check trùng, tạo đơn hàng, chia lead, auto next level và tạo từ form.
   * - Q1/2026
     - Thêm migration version ``16.0.090326``
     - Bổ sung thư mục ``migrations/16.0.090326``; ảnh hưởng đến nâng cấp dữ liệu/kỹ thuật khi update module.