Chi tiết chức năng
------------------

A. Tạo cơ hội
~~~~~~~~~~~~~

1. PRM (prm.lead)
^^^^^^^^^^^^^^^^^

**1.1 Luồng hoạt động**
    * Tên cơ hội: là trường thông tin trên cùng đầu tiên của giao diện biểu mẫu (mặc định khi tạo bản ghi sẽ hiển thị là Mới và không được sửa) thể hiện tên của một cơ hội với một đối tác, khi thực hiện lưu bản ghi sẽ tự sinh theo mẫu [Mã cơ hội]_Mã đối tác_Tên đối tác.
    * Thanh trạng thái: là thông tin hiển thị góc trên cùng bên phải, thể hiện các mối quan hệ có phân loại là PRM và được sắp xếp theo thứ tự đã cấu hình.
    * Mã cơ hội: hiển thị trong ngoặc vuông ở trường Tên cơ hội (không được sửa), thể hiện mã của một cơ hội với một đối tác, khi thực hiện lưu bản ghi sẽ tự sinh theo theo mẫu PRMxxxxx (ví dụ PRM00001) và tự tăng theo thứ tự của các bản ghi.
    * Liên hệ lần cuối: thể hiện thời gian liên hệ với đối tác (không được sửa), mặc định khi tạo bản ghi sẽ là Hôm nay, nếu cơ hội đó đã trở thành đối tác POM thì Liên hệ lần cuối sẽ ẩn đi. Khi có sự thay đổi ở trường Trạng thái chi tiết, trong phần Ghi chú phía bên phải của giao diện và khi hoàn thành Lịch làm việc bất kỳ, Liên hệ lần cuối sẽ tự động cập nhật thời điểm hiện tại (tức Hôm nay).
    * Điện thoại: là số điện thoại liên hệ của đối tác.
        * Trước khi lưu: khi nhập vào số điện thoại, hệ thống sẽ kiểm tra:
            * Nếu số điện thoại là mới => cho phép lưu.
            * Nếu số điện thoại là của một đối tác chưa được tạo cơ hội => tự động điền Tên và Email của đối tác.
            * Nếu số điện thoại là của một đối tác đã được tạo cơ hội => không cho phép lưu và hiện ra thông báo trùng cơ hội với thông tin của đối tác bị trùng.
        * Sau khi lưu: không cho phép sửa trên giao diện của cơ hội, chỉ được phép sửa trên giao diện của Hồ sơ (thay đổi trong Hồ sơ sẽ tự cập nhật ở cơ hội).
    * Email: là địa chỉ hòm thư liên hệ của đối tác.
        * Trước khi lưu: khi nhập vào Email, hệ thống sẽ kiểm tra:
            * Nếu Email là mới => cho phép lưu.
            * Nếu Email là của một đối tác chưa được tạo cơ hội => tự động điền Tên và số điện thoại của đối tác.
            * Nếu Email là của một đối tác đã được tạo cơ hội => không cho phép lưu và hiện ra thông báo trùng cơ hội với thông tin của đối tác bị trùng.
        * Sau khi lưu: không cho phép sửa trên giao diện của cơ hội, chỉ được phép sửa trên giao diện của Hồ sơ (thay đổi trong Hồ sơ sẽ tự cập nhật ở cơ hội).
    * Tên đối tác: tên của đối tác, có thể là tên cá nhân hoặc tên một tổ chức (bắt buộc nhập khi tạo bản ghi).
    * Người phụ trách: tên của người phụ trách quản lý đối tác (mặc định là tên của người dùng khi tạo bản ghi và không được sửa).
    * Đơn vị sở hữu: tên của đơn vị sở hữu (mặc định là đơn vị sở hữu người dùng chọn khi ở giao diện dạng thẻ và không được sửa).
    * Nhóm đối tác: chọn một hoặc nhiều trong các nhóm đối tác đã cấu hình (bắt buộc nhập để tạo bản ghi).
    * Nguồn đối tác: chọn một trong các nguồn đối tác đã cấu hình (bắt buộc nhập để tạo bản ghi).
    * Sản phẩm hợp tác: chọn một hoặc nhiều trong các sản phẩm hợp tác đã cấu hình (bắt buộc nhập để chuyển trạng thái).
    * Tình trạng gọi: chọn một trong các tình trạng gọi đã cấu hình (bắt buộc nhập để tạo bản ghi), lựa chọn tình trạng gọi sẽ chỉ hiển thị các tình trạng gọi liên kết với mối quan hệ được cấu hình.
    * Trạng thái chi tiết: sẽ hiển thị sau khi chọn tình trạng gọi, chọn một trong các trạng thái chi tiết đã cấu hình theo tình trạng gọi bên trên (bắt buộc nhập để tạo bản ghi).
    * Tỉnh/Thành phố: Tỉnh, thành phố của đối tác.
    * Quận/Huyện: Quận, huyện của đối tác.
    * Đơn vị công tác: đơn vị công tác của đối tác.
    * Chính sách hợp tác: chọn một trong các chính sách hợp tác đã cấu hình.
    * Trạng thái hợp đồng: bao gồm 3 trạng thái Không ký, Đang trình ký và Đã ký. Khi trạng thái hợp đồng là Đã ký sẽ hiện các trường thông tin gồm Số hợp đồng, Ngày ký hợp đồng và Hợp đồng để cho người dùng điền.
    * Số hợp đồng: mã số hợp đồng với đối tác.
    * Ngày ký hợp đồng: ngày ký hợp đồng với đối tác.
    * Hợp đồng: chọn những tệp tin liên quan tới hợp đồng để đính kèm. Bắt buộc phải điền khi hợp đồng Đã ký và khi đối tác được nâng mối quan hệ Cần thông tin và giấy tờ.
    * Giấy tờ cá nhân: chọn những tệp tin liên quan đến giấy tờ cá nhân để đính kèm.
    * Bảng Mô tả: ghi chú hoặc mô tả thêm về cơ hội khi tạo.
    * Bảng thông tin bổ sung: hiển thị thêm các trường thông tin về đối tác.
        * Người giới thiệu: chọn một người dùng hoặc một đối tác làm người giới thiệu.
        * Mã tiếp thị liên kết: tự động điền mã tiếp thị liên kết của người giới thiệu được chọn bên trên (không được sửa).
        * Ngày tạo: hiển thị thời gian tạo cơ hội (không được sửa).
        * Ngày lên level: hiển thị thời gian đối tác chuyển trạng thái sang mối quan hệ tương ứng đã được cấu hình (không được sửa).

