# B1 Extract — Vùng 1: LOGIN HỆ THỐNG
> Job: LKH / Sprint 15 / Update-login-he-thong
> Nguồn: Figma (file Lakehouse) qua extension Chrome — frame "Login hệ thống" (6380×2000), node ~189339-50644.
> ⚠️ Đây là extract THÔ (chỉ ghi nhận, không phân tích — phân tích ở B2).

---

## 0. NOTE của vùng (QUAN TRỌNG — ảnh hưởng luồng)
> Lấy từ frame Note "Nội dung" trong vùng Login. Đây là phần Monitor dặn đọc kỹ.

- Hệ thống cho phép người dùng đăng nhập bằng **một trong hai phương thức**: tài khoản **SYSTEM** hoặc tài khoản **SSO**.
- Với phương thức đăng nhập bằng tài khoản **SYSTEM**, hệ thống **kiểm tra số lần nhập sai mật khẩu**. Nếu nhập sai vượt quá số lần quy định → tài khoản SYSTEM bị **tạm khóa** trong khoảng **thời gian cấu hình**. Hết thời gian tạm khóa → hệ thống **reset số lần nhập sai về 0**.
- Trong thời gian tài khoản SYSTEM bị tạm khóa, người dùng **vẫn đăng nhập được bằng SSO** nếu tài khoản SSO hợp lệ. Nhưng nếu tiếp tục đăng nhập bằng SYSTEM → phải **chờ hết thời gian tạm khóa** mới được phép đăng nhập lại.

> 📌 "tài khoản SYSTEM" = "tài khoản hệ thống" (username/password) trong mô tả Monitor. Thuật ngữ trên Figma dùng **SYSTEM**.

---

## 1. Các màn / state đã quan sát (4 biến thể trong frame)

### State 1 — Default (chưa nhập)
- Logo Viettel Autolake
- Tiêu đề: **"Đăng nhập bằng tài khoản"**
- Field **Tên đăng nhập** — placeholder "Nhập tên đăng nhập"
- Field **Mật khẩu** — placeholder "Nhập mật khẩu", có icon con mắt (ẩn/hiện)
- Button đỏ (primary) **"Đăng nhập"**
- Button outline đỏ **"Đăng nhập bằng tài khoản SSO"** (có icon)

### State 2 — Error: sai thông tin
- Field Tên đăng nhập: **viền đỏ + icon (!)**
- Field Mật khẩu: đã nhập (••••)
- Error đỏ dưới field: **"Tên đăng nhập hoặc mật khẩu không đúng"**
- Button "Đăng nhập" đỏ (active), button SSO outline

### State 3 — Lockout: tạm khóa (nhập sai quá số lần)
- Field Tên đăng nhập: đã nhập (vd "Vannth")
- Field Mật khẩu: đã nhập (••••), icon con mắt
- Error đỏ: **"Bạn đã nhập sai quá số lần quy định. Vui lòng thử lại sau!"**
- Button primary **disabled (xám)**: **"Thử lại sau 14:59"** (đếm ngược theo thời gian khóa cấu hình)
- Button **"Đăng nhập bằng tài khoản SSO" vẫn BẬT** (khớp Note: SYSTEM khóa vẫn login SSO được)

### State 4 — (biến thể còn lại, tương tự default/đã nhập giá trị)
- Cùng layout, dùng để minh họa trạng thái nhập liệu.

---

## 2. UI tokens quan sát nhanh (UI check NÔNG theo Target)
- Button primary: nền đỏ Viettel, bo góc, chữ trắng, full-width.
- Button secondary (SSO): outline đỏ, nền trắng, có icon.
- Input: viền xám mảnh, bo góc nhẹ, có label phía trên + placeholder; state error → viền đỏ + icon + text đỏ.
- Mật khẩu: có toggle hiện/ẩn (icon mắt).
- Layout: 2 cột (ảnh nền city Viettel bên trái ~chiếm lớn + panel form trắng bên phải).

> Target: UI chỉ check nông vài chỗ theo common rule → ghi nhận token cơ bản, không soi sâu pixel.

---

## 3. Điểm cần lưu cho B2 (không phân tích ở đây)
- Quan hệ SYSTEM vs SSO khi login (2 nhánh song song).
- Cơ chế đếm sai → khóa → đếm ngược → reset: liên quan trực tiếp màn Cấu hình tài khoản (vùng 3).
- Nút SSO luôn khả dụng kể cả khi SYSTEM khóa.
