# QC AI-Agent Workflow — Generic Edition (v2)
> **Phiên bản tổng quát — Không phụ thuộc bất kỳ dự án nào**
> Dựa trên: QC_AI_Workflow_Lakehouse_v1 + kaizen summary v1/v2 + review của Monitor (senior tester)
> Ngày cập nhật: 2026-06-20

---

## 00 — README & TRIẾT LÝ THIẾT KẾ

### Mục tiêu của v2

| Mục tiêu | Giải thích |
|---|---|
| **Tổng quát hóa (Generalization)** | Tách hoàn toàn khỏi Lakehouse. Không hardcode tên màn hình, field, bảng, URL, schema của bất kỳ dự án cụ thể nào vào lõi workflow. |
| **Đóng gói (Portability)** | Cài 1 lần, cấu hình theo dự án → chạy được ngay. Như AGI cho QC: cùng một "bộ não", khác "ký ức dự án". |
| **Lightweight-first** | Phân loại ticket trước khi chạy pipeline. 70% ticket nhỏ → không cần Full pipeline. |
| **Risk-based** | Thay coverage phẳng bằng Risk Score → dồn lực vào vùng nguy hiểm. |
| **Monitor-first** | Mọi quyết định về OBSOLETED/REGRESSION/ghi đè đều qua Monitor. AI chỉ đề xuất, không chốt. |
| **Resilient** | Thiếu input/MCP lỗi → Degraded Mode, không đứng pipeline, không re-run toàn bộ. |

### Kiến trúc 2 lớp: LÕI vs CẤU HÌNH

```
┌─────────────────────────────────────────────────────────┐
│                      LÕI (CORE)                         │
│  Không thay đổi theo dự án. Mang đi bất kỳ dự án nào. │
│  - Logic pipeline B0→B5                                  │
│  - 7 command cố định                                     │
│  - Rule phân tích impact A/B/C                           │
│  - Tiêu chí phân loại ticket (Lightweight/Standard/Full) │
│  - Rule ghi đè có kiểm soát (màu vàng/xanh/xám)        │
│  - Degraded mode handler                                 │
└───────────────────────┬─────────────────────────────────┘
                        │ inject tại runtime
┌───────────────────────▼─────────────────────────────────┐
│                   CẤU HÌNH (CONFIG)                     │
│  Thay theo từng dự án. Người Monitor điền 1 lần.       │
│  - project-config.json: domain, schema, glossary         │
│  - Template paths: TC template, Q&A template, Excel      │
│  - Risk criteria: vùng rủi ro cao của dự án             │
│  - Input checklist: loại input bắt buộc/optional         │
└─────────────────────────────────────────────────────────┘
```

### Vai trò

| Bên | Làm gì | Không làm gì |
|---|---|---|
| **AI Agent** | Đọc tài liệu, trích xuất, phân tích impact, sinh Q&A/TCD/TC/Checklist theo rule | Tự chốt OBSOLETED/REGRESSION, tự ghi đè baseline, bỏ qua gate, tự suy luận khi thiếu input |
| **Monitor (Senior Tester)** | Gác gate, confirm/reject output AI, trả lời Q&A, duyệt diff màu, chỉ định template | Gõ tay TC, làm phần AI có thể tự động hóa |

---

## 01 — PHÂN TÍCH & ĐÁNH GIÁ WORKFLOW HIỆN TẠI (v1)

### 1.1 Điểm mạnh — Giữ nguyên

| # | Điểm mạnh | Lý do giữ |
|---|---|---|
| ✅ | **Impact Analysis A/B/C** (Direct / Indirect Reverse Map / Workflow) | Đây là phần giá trị nhất — giải phóng sức lao động tester, đánh thẳng vào nguyên nhân escape số 1 |
| ✅ | **Gate discipline** (dừng review sau mỗi bước) | Chặn "AI sinh một mạch rồi tin luôn" — đúng tinh thần QC |
| ✅ | **Reuse map / regression pool / obsoleted candidate** | Giải đúng bài toán dự án dài hạn: TC duplicate và TC lỗi thời |
| ✅ | **Tách TCD vs TC** | Ép tư duy đúng thứ tự: coverage trước, step sau |
| ✅ | **Q&A loop in-chat lưu vết** | Không qua Jira, trực tiếp monitor confirm |
| ✅ | **Guardrail rõ ràng** | AI không tự gán OBSOLETED/REGRESSION; baseline chỉ ghi đè sau duyệt |
| ✅ | **CR mode (delta re-analysis)** | CR = input mới → chạy B2 delta, không làm lại từ đầu |
| ✅ | **Dừng tại bước, không re-run toàn bộ** | Tiết kiệm token, giữ trạng thái |

