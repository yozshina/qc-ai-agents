# QC AI-Agent Workflow — Generic Edition (v3)
> **Phiên bản tổng quát — Không phụ thuộc bất kỳ dự án nào**
> Dựa trên: v2 + toàn bộ comment của Monitor (review file QC_AI_WORKFLOW_v2_2.md)
> Ngày cập nhật: 2026-06-23
> Người review: Monitor (Senior Tester)

---

## 00 — README & TRIẾT LÝ THIẾT KẾ

### Mục tiêu của v3

| Mục tiêu | Giải thích | Ghi chú cập nhật v3 |
|---|---|---|
| **Tổng quát hóa** | Tách hoàn toàn khỏi bất kỳ dự án cụ thể. Lõi không biết tên màn hình, field, schema hay URL nào. | Giữ nguyên |
| **Đóng gói** | Cài 1 lần, cấu hình theo dự án → chạy được ngay. Như AGI cho QC: cùng một "bộ não", khác "ký ức dự án". | Giữ nguyên |
| **Lightweight-first** | Phân loại ticket TRƯỚC khi chạy pipeline. 70% ticket nhỏ → không cần Full pipeline. | Giữ nguyên |
| **Risk-based** | Thay coverage phẳng bằng Risk Score → dồn lực vào vùng nguy hiểm. **Risk LOW không đồng nghĩa với bỏ qua hoặc làm cho xong. LOW vẫn phải có TC smoke test đủ để tự tin không có lỗi cơ bản.** | ⚡ Cập nhật: làm rõ LOW ≠ skip |
| **Monitor-first** | Mọi quyết định, đề xuất đều phải được Monitor duyệt. Monitor là người kiểm soát tuyệt đối toàn bộ quy trình. **Tuy nhiên, Monitor có quyền chỉ định bypass một số bước cụ thể khi AI đã thực hiện tốt qua nhiều job — xem Trust Level bên dưới.** | ⚡ Cập nhật: thêm Trust Level / Bypass mechanism |
| **Resilient** | Thiếu input / MCP lỗi → Degraded Mode. **Dừng ngay tại điểm không thể tiếp tục — bao gồm cả micro-step nhỏ nhất trong B0→B5. Thông báo tới Monitor. Chờ Monitor xử lý xong mới next step.** | ⚡ Cập nhật: granular stop, kể cả micro-step |

---

### Cơ chế Trust Level — Bypass có điều kiện (MỚI v3)

> Monitor là người kiểm soát tuyệt đối. Nhưng sau nhiều job, Monitor có thể chỉ định bypass một số gate cụ thể để tăng tốc độ.

| Trust Level | Điều kiện kích hoạt | Gate được bypass | Điều kiện bắt buộc dù bypass |
|---|---|---|---|
| **Level 0** (default) | Job đầu tiên hoặc domain mới | Không bypass gate nào | Tất cả gate đều phải pass |
| **Level 1** | AI đã chạy ≥ 3 job cùng dự án, Monitor chủ động chỉ định | Gate 1 (extract) có thể skip nếu domain đã stable | AI vẫn phải xuất file extract đầy đủ; Monitor có thể kiểm tra bất kỳ lúc nào |
| **Level 2** | AI đã chạy ≥ 5 job, output liên tục đạt chất lượng | Gate 4a (checklist) có thể tự động confirm nếu AI đã follow pattern cũ | AI vẫn phải xuất file checklist; diff màu vẫn bắt buộc |

**Nguyên tắc bypass:**
- Monitor **chủ động chỉ định** bằng lệnh tường minh: `"bypass gate [X] cho job này"`
- AI vẫn phải **sinh đủ artifact** — bypass không có nghĩa là bỏ output
- Monitor có thể **kiểm tra bất kỳ lúc nào** và điều chỉnh nếu AI làm sai/kém
- Bất kỳ sai lệch nào phát hiện → **Trust Level reset về Level 0** cho job đó

---

### Kiến trúc 2 lớp: LÕI vs CẤU HÌNH

```
┌─────────────────────────────────────────────────────────────┐
│                        LÕI (CORE)                           │
│  Không thay đổi theo dự án. Mang đi bất kỳ dự án nào.      │
│                                                             │
│  - Logic pipeline B0→B5                                     │
│  - 7 command cố định (không embed version/tên dự án)        │
│  - Rule phân tích impact A/B/C/D/E                          │
│  - Tiêu chí phân loại ticket (Lightweight/Standard/Full)    │
│  - Rule ghi đè có kiểm soát (màu vàng/xanh lá/đỏ hồng)     │
│  - Trust Level & Bypass mechanism                           │
│  - Degraded mode handler (micro-step granular)              │
└───────────────────────────┬─────────────────────────────────┘
                            │ inject tại runtime
┌───────────────────────────▼─────────────────────────────────┐
│                     CẤU HÌNH (CONFIG)                       │
│  Thay theo từng dự án. Monitor điền 1 lần qua file hoặc    │
│  chỉ định thay đổi trực tiếp qua lệnh chat (không cần vào  │
│  file config thủ công).                                     │
│                                                             │
│  - project-config.json: domain, schema, glossary            │
│  - Template paths: TC template, Q&A template, Excel         │
│  - Risk criteria: vùng rủi ro cao của dự án                 │
│  - Input checklist: loại input bắt buộc/optional            │
│  - Trust Level hiện tại của dự án                           │
└─────────────────────────────────────────────────────────────┘
```

> **Config-via-chat:** Monitor có thể chỉ định thay đổi config trực tiếp qua lệnh chat, ví dụ: `"thêm 'thanh toán' vào high_risk_areas"`. AI cập nhật config runtime và ghi lại vào file nếu Monitor confirm.

---

### Vai trò

| Bên | Làm gì | Tuyệt đối không làm gì |
|---|---|---|
| **AI Agent** | Đọc tài liệu, trích xuất, phân tích impact, sinh Q&A/TCD/TC/Checklist theo rule; gắn cờ diff màu CHỜ DUYỆT | Tự chốt OBSOLETED/REGRESSION; tự ghi đè baseline; bỏ qua gate khi chưa confirm; tự suy luận khi thiếu input; tiếp tục chạy khi gặp lỗi/thiếu |
| **Monitor (Senior Tester)** | Gác gate; confirm/reject output; trả lời Q&A; duyệt diff màu (màu đã định nghĩa sẵn — Monitor chỉ cần confirm hoặc sửa); chỉ định template; ra quyết định Trust Level | Gõ tay TC; làm phần AI đã tự động hóa được |

---

## 01 — PHÂN TÍCH & ĐÁNH GIÁ WORKFLOW (từ v1 → v3)

### 1.1 Điểm mạnh — Giữ nguyên

| # | Điểm mạnh | Lý do giữ |
|---|---|---|
| ✅ | **Impact Analysis A/B/C** (Direct / Indirect Reverse Map / Workflow) | Giá trị nhất — giải phóng sức lao động tester, đánh thẳng vào escape số 1 |
| ✅ | **Gate discipline** | Chặn "AI sinh một mạch rồi tin luôn" |
| ✅ | **Reuse map / regression pool / obsoleted candidate** | Giải đúng bài toán dự án dài hạn |
| ✅ | **Tách TCD vs TC** | Ép tư duy đúng thứ tự: coverage trước, step sau |
| ✅ | **Q&A loop in-chat lưu vết** | Không qua Jira, Monitor confirm trực tiếp |
| ✅ | **Guardrail rõ ràng** | AI không tự gán OBSOLETED/REGRESSION |
| ✅ | **CR mode (delta re-analysis)** | CR = input mới → B2 delta, không làm lại từ đầu |
| ✅ | **Dừng tại bước lỗi, không re-run toàn bộ** | **v3 bổ sung:** AI buộc phải dừng cứng — kể cả micro-step — khi gặp vấn đề. Cảnh báo Monitor. Tuyệt đối không tự tính toán/phân tích thêm khi đã dừng (tốn token vô nghĩa). Pipeline chỉ tiếp tục sau khi Monitor xác nhận vấn đề đã được giải quyết. |

