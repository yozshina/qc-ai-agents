# REVIEW — QC_AI_WORKFLOW_v3
> **Tài liệu đánh giá chuyên sâu — KHÔNG sửa nội dung gốc**
> Người review: AI Agent (đóng vai Senior QC / Test Architect)
> Ngày review: 2026-06-24
> Đối tượng: `QC_AI_WORKFLOW_v3.md`
> Trọng tâm chiến lược bổ sung: (1) TC phải đủ chất lượng để AI follow chạy **Manual Test qua MCP**; (2) đặt nền cho **Automation Framework**.

---

## ⚠️ NGUYÊN TẮC CỦA BẢN REVIEW NÀY

- Đây **chỉ là comment / đánh giá / đề xuất**. **Không có nội dung nào trong file gốc bị thay đổi.**
- Mọi đề xuất bên dưới đều ở dạng "Monitor cân nhắc" — **quyền quyết định cuối cùng thuộc về Monitor.**
- Các comment được đánh số `[R-xx]` để Monitor dễ tham chiếu khi phản hồi.
- Mức độ ưu tiên: 🔴 Critical (nên xử lý trước khi scale) · 🟡 Major (ảnh hưởng chất lượng) · 🟢 Minor (tinh chỉnh) · 🔵 Strategic (định hướng tương lai Manual-MCP / Automation).

---

## PHẦN I — ĐÁNH GIÁ TỔNG QUAN (Executive Assessment)

### Nhận định chung từ góc nhìn Test Architect

v3 đã đạt đến độ chững chạc hiếm thấy ở một quy trình QC nội bộ. Ba điểm tôi đánh giá cao nhất:

1. **Tư duy "Impact Analysis trước, Test Design sau"** — đây là điều phân biệt một QC trưởng thành với một test-case-writer. Phần lớn defect escape trong thực tế không đến từ "test sai" mà từ "không biết phải test cái gì". Việc đặt Impact B (Reverse Map) và C (Workflow) làm trung tâm là một quyết định kiến trúc đúng đắn, đúng với triết lý của ISTQB về *test basis* và *test conditions*.

2. **Gate discipline + Monitor-first** — chống lại "automation complacency" (sự ỷ lại vào tự động hóa), một trong những rủi ro lớn nhất khi đưa AI vào QC. Cơ chế Trust Level/Bypass là cách xử lý thông minh bài toán "tốc độ vs kiểm soát".

3. **Tách Core/Config** — đây là tư duy của người làm framework, không phải người làm script. Nó cho phép quy trình này trở thành một *sản phẩm* chứ không phải một *tài liệu dự án*.

### Tuy nhiên — khoảng trống chiến lược lớn nhất

> **v3 vẫn là một "Test Design Pipeline", chưa phải "Test Lifecycle Pipeline".**

Toàn bộ pipeline kết thúc ở B5 (Export). Nhưng mục tiêu mới mà Monitor đặt ra — *AI follow TC để chạy Manual Test qua MCP, rồi tiến tới Automation* — đòi hỏi pipeline phải nghĩ về **"TC sẽ được EXECUTE như thế nào"** ngay từ lúc **THIẾT KẾ** TC. Đây không phải việc thêm một bước B6. Đây là việc thay đổi *DNA của TC* được sinh ra ở B4.

Một TC viết cho người đọc và một TC viết cho agent execute là **hai sinh vật khác nhau**. Phần lớn comment chiến lược của tôi xoay quanh điểm này. Chi tiết ở Phần III.

---

## PHẦN II — COMMENT THEO TỪNG SECTION

### Section 00 — README & Triết lý

**[R-01] 🟢 Trust Level — thiếu định nghĩa "đo lường chất lượng để lên level"**
Trust Level hiện dựa trên đếm số job (`≥3`, `≥5`) + đánh giá chủ quan "output liên tục đạt chất lượng". Đây là một cơ chế tốt nhưng định nghĩa "đạt chất lượng" đang định tính. Từ góc nhìn QC, bất kỳ thứ gì dùng để ra quyết định nên có metric.
*Đề xuất để Monitor cân nhắc:* định nghĩa một vài chỉ số khách quan, ví dụ:
- **Gate rejection rate** — tỷ lệ output bị Monitor reject tại mỗi gate qua N job gần nhất. Ví dụ: < 10% trong 3 job liên tục → đủ điều kiện xét Level 1.
- **Escape count** — số lỗi lọt qua mà Monitor phát hiện sau khi đã confirm. Bất kỳ escape nào → reset.
- **Diff acceptance rate** — tỷ lệ dòng AI tô màu được Monitor accept nguyên trạng (không sửa).
Có metric thì Trust Level mới mang tính kiểm chứng được, không phải "cảm giác tin tưởng".