### 1.2 Điểm yếu — Cần cải thiện trong v2

| # | Điểm yếu | Biểu hiện | Fix trong v2 |
|---|---|---|---|
| ⚠️ | **Quá nặng cho ticket nhỏ** | 6+ file, 24 rule, 4 gate — áp lên bug fix nhỏ là overkill | Thêm 3 luồng: Lightweight / Standard-lite / Full |
| ⚠️ | **Coverage phẳng, thiếu risk-based** | "Coverage matrix không trắng" là định tính. Mọi TC bị đối xử ngang nhau | Risk Score 3 yếu tố trong B3, phân bổ effort theo HIGH/MEDIUM/LOW |
| ⚠️ | **Gắn chặt vào Lakehouse** | Figma URL, schema, glossary hardcode vào workflow | Tách sang `config/{project-id}/` — lõi không biết tên dự án |
| ⚠️ | **Command coupling với version/UC** | `uc_260511` trong tên lệnh → khó scale, khó maintain | 7 lệnh cố định, không embed version/UC vào tên |
| ⚠️ | **Phụ thuộc input chất lượng cao** | Tài liệu cũ/thiếu → AI phân tích sai từ gốc | Degraded mode: gắn [ASSUMPTION]/[WARNING], đẩy thành Q&A |
| ⚠️ | **MCP là single point of failure** | MCP lỗi → pipeline đứng | Degraded mode: báo lỗi cụ thể, dừng đúng bước, không re-run |
| ⚠️ | **Thiếu phần execution/defect** (tạm bỏ qua) | Kết thúc ở handoff; không có vòng đời bug | *Scope hiện tại: tester tự thực hiện qua VDI. Sẽ mở rộng sau.* |

### 1.3 Rủi ro hệ thống

| Rủi ro | Mức độ | Cách xử lý trong v2 |
|---|---|---|
| Garbage in, garbage out | 🔴 Cao | B0 bắt buộc validate input; [ASSUMPTION] bắt buộc thành Q&A |
| Over-trust AI → mất coverage | 🔴 Cao | Màu diff bắt buộc; Monitor xác nhận trước khi ghi đè baseline |
| Q&A không được trả lời → pipeline đứng | 🟡 Trung bình | Cho phép "pending" nhưng không bỏ sót; tiếp tục bước khác nếu Q&A không critical |
| Token leak khi re-run | 🟡 Trung bình | Resume từ bước lỗi; không re-run toàn bộ |

---

## 02 — PHÂN LOẠI TICKET (Tiêu chí phân luồng)

> **AI tự đánh giá tiêu chí này sau B0. Monitor confirm trước khi chạy pipeline.**

### Bảng phân loại

| Tiêu chí | Lightweight | Standard-lite | Full |
|---|---|---|---|
| Số component bị impact trực tiếp | ≤ 2 | 3 – 5 | > 5 |
| Có thay đổi flow/business logic? | Không | Có | Có |
| Có ảnh hưởng màn hình/component dùng chung? | Không | Có thể | Chắc chắn |
| Ví dụ điển hình | Fix 1 bug nhỏ, sửa 1 label | Feature mới nhỏ < 3 component | Common rule, feature lớn, CR phức tạp |

### Các bước bị bỏ/rút gọn theo luồng

| Bước | Lightweight | Standard-lite | Full |
|---|---|---|---|
| B0 Input check | ✅ Bắt buộc | ✅ Bắt buộc | ✅ Bắt buộc |
| B1 Extract | Bỏ hoặc chỉ đọc vùng nhỏ | ✅ Đầy đủ | ✅ Đầy đủ |
| B2 Analyze | Chỉ Impact A (Direct) | A + B + C đầy đủ | A + B + C + Obsoleted |
| B3 TCD | Rút gọn (2 level) | 4 level đầy đủ | 4 level + risk score |
| B3 Risk Score | Estimate sơ bộ | ✅ Bắt buộc | ✅ Bắt buộc |
| B4 Checklist | ✅ Giữ | ✅ Giữ | ✅ Giữ |
| B4 TC | ✅ Sinh theo template | ✅ Đầy đủ | ✅ + reuse map 5 bảng |
| Regression pool | Bỏ | Bỏ | ✅ Đầy đủ |
| Obsoleted candidate | Bỏ | Bỏ | ✅ Đầy đủ |
| B5 Export | ✅ Giữ | ✅ Giữ | ✅ Giữ |

> **Nguyên tắc:** Rút gọn bước, không rút gọn tư duy. Dù Lightweight vẫn phải có Gate và Monitor confirm.

