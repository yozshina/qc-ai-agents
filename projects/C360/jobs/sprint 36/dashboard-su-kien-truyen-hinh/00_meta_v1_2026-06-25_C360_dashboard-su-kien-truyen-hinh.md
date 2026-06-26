# Job: C360_Dashboard-Su-Kien-Truyen-Hinh
> File: `00_meta_v1_2026-06-25_C360_dashboard-su-kien-truyen-hinh.md`
> **AI đọc file này TRƯỚC khi làm bất cứ gì trong job.**

---

## Thông tin job

| Mục | Nội dung |
|---|---|
| **Project** | C360 (C360 Dashboard) |
| **Job ID** | C360_Dashboard-Su-Kien-Truyen-Hinh |
| **Mô tả** | Xây dựng Dashboard SỰ KIỆN TRUYỀN HÌNH |
| **Loại** | Feature create new (dashboard mới) |
| **Trust Level** | 0 (job đầu tiên của dự án — mọi gate phải pass thủ công) |
| **Workflow áp dụng** | `core/pipeline/qc-workflow_core_v3_2026-06-25.md` |
| **Config** | `projects/C360/project-config.json` |
| **Ngày tạo** | 2026-06-25 |

---

## Trạng thái pipeline

| Bước | Trạng thái | Resume point |
|---|---|---|
| **B0** Input check | 🔲 CHƯA BẮT ĐẦU — chờ Monitor cấp input vào `input/` | Bắt đầu tại đây |
| **B1** Extract | 🔲 Chưa | |
| **B2** Analyze + Q&A | 🔲 Chưa | |
| **B3** TCD + Risk | 🔲 Chưa | |
| **B4-before** Checkpoint | 🔲 Chưa | |
| **B4-after** Test Case | 🔲 Chưa | |
| **B5** Export | 🔲 Chưa | |
| **Kaizen** | 🔲 Chưa | |

---

## ⚠️ Việc Monitor cần làm trước khi AI chạy B0

1. **Điền giá trị thật vào `projects/C360/project-config.json`** — mọi chỗ đánh dấu `CHỜ-MONITOR` (domain, glossary sự kiện truyền hình, impact_map, high_risk_areas, template paths, default_flow).
2. **Cấp input vào `input/`:**
   - File mô tả yêu cầu Dashboard Sự kiện Truyền hình (bắt buộc)
   - Link Figma design nếu có (ghi vào `input/figma-url.txt`)
   - Data dictionary / mapping nguồn dữ liệu của dashboard nếu có
3. **Chỉ định loại ticket dự kiến** (dashboard mới thường là Full).
4. **Chỉ định path template TC** sẽ dùng cho B4.

---

## Ghi chú riêng cho job dashboard (từ Section B1 của core)

> Core có ghi chú: 7 hạng mục extract gốc thiên về UI. Với dashboard, ngoài 7 hạng mục UI chuẩn,
> B1 nên extract bổ sung phần **data-binding của từng widget** (mỗi widget lấy dữ liệu từ đâu, filter nào áp lên, đơn vị/định dạng số liệu, điều kiện empty/error của dữ liệu).
> Đây là vùng dễ phát sinh bug nhất ở dashboard (số liệu sai, filter sai, render sai khi data rỗng).
> → AI sẽ đề xuất thêm mục này tại B1 và hỏi Monitor confirm qua Q&A. **Không tự thêm vào core.**

---

## Lịch sử
| 2026-06-25 | Tạo job, dựng khung. Chờ Monitor cấp input + điền config. |
