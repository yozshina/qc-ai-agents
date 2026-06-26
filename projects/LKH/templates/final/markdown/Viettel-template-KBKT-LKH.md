# TESTCASE TEMPLATE — Chuẩn Viettel (KBKT)
> Dự án: LKH. Nguồn: template KBKT Viettel cung cấp.
> ⚠️ **BẮT BUỘC:** Mọi job sau của LKH, AI PHẢI sinh Testcase theo ĐÚNG cấu trúc 100% như file này.
> Lý do tồn tại: TC cũ sinh sai template khiến Monitor mất thời gian sửa tay. File này là khuôn chuẩn.

---

## QUY TẮC TUÂN THỦ (đọc trước khi sinh TC)

1. **Đúng 100% cấu trúc cột** — không thêm/bớt/đổi tên cột.
2. File Excel xuất ra gồm **2 sheet**: `Tổng hợp` + `{Tên chức năng}` (sheet nội dung TC).
3. Mỗi sheet nội dung có **2 khối**: (A) Header thống kê "KỊCH BẢN KIỂM THỬ", (B) Bảng TC 3 cột.
4. Dòng **nhóm** (mục 3.1, 3.2... hoặc tiêu đề luồng) để TRỐNG cột Mã + cột Các bước, chỉ điền tên nhóm vào cột giữa — đúng như template gốc.
5. Cột "Các bước thực hiện" dùng `<br>` để xuống dòng trong 1 ô.
6. Mã TC theo định dạng tiền tố dự án: `{Prefix}_{số}` (vd `Up_DB_1`, hoặc theo job: `CR_1`, `UI_1`...).

---

## SHEET 1 — "Tổng hợp"

| TỔNG HỢP KẾT QUẢ KIỂM THỬ | | | | | |
|---|---|---|---|---|---|
| STT | Tên màn hình / Tên chức năng | Tổng số TC | Đạt (P) | Không đạt (F) | Ghi chú |
| 1 | {tên chức năng 1} | | | | |
| ... | | | | | |
| **Total** | | | | | |

---

## SHEET 2 — "{Tên chức năng}" (sheet nội dung Testcase)

### Khối A — Header thống kê (KỊCH BẢN KIỂM THỬ)

| KỊCH BẢN KIỂM THỬ | |
|---|---|
| Tên màn hình / Tên chức năng | {điền} |
| Mã trường hợp kiểm thử | {điền} |
| Số trường hợp kiểm thử đạt (P) | |
| Số trường hợp kiểm thử không đạt (F) | |
| Số trường hợp kiểm thử đang xem xét (PE) | |
| Số trường hợp kiểm thử chưa được thực hiện | |
| Tổng số trường hợp kiểm thử | |

### Khối B — Bảng Testcase (3 cột CHÍNH — khóa cứng)

| Mã trường hợp kiểm thử | Mục đích kiểm thử | Các bước thực hiện |
|---|---|---|
| | **{3.1 Tên nhóm / luồng}** | |
| {Prefix}_1 | {mục đích TC} | 1. {bước 1}<br>2. {bước 2}<br>3. {bước 3} |
| {Prefix}_2 | {mục đích TC} | 1. {bước 1}<br>2. {bước 2} |
| | **{3.2 Tên nhóm / luồng}** | |
| {Prefix}_3 | {mục đích TC} | 1. {bước 1}<br>... |

---

## VÍ DỤ MẪU (lấy từ template Viettel gốc — minh họa đúng format)

| Mã trường hợp kiểm thử | Mục đích kiểm thử | Các bước thực hiện |
|---|---|---|
| | **3.5 Cập nhật DB link** | |
| | Kiểm tra kết nối cơ bản | |
| Up_DB_3 | Kiểm tra kết nối đơn giản | 1. Mở script tại DB HTDS_VAS 19c<br>2. Nhập câu lệnh query:<br>SELECT * FROM dual@link_to_11g; |
| Up_DB_4 | Kiểm tra thông tin DB Link | 1. Mở script tại DB HTDS_VAS 19c<br>2. Nhập câu lệnh query:<br>SELECT db_link, username, host FROM all_db_links; |

---

## GHI CHÚ CHO AI (B4-after)
- Khi sinh `step4_tc`, map sang đúng 3 cột này. KHÔNG dùng schema 9-cột generic của workflow core cho file XUẤT Viettel — schema generic chỉ dùng nội bộ; file giao Monitor phải theo template này.
- Giữ nguyên thứ tự: dòng nhóm trước, các TC con của nhóm sau.
- Mỗi TC = 1 mục đích rõ ràng (1 assertion), các bước đánh số trong 1 ô.
- ⚠️ Đây là bản markdown để Monitor REVIEW cấu trúc. Khi Monitor duyệt → AI dùng skill xlsx xuất ra .xlsx đúng template này (xem `core/rules/rule_testcase-generation.md`).
