# LUẬT — Giao thức XÓA & GHI ĐÈ có kiểm soát
> File luật bắt buộc. AI agent PHẢI tuân thủ tuyệt đối. Ngày ban hành: 2026-06-26 (theo yêu cầu Monitor).

---

## 0. Vì sao có file này

Monitor yêu cầu: *AI có thể xóa khi được confirm, TUYỆT ĐỐI CẤM xóa khi chưa confirm.*
Đồng thời rà soát phát hiện một rủi ro thật: công cụ `write_file` **có thể ghi đè file đang tồn tại mà không cảnh báo**. Quy tắc "không xóa/không ghi đè" trong config chỉ là cam kết chữ nghĩa — file này biến nó thành **giao thức bắt buộc có bước rõ ràng**.

---

## 1. Sự thật kỹ thuật (minh bạch)

| Khả năng | Công cụ hiện có | Ghi chú |
|---|---|---|
| Xóa file/folder vĩnh viễn | ❌ KHÔNG có | filesystem MCP không có lệnh delete/rmdir |
| Di chuyển / đổi tên | ✅ move_file | |
| Tạo file mới | ✅ write_file | ⚠️ GHI ĐÈ được nếu file đã tồn tại |
| Tạo folder | ✅ create_directory | |
| Đọc | ✅ read/list | |

→ AI **không có khả năng kỹ thuật** để xóa vĩnh viễn. Việc "xóa" của AI = đưa vào thùng rác. Người xóa thật **duy nhất là Monitor**.

---

## 2. GIAO THỨC XÓA (Soft-Delete → Hard-Delete)

### Bước 1 — Soft-delete (AI làm, CHỈ KHI Monitor đã confirm xóa)
- AI `move_file` mục cần xóa vào `_TRASH_cho-monitor-xoa/`.
- Đặt tên kèm lý do: `{tên-gốc}__{lý-do-ngắn}`.
- Ghi 1 dòng vào `_TRASH_cho-monitor-xoa/_DANH-SACH-CHO-XOA.md`: xóa gì, vì sao, ai duyệt, ngày.

### Bước 2 — Hard-delete (CHỈ Monitor làm)
- Monitor tự chạy lệnh xóa thật `_TRASH_cho-monitor-xoa/` (PowerShell).
- AI KHÔNG BAO GIỜ thực hiện bước này (và cũng không có công cụ để làm).

### Điều kiện kích hoạt
- AI chỉ được soft-delete khi Monitor nói rõ: "xóa X", "đồng ý xóa", "dọn X".
- Im lặng = KHÔNG xóa. Nghi ngờ = KHÔNG xóa, hỏi lại.

---

## 3. GIAO THỨC GHI ĐÈ (chống write_file đè mất dữ liệu)

> Trước khi `write_file` vào BẤT KỲ đường dẫn nào, AI phải tự hỏi: "File này đã tồn tại chưa?"

| Tình huống | Hành động bắt buộc |
|---|---|
| File CHƯA tồn tại | Được `write_file` (tạo mới). |
| File ĐÃ tồn tại + là file do AI tạo lượt này | Được ghi đè (đang trong cùng phiên làm việc). |
| File ĐÃ tồn tại + là file CŨ / của Monitor / baseline | ❌ CẤM ghi đè trực tiếp. Phải: (1) báo Monitor file đã tồn tại, (2) chờ confirm, (3) nếu được duyệt → đổi tên bản cũ thành `..._OLD` rồi mới ghi bản mới, KHÔNG đè trắng. |
| Sửa 1 phần nội dung | Dùng cách bảo toàn (đọc → sửa có chủ đích), không viết đè toàn bộ nếu không cần. |

---

## 4. BASELINE — bất khả xâm phạm
- Baseline = artifact đã được Monitor confirm gần nhất.
- AI KHÔNG BAO GIỜ tự ghi đè baseline. Mọi thay đổi → tô màu diff → CHỜ DUYỆT → Monitor confirm → mới ghi.
- Quy tắc này đã có trong workflow core §07, nhắc lại ở đây để tập trung.

---

## 5. Checklist tự kiểm trước mọi thao tác phá hủy/ghi đè
```
□ Monitor đã confirm thao tác này chưa? (xóa/ghi đè file cũ)
□ Nếu xóa: đã move vào _TRASH chưa? (không xóa thẳng)
□ Nếu ghi đè file cũ: đã đổi tên bản cũ thành _OLD chưa?
□ Có đụng baseline không? Nếu có → DỪNG, chờ duyệt.
□ Đã ghi lý do vào sổ (_DANH-SACH-CHO-XOA hoặc CHANGELOG) chưa?
```

> Vi phạm bất kỳ dòng nào = sai luật. Khi nghi ngờ: DỪNG và hỏi Monitor.