### 1.2 Điểm yếu — Đã fix trong v2/v3

| # | Điểm yếu | Fix |
|---|---|---|
| ⚠️ | **Quá nặng cho ticket nhỏ** | 3 luồng: Lightweight / Standard-lite / Full |
| ⚠️ | **Coverage phẳng, thiếu risk-based** | Risk Score 3 yếu tố; LOW vẫn có TC smoke (không bỏ) |
| ⚠️ | **Gắn chặt vào dự án cụ thể** | Tách core/ + config/{project-id}/ |
| ⚠️ | **Command coupling với version/UC** | 7 lệnh cố định, không embed version |
| ⚠️ | **Phụ thuộc input chất lượng cao** | Degraded mode: [ASSUMPTION]/[WARNING] |
| ⚠️ | **MCP là single point of failure** | Dừng đúng bước, báo cụ thể, resume |

### 1.3 Rủi ro hệ thống

| Rủi ro | Mức độ | Cách xử lý trong v3 |
|---|---|---|
| **Garbage in, garbage out** | 🔴 Cao | B0 bắt buộc validate quyền truy cập vào mọi input Monitor cung cấp. **Validate = kiểm tra AI có truy cập thành công không.** Truy cập được → AI tự do extract trong scope chỉ định. Không truy cập được (file mờ/lỗi/không mở được) → không thể extract → dừng, báo Monitor, không suy luận từ input chất lượng kém. |
| **Over-trust AI → mất coverage** | 🔴 Cao | Màu diff bắt buộc 100%; Monitor confirm từng dòng CHỜ DUYỆT trước khi ghi đè baseline |
| **Q&A không được trả lời → pipeline tắc** | 🟡 Trung bình | **Phân loại Q&A theo impact level** (xem chi tiết bên dưới). Q&A critical/major: phải trả lời, nếu không → dừng. Q&A minor: có thể pending, Monitor trả lời sau → tính như CR nhỏ. |
| **Token leak khi re-run** | 🟡 Trung bình | Resume từ bước lỗi; stop cứng khi gặp vấn đề, không tính toán thêm |

#### Phân loại Q&A theo impact level (MỚI v3)

| Loại Q&A | Định nghĩa | Ảnh hưởng nếu chưa trả lời | Hành động |
|---|---|---|---|
| **CRITICAL** | Ảnh hưởng đến toàn bộ tầng A (Direct) hoặc làm sai hướng phân tích từ gốc | Pipeline không thể tiếp tục đúng được | **Dừng. Bắt buộc trả lời.** Monitor muốn bỏ qua phải confirm tường minh + chịu trách nhiệm. |
| **MAJOR** | Ảnh hưởng tầng B (Indirect) hoặc C (Workflow) — có thể bỏ sót regression/workflow | Tầng B/C sẽ có lỗ hổng | **Dừng tầng B/C.** Có thể tạm thời tiếp tục A nếu Monitor đồng ý pending. Q&A pending = CR nhỏ khi trả lời sau. |
| **MINOR** | Làm rõ một detail nhỏ không ảnh hưởng đến hướng chính | TC có thể thiếu 1–2 edge case | Có thể pending. AI gắn cờ [PENDING-QA], tiếp tục với assumption rõ ràng. Monitor trả lời sau → tính như delta CR. |

### 1.4 PENDING — Chưa thực hiện (Roadmap tương lai)

> Những hạng mục dưới đây **đã xác định là cần thiết** nhưng **chưa đưa vào scope hiện tại** vì lý do kỹ thuật/môi trường. Sẽ phát triển sau khi điều kiện cho phép.

| # | Hạng mục | Lý do chưa làm | Mức ưu tiên |
|---|---|---|---|
| P1 | **Execution test** (mark Pass/Fail/Blocked) | Tester thực hiện qua VDI của khách — AI không thể can thiệp môi trường VDI | Medium |
| P2 | **Kết nối Jira** (đọc/ghi ticket) | Chưa có MCP Jira ổn định; Jira của khách có quyền hạn hạn chế | High |
| P3 | **Tự động tạo bug lên Jira** | Phụ thuộc P2 | Medium |
| P4 | **Tự động quản lý vòng đời bug** (Open → In Progress → Resolved → Retest) | Phụ thuộc P2; cần rule về bug lifecycle | Medium |
| P5 | **Tự động collect thông tin từ Jira** (đọc bug cũ, pattern lỗi, lịch sử retest) | Phụ thuộc P2; sẽ feed vào Risk Score | High |
| P6 | **Regression suite tự động chạy lại** | Phụ thuộc automation framework | Low |
| P7 | **Automation candidate pipeline** (E2E test script generation) | Cần framework cụ thể (Playwright/Cypress/Selenium) | Low |
| P8 | **Defect lifecycle tracking** (traceability TC → Bug → Retest → Close) | Phụ thuộc P2 + execution environment | Medium |
| P9 | **Test environment management** (setup/teardown, test data) | Môi trường do khách quản lý | Low |
| P10 | **Traceability ngược** (TC → execution result → bug → audit trail) | Phụ thuộc P1 + P2 | Medium |

---

## 02 — PHÂN LOẠI TICKET (Tiêu chí phân luồng)

> **Quy trình phân loại:**
> 1. B1 Extract luôn đọc đầy đủ scope được chỉ định (không đọc lướt hay bỏ bớt)
> 2. Sau khi có đủ dữ liệu → AI đánh giá theo tiêu chí bên dưới → đề xuất loại ticket
> 3. Monitor confirm loại ticket tại Gate 0 trước khi pipeline chạy

> **Lý do B1 phải đọc đầy đủ:** Không đọc đủ thì không thể biết scope thực sự là nhỏ hay lớn. Phân loại Lightweight dựa trên đọc đầy đủ rồi mới kết luận — không phải đọc ít rồi đoán.

### Bảng phân loại

| Tiêu chí | Lightweight | Standard-lite | Full |
|---|---|---|---|
| Số component bị impact trực tiếp | ≤ 2 | 3 – 5 | > 5 |
| Có thay đổi flow/business logic? | Không | Có | Có |
| Có ảnh hưởng component/màn hình dùng chung? | Không | Có thể | Chắc chắn |
| Ví dụ điển hình | Fix 1 bug, sửa 1 label, thay 1 màu | Feature mới nhỏ < 3 component | Common rule, feature lớn, CR phức tạp |

### Các bước theo từng luồng

| Bước | Lightweight | Standard-lite | Full |
|---|---|---|---|
| **B0** Input check | ✅ Bắt buộc | ✅ Bắt buộc | ✅ Bắt buộc |
| **B1** Extract | ✅ Đọc ĐẦY ĐỦ scope chỉ định — không đọc bớt | ✅ Đầy đủ | ✅ Đầy đủ |
| **B2** Analyze | Chỉ Impact A (Direct) | A + B + C đầy đủ | A + B + C + Obsoleted detection |
| **B3** TCD | 2 level (BDD + UI) | 4 level đầy đủ | 4 level đầy đủ |
| **B3** Risk Score | Estimate sơ bộ (H/M/L đơn giản) | ✅ Bắt buộc đầy đủ | ✅ Bắt buộc đầy đủ |
| **B4** TC | ✅ Sinh theo template | ✅ Đầy đủ | ✅ + reuse map 5 bảng |
| Regression pool | Bỏ | Bỏ | ✅ Đầy đủ |
| Obsoleted candidate | Bỏ | Bỏ | ✅ Đầy đủ |
| **B5** Export | ✅ Giữ | ✅ Giữ | ✅ Giữ |

> **Nguyên tắc xuyên suốt:** Rút gọn phạm vi phân tích, không rút gọn tư duy. Dù Lightweight vẫn phải qua Gate và Monitor confirm. Risk LOW không bao giờ có nghĩa là bỏ — vẫn phải có TC smoke đủ để tự tin không có lỗi cơ bản.

