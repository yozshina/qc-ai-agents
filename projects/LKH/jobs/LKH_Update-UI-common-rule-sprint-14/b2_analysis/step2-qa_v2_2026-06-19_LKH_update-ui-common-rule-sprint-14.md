# B2 — Step 2: Q&A Round 2 — CLOSED
# LKH_Update-UI-common-rule-sprint-14

**Cập nhật:** 2026-06-19
**Trạng thái:** ALL CLOSED ✅

| QA_ID | Câu hỏi | Trả lời | Trạng thái | Ảnh hưởng |
|---|---|---|---|---|
| QA-15 | Footnote/Toggle dùng ở đâu? | Không quan trọng vị trí. Chỉ validate style tồn tại và đúng. | CLOSED | TCD: validate Footnote 10/12px, Toggle 12px |
| QA-16 | Character/Title .85 hex? | Đúng = rgba(0,0,0,0.85) | CLOSED | Color token confirmed toàn bộ |
| QA-17 | Breadcrumb height? | **22px** | CLOSED | TCD: breadcrumb height verify |
| QA-18 | Danh sách module? | Không cần — TC chung, execute sẽ tự áp | CLOSED | Không cần thêm TCD per-module |

---

## TỔNG KẾT Q&A (R1 + R2) — 18 câu, ALL CLOSED

| QA_ID | Kết quả confirm |
|---|---|
| QA-01 | Modal: không đóng khi click ngoài, phải click button |
| QA-02 | Breadcrumb: L/R pad 16px, fill text width, H 22px, active bg #FFFFFF, text rgba(0,0,0,0.85) |
| QA-03 | Tag: T1/R8/B1/L8px, radius 16px, bg #F6FFED, text #B7EB8F |
| QA-04 | Footer: 1440×66.18px, bg #F0F2F5, Roboto 400 12px/16px, text .85/.45 |
| QA-05 | Scope: Desktop only |
| QA-06 | Color mode: Light only |
| QA-07 | Footnote/Toggle: đã extract từ Figma |
| QA-08 | Button label: Roboto 500 Medium 14px |
| QA-09 | Table header: smoke TC only |
| QA-10 | Input: label rgba(0,0,0,0.85), req asterisk #F5222D, error = border #FF4D4F + helptext #F5222D |
| QA-11 | Button: 5 types × 5 states (Default/Hover/Active/Focused/Disabled) |
| QA-12 | Icon: Ant Design SVG, 20×20px |
| QA-13 | Pagination: IN scope, node "Phân trang", H 36px, Width 666px |
| QA-14 | Login: OUT of scope |
| QA-15 | Footnote/Toggle: validate style, không cần biết location |
| QA-16 | Character .85 = rgba(0,0,0,0.85) confirmed |
| QA-17 | Breadcrumb height = 22px confirmed |
| QA-18 | Module list: không cần — TC generic |
