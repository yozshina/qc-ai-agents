# Kaizen — LKH Update UI Common Rule Sprint 14
> File: `kaizen_v1_2026-06-19_LKH_update-ui-common-rule-sprint-14.md`
> Job: LKH_Update-UI-common-rule-sprint-14 (DONE, 240 TC)
> ⚠️ Khung kaizen dựng lại trong đợt tái cấu trúc 2026-06-25. Một số mục là suy luận từ artifact, **cần Monitor xác nhận/bổ sung từ trải nghiệm thực tế khi chạy job.**

---

## 1. Review pipeline thực tế
- Job chạy theo workflow v1 (Lakehouse-specific), trước khi có core generic.
- CHỜ-MONITOR: bước nào tốn thời gian bất thường? Gate nào loop nhiều?
- Quan sát từ artifact: b1_extract và step1_breakdown đều có _v2 → có ít nhất 1 vòng loop/bổ sung ở B1 và B2. step2_qa có 3 file (qa, qa_answer, qa_r2) → Q&A chạy ít nhất 2 round.

## 2. Review Q&A
- Q&A chạy 2 round (qa → qa_r2). CHỜ-MONITOR: pattern câu hỏi lặp lại? → có nên bổ sung glossary common_rule?
- Bài học khả dĩ: với common rule UI, nên có sẵn checklist các component dùng chung để giảm Q&A round 2.

## 3. Review Impact
- Đây là job common rule → Impact B (reverse map) là trọng tâm: 1 rule đổi ảnh hưởng nhiều màn.
- CHỜ-MONITOR: có vùng nào bị bỏ sót impact không? 18 nhóm TC có cover hết component dùng chung?

## 4. Review Risk Score
- Job v1 chưa áp Risk Score chính thức (Risk Score là tính năng từ v2+).
- Bài học: nếu áp core mới, common rule toàn hệ thống → HIGH risk → cần TC granular.

## 5. Đề xuất cải tiến cụ thể (đưa vào config)
- ✅ Đề xuất đã phản ánh trong `common/config/project-config.json`: glossary có common_rule, ui_component_types liệt kê 16 loại component, risk_criteria phân HIGH/MEDIUM/LOW cho UI.
- CHỜ-MONITOR: bổ sung historical_bugs nếu sprint 14 có lỗi escape nào.

## 6. File sinh ra từ kaizen này
- `pipeline-summary_v1_2026-06-19_LKH_update-ui-common-rule-sprint-14.md` (đã tạo)
- Cập nhật roadmap: job này là input thực tế đầu tiên giúp định hình v2/v3/core.

---
> Kaizen này dựng lại hồi cứu (retrospective). Job sau của LKH nên làm kaizen ngay khi DONE để chính xác hơn.