**[R-02] 🟡 Trust Level Bypass có thể mâu thuẫn với chính nguyên tắc cốt lõi**
File khẳng định nhiều lần "Monitor kiểm soát tuyệt đối", "AI tuyệt đối không tự quyết". Nhưng Level 2 cho phép "Gate 4a tự động confirm". Cần làm rõ ranh giới: *bypass = Monitor không cần bấm confirm thủ công*, **không phải** *AI tự đánh giá là đạt*. Hai cái này khác nhau về bản chất trách nhiệm. Nếu một TC sai lọt qua ở trạng thái bypass, ai chịu trách nhiệm? Đề xuất ghi rõ: **bypass chuyển trách nhiệm sang Monitor một cách mặc định (silent approval), và Monitor chấp nhận rủi ro này khi bật bypass.** Điều này cũng cần một dòng audit log ghi lại "gate X đã được bypass ở job Y theo chỉ định ngày Z".

**[R-03] 🔵 Config-via-chat — tiện nhưng là lỗ hổng traceability**
Cho phép Monitor đổi config qua chat rất tiện, nhưng nếu thay đổi không được ghi lại vào file một cách bắt buộc, ta mất *audit trail của config*. Trong QC, "config tại thời điểm test" là một phần của test evidence. Đề xuất: mọi config-via-chat phải tự động sinh một dòng changelog (ai đổi, đổi gì, khi nào, ở job nào) — kể cả khi Monitor chưa confirm ghi vào file chính.

---

### Section 01 — Phân tích & Đánh giá

**[R-04] 🟢 Mục 1.1 — "Dừng cứng micro-step" cần một van an toàn**
Nguyên tắc "dừng cứng kể cả micro-step, không tính toán thêm" rất tốt cho việc tiết kiệm token và tránh AI "tự bịa". Nhưng cần tránh thái cực ngược: AI dừng quá sớm với một vấn đề mà nó hoàn toàn có thể tự xử lý (ví dụ retry MCP 1 lần trước khi báo lỗi). Đề xuất phân biệt:
- **Lỗi transient** (timeout, disconnect tạm) → AI được phép retry tối đa N lần (config) trước khi dừng.
- **Lỗi blocking** (file không tồn tại, không có quyền, input mờ) → dừng ngay.
Nếu không phân biệt, mỗi blip mạng nhỏ cũng làm Monitor phải can thiệp → phản tác dụng.

**[R-05] 🟡 Mục 1.3 — Định nghĩa Q&A CRITICAL/MAJOR/MINOR đang gắn cứng vào tầng A/B/C**
Cách phân loại hiện tại: CRITICAL = tầng A, MAJOR = tầng B/C, MINOR = detail nhỏ. Đây là một heuristic gọn nhưng **không phải lúc nào cũng đúng**. Một câu hỏi về tầng C (workflow) có thể CRITICAL hơn cả tầng A — ví dụ "sau khi submit, tiền có bị trừ 2 lần không?" là workflow nhưng cực kỳ critical. Đề xuất: phân loại Q&A theo **mức độ ảnh hưởng tới rủi ro** (kết hợp với Risk Score), không theo tầng impact một cách máy móc. Một Q&A chạm vào `high_risk_area` trong config → tự động nâng lên CRITICAL bất kể nó thuộc tầng nào.

