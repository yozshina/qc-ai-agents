# Mô tả yêu cầu — Update Login hệ thống (Sprint 15)
> Job: LKH / Sprint 15 / Update-login-he-thong
> Nguồn: Monitor cung cấp qua lệnh job ngày 2026-06-28.

---

## Chức năng 1 — Login: Bổ sung phương thức đăng nhập bằng username/password

Cập nhật bổ sung phương thức đăng nhập hệ thống bằng `username/password` bên cạnh phương thức đăng nhập SSO hiện tại.

Hệ thống cho phép người dùng đăng nhập bằng **một trong hai** phương thức:
1. **Tài khoản SSO:** đăng nhập thông qua hệ thống SSO.
2. **Tài khoản hệ thống:** đăng nhập trực tiếp bằng `username/password`.

### Các trường hợp xử lý chính
- **TH1 — Đã có SSO, chưa có tài khoản hệ thống:** Admin có thể tạo bổ sung tài khoản hệ thống cho người dùng này để cho phép đăng nhập bằng `username/password`.
- **TH2 — Chưa có SSO, đã có tài khoản hệ thống:** Hệ thống vẫn cho phép tạo và duy trì tài khoản hệ thống. Khi người dùng đăng nhập bằng SSO lần đầu, hệ thống kiểm tra email đăng nhập SSO đã tồn tại trong hệ thống chưa. Nếu email đã tồn tại → hệ thống **tự động liên kết/cập nhật** thông tin SSO vào tài khoản hiện có.
- **TH3 — Chưa có cả SSO lẫn tài khoản hệ thống:** Admin tạo mới tài khoản hệ thống bằng `username/password`. Sau này có thể liên kết thêm SSO nếu cần.

### Lưu ý nghiệp vụ (QUAN TRỌNG)
Hệ thống chỉ liên kết tài khoản SSO với tài khoản hệ thống **dựa trên email đăng nhập**. Vì vậy khi Admin tạo tài khoản hệ thống, **bắt buộc nhập đúng email dùng để đăng nhập SSO**. Nếu Admin nhập sai email → phát sinh hai tài khoản người dùng khác nhau, hệ thống **không tự động đồng bộ** dữ liệu giữa hai tài khoản này.

---

## Chức năng 2 — Cấu hình login hệ thống
Cho phép người dùng (Admin) cấu hình **số lần nhập sai mật khẩu** và **thời gian tạm khóa** để reset số lần nhập sai mật khẩu.

---

## Phạm vi 3 vùng Figma (background #D9D9D9)
1. **Login hệ thống** — màn đăng nhập (sau khi có tài khoản, người dùng đăng nhập truy cập hệ thống).
2. **Quản lý tài khoản_Thêm phương thức đăng nhập** — nơi Admin tạo/sửa tài khoản hệ thống.
3. **Cấu hình tài khoản** — nơi Admin cấu hình số lần sai/thời gian khóa.

> ⚠️ Mỗi vùng có các phần **Note** trên Figma — cần đọc kỹ vì ảnh hưởng luồng dự án (xem b1_extract).
