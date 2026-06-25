# B2 — Step 1: Breakdown & Impact Analysis
# LKH_Update-UI-common-rule-sprint-14

**Input:** b1_extract_v2.md (confirmed Gate 1)
**Ngày:** 2026-06-19
**Loại:** Common Rule — áp dụng TOÀN HỆ THỐNG (không phải 1 màn hình cụ thể)

---

## A. DIRECT IMPACT (Tầng A)
> Những gì thay đổi trực tiếp theo common rule mới

| ID | Component / Vùng | Thay đổi trực tiếp | Nguồn |
|---|---|---|---|
| A-01 | **Header / Navigation** | Background #F0F2F5, font H5/bold 16px/24px Roboto, radius 5px, border 1px | b1_v2 §8 |
| A-02 | **Input field** | Radius 5px, border 1px #D9D9D9, padding T8/R12/B8/L12, font Body/regular 14px | b1_v2 §4 |
| A-03 | **Input field — States** | Default border #D9D9D9 / Focus #1677FF / Error #FF4D4F / Disabled bg #F5F5F5 border #BFBFBF / Placeholder color #8C8C8C | b1_v2 §4.3 |
| A-04 | **Button — Icon (circle)** | Size 36×36px, radius 100px, padding 8px, gap 10px | b1_v2 §5.3 |
| A-05 | **Button — Standard (text)** | Height 40px, radius 8px | b1_v2 §5.1 |
| A-06 | **Button — Variants** | Primary fill #1677FF / Ghost transparent+#1677FF / Danger #F5222D / Disabled #F5F5F5+#BFBFBF | b1_v2 §5.2 |
| A-07 | **Table / Data Grid** | Row height 56px, header bg #E4E4E7, border #D9D9D9, row even #FAFAFA, hover #E6F4FF | b1_v2 §6 |
| A-08 | **Modal** | Bg #FFFFFF, radius ~8px, không có overlay, header H5/bold + close btn, footer Primary+Ghost | b1_v2 §7 |
| A-09 | **Typography toàn hệ thống** | Font Roboto thay thế font cũ, scale H1(38)-H2(30)-H3(24)-H4(20)-H5(16)-Body(14) | b1_v2 §2 |
| A-10 | **Color system** | Primary #1677FF, Primary/7 #096DD9, Neutral scale, Page-bg #F0F2F5, Error #FF4D4F | b1_v2 §3 |
| A-11 | **Page background** | Toàn hệ thống dùng #F0F2F5 (Conditional/page-background) | b1_v2 §3.3 |
| A-12 | **Breadcrumb** | Component có trong Local system — chưa có spec chi tiết | b1_v2 §10 |
| A-13 | **Tag / Badge** | Component có trong Local system — chưa có spec chi tiết | b1_v2 §11 |
| A-14 | **Footer** | Component có trong Local system — chưa có spec chi tiết | b1_v2 §9 |
| A-15 | **Spacing system** | Input pad 8/12, Button pad 8, Gap 10, Section pad 12 | b1_v2 §12 |
| A-16 | **Radius system** | 2px/4px/5px/8px/100px scale — thay thế radius cũ | b1_v2 §13 |

---

## B. INDIRECT IMPACT — Candidate Regression (Tầng B)
> Những màn hình/chức năng khác đang dùng các component trên sẽ bị ảnh hưởng

| ID | Vùng ảnh hưởng gián tiếp | Lý do | Mức độ | Ghi chú |
|---|---|---|---|---|
| B-01 | **Toàn bộ màn hình có Input** | Common rule thay border, padding, radius, state — mọi form đều bị ảnh hưởng | HIGH | Cần regression toàn bộ form fields |
| B-02 | **Toàn bộ màn hình có Button** | Radius, height, color thay đổi | HIGH | Cần verify cả icon button lẫn text button |
| B-03 | **Toàn bộ Data Grid / Table** | Row height 56px, header color thay đổi | HIGH | Verify pagination, sort, filter header |
| B-04 | **Toàn bộ màn hình có Modal/Dialog** | Không có overlay — khác với pattern thông thường | HIGH | Cần confirm UX: modal có shadow không? |
| B-05 | **Toàn bộ menu / navigation** | Font H5/bold, background header thay đổi | HIGH | Active state, hover state menu |
| B-06 | **Màn hình Login / Sign-in** | Typography, color, button thay đổi | MEDIUM | Frame "Sign-In-Form-Desktop-Layout-1440" thấy trong Figma |
| B-07 | **Màn hình có Breadcrumb** | Breadcrumb component chưa có spec | MEDIUM | [MISSING-COVERAGE] — cần Q&A |
| B-08 | **Màn hình có Tag/Badge** | Tag component chưa có spec | MEDIUM | [MISSING-COVERAGE] — cần Q&A |
| B-09 | **Màn hình có Footer** | Footer component chưa có spec | LOW | [MISSING-COVERAGE] — cần Q&A |
| B-10 | **Responsive / Mobile** | Figma có "Ant Design Mobile" — chưa rõ scope | LOW | [MISSING-COVERAGE] — cần Q&A |
| B-11 | **Dark mode** | Figma có "Dark" page trong Colors — chưa rõ có áp dụng không | LOW | [MISSING-COVERAGE] — cần Q&A |

---

## C. WORKFLOW IMPACT (Tầng C)
> Luồng nghiệp vụ / user flow bị ảnh hưởng

| ID | Workflow | Ảnh hưởng | Ghi chú |
|---|---|---|---|
| C-01 | **Form submit flow** | Input state Error (#FF4D4F) — cần verify error message hiển thị đúng | Toàn bộ form validation |
| C-02 | **Modal confirm flow** | Không có overlay — user có thể click ngoài modal → cần verify behavior | [MISSING-COVERAGE] |
| C-03 | **Navigation flow** | Menu active state / breadcrumb — cần verify khi navigate | Liên quan B-05, B-07 |
| C-04 | **Table interaction flow** | Row height 56px + hover #E6F4FF — cần verify click, select row, sort | Data grid UX |
| C-05 | **Button loading/disabled flow** | Disabled state #F5F5F5/#BFBFBF — cần verify ở tất cả button types | |

---

## D. OBSOLETED CANDIDATES
> Chưa có baseline TC cũ → không có candidate obsoleted ở bước này
> Đây là job đầu tiên dùng common rule → kết quả sẽ là BASELINE mới

| ID | Ghi chú |
|---|---|
| D-01 | Không có baseline TC cũ để compare |
| D-02 | Output của job này = baseline mới cho tất cả job UI về sau |

---

## SUMMARY

| Tầng | Số items | Mức độ ưu tiên |
|---|---|---|
| A — Direct | 16 items | Tất cả HIGH |
| B — Indirect | 11 items | HIGH×5, MEDIUM×3, LOW×3 |
| C — Workflow | 5 items | Cần verify |
| D — Obsoleted | N/A | Không áp dụng (job đầu tiên) |

**[MISSING-COVERAGE] flags:** B-07 (Breadcrumb spec), B-08 (Tag spec), B-09 (Footer spec), B-10 (Mobile scope), B-11 (Dark mode scope), C-02 (Modal no-overlay behavior)