**1.2 Một số hàm quan trọng**
    * onchange_th_check_phone
    * onchange_th_check_email
    * onchange_th_call_status
    * _compute_th_ownership_unit_id
    * _check_duplicate_values
    * _compute_th_team_leader_ids
    * _compute_type
    * _compute_th_pom_lead_count
    * action_api_create_user
    * action_api_create_user_fast

2. POM (pom.lead)
^^^^^^^^^^^^^^^^^

**2.1 Luồng hoạt động**
    * POM không cho phép tạo bản ghi như là tạo các cơ hội bên PRM vì phải có các cơ hội bên PRM thì mới có các đối tác POM.
    * Về cơ bản, các trường thông tin trong POM đều giống các trường trong PRM chỉ có một chút sự thay đổi nhằm phân biệt đối tác PRM với đối tác POM.
    * Tên cơ hội: là trường thông tin trên cùng đầu tiên của giao diện biểu mẫu (không được sửa) thể hiện tên của một cơ hội tiếp tục hợp tác với một đối tác, khi thực hiện Chuyển POM từ tính năng PRM sẽ tự sinh theo mẫu [POMxxxxxx]-{Tên Khách hàng} với xxxxxx là số có 6 chữ số tịnh tiến tăng dần và tự tăng theo thứ tự của các bản ghi.
    * Lý do ngừng hợp tác: sẽ hiển thị sau khi chọn Trạng thái chi tiết là “Ngừng hợp tác”, chọn một trong các lý do ngừng hợp tác đã cấu hình (bắt buộc nhập để tạo bản ghi).
    * Chi tiết lý do ngừng hợp tác: sẽ hiển thị sau khi chọn Lý do ngừng hợp tác, chọn một trong các chi tiết đã cấu hình theo Lý do ngừng hợp tác bên trên (bắt buộc nhập để tạo bản ghi).
    * Thanh trạng thái: là thông tin hiển thị góc trên cùng bên phải, thể hiện các mối quan hệ có phân loại là POM và được sắp xếp theo thứ tự đã cấu hình.
    * Bảng thông tin bổ sung: hiển thị thêm các trường thông tin về đối tác, ngoài những trường như bên PRM, POM có thêm những trường thông tin sau
        * Cấp đại lý: chọn một trong các cấp độ làm cấp của đại lý.
        * Trạng thái đối tác: chọn một trong các trạng thái làm trạng thái hiện tại của đối tác.
        * Trạng thái tạm dừng: sẽ xuất hiện sau khi chọn trạng thái đối tác là Tạm dừng, chọn một trong các trạng thái làm trạng thái tạm dừng của đối tác.
        * Thời gian ngừng hợp tác: hiển thị thời gian đối tác chuyển trạng thái sang Ngừng hợp tác (không được sửa).