**[R-06] 🔴 Mục 1.4 PENDING — Thiếu "Test Data Management" ở vị trí xứng đáng**
P9 (Test environment / test data) đang ở mức ưu tiên **Low**. Từ góc nhìn người sắp đưa AI vào *execute* test, đây là một đánh giá tôi không đồng tình. **Test data là điều kiện tiên quyết để execute — kể cả manual qua MCP.** Một TC dù viết hoàn hảo nhưng không có data hợp lệ để chạy thì không execute được. Khi pipeline tiến tới Manual-MCP (mục tiêu mới), test data nhảy từ Low lên gần như **High**. Đề xuất Monitor cân nhắc tách "Test Data Strategy" thành một hạng mục riêng và nâng ưu tiên — xem thêm [R-19].

---

### Section 02 — Phân loại Ticket

**[R-07] 🟡 Lightweight chỉ test Impact A — rủi ro mù regression**
Bảng phân luồng cho Lightweight chỉ làm "Impact A (Direct)", bỏ B và C. Tôi hiểu lý do (tối ưu cho ticket nhỏ), nhưng đây chính xác là nơi *escape số 1* mà file đã tự nhận diện ở Section 01. Lịch sử QC cho thấy: "fix nhỏ 1 dòng" lại làm vỡ một màn hình khác là kịch bản kinh điển. Một thay đổi *trông* nhỏ (Lightweight) vẫn có thể có reverse-impact lớn.
*Đề xuất:* ngay cả Lightweight cũng nên chạy một **"Impact B quick-scan"** — không phải full reverse map, nhưng tối thiểu hỏi một câu: *"component này có được dùng ở chỗ nào khác không?"*. Nếu câu trả lời là "có" → tự động nâng cấp khỏi Lightweight. Hiện file đã có tiêu chí "ảnh hưởng component dùng chung → không phải Lightweight", nhưng **làm sao biết nó dùng chung nếu không scan B?** Đây là vòng luẩn quẩn cần một bước quick-scan để phá.

**[R-08] 🟢 Tiêu chí "số component ≤2 / 3-5 / >5" — cần định nghĩa "component"**
"Component" là một từ rất co giãn. Với web app, 1 component có thể là 1 button hoặc cả 1 trang. Nếu không định nghĩa rõ "đơn vị đếm component" trong config, hai người (hoặc AI ở hai job) sẽ đếm khác nhau → phân loại khác nhau → không nhất quán. Đề xuất: định nghĩa "đơn vị component" trong `project-config.json` theo domain.

---

### Section 02B — Phân tích B3 vs B4-before

**[R-09] 🟢 Phân tích này rất tốt — bổ sung thêm một góc nhìn ISTQB**
Phần phân tích trùng lặp TCD vs Checklist được làm rất chuyên nghiệp. Tôi đồng tình với recommendation hybrid. Bổ sung một lăng kính lý thuyết để củng cố quyết định của Monitor:
- Trong ISTQB, **Test Condition (TCD)** trả lời *"WHAT to test"* và **Test Case (TC)** trả lời *"HOW to test"*.
- B4-before nằm ở giữa, nên giá trị của nó chỉ tồn tại nếu nó là **cầu nối** — tức là chứa thông tin *"test approach / test technique"* (boundary value, equivalence partitioning, decision table, state transition...). PA2 và PA3 trong file đã ngầm chạm tới điều này.
*Đề xuất nâng cấp PA2/PA3:* thêm một cột **"Test Technique"** vào checkpoint. Ví dụ với field email → ghi rõ technique là "Equivalence Partitioning + Boundary". Điều này (a) làm B4-before có giá trị thật sự khác TCD, (b) **chuẩn bị sẵn cho automation** vì test technique map thẳng sang cách generate data tự động sau này.

**[R-10] 🔵 Đây là điểm bắc cầu sang Automation — TC Skeleton (PA3) chính là "test scaffold"**
PA3 (TC Skeleton) không chỉ là checkpoint cho Monitor. Nhìn xa hơn: **TC Skeleton chính là khung mà automation framework sẽ fill code vào sau này.** Nếu thiết kế Skeleton có cấu trúc machine-readable (mỗi skeleton có ID, action type, expected type), thì khi xây automation, ta map 1-1 skeleton → test method. Đề xuất Monitor xem PA3 không phải là "lựa chọn cho Full" mà là **hướng đi chiến lược dài hạn cho mọi luồng** khi tiến tới automation.

---