---

## 02B — PHÂN TÍCH: B3 TCD vs B4-before CHECKLIST (Có trùng nhau không?)

> **Đây là câu hỏi quan trọng Monitor yêu cầu AI phân tích đầy đủ và đưa ra đánh giá. AI không tự lược bỏ — Monitor ra quyết định cuối cùng.**

### Nhận định hiện trạng

**TCD (B3) là gì về mặt kỹ thuật?**
Theo ISTQB, Test Condition là: *"Một item hoặc event của component/system có thể được verify bởi một hoặc nhiều test case."* TCD trong pipeline này có structured format:
`TCD_ID | Level (BDD/UI/Indirect/Workflow) | Điều_kiện | Impact_Ref | Risk(H/M/L) | Coverage_Ref`

**Checklist (B4-before) là gì?**
Hiện tại format: `STT | Mục_tiêu_kiểm_tra | Kết_quả_mong_muốn`
Bản chất: danh sách human-readable, "flatten" từ TCD, không có thêm thông tin mới.

### Mức độ trùng lặp

| Tiêu chí | TCD (B3) | Checklist hiện tại (B4-before) | Trùng? |
|---|---|---|---|
| Nội dung "cần test gì" | ✅ Có, structured | ✅ Có, plain text | ✅ Trùng ~95% |
| Risk level | ✅ H/M/L rõ ràng | ❌ Không có | Khác |
| Liên kết Impact A/B/C | ✅ Có (Impact_Ref) | ❌ Không có | Khác |
| Thông tin "cách test" | ❌ Không có | ❌ Không có | Cả 2 đều thiếu |
| Human-readable | 🔶 Technical format | ✅ Dễ đọc hơn | Khác về form |
| Cần Monitor confirm riêng | Gate 3 | Gate 4a | 2 gate = 2 lần review cùng nội dung |

**Kết luận:** Đúng như Monitor nhận xét — **trùng ~95% về nội dung**. Sự khác biệt 5% chỉ là format, không phải thông tin.

### 3 Phương án giải quyết

---

**Phương án 1 — Merge Checklist vào TCD (Bỏ B4-before)**

TCD đã có đủ thông tin → bỏ Checklist → Gate 3 cover luôn cả phần "confirm hướng test".

| | |
|---|---|
| ✅ Ưu | Tiết kiệm 1 bước + 1 gate; giảm overhead; không review trùng |
| ✅ Ưu | Pipeline ngắn hơn, token tiết kiệm hơn |
| ⚠️ Nhược | TCD có format technical (TCD_ID, Impact_Ref, Risk) → Monitor phải đọc format phức tạp hơn tại Gate 3 |
| ⚠️ Nhược | Mất checkpoint "dừng trước khi sinh TC" — nếu TCD có vấn đề ẩn thì phát hiện muộn hơn |
| 📌 Phù hợp | Monitor có kinh nghiệm với format TCD; dự án mature |

---

**Phương án 2 — Giữ Checklist nhưng differentiate rõ ràng**

Checklist phải có thông tin KHÁC với TCD thì mới có lý do tồn tại.
Tái định nghĩa: Checklist = **bridge từ TCD → TC** = TCD + "test approach sơ bộ".

Format mới:
`STT | TCD_Ref | Mục_tiêu | Approach (cách test ngắn gọn) | Data_cần | Expected`

Ví dụ khác biệt:
- TCD: *"Kiểm tra validation field email"*
- Checklist mới: *"TC-001 | ref:TCD-003 | Validate email | Nhập lần lượt: valid, invalid, empty, boundary | test@email.com / abc@ / (rỗng) | Hiện error message đúng từng loại"*

| | |
|---|---|
| ✅ Ưu | Tạo ra giá trị riêng thật sự; Checklist trở thành TC skeleton |
| ✅ Ưu | Monitor review TC ở mức "draft" trước khi AI fill detail → phát hiện sai hướng sớm |
| ⚠️ Nhược | AI phải làm thêm 1 bước thực chất; nặng hơn PA1 |
| ⚠️ Nhược | Vẫn còn 2 gate nhưng nay có lý do rõ ràng |
| 📌 Phù hợp | Dự án mới; domain phức tạp; Monitor muốn kiểm soát chặt từng TC |

---

**Phương án 3 — Tái định nghĩa thành "TC Skeleton" (bridge rõ nhất)**

B4-before không sinh Checklist nữa mà sinh **TC Skeleton** = bộ TC draft chỉ có header, không có step/precondition/test-data chi tiết.

Format:
`TC_ID | TCD_Ref | Tên_TC | Action_summary | Expected_summary | Risk_inherited`

Gate 4a: Monitor confirm bộ TC skeleton → đồng ý tên/hướng từng TC → AI fill step chi tiết.
Ưu điểm: Checkpoint cực kỳ có giá trị — Monitor biết sẽ có bao nhiêu TC, tên gì, hướng nào, trước khi AI đi vào detail.

| | |
|---|---|
| ✅ Ưu | Giá trị gate 4a rõ ràng nhất trong 3 PA; không phải review cùng nội dung TCD |
| ✅ Ưu | Monitor có thể add/remove TC skeleton trước khi AI sinh detail → tiết kiệm rework |
| ✅ Ưu | Traceability tốt: TCD_ID → TC_ID rõ ràng |
| ⚠️ Nhược | AI phải sinh thêm 1 artifact intermediate |
| ⚠️ Nhược | Phức tạp hơn PA1 |
| 📌 Phù hợp | Mọi loại dự án; đặc biệt tốt với Full pipeline |

---

### Recommendation của AI (để Monitor quyết định)

> **AI đề xuất: Phương án 2 + 3 hybrid, áp dụng theo luồng:**

| Luồng | Áp dụng |
|---|---|
| **Lightweight** | **PA1** — Bỏ B4-before. TCD đơn giản + Gate 3 cover luôn. |
| **Standard-lite** | **PA2** — Giữ Checklist nhưng tái định nghĩa = TC summary có approach. |
| **Full** | **PA3** — B4-before sinh TC Skeleton: TC_ID \| TCD_Ref \| Tên \| Action_summary \| Expected_summary |

**Lý do:** Không cần một giải pháp đồng nhất cho mọi luồng. Ticket nhỏ → không cần thêm bước. Ticket lớn → B4-before TC Skeleton là checkpoint cực kỳ có giá trị vì Monitor kiểm soát số lượng và hướng TC trước khi AI đi vào detail.

**→ Monitor quyết định chọn phương án nào. AI không tự lược bỏ bước này.**

---

## 03 — PIPELINE TỔNG THỂ

