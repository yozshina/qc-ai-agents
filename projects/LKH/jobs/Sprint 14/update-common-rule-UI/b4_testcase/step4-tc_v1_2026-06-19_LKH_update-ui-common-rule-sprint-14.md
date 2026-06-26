# B4-after — Test Cases: UI Common Rule (Full)
# LKH_Update-UI-common-rule-sprint-14
# Ngày: 2026-06-19 | Scope: Desktop ~1440px | Light mode | Login required

> **Precondition chung:** User đã login. Màn hình width ~1440px. Truy cập đúng màn hình cần test.

---

| Mã KBKT | Mục đích kiểm thử | Các bước thực hiện |
|---|---|---|
| | **NHÓM 1 — TYPOGRAPHY** | |
| UI_TYP_01 | Verify font family toàn hệ thống là Roboto | 1. Mở bất kỳ màn hình trong hệ thống<br>2. Inspect element text (tiêu đề, body, label, button...)<br>**Expected:** font-family = Roboto trên tất cả element text, không có font khác |
| UI_TYP_02 | Verify H1 font-size | 1. Mở màn hình có tiêu đề dạng H1<br>2. Inspect element H1<br>**Expected:** font-size = 38px |
| UI_TYP_03 | Verify H1 font-weight | 1. Inspect element H1<br>**Expected:** font-weight = 500 (Medium) |
| UI_TYP_04 | Verify H1 line-height | 1. Inspect element H1<br>**Expected:** line-height = 46px |
| UI_TYP_05 | Verify H1 letter-spacing | 1. Inspect element H1<br>**Expected:** letter-spacing = 0% |
| UI_TYP_06 | Verify H2 font-size | 1. Mở màn hình có H2<br>2. Inspect element H2<br>**Expected:** font-size = 30px |
| UI_TYP_07 | Verify H2 font-weight | 1. Inspect element H2<br>**Expected:** font-weight = 500 |
| UI_TYP_08 | Verify H2 line-height | 1. Inspect element H2<br>**Expected:** line-height = 40px |
| UI_TYP_09 | Verify H3/medium font-size | 1. Inspect element H3 dạng medium<br>**Expected:** font-size = 24px |
| UI_TYP_10 | Verify H3/medium font-weight | 1. Inspect element H3/medium<br>**Expected:** font-weight = 500 |
| UI_TYP_11 | Verify H3/medium line-height | 1. Inspect element H3/medium<br>**Expected:** line-height = 32px |
| UI_TYP_12 | Verify H3/regular font-weight | 1. Inspect element H3/regular<br>**Expected:** font-weight = 400 |
| UI_TYP_13 | Verify H3/regular font-size và line-height | 1. Inspect element H3/regular<br>**Expected:** font-size = 24px, line-height = 32px |
| UI_TYP_14 | Verify H4/medium font-size | 1. Inspect element H4/medium<br>**Expected:** font-size = 20px |
| UI_TYP_15 | Verify H4/medium font-weight | 1. Inspect element H4/medium<br>**Expected:** font-weight = 500 |
| UI_TYP_16 | Verify H4/medium line-height | 1. Inspect element H4/medium<br>**Expected:** line-height = 28px |
| UI_TYP_17 | Verify H4/regular font-weight | 1. Inspect element H4/regular<br>**Expected:** font-weight = 400 |
| UI_TYP_18 | Verify H4/regular font-size và line-height | 1. Inspect element H4/regular<br>**Expected:** font-size = 20px, line-height = 28px |
| UI_TYP_19 | Verify H5/bold font-size | 1. Inspect element H5/bold (menu label, header nav)<br>**Expected:** font-size = 16px |
| UI_TYP_20 | Verify H5/bold font-weight | 1. Inspect element H5/bold<br>**Expected:** font-weight = 700 (Bold) |
| UI_TYP_21 | Verify H5/bold line-height | 1. Inspect element H5/bold<br>**Expected:** line-height = 24px |
| UI_TYP_22 | Verify Body/regular font-size | 1. Inspect element text body thường<br>**Expected:** font-size = 14px |
| UI_TYP_23 | Verify Body/regular font-weight | 1. Inspect element Body/regular<br>**Expected:** font-weight = 400 |
| UI_TYP_24 | Verify Body/regular line-height | 1. Inspect element Body/regular<br>**Expected:** line-height = 22px |
| UI_TYP_25 | Verify Body/medium font-weight | 1. Inspect element text dạng medium (label, button text...)<br>**Expected:** font-weight = 500 |
| UI_TYP_26 | Verify Body/medium font-size và line-height | 1. Inspect element Body/medium<br>**Expected:** font-size = 14px, line-height = 22px |
| UI_TYP_27 | Verify Body/bold font-weight | 1. Inspect element text dạng bold<br>**Expected:** font-weight = 700 |
| UI_TYP_28 | Verify Body/bold font-size và line-height | 1. Inspect element Body/bold<br>**Expected:** font-size = 14px, line-height = 22px |
| UI_TYP_29 | Verify Body/regular-underline hiển thị underline | 1. Tìm element dùng Body/regular-underline (link text)<br>2. Inspect element<br>**Expected:** text-decoration = underline, font-size = 14px |
| UI_TYP_30 | Verify Body/regular-strikethrough hiển thị đúng | 1. Tìm element dùng strikethrough<br>2. Inspect element<br>**Expected:** text-decoration = line-through, font-size = 14px |
| UI_TYP_31 | Verify Footnote/description font-size | 1. Tìm element dùng Footnote/description (caption, helper text nhỏ)<br>2. Inspect element<br>**Expected:** font-size = 10px |
| UI_TYP_32 | Verify Footnote/description line-height | 1. Inspect element Footnote/description<br>**Expected:** line-height = 20px |
| UI_TYP_33 | Verify Footnote/system-monospace font-size | 1. Tìm element dùng monospace (code, system text)<br>2. Inspect element<br>**Expected:** font-size = 12px |
| UI_TYP_34 | Verify Footnote/system-monospace line-height | 1. Inspect element Footnote/system-monospace<br>**Expected:** line-height = 20px |
| UI_TYP_35 | Verify Footnote/system-monospace font style | 1. Inspect element<br>**Expected:** font-family monospace (system-monospace) |
| UI_TYP_36 | Verify Toggle/regular font-size | 1. Tìm element toggle label<br>2. Inspect element<br>**Expected:** font-size = 12px |
| UI_TYP_37 | Verify Toggle/regular font-weight | 1. Inspect toggle label<br>**Expected:** font-weight = 400 |
| UI_TYP_38 | Verify Toggle/regular line-height | 1. Inspect toggle label<br>**Expected:** line-height = 20px |
| | **NHÓM 2 — COLOR SYSTEM** | |
| UI_CLR_01 | Verify page background toàn hệ thống | 1. Mở lần lượt các màn hình chính<br>2. Inspect background của page/body<br>**Expected:** background-color = #F0F2F5 trên tất cả màn |
| UI_CLR_02 | Verify màu Primary/6 trên button primary | 1. Tìm button Primary trên màn hình<br>2. Inspect background-color của button<br>**Expected:** background = #1677FF |
| UI_CLR_03 | Verify màu Primary/6 trên link | 1. Tìm link text trên màn<br>2. Inspect color<br>**Expected:** color = #1677FF |
| UI_CLR_04 | Verify màu Primary/7 khi hover primary element | 1. Hover vào button Primary<br>2. Inspect background-color<br>**Expected:** background = #096DD9 |
| UI_CLR_05 | Verify màu border default trên input | 1. Inspect border của input field ở trạng thái default<br>**Expected:** border-color = #D9D9D9 |
| UI_CLR_06 | Verify màu border default trên table | 1. Inspect border của table<br>**Expected:** border-color = #D9D9D9 |
| UI_CLR_07 | Verify màu placeholder text | 1. Quan sát input chưa nhập<br>2. Inspect placeholder color<br>**Expected:** color = #8C8C8C |
| UI_CLR_08 | Verify màu text chính | 1. Inspect text thông thường trong bảng, form<br>**Expected:** color = #262626 |
| UI_CLR_09 | Verify màu border error | 1. Trigger error state trên input<br>2. Inspect border-color<br>**Expected:** border-color = #FF4D4F |
| UI_CLR_10 | Verify màu helptext error | 1. Trigger error state<br>2. Inspect helptext color bên dưới input<br>**Expected:** color = #F5222D |
| UI_CLR_11 | Verify màu danger button fill | 1. Tìm button dạng Danger<br>2. Inspect background<br>**Expected:** background = #F5222D |
| UI_CLR_12 | Verify Character/Title .85 trên label input | 1. Inspect label text của input field<br>**Expected:** color = rgba(0,0,0,0.85) |
| UI_CLR_13 | Verify Character/Title .85 trên breadcrumb | 1. Inspect breadcrumb item text<br>**Expected:** color = rgba(0,0,0,0.85) |
| UI_CLR_14 | Verify Character/Secondary .45 trên footer copyright | 1. Inspect text copyright trong footer<br>**Expected:** color = rgba(0,0,0,0.45) |
| UI_CLR_15 | Verify màu disabled background | 1. Tìm input/button ở trạng thái disabled<br>2. Inspect background<br>**Expected:** background = #F5F5F5 |
| UI_CLR_16 | Verify màu disabled border | 1. Inspect border của element disabled<br>**Expected:** border-color = #BFBFBF |
| UI_CLR_17 | Verify màu disabled text | 1. Inspect text color của element disabled<br>**Expected:** color = #BFBFBF |
| | **NHÓM 3 — INPUT FIELD** | |
| UI_INP_01 | Verify input border-radius | 1. Mở màn hình có form<br>2. Inspect border-radius của input field<br>**Expected:** border-radius = 5px |
| UI_INP_02 | Verify input border width — Default | 1. Inspect border của input ở state Default<br>**Expected:** border-width = 1px |
| UI_INP_03 | Verify input border color — Default | 1. Inspect border-color của input Default<br>**Expected:** border-color = #D9D9D9 |
| UI_INP_04 | Verify input background — Default | 1. Inspect background input Default<br>**Expected:** background = #FFFFFF |
| UI_INP_05 | Verify input padding-top | 1. Inspect padding-top<br>**Expected:** padding-top = 8px |
| UI_INP_06 | Verify input padding-right | 1. Inspect padding-right<br>**Expected:** padding-right = 12px |
| UI_INP_07 | Verify input padding-bottom | 1. Inspect padding-bottom<br>**Expected:** padding-bottom = 8px |
| UI_INP_08 | Verify input padding-left | 1. Inspect padding-left<br>**Expected:** padding-left = 12px |
| UI_INP_09 | Verify input value text font-size | 1. Nhập text vào input<br>2. Inspect font-size text đã nhập<br>**Expected:** font-size = 14px |
| UI_INP_10 | Verify input value text font-weight | 1. Inspect font-weight text trong input<br>**Expected:** font-weight = 400 |
| UI_INP_11 | Verify input value text color | 1. Inspect color text trong input<br>**Expected:** color = #262626 |
| UI_INP_12 | Verify placeholder text color | 1. Quan sát input chưa nhập<br>**Expected:** placeholder color = #8C8C8C |
| UI_INP_13 | Verify label font-size | 1. Inspect label text phía trên input<br>**Expected:** font-size = 14px |
| UI_INP_14 | Verify label font-weight | 1. Inspect label<br>**Expected:** font-weight = 500 |
| UI_INP_15 | Verify label color | 1. Inspect label color<br>**Expected:** color = rgba(0,0,0,0.85) |
| UI_INP_16 | Verify required asterisk (*) color | 1. Tìm input có required<br>2. Inspect màu dấu *<br>**Expected:** color = #F5222D |
| UI_INP_17 | Verify input border color — Focus state | 1. Click vào input field<br>2. Inspect border-color<br>**Expected:** border-color = #1677FF |
| UI_INP_18 | Verify input background — Focus state | 1. Click vào input<br>2. Inspect background<br>**Expected:** background = #FFFFFF (không đổi) |
| UI_INP_19 | Verify input border color — Error state | 1. Submit form với input không hợp lệ<br>2. Inspect border-color của input lỗi<br>**Expected:** border-color = #FF4D4F |
| UI_INP_20 | Verify input background — Error state | 1. Inspect background khi input error<br>**Expected:** background = #FFFFFF (không đổi) |
| UI_INP_21 | Verify label KHÔNG đổi màu khi Error | 1. Trigger error state trên input có label<br>2. Inspect label color<br>**Expected:** color vẫn = rgba(0,0,0,0.85), không đổi thành đỏ |
| UI_INP_22 | Verify helptext hiển thị bên dưới khi Error | 1. Trigger error<br>2. Quan sát vị trí helptext<br>**Expected:** Helptext xuất hiện ngay dưới input |
| UI_INP_23 | Verify helptext color khi Error | 1. Inspect helptext color<br>**Expected:** color = #F5222D |
| UI_INP_24 | Verify input border color — Disabled state | 1. Tìm input disabled<br>2. Inspect border-color<br>**Expected:** border-color = #BFBFBF |
| UI_INP_25 | Verify input background — Disabled state | 1. Inspect background input disabled<br>**Expected:** background = #F5F5F5 |
| UI_INP_26 | Verify input text color — Disabled state | 1. Inspect text color trong input disabled<br>**Expected:** color = #8C8C8C |
| UI_INP_27 | Verify input không cho nhập — Disabled state | 1. Click vào input disabled<br>2. Thử nhập text<br>**Expected:** Không thể nhập, cursor không active |
| UI_INP_28 | Verify helptext + border đỏ tồn tại đến khi sửa | 1. Submit form lỗi → thấy error<br>2. Sửa giá trị input → Submit lại thành công<br>**Expected:** Helptext + border đỏ biến mất sau khi sửa đúng |
| UI_INP_29 | Verify input variant có Label | 1. Tìm input được config hiển thị Label<br>**Expected:** Label hiển thị phía trên input |
| UI_INP_30 | Verify input variant có Required asterisk | 1. Tìm input required<br>**Expected:** Dấu * hiển thị cạnh Label |
| UI_INP_31 | Verify input variant có Hint text | 1. Tìm input có hint<br>**Expected:** Hint text hiển thị dưới input |
| UI_INP_32 | Verify input variant có Main Icon (prefix) | 1. Tìm input có icon prefix<br>**Expected:** Icon hiển thị bên trái input |
| UI_INP_33 | Verify input variant có Word-count | 1. Tìm input có word-count<br>**Expected:** Đếm số ký tự hiển thị đúng |
| | **NHÓM 4 — BUTTON STANDARD TEXT** | |
| UI_BTN_01 | Verify button height | 1. Inspect element button text bất kỳ<br>**Expected:** height = 40px |
| UI_BTN_02 | Verify button border-radius | 1. Inspect border-radius của button<br>**Expected:** border-radius = 8px |
| UI_BTN_03 | Verify button label font-family | 1. Inspect font-family của label text trong button<br>**Expected:** font-family = Roboto |
| UI_BTN_04 | Verify button label font-size | 1. Inspect font-size label<br>**Expected:** font-size = 14px |
| UI_BTN_05 | Verify button label font-weight | 1. Inspect font-weight label<br>**Expected:** font-weight = 500 (Medium) |
| UI_BTN_06 | Verify Primary button background — Default | 1. Tìm Primary button ở trạng thái Default<br>2. Inspect background<br>**Expected:** background = #1677FF |
| UI_BTN_07 | Verify Primary button text color — Default | 1. Inspect text color trong Primary button<br>**Expected:** color = #FFFFFF |
| UI_BTN_08 | Verify Primary button background — Hover | 1. Hover vào Primary button<br>2. Inspect background<br>**Expected:** background = #096DD9 |
| UI_BTN_09 | Verify Primary button text color — Hover | 1. Hover vào Primary button → inspect text<br>**Expected:** color = #FFFFFF |
| UI_BTN_10 | Verify Primary button — Active state | 1. Click giữ vào Primary button<br>**Expected:** Button hiển thị pressed/active state (darker) |
| UI_BTN_11 | Verify Primary button focus ring — Focused | 1. Tab vào Primary button (keyboard navigation)<br>**Expected:** Focus ring/outline visible |
| UI_BTN_12 | Verify Primary button background — Disabled | 1. Tìm Primary button disabled<br>2. Inspect background<br>**Expected:** background = #F5F5F5 |
| UI_BTN_13 | Verify Primary button text color — Disabled | 1. Inspect text color Primary disabled<br>**Expected:** color = #BFBFBF |
| UI_BTN_14 | Verify Primary button không click được — Disabled | 1. Click vào Primary button disabled<br>**Expected:** Không trigger action, cursor = not-allowed |
| UI_BTN_15 | Verify Secondary button — Default state | 1. Tìm Secondary button Default<br>2. Inspect background, text, border<br>**Expected:** Style đúng với variant Secondary Default |
| UI_BTN_16 | Verify Secondary button — Hover state | 1. Hover Secondary button<br>**Expected:** Background thay đổi đúng theo spec hover |
| UI_BTN_17 | Verify Secondary button — Active state | 1. Click giữ Secondary button<br>**Expected:** Active/pressed state render đúng |
| UI_BTN_18 | Verify Secondary button — Focused state | 1. Tab vào Secondary button<br>**Expected:** Focus ring visible |
| UI_BTN_19 | Verify Secondary button — Disabled state | 1. Tìm Secondary button disabled<br>**Expected:** Dimmed, không click được |
| UI_BTN_20 | Verify Gray button — Default state | 1. Tìm Gray button Default<br>**Expected:** Gray fill, style đúng spec |
| UI_BTN_21 | Verify Gray button — Hover state | 1. Hover Gray button<br>**Expected:** Hover state thay đổi đúng |
| UI_BTN_22 | Verify Gray button — Active state | 1. Click giữ Gray button<br>**Expected:** Active state render đúng |
| UI_BTN_23 | Verify Gray button — Focused state | 1. Tab vào Gray button<br>**Expected:** Focus ring visible |
| UI_BTN_24 | Verify Gray button — Disabled state | 1. Tìm Gray button disabled<br>**Expected:** Dimmed, không click được |
| UI_BTN_25 | Verify Outline button background — Default | 1. Tìm Outline button<br>2. Inspect background<br>**Expected:** background = transparent |
| UI_BTN_26 | Verify Outline button border — Default | 1. Inspect border Outline button<br>**Expected:** border visible, màu đúng spec |
| UI_BTN_27 | Verify Outline button — Hover state | 1. Hover Outline button<br>**Expected:** Hover state thay đổi đúng (bg thay đổi) |
| UI_BTN_28 | Verify Outline button — Active state | 1. Click giữ Outline button<br>**Expected:** Active state render đúng |
| UI_BTN_29 | Verify Outline button — Focused state | 1. Tab vào Outline button<br>**Expected:** Focus ring visible |
| UI_BTN_30 | Verify Outline button — Disabled state | 1. Tìm Outline button disabled<br>**Expected:** Dimmed, không click được |
| UI_BTN_31 | Verify Outline-Gray button — Default state | 1. Tìm Outline-Gray button<br>**Expected:** Outline + gray color scheme đúng spec |
| UI_BTN_32 | Verify Outline-Gray button — Hover state | 1. Hover Outline-Gray button<br>**Expected:** Hover state đúng |
| UI_BTN_33 | Verify Outline-Gray button — Active state | 1. Click giữ<br>**Expected:** Active state render đúng |
| UI_BTN_34 | Verify Outline-Gray button — Focused state | 1. Tab vào<br>**Expected:** Focus ring visible |
| UI_BTN_35 | Verify Outline-Gray button — Disabled state | 1. Tìm disabled<br>**Expected:** Dimmed, không click được |
| UI_BTN_36 | Verify Danger button background | 1. Tìm Danger button<br>2. Inspect background<br>**Expected:** background = #F5222D |
| UI_BTN_37 | Verify Danger button text color | 1. Inspect text Danger button<br>**Expected:** color = #FFFFFF |
| UI_BTN_38 | Verify tất cả button hệ thống đều H40px | 1. Kiểm tra lần lượt tất cả loại button trên các màn<br>**Expected:** height = 40px, không có ngoại lệ |
| UI_BTN_39 | Verify tất cả button hệ thống đều R8px | 1. Inspect border-radius các button<br>**Expected:** border-radius = 8px, không có ngoại lệ |
| | **NHÓM 5 — ICON BUTTON (Circle)** | |
| UI_ICN_01 | Verify icon button width | 1. Inspect width của icon button<br>**Expected:** width = 36px |
| UI_ICN_02 | Verify icon button height | 1. Inspect height<br>**Expected:** height = 36px |
| UI_ICN_03 | Verify icon button border-radius | 1. Inspect border-radius<br>**Expected:** border-radius = 100px (hình tròn) |
| UI_ICN_04 | Verify icon button padding | 1. Inspect padding<br>**Expected:** padding = 8px (all sides) |
| UI_ICN_05 | Verify icon size bên trong button | 1. Inspect icon SVG bên trong button<br>**Expected:** width = 20px, height = 20px |
| UI_ICN_06 | Verify Primary icon button — Default | 1. Tìm Primary icon button<br>2. Inspect background, icon color<br>**Expected:** Fill màu đúng Primary Default |
| UI_ICN_07 | Verify Primary icon button — Hover | 1. Hover Primary icon button<br>**Expected:** Hover state render đúng |
| UI_ICN_08 | Verify Primary icon button — Active | 1. Click giữ<br>**Expected:** Active state render đúng |
| UI_ICN_09 | Verify Primary icon button — Focused | 1. Tab vào<br>**Expected:** Focus ring visible |
| UI_ICN_10 | Verify Primary icon button — Disabled | 1. Tìm disabled<br>**Expected:** Dimmed, không click được |
| UI_ICN_11 | Verify Ghost/Blue icon button — Default | 1. Inspect background Ghost/Blue Default<br>**Expected:** background = transparent, icon = blue |
| UI_ICN_12 | Verify Ghost/Blue icon button — Hover | 1. Hover<br>**Expected:** Hover state đúng |
| UI_ICN_13 | Verify Ghost/Blue icon button — Active | 1. Click giữ<br>**Expected:** Active state đúng |
| UI_ICN_14 | Verify Ghost/Blue icon button — Focused | 1. Tab vào<br>**Expected:** Focus ring visible |
| UI_ICN_15 | Verify Ghost/Blue icon button — Disabled | 1. Tìm disabled<br>**Expected:** Dimmed, không click được |
| UI_ICN_16 | Verify Secondary icon button — đủ 5 states | 1. Kiểm tra lần lượt Default/Hover/Active/Focused/Disabled<br>**Expected:** Mỗi state render đúng |
| UI_ICN_17 | Verify Gray icon button — đủ 5 states | 1. Kiểm tra lần lượt 5 states<br>**Expected:** Mỗi state render đúng |
| UI_ICN_18 | Verify Outline icon button — đủ 5 states | 1. Kiểm tra lần lượt 5 states<br>**Expected:** Mỗi state render đúng |
| UI_ICN_19 | Verify icon set là Ant Design SVG | 1. Inspect element icon bất kỳ<br>**Expected:** Icon là SVG, thuộc Ant Design icon set |
| UI_ICN_20 | Verify không còn icon cũ | 1. Kiểm tra tất cả icon trên hệ thống<br>**Expected:** Không có icon nào thuộc bộ icon cũ (trước khi update) |
| | **NHÓM 6 — HEADER / NAVIGATION** | |
| UI_HDR_01 | Verify header height | 1. Inspect element header<br>**Expected:** height ≈ 68px |
| UI_HDR_02 | Verify header background color | 1. Inspect background header<br>**Expected:** background = #FFFFFF |
| UI_HDR_03 | Verify header box-shadow | 1. Inspect box-shadow<br>**Expected:** box-shadow: 0px 1px 0px #F0F0F0 |
| UI_HDR_04 | Verify header border-radius | 1. Inspect border-radius header<br>**Expected:** border-radius = 5px |
| UI_HDR_05 | Verify header border | 1. Inspect border<br>**Expected:** border = 1px |
| UI_HDR_06 | Verify logo width | 1. Inspect logo width<br>**Expected:** width = 46px |
| UI_HDR_07 | Verify logo height | 1. Inspect logo height<br>**Expected:** height = 59px |
| UI_HDR_08 | Verify logo không đổi màu khi hover | 1. Hover lên logo<br>**Expected:** Màu/opacity logo không thay đổi |
| UI_HDR_09 | Verify logo không đổi màu khi click | 1. Click lên logo<br>**Expected:** Màu/opacity logo không thay đổi |
| UI_HDR_10 | Verify menu label font-size | 1. Inspect text menu item<br>**Expected:** font-size = 16px |
| UI_HDR_11 | Verify menu label font-weight | 1. Inspect font-weight menu label<br>**Expected:** font-weight = 700 (Bold) |
| UI_HDR_12 | Verify menu label font-family | 1. Inspect font-family<br>**Expected:** font-family = Roboto |
| UI_HDR_13 | Verify menu text color — Default | 1. Inspect color menu item chưa chọn<br>**Expected:** color = rgba(0,0,0,0.85) |
| UI_HDR_14 | Verify menu text color — Hover | 1. Hover vào menu item<br>**Expected:** color = #F5222D |
| UI_HDR_15 | Verify menu underline — Hover | 1. Hover vào menu item<br>**Expected:** Underline 2px xuất hiện |
| UI_HDR_16 | Verify menu text color — Selected | 1. Click chọn menu item<br>**Expected:** color = #F5222D |
| UI_HDR_17 | Verify menu underline — Selected | 1. Quan sát menu item đang được chọn<br>**Expected:** Có underline 2px |
| UI_HDR_18 | Verify menu text color — Click | 1. Click giữ menu item<br>**Expected:** color = #F5222D |
| UI_HDR_19 | Verify menu underline — Click | 1. Click giữ menu item<br>**Expected:** Underline 2px visible |
| UI_HDR_20 | Verify dropdown icon size | 1. Inspect icon mũi tên dropdown tại menu<br>**Expected:** width = 8px, height = 4.6px |
| UI_HDR_21 | Verify dropdown icon color — Default | 1. Inspect icon color khi menu chưa chọn<br>**Expected:** color = rgba(0,0,0,0.85) |
| UI_HDR_22 | Verify dropdown icon color — Hover | 1. Hover menu item có dropdown<br>**Expected:** Icon color = #F5222D |
| UI_HDR_23 | Verify dropdown icon color — Selected | 1. Click chọn menu item có dropdown<br>**Expected:** Icon color = #F5222D |
| UI_HDR_24 | Verify header nhất quán toàn hệ thống | 1. Navigate qua tất cả màn chính<br>**Expected:** Header style giống nhau, không có màn nào khác biệt |
| | **NHÓM 6b — DROPDOWN LIST** | |
| UI_DDL_01 | Verify dropdown xuất hiện đúng vị trí | 1. Click menu item có sub-menu<br>**Expected:** Dropdown list xuất hiện ngay dưới menu item |
| UI_DDL_02 | Verify dropdown background | 1. Mở dropdown, inspect background<br>**Expected:** background = #FFFFFF |
| UI_DDL_03 | Verify dropdown box-shadow | 1. Inspect box-shadow dropdown<br>**Expected:** box-shadow = 0px 3px 6px rgba(0,0,0,0.25) |
| UI_DDL_04 | Verify dropdown item height | 1. Inspect height của item trong dropdown<br>**Expected:** height = 40px |
| UI_DDL_05 | Verify dropdown item background — Default | 1. Quan sát item chưa hover<br>**Expected:** background = #FFFFFF |
| UI_DDL_06 | Verify dropdown item background — Hover | 1. Hover vào item dropdown<br>2. Inspect background<br>**Expected:** background = #FFF1F0 |
| UI_DDL_07 | Verify dropdown item underline — Hover | 1. Hover vào item<br>**Expected:** Xuất hiện underline |
| UI_DDL_08 | Verify dropdown item background — Selected | 1. Click chọn item<br>**Expected:** background = #FFF1F0 |
| UI_DDL_09 | Verify dropdown item underline — Selected | 1. Quan sát item đang được chọn<br>**Expected:** Có underline |
| UI_DDL_10 | Verify dropdown đóng khi click ngoài | 1. Mở dropdown<br>2. Click ra ngoài vùng dropdown<br>**Expected:** Dropdown đóng lại |
| | **NHÓM 7 — TABS** | |
| UI_TAB_01 | Verify tab zone vị trí | 1. Mở màn hình có tab<br>**Expected:** Tab zone nằm ngay dưới header |
| UI_TAB_02 | Verify tab item height | 1. Inspect height của tab item<br>**Expected:** height = 44px |
| UI_TAB_03 | Verify tab font-size | 1. Inspect font-size text trong tab<br>**Expected:** font-size = 14px |
| UI_TAB_04 | Verify tab background — Default | 1. Inspect tab chưa chọn<br>**Expected:** background = #FFFFFF |
| UI_TAB_05 | Verify tab color — Selected | 1. Click chọn tab<br>2. Inspect text color<br>**Expected:** color = #F5222D (Dust Red) |
| UI_TAB_06 | Verify tab underline — Selected | 1. Inspect underline tab đang chọn<br>**Expected:** Có underline, màu Dust Red |
| UI_TAB_07 | Verify tab switching — chỉ 1 tab active | 1. Click lần lượt nhiều tab<br>**Expected:** Chỉ tab vừa click có highlight, tab cũ mất highlight |
| UI_TAB_08 | Verify tab nội dung thay đổi khi switch | 1. Click sang tab khác<br>**Expected:** Nội dung bên dưới thay đổi theo tab đang chọn |
| UI_TAB_09 | Verify tab hover — không thay đổi đáng kể | 1. Hover vào tab chưa chọn<br>**Expected:** Không có thay đổi lớn (subtle hoặc no change) |
| | **NHÓM 8 — SEARCH FIELD** | |
| UI_SRH_01 | Verify search field width | 1. Inspect width search container<br>**Expected:** width = 400px |
| UI_SRH_02 | Verify search field height | 1. Inspect height<br>**Expected:** height = 40px |
| UI_SRH_03 | Verify search field border-radius | 1. Inspect border-radius<br>**Expected:** border-radius = 8px |
| UI_SRH_04 | Verify search border color — Default | 1. Inspect border-color khi chưa focus<br>**Expected:** border-color = #D9D9D9 (neutral) |
| UI_SRH_05 | Verify search border — Focus state | 1. Click vào search field<br>2. Inspect border<br>**Expected:** Border highlight (đổi màu sang accent/primary) |
| UI_SRH_06 | Verify search icon width | 1. Inspect icon search<br>**Expected:** width = 24px |
| UI_SRH_07 | Verify search icon height | 1. Inspect icon search<br>**Expected:** height = 24px |
| UI_SRH_08 | Verify search icon color | 1. Inspect icon color<br>**Expected:** color = rgba(0,0,0,0.45) |
| UI_SRH_09 | Verify placeholder font-size | 1. Inspect placeholder<br>**Expected:** font-size = 14px |
| UI_SRH_10 | Verify placeholder color | 1. Inspect placeholder color<br>**Expected:** color = rgba(0,0,0,0.25) |
| UI_SRH_11 | Verify placeholder ẩn khi nhập | 1. Click vào search, nhập ký tự<br>**Expected:** Placeholder ẩn đi |
| | **NHÓM 9 — BUTTONS (Spec Monitor)** | |
| UI_BTN_S01 | Verify button "Search nâng cao" width | 1. Inspect width button<br>**Expected:** width ≈ 120px |
| UI_BTN_S02 | Verify button "Search nâng cao" height | 1. Inspect height<br>**Expected:** height = 40px |
| UI_BTN_S03 | Verify button "Search nâng cao" border-radius | 1. Inspect border-radius<br>**Expected:** border-radius = 8px |
| UI_BTN_S04 | Verify button "Search nâng cao" font-family | 1. Inspect font label<br>**Expected:** font-family = Roboto |
| UI_BTN_S05 | Verify button "Search nâng cao" font-weight | 1. Inspect font-weight<br>**Expected:** font-weight = 500 (Medium) |
| UI_BTN_S06 | Verify button "Search nâng cao" bg — Default | 1. Inspect background<br>**Expected:** background = Dust Red (#F5222D) |
| UI_BTN_S07 | Verify button "Search nâng cao" text color — Default | 1. Inspect text color<br>**Expected:** color = #FFFFFF |
| UI_BTN_S08 | Verify button "Search nâng cao" — Hover | 1. Hover button<br>**Expected:** Màu thay đổi nhẹ (darker shade) hoặc giữ nguyên |
| UI_BTN_S09 | Verify button "Search nâng cao" — Click | 1. Click button<br>**Expected:** Button phản hồi click, màu giữ nguyên |
| UI_BTN_S10 | Verify button "Thêm mới" có icon "+" | 1. Quan sát button Thêm mới<br>**Expected:** Icon "+" hiển thị trong button |
| UI_BTN_S11 | Verify button "Thêm mới" icon width | 1. Inspect icon "+"<br>**Expected:** width = 24px |
| UI_BTN_S12 | Verify button "Thêm mới" icon height | 1. Inspect icon "+"<br>**Expected:** height = 24px |
| UI_BTN_S13 | Verify button "Thêm mới" click behavior | 1. Click button Thêm mới<br>**Expected:** Mở form/modal thêm mới tương ứng |
| | **NHÓM 10 — BREADCRUMB** | |
| UI_BRD_01 | Verify breadcrumb item height | 1. Inspect height breadcrumb item<br>**Expected:** height = 22px |
| UI_BRD_02 | Verify breadcrumb padding-left | 1. Inspect padding-left<br>**Expected:** padding-left = 16px |
| UI_BRD_03 | Verify breadcrumb padding-right | 1. Inspect padding-right<br>**Expected:** padding-right = 16px |
| UI_BRD_04 | Verify breadcrumb width fill theo text | 1. So sánh 2 breadcrumb item có text dài khác nhau<br>**Expected:** Width mỗi item = theo độ dài text, không fixed |
| UI_BRD_05 | Verify breadcrumb path đúng màn hình | 1. Navigate vào màn hình con<br>**Expected:** Breadcrumb hiển thị đúng path (Module > Sub-module > ...) |
| UI_BRD_06 | Verify breadcrumb text color — Normal (non-current) | 1. Inspect text color breadcrumb item không phải current<br>**Expected:** color = rgba(0,0,0,0.45) |
| UI_BRD_07 | Verify breadcrumb text color — Highlight (current) | 1. Inspect text color item cuối (current)<br>**Expected:** color = #F5222D (Dust Red) |
| UI_BRD_08 | Verify breadcrumb active background — Current | 1. Inspect background breadcrumb item current<br>**Expected:** background = #FFFFFF |
| UI_BRD_09 | Verify breadcrumb active text color — Current | 1. Inspect màu text item hiện tại<br>**Expected:** color = rgba(0,0,0,0.85) |
| UI_BRD_10 | Verify breadcrumb highlight đúng khi navigate | 1. Navigate qua nhiều màn<br>**Expected:** Breadcrumb item cuối luôn highlight Dust Red = trang hiện tại |
| UI_BRD_11 | Verify navigate click breadcrumb item | 1. Click vào breadcrumb item không phải current<br>**Expected:** Navigate về đúng trang tương ứng |
| | **NHÓM 11 — TABLE / DATA GRID** | |
| UI_TBL_01 | Verify data row height | 1. Inspect height của data row trong table<br>**Expected:** height = 56px |
| UI_TBL_02 | Verify table header background | 1. Inspect background header row<br>**Expected:** background = #E4E4E7 |
| UI_TBL_03 | Verify table border color | 1. Inspect border-color table<br>**Expected:** border-color = #D9D9D9 |
| UI_TBL_04 | Verify even row (chẵn) background | 1. Inspect row thứ 2, 4, 6...<br>**Expected:** background = #FAFAFA |
| UI_TBL_05 | Verify odd row (lẻ) background | 1. Inspect row thứ 1, 3, 5...<br>**Expected:** background = #FFFFFF |
| UI_TBL_06 | Verify row hover background | 1. Hover vào data row<br>**Expected:** background = #E6F4FF |
| UI_TBL_07 | Verify row hover trả về default khi mouseout | 1. Hover vào row rồi di chuột ra<br>**Expected:** Background row trở về màu ban đầu |
| UI_TBL_08 | Verify header text font-weight | 1. Inspect font-weight text trong header row<br>**Expected:** font-weight = 500 |
| UI_TBL_09 | Verify header text font-size | 1. Inspect font-size header text<br>**Expected:** font-size = 14px |
| UI_TBL_10 | Verify header text color | 1. Inspect color header text<br>**Expected:** color = #262626 |
| UI_TBL_11 | Verify cell text font-weight | 1. Inspect font-weight cell text<br>**Expected:** font-weight = 400 |
| UI_TBL_12 | Verify cell text font-size | 1. Inspect font-size cell<br>**Expected:** font-size = 14px |
| UI_TBL_13 | Verify cell text color | 1. Inspect color cell text<br>**Expected:** color = #262626 |
| UI_TBL_14 | Verify table header smoke (baseline) | 1. Mở màn hình có table<br>2. So sánh header với baseline cũ (screenshot/spec cũ)<br>**Expected:** Header render = baseline cũ |
| UI_TBL_15 | Verify row height nhất quán tất cả table hệ thống | 1. Kiểm tra lần lượt các table trên các màn khác nhau<br>**Expected:** height = 56px trên tất cả, không có ngoại lệ |
| | **NHÓM 12 — PAGINATION** | |
| UI_PAG_01 | Verify pagination height | 1. Inspect height pagination row<br>**Expected:** height = 36px |
| UI_PAG_02 | Verify pagination width | 1. Inspect width<br>**Expected:** width = 666px |
| UI_PAG_03 | Verify border-top phân cách | 1. Inspect border-top pagination<br>**Expected:** border-top = 2px |
| UI_PAG_04 | Verify active page button style khác non-active | 1. Quan sát trang hiện tại trong pagination<br>**Expected:** Style (bg/color/border) khác biệt rõ với page không active |
| UI_PAG_05 | Verify active page button color | 1. Inspect background active page button<br>**Expected:** Background hoặc color = primary (#1677FF hoặc Dust Red theo spec) |
| UI_PAG_06 | Verify non-active page button style | 1. Inspect page button không active<br>**Expected:** Style bình thường, không highlight |
| UI_PAG_07 | Verify Default variant render đúng | 1. Mở màn có pagination Default<br>**Expected:** Layout pagination hiển thị đúng |
| UI_PAG_08 | Verify Variant2 render đúng | 1. Mở màn có pagination Variant2 (nếu có)<br>**Expected:** Layout đúng variant |
| UI_PAG_09 | Verify click Previous page | 1. Đang ở page 2+<br>2. Click Previous<br>**Expected:** Về page trước, active page cập nhật |
| UI_PAG_10 | Verify click Next page | 1. Đang ở page chưa phải cuối<br>2. Click Next<br>**Expected:** Sang page tiếp, active page cập nhật |
| UI_PAG_11 | Verify click số page cụ thể | 1. Click số page bất kỳ<br>**Expected:** Active đúng page đó, data bảng thay đổi |
| UI_PAG_12 | Verify data bảng thay đổi khi navigate page | 1. Click sang page khác<br>**Expected:** Dữ liệu trong bảng cập nhật theo page |
| | **NHÓM 13 — MODAL / DIALOG** | |
| UI_MOD_01 | Verify modal background | 1. Mở modal bất kỳ<br>2. Inspect background modal<br>**Expected:** background = #FFFFFF |
| UI_MOD_02 | Verify modal KHÔNG có overlay | 1. Mở modal<br>2. Kiểm tra có backdrop/overlay tối phía sau không<br>**Expected:** Không có overlay |
| UI_MOD_03 | Verify click ngoài modal — không đóng | 1. Mở modal<br>2. Click ra vùng ngoài modal<br>**Expected:** Modal KHÔNG đóng |
| UI_MOD_04 | Verify modal đóng khi click X | 1. Mở modal<br>2. Click nút X góc header<br>**Expected:** Modal đóng |
| UI_MOD_05 | Verify modal đóng khi click Cancel | 1. Mở modal<br>2. Click button Cancel/Hủy<br>**Expected:** Modal đóng |
| UI_MOD_06 | Verify modal header title font-size | 1. Inspect title trong modal header<br>**Expected:** font-size = 16px |
| UI_MOD_07 | Verify modal header title font-weight | 1. Inspect font-weight title<br>**Expected:** font-weight = 700 (Bold) |
| UI_MOD_08 | Verify modal header có nút X | 1. Quan sát modal header<br>**Expected:** Nút X hiển thị ở góc phải header |
| UI_MOD_09 | Verify modal body padding | 1. Inspect padding của modal body<br>**Expected:** padding = 24px |
| UI_MOD_10 | Verify modal footer có Primary button | 1. Quan sát modal footer<br>**Expected:** Có ít nhất 1 Primary button |
| UI_MOD_11 | Verify modal footer có Ghost button | 1. Quan sát modal footer<br>**Expected:** Có Ghost button (Cancel/Hủy) |
| UI_MOD_12 | Verify tất cả modal hệ thống đều không có overlay | 1. Mở lần lượt các modal trên hệ thống<br>**Expected:** Không modal nào có overlay/backdrop |
| | **NHÓM 14 — TAG / BADGE** | |
| UI_TAG_01 | Verify tag border-radius | 1. Inspect border-radius tag<br>**Expected:** border-radius = 16px |
| UI_TAG_02 | Verify tag padding-top | 1. Inspect padding-top<br>**Expected:** padding-top = 1px |
| UI_TAG_03 | Verify tag padding-right | 1. Inspect padding-right<br>**Expected:** padding-right = 8px |
| UI_TAG_04 | Verify tag padding-bottom | 1. Inspect padding-bottom<br>**Expected:** padding-bottom = 1px |
| UI_TAG_05 | Verify tag padding-left | 1. Inspect padding-left<br>**Expected:** padding-left = 8px |
| UI_TAG_06 | Verify tag background color | 1. Inspect background-color tag<br>**Expected:** background = #F6FFED (Polar Green/1) |
| UI_TAG_07 | Verify tag text color | 1. Inspect text color trong tag<br>**Expected:** color = #B7EB8F (Polar Green/3) |
| UI_TAG_08 | Verify tag render đúng trên các màn | 1. Kiểm tra tag xuất hiện trên ít nhất 2 màn khác nhau<br>**Expected:** Style nhất quán trên tất cả màn |
| | **NHÓM 15 — FOOTER** | |
| UI_FTR_01 | Verify footer width | 1. Inspect width footer<br>**Expected:** width = 1440px |
| UI_FTR_02 | Verify footer height | 1. Inspect height footer<br>**Expected:** height ≈ 66px |
| UI_FTR_03 | Verify footer background (spec Monitor) | 1. Inspect background footer<br>**Expected:** background = #D9D9D9 (Neutral) |
| UI_FTR_04 | Verify footer font-family | 1. Inspect font-family text trong footer<br>**Expected:** font-family = Roboto |
| UI_FTR_05 | Verify footer font-weight | 1. Inspect font-weight<br>**Expected:** font-weight = 400 (Regular) |
| UI_FTR_06 | Verify footer font-size | 1. Inspect font-size<br>**Expected:** font-size = 12px |
| UI_FTR_07 | Verify footer line-height | 1. Inspect line-height<br>**Expected:** line-height = 16px |
| UI_FTR_08 | Verify text "Autolake" color | 1. Inspect color text "Autolake"<br>**Expected:** color = rgba(0,0,0,0.85) |
| UI_FTR_09 | Verify text copyright nội dung | 1. Quan sát text copyright trong footer<br>**Expected:** Hiển thị đúng "Copyright ©️ 2026 - Developed by Viettel Group" |
| UI_FTR_10 | Verify text copyright color | 1. Inspect color text copyright<br>**Expected:** color = rgba(0,0,0,0.45) |
| | **NHÓM 16 — ICON SYSTEM** | |
| UI_ICO_01 | Verify icon set là Ant Design | 1. Inspect class/source của icon bất kỳ trên UI<br>**Expected:** Icon thuộc Ant Design Icons |
| UI_ICO_02 | Verify icon format là SVG | 1. Inspect element icon<br>**Expected:** Format = SVG (không phải PNG, font icon) |
| UI_ICO_03 | Verify icon size chuẩn = 20px width | 1. Inspect width icon<br>**Expected:** width = 20px |
| UI_ICO_04 | Verify icon size chuẩn = 20px height | 1. Inspect height icon<br>**Expected:** height = 20px |
| UI_ICO_05 | Verify không còn icon cũ tồn tại | 1. Kiểm tra toàn bộ icon trên hệ thống<br>**Expected:** Không có icon nào thuộc bộ cũ |
| | **NHÓM 17 — RADIUS SYSTEM** | |
| UI_RAD_01 | Verify radius 5px trên input field | 1. Inspect border-radius input bất kỳ<br>**Expected:** border-radius = 5px |
| UI_RAD_02 | Verify radius 5px trên header | 1. Inspect border-radius header<br>**Expected:** border-radius = 5px |
| UI_RAD_03 | Verify radius 8px trên standard button | 1. Inspect border-radius button text<br>**Expected:** border-radius = 8px |
| UI_RAD_04 | Verify radius 8px trên modal | 1. Inspect border-radius modal container<br>**Expected:** border-radius ≈ 8px |
| UI_RAD_05 | Verify radius 100px trên icon button | 1. Inspect border-radius icon button<br>**Expected:** border-radius = 100px (hình tròn) |
| UI_RAD_06 | Verify radius 16px trên tag | 1. Inspect border-radius tag<br>**Expected:** border-radius = 16px |
| UI_RAD_07 | Verify radius 4px trên section/row container | 1. Inspect border-radius section container<br>**Expected:** border-radius = 4px |
| | **NHÓM 18 — COLOR SYSTEM (bổ sung)** | |
| UI_CLR_18 | Verify Tag background = #F6FFED | 1. Inspect background tag<br>**Expected:** background = #F6FFED |
| UI_CLR_19 | Verify Tag text color = #B7EB8F | 1. Inspect text color tag<br>**Expected:** color = #B7EB8F |
| UI_CLR_20 | Verify Primary/6 = #1677FF trên tất cả primary element | 1. Kiểm tra tất cả element dùng Primary color<br>**Expected:** Màu = #1677FF, không có sai lệch |