**2.2 Một số hàm quan trọng**
    * onchange_th_call_status
    * _compute_th_team_leader_ids
    * _onchange_th_reason_quit_id
    * _onchange_th_call_status_detail_id
    * _compute_prm_values
    * action_archive_user_api
    * required_th_personal_document

B. Chuyển POM
~~~~~~~~~~~~~
1.1 Luồng hoạt động
    * Tính năng được tích hợp vào nút Chuyển POM hiển thị ở giao diện danh sách vào giao diện biểu mẫu, dùng để chuyển các đối tác PRM thành đối tác POM, sẽ chỉ hiển thị khi và chỉ khi đối tác bất kỳ ở trạng thái mối quan hệ cuối.
    * Khi sử dụng hệ thống sẽ kiểm tra:
        * Nếu đối tác không có email hoặc số điện thoại => không cho phép chuyển POM và đưa ra thông báo yêu cầu điền bổ sung đầy đủ.
        * Nếu đối tác có đầy đủ email và số điện thoại => cho phép chuyển POM.

1.2 Các hàm liên quan
    * action_change_state_to_pom

C. Tạo tài khoản Affiliate
~~~~~~~~~~~~~~~~~~~~~~~~~~
1.1 Luồng hoạt động
    * Tính năng được tích hợp vào nút Tạo tài khoản Affiliate hiển thị trong giao diện biểu mẫu, dùng để tạo tài khoản Affiliate cho đối tác PRM, sẽ hiển thị khi và chỉ khi đối tác bất kỳ ở trạng thái mối quan hệ cuối. Khi sử dụng hệ thống sẽ kiểm tra:
        * Nếu đối tác không có email => không cho phép tạo tài khoản và đưa ra thông báo yêu cầu điền bổ sung email.
        * Nếu đối tác có email => cho phép tạo tài khoản.

1.2 Các hàm liên quan
    * create_lead_aff
    * get_vals_opportunity_aff

D. Giao cơ hội (prm.assign.leads)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1.1 Luồng hoạt động
    * Cho phép người dùng chuyển giao một hoặc nhiều cơ hội cho một đội nhóm hoặc một cá nhân cụ thể:
        * Sau khi giao cơ hội cho cá nhân (chỉ hiển thị những người dùng được phân quyền sử dụng module PRM) thì cơ hội được chọn sẽ thay thế Người phụ trách hiện tại sang Người phụ trách mới mà người dùng chọn (bản chất là thay đổi Người phụ trách).
        * Sau khi giao cơ hội cho một đội nhóm thì các cơ hội sẽ được chia đều cho các thành viên trong đội nhóm đấy làm Người phụ trách.
    * Ngoài ra còn có thể chuyển đổi Mối quan hệ, Nhóm tình trạng và Trạng thái chi tiết của cơ hội trong khi thực hiện giao cơ hội (có thể chọn Không để giữ nguyên Người phụ trách và chỉ chuyển những thông số còn lại).

1.2 Các hàm liên quan
    * _compute_th_allowed_team_and_user_ids
    * action_assign_leads
    * active_user_api

E. Thu hồi cơ hội về kho
~~~~~~~~~~~~~~~~~~~~~~~~