```
┌─────────────────────────────────────────────────────────────┐
│  B0  Chuẩn bị & Validate Input                              │
│      → AI kiểm tra truy cập từng input (OK/LỖI/THIẾU)      │
│      → B1 Extract đầy đủ scope chỉ định                     │
│      → Phân loại ticket: Lightweight / Standard-lite / Full  │
│      → Gate 0: Monitor confirm loại ticket + input OK        │
│      ⚠ DỪNG tại bất kỳ micro-step nào không thể tiếp tục   │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│  B1  Extract Input (nếu có design/tài liệu kỹ thuật)        │
│      → Extract theo checklist 7 hạng mục (xem Gate 1)       │
│      → Gắn [MISSING: {hạng mục}] nếu không tìm thấy        │
│      → Gate 1: Monitor confirm extract đủ 7 hạng mục        │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│  B2  Analyze Scenario & Impact                              │
│      → Phân rã requirement → Impact A / B / C / D/E         │
│      → Sinh Q&A phân loại: CRITICAL / MAJOR / MINOR         │
│      ↓ Vòng Q&A (in-chat, lưu vết trong step2_qa)           │
│        AI hỏi → Monitor trả lời → AI re-analyze → loop      │
│        CRITICAL: phải trả lời mới tiếp                       │
│        MAJOR: dừng tầng B/C, pending nếu Monitor đồng ý     │
│        MINOR: có thể pending → CR nhỏ sau này               │
│      → Gate 2: 100% CRITICAL CLOSED + Monitor confirm        │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│  B3  Generate TCD + Risk Score                              │
│      → 4 scenario level (BDD / UI / Indirect / Workflow)     │
│      → Risk Score: HIGH / MEDIUM / LOW (tất cả đều có TC)   │
│      → Coverage matrix                                       │
│      → Gate 3: Coverage OK + Risk Score confirm              │
└────────────────────────────┬────────────────────────────────┘
                             │
         ┌───────────────────┴──────────────────┐
         │  B4-before (chọn theo luồng):        │
         │  Lightweight → Không có B4-before    │
         │  Standard-lite → Checklist + approach │
         │  Full → TC Skeleton                  │
         │  → Gate 4a: Monitor confirm           │
         └───────────────────┬──────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│  B4-after  Generate Test Case                               │
│      → Hỏi path template → re-check format → sinh TC        │
│      → Rule: 1 TC = 1 assertion                              │
│      → Sinh reuse map + tô màu diff                          │
│      → Gate 4b: Monitor duyệt diff màu + sample TC          │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│  B5  Handoff & Export Excel                                 │
│      → Gộp artifact đã Gate → Export theo template          │
│      → DONE → Kaizen bắt buộc trước khi đóng job           │
└─────────────────────────────────────────────────────────────┘
```

---

## 04 — DIỄN GIẢI TỪNG BƯỚC (Chi tiết)

### B0 — Chuẩn bị & Validate Input

| Hạng mục | Nội dung |
|---|---|
| **Mục tiêu** | Đảm bảo AI có thể truy cập thành công mọi input. Phân loại ticket. Không phân tích khi input chưa pass validate. |
| **Validate input = gì?** | Kiểm tra quyền truy cập: AI có mở/đọc được file không? Link có active không? Nếu truy cập được → AI tự do extract trong scope chỉ định. Nếu không (file lỗi, ảnh mờ, link chết, không có quyền) → DỪNG, báo Monitor. |
| **Input tối thiểu** | File mô tả yêu cầu (từ BA/PM/PO/KH); Link design nếu có; CR nếu có. Tất cả do Monitor cung cấp. |
| **AI thực hiện** | 1. Gọi `list_allowed_directories` → xác định vùng làm việc. 2. Truy cập từng input: OK hoặc LỖI. 3. Gắn `[ASSUMPTION: {lý do}]` nếu input không đủ chất lượng. 4. Đánh giá sơ bộ sau B1 → đề xuất loại ticket. 5. Tạo `B0_input_check`. |
| **Output** | `B0_input_check`: danh sách input + trạng thái (OK / LỖI-TRUY-CẬP / THIẾU / GIẢ-ĐỊNH) + loại ticket đề xuất |
| **Gate 0** | Monitor xác nhận: input truy cập OK + loại ticket đồng ý → B1. Chưa → cung cấp lại input. |
| **DỪNG khi nào** | Bất kỳ input bắt buộc nào không truy cập được. Báo cụ thể: file nào / lỗi gì / cần gì. |
| **AI không được** | Tự phân tích khi chưa qua Gate 0; suy luận từ input chất lượng kém; tự chọn loại ticket |

### B1 — Extract Input

| Hạng mục | Nội dung |
|---|---|
| **Mục tiêu** | Biến design/tài liệu thành test basis có cấu trúc — dữ liệu thô để B2 phân tích. |
| **Phạm vi đọc** | **Đọc ĐẦY ĐỦ vùng Monitor chỉ định.** Không đọc lướt, không đọc bớt. Lý do: cần đủ dữ liệu mới phân loại được ticket chính xác. |
| **Checklist extract 7 hạng mục bắt buộc** | Xem bảng bên dưới |
| **Output** | `B1_extract`: markdown theo 7 hạng mục + cờ `[MISSING: {hạng mục}]` nếu không tìm thấy |
| **Gate 1** | Monitor đối chiếu file extract với source gốc → Confirm đủ 7 hạng mục → B2. |
| **AI không được** | Phân tích/interpret tại B1. Chỉ extract. Không suy luận. Không đọc vùng ngoài scope. |

#### 7 Hạng mục Extract bắt buộc (Gate 1 checklist)

| # | Hạng mục | Nội dung cần extract | Ví dụ |
|---|---|---|---|
| 1 | **Typography** | Font family, size (px/rem), weight, line-height, letter-spacing theo từng loại text (heading, body, label, caption, placeholder, error) | Roboto 14px/400, Roboto 16px/500 |
| 2 | **Color** | Color tokens theo semantic role: primary, secondary, error, warning, success, disabled, border, background, text, placeholder | #1677FF (primary), #FF4D4F (error) |
| 3 | **Layout** | Grid system, column count, gutter, padding ngoài, padding trong từng container/section | 12 col, 16px gutter, 24px outer padding |
| 4 | **States** | Tất cả trạng thái UI: default, hover, focus, active, loading, empty, error, success, disabled, read-only | Button: default/hover/disabled; Input: default/focus/error |
| 5 | **Behavior** | Interaction rules: validation trigger (onBlur/onChange/onSubmit), animation, debounce, error message timing, auto-fill behavior | Validate email onBlur; hiện error ngay khi blur |
| 6 | **Spacing & Radius** | Margin, padding, border-radius theo từng component; spacing scale nếu có | Input radius 5px; Button radius 8px; gap 12px |
| 7 | **Responsive rules** | Breakpoint, behavior thay đổi theo màn hình (nếu có); hay ghi rõ "Desktop only / Mobile only" | Desktop only; hoặc collapse menu < 768px |

### B2 — Analyze Scenario & Impact (lõi của toàn pipeline)

| Hạng mục | Nội dung |
|---|---|
| **Mục tiêu** | Phân rã requirement → xác định toàn bộ tác động trực tiếp/gián tiếp/workflow → sinh Q&A có context để làm rõ điểm chưa chắc. |
| **Input** | B1_extract (đã Gate 1) + file mô tả yêu cầu (đã Gate 0) |
| **AI thực hiện** | Phân rã scenario (BDD format) → Impact A/B/C → Obsoleted detection → Phân loại và sinh Q&A CRITICAL/MAJOR/MINOR |
| **Vòng Q&A** | AI hỏi có context rõ → Monitor trả lời → AI re-analyze → Nếu phát sinh impact mới → hỏi tiếp → Loop đến khi Monitor confirm OK |
| **Output** | `step1_breakdown` (scenario + impact), `step1_context` (snapshot hệ thống đã đọc), `step2_qa` (Q&A với loại CRITICAL/MAJOR/MINOR) |
| **Gate 2** | 100% Q&A CRITICAL CLOSED + Monitor confirm ổn → B3. MAJOR pending cần Monitor đồng ý tường minh. |
| **AI không được** | Tự confirm REGRESSION/OBSOLETED; đóng Q&A bằng cảm tính; suy luận khi có [ASSUMPTION] CRITICAL mà chưa được confirm |

#### Khung Impact Analysis (Generic — inject config theo dự án)

| Tầng | Tên | Câu hỏi cốt lõi | Mô tả chung | Output |
|---|---|---|---|---|
| **A** | Direct | Thay đổi này trực tiếp chạm vào cái gì? | Màn hình / component / field / rule / API / entity bị sửa trực tiếp | Danh sách direct impact có nguồn |
| **B** | Indirect (Reverse Map) | Cái gì KHÁC đang dùng chung sẽ bị kéo theo? | Component/màn/API/flow hạ nguồn dùng chung với thứ vừa đổi | Candidate regression |
| **C** | Workflow | Chuỗi trước/sau có gãy không? | Luồng nghiệp vụ, trigger, dependency, SLA sau thay đổi | Workflow impact (có/không đều nêu rõ) |
| **D/E** | Obsoleted | TC/rule cũ còn đúng không? | TC cũ test logic đã bị thay → candidate obsoleted | Candidate list + Q&A |

