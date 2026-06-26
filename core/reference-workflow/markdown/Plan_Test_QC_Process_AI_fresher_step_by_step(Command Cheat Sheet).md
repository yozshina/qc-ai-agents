# Converted from Plan_Test_QC_Process_AI_fresher_step_by_step(Command Cheat Sheet).csv

- CHEAT SHEET LỆNH CHẠY VÀ OUTPUT | 
- "Tóm tắt lệnh cần chạy |  điều kiện trước khi chạy |  output mong đợi và các điều không được làm." | 
-  | 
- Bước | Khi nào dùng | Command / prompt mẫu | Input cần có trước khi chạy | Output mong đợi | Không được làm
- B1 Extract Figma | Ticket có Figma/design cần đưa vào test basis. | /extract_figma_design <FIGMA_URL> <TICKET_ID> | Figma URL hợp lệ; Figma MCP auth; TICKET_ID/folder đúng. | screens/figma_design_<TICKET_ID>.md | Không lưu screenshot; không dùng FigJam; không tự đoán term.
- B2 Analyze UC | "Sau khi SPEC sẵn sàng |  cần phân tích scenario/impact." | /analyze_user_scenario_uc_260511 <TICKET_PARENT>/<TICKET_ID> | SPEC_vi.md/SPEC.md; mapping/specs/glossary; Figma markdown nếu có. | step0_breakdown.md; step1_context.md; step2_qa.md | Không sinh TCD/TC ở bước này; không bỏ qua System Overview.
- Jira Log QA | Sau B2 nếu step2_qa.md còn QA OPEN. | Log toàn bộ QA OPEN trong step2_qa.md lên Jira ticket <TICKET_ID> dưới dạng sub-task | step2_qa.md; Jira MCP auth. | Jira sub-task/comment có QA list. | Không log thiếu QA critical; không log sai ticket.
- Jira Sync QA | Sau khi BRSE/Dev trả lời trên Jira. | Sync answer từ Jira về step2_qa.md | Jira answer đủ rõ. | step2_qa.md CLOSED/ANSWERED; step0 update TAG_SCOPE. | Không tự gán REGRESSION/OBSOLETED khi chưa confirm.
- B3 Generate TCD | "Sau Gate 2 |  QA critical đã CLOSED/ANSWERED." | /generate_test_conditions_uc_260511 <TICKET_PARENT>/<TICKET_ID> | step0/step1/step2 đầy đủ; Impact A/B/C/D/E; no critical QA OPEN. | step3_tcd.md 18 cột; coverage matrix 3 tầng. | Không chạy nếu QA critical OPEN; không coi TCD là TC.
- B4 Generate TC all | "Sau Gate 3 |  TCD được confirm." | /generate_testcases_uc_260511 <TICKET_PARENT>/<TICKET_ID> | step3_tcd.md đúng schema; TC_v2 nếu có. | 6 file output B4; step4_tc_all.md. | Không sửa TC_v2 trực tiếp; không bỏ qua reuse map.
- B4 Generate TC 1 module | Muốn re-gen hoặc review từng module/feature. | /generate_testcases_uc_260511 <TICKET_PARENT>/<TICKET_ID> <FEATURE_ID> | TCD có FEATURE_ID đó. | step4_tc_<module>.md tương ứng. | Không chạy all nếu chỉ cần sửa 1 module.
- After B4 Convert Excel | Khi cần đưa TC sang Excel để team dùng. | Chạy skill qc_testcase_ticket_to_xlsx hoặc script convert tương ứng. | step4_tc_all.md hoặc per-module TC. | Excel TC theo format dự án. | Không convert khi TC chưa được review.
- After B4 Automation | Khi chọn case Auto để gen script. | /generate_automation_from_testcases <TICKET_FOLDER>/step4_tc_all.md với filter Automation Feasibility = Auto | TC đã confirm; locator/test data rõ. | Automation script candidate. | Không auto hóa flow chưa ổn định hoặc thiếu data.
- After Execute Xray | Khi cần import kết quả test. | /import_test_results_xray | Test result đã có; Xray/Jira auth. | Result import lên Xray. | Không import nhầm version/cycle.
