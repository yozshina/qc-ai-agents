# Core / Rules — Kế hoạch & danh mục file rule

> ⚠️ Đây là **bản kế hoạch** cho thư mục `core/rules/`. Trả lời câu hỏi của Monitor: thư mục này cần điền file gì, mục đích, và gợi ý nội dung từng file.

## Vì sao tách rules ra khỏi file workflow core?

File `qc-workflow_core_v3_2026-06-25.md` hiện gói TẤT CẢ trong 1 file (~780 dòng): vừa pipeline, vừa rule, vừa schema. Khi workflow lớn dần, các **rule chi tiết** nên tách thành file riêng để:
- Sửa 1 rule không phải đụng cả file workflow lớn (giảm rủi ro).
- AI agent có thể nạp đúng rule cần cho từng bước (tiết kiệm context/token).
- Mỗi rule có thể kaizen độc lập, có version riêng.

> **Trạng thái:** Hiện workflow core vẫn tự chứa rule (đang chạy ổn). Các file dưới đây là **kế hoạch tách dần** — tạo skeleton trước để Monitor thấy lộ trình, điền chi tiết khi cần.

## Danh mục file rule (đã tạo skeleton kèm nội dung gợi ý)

| File | Tách từ section nào của workflow core | Mục đích |
|---|---|---|
| `rule_impact-analysis.md` | Section 04-B2 (khung A/B/C/D-E) | Quy tắc phân tích tác động Direct/Indirect/Workflow/Obsoleted |
| `rule_ticket-classification.md` | Section 02 | Tiêu chí phân luồng Lightweight/Standard-lite/Full |
| `rule_risk-scoring.md` | Section 04-B3 | Công thức Risk Score + phân bổ effort H/M/L |
| `rule_qa-classification.md` | Section 01.3 | Phân loại Q&A CRITICAL/MAJOR/MINOR + cách xử lý |
| `rule_testcase-generation.md` | Section 04-B4-after | Rule sinh TC (1 TC = 1 assertion...) + màu diff |
| `rule_overwrite-control.md` | Section 07 | Ghi đè có kiểm soát + baseline + màu CHỜ DUYỆT |
| `rule_gate-checklist.md` | Section 08 | Điều kiện PASS/FAIL của 6 gate |

> Mỗi file skeleton có: mục đích, trạng thái (CHƯA TÁCH / ĐÃ TÁCH), trỏ về section gốc trong workflow core, và chỗ để điền chi tiết. Khi Monitor muốn maintain rule độc lập, chỉ việc copy nội dung từ section tương ứng vào file rồi đổi trạng thái.