---

## 03 — PIPELINE TỔNG THỂ

```
┌──────────────────────────────────────────────────────────────┐
│  B0  Chuẩn bị & Validate Input                               │
│      → AI check input, gắn [ASSUMPTION] nếu thiếu           │
│      → Phân loại: Lightweight / Standard-lite / Full         │
│      → Gate 0: Monitor confirm loại ticket + input OK        │
└─────────────────────────┬────────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────┐
│  B1  Extract Input (optional — nếu có design file/Figma)     │
│      → Trích xuất thành test basis theo checklist 7 hạng mục │
│      → Gate 1: Monitor confirm extract đạt                   │
└─────────────────────────┬────────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────┐
│  B2  Analyze Scenario & Impact                               │
│      → Phân rã requirement → Impact A / B / C                │
│      → Phát hiện Obsoleted candidate                         │
│      → Sinh Q&A cho điểm chưa chắc                          │
│      ↓ Vòng Q&A (in-chat, lưu vết trong step2_qa)           │
│        AI hỏi → Monitor trả lời → AI re-analyze → loop      │
│      → Gate 2: 100% Q&A critical CONFIRMED / Monitor OK      │
└─────────────────────────┬────────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────┐
│  B3  Generate TCD + Risk Score                               │
│      → 4 scenario level (BDD / UI / Indirect / Workflow)     │
│      → Risk Score: HIGH / MEDIUM / LOW                       │
│      → Coverage matrix                                       │
│      → Gate 3: Coverage OK + Risk Score confirm              │
└─────────────────────────┬────────────────────────────────────┘
                          │
        ┌─────────────────┴───────────────┐
        ▼                                 ▼
┌───────────────────┐           ┌─────────────────────────────┐
│  B4-before        │           │  (Nếu Monitor từ chối)     │
│  Sinh Checklist   │           │  → Loop lại B3              │
│  → Gate 4a        │           └─────────────────────────────┘
└────────┬──────────┘
         │
┌────────▼──────────┐
│  B4-after         │
│  Sinh Test Case   │
│  theo template    │
│  + diff màu       │
│  → Gate 4b        │
└────────┬──────────┘
         │
┌────────▼──────────┐
│  B5  Handoff      │
│  Export Excel     │
│  deliverable      │
│  → DONE           │
└───────────────────┘
```

---

## 04 — DIỄN GIẢI TỪNG BƯỚC (Chi tiết)

### B0 — Chuẩn bị & Validate Input

| Hạng mục | Nội dung |
|---|---|
| **Mục tiêu** | Đảm bảo AI có đủ basis để phân tích. Phân loại ticket. Không bắt đầu phân tích khi input chưa xác nhận. |
| **Input tối thiểu** | File mô tả yêu cầu (từ BA/PM/PO/KH); Link design (Figma/Zeplin/Sketch — optional); CR nếu có |
| **AI thực hiện** | 1. Gọi `list_allowed_directories` để biết vùng làm việc. 2. Check từng input: truy cập được không? Đủ không? 3. Gắn `[ASSUMPTION: {lý do}]` cho phần thiếu. 4. Đánh giá sơ bộ → đề xuất loại ticket (L/S/F). 5. Tạo file B0_input_check. |
| **Output** | `B0_input_check`: danh sách input, trạng thái (OK/THIẾU/GIẢ ĐỊNH), loại ticket đề xuất |
| **Gate 0** | Monitor xác nhận: input OK + loại ticket đồng ý → B1. Chưa → yêu cầu bổ sung input. |
| **AI không được** | Tự ý bắt đầu phân tích khi chưa qua Gate 0; bỏ qua [ASSUMPTION]; tự chọn loại ticket mà không có Monitor confirm |

### B1 — Extract Input (optional)

| Hạng mục | Nội dung |
|---|---|
| **Mục tiêu** | Biến design/tài liệu thành test basis dạng markdown có cấu trúc. Chỉ thực hiện khi có file design. |
| **Checklist extract bắt buộc (7 hạng mục)** | Typography / Color / Layout / States (loading, empty, error, success) / Behavior (interaction rules) / Spacing & Radius / Responsive rules |
| **AI thực hiện** | Đọc đúng vùng được Monitor chỉ định (không đọc toàn bộ file) → Extract theo 7 hạng mục → Tạo `B1_extract` |
| **Output** | `B1_extract`: markdown 7 hạng mục + cờ thiếu `[MISSING: {hạng mục}]` |
| **Gate 1** | Monitor mở file extract, đối chiếu với design thật → Confirm đạt → B2. Chưa đạt → AI extract lại. |
| **AI không được** | Phân tích hoặc suy luận tại B1. Chỉ extract, không interpret. Không đọc vùng ngoài chỉ định. |

