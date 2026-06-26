# QC AI-Agent Workflow — Lakehouse (v1 — Mapped)


---

## 00_README

### QC AI-AGENT WORKFLOW — BẢN NHÁP REVIEW (Dự án Lakehouse)

| Mục | Nội dung |
| --- | --- |
| Trạng thái | DRAFT để review — CHƯA phải rule cuối. Dùng để bạn hình dung & comment trước khi đưa vào ai-agents. |
| Đơn vị làm việc | Theo từng job - mỗi job là được định nghĩa là 1 feature update hoặc 1 feature create new. Change Request (CR) từ phía khách hàng/BA/PM/PO chỉ áp dụng cho 1 job. Nhận được CR (tương đương với nhận input, chỉ khác là input cũ được thay đổi/update thành input mới) thì sẽ thực hiện chạy lại B2 ở chế độ re-analysis theo delta. (phân tích vùng ảnh hưởng từ CR -> Q&A để làm rõ -> phân tích vùng ảnh hưởng mở rộng từ Q&A -> Loop liên lục lại quy trình trên đến khi người monitor đã xác nhận hoặc đánh giá ổn thì mới thực hiện tiếp bước 3) |
| Trong phạm vi | B1 chuẩn bị input và extract input → B2 thực hiện phân tích & impact → (vòng Q&A in-chat) → B3 TCD → B4 Test Case → B5 handoff + xuất Excel. |
| Ngoài phạm vi (giai đoạn này) | Jira (tạm thời chưa áp dụng), execution/defect/retest (tạm thời chưa áp dụng do làm tay trên VDI khách), automation (tạm thời chưa áp dụng). Tất cả chưa áp dụng thì vẫn phải lưu lại để sau có thể tracking nếu có yêu cầu |
| Vai trò người | Monitor tự review, đánh giá, đưa ra ý kiến để thay đổi và có quyền tuyệt đối duyệt đã được access gate/điều kiện để tới bước tiếp theo hay chưa. Phán đoán/giám sát là của người monitor — agent tuyệt đối không được đưa ra quyết định thay thế. |
| Vai trò AI | Làm phần cơ học: đọc tài liệu, dựng impact, sinh TCD/TC theo template. KHÔNG tự gán OBSOLETED/REGRESSION, KHÔNG tự ghi đè. |
| Đóng gói | Bộ skill/command mang đi được; người khác cài là chạy, không phụ thuộc vào bất kỳ cá nhân/tổ chức nào. Cấu hình tách riêng theo dự án (xem 05). |
| Output | (A) 1 workbook nhiều sheet (file này) + (B) 1 file template chứa Q&A. |
| Tối ưu token | Lỗi/thiếu input → DỪNG đúng bước, báo cụ thể, resume từ bước đó. KHÔNG re-run toàn pipeline. Sinh bất kỳ file nào cũng trên nguyên tắc tiết kiệm token nhưng phải đẩy đủ các dữ liệu đã được generate từ ai-agents |

### CÁC QUYẾT ĐỊNH ĐÃ CHỐT (D1–D10)

| Mã | Quyết định |
| --- | --- |
| D1 | Bỏ Jira. Vòng Q&A chuyển vào chat, lặp đến khi Monitor confirm OK mới qua bước sau. |
| D2 | Cắt khỏi scope: execution, mark Pass/Fail, vòng đời bug, retest, automation (VDI khách + làm tay + để sau). |
| D3 | Một Monitor duy nhất tự gác mọi gate; giữ artifact ĐẦY ĐỦ để review, không rút gọn để xem. |
| D4 | Excel là deliverable cuối, ROUND-TRIP 2 chiều (markdown↔excel), header khóa cứng. |
| D5 | B4 sinh theo template: hỏi path template → lấy file → re-check format → mới sinh TC. |
| D6 | Ghi đè phải qua duyệt: tô màu 'sửa' vs 'thêm mới', Monitor duyệt rồi mới ghi đè (không auto-overwrite). |
| D7 | Lỗi → dừng tại bước, báo lỗi cụ thể, resume từ đó. Không re-run toàn bộ. |
| D8 | Input tối thiểu: Figma URL + vùng cần xử lý + file mô tả KH (optional). AI tự check, thiếu thì require/báo. |
| D9 | Bỏ B1. Vào thẳng B2; AI đọc đúng vùng Figma được chỉ định. |
| D10 | Đích cuối: đóng gói bộ skill/command tái sử dụng đa dự án. |