> **Config inject:** Định nghĩa cụ thể cho tầng B và C theo từng dự án. Ví dụ: web app → component tree; data project → data lineage; mobile → navigation flow. Monitor điền vào `project-config.json` hoặc chỉ định qua chat.

### B3 — Generate TCD + Risk Score

| Hạng mục | Nội dung |
|---|---|
| **Mục tiêu** | Chuyển impact đã chốt thành điều kiện test có coverage rõ ràng và ưu tiên dựa trên rủi ro thực tế. |
| **4 Scenario Level** | `[BDD]` Hành vi nghiệp vụ user-facing; `[UI-COVERAGE]` Tất cả state UI; `[IMPACT-INDIRECT]` Vùng bị kéo theo gián tiếp; `[IMPACT-WORKFLOW]` Chuỗi nghiệp vụ trước/sau |
| **Output** | `step3_tcd`: TCD 4 level + coverage matrix + Risk Score (H/M/L) + phân bổ effort |
| **Gate 3** | Coverage không có level quan trọng bị trống + Risk Score confirm → B4. Chưa → loop. |

#### Risk Score Formula

| Yếu tố | Trọng số | Cách đánh giá |
|---|---|---|
| Business impact | 40% | Ảnh hưởng trực tiếp đến nghiệp vụ chính không? |
| Tần suất dùng | 35% | Component/flow này xuất hiện nhiều màn/feature không? |
| Lịch sử bug | 25% | Vùng này đã từng có bug/escape không? (từ project-config hoặc Jira khi có) |

| Mức Risk | Điểm | Phân bổ effort | Loại TC | Ưu tiên chạy |
|---|---|---|---|---|
| **HIGH** | ≥ 70 | 60% effort | TC granular, cover edge case | Priority 1 |
| **MEDIUM** | 40 – 69 | 30% effort | TC đầy đủ, cover happy + negative | Priority 2 |
| **LOW** | < 40 | 10% effort | **TC smoke — vẫn bắt buộc có, không bỏ qua.** Cover basic happy path tối thiểu | Priority 3 |

> **Nhấn mạnh:** LOW không có nghĩa là skip. LOW = confidence tối thiểu rằng chức năng không bị vỡ cơ bản. Bỏ LOW = rủi ro bỏ sót lỗi dễ.

### B4-before — Checkpoint trước khi sinh TC

> **Áp dụng theo luồng đã được Monitor confirm tại Gate 0.**
> **Xem phân tích đầy đủ tại Section 02B để Monitor quyết định phương án.**

| Luồng | Áp dụng | Format | Gate 4a |
|---|---|---|---|
| **Lightweight** | Bỏ B4-before (PA1) | — | Gate 3 cover luôn |
| **Standard-lite** | Checklist + approach (PA2) | STT \| TCD_Ref \| Mục_tiêu \| Approach_ngắn \| Expected | Monitor confirm hướng test |
| **Full** | TC Skeleton (PA3) | TC_ID \| TCD_Ref \| Tên_TC \| Action_summary \| Expected_summary | Monitor confirm số lượng + tên TC trước khi AI fill detail |

### B4-after — Generate Test Case

| Hạng mục | Nội dung |
|---|---|
| **Mục tiêu** | Sinh TC chi tiết, chạy được, có kiểm soát reuse và ghi đè. |
| **Input** | B4-before output đã Gate 4a (hoặc step3_tcd nếu Lightweight) + Template path do Monitor chỉ định |
| **AI thực hiện** | 1. Hỏi path template. 2. Mở template, re-check format cột. 3. Sinh TC theo đúng format. 4. Sinh reuse map. 5. Tô màu diff. 6. Gắn cờ CHỜ DUYỆT cho mọi dòng thay đổi. |
| **Rule sinh TC bắt buộc** | **1 TC = 1 assertion** (1 property HOẶC 1 state). Không merge nhiều assert vào 1 TC. Expected result KHÔNG lẫn vào Steps. Tên TC phải tự mô tả được nội dung. |
| **Output** | `step4_tc` + `reuse_map` + `regression_pool` (Full only) + `obsoleted_candidates` (Full only) |
| **Màu diff** | 🟡 **VÀNG** `#FFF2CC` = SỬA nội dung cũ; 🟢 **XANH LÁ** `#E2EFDA` = THÊM MỚI; 🔴 **ĐỎ HỒNG** `#FFE6E6` = ĐỀ XUẤT OBSOLETED. Tất cả = **CHỜ DUYỆT.** |
| **Gate 4b** | Monitor duyệt từng dòng màu. Sửa trực tiếp, xóa màu = confirm. Sample TC phải chạy được. Sau confirm → AI ghi vào baseline. |
| **AI không được** | Auto-overwrite baseline; sửa TC baseline trực tiếp; bỏ qua màu CHỜ DUYỆT; tự chọn template |

### B5 — Handoff & Export Excel

| Hạng mục | Nội dung |
|---|---|
| **Mục tiêu** | Gộp toàn bộ artifact đã duyệt thành 1 deliverable Excel để Monitor review lần cuối. |
| **AI thực hiện** | 1. Xác nhận tất cả Gate đã pass. 2. Gộp artifact theo schema 9 sheet. 3. Export theo template Excel do Monitor chỉ định. |
| **Output** | File Excel: 9 sheet, header khóa cứng (xem Section 11) |
| **AI không được** | Tự chọn template; chèn cột; merge ô tùy tiện; đổi header; export khi còn Gate chưa pass |

---

## 05 — CHẾ ĐỘ CR (Change Request)

> CR là tính năng chính thức của pipeline, không phải ngoại lệ.

**Định nghĩa:** CR = input cũ được thay đổi/cập nhật thành input mới trong cùng job, không phải job mới.

**Phân biệt CR vs Job mới:**

| | CR (cùng job) | Job mới |
|---|---|---|
| Quy mô | Thay đổi nhỏ-vừa trong phạm vi job cũ | Quá lớn, đổi hướng hoàn toàn |
| Người quyết định | **Monitor** | **Monitor** |
| Nếu Monitor thấy CR quá lớn | → Tạo job mới | — |

**Quy trình CR:**

```
Kết thúc B5 → AI tổng hợp toàn bộ job thành file summary
  (file summary: tóm tắt scope, impact A/B/C, TC đã sinh, baseline hiện tại)

Nhận CR mới
  → AI đọc lại file summary (không đọc lại toàn bộ artifact)
  → AI đọc CR mới
  → Xác định: CR này chạm vào vùng nào trong summary?
  → Chạy lại B2 ở chế độ DELTA:
      - Chỉ phân tích vùng CR chạm tới
      - Dò Impact B/C từ vùng thay đổi
      - Sinh Q&A cho điểm mới phát sinh
  → Loop Q&A → Monitor confirm
  → Nếu phát sinh impact mới → define tiếp, lặp
  → Monitor confirm OK → tiếp tục từ B3 (delta)
  → Tô màu diff so với baseline
```

**Nguyên tắc:**
- **Không re-run toàn bộ pipeline.** Dựa trên job cũ, đọc file summary, xử lý CR delta.
- Không ghi đè artifact cũ ngay → tô màu diff trước, Monitor duyệt.
- Gate vẫn bắt buộc với các bước chạy lại.
- Nếu CR quá lớn → Monitor quyết định tạo job mới → pipeline full từ B0.

---

## 06 — DEGRADED MODE (Khi Input / MCP Thiếu)

> Dừng ngay tại điểm không thể tiếp tục — kể cả micro-step. Thông báo Monitor. Chờ xử lý xong mới tiếp.

