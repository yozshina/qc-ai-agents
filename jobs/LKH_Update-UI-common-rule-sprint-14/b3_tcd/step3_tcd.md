# B3 — Test Condition Design (TCD)
# LKH_Update-UI-common-rule-sprint-14

**Ngày:** 2026-06-19
**Input:** step1_breakdown_v2 + b1_extract_supplement_v2 + Q&A R1+R2 ALL CLOSED
**Scope:** Desktop/PC only | Light mode only | Login OUT

---

## LEGEND
- **[BDD]** — Behavior-driven scenario (UI render / user interaction)
- **[UI-COV]** — UI coverage (visual/style verification)
- **[IMPACT-IND]** — Indirect impact / regression candidate
- **[IMPACT-WF]** — Workflow / flow impact
- **Risk:** H=High / M=Medium / L=Low

---

## MODULE 1 — TYPOGRAPHY SYSTEM

| TCD_ID | Level | Điều kiện test | Impact Ref | Risk |
|---|---|---|---|---|
| TCD-TYP-01 | [UI-COV] | Font family toàn hệ thống là Roboto (không phải font khác) | A-14,15 | H |
| TCD-TYP-02 | [UI-COV] | H1: size 38px, weight medium(500), line-height 46px | A-14 | M |
| TCD-TYP-03 | [UI-COV] | H2: size 30px, weight medium(500), line-height 40px | A-14 | M |
| TCD-TYP-04 | [UI-COV] | H3/medium: size 24px, weight 500, line-height 32px | A-14 | M |
| TCD-TYP-05 | [UI-COV] | H3/regular: size 24px, weight 400, line-height 32px | A-14 | M |
| TCD-TYP-06 | [UI-COV] | H4/medium: size 20px, weight 500, line-height 28px | A-14 | M |
| TCD-TYP-07 | [UI-COV] | H4/regular: size 20px, weight 400, line-height 28px | A-14 | M |
| TCD-TYP-08 | [UI-COV] | H5/regular: size 16px, weight 400, line-height 24px | A-14 | M |
| TCD-TYP-09 | [UI-COV] | H5/medium: size 16px, weight 500, line-height 24px | A-14 | M |
| TCD-TYP-10 | [UI-COV] | H5/bold: size 16px, weight 700, line-height 24px — dùng cho header/menu label | A-14 | H |
| TCD-TYP-11 | [UI-COV] | Body/regular: size 14px, weight 400, line-height 22px | A-15 | H |
| TCD-TYP-12 | [UI-COV] | Body/medium: size 14px, weight 500, line-height 22px | A-15 | M |
| TCD-TYP-13 | [UI-COV] | Body/bold: size 14px, weight 700, line-height 22px | A-15 | M |
| TCD-TYP-14 | [UI-COV] | Body/regular-underline: size 14px, style underline | A-15 | L |
| TCD-TYP-15 | [UI-COV] | Body/regular-strikethrough: size 14px, style strikethrough | A-15 | L |
| TCD-TYP-16 | [UI-COV] | Body/code: size 14px, monospace rendering | A-15 | L |
| TCD-TYP-17 | [UI-COV] | Footnote/description: size 10px, line-height 20px | A-16 | M |
| TCD-TYP-18 | [UI-COV] | Footnote/system-monospace: size 12px, line-height 20px | A-16 | M |
| TCD-TYP-19 | [UI-COV] | Toggle/regular: size 12px, weight 400, line-height 20px | A-16 | M |
| TCD-TYP-20 | [IMPACT-IND] | Letter spacing = 0% trên tất cả text styles | A-14,15,16 | L |

---

## MODULE 2 — COLOR SYSTEM