### B2 — Analyze Scenario & Impact (lõi của pipeline)

| Hạng mục | Nội dung |
|---|---|
| **Mục tiêu** | Phân rã requirement; xác định toàn bộ tác động trực tiếp/gián tiếp/workflow; sinh Q&A có context. |
| **Input** | B1_extract (đã Gate 1) + file mô tả yêu cầu (đã Gate 0) |
| **AI thực hiện** | Phân rã scenario (BDD format) → Impact A/B/C → Obsoleted detection → Sinh Q&A cho điểm chưa chắc |
| **Output** | `step1_breakdown` (scenario + impact), `step1_context` (hệ thống đã đọc), `step2_qa` (Q&A OPEN) |
| **Vòng Q&A** | AI hỏi → Monitor trả lời trong file `step2_qa` → AI re-analyze → Nếu phát sinh impact mới → AI hỏi tiếp → Loop đến khi Monitor confirm OK |
| **Gate 2** | 100% Q&A critical CLOSED/CONFIRMED. Q&A không critical → có thể pending, ghi rõ. Monitor confirm → B3. |
| **AI không được** | Tự confirm REGRESSION/OBSOLETED; đóng Q&A bằng cảm tính; bỏ sót Q&A dù nhỏ; tự suy luận khi có [ASSUMPTION] critical |

#### Khung Impact Analysis (Generic — không phụ thuộc dự án)

| Tầng | Tên | Câu hỏi cốt lõi | Mô tả chung | Output |
|---|---|---|---|---|
| **A** | Direct | Thay đổi này trực tiếp chạm vào cái gì? | Màn hình / component / field / rule / API / bảng dữ liệu bị sửa trực tiếp | Danh sách direct impact có nguồn |
| **B** | Indirect (Reverse Map) | Cái gì KHÁC đang dùng chung sẽ bị ảnh hưởng? | Component/màn hình/API/bảng hạ nguồn dùng chung với thứ vừa đổi | Candidate regression |
| **C** | Workflow | Chuỗi trước/sau có gãy không? | Luồng nghiệp vụ, trigger, schedule, dependency, SLA sau khi có thay đổi | Workflow impact (có/không đều nêu rõ) |
| **D/E** | Obsoleted | TC/rule cũ còn đúng không? | TC cũ test logic đã bị thay → candidate obsoleted | Candidate list + Q&A |

> **Config inject:** Tầng B và C phụ thuộc vào domain map của dự án (ví dụ: với data project → lineage; với web app → component tree; với mobile → navigation flow). Monitor điền vào `project-config.json`.

### B3 — Generate TCD + Risk Score

| Hạng mục | Nội dung |
|---|---|
| **Mục tiêu** | Chuyển impact đã chốt thành điều kiện test có coverage và ưu tiên rõ ràng. |
| **4 Scenario Level** | [BDD] Hành vi nghiệp vụ; [UI-COVERAGE] Các state UI; [IMPACT-INDIRECT] Vùng bị ảnh hưởng gián tiếp; [IMPACT-WORKFLOW] Chuỗi nghiệp vụ trước/sau |
| **Risk Score** | Xem bảng bên dưới |
| **Output** | `step3_tcd`: TCD 4 level + coverage matrix + Risk Score + phân bổ effort |
| **Gate 3** | Coverage OK (không tầng quan trọng bị trống) + Risk Score confirm → B4-before. Chưa → loop. |

#### Risk Score Formula (Generic)

| Yếu tố | Trọng số | Cách đánh giá |
|---|---|---|
| Business impact | 40% | Ảnh hưởng trực tiếp đến nghiệp vụ chính của dự án không? |
| Tần suất dùng | 35% | Component/flow này xuất hiện nhiều màn/feature không? |
| Lịch sử bug | 25% | Vùng này đã từng có bug hoặc escape không? (từ project-config) |

| Mức Risk | Điểm | Phân bổ effort | Ưu tiên chạy |
|---|---|---|---|
| **HIGH** | ≥ 70 | 60% effort → TC granular | Priority 1 |
| **MEDIUM** | 40 – 69 | 30% effort → TC đầy đủ | Priority 2 |
| **LOW** | < 40 | 10% effort → TC smoke | Priority 3 |

> Monitor có thể điều chỉnh trọng số trong `project-config.json` theo đặc thù dự án.

### B4-before — Generate Checklist

