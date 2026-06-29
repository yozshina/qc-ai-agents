# 📌 JOB PROGRESS — LKH / Sprint 15 / Update-login-he-thong
> File theo dõi tiến độ để TIẾP TỤC ở cửa sổ chat mới mà KHÔNG mất context.
> Cập nhật: 2026-06-28. AI đọc file này + 00_meta + b1_extract trước khi chạy tiếp.

---

## 0. ⛔ LUẬT MỚI (đã đưa vào workflow) — B-PRE: kiểm tra MCP TRƯỚC
Trước mọi bước, phải kết nối được MCP cần thiết (filesystem, Figma/Chrome). MCP lỗi → DỪNG NGAY, không suy nghĩ/phân tích tiếp, chỉ báo Monitor. Xem `core/workflow/QC-AI-AGENTS_WORKFLOW_v2_25-06-2026.md` mục **B-PRE**.

## 1. LỆNH GỐC CỦA JOB
- **Tool:** QC-AI-workflow + convert-md + project:LKH
- **Mục tiêu:** Bổ sung đăng nhập bằng **tài khoản hệ thống (SYSTEM = username/password)** song song SSO. Tạo testcase.
- **Trọng tâm (Target):** phân tích **CỰC SÂU** login tài khoản hệ thống, không miss case (dữ liệu lớn ở production). SSO chỉ test case thẳng + case liên kết. **UI check NÔNG** (vài chỗ theo common rule).
- **Folder:** `projects/LKH/jobs/Sprint 15/Update-login-he-thong/`
- **Lưu ý Monitor:** mỗi vùng Figma có phần **Note** — đọc kỹ vì ảnh hưởng luồng dự án.

## 2. NGUỒN DESIGN — Figma
- fileKey: `Dk7KnsNNVmPAJKT0VmmOv5` (Hệ thống quản lý dữ liệu Lakehouse).
- **Node-id 3 vùng (Monitor cung cấp):**
  | Vùng | node-id |
  |---|---|
  | Login hệ thống | `189339-50644` |
  | Quản lý tài khoản_Thêm phương thức đăng nhập | `189339-50645` |
  | Cấu hình tài khoản | `189339-50646` |
- **Cách lấy data (ưu tiên):** MCP Figma chính thức (`use_figma`, `get_context_for_code_connect`) — lấy node có cấu trúc.
- **Fallback:** extension Chrome — mở URL `?node-id=...` → chọn frame → phím **Shift+2** (zoom to selection) → screenshot/zoom. Đọc Note: double-click khối Note rồi Shift+2.
- Ảnh PNG Monitor gửi CHỈ để nhận biết vùng, KHÔNG phải nguồn dữ liệu.

## 3. TRẠNG THÁI PIPELINE
| Bước | Trạng thái | Ghi chú |
|---|---|---|
| B-PRE MCP check | ✅ (luật mới, áp dụng từ giờ) | |
| B0 Input check | ✅ XONG | Loại ticket = **Full**. Gate 0 coi như pass (Monitor cấp node-id + bảo tiếp tục). |
| B1 Extract — Vùng 1 Login | ✅ XONG | File `b1_extract/b1-extract_vung1-login_v1...md`. Gồm Note + 4 state. |
| B1 Extract — Vùng 2 Quản lý tài khoản | 🔄 ĐANG LÀM | node `189339-50645`. CHƯA extract. **LÀM TIẾP Ở ĐÂY.** |
| B1 Extract — Vùng 3 Cấu hình tài khoản | 🔲 CHƯA | node `189339-50646`. |
| B1 Gate 1 | 🔲 | Sau 3 vùng → Monitor confirm extract. |
| B2 Analyze + Q&A | 🔲 | Trọng tâm: logic login SYSTEM, 3 trường hợp tạo tài khoản, liên kết SSO qua email, lockout. |
| B3 TCD + Risk | 🔲 | |
| B4-before Checkpoint | 🔲 | |
| B4-after Test Case | 🔲 | Template Viettel KBKT của LKH. |
| B5 Export | 🔲 | |
| Kaizen | 🔲 | |

## 4. ĐÃ EXTRACT — VÙNG 1 LOGIN (chi tiết ở file b1)
**Note vùng Login (QUAN TRỌNG):**
- Đăng nhập 1 trong 2: tài khoản **SYSTEM** (username/password) hoặc **SSO**.
- SYSTEM: đếm số lần nhập sai mật khẩu → vượt quá số lần quy định → **tạm khóa** theo thời gian cấu hình → hết khóa **reset số lần sai về 0**.
- Khi SYSTEM bị khóa: vẫn **login SSO được** (nếu SSO hợp lệ); login lại bằng SYSTEM phải chờ hết khóa.

**4 state màn Login:** (1) default; (2) error "Tên đăng nhập hoặc mật khẩu không đúng" (field viền đỏ + icon); (3) lockout "Bạn đã nhập sai quá số lần quy định. Vui lòng thử lại sau!" + button disabled "Thử lại sau 14:59"; (4) biến thể nhập liệu. Nút "Đăng nhập bằng tài khoản SSO" luôn bật.
**UI tokens:** button primary đỏ Viettel full-width; button SSO outline đỏ + icon; input label trên + placeholder, error→viền đỏ+icon+text đỏ; password có toggle mắt; layout 2 cột (ảnh nền + panel form trắng).

## 5. CẦN LÀM TIẾP (ngay)
1. **Vùng 2** (`189339-50645`): list người dùng (full cột), Tạo mới tài khoản hệ thống, Xác nhận tạo, Modal chỉnh sửa, Đổi mật khẩu, các Alert (cảnh báo/thông báo), và **TẤT CẢ Note** (vùng nhiều Note nhất).
2. **Vùng 3** (`189339-50646`): danh sách cấu hình, chi tiết cấu hình (số lần sai, thời gian khóa), Note.
3. Ghi mỗi vùng 1 file trong `b1_extract/`.
4. Xong 3 vùng → tổng hợp → **Gate 1** chờ Monitor.

## 6. MÔI TRƯỜNG
- Repo: `C:\Users\hi\qc-ai-agents`.
- Browser fallback: extension Chrome "Browser 1" (deviceId `6983ccd5-7ff0-4ce4-b906-f26279c18b9a`), tab Figma `1565675944`.
- Lưu ý: filesystem + browser MCP từng timeout 4 phút. Nếu lỗi → theo luật B-PRE: DỪNG, báo Monitor.
