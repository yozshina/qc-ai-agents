# Rule — Impact Analysis (A / B / C / D-E)
> Trạng thái: 🔲 CHƯA TÁCH (nội dung đầy đủ đang ở `core/pipeline/qc-workflow_core_v3_2026-06-25.md` §04-B2)
> Khi tách: copy section đó vào đây, đổi trạng thái → ✅ ĐÃ TÁCH, và workflow core trỏ sang file này.

## Mục đích
Quy tắc xác định toàn bộ vùng bị tác động khi có thay đổi — phần giá trị nhất của pipeline (đánh vào escape số 1).

## Nội dung cần có (gợi ý)
- **Tầng A — Direct:** thay đổi trực tiếp chạm component/field/rule/API/entity nào.
- **Tầng B — Indirect (Reverse Map):** cái gì dùng chung sẽ bị kéo theo → candidate regression.
- **Tầng C — Workflow:** chuỗi trước/sau có gãy không (trigger, dependency, SLA).
- **Tầng D/E — Obsoleted:** TC/rule cũ còn đúng không.
- **Config inject:** tầng B và C định nghĩa cụ thể theo `domain.impact_map` trong project-config.

## Liên kết
- Workflow core: §04-B2
- Rule liên quan: `rule_qa-classification.md` (Q&A sinh ra từ impact chưa rõ)