| TCD_ID | Level | Điều kiện test | Impact Ref | Risk |
|---|---|---|---|---|
| TCD-CLR-01 | [UI-COV] | Page background toàn hệ thống = #F0F2F5 | A-18 | H |
| TCD-CLR-02 | [UI-COV] | Primary/6 = #1677FF — button primary, link | A-17 | H |
| TCD-CLR-03 | [UI-COV] | Primary/7 = #096DD9 — hover state của primary | A-17 | H |
| TCD-CLR-04 | [UI-COV] | Neutral/5 = #D9D9D9 — border default | A-02 | H |
| TCD-CLR-05 | [UI-COV] | Neutral/7 = #8C8C8C — placeholder text | A-03 | M |
| TCD-CLR-06 | [UI-COV] | Neutral/10 = #262626 — primary text color | A-14 | M |
| TCD-CLR-07 | [UI-COV] | Error color: border #FF4D4F (Dust Red/5) | A-03 | H |
| TCD-CLR-08 | [UI-COV] | Danger fill: #F5222D (Dust Red/6) — danger button | A-08 | H |
| TCD-CLR-09 | [UI-COV] | Character/Title.85 = rgba(0,0,0,0.85) — label, breadcrumb | A-04,A-20 | H |
| TCD-CLR-10 | [UI-COV] | Character/Secondary.45 = rgba(0,0,0,0.45) — footer copyright | A-22 | M |
| TCD-CLR-11 | [UI-COV] | Tag bg = Polar Green/1 = #F6FFED | A-21 | M |
| TCD-CLR-12 | [UI-COV] | Tag text = Polar Green/3 = #B7EB8F | A-21 | M |
| TCD-CLR-13 | [IMPACT-IND] | Disabled bg = #F5F5F5 (Neutral/4) trên tất cả component | A-03,A-08 | M |

---

## MODULE 3 — INPUT FIELD

| TCD_ID | Level | Điều kiện test | Impact Ref | Risk |
|---|---|---|---|---|
| TCD-INP-01 | [BDD] | Input render đúng border-radius = 5px | A-02 | H |
| TCD-INP-02 | [BDD] | Input border mặc định = 1px solid #D9D9D9 | A-02,A-03 | H |
| TCD-INP-03 | [BDD] | Input padding: top 8px, right 12px, bottom 8px, left 12px | A-02 | M |
| TCD-INP-04 | [BDD] | Input value text = Body/regular 14px, color #262626 | A-15 | M |
| TCD-INP-05 | [BDD] | Placeholder text color = #8C8C8C (Neutral/7) | A-03 | M |
| TCD-INP-06 | [BDD] | Label text = rgba(0,0,0,0.85), font Body/medium 14px | A-04 | H |
| TCD-INP-07 | [BDD] | Required asterisk (*) = color #F5222D (Dust Red/6) | A-04 | H |
| TCD-INP-08 | [BDD] | State DEFAULT: border #D9D9D9, bg #FFFFFF | A-03 | H |
| TCD-INP-09 | [BDD] | State FOCUS: border đổi thành #1677FF (Primary/6), bg #FFFFFF | A-03 | H |
| TCD-INP-10 | [BDD] | State ERROR: border đổi thành #FF4D4F, bg #FFFFFF, label KHÔNG đổi màu | A-03 | H |
| TCD-INP-11 | [BDD] | State ERROR: helptext hiển thị bên dưới, color #F5222D | A-03,C-01 | H |
| TCD-INP-12 | [BDD] | State DISABLED: border #BFBFBF, bg #F5F5F5, text #8C8C8C | A-03 | H |
| TCD-INP-13 | [UI-COV] | Input hiển thị đúng các variant: Label/Req/Hint/Icon/Word-count | A-02 | M |
| TCD-INP-14 | [IMPACT-WF] | Submit form khi input error: helptext visible + border đỏ tồn tại đến khi user sửa | C-01 | H |
| TCD-INP-15 | [IMPACT-IND] | Tất cả input trên các màn đều apply cùng radius/border/padding rule | B-01 | H |

---

## MODULE 4 — BUTTON (Standard Text)

