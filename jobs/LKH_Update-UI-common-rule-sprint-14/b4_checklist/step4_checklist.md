# B4-before — Checklist kiểm tra UI Common Rule
# LKH_Update-UI-common-rule-sprint-14

**Ngày:** 2026-06-19
**Input:** step3_tcd.md (127 TCD / 14 modules)
**Format:** STT | Mục tiêu kiểm tra | Kết quả mong muốn

---

## NHÓM 1 — TYPOGRAPHY

| STT | Mục tiêu kiểm tra | Kết quả mong muốn |
|---|---|---|
| 1 | Kiểm tra font family toàn hệ thống | Font Roboto được áp dụng nhất quán, không xuất hiện font khác |
| 2 | Kiểm tra H1 typography | Size 38px, weight 500, line-height 46px, letter-spacing 0% |
| 3 | Kiểm tra H2 typography | Size 30px, weight 500, line-height 40px |
| 4 | Kiểm tra H3/medium typography | Size 24px, weight 500, line-height 32px |
| 5 | Kiểm tra H3/regular typography | Size 24px, weight 400, line-height 32px |
| 6 | Kiểm tra H4/medium typography | Size 20px, weight 500, line-height 28px |
| 7 | Kiểm tra H4/regular typography | Size 20px, weight 400, line-height 28px |
| 8 | Kiểm tra H5/bold typography (header/menu label) | Size 16px, weight 700, line-height 24px |
| 9 | Kiểm tra Body/regular typography | Size 14px, weight 400, line-height 22px |
| 10 | Kiểm tra Body/medium typography | Size 14px, weight 500, line-height 22px |
| 11 | Kiểm tra Body/bold typography | Size 14px, weight 700, line-height 22px |
| 12 | Kiểm tra Body/regular-underline | Size 14px, style underline hiển thị đúng |
| 13 | Kiểm tra Body/regular-strikethrough | Size 14px, style strikethrough hiển thị đúng |
| 14 | Kiểm tra Footnote/description | Size 10px, line-height 20px |
| 15 | Kiểm tra Footnote/system-monospace | Size 12px, line-height 20px, font monospace |
| 16 | Kiểm tra Toggle/regular | Size 12px, weight 400, line-height 20px |

---

## NHÓM 2 — COLOR SYSTEM

| STT | Mục tiêu kiểm tra | Kết quả mong muốn |
|---|---|---|
| 17 | Kiểm tra màu nền trang toàn hệ thống | Background = #F0F2F5 trên tất cả các màn |
| 18 | Kiểm tra màu Primary/6 | #1677FF áp dụng đúng cho button primary, link |
| 19 | Kiểm tra màu Primary/7 (hover) | #096DD9 hiển thị khi hover primary element |
| 20 | Kiểm tra màu border default | Neutral/5 = #D9D9D9 trên toàn bộ input, table |
| 21 | Kiểm tra màu placeholder | Neutral/7 = #8C8C8C |
| 22 | Kiểm tra màu text chính | Neutral/10 = #262626 |
| 23 | Kiểm tra màu error | Border error = #FF4D4F, helptext error = #F5222D |
| 24 | Kiểm tra màu danger button | Fill = #F5222D |
| 25 | Kiểm tra Character/Title .85 | rgba(0,0,0,0.85) cho label, breadcrumb text |
| 26 | Kiểm tra Character/Secondary .45 | rgba(0,0,0,0.45) cho footer copyright |
| 27 | Kiểm tra màu disabled | Background #F5F5F5, text/border #BFBFBF |

---

## NHÓM 3 — INPUT FIELD

| STT | Mục tiêu kiểm tra | Kết quả mong muốn |
|---|---|---|
| 28 | Kiểm tra border-radius input | 5px trên tất cả input field |
| 29 | Kiểm tra border mặc định input | 1px solid #D9D9D9 |
| 30 | Kiểm tra padding input | Top 8px, Right 12px, Bottom 8px, Left 12px |
| 31 | Kiểm tra label text input | Color rgba(0,0,0,0.85), font Body/medium 14px |
| 32 | Kiểm tra required asterisk (*) | Color #F5222D (Dust Red/6) |
| 33 | Kiểm tra input state Default | Border #D9D9D9, background #FFFFFF |
| 34 | Kiểm tra input state Focus | Border đổi thành #1677FF, background #FFFFFF |
| 35 | Kiểm tra input state Error — visual | Border đổi thành #FF4D4F, label KHÔNG đổi màu, background #FFFFFF |
| 36 | Kiểm tra input state Error — helptext | Helptext hiển thị bên dưới input, color #F5222D |
| 37 | Kiểm tra input state Disabled | Border #BFBFBF, background #F5F5F5, text #8C8C8C |
| 38 | Kiểm tra placeholder text | Color #8C8C8C khi chưa nhập |
| 39 | Kiểm tra flow submit form có lỗi | Helptext + border đỏ tồn tại đến khi user sửa và submit lại |

