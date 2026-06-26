# Domain Knowledge — LKH (Hệ thống quản lý dữ liệu Lakehouse)
> Tri thức dự án tích lũy. Điền dần qua từng job. Feed ngược vào `project-config.json` khi đủ chín.
> ⚠️ File này độc lập với việc tái cấu trúc folder `knowledge/` (đang chờ Monitor làm rõ Phần D).
> Mục đích: gom glossary + đặc thù nghiệp vụ + bản đồ luồng sớm → giảm Q&A lặp ở job sau.

---

## 1. Glossary (thuật ngữ dự án)

| Thuật ngữ | Định nghĩa | Nguồn |
|---|---|---|
| common_rule | Bộ quy tắc UI dùng chung: header, menu, input, button, icon, data grid | config |
| sprint | Đơn vị thời gian phát triển; sprint-14 là sprint hiện tại | config |
| data_grid | Bảng hiển thị dữ liệu dạng lưới có phân trang, sort, filter | config |
| KH | Khách hàng | config |
| *(điền thêm qua từng job)* | | |

## 2. Bản đồ component dùng chung (UI)
Header · Menu/Navigation · Input field · Button · Icon · Data Grid · Modal · Toast · Breadcrumb · Tab · Dropdown · Date Picker · Pagination · Tooltip · Badge · Loading-state.
> Đây là vùng Impact-B trọng tâm: đổi 1 common rule → ảnh hưởng nhiều màn.

## 3. Bản đồ luồng nghiệp vụ (flow map) — LỚN DẦN QUA TỪNG JOB
> ⏳ Sau mỗi job, AI bổ sung luồng mới phát hiện vào đây. Cảnh báo điểm gãy logic.

| Luồng | Mô tả | Vùng ảnh hưởng | Ghi chú/điểm gãy | Job phát hiện |
|---|---|---|---|---|
| *(chưa có — job 1 chỉ là common rule UI, chưa chạm luồng nghiệp vụ sâu)* | | | | |

## 4. Vùng rủi ro cao (lịch sử)

| Vùng | Mức | Lý do |
|---|---|---|
| Component dùng chung toàn hệ thống (header, menu, button primary) | HIGH | 1 thay đổi ảnh hưởng mọi màn |
| Thay đổi behavior (không chỉ visual) | HIGH | Dễ gãy logic tương tác |
| Flow nhập liệu / submit | HIGH | Ảnh hưởng dữ liệu |

## 5. Bug/escape đã ghi nhận
| Ngày | Vùng | Mô tả | Bài học |
|---|---|---|---|
| *(chưa có)* | | | |

---

## VÍ DỤ cách điền (để Monitor hình dung)
> Giả sử sau job 2 phát hiện: "Khi sửa Data Grid pagination, màn Báo cáo doanh thu bị lệch tổng vì dùng chung component grid nhưng custom lại sort." → ghi vào mục 3:

| Luồng | Vùng ảnh hưởng | Điểm gãy |
|---|---|---|
| Data Grid pagination | Mọi màn dùng grid + màn Báo cáo doanh thu (custom sort) | Màn báo cáo override sort → đổi grid gốc làm lệch tổng. CẢNH BÁO khi chạm grid. |

→ Lần sau chạm Data Grid, AI tự cảnh báo Monitor vùng "Báo cáo doanh thu" mà không cần hỏi lại.