### Section 03 — Pipeline Tổng thể

**[R-11] 🟡 Sơ đồ thiếu nhánh quay lui rõ ràng giữa các bước xa nhau**
Sơ đồ hiện thể hiện loop tại chỗ (B3 reject → loop B3) tốt. Nhưng thực tế QC, một phát hiện ở B4 (lúc viết TC) thường lộ ra một lỗ hổng impact ở B2. Pipeline cần một đường "escalate ngược về B2" tường minh. Hiện CR mode xử lý thay đổi từ *bên ngoài* (khách gửi CR), nhưng chưa có cơ chế cho thay đổi phát sinh *bên trong* (AI/Monitor tự phát hiện thiếu sót ở bước sau). Đề xuất: định nghĩa "Internal Feedback Loop" — khi ở Bn phát hiện vấn đề thuộc Bn-k, ghi nhận lý do, quay về Bn-k ở chế độ delta, không làm lại toàn bộ.

---

### Section 04 — Diễn giải từng bước

**[R-12] 🔴 B1 Extract — 7 hạng mục đang nghiêng 100% về UI, mất tính generic**
Đây là mâu thuẫn lớn nhất tôi thấy trong file. Section 00 tuyên bố "tổng quát hóa, không phụ thuộc dự án", nhưng 7 hạng mục extract (Typography/Color/Layout/States/Behavior/Spacing/Responsive) **là checklist thuần UI/frontend**. Một dự án API, data pipeline, hay backend sẽ không có "Typography" hay "Border radius".
Đây là tàn dư của Lakehouse (vốn là dự án UI). Nó vi phạm chính nguyên tắc generic mà v3 theo đuổi.
*Đề xuất để Monitor cân nhắc:* tách checklist extract thành **profile theo domain type**:
- `ui_profile`: 7 hạng mục hiện tại (Typography, Color, ...).
- `api_profile`: Endpoint, Method, Request schema, Response schema, Status codes, Auth, Rate limit, Error contract.
- `data_profile`: Source schema, Target schema, Transformation rules, Lineage, Data quality rules, Volume, SLA.
Profile được chọn dựa trên `domain.type` trong config. Lõi vẫn generic, profile là config. **Đây là việc cần làm trước khi áp dự án không-UI đầu tiên.**

**[R-13] 🟡 B2 — "BDD format" được nhắc nhưng chưa ràng buộc cấu trúc**
File nói scenario theo "BDD format" nhưng không enforce cú pháp Given/When/Then. BDD lỏng lẻo sẽ làm hỏng giá trị của nó. Quan trọng hơn cho mục tiêu mới: **Given/When/Then là format gần nhất với automation** (Cucumber/SpecFlow/Behave đều dùng Gherkin). Nếu B2 sinh scenario đúng chuẩn Gherkin ngay từ đầu, thì sau này automation framework có thể parse trực tiếp. Đề xuất enforce: mỗi scenario phải có cấu trúc `Given [precondition] When [action] Then [expected]` — đây vừa là kỷ luật tư duy, vừa là đầu tư cho automation.

**[R-14] 🔴 B4-after — "1 TC = 1 assertion" rất đúng nhưng Steps cần cấu trúc machine-actionable**
Đây là comment quan trọng nhất cho mục tiêu Manual-MCP. Rule "1 TC = 1 assertion" là vàng — nó đúng chuẩn atomic test và là điều kiện tiên quyết cho automation. Nhưng định dạng Steps hiện tại (`Các_bước` là một ô text) **không đủ để AI follow execute qua MCP.**
Một con người đọc "Nhập email và bấm Login" thì hiểu. Một agent điều khiển MCP cần biết: *element nào? selector gì? nhập giá trị gì? bấm cái gì? chờ điều gì?*
*Đề xuất cấu trúc lại Steps thành các bước nguyên tử có động từ chuẩn hóa* (xem chi tiết Phần III, đây là trọng tâm). Tối thiểu mỗi step nên tách được: `action | target | data | expected_intermediate`. Nếu Steps vẫn là free-text, AI sẽ phải "đoán" khi execute → quay lại đúng vấn đề "AI tự suy luận" mà file đang chống.