| TCD_ID | Level | Điều kiện test | Impact Ref | Risk |
|---|---|---|---|---|
| TCD-BTN-01 | [UI-COV] | Button height = 40px | A-06 | H |
| TCD-BTN-02 | [UI-COV] | Button border-radius = 8px | A-06 | H |
| TCD-BTN-03 | [UI-COV] | Button label: Roboto, 14px, weight 500 (Medium) | A-06 | H |
| TCD-BTN-04 | [BDD] | Primary/Default: fill #1677FF, text #FFFFFF | A-08 | H |
| TCD-BTN-05 | [BDD] | Primary/Hover: fill #096DD9, text #FFFFFF | A-08 | H |
| TCD-BTN-06 | [BDD] | Primary/Active: pressed/active state render đúng | A-07 | H |
| TCD-BTN-07 | [BDD] | Primary/Focused: focus ring visible | A-07 | H |
| TCD-BTN-08 | [BDD] | Primary/Disabled: fill #F5F5F5, text #BFBFBF, không click được | A-08 | H |
| TCD-BTN-09 | [BDD] | Secondary: Default/Hover/Active/Focused/Disabled render đúng | A-07 | M |
| TCD-BTN-10 | [BDD] | Gray: Default/Hover/Active/Focused/Disabled render đúng | A-07 | M |
| TCD-BTN-11 | [BDD] | Outline: Default/Hover/Active/Focused/Disabled render đúng | A-07 | M |
| TCD-BTN-12 | [BDD] | Outline-Gray: Default/Hover/Active/Focused/Disabled render đúng | A-07 | M |
| TCD-BTN-13 | [BDD] | Danger button: fill #F5222D, text #FFFFFF | A-08 | H |
| TCD-BTN-14 | [IMPACT-IND] | Tất cả button trên hệ thống apply cùng height/radius rule | B-02 | H |

---

## MODULE 5 — ICON BUTTON (Circle)

| TCD_ID | Level | Điều kiện test | Impact Ref | Risk |
|---|---|---|---|---|
| TCD-ICN-01 | [UI-COV] | Icon button: 36×36px, border-radius 100px (circle) | A-05 | H |
| TCD-ICN-02 | [UI-COV] | Icon button padding = 8px | A-05 | M |
| TCD-ICN-03 | [UI-COV] | Icon size bên trong = 20×20px (Ant Design SVG) | A-19 | H |
| TCD-ICN-04 | [BDD] | Primary icon button: fill màu đúng variant (Default/Hover/Active/Focused/Disabled) | A-05,A-07 | H |
| TCD-ICN-05 | [BDD] | Ghost/Blue icon button: transparent fill + blue icon, đủ 5 states | A-07 | M |
| TCD-ICN-06 | [BDD] | Secondary, Gray, Outline icon button: đủ 5 states | A-07 | M |
| TCD-ICN-07 | [IMPACT-IND] | Icon set là Ant Design SVG (không dùng icon cũ) | A-19,B-13 | H |

---

## MODULE 6 — HEADER / NAVIGATION

| TCD_ID | Level | Điều kiện test | Impact Ref | Risk |
|---|---|---|---|---|
| TCD-HDR-01 | [UI-COV] | Header background = #F0F2F5 | A-01 | H |
| TCD-HDR-02 | [UI-COV] | Header border-radius = 5px | A-01 | M |
| TCD-HDR-03 | [UI-COV] | Header border = 1px | A-01 | M |
| TCD-HDR-04 | [UI-COV] | Menu/Nav label: H5/bold, 16px, weight 700, Roboto | A-01 | H |
| TCD-HDR-05 | [BDD] | Menu item active state hiển thị đúng (bg, text color) | C-03 | H |
| TCD-HDR-06 | [BDD] | Menu item hover state hiển thị đúng | A-01 | M |
| TCD-HDR-07 | [IMPACT-IND] | Tất cả màn dùng chung header component, style nhất quán | B-05 | H |

---

## MODULE 7 — BREADCRUMB