---

## NHÓM 4 — BUTTON (Standard Text)

| STT | Mục tiêu kiểm tra | Kết quả mong muốn |
|---|---|---|
| 40 | Kiểm tra button height | 40px trên tất cả standard text button |
| 41 | Kiểm tra button border-radius | 8px |
| 42 | Kiểm tra button label typography | Roboto, 14px, weight 500 (Medium) |
| 43 | Kiểm tra Primary button — Default | Fill #1677FF, text #FFFFFF |
| 44 | Kiểm tra Primary button — Hover | Fill #096DD9, text #FFFFFF |
| 45 | Kiểm tra Primary button — Active | Active/pressed state render đúng (darker) |
| 46 | Kiểm tra Primary button — Focused | Focus ring visible |
| 47 | Kiểm tra Primary button — Disabled | Fill #F5F5F5, text #BFBFBF, không click được |
| 48 | Kiểm tra Secondary button — đủ 5 states | Default/Hover/Active/Focused/Disabled render đúng |
| 49 | Kiểm tra Gray button — đủ 5 states | Default/Hover/Active/Focused/Disabled render đúng |
| 50 | Kiểm tra Outline button — đủ 5 states | Default/Hover/Active/Focused/Disabled render đúng |
| 51 | Kiểm tra Outline-Gray button — đủ 5 states | Default/Hover/Active/Focused/Disabled render đúng |
| 52 | Kiểm tra Danger button | Fill #F5222D, text #FFFFFF |
| 53 | Kiểm tra consistency button toàn hệ thống | Tất cả button đều H40px, R8px, không có ngoại lệ |

---

## NHÓM 5 — ICON BUTTON (Circle)

| STT | Mục tiêu kiểm tra | Kết quả mong muốn |
|---|---|---|
| 54 | Kiểm tra kích thước icon button | 36×36px, border-radius 100px (hình tròn) |
| 55 | Kiểm tra padding icon button | 8px |
| 56 | Kiểm tra icon size bên trong | 20×20px (Ant Design SVG) |
| 57 | Kiểm tra Primary icon button — đủ 5 states | Default/Hover/Active/Focused/Disabled render đúng màu |
| 58 | Kiểm tra Ghost/Blue icon button — đủ 5 states | Transparent fill + blue icon, đủ states |
| 59 | Kiểm tra Secondary/Gray/Outline icon button | Đủ 5 states mỗi type |
| 60 | Kiểm tra icon set là Ant Design SVG | Không dùng icon cũ, đúng SVG format |

---

## NHÓM 6 — HEADER / NAVIGATION

| STT | Mục tiêu kiểm tra | Kết quả mong muốn |
|---|---|---|
| 61 | Kiểm tra header background | #F0F2F5 |
| 62 | Kiểm tra header border-radius | 5px |
| 63 | Kiểm tra header border | 1px |
| 64 | Kiểm tra menu/nav label typography | H5/bold, 16px, weight 700, Roboto |
| 65 | Kiểm tra menu item active state | Background và text color hiển thị đúng khi active |
| 66 | Kiểm tra menu item hover state | Thay đổi đúng khi hover |
| 67 | Kiểm tra nhất quán header toàn hệ thống | Tất cả màn dùng chung 1 header component, style không khác nhau |

---

## NHÓM 7 — BREADCRUMB

| STT | Mục tiêu kiểm tra | Kết quả mong muốn |
|---|---|---|
| 68 | Kiểm tra breadcrumb item height | 22px |
| 69 | Kiểm tra breadcrumb padding | Left 16px, Right 16px |
| 70 | Kiểm tra breadcrumb width | Fill theo độ dài text, không fixed |
| 71 | Kiểm tra breadcrumb active state | Background = #FFFFFF khi active |
| 72 | Kiểm tra breadcrumb text color | rgba(0,0,0,0.85) |
| 73 | Kiểm tra navigate qua breadcrumb | Click → đúng trang, active state cập nhật |

---

## NHÓM 8 — TABLE / DATA GRID