**[R-15] 🟢 B4-after — Thiếu Precondition có cấu trúc về trạng thái hệ thống**
Precondition hiện là một cột text. Để execute (manual qua MCP hoặc auto), precondition cần tách rõ: trạng thái đăng nhập, dữ liệu cần tồn tại trước, trạng thái màn hình khởi điểm, URL/route bắt đầu. Một precondition mơ hồ là nguyên nhân số 1 khiến test "chạy được trên máy tôi nhưng fail trên máy khác".

**[R-16] 🟡 B5 — Export chỉ có Excel, chưa nghĩ tới format machine-consumable**
Excel tuyệt vời cho Monitor review. Nhưng để AI/automation đọc lại TC mà execute, Excel không phải format lý tưởng (merge cell, format ẩn, khó parse ổn định). Đề xuất: B5 export **song song 2 format** — Excel cho người, và một bản **structured (JSON/YAML)** cho máy. Cả hai sinh từ cùng một nguồn để không lệch. Bản structured chính là cầu nối sang execution sau này.

---

### Section 05 — CR Mode

**[R-17] 🟢 CR mode tốt — bổ sung tiêu chí định lượng "CR vs Job mới"**
Hiện việc quyết định "CR quá lớn → job mới" hoàn toàn dựa vào cảm nhận Monitor. Đề xuất cho Monitor một ngưỡng tham khảo (không bắt buộc): nếu CR chạm > X% số TC của baseline, hoặc chạm vào > Y component mới chưa từng phân tích → gợi ý tách job mới. AI có thể tính sẵn con số này và đề xuất, Monitor quyết.

---

### Section 06 — Degraded Mode

**[R-18] 🟢 Liên kết với [R-04]**
Degraded mode cho "MCP disconnect → resume" tốt. Cần đồng bộ với đề xuất retry transient ở [R-04]. Ngoài ra, bổ sung một trạng thái còn thiếu: **MCP trả về dữ liệu nhưng nghi ngờ không đầy đủ/bị cắt** (ví dụ Figma trả về 50/200 node). Đây nguy hiểm hơn cả disconnect vì nó *âm thầm* — AI tưởng đủ. Đề xuất: AI phải tự kiểm tra completeness của dữ liệu MCP trả về (đếm node kỳ vọng vs thực nhận) và gắn `[WARNING: partial-data]` nếu nghi ngờ.

---

### Section 07 — Ghi đè có kiểm soát

**[R-19] 🟢 Cơ chế màu tốt — cân nhắc thêm trạng thái cho "Monitor đã xem nhưng hoãn quyết định"**
Hiện màu chỉ có 3 trạng thái thay đổi + "xóa màu = confirm". Thực tế review, Monitor hay gặp dòng "chưa chắc, để sau". Nếu chỉ có confirm/sửa, dòng này bị kẹt. Đề xuất thêm một trạng thái màu thứ 4 (ví dụ tím nhạt = "DEFERRED — Monitor đã xem, quyết sau") để phân biệt với "chưa xem". Điều này giúp Monitor không bị mất dấu các quyết định đang treo.

---

### Section 08 — Gate Checklist

**[R-20] 🟢 Gate 4b — "Sample TC phải chạy được" cần định nghĩa "chạy được"**
"TC executable" / "chạy được" đang định tính. Trước khi có execution thật, "chạy được" nghĩa là gì? Đề xuất định nghĩa checklist cụ thể cho "executable": (a) precondition rõ ràng và đạt được; (b) mỗi step có action xác định; (c) test data cụ thể, không phải placeholder; (d) expected result đo được (không phải "hiển thị đúng" mà "hiển thị X"). Đây cũng chính là tiêu chí làm cho TC sẵn sàng cho Manual-MCP.

---

### Section 09-15 — Command, Cấu trúc, Schema, Kaizen, Roadmap

**[R-21] 🟢 Section 11 Schema — `step4_tc` là nơi quyết định tất cả cho execution**
Cột `Các_bước` và `Kết_quả_mong_muốn` trong `step4_tc` hiện là free-text. Như đã nói ở [R-14]/[R-16], đây là điểm nghẽn cho cả Manual-MCP lẫn Automation. Toàn bộ Phần III của review này tập trung vào việc tái cấu trúc đúng sheet này. **Nếu chỉ sửa một chỗ trong cả file, tôi đề xuất sửa schema của `step4_tc`.**