| Hạng mục | Nội dung |
|---|---|
| **Mục tiêu** | Sinh danh sách mục tiêu kiểm tra ở mức cao, buộc Monitor review hướng test trước khi viết step. |
| **Format** | STT \| Mục tiêu kiểm tra \| Kết quả mong muốn |
| **Gate 4a** | Monitor confirm checklist đạt → mới cho phép sinh TC. AI không tự nhảy sang B4-after. |

### B4-after — Generate Test Case

| Hạng mục | Nội dung |
|---|---|
| **Mục tiêu** | Sinh TC chi tiết, chạy được, có kiểm soát reuse và ghi đè. |
| **Input** | step4_checklist (đã Gate 4a) + Template do Monitor chỉ định path |
| **AI thực hiện** | 1. Hỏi path template. 2. Re-check format template. 3. Sinh TC theo template. 4. Sinh reuse map. 5. Tô màu diff. 6. Gắn cờ CHỜ DUYỆT. |
| **Rule sinh TC** | **1 TC = 1 assertion** (1 property hoặc 1 state); Không merge nhiều assert vào 1 TC; Expected result không lẫn vào Steps |
| **Output** | `step4_tc` + `reuse_map` + `regression_pool` + `obsoleted_candidates` |
| **Diff màu** | 🟡 VÀNG = nội dung SỬA; 🟢 XANH = THÊM MỚI; ⬜ XÁM = đề xuất OBSOLETED. Tất cả = CHỜ DUYỆT. |
| **Gate 4b** | Monitor duyệt diff màu + TC sample executable → confirm → AI ghi vào baseline. |
| **AI không được** | Auto-overwrite baseline; sửa TC baseline trực tiếp; bỏ qua màu CHỜ DUYỆT; tự chọn template |

### B5 — Handoff & Export Excel

| Hạng mục | Nội dung |
|---|---|
| **Mục tiêu** | Gộp toàn bộ artifact đã duyệt thành 1 deliverable Excel. |
| **AI thực hiện** | Gộp các file artifact đã Gate → export theo template Excel do Monitor chỉ định → tạo file Excel deliverable |
| **Output** | File Excel: 8 sheet, header khóa cứng (xem Section 07) |
| **AI không được** | Tự chọn template Excel; chèn cột; merge ô tùy tiện; đổi header |

---

## 05 — CHẾ ĐỘ CR (Change Request)

> CR không phải ngoại lệ — đây là tính năng chính thức của pipeline.

**Định nghĩa:** CR = input cũ được thay đổi/cập nhật thành input mới. Không làm lại từ đầu.

**Quy trình CR:**
```
Nhận CR
  → AI xác định vùng CR chạm tới (so với step1_breakdown cũ)
  → Chạy lại B2 ở chế độ DELTA (chỉ phân tích phần thay đổi)
  → Impact B/C: dò ảnh hưởng dây chuyền từ CR
  → Sinh Q&A cho điểm mới phát sinh
  → Loop Q&A → Monitor confirm
  → Nếu phát sinh impact mới → define tiếp, lặp lại
  → Monitor confirm OK → tiếp tục từ B3
```

**Nguyên tắc CR:**
- Không re-run toàn pipeline từ B0
- Không ghi đè artifact cũ ngay lập tức → tô màu diff trước
- Gate vẫn bắt buộc với các bước chạy lại

---

## 06 — DEGRADED MODE (Khi Input / MCP Thiếu)

| Tình huống | Hành động AI | Được tiếp tục không? |
|---|---|---|
| **MCP design tool lỗi** (Figma/Zeplin/v.v.) | Dừng B1, báo lỗi cụ thể, gắn `[MISSING: Design data - lý do]`, tiếp B2 với data hiện có + gắn [ASSUMPTION] | B2 tiếp tục với cờ |
| **Thiếu file mô tả yêu cầu** | Báo thiếu, yêu cầu Monitor cung cấp. Không suy luận. | Dừng B0, chờ input |
| **Tài liệu cũ/outdated** | Gắn `[WARNING: doc outdated - {tên file} - {lý do nghi ngờ}]`, đẩy lên Q&A B2 | B2 tiếp tục với cờ |
| **File không đọc được** | Báo lỗi cụ thể (encoding/path/quyền), yêu cầu Monitor cung cấp lại | Dừng tại bước đó |
| **MCP disconnect giữa chừng** | Báo lỗi + trạng thái bước hiện tại + resume point. Không re-run toàn bộ. | Resume từ bước đó |

**Quy tắc [ASSUMPTION]:**
- Mọi [ASSUMPTION] phải tự động thêm 1 dòng Q&A trong `step2_qa`
- Nếu assumption ảnh hưởng đến tầng B (Indirect) hoặc C (Workflow) → KHÔNG tiếp bước tiếp theo khi chưa có Monitor confirm

