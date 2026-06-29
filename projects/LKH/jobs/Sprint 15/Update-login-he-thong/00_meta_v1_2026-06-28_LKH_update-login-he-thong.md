# 00_meta — LKH / Sprint 15 / Update-login-he-thong
> AI đọc file này TRƯỚC khi làm bất cứ gì trong job.

## Thông tin job
| Mục | Nội dung |
|---|---|
| Project | LKH (Hệ thống quản lý dữ liệu Lakehouse) |
| Sprint | Sprint 15 |
| Job | Update-login-he-thong |
| Mô tả | Bổ sung phương thức đăng nhập bằng tài khoản hệ thống (username/password) song song SSO; quản lý tài khoản hệ thống; cấu hình số lần sai/khóa |
| Loại | Feature mới (login tài khoản hệ thống) |
| Workflow áp dụng | core/workflow/QC-AI-AGENTS_WORKFLOW_v2_25-06-2026.md |
| Tool gọi | QC-AI-workflow + convert-md + project:LKH |
| Trust Level | 0 |
| Ngày tạo | 2026-06-28 |

## Trọng tâm (từ Target của Monitor)
- **Phân tích CỰC SÂU** vào tính năng login tài khoản hệ thống — không miss case, không miss trường hợp có thể xảy ra (liên quan dữ liệu lớn ở production).
- SSO: chỉ test case thẳng (nhập user/pass + SSO bình thường là đủ), trừ các case liên quan đến liên kết.
- **UI: chỉ check đơn giản** vài chỗ bất kỳ đã theo common rule chưa — KHÔNG check sâu.

## 3 vùng Figma (bg #D9D9D9)
1. Login hệ thống
2. Quản lý tài khoản_Thêm phương thức đăng nhập
3. Cấu hình tài khoản

## ⚠️ Lưu ý đặc biệt
Mỗi vùng đều có phần **Note** trên Figma — ảnh hưởng luồng dự án, phải đọc kỹ ở B1.

## Trạng thái pipeline
| Bước | Trạng thái |
|---|---|
| B0 Input check | 🔄 ĐANG LÀM |
| B1 Extract | 🔲 |
| B2 Analyze + Q&A | 🔲 |
| B3 TCD + Risk | 🔲 |
| B4-before Checkpoint | 🔲 |
| B4-after Test Case | 🔲 |
| B5 Export | 🔲 |
| Kaizen | 🔲 |
