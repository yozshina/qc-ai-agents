# Job Record — LKH / Sprint 14 / UI Common Rule
> File GỘP (thay cho 3 file rời trước đây: pipeline-summary + kaizen + review_v0-pointer).
> Lý do gộp: 3 file rời sẽ thành rác sau 2-3 job, khó quản lý (theo comment Monitor).
> ⚠️ Tên file & phân loại "job-record" là TẠM. Đang chờ Monitor làm rõ Phần D (kaizen-job vs project-knowledge) để đặt tên/cấu trúc cuối cùng.

---

## Phần 1 — TÓM TẮT JOB (pipeline summary)

| Mục | Nội dung |
|---|---|
| Project / Job | LKH / LKH_Update-UI-common-rule-sprint-14 |
| Loại | Update UI — common rule, sprint 14 |
| Trạng thái | ✅ DONE — B5 Export Excel |
| Ngày | 2026-06-19 |
| Deliverable | `KBKT_UI_CommonRule_Sprint14.xlsx` |
| Quy mô | 240 TC / 18 nhóm / 2 sheet |
| Workflow áp dụng | v1 Lakehouse (trước khi có core generic) |

**Artifact gốc:** `projects/LKH/jobs/LKH_Update-UI-common-rule-sprint-14/` (b1-b4, đã đổi tên chuẩn — xem CHANGELOG).

**Để dùng cho CR/regression sau:** Baseline 240 TC trong deliverable. CR chạm common rule → đọc record này + CR mới → B2 delta. Vùng common rule (header/menu/input/button/icon/data-grid) là Impact-B trọng tâm.

---

## Phần 2 — KAIZEN JOB (bài học khi chạy job)

**Pipeline thực tế:** b1_extract & step1_breakdown đều có _v2 → ít nhất 1 vòng loop ở B1, B2. step2_qa có 2 round (qa → qa_r2).

**Q&A:** chạy 2 round. Bài học: với common rule UI nên có sẵn checklist component dùng chung để giảm Q&A round 2.

**Impact:** job common rule → Impact-B (reverse map) là trọng tâm, 1 rule đổi ảnh hưởng nhiều màn.

**Risk:** job v1 chưa áp Risk Score chính thức. Bài học: common rule toàn hệ thống → HIGH → cần TC granular.

**Đề xuất đã đưa vào config:** glossary common_rule, ui_component_types (16 loại), risk_criteria H/M/L.

> CHỜ-MONITOR: bổ sung historical_bugs nếu sprint 14 có escape; xác nhận 18 nhóm TC cover đủ component dùng chung chưa.

---

## Phần 3 — TRỎ TÀI LIỆU GỐC (review v0)

- Bản nháp review v0 workflow Lakehouse: `data/processed/excel-md/QC_AI_Workflow_Lakehouse_review_v0.md`
- Workflow v1 đã archive: `core/kaizen/v1/kaizen-workflow_eContract_origin_v1_2026-06-17.md`

---

## Phần 4 — ĐỀ XUẤT: Job 1 LKH nên lưu lại GÌ? (trả lời câu hỏi Monitor)

> Monitor hỏi: "job 1 của LKH thì chỉ nên lưu lại những gì?"

**Đề xuất — chỉ 3 nhóm thông tin cốt lõi (đủ để job sau & CR dùng lại, bỏ phần dư thừa):**

1. **Định danh + kết quả:** project/job/ngày/deliverable/quy mô (Phần 1). → để biết job đã làm gì.
2. **Bản đồ Impact + baseline:** vùng common rule nào, ảnh hưởng đâu, baseline bao nhiêu TC. → để CR/regression sau dò nhanh.
3. **Bài học vận hành:** Q&A pattern, vùng dễ sót, risk. → để job sau chạy nhanh hơn.

**KHÔNG cần lưu:** toàn bộ artifact chi tiết (đã nằm trong `jobs/.../`), các bản nháp trung gian. Record chỉ là "mục lục + bài học", không nhân bản dữ liệu.

> Domain knowledge tích lũy (luồng nghiệp vụ, vùng ảnh hưởng dài hạn) tách riêng ở `domain-knowledge_LKH.md` — lớn dần qua nhiều job, KHÔNG nhét vào record của 1 job.
