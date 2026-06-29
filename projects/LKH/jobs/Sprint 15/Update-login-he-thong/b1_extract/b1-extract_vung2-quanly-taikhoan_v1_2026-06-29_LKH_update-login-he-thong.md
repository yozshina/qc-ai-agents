# B1 Extract — Vùng 2: QUẢN LÝ TÀI KHOẢN_THÊM PHƯƠNG THỨC ĐĂNG NHẬP
> Job: LKH / Sprint 15 / Update-login-he-thong
> Nguồn: Figma (file Lakehouse) qua extension Chrome — section/frame "Quản lý tài khoản_Thêm phương thức đăng nhập" (6193×2376), node `189339-50645`.
> Phương thức: MCP Figma chính thức bị chặn (seat View-only, cần edit access) → dùng fallback extension Chrome (Browser 1) như Vùng 1.
> ⚠️ Đây là extract THÔ (chỉ ghi nhận, KHÔNG phân tích — phân tích ở B2).

---

## 0. NOTE của vùng (QUAN TRỌNG — đọc kỹ, ảnh hưởng luồng) — vùng NHIỀU NOTE NHẤT
> Vùng 2 có 3 khối Note (tím #E8D6FF, tag "Developer"). Ghi nguyên văn nội dung.

### NOTE A — "Nội dung" (3 trường hợp xử lý tài khoản) — node ~188956-59098
- Đối với tài khoản người dùng có vai trò **super_admin**, hệ thống cho phép người dùng **tự thiết lập và chỉnh sửa mật khẩu đăng nhập SYSTEM của chính tài khoản mình**. Người dùng super_admin **không được phép** thiết lập hoặc chỉnh sửa mật khẩu SYSTEM của tài khoản super_admin **khác**.
- **Các trường hợp xử lý chính:**
  - **+ Trường hợp 1:** Người dùng **đã có tài khoản SSO nhưng chưa có tài khoản hệ thống** → Admin có thể tạo bổ sung tài khoản hệ thống cho người dùng này để cho phép đăng nhập bằng username/password.
  - **+ Trường hợp 2:** Người dùng **chưa có tài khoản SSO nhưng đã có tài khoản hệ thống** → Hệ thống vẫn cho phép tạo và duy trì tài khoản hệ thống. Khi người dùng đăng nhập bằng SSO lần đầu, hệ thống sẽ **kiểm tra email đăng nhập SSO đã tồn tại trong hệ thống hay chưa**. Nếu email đã tồn tại, hệ thống **tự động liên kết/cập nhật thông tin SSO vào tài khoản người dùng hiện có**.
  - **+ Trường hợp 3:** Người dùng **chưa có cả tài khoản SSO và tài khoản hệ thống** → Admin có thể tạo mới tài khoản hệ thống bằng `username/password`. Sau này, tài khoản này **có thể được liên kết thêm với tài khoản SSO** nếu cần.

### NOTE B — "Note for / Developer" (ràng buộc chỉnh sửa) — node ~188804-145970
- Không cho phép người dùng **chỉnh sửa thông tin tên tài khoản và email**.
- Đối với tài khoản người dùng có vai trò super_admin, hệ thống cho phép người dùng tự thiết lập và chỉnh sửa mật khẩu đăng nhập SYSTEM của chính tài khoản mình. Người dùng super_admin không được phép thiết lập hoặc chỉnh sửa mật khẩu SYSTEM của tài khoản super_admin khác. *(lặp lại ý ở Note A, nhấn mạnh)*

### NOTE C — "Note for / Developer" (rule field + chính sách mật khẩu + tra cứu TTNS) — node ~188804-145717
- Hệ thống **kiểm tra và không cho phép trùng** tên tài khoản, mã nhân viên và email.
- Khi trùng → **hiển thị cảnh báo** thông tin đã tồn tại trên hệ thống.
- **Ngày hết hạn**: hiển thị theo định dạng **dd/mm/yyyy** và **bắt buộc phải lớn hơn thời gian hiện tại**.
- **Mật khẩu**: độ dài **8–32 ký tự**, chứa **ít nhất 1 chữ thường, 1 chữ in hoa, 1 chữ số, 1 ký tự đặc biệt**, **không** chứa khoảng trắng đầu/cuối/giữa, **không trùng tên đăng nhập**, **không trùng với 3 mật khẩu gần nhất**.
- **Tên tài khoản**: bắt buộc nhập, độ dài **6–50 ký tự**, không trùng tên tài khoản đã tồn tại; không cho phép khoảng trắng đầu/cuối; chỉ cho phép chữ cái không dấu (a-z), số (0-9), gạch dưới (_); không chứa ký tự đặc biệt, dấu tiếng Việt. **Sau khi tạo tài khoản, KHÔNG cho phép chỉnh sửa** (tránh ảnh hưởng đăng nhập và audit).
- **Tên người dùng**: bắt buộc nhập, độ dài **8–100 ký tự**, cho phép chữ tiếng Việt có dấu, chữ cái, khoảng trắng và một số ký tự hợp lệ nếu cần; không cho phép chỉ nhập khoảng trắng. *(state lỗi bổ sung: "Không cho phép nhập số và chứa kí tự đặc biệt")*
- **Mã nhân viên**: bắt buộc nhập, **bắt buộc 6 ký tự** (state lỗi ghi "phải gồm 6 chữ số"), không trùng mã nhân viên đã tồn tại; không cho phép khoảng trắng đầu/cuối.
- **Logic tra cứu thông tin nhân sự (TTNS) khi nhập email**: Khi nhập email sẽ **call api TTNS** để tra cứu thông tin nhân sự:
  - **+ Có TTNS**: tự động fill thông tin **mã nhân viên** và **ngày hết hạn**. **Không cho phép sửa**.
  - **+ Không có TTNS**: cho phép người dùng **nhập thủ công** mã nhân viên và ngày hết hạn để tạo mới tài khoản.

---

## 1. Các màn / state đã quan sát

### 1.1. Màn LIST — "Danh sách người dùng" (full cột) — node ~188766-45437
- Breadcrumb: **Trang chủ > Quản lý hệ thống > Quản lý người dùng**.
- Header trái: tiêu đề **"Danh sách người dùng"**.
- Header phải: ô **Tìm kiếm** (placeholder "Tìm kiếm") · nút **"Bộ lọc"** (icon phễu) · nút **"Cấu hình"** (icon bánh răng) · nút primary đỏ **"+ Tạo tài khoản"**.
- **Cột bảng (9 cột):** `#` | **Tên tài khoản** (có icon sort ↕) | **Tên người dùng** | **Mã nhân viên** | **Phương thức đăng nhập** | **Nhóm quyền** | **Ngày hết hạn** | **Trạng thái** | **Hành động**.
- **Cột "Phương thức đăng nhập"** — badge, các tổ hợp quan sát: `[SSO]+[SYSTEM]` (cả hai) · `[SYSTEM]` đơn (xanh lá) · `[SSO]` đơn (đỏ/hồng viền).
- **Cột "Nhóm quyền"**: badge `ADMIN`, `DE`, … + badge overflow `+2` (đếm số nhóm còn lại).
- **Cột "Ngày hết hạn"**: dạng `01/02/2026`.
- **Cột "Trạng thái"**: badge `Đang sử dụng` (viền xanh lá). *(các trạng thái khác chưa thấy biến thể trong list này)*
- **Cột "Hành động"**: icon kebab `⋮` → menu ngữ cảnh, **NỘI DUNG MENU KHÁC NHAU THEO LOẠI TÀI KHOẢN:**
  - TK **có SYSTEM** (SYSTEM đơn, hoặc SSO+SYSTEM): **"Chỉnh sửa"** (icon bút) + **"Đổi mật khẩu"** (icon khóa).
  - TK **chỉ SSO** (chưa có SYSTEM): **"Chỉnh sửa"** + **"Thêm phương thức đăng nhập"** (icon ⊕ đỏ). ← điểm tính năng mới.
- **Footer phân trang:** "Số bản ghi/trang [10 ▾]" · "1-10 của **200**" · điều hướng "Trước | 1 | 2 | **3** (active) | … | 6 | 7 | Tiếp".

### 1.2. Modal "Tạo mới tài khoản hệ thống" — DEFAULT (TH3: chưa có SSO) — node ~188683-57211 (600×493)
- Title đỏ **"Tạo mới tài khoản hệ thống"** + icon `✕` đóng.
- Bố cục 2 cột, **tất cả field bắt buộc (dấu `*` đỏ)**, đều rỗng/placeholder:
  - **Tên tài khoản*** — "Nhập tên tài khoản"
  - **Tên người dùng*** — "Nhập tên người dùng"
  - **Mật khẩu*** — "Nhập mật khẩu" + icon **mắt** (ẩn/hiện)
  - **Email*** — "Nhập email"
  - **Mã nhân viên*** — "Nhập mã nhân viên"
  - **Nhóm quyền*** — dropdown "Chọn nhóm quyền" (chevron ▾)
  - **Ngày hết hạn*** — "Nhập ngày hết hạn" + icon **lịch**
- Footer: nút **"Hủy"** (outline) + nút **"Xác nhận"** (primary đỏ).

### 1.3. Modal "Tạo mới tài khoản hệ thống" — STATE LỖI VALIDATION — node ~188891-45850 (600×665)
- Cùng modal Tạo mới, hiển thị **error đỏ dưới từng field**:
  - **Tên tài khoản*** (nhập "123") → *"Độ dài từ 6 - 50 ký tự, nhập chữ cái không dấu (a-z), số (0-9), gạch dưới (_), không chứa ký tự đặc biệt."*
  - **Tên người dùng*** → *"Độ dài từ 8-100 ký tự. Không cho phép nhập số và chứa kí tự đặc biệt."*
  - **Mật khẩu*** → *"Độ dài từ 8-32 ký tự, chứa ít nhất 1 chữ thường, 1 chữ in hoa, 1 chữ số, 1 ký tự đặc biệt."*
  - **Email*** (nhập "vannth@") → *"Email không đúng định dạng."*
  - **Mã nhân viên*** → *"Mã nhân viên phải gồm 6 chữ số."*
- Footer: Hủy | Xác nhận.

### 1.4. Modal "Thêm phương thức đăng nhập hệ thống" (TH1: đã có SSO, thêm SYSTEM) — node ~188766-46954 (600×493)
> Label vùng: "Tạo mới tài khoản hệ thống đã có tài khoản SSO". Title modal: **"Thêm phương thức đăng nhập hệ thống"**.
- Các field **pre-fill từ tài khoản SSO** và **DISABLED (nền xám, không sửa)**: Tên tài khoản ("Avn"), Tên người dùng ("Nguyen Van A"), Email ("nguyenvana@gmail.com"), Mã nhân viên ("B21DCTC234"), Nhóm quyền (badge "VIEW", "ADMIN"), Ngày hết hạn ("11/12/2028" + lịch).
- **Chỉ field "Mật khẩu*" là EDITABLE** (nền trắng, placeholder "Nhập mật khẩu" + icon mắt).
- Footer: Hủy | Xác nhận.

### 1.5. Dialog "Xác nhận tạo tài khoản hệ thống" — node ~188969-59153 (400×272)
- Icon `(!)` đỏ tròn.
- Title: **"Xác nhận tạo tài khoản hệ thống"**.
- Body: *"Bạn có chắc chắn muốn tạo tài khoản hệ thống cho người dùng có email vannth@gmail.com không?"* (email động).
- Buttons: **"Hủy bỏ"** (xám) | **"Tạo mới"** (đỏ). Có icon `✕` đóng góc phải.

### 1.6. Modal "Chỉnh sửa tài khoản hệ thống" — node ~188683-57564 (600×493)
- Title đỏ **"Chỉnh sửa tài khoản hệ thống"** + `✕`.
- Field:
  - **Tên tài khoản*** — "user_32_test" — **DISABLED (xám, không cho sửa)** ✔ khớp Note B.
  - **Email*** — "nguyenvana@gmail.com" — **DISABLED (xám, không cho sửa)** ✔ khớp Note B.
  - **Tên người dùng*** — editable (placeholder "Nhập tên người dùng").
  - **Mã nhân viên*** — editable (placeholder "Nhập mã nhân viên").
  - **Nhóm quyền*** — dropdown "Chọn nhóm quyền".
  - **Ngày hết hạn*** — editable + icon lịch.
  - **Trạng thái hoạt động*** — **TOGGLE switch** (đang "ON", màu đỏ). ← field RIÊNG của modal Chỉnh sửa (không có ở Tạo mới).
- Footer: Hủy | Xác nhận.

### 1.7. Modal "Đổi mật khẩu" — node ~188930-49318 (600×253)
- Title đỏ **"Đổi mật khẩu"** + `✕`.
- 1 field: **"Mật khẩu mới*"** (có icon `ⓘ` info bên cạnh — suy đoán tooltip chính sách mật khẩu; tooltip không bung trên mockup tĩnh) + input "Nhập mật khẩu mới" + icon mắt.
- Footer: Hủy | Xác nhận.

---

## 2. ALERT (toast thông báo) — 7 alert: 4 Cảnh báo + 3 Thông báo
> Component "Alert" (Hug 395 × Fixed 90), góc bo 5px. Type=warning (đỏ, nền #FFF1F0 Dust Red/1) hoặc success (xanh lá). Đều có icon + tiêu đề + mô tả + nút `✕` đóng.

**Cảnh báo (đỏ, icon `(!)`):**
1. **"Cảnh báo"** — *"Mã nhân viên đã tồn tại"*
2. **"Cảnh báo"** — *"Email người dùng đã tồn tại"*
3. **"Cảnh báo"** — *"Tên tài khoản đã tồn tại"*
4. **"Cảnh báo"** — *"Mật khẩu mới không được trùng với 3 mật khẩu đã sử dụng gần nhất"*

**Thông báo (xanh lá, icon `✓`):**
5. **"Thông báo"** — *"Tạo mới tài khoản người dùng thành công"*
6. **"Thông báo"** — *"Chỉnh sửa thông tin người dùng thành công"*
7. **"Thông báo"** — *"Đổi mật khẩu thành công"*

---

## 3. UI tokens quan sát nhanh (UI check NÔNG theo Target)
- Button primary: nền đỏ Viettel, bo góc, chữ trắng (Tạo tài khoản, Xác nhận, Tạo mới).
- Button secondary: outline/nền xám (Hủy, Hủy bỏ, Bộ lọc, Cấu hình).
- Input: label trên + dấu `*` đỏ cho bắt buộc; placeholder xám; state error → viền đỏ + text đỏ dưới field; field disabled → nền xám; mật khẩu có toggle mắt; ngày có icon lịch; dropdown có chevron.
- Badge: phương thức (SSO hồng / SYSTEM xanh), nhóm quyền (đỏ/hồng) + overflow `+N`, trạng thái (viền xanh "Đang sử dụng").
- Toggle switch cho "Trạng thái hoạt động" (ON đỏ).
- Modal: bo góc 12px, drop-shadow, title đỏ, footer 2 nút phải.
- Alert/toast: bo góc 5px, icon trạng thái, nút đóng `✕`.

---

## 4. Điểm cần lưu cho B2 (KHÔNG phân tích ở đây)
- **3 trường hợp xử lý tài khoản** (Note A) là logic nghiệp vụ cốt lõi — liên quan trực tiếp luồng "Thêm phương thức đăng nhập" và liên kết SSO↔SYSTEM qua email.
- **Menu Hành động khác nhau theo loại TK** (Đổi mật khẩu vs Thêm phương thức đăng nhập) — phụ thuộc TK đã có SYSTEM hay chỉ SSO.
- **Modal "Thêm phương thức đăng nhập"**: chỉ cho nhập Mật khẩu, các field khác lock từ SSO.
- **Rule field** (Note C) + **state lỗi validation** (1.3) là nguồn chính cho TC negative: độ dài, ký tự cho phép, trùng lặp, định dạng email, mã NV 6 số, ngày hết hạn > hiện tại.
- **Chính sách mật khẩu** (8-32, 4 nhóm ký tự, không trùng tên ĐN, không trùng 3 mật khẩu gần nhất) — dùng cho cả Tạo mới, Thêm phương thức, Đổi mật khẩu.
- **Logic call API TTNS** khi nhập email (có/không có TTNS → auto-fill hay nhập tay mã NV + ngày hết hạn) — luồng tích hợp, cần Q&A xác nhận ở B2.
- **Quyền super_admin** với mật khẩu (tự sửa của mình, không sửa của super_admin khác) — rule phân quyền.
- **Ràng buộc không sửa Tên tài khoản & Email** sau khi tạo (Note B + modal Chỉnh sửa disabled).
- Alert trùng lặp (mã NV / email / tên TK đã tồn tại) ↔ rule "không cho trùng" trong Note C.
