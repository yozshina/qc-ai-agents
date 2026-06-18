# QC AI-Agent Workflow — Lakehouse (Review v0 + Edits)


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
| B1 Chuẩn bị input | Figma URL + vùng xử lý; file mô tả KH (optional) | Kiểm tra input xem có thể truy cập được không. 1. Nếu truy cập được -> extract được input. 2. Nếu không truy cập được -> thực hiện request tới người monitor. AI không thực hiện phân tích ở B1 | File extract những gì AI có thể lấy được, đọc được, tìm kiếm được từ input | Gate 1: + extract được input + Tạo thành file để người monitor review excel. 1. Nếu người monitor review đã đạt -> Chuyển sang B2. 2. Nếu người monitor review chưa đạt -> Người monitor kiểm tra lại và sẽ đưa ra ý kiến để AI kiểm tra lại (loop liên tục cho đến khi người monitor review đạt) |
| B2 Analyze & Impact | File extract những gì AI có thể lấy được, đọc được, tìm kiếm được từ input | Phân rã requirement; Impact A/B/C; phát hiện Obsoleted; sinh Q&A | step1_breakdown, step1_context, step2_qa | Gate 2: 100% Q&A critical CLOSED/CONFIRMED |
| ↳ Vòng Q&A (in-chat) | step2_qa (Q&A OPEN) | Đặt câu hỏi cụ thể -> sinh ra file excel Q&A → nhận trả lời → re-analysis → hỏi tiếp | step2_qa cập nhật; scope/tag cập nhật | Loop tới khi người Monitor confirm |
| B3 Generate TCD | step 1/2 đã chốt | Sinh test condition 4 level + coverage matrix + risk rating | step3_tcd | Gate 3: coverage không hở + Monitor confirm |
| B4 Generate Test Case | step3_tcd + TEMPLATE (hỏi path) | Re-check format template → sinh TC + reuse map (diff màu) | step4_tc, reuse_map, regression_pool, obsoleted_candidates | Gate 4: TC chạy được + diff đã duyệt |
| B5 Handoff + Export | Toàn bộ artifact đã duyệt | Gộp & xuất 1 workbook Excel nhiều sheet | File Excel deliverable (xem 06) | DONE |


---

## 02_Steps_Detail

### 02 — DIỄN GIẢI TỪNG BƯỚC

| Bước | Mục tiêu | Input | AI thực hiện | Output | Gate | Monitor làm | AI Không được làm |
| --- | --- | --- | --- | --- | --- | --- | --- |
| B1 | Đảm bảo đủ test basis trước khi phân tích | Figma URL + vùng; mô tả KH (optional) | Kiểm tra input xem có thể truy cập được không. 1. Nếu truy cập được -> extract được input. 2. Nếu không truy cập được -> thực hiện request tới người monitor. AI không thực hiện phân tích ở B1 | File extract những gì AI có thể lấy được, đọc được, tìm kiếm được từ input | Gate 1: + extract được input + Tạo thành file excel để người monitor review. 1. Nếu người monitor review đã đạt -> Chuyển sang B2. 2. Nếu người monitor review chưa đạt -> Người monitor kiểm tra lại và sẽ đưa ra ý kiến để AI kiểm tra lại (loop liên tục cho đến khi người monitor review đạt) | Cấp đúng Figma URL + chỉ rõ vùng; mô tả của KH (nếu có), Change request (nếu có) | Tự ý thay đổi các thông tin không có trong input |
| B2 | Hiểu requirement + xác định tác động trực tiếp/gián tiếp/workflow | File extract những gì AI có thể lấy được, đọc được, tìm kiếm được từ input | Phân rã scenario; Impact A/B/C; Obsoleted detection; sinh Q&A có context | File excel Q&A theo template. Gắn cờ file extract những phần chưa được làm rõ | Gate 2: + 100% Q&A closed + Người monitor ra quyết định. 1. Nếu confirm đã ổn thì chuyển tới bước tiếp theo. 2. Nếu chưa được confirm phải loop tiếp đến khi được confirm đã ổn | Đọc breakdown/impact; đối chiếu BA/PM/PO; trả lời Q&A | Tự confirm REGRESSION/OBSOLETED khi chưa có căn cứ |
| B2-Q&A | Làm rõ điểm chưa chắc trước khi thiết kế test | step2_qa OPEN | Hỏi → nhận trả lời → re-analysis → nếu phát sinh ảnh hưởng mới thì define tiếp → hỏi lại | step2_qa cập nhật trạng thái | | Trả lời đầy đủ các câu hỏi AI đã đưa ra, nếu chưa trả lời được có thể pending để lại | Đóng Q&A bằng cảm tính / bỏ sót Q&A |
| B3 | Chuyển impact đã chốt thành điều kiện test có coverage | step 1/2 | Sinh TCD 4 level [BDD][UI-COVERAGE][IMPACT-INDIRECT][IMPACT-WORKFLOW] + coverage matrix + chấm risk | step3_tcd | Gate 3 + Người monitor ra quyết định. 1. Nếu confirm đã ổn thì chuyển tới bước tiếp theo. 2. Nếu chưa được confirm phải loop tiếp đến khi được confirm đã ổn | Review coverage + risk; xác nhận đủ | Sinh TC khi TCD còn hở coverage |
| B4 - before | Sinh Checklist | step3_tcd | Sinh Checklist theo dạng: STT - Mục tiêu kiểm tra - Kết quả mong muốn | step4_checklist | Gate 4 + Người monitor ra quyết định. 1. Nếu confirm đã ổn thì chuyển tới bước tiếp theo. 2. Nếu chưa được confirm phải loop tiếp đến khi được confirm đã ổn | Review/ duyệt check list | Không tự ý nhảy tới bước sinh testcase ngay, phải được sự đồng ý của người monitor |
| B4 - after | Sinh TC chi tiết, chạy được, có kiểm soát reuse/ghi đè | | Hỏi path template → re-check format → sinh TC + reuse map; tô màu sửa/mới; gắn cờ chờ duyệt. Thực hiện theo dạng check list: STT - Mục tiêu gắn gọn - Kết quả mong muốn | step4_tc + 3 file reuse/regression/obsoleted | | Duyệt diff màu; duyệt obsoleted; sample TC executable | Auto-overwrite baseline khi chưa duyệt; sửa TC baseline trực tiếp |
| B5 | Chốt & xuất deliverable | Artifact đã duyệt | N/A | File Excel Testcase | N/A | Mở Excel review lần cuối | Không được tự ý chọn template file Excel mà phải được người monitor chỉ định. Đổi header/chèn cột phá round-trip |