| TCD_ID | Level | Điều kiện test | Impact Ref | Risk |
|---|---|---|---|---|
| TCD-BRD-01 | [UI-COV] | Breadcrumb item height = 22px | A-20 | H |
| TCD-BRD-02 | [UI-COV] | Breadcrumb item padding: left 16px, right 16px | A-20 | M |
| TCD-BRD-03 | [UI-COV] | Breadcrumb width fill theo độ dài text | A-20 | M |
| TCD-BRD-04 | [BDD] | Active breadcrumb item: background = #FFFFFF | A-20,C-03 | H |
| TCD-BRD-05 | [BDD] | Breadcrumb text color = rgba(0,0,0,0.85) | A-20 | M |
| TCD-BRD-06 | [IMPACT-WF] | Navigate qua breadcrumb → trang đúng, active state cập nhật đúng | C-03 | H |

---

## MODULE 8 — TABLE / DATA GRID

| TCD_ID | Level | Điều kiện test | Impact Ref | Risk |
|---|---|---|---|---|
| TCD-TBL-01 | [UI-COV] | Data row height = 56px | A-09 | H |
| TCD-TBL-02 | [UI-COV] | Table header background = #E4E4E7 | A-09 | H |
| TCD-TBL-03 | [UI-COV] | Table border color = #D9D9D9 | A-09 | M |
| TCD-TBL-04 | [UI-COV] | Even row background = #FAFAFA | A-09 | M |
| TCD-TBL-05 | [UI-COV] | Odd row background = #FFFFFF | A-09 | M |
| TCD-TBL-06 | [BDD] | Row hover: background đổi thành #E6F4FF | A-09,C-04 | H |
| TCD-TBL-07 | [BDD] | Header text: Body/medium 14px, color #262626 | A-09 | M |
| TCD-TBL-08 | [BDD] | Cell text: Body/regular 14px, color #262626 | A-09 | M |
| TCD-TBL-09 | [BDD] | Table header smoke (baseline): header render = baseline cũ | A-10 | L |
| TCD-TBL-10 | [IMPACT-IND] | Tất cả data grid trên hệ thống apply row height 56px | B-03 | H |

---

## MODULE 9 — PAGINATION

| TCD_ID | Level | Điều kiện test | Impact Ref | Risk |
|---|---|---|---|---|
| TCD-PAG-01 | [UI-COV] | Pagination row height = 36px | A-11 | H |
| TCD-PAG-02 | [UI-COV] | Pagination width = 666px | A-11 | M |
| TCD-PAG-03 | [UI-COV] | Border top = 2px phân cách table body | A-11 | M |
| TCD-PAG-04 | [BDD] | Active page button: style khác biệt với non-active | A-11,C-06 | H |
| TCD-PAG-05 | [BDD] | Pagination Default variant render đúng | A-11 | H |
| TCD-PAG-06 | [BDD] | Pagination Variant2 render đúng | A-11 | M |
| TCD-PAG-07 | [IMPACT-WF] | Click prev/next → data thay đổi, active page cập nhật | C-06 | H |
| TCD-PAG-08 | [IMPACT-WF] | Click page number → navigate đúng page | C-06 | H |

---

## MODULE 10 — MODAL / DIALOG

| TCD_ID | Level | Điều kiện test | Impact Ref | Risk |
|---|---|---|---|---|
| TCD-MOD-01 | [UI-COV] | Modal background = #FFFFFF | A-12 | H |
| TCD-MOD-02 | [UI-COV] | Modal KHÔNG có overlay/backdrop | A-12 | H |
| TCD-MOD-03 | [BDD] | Click ra ngoài modal → modal KHÔNG đóng | A-12,C-02 | H |
| TCD-MOD-04 | [BDD] | Click button X → modal đóng | A-12,C-02 | H |
| TCD-MOD-05 | [BDD] | Click button Cancel/action → modal đóng | A-12,C-02 | H |
| TCD-MOD-06 | [UI-COV] | Modal header: title H5/bold 16px + nút X | A-13 | M |
| TCD-MOD-07 | [UI-COV] | Modal body padding = 24px | A-13 | M |
| TCD-MOD-08 | [UI-COV] | Modal footer: Primary button + Ghost button | A-13 | M |
| TCD-MOD-09 | [IMPACT-IND] | Tất cả modal/dialog không có overlay | B-04 | H |

---