---

## 07 — GHI ĐÈ CÓ KIỂM SOÁT

**Nguyên tắc:**
- Baseline = phiên bản artifact đã được Monitor confirm gần nhất
- AI **không bao giờ** tự ghi đè baseline
- Mọi thay đổi đề xuất → tô màu → CHỜ DUYỆT → Monitor confirm → AI mới ghi đè

**Quy trình ghi đè:**
```
AI sinh output mới
  → So sánh với baseline
  → Tô màu diff:
      🟡 VÀNG (FFF2CC)  = SỬA nội dung cũ
      🟢 XANH (E2EFDA)  = THÊM MỚI
      ⬜ XÁM  (D9D9D9)  = ĐỀ XUẤT OBSOLETED
  → Xuất file diff CHỜ DUYỆT
  → Monitor review: sửa trực tiếp, xóa màu = confirm từng dòng
  → Sau khi Monitor xác nhận → AI ghi vào baseline (baseline mới hình thành)
```

---

## 08 — GATE CHECKLIST TỔNG HỢP

| Gate | Điều kiện PASS | Hành động nếu FAIL |
|---|---|---|
| **Gate 0** — Input & Phân loại | Input OK + Loại ticket đã confirm | Yêu cầu bổ sung input / điều chỉnh phân loại |
| **Gate 1** — Extract | Extract đủ 7 hạng mục + Monitor confirm | AI extract lại đúng vùng |
| **Gate 2** — Analysis + Q&A | Không [MISSING-COVERAGE] critical + 100% Q&A critical CLOSED | Loop Q&A; không tự đóng Q&A bằng cảm tính |
| **Gate 3** — TCD + Risk | Coverage không trắng ở level quan trọng + Risk Score đã confirm | Bổ sung TCD; điều chỉnh Risk Score |
| **Gate 4a** — Checklist | Checklist đủ, Monitor confirm hướng test | Sửa checklist cho đến khi confirm |
| **Gate 4b** — TC + Diff | TC executable + diff đã duyệt từng dòng + baseline cập nhật | Sửa TC theo diff; không ghi đè trước khi duyệt |

---

## 09 — 7 COMMAND CỐ ĐỊNH (Generic, không embed version)

| Command | Bước | Chức năng | Input | Output |
|---|---|---|---|---|
| `qc_input` | B0 | Validate input, gắn [ASSUMPTION], phân loại ticket | File yêu cầu + link design (optional) | B0_input_check + loại ticket |
| `qc_extract` | B1 | Extract design/tài liệu theo 7 hạng mục | Link design + vùng chỉ định | B1_extract |
| `qc_analyze` | B2 | Impact analysis + Q&A loop | B1_extract (đã Gate 1) | step1_breakdown, step1_context, step2_qa |
| `qc_tcd` | B3 | Sinh TCD 4 level + Risk Score | step1/2 đã chốt | step3_tcd + risk_matrix |
| `qc_checklist` | B4-before | Sinh checklist mục tiêu | step3_tcd | step4_checklist |
| `qc_testcase` | B4-after | Sinh TC theo template + diff màu | step4_checklist + template path | step4_tc + reuse_map + regression_pool + obsoleted_candidates |
| `qc_export` | B5 | Export Excel deliverable | Toàn bộ artifact đã Gate | Excel deliverable |

> **Lưu ý:** Không đổi tên command. Không embed tên dự án/version vào tên command. Tham số truyền qua lúc runtime.

---

## 10 — CẤU TRÚC THƯ MỤC (Generic)

```
qc-ai-agents/
├── core/                              ← KHÔNG thay đổi theo dự án
│   ├── pipeline/                      ← Logic B0→B5 (file này)
│   ├── commands/                      ← 7 command cố định
│   └── rules/                         ← Rule impact analysis, TCD, risk
│
├── config/
│   └── {project-id}/                 ← THAY theo từng dự án
│       ├── project-config.json        ← Xem cấu trúc bên dưới
│       └── templates/
│           ├── tc-template.xlsx       ← Monitor chỉ định
│           ├── qa-template.xlsx
│           └── export-template.xlsx
│
├── jobs/
│   └── {JOB_ID}/                     ← Output từng job
│       ├── 00_meta.md                 ← Trạng thái job, resume point — AI đọc TRƯỚC
│       ├── input/                     ← Không sửa sau B0; CR vào input/cr/
│       │   └── cr/
│       ├── b0_input_check/
│       ├── b1_extract/
│       ├── b2_analysis/               ← step2_qa: Monitor điền tay cột trả lời
│       ├── b3_tcd/
│       ├── b4_checklist/
│       ├── b4_testcase/
│       ├── baseline/                  ← Không xóa, không ghi đè; giữ lịch sử
│       └── output/
│
└── data/
    └── processed/kaizen/             ← Summary sau mỗi job
```