**[R-22] 🟢 Kaizen — bổ sung một câu hỏi kaizen hướng execution**
Mục 12 Kaizen rất đầy đủ cho giai đoạn design. Khi tiến tới execution, đề xuất thêm một nhánh review: *"TC nào khó execute / mơ hồ khi follow? → feedback ngược về rule sinh TC"*. Đây là vòng học để TC ngày càng "executable" hơn.

**[R-23] 🔵 Roadmap — thứ tự v5→v8 nên đảo theo mục tiêu mới**
Roadmap hiện đặt Manual execution (P1) ở tận v7 và Automation (P7) ở v8. Nhưng mục tiêu mới của Monitor đẩy hai thứ này lên ưu tiên cao. Đề xuất Monitor cân nhắc chèn một giai đoạn trung gian **"v3.5 — Execution-Ready TC Format"**: chưa execute, nhưng làm cho TC *có cấu trúc sẵn sàng để execute*. Đây là việc rẻ (chỉ đổi format output), không phụ thuộc VDI/Jira, và mở khóa cả hai mục tiêu lớn. Chi tiết Phần III & IV.

---

## PHẦN III — CHIẾN LƯỢC TRỌNG TÂM: TC SẴN SÀNG CHO MANUAL-MCP & AUTOMATION

> Đây là phần quan trọng nhất của review, đáp ứng trực tiếp target mới của Monitor. Tất cả dưới đây là **đề xuất để Monitor cân nhắc**, không phải thay đổi đã áp dụng.

### 3.1 Vấn đề cốt lõi: "TC cho người đọc" ≠ "TC cho agent execute"

Một TC hiện tại trong v3 trông như:

| Steps | Expected |
|---|---|
| "Nhập email không hợp lệ rồi bấm Đăng nhập" | "Hiển thị thông báo lỗi" |

Con người đọc hiểu ngay. Nhưng khi giao cho AI execute qua MCP, AI phải tự trả lời hàng loạt câu mơ hồ: *Email không hợp lệ là gì? Nhập vào ô nào? Nút "Đăng nhập" ở đâu? "Thông báo lỗi" là text gì, ở chỗ nào?* — Mỗi câu AI tự đoán là một điểm sai tiềm tàng, và phá vỡ chính nguyên tắc "AI không tự suy luận" của file.

### 3.2 Đề xuất: Cấu trúc Step nguyên tử (Atomic Step Structure)

Đề xuất mỗi step trong TC được tách thành các trường có cấu trúc. Đây là format trung gian, vẫn human-readable nhưng machine-parseable:

| Trường | Ý nghĩa | Ví dụ |
|---|---|---|
| `step_no` | Thứ tự | 1 |
| `action` | Động từ chuẩn hóa (enum) | `INPUT`, `CLICK`, `NAVIGATE`, `SELECT`, `VERIFY`, `WAIT`, `HOVER`, `SCROLL` |
| `target` | Đối tượng (mô tả ngữ nghĩa, không phải selector cứng) | "Ô nhập Email trên form Đăng nhập" |
| `data` | Dữ liệu đầu vào (nếu có) | "abc@" (invalid format) |
| `expected_intermediate` | Kết quả mong đợi ngay sau step này (nếu cần verify giữa chừng) | — |

Và Expected cuối cùng tách riêng:

| Trường | Ví dụ |
|---|---|
| `assertion_type` | `TEXT_VISIBLE`, `ELEMENT_STATE`, `VALUE_EQUALS`, `URL_IS`, `COUNT_IS` |
| `assertion_target` | "Message lỗi dưới ô Email" |
| `assertion_expected` | "Email không đúng định dạng" |

### 3.3 Vì sao cấu trúc này phục vụ CẢ HAI mục tiêu

**Cho Manual Test qua MCP (ngắn hạn):**
Khi AI cầm một step `{action: CLICK, target: "nút Đăng nhập"}`, nó biết chính xác phải tìm phần tử có nghĩa "nút Đăng nhập" trên màn hình và click. `action` là enum hữu hạn → ánh xạ trực tiếp sang khả năng của MCP browser (click, type, navigate...). Không còn đoán.