| Tình huống | Hành động AI | Được tiếp tục không? |
|---|---|---|
| **Input không truy cập được** (file lỗi, link chết, ảnh mờ không đọc được) | Dừng B0. Báo cụ thể: file nào, lỗi gì, cần gì từ Monitor. Không suy luận từ input chất lượng kém. **Một ảnh mờ không thể extract → không có basis → không nên phân tích.** | Dừng, chờ Monitor cung cấp lại |
| **MCP design tool lỗi** (Figma/Zeplin/v.v.) | Dừng B1. Báo lỗi cụ thể, gắn `[MISSING: Design data — {lý do}]`. Hỏi Monitor: tiếp tục B2 với data hiện có hay chờ? Nếu Monitor đồng ý tiếp → B2 với [ASSUMPTION] rõ ràng. | Chỉ tiếp nếu Monitor cho phép + rõ assumption |
| **Tài liệu outdated/nghi ngờ** | Gắn `[WARNING: doc outdated — {tên file} — {lý do nghi ngờ}]`. Đẩy thành Q&A MAJOR. Không tự bỏ qua. | B2 tiếp với cờ WARNING |
| **File không đọc được** (encoding/path/permission) | Dừng tại bước đó. Báo cụ thể lỗi. Yêu cầu Monitor cung cấp lại file. | Dừng, chờ |
| **MCP disconnect giữa chừng** | Dừng ngay. Ghi rõ: bước đang ở đâu, đã làm gì, cần gì để tiếp. Không tự tính toán thêm. | Resume từ điểm dừng sau khi MCP OK |
| **[ASSUMPTION] CRITICAL chưa được confirm** | Dừng. Không tiếp tục tầng B/C. | Chỉ tiếp sau khi Monitor confirm assumption |

**Quy tắc [ASSUMPTION]:**
- Mọi `[ASSUMPTION]` → tự động thêm 1 dòng Q&A trong `step2_qa`
- `[ASSUMPTION]` ảnh hưởng tầng B hoặc C → DỪNG tầng đó, chờ Monitor confirm
- `[ASSUMPTION]` chỉ ảnh hưởng A minor → có thể gắn cờ và tiếp tục với thông báo rõ ràng

---

## 07 — GHI ĐÈ CÓ KIỂM SOÁT

**Nguyên tắc bất di bất dịch:**
- Baseline = phiên bản artifact đã được Monitor confirm gần nhất
- AI **không bao giờ** tự ghi đè baseline dù chỉ 1 ký tự
- Mọi thay đổi đề xuất → tô màu → CHỜ DUYỆT → Monitor confirm từng dòng → AI mới ghi đè

**Quy trình ghi đè:**
```
AI sinh output mới
  → So sánh với baseline hiện tại
  → Tô màu diff:
      🟡 VÀNG   #FFF2CC  = SỬA nội dung cũ (dòng cũ bị thay)
      🟢 XANH LÁ #E2EFDA  = THÊM MỚI (dòng hoàn toàn mới)
      🔴 ĐỎ HỒNG #FFE6E6  = ĐỀ XUẤT OBSOLETED (AI cho là nên xóa/lỗi thời)
  → Xuất file diff CHỜ DUYỆT (Monitor thấy ngay màu)
  → Monitor review:
      - Đồng ý → xóa màu = confirm dòng đó
      - Không đồng ý → sửa trực tiếp → xóa màu
      - Bỏ qua = giữ nguyên dòng đó, không thay đổi
  → Sau khi Monitor confirm xong → AI ghi tất cả dòng đã xóa màu vào baseline
  → Baseline mới = baseline cũ + các dòng đã confirm
```

---

## 08 — GATE CHECKLIST TỔNG HỢP

| Gate | Điều kiện PASS | Chi tiết kiểm tra | Hành động nếu FAIL |
|---|---|---|---|
| **Gate 0** — Input & Phân loại | Mọi input bắt buộc truy cập OK + Loại ticket confirm | AI báo trạng thái từng input (OK/LỖI/THIẾU) | Yêu cầu Monitor cung cấp lại input |
| **Gate 1** — Extract | Đủ 7 hạng mục + Monitor confirm từng hạng mục | **7 hạng mục: (1) Typography (2) Color (3) Layout (4) States (5) Behavior (6) Spacing & Radius (7) Responsive rules.** Mỗi hạng mục phải có nội dung hoặc `[MISSING]` rõ lý do. | AI extract lại đúng vùng chỉ định |
| **Gate 2** — Analysis + Q&A | Không `[MISSING-COVERAGE]` critical + 100% Q&A CRITICAL CLOSED | Lọc Q&A theo loại; MAJOR pending phải có Monitor đồng ý tường minh | Loop Q&A; không tự đóng bằng cảm tính |
| **Gate 3** — TCD + Risk | Coverage không trắng level quan trọng + Risk Score confirm | Kiểm tra 4 level; LOW vẫn phải có TC smoke | Bổ sung TCD thiếu; điều chỉnh Risk Score |
| **Gate 4a** — B4-before | Output B4-before (Checklist / TC Skeleton) đủ, Monitor confirm hướng | Kiểm tra theo PA được chọn (Lightweight bỏ qua gate này) | Sửa Checklist/Skeleton đến khi confirm |
| **Gate 4b** — TC + Diff | TC executable + diff đã duyệt từng dòng + baseline cập nhật | Sample TC phải chạy được thực sự; mọi màu phải được xử lý | Sửa TC theo feedback; không ghi đè trước khi duyệt |

---

## 09 — 7 COMMAND CỐ ĐỊNH (Generic)

| Command | Bước | Chức năng | Input | Output |
|---|---|---|---|---|
| `qc_input` | B0 | Validate quyền truy cập input, gắn [ASSUMPTION], phân loại ticket đề xuất | File yêu cầu + link design (optional) + CR (nếu có) | B0_input_check + loại ticket đề xuất |
| `qc_extract` | B1 | Extract design/tài liệu đầy đủ scope theo 7 hạng mục | Link design/file + vùng chỉ định | B1_extract (7 hạng mục + cờ [MISSING]) |
| `qc_analyze` | B2 | Impact analysis A/B/C/D/E + sinh Q&A CRITICAL/MAJOR/MINOR + Q&A loop | B1_extract (đã Gate 1) + file yêu cầu | step1_breakdown, step1_context, step2_qa |
| `qc_tcd` | B3 | Sinh TCD 4 level + Risk Score + coverage matrix | step1/2 đã chốt | step3_tcd + risk_matrix |
| `qc_checkpoint` | B4-before | Sinh Checklist+approach (Standard-lite) hoặc TC Skeleton (Full) | step3_tcd | step4_checkpoint (Checklist / TC Skeleton) |
| `qc_testcase` | B4-after | Sinh TC theo template + tô màu diff + reuse map | step4_checkpoint (confirmed) + template path | step4_tc + reuse_map + regression_pool + obsoleted_candidates |
| `qc_export` | B5 | Export Excel deliverable theo template Monitor chỉ định | Toàn bộ artifact đã Gate | Excel deliverable (9 sheet) |

> **Lưu ý bất di bất dịch:** Không đổi tên command. Không embed tên dự án/version/UC vào tên. Tham số truyền qua runtime.

---

## 10 — CẤU TRÚC THƯ MỤC (Đã tái cấu trúc)

> **Thay đổi v3:** jobs đặt dưới project-id; naming convention có version + project + job; file kaizen và knowledge-pipeline có version nhận biết được.