**1.1 Luồng hoạt động**
    * Dùng để chuyển một hoặc nhiều cơ hội PRM hay một hoặc nhiều đối tác POM mà người sử dụng cảm thấy hết tiềm năng hoặc ngừng chăm sóc về kho lưu trữ.
    * Chỉ Quản lý, Trưởng phòng và Quản trị viên mới có thể thấy và truy cập được vào Kho lưu trữ.

**1.2 Các hàm liên quan**
    * th_action_archive

F. Tái sử dụng cơ hội từ kho (prm.lead.reuse)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
**1.1 Luồng hoạt động**
    * Chọn một hoặc nhiều cơ hội để tái sử dụng (chỉ Quản trị viên mới được quyền tái sử dụng), về bản chất khi thu hồi về kho là cơ hội hoặc đối tác đó không có tiềm năng nên khi tái sử dụng thì cơ hội hoặc đối tác đó sẽ trở thành có tiềm năng.
    * Sau khi tái sử dụng, cơ hội hoặc đối tác được tái sử dụng sẽ có thêm trường Tên nguồn tái sử dụng để nhận biết cơ hội hoặc đối tác này đã được tái sử dụng.

**1.2 Các hàm liên quan**
    * _compute_th_allowed_team_ids
    * _compute_th_allowed_user_ids
    * open_lead

