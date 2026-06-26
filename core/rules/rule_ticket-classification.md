# Rule — Ticket Classification (Lightweight / Standard-lite / Full)
> Trạng thái: 🔲 CHƯA TÁCH (nội dung ở `core/pipeline/qc-workflow_core_v3_2026-06-25.md` §02)

## Mục đích
Phân luồng ticket TRƯỚC khi chạy pipeline để không dùng Full cho mọi việc (70% ticket nhỏ không cần Full).

## Nội dung cần có (gợi ý)
- Bảng tiêu chí: số component impact (≤2 / 3-5 / >5), có đổi flow/logic không, có chạm component dùng chung không.
- Bảng bước theo từng luồng (B0-B5 cái nào đầy đủ/rút gọn/bỏ).
- Nguyên tắc: rút gọn phạm vi, không rút gọn tư duy. LOW vẫn có smoke test.
- B1 luôn đọc đầy đủ scope rồi mới phân loại (không đoán).

## Liên kết
- Workflow core: §02
- Rule liên quan: `rule_risk-scoring.md`
