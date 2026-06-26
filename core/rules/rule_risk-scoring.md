# Rule — Risk Scoring
> Trạng thái: 🔲 CHƯA TÁCH (nội dung ở `core/pipeline/qc-workflow_core_v3_2026-06-25.md` §04-B3)

## Mục đích
Thay coverage phẳng bằng điểm rủi ro → dồn effort vào vùng nguy hiểm.

## Nội dung cần có (gợi ý)
- Công thức 3 yếu tố: Business impact 40% + Tần suất dùng 35% + Lịch sử bug 25%.
- Ngưỡng: HIGH ≥70 (60% effort, TC granular) / MEDIUM 40-69 (30%, đầy đủ) / LOW <40 (10%, **smoke — không bỏ**).
- Trọng số có thể override trong `project-config.risk_criteria.weight_overrides`.
- Nhấn mạnh: LOW ≠ skip.

## Liên kết
- Workflow core: §04-B3
- Config: `risk_criteria` trong project-config.json
