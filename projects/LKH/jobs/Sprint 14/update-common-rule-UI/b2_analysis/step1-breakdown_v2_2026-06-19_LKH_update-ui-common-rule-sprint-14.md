# B2 — Step 1: Breakdown & Impact Analysis — v2 (post Q&A Round 1)
# LKH_Update-UI-common-rule-sprint-14

**Cập nhật:** 2026-06-19 (sau Q&A Round 1)
**Scope confirmed:** Desktop/PC only, Light mode only, Login OUT of scope

---

## A. DIRECT IMPACT — ĐÃ BỔ SUNG SAU Q&A

| ID | Component / Vùng | Spec confirmed | Nguồn |
|---|---|---|---|
| A-01 | **Header / Navigation** | Bg #F0F2F5, font H5/bold 16px/24px Roboto, radius 5px, border 1px | QA-02+b1_v2§8 |
| A-02 | **Input field — Layout** | Radius 5px, border 1px, pad T8/R12/B8/L12 | b1_v2§4 |
| A-03 | **Input field — States** | Default #D9D9D9 / Focus border #1677FF / Error border #FF4D4F + helptext #F5222D bên dưới / Disabled bg #F5F5F5 border #BFBFBF / Placeholder #8C8C8C | QA-10 |
| A-04 | **Input — Label & Required** | Label = Character/Title .85 (#000000 85%), Required * = Dust Red/6 (#F5222D) | QA-10 |
| A-05 | **Button — Icon (circle)** | 36×36px, radius 100px, padding 8px, gap 10px | b1_v2§5.3 |
| A-06 | **Button — Standard text** | H40px, radius 8px, font Roboto 500 Medium 14px | QA-08 |
| A-07 | **Button — States (tất cả types)** | default/hover/active/focused/disabled — CẦN EXTRACT FIGMA | QA-11 NEED-EXTRACT |
| A-08 | **Button — Color variants** | Primary #1677FF / Ghost transparent+#1677FF / Danger #F5222D / Disabled #F5F5F5+#BFBFBF | b1_v2§5.2 |
| A-09 | **Table / Data Grid** | Row H56px, header bg #E4E4E7, border #D9D9D9, even row #FAFAFA, hover #E6F4FF | b1_v2§6 |
| A-10 | **Table header** | Smoke only (baseline cũ) — không test height | QA-09 |
| A-11 | **Pagination** | Theo common rule — CẦN EXTRACT FIGMA ("Phân trang" node) | QA-13 NEED-EXTRACT |
| A-12 | **Modal** | Bg #FFFFFF, ~radius 8px, không overlay, click ngoài = không đóng, phải click X/Cancel | QA-01 |
| A-13 | **Modal structure** | Header (H5/bold 16px + X), Body (pad 24px), Footer (Primary + Ghost) | b1_v2§7 |
| A-14 | **Typography — Heading** | H1:38/46, H2:30/40, H3:24/32, H4:20/28, H5:16/24 — all Roboto | b1_v2§2.1 |
| A-15 | **Typography — Body** | 14px/22px — regular/medium/bold/underline/strikethrough/code | b1_v2§2.2 |
| A-16 | **Typography — Footnote/Toggle** | CẦN XÁC ĐỊNH | QA-15 OPEN |
| A-17 | **Color — Primary scale** | #1677FF base, #096DD9 hover | b1_v2§3.1 |
| A-18 | **Color — Page background** | #F0F2F5 toàn hệ thống | b1_v2§3.3 |
| A-19 | **Icon system** | Ant Design icon set, SVG, 20×20px | QA-12 |
| A-20 | **Breadcrumb** | Pad L16/R16, fill theo text width, fixed H (cần confirm px), active bg #FFFFFF, text #000000 85% | QA-02 |
| A-21 | **Tag/Badge** | Pad T1/R8/B1/L8, radius 16px, bg #F6FFED (Polar Green/1), text #B7EB8F (Polar Green/3) | QA-03 |
| A-22 | **Footer** | 1440×66.18px, bg #F0F2F5, Roboto 400 12px/16px, "Autolake" #000000 85%, "Copyright" #000000 45% | QA-04 |
| A-23 | **Spacing system** | Input pad 8/12, Button pad 8, Gap 10, Section pad 12 | b1_v2§12 |
| A-24 | **Radius system** | 2/4/5/8/100px scale | b1_v2§13 |

---

## B. INDIRECT IMPACT — CẬP NHẬT SAU Q&A

| ID | Vùng | Mức độ | Trạng thái |
|---|---|---|---|
| B-01 | Toàn bộ form có Input | HIGH | GIỮ |
| B-02 | Toàn bộ button trên hệ thống | HIGH | GIỮ — cần extract button states |
| B-03 | Data grid / Table toàn hệ thống | HIGH | GIỮ |
| B-04 | Modal/Dialog | HIGH | GIỮ — confirmed no overlay |
| B-05 | Header / Menu navigation | HIGH | GIỮ |
| B-06 | Login screen | — | LOẠI (QA-14: out of scope) |
| B-07 | Breadcrumb | MEDIUM | GIỮ — cần confirm height |
| B-08 | Tag/Badge | MEDIUM | GIỮ — spec confirmed QA-03 |
| B-09 | Footer | LOW | GIỮ — spec confirmed QA-04 |
| B-10 | Mobile | — | LOẠI (QA-05: out of scope) |
| B-11 | Dark mode | — | LOẠI (QA-06: out of scope) |
| B-12 | Pagination | HIGH | THÊM MỚI — cần extract |
| B-13 | Icon rendering | MEDIUM | THÊM MỚI — Ant Design icon 20px |
| B-14 | Toàn bộ module màn hình | HIGH | PENDING — cần confirm list module (QA-18) |

---

## C. WORKFLOW IMPACT — CẬP NHẬT

| ID | Workflow | Spec | Trạng thái |
|---|---|---|---|
| C-01 | Form submit / validation | Error = border #FF4D4F + helptext #F5222D dưới field | CONFIRMED |
| C-02 | Modal: click outside | Không đóng — phải dùng button | CONFIRMED |
| C-03 | Navigation / breadcrumb | Active state = bg #FFFFFF + text #000000 85% | CONFIRMED |
| C-04 | Table interaction | Row hover #E6F4FF, click/select row | CONFIRMED |
| C-05 | Button states flow | Tất cả states cần verify — cần extract Figma | NEED-EXTRACT |
| C-06 | Pagination flow | Navigate page, active page styling | NEED-EXTRACT |

---

## MISSING-COVERAGE CÒN LẠI (cần resolve trước khi B3)

| Flag | Item | Action |
|---|---|---|
| MC-01 | Button states (hover/active/focused tất cả types) | Extract Figma — Button node |
| MC-02 | Pagination spec đầy đủ | Extract Figma — "Phân trang" node |
| MC-03 | Breadcrumb height px | Extract Figma hoặc Monitor confirm |
| MC-04 | Character/Title .85 và .45 hex | Monitor confirm (QA-16) |
| MC-05 | Footnote/Toggle — vùng UI và spec | Monitor confirm (QA-15) |
| MC-06 | Danh sách module đầy đủ | Monitor confirm (QA-18) |