## MODULE 11 — TAG / BADGE

| TCD_ID | Level | Điều kiện test | Impact Ref | Risk |
|---|---|---|---|---|
| TCD-TAG-01 | [UI-COV] | Tag border-radius = 16px | A-21 | M |
| TCD-TAG-02 | [UI-COV] | Tag padding: top 1px, right 8px, bottom 1px, left 8px | A-21 | M |
| TCD-TAG-03 | [UI-COV] | Tag background = #F6FFED (Polar Green/1) | A-21 | M |
| TCD-TAG-04 | [UI-COV] | Tag text color = #B7EB8F (Polar Green/3) | A-21 | M |
| TCD-TAG-05 | [IMPACT-IND] | Tag render đúng style trên các màn | B-08 | M |

---

## MODULE 12 — FOOTER

| TCD_ID | Level | Điều kiện test | Impact Ref | Risk |
|---|---|---|---|---|
| TCD-FTR-01 | [UI-COV] | Footer: width 1440px, height 66.18px | A-22 | M |
| TCD-FTR-02 | [UI-COV] | Footer background = #F0F2F5 | A-22 | M |
| TCD-FTR-03 | [UI-COV] | Footer font: Roboto Regular 400, 12px, line-height 16px | A-22 | M |
| TCD-FTR-04 | [UI-COV] | Text "Autolake": color rgba(0,0,0,0.85) | A-22 | M |
| TCD-FTR-05 | [UI-COV] | Text "Copyright ©️ 2026 - Developed by Viettel Group": rgba(0,0,0,0.45) | A-22 | M |

---

## MODULE 13 — ICON SYSTEM

| TCD_ID | Level | Điều kiện test | Impact Ref | Risk |
|---|---|---|---|---|
| TCD-ICO-01 | [UI-COV] | Icon set = Ant Design Icons (SVG) | A-19 | H |
| TCD-ICO-02 | [UI-COV] | Icon size chuẩn = 20×20px | A-19 | H |
| TCD-ICO-03 | [IMPACT-IND] | Toàn hệ thống đã thay sang Ant Design icon set | B-13 | H |

---

## MODULE 14 — RADIUS SYSTEM

| TCD_ID | Level | Điều kiện test | Impact Ref | Risk |
|---|---|---|---|---|
| TCD-RAD-01 | [UI-COV] | Radius 5px — Input field, Header | A-24 | H |
| TCD-RAD-02 | [UI-COV] | Radius 8px — Standard button, Modal | A-24 | H |
| TCD-RAD-03 | [UI-COV] | Radius 100px — Icon button circle | A-24 | H |
| TCD-RAD-04 | [UI-COV] | Radius 16px — Tag/Badge | A-24 | M |
| TCD-RAD-05 | [UI-COV] | Radius 4px — section/row container | A-24 | L |

---

## COVERAGE MATRIX

| Module | BDD | UI-COV | IND | WF | Total |
|---|---|---|---|---|---|
| Typography | 0 | 20 | 0 | 0 | **20** |
| Color | 0 | 13 | 0 | 0 | **13** |
| Input | 8 | 2 | 1 | 2 | **15** (+ grouped) |
| Button (text) | 10 | 3 | 1 | 0 | **14** |
| Icon Button | 4 | 3 | 0 | 0 | **7** |
| Header | 2 | 4 | 1 | 0 | **7** |
| Breadcrumb | 2 | 3 | 0 | 1 | **6** |
| Table | 3 | 6 | 1 | 0 | **10** |
| Pagination | 2 | 3 | 0 | 2 | **8** |
| Modal | 3 | 5 | 1 | 0 | **9** |
| Tag | 0 | 4 | 1 | 0 | **5** |
| Footer | 0 | 5 | 0 | 0 | **5** |
| Icon System | 0 | 2 | 1 | 0 | **3** |
| Radius | 0 | 5 | 0 | 0 | **5** |
| **TOTAL** | **34** | **78** | **7** | **5** | **127** |

**Không có tầng nào trắng coverage. Sẵn sàng Gate 3.**