---

## 01_Pipeline

### 01 — PIPELINE TỔNG THỂ (sau điều chỉnh)

| Bước | Input chính | AI thực hiện | Output | Gate / điều kiện |
| --- | --- | --- | --- | --- |
| B1 Chuẩn bị input | Figma URL + vùng xử lý; file mô tả KH (optional) | Kiểm tra input xem có thể truy cập được không. 1. Nếu truy cập được -> extract được input. 2. Nếu không truy cập được -> thực hiện request tới người monitor. AI không thực hiện phân tích ở B1 | File extract những gì AI có thể lấy được, đọc được, tìm kiếm được từ input | Gate 1: + extract được input + Tạo thành file để người monitor review excel. 1. Nếu người monitor review đã đạt -> Chuyển sang B2. 2. Nếu người monitor review chưa đạt -> loop |
| B2 Analyze & Impact | File extract từ B1 (đã được Monitor confirm) | Phân rã requirement; Impact A/B/C; phát hiện Obsoleted; sinh Q&A | step1_breakdown, step1_context, step2_qa | Gate 2: 100% Q&A critical CLOSED/CONFIRMED |
| ↳ Vòng Q&A (in-chat) | step2_qa (Q&A OPEN) | Đặt câu hỏi cụ thể -> sinh ra file excel Q&A → nhận trả lời → re-analysis → hỏi tiếp | step2_qa cập nhật; scope/tag cập nhật | Loop tới khi người Monitor confirm |
| B3 Generate TCD | step 1/2 đã chốt | Sinh test condition 4 level + coverage matrix + risk rating | step3_tcd | Gate 3: coverage không hở + Monitor confirm |
| B4 Generate Test Case | step3_tcd + TEMPLATE (hỏi path) | Re-check format template → sinh TC + reuse map (diff màu) | step4_tc, reuse_map, regression_pool, obsoleted_candidates | Gate 4: TC chạy được + diff đã duyệt |
| B5 Handoff + Export | Toàn bộ artifact đã duyệt | Gộp & xuất 1 workbook Excel nhiều sheet | File Excel deliverable (xem 06) | DONE |


---

## 02_Steps_Detail

### 02 — DIỄN GIẢI TỪNG BƯỚC

