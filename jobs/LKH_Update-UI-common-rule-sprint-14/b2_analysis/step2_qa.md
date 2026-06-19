# B2 — Step 2: Q&A
# LKH_Update-UI-common-rule-sprint-14

**Ngày sinh:** 2026-06-19
**Trạng thái:** OPEN — chờ Monitor trả lời

---

| QA_ID | Loại | Câu hỏi | Context | AI đề xuất | Trả lời | Nguồn | Trạng thái | Ảnh hưởng |
|---|---|---|---|---|---|---|---|---|
| QA-01 | MISSING-COVERAGE | Modal không có overlay — khi user click ra ngoài modal thì behavior là gì? Đóng modal hay không? | b1_v2 §7: "Không có overlay". Thông thường modal có backdrop. Đây là intentional design hay thiếu trong Figma? | Thường thì không overlay = không đóng khi click ngoài, phải click nút X hoặc button Cancel | | | OPEN | C-02: Ảnh hưởng workflow confirm; TCD cần scenario "click outside modal" |
| QA-02 | MISSING-COVERAGE | Breadcrumb component — spec cụ thể (height, padding, font, separator, active color)? | b1_v2 §10: chưa navigate vào Breadcrumb component. Figma có "Breadcrumb Item Container" | | | | OPEN | B-07: Cần để sinh TCD/TC cho breadcrumb |
| QA-03 | MISSING-COVERAGE | Tag/Badge component — spec cụ thể (height, padding, font size, border radius, color variants)? | b1_v2 §11: chưa navigate vào Tag component | | | | OPEN | B-08: Cần để sinh TCD/TC cho tag |
| QA-04 | MISSING-COVERAGE | Footer component — spec cụ thể (height, content, background, typography)? | b1_v2 §9: chưa navigate vào Footer | | | | OPEN | B-09: Cần để sinh TCD/TC cho footer |
| QA-05 | MISSING-COVERAGE | Mobile / Responsive — common rule có áp dụng cho mobile không? Figma có "Ant Design Mobile" page. | Figma file có page Ant Design Mobile. Customer description nói "toàn bộ hệ thống" nhưng không rõ có mobile không | Đề xuất chỉ scope Desktop (1440px) trước cho Sprint 14 | | | OPEN | B-10: Nếu có mobile thì tăng đáng kể scope TCD/TC |
| QA-06 | MISSING-COVERAGE | Dark mode — có áp dụng trong Sprint 14 không? Figma có Colors page với Light và Dark column. | Figma có Dark color scheme. Customer description không đề cập dark mode | Đề xuất chỉ Light mode cho Sprint 14 | | | OPEN | B-11: Nếu có dark mode thì phải double TCD/TC cho toàn bộ |
| QA-07 | MISSING-COVERAGE | Footnote và Toggle typography — size/weight/line-height cụ thể là bao nhiêu? | b1_v2 §2.3: Footnote và Toggle chưa verify được size từ Figma | | | | OPEN | Ảnh hưởng TCD typography — caption, helper text, toggle label |
| QA-08 | MISSING-COVERAGE | Button text label — font size/weight bên trong button (text button) là bao nhiêu? | b1_v2 §5.1: chỉ có height 40px, radius 8px — chưa có typography của label bên trong button | Đề xuất Body/medium 14px hoặc H5/regular 16px | | | OPEN | Ảnh hưởng TCD button — verify text rendering |
| QA-09 | POSSIBLE-IMPACT | Table — header height chuẩn là bao nhiêu? Monitor đã bảo "bỏ qua" nhưng cần confirm: bỏ qua khỏi extract hay bỏ qua khỏi test scope? | b1_v2 §6.1: "Header height — tạm bỏ qua theo Monitor" | Nếu bỏ khỏi test → TCD sẽ không có scenario verify header height | | | OPEN | Nếu bỏ test → potential escape khi header render sai height |
| QA-10 | POSSIBLE-IMPACT | Input field — Label text (trên input) và Required asterisk (*) — color của chúng là gì? Error label color có đổi thành đỏ không? | b1_v2 §4.4: có đề cập label nhưng chưa có color token cụ thể cho label | Đề xuất: Label default = Neutral/10 (#262626), Error label = Dust Red/6 (#F5222D) | | | OPEN | TCD input states — label color khi error |
| QA-11 | POSSIBLE-IMPACT | Button — khi hover standard button (text button) thì background/border thay đổi như thế nào? | b1_v2 §5.2 chỉ có hover cho Primary (#096DD9) và Ghost (#E6F4FF) icon button — chưa có standard button hover | | | | OPEN | TCD button hover states |
| QA-12 | POSSIBLE-IMPACT | Icon system — có thay đổi icon set không? Font icon hay SVG? Size chuẩn của icon trong button là bao nhiêu (16px hay 20px)? | b1_v2 không đề cập icon system. Figma có icon nhưng chưa extract | | | | OPEN | TCD icon button — icon size verify |
| QA-13 | POSSIBLE-IMPACT | Table — có pagination component không? Nếu có thì style pagination (button size, active page color) có theo common rule không? | Quan sát canvas: Table frame rất lớn (5456px height) → có thể có pagination | | | | OPEN | TCD table — pagination behavior |
| QA-14 | MISSING-COVERAGE | Màn hình Login (Sign-In-Form-Desktop-Layout-1440) có nằm trong scope Sprint 14 không? | Figma có frame Login — không rõ có test trong sprint này không | Đề xuất confirm với BA/PO | | | OPEN | Nếu trong scope → thêm TCD cho Login form |