```
qc-ai-agents/
│
├── core/                                    ← KHÔNG thay đổi theo dự án
│   ├── pipeline/
│   │   └── qc-workflow_v3.md               ← File này
│   ├── commands/
│   │   ├── qc_input.md
│   │   ├── qc_extract.md
│   │   ├── qc_analyze.md
│   │   ├── qc_tcd.md
│   │   ├── qc_checkpoint.md
│   │   ├── qc_testcase.md
│   │   └── qc_export.md
│   └── rules/
│       ├── impact-analysis.md
│       ├── tcd-rules.md
│       └── risk-scoring.md
│
├── projects/
│   └── {project-id}/                       ← VD: lakehouse | econtract | crm
│       │
│       ├── project-config.json             ← Cấu hình dự án
│       │
│       ├── templates/                      ← Template do Monitor chỉ định
│       │   ├── tc-template.xlsx
│       │   ├── qa-template.xlsx
│       │   └── export-template.xlsx
│       │
│       ├── jobs/                           ← Toàn bộ job của dự án này
│       │   └── {job-id}/                  ← VD: sp14-common-rule-ui
│       │       ├── 00_meta_v1_{project-id}_{job-id}.md   ← AI đọc TRƯỚC mọi thứ
│       │       ├── input/
│       │       │   ├── req_{job-id}.{ext}  ← File yêu cầu gốc — KHÔNG sửa
│       │       │   └── cr/                ← CR vào đây
│       │       │       └── cr_{version}_{job-id}.md
│       │       ├── b0_input-check/
│       │       │   └── b0_v1_{project-id}_{job-id}.md
│       │       ├── b1_extract/
│       │       │   └── b1_v1_{project-id}_{job-id}.md
│       │       ├── b2_analysis/
│       │       │   ├── step1-breakdown_v1_{project-id}_{job-id}.md
│       │       │   ├── step1-context_v1_{project-id}_{job-id}.md
│       │       │   └── step2-qa_v1_{project-id}_{job-id}.xlsx
│       │       ├── b3_tcd/
│       │       │   └── step3-tcd_v1_{project-id}_{job-id}.md
│       │       ├── b4_checkpoint/
│       │       │   └── step4-checkpoint_v1_{project-id}_{job-id}.md
│       │       ├── b4_testcase/
│       │       │   ├── step4-tc_v1_{project-id}_{job-id}.md
│       │       │   └── step4-reuse-map_v1_{project-id}_{job-id}.md
│       │       ├── baseline/              ← Không xóa, không ghi đè; giữ lịch sử
│       │       │   └── baseline_v1_{project-id}_{job-id}.xlsx
│       │       └── output/
│       │           └── tc-export_v1_{project-id}_{job-id}.xlsx
│       │
│       └── knowledge/                     ← Knowledge base của dự án
│           ├── pipeline-summary_v1_{project-id}_{job-id}.md
│           ├── pipeline-summary_v2_{project-id}_{job-id}.md  ← Sau CR
│           └── kaizen_v1_{project-id}_{job-id}.md
│
└── data/
    └── processed/
        └── kaizen/                        ← Archive kaizen cross-project
            └── kaizen_v{N}_{project-id}_{job-id}.md
```

### Naming Convention

| Loại file | Pattern | Ví dụ |
|---|---|---|
| Meta | `00_meta_v{N}_{project-id}_{job-id}.md` | `00_meta_v1_lkh_sp14-common-rule-ui.md` |
| Artifact bước | `{step}_v{N}_{project-id}_{job-id}.{ext}` | `step3-tcd_v1_lkh_sp14-common-rule-ui.md` |
| Output TC | `tc-export_v{N}_{project-id}_{job-id}.xlsx` | `tc-export_v1_lkh_sp14-common-rule-ui.xlsx` |
| Kaizen | `kaizen_v{N}_{project-id}_{job-id}.md` | `kaizen_v1_lkh_sp14-common-rule-ui.md` |
| Pipeline summary | `pipeline-summary_v{N}_{project-id}_{job-id}.md` | `pipeline-summary_v2_lkh_sp14-common-rule-ui.md` |
| CR | `cr_v{N}_{job-id}.md` | `cr_v1_sp14-common-rule-ui.md` |

**Quy tắc version:** `v1` = lần đầu sinh. `v2`, `v3`... = sau mỗi lần CR hoặc loop gate. Không xóa version cũ.

---

### project-config.json (Template generic)

```json
{
  "project_id": "{PROJECT_ID}",
  "project_name": "{Tên dự án}",
  "trust_level": 0,

  "domain": {
    "type": "{web_app | mobile_app | data_pipeline | api | hybrid}",
    "description": "{Mô tả ngắn domain nghiệp vụ}",
    "glossary": {
      "{term_1}": "{định nghĩa}",
      "{term_2}": "{định nghĩa}"
    },
    "impact_map": {
      "tầng_B_indirect": "{Định nghĩa vùng indirect của dự án này — ví dụ: component dùng chung / bảng hạ nguồn / API downstream}",
      "tầng_C_workflow": "{Định nghĩa chuỗi workflow cần kiểm tra — ví dụ: trigger, schedule, SLA}",
      "example": "{Ví dụ cụ thể cho dự án này}"
    }
  },

  "input": {
    "required": ["{Loại input bắt buộc — ví dụ: file đặc tả yêu cầu}"],
    "optional": ["{Loại input optional — ví dụ: link design, file mapping}"],
    "design_tool": "{figma | zeplin | sketch | pdf | none}"
  },

  "risk_criteria": {
    "high_risk_areas": ["{Vùng rủi ro cao — ví dụ: xác thực, thanh toán, permission}"],
    "historical_bugs": ["{Vùng đã từng có bug/escape}"],
    "weight_overrides": {
      "business_impact": 0.40,
      "usage_frequency": 0.35,
      "bug_history": 0.25
    }
  },

  "templates": {
    "tc_template": "{Đường dẫn tới TC template}",
    "qa_template": "{Đường dẫn tới Q&A template}",
    "export_template": "{Đường dẫn tới Excel export template}"
  },

  "pipeline_rules": {
    "default_flow": "{Lightweight | Standard-lite | Full}",
    "b4_before_mode": "{skip | checklist | skeleton}",
    "max_qa_per_round": 10,
    "gate_bypass": {
      "gate_1_extract": false,
      "gate_4a_checkpoint": false
    }
  }
}
```

---

## 11 — SCHEMA FILE EXCEL DELIVERABLE (Header khóa cứng)

| Sheet | Mục đích | Cột bắt buộc (khóa cứng) | Monitor sửa tay |
|---|---|---|---|
| `B0_input_check` | Kiểm tra quyền truy cập input | ID \| Loại_input \| Trạng_thái(OK/LỖI/THIẾU/GIẢ-ĐỊNH) \| Ghi_chú | Không |
| `B1_extract` | Test basis từ design/tài liệu | ID \| Hạng_mục \| Nguồn \| Nội_dung \| Cờ(OK/MISSING) | Không |
| `step1_breakdown` | Phân rã requirement + impact | ID \| Requirement \| Scenario_BDD \| Impact_Type(A/B/C/D) \| Source \| Tag_scope | Không |
| `step1_context` | Snapshot hệ thống đã đọc | Mục \| Nguồn_đã_đọc \| Liên_quan_scope | Không |
| `step2_qa` | Q&A làm rõ requirement | QA_ID \| Loại(CRITICAL/MAJOR/MINOR) \| Câu_hỏi \| Context \| AI_đề_xuất \| **Trả_lời** \| **Nguồn** \| **Trạng_thái** \| Ảnh_hưởng_tầng | **Cột in đậm** = Monitor nhập tay |
| `step3_tcd` | Test condition + Risk Score | TCD_ID \| Level(BDD/UI/Indirect/Workflow) \| Điều_kiện \| Impact_Ref \| Risk(H/M/L) \| Coverage_Ref | Không |
| `step4_checkpoint` | Checklist / TC Skeleton (theo PA đã chọn) | STT \| TCD_Ref \| Mục_tiêu \| Approach/Action_summary \| Expected | Không |
| `step4_tc` | Test case chi tiết | TC_ID \| TCD_Ref \| Mã \| Mục_đích \| Precondition \| Các_bước \| Kết_quả_mong_muốn \| Risk(H/M/L) \| Source_Type | **Kết_quả** (nếu Monitor chỉnh) |
| `reuse_map` | Map reuse/ghi đè | TC_ID \| Loại(NEW/REGRESSION/OBSOLETED/CONFIRMATION/SKIPPED) \| Source_Ref \| Màu_diff \| **Trạng_thái_duyệt** | **Trạng_thái_duyệt** |