| Bước | Mục tiêu | Input | AI thực hiện | Output | Gate | Monitor làm | AI Không được làm |
| --- | --- | --- | --- | --- | --- | --- | --- |
| B1 | Đảm bảo đủ test basis trước khi phân tích | Figma URL + vùng; mô tả KH (optional) | Kiểm tra input xem có thể truy cập được không. 1. Nếu truy cập được -> extract được input. 2. Nếu không truy cập được -> thực hiện request tới người monitor. AI không thực hiện phân tích ở B1 | File extract những gì AI có thể lấy được, đọc được, tìm kiếm được từ input | Gate 1: + extract được input + Tạo thành file excel để người monitor review. 1. Nếu đạt -> B2. 2. Nếu chưa đạt -> loop | Cấp đúng Figma URL + chỉ rõ vùng; mô tả của KH (nếu có), Change request (nếu có) | Tự ý thay đổi các thông tin không có trong input |
| B2 | Hiểu requirement + xác định tác động trực tiếp/gián tiếp/workflow | File extract từ B1 | Phân rã scenario; Impact A/B/C; Obsoleted detection; sinh Q&A có context | File excel Q&A theo template. Gắn cờ file extract những phần chưa được làm rõ | Gate 2: + 100% Q&A closed + Người monitor ra quyết định. 1. Confirm ổn → B3. 2. Chưa → loop | Đọc breakdown/impact; đối chiếu BA/PM/PO; trả lời Q&A | Tự confirm REGRESSION/OBSOLETED khi chưa có căn cứ |
| B2-Q&A | Làm rõ điểm chưa chắc trước khi thiết kế test | step2_qa OPEN | Hỏi → nhận trả lời → re-analysis → nếu phát sinh ảnh hưởng mới thì define tiếp → hỏi lại | step2_qa cập nhật trạng thái | | Trả lời đầy đủ các câu hỏi AI đã đưa ra, nếu chưa trả lời được có thể pending để lại | Đóng Q&A bằng cảm tính / bỏ sót Q&A |
| B3 | Chuyển impact đã chốt thành điều kiện test có coverage | step 1/2 | Sinh TCD 4 level [BDD][UI-COVERAGE][IMPACT-INDIRECT][IMPACT-WORKFLOW] + coverage matrix + chấm risk | step3_tcd | Gate 3 + Monitor ra quyết định. 1. Confirm → B4-before. 2. Chưa → loop | Review coverage + risk; xác nhận đủ | Sinh TC khi TCD còn hở coverage |
| B4 - before | Sinh Checklist | step3_tcd | Sinh Checklist theo dạng: STT - Mục tiêu kiểm tra - Kết quả mong muốn | step4_checklist | Gate 4 + Monitor ra quyết định. 1. Confirm → B4-after. 2. Chưa → loop | Review/ duyệt check list | Không tự ý nhảy tới bước sinh testcase ngay, phải được sự đồng ý của người monitor |
| B4 - after | Sinh TC chi tiết, chạy được, có kiểm soát reuse/ghi đè | step4_checklist (confirmed) + TEMPLATE (monitor chỉ định path) | Hỏi path template → re-check format → sinh TC + reuse map; tô màu sửa/mới; gắn cờ chờ duyệt | step4_tc + 3 file reuse/regression/obsoleted | | Duyệt diff màu; duyệt obsoleted; sample TC executable | Auto-overwrite baseline khi chưa duyệt; sửa TC baseline trực tiếp |
| B5 | Chốt & xuất deliverable | Artifact đã duyệt | N/A | File Excel Testcase | N/A | Mở Excel review lần cuối | Không được tự ý chọn template file Excel mà phải được người monitor chỉ định. Đổi header/chèn cột phá round-trip |


---

## 03_Impact_Analysis

### 03 — KHUNG IMPACT ANALYSIS (nắn cho Lakehouse) + CR + GHI ĐÈ

| Tầng | Tên | Câu hỏi cốt lõi | Với Lakehouse nghĩa là | Output | Lưu ý |
| --- | --- | --- | --- | --- | --- |
| A | Direct | Job này thay đổi trực tiếp cái gì? | Màn hình chức năng + field/rule + bảng/cột/job ETL bị sửa trực tiếp | Danh sách direct impact có nguồn | Phải khớp note BA + mô tả KH (từ file extract B1) |
| B | Indirect (Reverse Map) | Cái gì khác đang dùng chung sẽ bị ảnh hưởng? | Bảng/dashboard/job HẠ NGUỒN (lineage) dùng chung cột/bảng vừa đổi | Candidate regression | Đây là nơi escape số 1; thiếu mapping thì gắn Q&A |
| C | Workflow | Chuỗi trước/sau có gãy không? | Chuỗi job/schedule/dependency, freshness/SLA, trigger sau khi data đổi | Workflow impact có/không đều nêu rõ | Đừng chỉ test 'load thành công' rồi bỏ chuỗi sau |
| D/E | Obsoleted detection | TC/rule cũ còn đúng sau thay đổi không? | TC cũ test logic/bảng đã bị thay sẽ thành candidate obsoleted | Candidate list + Q&A | AI KHÔNG tự chốt; chờ Monitor confirm |

### CHẾ ĐỘ CR (Change Request) & GHI ĐÈ CÓ KIỂM SOÁT

CR mode: khi job đã xong mà khách gửi CR → KHÔNG làm lại từ đầu. CR = input cũ được thay đổi/update thành input mới. Chạy lại B2 ở chế độ delta:
1) Xác định vùng CR chạm tới → 2) Dò Impact B/C để tìm ảnh hưởng dây chuyền → 3) Đề xuất phương án → 4) Loop Q&A → 5) Nếu sau trả lời phát sinh ảnh hưởng mới thì define tiếp, lặp lại → 6) Monitor confirm mới chuyển bước tiếp.

