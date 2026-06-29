# Figma Input — LKH / Sprint 15 / Update-login-he-thong
> URL gốc lấy từ project-config.json (figma.base_url). File này chỉ ghi VÙNG + node-id cụ thể của job, để truy vết.

## URL gốc (từ config)
https://www.figma.com/design/Dk7KnsNNVmPAJKT0VmmOv5/H%E1%BB%87-th%E1%BB%91ng-qu%E1%BA%A3n-l%C3%BD-d%E1%BB%AF-li%E1%BB%87u-Lakehouse

## Cách xác định vùng cần lấy
Lấy theo **background to có mã màu #D9D9D9**. Tổng cộng **3 vùng**:

| # | Tên vùng (frame) | Mục đích nghiệp vụ |
|---|---|---|
| 1 | **Login hệ thống** | Màn đăng nhập — người dùng nhập username/password (hoặc SSO) để vào hệ thống |
| 2 | **Quản lý tài khoản_Thêm phương thức đăng nhập** | Admin tạo/sửa/xác nhận tài khoản hệ thống cho người dùng |
| 3 | **Cấu hình tài khoản** | Admin cấu hình số lần nhập sai mật khẩu + thời gian tạm khóa |

## Ảnh mô tả vùng (Monitor cung cấp kèm lệnh)
- Screenshot_2026-06-28_201949.png → vùng 1: Login hệ thống (4 trạng thái màn login + Note for)
- Screenshot_2026-06-28_202012.png → vùng 2: Quản lý tài khoản_Thêm phương thức đăng nhập (list + tạo mới + modal sửa + alert + nhiều Note)
- Screenshot_2026-06-28_202026.png → vùng 3: Cấu hình tài khoản (danh sách cấu hình + xem chi tiết + Note)

> ⚠️ Node-id cụ thể của từng frame: AI extract trực tiếp từ ảnh (Monitor cung cấp ảnh thay vì truy cập Figma trực tiếp lần này).