### project-config.json (Template generic)

```json
{
  "project_id": "{PROJECT_ID}",
  "project_name": "{Tên dự án}",
  "domain": {
    "type": "{web_app | mobile_app | data_pipeline | api | hybrid}",
    "description": "{Mô tả ngắn domain nghiệp vụ}",
    "glossary": {
      "{term_1}": "{định nghĩa}",
      "{term_2}": "{định nghĩa}"
    },
    "impact_map": {
      "description": "Định nghĩa cách xác định Impact B (Indirect) cho dự án này",
      "example": "{ví dụ: component dùng chung là Header/Footer/Sidebar; với data pipeline thì là bảng hạ nguồn}"
    }
  },
  "input": {
    "required": ["{loại input bắt buộc — ví dụ: file mô tả yêu cầu}"],
    "optional": ["{loại input optional — ví dụ: link design, file mapping}"],
    "design_tool": "{figma | zeplin | sketch | none}"
  },
  "risk_criteria": {
    "high_risk_areas": ["{vùng rủi ro cao của dự án — ví dụ: thanh toán, xác thực}"],
    "historical_bugs": ["{vùng đã từng có bug/escape}"],
    "weight_overrides": {
      "business_impact": 0.4,
      "usage_frequency": 0.35,
      "bug_history": 0.25
    }
  },
  "templates": {
    "tc_template": "{path tới file TC template}",
    "qa_template": "{path tới file Q&A template}",
    "export_template": "{path tới file Excel export template}"
  },
  "agent_rules": {
    "max_qa_per_round": 10,
    "require_monitor_confirm_before": ["B3", "B4-after", "B5"],
    "allow_lightweight_skip": ["regression_pool", "obsoleted_candidates"]
  }
}
```

---

## 11 — SCHEMA FILE EXCEL DELIVERABLE (Header khóa cứng)

| Sheet | Mục đích | Cột bắt buộc | Monitor sửa tay |
|---|---|---|---|
| `B0_input_check` | Validate input | ID \| Loại_input \| Trạng_thái(OK/THIẾU/GIẢ_ĐỊNH) \| Ghi_chú | Không |
| `B1_extract` | Test basis từ design | ID \| Hạng_mục \| Nguồn \| Nội_dung \| Cờ(OK/MISSING) | Không |
| `step1_breakdown` | Phân rã requirement + impact | ID \| Requirement \| Scenario(BDD) \| Impact_Type(A/B/C) \| Source \| Tag | Không |
| `step1_context` | Snapshot hệ thống đã đọc | Mục \| Nguồn \| Liên_quan | Không |
| `step2_qa` | Q&A làm rõ requirement | QA_ID \| Loại \| Câu_hỏi \| Context \| AI_đề_xuất \| **Trả_lời** \| **Nguồn** \| **Trạng_thái** \| Ảnh_hưởng | **Cột in đậm** = Monitor nhập tay |
| `step3_tcd` | Test condition + Risk | TCD_ID \| Level \| Điều_kiện \| Impact_Ref \| Risk(H/M/L) \| Coverage_Ref | Không |
| `step4_checklist` | Checklist kiểm tra | STT \| Mục_tiêu_kiểm_tra \| Kết_quả_mong_muốn | Không |
| `step4_tc` | Test case chi tiết | TC_ID \| Mã \| Mục_đích \| Precondition \| Các_bước \| Kết_quả_mong_muốn \| Risk \| Source_Type | **Kết_quả** (nếu Monitor chỉnh) |
| `reuse_map` | Map reuse/ghi đè | TC_ID \| Loại(NEW/REGRESSION/OBSOLETED/CONFIRMATION/SKIPPED) \| Source_Ref \| Màu_diff \| **Trạng_thái_duyệt** | **Trạng_thái_duyệt** |

> **Quy tắc cứng:** Không chèn cột; không merge ô tùy tiện; không đổi header. Vi phạm → phá round-trip markdown↔excel.

---

## 12 — QUY TRÌNH KAIZEN (Sau mỗi job)

> **Bắt buộc** sau khi B5 DONE. Không có kaizen = job chưa đóng.

### Checklist kaizen

**1. Review pipeline thực tế**
- Bước nào tốn thời gian bất thường? Tại sao?
- Gate nào phải loop nhiều hơn dự kiến?
- AI sinh output sai hoặc thiếu ở đâu?
- Luồng (L/S/F) đã phân loại đúng chưa?