Ghi đè có kiểm soát (D6): giữ bản TC đã-duyệt-gần-nhất làm BASELINE. Lần chạy mới so với baseline, xuất ra với màu:
- VÀNG (FFF2CC) = nội dung SỬA
- XANH (E2EFDA) = THÊM MỚI
- XÁM (D9D9D9) = đề xuất OBSOLETED

Mọi dòng tô màu mang trạng thái 'CHỜ DUYỆT'. Monitor duyệt → mới ghi đè baseline → baseline mới hình thành. AI tuyệt đối không tự ghi đè.


---

## 04_Gate_Checklist

### 04 — GATE CHECKLIST (mapped theo pipeline mới)

| Gate | Item kiểm tra | Cách kiểm | PASS khi | Rủi ro nếu bỏ |
| --- | --- | --- | --- | --- |
| Gate 1 — Input & Extract | AI extract được input + tạo file review | Monitor mở file extract, đối chiếu Figma URL/vùng + mô tả KH | Extract đầy đủ + file review được Monitor confirm đạt. Nếu chưa đạt → loop | Phân tích sai từ gốc vì input thiếu/sai |
| Gate 2 — Analysis | Impact A/B/C rõ; Map requirement↔scenario đủ | Đọc step1_breakdown + step1_context | Không [MISSING-COVERAGE] critical. Monitor confirm ổn → B3; chưa → loop | Bỏ sót impact gián tiếp/workflow |
| Gate 2 — Q&A | Q&A critical đã CONFIRMED | Lọc [MISSING-IMPACT]/[POSSIBLE-OBSOLETED] trong step2_qa | 100% critical CLOSED/CONFIRMED. Câu hỏi chưa trả lời được → pending, nhưng không bỏ sót | TCD/TC sai hàng loạt |
| Gate 3 — TCD | Đủ 4 scenario level + coverage matrix + risk | Đọc step3_tcd | Không tầng quan trọng bị trắng. Monitor confirm → B4-before; chưa → loop | Lỗi nhân rộng sang toàn bộ TC |
| Gate 4-before — Checklist | Checklist (STT/Mục tiêu/Kết quả mong muốn) đầy đủ | Monitor review checklist | Monitor confirm checklist đạt → mới cho phép sinh TC. Chưa đạt → loop | Sinh TC sai hướng, phải làm lại toàn bộ B4 |
| Gate 4-after — TC | TC executable + diff đã duyệt + obsoleted đã confirm | Sample TC; xem màu diff | TC chạy được; baseline chỉ ghi đè sau duyệt | Mất coverage cũ / TC không dùng được |


---

## 05_Commands_Skills

### 05 — COMMAND / SKILL (đã tách version) + LỚP CẤU HÌNH ĐÓNG GÓI

| Bước | Command (generic) | Skill / Capability | Input | Output | Cấu hình theo dự án |
| --- | --- | --- | --- | --- | --- |
| B1 | /qc_extract_input | input_extractor | Figma URL + vùng + mô tả KH (optional) + CR (nếu có) | File extract (những gì AI đọc/tìm được) + cờ thiếu | Danh sách input bắt buộc/optional của dự án |
| B2 | /qc_analyze | scenario_impact_analyzer | File extract từ B1 (đã được Monitor confirm) | step1_breakdown, step1_context, step2_qa | Schema domain; nguồn lineage/mapping; glossary/data dictionary |
| B2-Q&A | /qc_qa | qa_loop_handler | step2_qa OPEN | File Excel Q&A theo template (cập nhật trạng thái) | Template Q&A path |
| B3 | /qc_tcd | test_condition_designer | step1/2 đã chốt | step3_tcd | Bộ rule + tiêu chí risk theo dự án |
| B4-before | /qc_checklist | checklist_generator | step3_tcd | step4_checklist (STT/Mục tiêu/Kết quả mong muốn) | Format checklist |
| B4-after | /qc_testcase | test_case_designer | step4_checklist (confirmed) + TEMPLATE (monitor chỉ định path) | step4_tc + reuse_map + regression_pool + obsoleted_candidates | Đường dẫn template TC (monitor chỉ định); format cột TC |
| B5 | /qc_export_excel | excel_exporter | Toàn bộ artifact đã duyệt | File Excel Testcase (template do monitor chỉ định) | Template Excel Testcase path (monitor chỉ định) |

