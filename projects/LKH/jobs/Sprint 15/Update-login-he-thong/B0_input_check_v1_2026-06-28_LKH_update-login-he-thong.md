# B0 — Input Check & Phân loại ticket
> Job: LKH / Sprint 15 / Update-login-he-thong · Ngày: 2026-06-28

## 1. Validate input (kiểm tra quyền truy cập)

| ID | Loại input | Nguồn | Trạng thái | Ghi chú |
|---|---|---|---|---|
| I1 | Mô tả yêu cầu (2 chức năng) | Lệnh Monitor | ✅ OK | Đã lưu `input/customer-description.md` |
| I2 | URL Figma gốc | config LKH | ✅ OK | `figma.base_url` |
| I3 | **Figma (NGUỒN THẬT)** — 3 vùng bg #D9D9D9 | URL config + MCP Figma | ⏳ CHỜ KẾT NỐI | Lấy qua **MCP Figma**: text Note, node-id, design tokens đầy đủ |
| I3a | Ảnh định vị vùng 1 — Login hệ thống | Screenshot_...201949.png | ✅ OK | Chỉ để AI **nhận biết vùng**, KHÔNG phải nguồn dữ liệu |
| I3b | Ảnh định vị vùng 2 — Quản lý tài khoản | Screenshot_...202012.png | ✅ OK | Chỉ để nhận biết vùng |
| I3c | Ảnh định vị vùng 3 — Cấu hình tài khoản | Screenshot_...202026.png | ✅ OK | Chỉ để nhận biết vùng |
| I6 | Bối cảnh + Target | Lệnh Monitor | ✅ OK | Đã ghi vào 00_meta |

> **convert-md:** Input lần này KHÔNG có file nặng (pdf/docx/xlsx). Mô tả là text; design lấy từ Figma qua MCP. → Không có gì cần convert.

## 2. Nguồn dữ liệu design = Figma qua MCP (KHÔNG đọc từ ảnh)

Ảnh Monitor cung cấp **chỉ để AI nhận biết 3 vùng cần làm việc** cho dễ. Dữ liệu thật — text các **Note**, node-id từng frame, typography/color/spacing/states — lấy bằng cách **điều khiển MCP Figma truy cập URL** trong config. Vào sâu trong Figma là có đầy đủ.

⚠️ **Hiện trạng:** MCP Figma **CHƯA được kết nối**. AI đã gửi đề xuất kết nối (nút **Connect** ở khung chat). Sau khi Monitor đăng nhập Figma, AI sẽ:
1. `get_metadata` → lấy node-id chính xác của 3 frame bg #D9D9D9.
2. `get_design_context` / `get_variable_defs` → lấy **text các Note** + design tokens từng vùng.
3. `get_screenshot` (nếu cần) → đối chiếu.
4. Extract đầy đủ ở B1 từ nguồn Figma — không suy luận từ ảnh.

## 3. Đề xuất loại ticket: **FULL**

**Lý do:**
- Feature mới chạm **> 5 component/màn**: Login (nhiều state), Danh sách người dùng, Tạo mới tài khoản hệ thống, Xác nhận tạo, Modal sửa, Đổi mật khẩu, Alert, Danh sách cấu hình, Chi tiết cấu hình.
- **Business logic phức tạp:** 3 trường hợp tạo tài khoản, liên kết SSO↔hệ thống qua email, lockout sau N lần sai, thời gian khóa.
- Chạm vùng dùng chung (login = cổng vào toàn hệ thống) → Impact-B/C rõ.
- Target yêu cầu phân tích cực sâu, không miss case → đúng tinh thần Full.

> **Điều chỉnh scope theo Target Monitor:** Login (tài khoản hệ thống) = phân tích SÂU, Risk HIGH. UI = check NÔNG (smoke theo common rule). SSO = chỉ case thẳng + case liên kết.

---

## 🚦 GATE 0 — CHỜ MONITOR
- [ ] **Kết nối MCP Figma** (bấm Connect + đăng nhập) để AI truy cập URL lấy design + text Note.
- [ ] Đồng ý loại ticket = **Full**?

> Theo workflow: AI **DỪNG tại đây**, không sang B1 khi chưa kết nối được Figma + chưa có Gate 0 confirm.