**2. Review Q&A**
- Pattern câu hỏi nào lặp lại? → Bổ sung glossary hoặc config
- Câu hỏi nào AI không cần hỏi nếu có đủ context? → Cập nhật input checklist

**3. Review Impact**
- Vùng nào bị bỏ sót impact? → Bổ sung `risk_criteria.high_risk_areas`
- Rule nào trong core cần điều chỉnh?

**4. Review Risk Score**
- Phân bổ effort theo Risk có đúng thực tế không?
- Trọng số có cần điều chỉnh?

**5. Cập nhật file**
- Ghi vào `00_meta.md`: kết quả kaizen + resume point
- Tạo `knowledge-pipeline-summary_v{N+1}_{NEXT_JOB_ID}.md`
- Cập nhật `project-config.json` nếu có thay đổi

> **Output bắt buộc:** ít nhất 1 thay đổi cụ thể vào config hoặc core rules. Không có thay đổi = kaizen chưa xong.

---

## 13 — HƯỚNG DẪN ÁP DỤNG CHO DỰ ÁN MỚI

### Bước 1: Setup (1 lần duy nhất)

```
1. Copy thư mục core/ (không sửa)
2. Tạo config/{project-id}/project-config.json
   → Điền: domain type, glossary, impact map, risk areas, template paths
3. Chuẩn bị template TC (do Monitor chỉ định format)
4. Tạo jobs/{JOB_ID}/00_meta.md cho job đầu tiên
```

### Bước 2: Chạy job đầu tiên

```
1. Cung cấp input (file yêu cầu + link design nếu có)
2. Chạy qc_input → xác nhận loại ticket
3. Chạy qc_extract (nếu có design)
4. Chạy qc_analyze → trả lời Q&A
5. Chạy qc_tcd → confirm risk score
6. Chạy qc_checklist → confirm hướng test
7. Chạy qc_testcase → duyệt diff màu
8. Chạy qc_export → nhận Excel deliverable
9. Thực hiện kaizen → cập nhật config
```

### Bước 3: Từ job thứ 2 trở đi

- Lõi không thay đổi
- Config có thể đã được cập nhật từ kaizen
- Baseline của job trước được reuse trong reuse_map

---

## 14 — NHỮNG GÌ AI PHẢI NHỚ (Checklist cho agent)

```
□ Đọc 00_meta.md trước khi làm bất cứ gì
□ Gọi list_allowed_directories tại B0
□ Gắn [ASSUMPTION] mọi chỗ thiếu input — không tự suy luận
□ Không bao giờ tự ghi đè baseline
□ Không tự chốt OBSOLETED/REGRESSION
□ Không nhảy bước khi chưa có Gate confirm
□ Q&A: đặt câu hỏi cụ thể, có context, có AI đề xuất — không hỏi mơ hồ
□ Q&A: cập nhật file hiện có, không tạo file mới mỗi vòng loop
□ TC: 1 TC = 1 assertion; expected result không lẫn vào steps
□ Template: hỏi path, re-check format, rồi mới sinh TC
□ Lỗi → dừng đúng bước, báo cụ thể, resume từ đó — không re-run toàn bộ
□ CR → chạy B2 delta, không làm lại từ đầu
□ Tất cả file sinh ra: tiết kiệm token nhưng đủ data
```

---

## 15 — ROADMAP PHÁT TRIỂN

| Version | Mục tiêu | Trạng thái |
|---|---|---|
| **v2 (hiện tại)** | Tổng quát hóa, tách Lakehouse, 3 luồng, risk score | ✅ Định nghĩa xong |
| **v3** | Áp 3 luồng thực tế; B1 checklist 7 hạng mục cứng; Risk score thực chiến | 🔲 Sau job tiếp |
| **v3** | Tích hợp common rule baseline vào config (tái dùng không extract lại) | 🔲 Sau job tiếp |
| **v4** | Đóng gói core/ hoàn chỉnh, deploy thử dự án khác | 🔲 Kế hoạch |
| **v4** | Degraded mode tự động detect và gắn cờ | 🔲 Kế hoạch |
| **v5** | Sinh TC ID từ TCD (1 TCD → N TC, có traceability) | 🔲 Tương lai |
| **v5** | Execution + defect + retest lifecycle (khi VDI cho phép) | 🔲 Tương lai |
| **v6** | Automation candidate pipeline | 🔲 Tương lai |

---

*QC_AI_WORKFLOW_v2 — Generic Edition*
*Không chứa thông tin cụ thể của bất kỳ dự án nào. Config dự án nằm trong `project-config.json`.*
