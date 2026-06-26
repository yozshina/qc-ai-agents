# Rule — Q&A Classification (CRITICAL / MAJOR / MINOR)
> Trạng thái: 🔲 CHƯA TÁCH (nội dung ở `core/pipeline/qc-workflow_core_v3_2026-06-25.md` §01.3)

## Mục đích
Phân loại Q&A theo mức ảnh hưởng để biết câu nào BẮT BUỘC trả lời mới đi tiếp, câu nào pending được.

## Nội dung cần có (gợi ý)
- **CRITICAL:** chạm tầng A / sai hướng gốc → DỪNG, bắt buộc trả lời.
- **MAJOR:** chạm tầng B/C → dừng tầng đó, pending nếu Monitor đồng ý tường minh.
- **MINOR:** detail nhỏ → pending, gắn [PENDING-QA], trả lời sau tính như delta CR.
- Q&A cập nhật in-place, không tạo file mới mỗi vòng loop.

## Ghi chú từ review (R-05, chưa áp dụng)
Senior QC đề xuất: Q&A chạm `high_risk_area` → tự nâng CRITICAL bất kể tầng. Cân nhắc khi kaizen.

## Liên kết
- Workflow core: §01.3, §04-B2