### NGUYÊN TẮC ĐÓNG GÓI

LÕI (mang đi được): logic 7 command + skill ở trên — KHÔNG chứa tên dự án/job, không hardcode path.

CẤU HÌNH (thay theo dự án): 1 file config chứa input paths, schema domain, glossary/data dictionary, path template TC, path template Q&A, path template Excel Testcase, tiêu chí risk.

Bàn giao nhân sự khác: chỉ cần cài bộ LÕI + điền CẤU HÌNH. Phần monitor/phán đoán dạy bằng case cụ thể, KHÔNG nằm trong agent.

Vì đã tách version: không còn hardcode UC/version trong tên command — mỗi job chỉ truyền tham số, không đổi tên skill.

Sinh bất kỳ file nào cũng trên nguyên tắc tiết kiệm token nhưng phải đẩy đủ các dữ liệu đã được generate từ ai-agents.


---

## 06_Excel_Output_Schema

### 06 — SCHEMA FILE EXCEL DELIVERABLE (khóa cứng để round-trip 2 chiều)

| Sheet | Mục đích | Cột (header khóa cứng) | Vùng được sửa tay | Ghi chú round-trip |
| --- | --- | --- | --- | --- |
| B1_extract | Kết quả extract input từ B1 | ID ∣ Loại_input ∣ Nguồn ∣ Nội_dung_extract ∣ Trạng_thái(OK/THIẾU/LỖI) ∣ Ghi_chú | Không (do AI sinh) | Monitor review → confirm đạt mới sang B2 |
| step1_breakdown | Phân rã requirement + impact (từ B2) | ID ∣ Requirement ∣ Scenario(BDD) ∣ Screen ∣ Action ∣ Actor ∣ Impact_Type(A/B/C) ∣ Source ∣ Tag_Scope | Không (do AI sinh) | Sửa tay → phải sync ngược qua /qc_analyze |
| step1_context | Snapshot hệ thống đã đọc (từ B2) | Mục ∣ Nguồn đã đọc ∣ Liên quan scope | Không | Chỉ tham chiếu |
| step2_qa | Q&A làm rõ requirement (từ B2-Q&A) | QA_ID ∣ Loại ∣ Câu hỏi ∣ Context ∣ AI đề xuất ∣ Trả lời ∣ Nguồn ∣ Trạng thái ∣ Ảnh hưởng | Cột Trả lời / Nguồn / Trạng thái | Đây là vùng Monitor nhập tay chính |
| step3_tcd | Test condition (từ B3) | TCD_ID ∣ Scenario_Level ∣ Điều kiện ∣ Impact_Ref ∣ Risk ∣ Coverage_Ref | Không | Sửa → re-gen B4 |
| step4_checklist | Checklist kiểm tra (từ B4-before) | STT ∣ Mục_tiêu_kiểm_tra ∣ Kết_quả_mong_muốn | Không | Monitor confirm → mới cho phép sinh TC |
| step4_tc | Test case chi tiết (từ B4-after) | TC_ID ∣ Module ∣ Precondition ∣ Test_Data ∣ Steps ∣ Expected ∣ Scope ∣ Source_Type ∣ Risk | Cột Expected/Test_Data (nếu Monitor chỉnh) | Header KHÓA CỨNG; không chèn cột |
| step3_5_reuse_map | Map reuse/ghi đè | TC_ID ∣ Loại(NEW/REGRESSION/OBSOLETED/CONFIRMATION/SKIPPED) ∣ Source_Ref ∣ Màu diff ∣ Trạng thái duyệt | Cột Trạng thái duyệt | Màu = sửa/mới/obsoleted; duyệt mới ghi đè |