**Cho Automation Framework (dài hạn):**
Cùng cấu trúc đó map 1-1 sang lệnh của Playwright/Selenium/Cypress:
- `INPUT` → `page.fill(selector, data)`
- `CLICK` → `page.click(selector)`
- `VERIFY / TEXT_VISIBLE` → `expect(locator).toBeVisible()`

Tức là **không phải làm lại TC khi chuyển từ manual sang auto**. Cùng một TC structured, chỉ thay "executor". Đây chính là chỗ tiết kiệm khổng lồ và là lý do tôi gọi đây là điểm bắc cầu chiến lược.

### 3.4 Khái niệm "Element Semantic Map" (cầu nối thiếu)

Vấn đề còn lại: `target` là mô tả ngữ nghĩa ("nút Đăng nhập"), nhưng execution cần định vị thật. Đề xuất một artifact mới (config theo dự án, không phải core): **Element Map** — bảng ánh xạ `mô tả ngữ nghĩa → cách định vị`.

| Semantic name | Định vị manual (mô tả cho người/MCP) | Selector (cho automation — điền sau) |
|---|---|---|
| "Ô nhập Email form Đăng nhập" | Ô đầu tiên có label "Email" trên trang /login | `#login-email` |
| "Nút Đăng nhập" | Nút primary màu xanh dưới form | `button[type=submit]` |

- Giai đoạn Manual-MCP: chỉ cần cột mô tả — AI dùng nó + screenshot/accessibility tree để định vị.
- Giai đoạn Automation: điền dần cột selector. TC không đổi, chỉ Element Map giàu lên.

Đây là cách tách "cái gì cần làm" (TC, ổn định) khỏi "định vị thế nào" (Element Map, thay đổi theo UI) — một best practice kinh điển trong test automation (Page Object Model thu nhỏ).

### 3.5 Lộ trình tiến hóa đề xuất (để Monitor cân nhắc thứ tự)

| Giai đoạn | Việc làm | Phụ thuộc | Chi phí |
|---|---|---|---|
| **Bước 1 — ngay được** | Đổi schema `step4_tc`: Steps thành atomic (action/target/data); Expected thành assertion có type | Không phụ thuộc gì ngoài | Thấp — chỉ đổi format output |
| **Bước 2** | B5 export thêm bản JSON/YAML structured song song Excel | Bước 1 | Thấp |
| **Bước 3** | Dựng Element Map (config/dự án), điền cột mô tả ngữ nghĩa | Bước 1 | Trung bình |
| **Bước 4 — Manual-MCP** | AI đọc TC structured + Element Map → execute manual qua MCP browser, ghi kết quả Pass/Fail | Bước 1-3 + MCP browser | Trung bình |
| **Bước 5 — Automation** | Điền selector vào Element Map → generate test script từ TC structured | Bước 1-4 | Cao |

Điểm mấu chốt: **Bước 1 và 2 gần như miễn phí và mở khóa toàn bộ phần sau.** Đó là lý do tôi đề xuất ưu tiên chúng (xem [R-23]).

---

## PHẦN IV — TỔNG HỢP ĐỀ XUẤT THEO ĐỘ ƯU TIÊN

> Bảng này để Monitor nhìn tổng thể và quyết định cái nào đưa vào v4. **Chưa có gì được áp dụng.**