> **Quy tắc cứng:** Không chèn cột; không merge ô tùy tiện; không đổi header. Vi phạm → phá round-trip markdown↔excel.

---

## 12 — QUY TRÌNH KAIZEN (Sau mỗi job — bắt buộc)

> Không có kaizen = job chưa đóng. Kaizen output bắt buộc: ≥ 1 thay đổi cụ thể vào config hoặc core rules.

### Checklist kaizen

**1. Review pipeline thực tế**
- Bước nào tốn thời gian bất thường? Nguyên nhân gốc rễ?
- Gate nào phải loop nhiều hơn dự kiến? Lý do?
- AI sinh output sai hoặc thiếu ở bước nào?
- Phân loại luồng (L/S/F) ban đầu có đúng không?
- Trust Level có cần điều chỉnh không?

**2. Review Q&A**
- Pattern câu hỏi nào lặp lại? → Bổ sung glossary hoặc high_risk_areas trong config
- Q&A nào AI không cần hỏi nếu có đủ context? → Cập nhật input checklist
- Q&A CRITICAL nào phát sinh từ thiếu thông tin domain? → Cập nhật impact_map

**3. Review Impact**
- Vùng nào bị bỏ sót impact B/C? → Bổ sung impact_map trong config
- Rule nào trong core/rules cần điều chỉnh?

**4. Review Risk Score**
- Phân bổ effort theo H/M/L có phản ánh thực tế không?
- Trọng số 3 yếu tố có cần điều chỉnh cho dự án này?
- Có bug/escape nào xảy ra vùng Risk LOW? → Cập nhật historical_bugs

**5. Review B4-before (PA đã dùng)**
- PA (1/2/3) có tạo ra giá trị không? Có cần switch PA không?
- TC Skeleton/Checklist có giúp Monitor review tốt hơn không?

**6. Cập nhật file**
- Ghi kết quả vào `00_meta_v{N}_{project-id}_{job-id}.md`
- Tạo `kaizen_v{N}_{project-id}_{job-id}.md`
- Tạo `pipeline-summary_v{N+1}_{project-id}_{next-job-id}.md`
- Cập nhật `project-config.json` theo thay đổi phát hiện được

---

## 13 — HƯỚNG DẪN ÁP DỤNG DỰ ÁN MỚI

### Setup (1 lần)

```
1. Copy thư mục core/ vào môi trường làm việc (không sửa gì trong core/)
2. Tạo projects/{project-id}/project-config.json
   → Điền: domain type, glossary, impact_map, risk areas, template paths
   → trust_level: 0 (mặc định cho dự án mới)
3. Chuẩn bị template TC, Q&A, Export do Monitor chỉ định
4. Tạo projects/{project-id}/jobs/{job-id}/00_meta_v1_{project-id}_{job-id}.md
```

### Chạy job đầu tiên

```
1. Cung cấp input (file yêu cầu + link design nếu có)
2. qc_input      → Gate 0: confirm loại ticket + input OK
3. qc_extract    → Gate 1: confirm 7 hạng mục extract
4. qc_analyze    → Gate 2: trả lời Q&A CRITICAL đến khi CLOSED
5. qc_tcd        → Gate 3: confirm Risk Score + coverage
6. qc_checkpoint → Gate 4a: confirm Checklist/Skeleton (tùy PA + luồng)
7. qc_testcase   → Gate 4b: duyệt diff màu từng dòng
8. qc_export     → Nhận Excel deliverable
9. Kaizen        → Cập nhật config + knowledge-pipeline summary
```

### Từ job thứ 2 trở đi

- AI đọc `00_meta` + `pipeline-summary` của job trước trước khi bắt đầu
- Config có thể đã được cập nhật từ kaizen → domain hiểu sâu hơn, Q&A ít hơn
- Baseline của job trước được reuse trong reuse_map
- Trust Level có thể tăng dần nếu Monitor xác nhận

---

## 14 — NHỮNG GÌ AI PHẢI NHỚ (Checklist bất di bất dịch)

```
□ Đọc 00_meta trước khi làm bất cứ gì trong job
□ Gọi list_allowed_directories tại B0
□ Validate = kiểm tra quyền truy cập. Truy cập được → extract. Không được → dừng, báo
□ B1: đọc ĐẦY ĐỦ scope chỉ định — không đọc lướt, không đọc bớt
□ Phân loại ticket SAU KHI có đủ dữ liệu từ B1, không phân loại trước
□ Gắn [ASSUMPTION] mọi chỗ thiếu — không tự suy luận
□ Q&A: phân loại CRITICAL/MAJOR/MINOR. Hỏi cụ thể, có context, có AI đề xuất
□ Q&A: cập nhật file hiện có, không tạo file mới mỗi vòng loop
□ Q&A CRITICAL: dừng đến khi trả lời xong hoặc Monitor confirm bỏ qua
□ Không bao giờ tự ghi đè baseline
□ Không tự chốt OBSOLETED/REGRESSION
□ Không nhảy bước khi chưa có Gate confirm
□ Màu diff: VÀNG=sửa / XANH LÁ=mới / ĐỎ HỒNG=obsoleted — tất cả CHỜ DUYỆT
□ TC: 1 TC = 1 assertion; expected result không lẫn vào steps
□ Template: hỏi path, mở file, re-check format, rồi mới sinh TC
□ DỪNG cứng khi gặp vấn đề — kể cả micro-step. Không tính toán thêm. Không re-run.
□ CR: đọc file summary + CR mới → B2 delta. Không làm lại từ đầu.
□ Mọi file sinh ra: đủ data để dùng được, không rút gọn vì tiết kiệm token
□ Kaizen sau mỗi job: tối thiểu 1 thay đổi vào config hoặc core rules
```

---

## 15 — ROADMAP PHÁT TRIỂN

| Version | Mục tiêu | Trạng thái |
|---|---|---|
| **v1** | Pipeline gốc Lakehouse-specific | ✅ Done |
| **v2** | Tổng quát hóa, 3 luồng, Risk Score, Degraded mode | ✅ Done |
| **v3 (hiện tại)** | Trust Level/Bypass; phân loại Q&A CRITICAL/MAJOR/MINOR; B4-before 3 PA; cấu trúc thư mục chuẩn; màu ĐỎ HỒNG; naming convention; CR quy trình đầy đủ | ✅ Định nghĩa xong |
| **v4** | Áp 3 PA B4-before thực tế, đo giá trị từng PA → chọn default | 🔲 Sau job tiếp |
| **v4** | Trust Level auto-đánh giá dựa trên lịch sử job (thay vì manual) | 🔲 Kế hoạch |
| **v4** | Common rule baseline inject vào config (không extract lại mỗi job) | 🔲 Kế hoạch |
| **v5** | Traceability TCD_ID → TC_ID → result (khi có execution) | 🔲 Tương lai |
| **v5** | Sinh TC IDs từ TCD (1 TCD → N TC, tracking đầy đủ) | 🔲 Tương lai |
| **v6** | Kết nối Jira: đọc bug cũ → feed Risk Score + historical_bugs | 🔲 Tương lai (P2/P5) |
| **v6** | Tự động tạo bug, quản lý vòng đời bug lên Jira | 🔲 Tương lai (P3/P4) |
| **v7** | Execution + defect + retest lifecycle | 🔲 Tương lai (P1) |
| **v8** | Automation candidate pipeline | 🔲 Tương lai (P7) |

---

*QC_AI_WORKFLOW_v3 — Generic Edition*
*Không chứa thông tin cụ thể của bất kỳ dự án nào.*
*Config dự án: `projects/{project-id}/project-config.json`*
*Lõi pipeline: `core/pipeline/qc-workflow_v3.md`*