G. Làm sạch dữ liệu import (th.check.imp.prm.lead)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
**1.1 Luồng hoạt động**
    * Tính năng cho phép tải lên file excel chứa các số điện thoại của các liên hệ.
    * Sau khi làm sạch sẽ trả ra một file excel chứa các số điện thoại trùng (số điện thoại của các liên hệ đã tồn tại trên hệ thống.

**1.2 Các hàm liên quan**
    * check_imp_prm

H. Cấu hình
~~~~~~~~~~~
1. Mối quan hệ (prm.level)
^^^^^^^^^^^^^^^^^^^^^^^^^^
**1.1 Luồng hoạt động**
    * Tên: tên của mối quan hệ, thể hiện mối quan hệ giữa người sử dụng với các đối tác, sẽ hiển thị ở thanh trạng thái trong các bản ghi của PRM hay POM.
    * Loại: phân loại mối quan hệ đấy là của PRM hay POM.
    * Trạng thái đầu: để chỉ mối quan hệ đấy là trạng thái đầu tiên trong các trạng thái mối quan hệ khi chăm sóc các đối tác.
    * Trạng thái cuối: để chỉ mối quan hệ đấy là trạng thái cuối cùng trong các trạng thái mối quan hệ khi chăm sóc các đối tác.
    * Cần thông tin và giấy tờ: để chỉ định khi chuyển sang mối quan hệ đấy bắt buộc cần phải có thông tin và giấy tờ.
    * Mô tả: ghi chú hoặc mô tả thêm về mối quan hệ khi tạo.

**1.2 Hàm liên quan**
    * _check_first_status_unique_to_type
    * _check_last_status_unique_to_type
    * _check_name_uniq

2. Nhóm đối tác (prm.partner.group)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
**2.1 Luồng hoạt động**
    * Tên: tên của nhóm đối tác, có thể là tên công ty khi có nhiều đối tác thuộc công ty đó hoặc tên khu vực khi có nhiều đối tác cùng thuộc khu vực đó...
    * Mô tả: ghi chú hoặc mô tả thêm về nhóm đối tác khi tạo.

**2.2 Hàm liên quan**
    * _check_name_uniq

3. Nguồn đối tác (prm.partner.source)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
**3.1 Luồng hoạt động**
    * Tên: tên của nguồn đối tác, là nguồn gốc mà có được mối quan hệ với đối tác được cấu hình, có thể là do được giới thiệu hoặc tìm kiếm hay qua các trạng mạng xã hội cùng các kênh truyền thông phương tiện...
    * Mô tả: ghi chú hoặc mô tả thêm về nguồn đối tác khi tạo.

**3.2 Hàm liên quan**
    * _check_name_uniq

4. Sản phẩm hợp tác (prm.collaborative.products)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
**4.1 Luồng hoạt động**
    * Tên: tên của sản phẩm mà bên người sử dụng hợp tác phát triển hoặc triển khai cùng với đối tác.
    * Mô tả: ghi chú hoặc mô tả thêm về sản phẩm hợp tác khi tạo.

**4.2 Hàm liên quan**
    * _check_name_uniq

5. Chính sách hợp tác (prm.commission.policy)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
**5.1 Luồng hoạt động**
    * Tên: tên của chính sách hợp tác, là chính sách mà bên người sử dụng hợp tác với đối tác, ví dụ như hợp tác theo chính sách 1 đổi 1 hoặc trả hàng trong vòng 7 ngày với các sản phẩm hợp tác là hàng tiêu dùng...
    * Mô tả: ghi chú hoặc mô tả thêm về chính sách hợp tác khi tạo.

**5.2 Hàm liên quan**
    * _check_name_uniq

6. Lý do ngừng hợp tác (prm.reason.quit)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
**6.1 Luồng hoạt động**
    * Loại: tên của nhóm lý do ngừng hợp tác.
    * Mỗi một loại lý do ngừng hợp tác sẽ có một bảng chi tiết riêng để cấu hình các lý do ngừng hợp tác đối với từng loại lý do ngừng hợp tác.

**6.2 Hàm liên quan**
    * _check_name_uniq

7. Chi tiết lý do ngừng hợp tác (prm.reason.quit.detail)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
**7.1 Luồng hoạt động**
    * Tên: tên chi tiết lý do người sử dụng ngừng hợp tác với các đối tác (ví dụ như không thanh toán hoặc không có nhu cầu).
    * Mô tả: ghi chú hoặc mô tả thêm về chi tiết lý do ngừng hợp tác khi tạo.

8. Tình trạng gọi (th.status.category)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
**8.1 Luồng hoạt động**
    * Nhóm trạng thái: thể hiện nhóm trạng thái chung mà người sử dụng khi gọi cho các đối tác.
    * Mối quan hệ: các mối quan hệ (cấu hình ở tính năng Mối quan hệ) muốn gắn liền với trạng thái gọi.
    * Mô tả: ghi chú hoặc mô tả thêm về nhóm trạng thái khi tạo.
    * Mỗi một nhóm trạng thái sẽ có một bảng trạng thái chi tiết riêng để cấu hình các trạng thái cụ thể đối với từng loại nhóm trạng thái.

**8.2 Hàm liên quan**
    * _check_name

9. Trạng thái chi tiết (th.status.detail)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
**9.1 Luồng hoạt động**
    * Tên trạng thái: tên trạng thái cụ thể khi gọi (ví dụ như máy bận hoặc không nghe máy).
    * Mô tả: ghi chú hoặc mô tả thêm về tên trạng thái khi tạo.
    * Mối quan hệ: các mối quan hệ (được chọn ở bên trên khi cấu hình nhóm trạng thái) muốn gắn liền với trạng thái gọi cụ thể.

10. Đội nhóm (prm.team)
^^^^^^^^^^^^^^^^^^^^^^^
**10.1 Luồng hoạt động**
    * Tên đội: tên đội nhóm của người sử dụng khi chăm sóc các đối tác.
    * Đội/nhóm cha: được chọn một trong các đội nhóm đã tạo trước đó (nếu có) làm đội nhóm cha.
    * Đơn vị sở hữu: nếu có Đội/nhóm cha sẽ mặc định là đơn vị sở hữu của Đội/nhóm cha, nếu không thì được chọn một trong các đơn vị sở hữu (cấu hình trong chức năng Cài đặt thông số).
    * Quản lý: sẽ hiện nếu người dùng là Quản lý, chọn hoặc tạo một trong các người dùng làm người quản lý đội nhóm (cấu hình trong chức năng Người dùng).
    * Mỗi một đội nhóm sẽ có một bảng thành viên riêng để cấu hình các thành viên cụ thể cho từng đội nhóm.
    * Nút thêm: thêm một hoặc nhiều người dùng để làm thành viên của đội nhóm.
    * Nếu thành viên không có Đội/nhóm cha thì sẽ hiển thị toàn bộ nhân viên.
    * Nếu thành viên có Đội/nhóm cha thì sẽ chỉ hiển thị các thành viên của đội nhóm cha đấy.

**10.2 Hàm liên quan**
    * _compute_domain_manager_id
    * _compute_parent_id
    * _compute_th_member_ids
    * _compute_complete_name
    * _compute_master_team_id
    * _check_parent_id
    * get_children_team_ids
    * _check_name_uniq
