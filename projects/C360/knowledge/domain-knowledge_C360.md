# Domain Knowledge — C360 (C360 Dashboard)
> Tri thức dự án tích lũy. Điền dần qua từng job. CHỜ-MONITOR điền giá trị thật.
> Job đầu: Dashboard Sự kiện Truyền hình.

---

## 1. Glossary
| Thuật ngữ | Định nghĩa | Nguồn |
|---|---|---|
| dashboard | Màn hình tổng hợp gồm nhiều widget/biểu đồ | config |
| widget | Đơn vị hiển thị: chart, KPI card, bảng, bộ lọc | config |
| su_kien_truyen_hinh | CHỜ-MONITOR: định nghĩa nghiệp vụ | — |

## 2. Bản đồ component/widget dùng chung
> CHỜ-MONITOR: liệt kê các widget/biểu đồ dùng chung giữa các dashboard.

## 3. Bản đồ luồng dữ liệu (data flow) — LỚN DẦN QUA TỪNG JOB
> Với dashboard, luồng trọng tâm: filter → query data source → render widget → drill-down.

| Luồng | Data source | Vùng ảnh hưởng | Điểm gãy | Job phát hiện |
|---|---|---|---|---|
| *(chưa có — chờ job đầu chạy)* | | | | |

## 4. Vùng rủi ro cao
| Vùng | Mức | Lý do |
|---|---|---|
| CHỜ-MONITOR: số liệu KPI tổng | HIGH (dự kiến) | Sai số = sai báo cáo |
| CHỜ-MONITOR: bộ lọc thời gian/sự kiện | HIGH (dự kiến) | Ảnh hưởng toàn dashboard |

## 5. Bug/escape đã ghi nhận
| Ngày | Vùng | Mô tả | Bài học |
|---|---|---|---|
| *(chưa có)* | | | |

---
> Xem ví dụ cách điền tại `projects/LKH/knowledge/domain-knowledge_LKH.md` mục cuối.