| STT | Mục tiêu kiểm tra | Kết quả mong muốn |
|---|---|---|
| 74 | Kiểm tra row height | 56px trên tất cả data row |
| 75 | Kiểm tra header background | #E4E4E7 |
| 76 | Kiểm tra table border | #D9D9D9 |
| 77 | Kiểm tra even row background | #FAFAFA |
| 78 | Kiểm tra odd row background | #FFFFFF |
| 79 | Kiểm tra row hover | Background đổi thành #E6F4FF khi hover |
| 80 | Kiểm tra header text style | Body/medium 14px, color #262626 |
| 81 | Kiểm tra cell text style | Body/regular 14px, color #262626 |
| 82 | Kiểm tra table header smoke | Header render = baseline cũ (smoke test) |
| 83 | Kiểm tra row height nhất quán toàn hệ thống | Tất cả data grid đều 56px |

---

## NHÓM 9 — PAGINATION

| STT | Mục tiêu kiểm tra | Kết quả mong muốn |
|---|---|---|
| 84 | Kiểm tra pagination height | 36px |
| 85 | Kiểm tra pagination width | 666px |
| 86 | Kiểm tra border top phân cách | 2px border-top phân cách table body và pagination |
| 87 | Kiểm tra active page button style | Active page có style khác biệt rõ với non-active |
| 88 | Kiểm tra Default variant | Pagination Default variant render đúng layout |
| 89 | Kiểm tra click prev/next page | Data thay đổi, active page cập nhật đúng |
| 90 | Kiểm tra click page number | Navigate đúng page |

---

## NHÓM 10 — MODAL / DIALOG

| STT | Mục tiêu kiểm tra | Kết quả mong muốn |
|---|---|---|
| 91 | Kiểm tra modal background | #FFFFFF, không có overlay/backdrop |
| 92 | Kiểm tra behavior click ngoài modal | Modal KHÔNG đóng khi click ra ngoài |
| 93 | Kiểm tra đóng modal bằng button X | Modal đóng khi click X |
| 94 | Kiểm tra đóng modal bằng action button | Modal đóng khi click Cancel hoặc button hành động |
| 95 | Kiểm tra modal header | Title H5/bold 16px + nút X hiển thị đúng |
| 96 | Kiểm tra modal body padding | 24px |
| 97 | Kiểm tra modal footer | Có Primary button + Ghost button |
| 98 | Kiểm tra nhất quán modal toàn hệ thống | Không modal nào có overlay |

---

## NHÓM 11 — TAG / BADGE

| STT | Mục tiêu kiểm tra | Kết quả mong muốn |
|---|---|---|
| 99 | Kiểm tra tag border-radius | 16px |
| 100 | Kiểm tra tag padding | Top 1px, Right 8px, Bottom 1px, Left 8px |
| 101 | Kiểm tra tag background | #F6FFED (Polar Green/1) |
| 102 | Kiểm tra tag text color | #B7EB8F (Polar Green/3) |

---

## NHÓM 12 — FOOTER

| STT | Mục tiêu kiểm tra | Kết quả mong muốn |
|---|---|---|
| 103 | Kiểm tra footer kích thước | Width 1440px, height 66.18px |
| 104 | Kiểm tra footer background | #F0F2F5 |
| 105 | Kiểm tra footer typography | Roboto Regular 400, 12px, line-height 16px |
| 106 | Kiểm tra text "Autolake" | Color rgba(0,0,0,0.85) |
| 107 | Kiểm tra text copyright | "Copyright ©️ 2026 - Developed by Viettel Group", color rgba(0,0,0,0.45) |

---

## NHÓM 13 — ICON SYSTEM

| STT | Mục tiêu kiểm tra | Kết quả mong muốn |
|---|---|---|
| 108 | Kiểm tra icon set | Ant Design Icons, format SVG |
| 109 | Kiểm tra icon size chuẩn | 20×20px trên toàn hệ thống |
| 110 | Kiểm tra thay thế icon cũ | Không còn icon cũ nào tồn tại |

---

## NHÓM 14 — RADIUS SYSTEM

| STT | Mục tiêu kiểm tra | Kết quả mong muốn |
|---|---|---|
| 111 | Kiểm tra radius 5px | Input field, header component đúng 5px |
| 112 | Kiểm tra radius 8px | Standard button, modal đúng 8px |
| 113 | Kiểm tra radius 100px | Icon button circle đúng 100px (hình tròn) |
| 114 | Kiểm tra radius 16px | Tag/Badge đúng 16px |

---

**Tổng: 114 checklist items / 14 nhóm**