| Mã | Ưu tiên | Đề xuất | Lý do chiến lược |
|---|---|---|---|
| R-12 | 🔴 | Tách 7-hạng-mục-extract thành profile theo domain (ui/api/data) | Đang vi phạm chính nguyên tắc generic; chặn việc áp dự án không-UI |
| R-14 | 🔴 | Cấu trúc lại Steps thành atomic (action/target/data) | Điều kiện tiên quyết cho Manual-MCP execute |
| R-21 | 🔴 | Tái cấu trúc schema `step4_tc` | Nếu chỉ sửa 1 thứ, sửa cái này |
| R-06 | 🔴 | Nâng ưu tiên Test Data Management | Không có data thì không execute được |
| R-02 | 🟡 | Làm rõ trách nhiệm khi bypass | Tránh lỗ hổng accountability |
| R-05 | 🟡 | Phân loại Q&A theo risk, không cứng theo tầng | Tránh bỏ sót Q&A workflow-critical |
| R-07 | 🟡 | Lightweight vẫn cần Impact-B quick-scan | Bịt escape số 1 |
| R-13 | 🟡 | Enforce Gherkin Given/When/Then ở B2 | Đầu tư sẵn cho automation |
| R-16 | 🟡 | B5 export thêm bản structured (JSON/YAML) | Cầu nối execution |
| R-11 | 🟡 | Internal Feedback Loop (escalate ngược) | Xử lý phát hiện thiếu sót ở bước sau |
| R-01 | 🟢 | Metric hóa Trust Level | Quyết định kiểm chứng được |
| R-03 | 🟢 | Changelog cho config-via-chat | Audit trail |
| R-04 | 🟢 | Phân biệt lỗi transient vs blocking (retry) | Tránh dừng quá nhạy |
| R-08 | 🟢 | Định nghĩa "đơn vị component" | Phân loại nhất quán |
| R-09 | 🟢 | Thêm cột Test Technique vào checkpoint | Giá trị thật cho B4-before + chuẩn bị data-gen |
| R-15 | 🟢 | Precondition có cấu trúc | Test reproducibility |
| R-17 | 🟢 | Ngưỡng định lượng CR vs Job mới | Hỗ trợ quyết định Monitor |
| R-18 | 🟢 | Phát hiện partial-data từ MCP | Chống "âm thầm thiếu dữ liệu" |
| R-19 | 🟢 | Thêm trạng thái màu DEFERRED | Không mất dấu quyết định treo |
| R-20 | 🟢 | Định nghĩa "executable" cụ thể | Tiêu chí Gate 4b đo được |
| R-22 | 🟢 | Câu hỏi kaizen hướng execution | Vòng học cho TC executable |
| R-10 | 🔵 | TC Skeleton = test scaffold cho automation | Tầm nhìn dài hạn |
| R-23 | 🔵 | Chèn giai đoạn v3.5 "Execution-Ready TC" | Mở khóa cả 2 mục tiêu với chi phí thấp |

---

## PHẦN V — KẾT LUẬN CỦA NGƯỜI REVIEW

v3 là một quy trình thiết kế test **xuất sắc ở tầng tư duy** — Impact-driven, gate-disciplined, generic-minded. Nếu mục tiêu chỉ dừng ở "sinh ra bộ TC tốt để con người chạy", nó gần như đã hoàn chỉnh, chỉ cần các tinh chỉnh 🟡/🟢.

Nhưng mục tiêu mới mà Monitor đặt ra — **AI tự follow TC để chạy Manual qua MCP, rồi tiến tới Automation** — là một sự dịch chuyển về chất. Nó đòi hỏi TC phải mang "DNA executable" ngay từ khi sinh ra. Điểm nghẽn duy nhất nhưng then chốt nằm ở **định dạng của Steps/Expected trong `step4_tc`** (R-14, R-21) và **tính generic thật sự của bước Extract** (R-12).

Tin tốt: cả hai đều **rẻ để xử lý** và **không phụ thuộc** vào VDI khách hay Jira — những thứ đang chặn các mục tiêu khác. Chỉ cần đổi cấu trúc output, ta mở khóa được cả con đường Manual-MCP lẫn Automation mà không phải viết lại pipeline. Đó là lý do tôi xếp R-23 (giai đoạn v3.5) là khuyến nghị chiến lược cao nhất.

> **Một câu đúc kết:** Hãy thiết kế TC như thể nó sẽ được một cái máy đọc và thực thi — kể cả khi hôm nay vẫn là con người chạy. Vì cái máy đó (AI qua MCP) sắp đến rồi, và một TC viết tốt cho máy thì luôn cũng là một TC rõ ràng cho người.

---

*Hết bản review. Mọi đề xuất chờ Monitor quyết định trước khi đưa vào v4.*
*Không một dòng nội dung nào trong `QC_AI_WORKFLOW_v3.md` bị thay đổi bởi bản review này.*
