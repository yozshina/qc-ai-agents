# CHANGELOG — File Rename Mapping
> Lịch sử đổi tên / di chuyển file khi promote v3 → CORE và dựng cấu trúc Hybrid
> Ngày: 2026-06-25
> Người chỉ định: Monitor · Người thực hiện: AI Agent
> **Nguyên tắc: KHÔNG xóa, KHÔNG sửa nội dung file cũ. File cũ giữ nguyên tại chỗ. Đây chỉ là bản đồ tên.**
>
> 🟢 **CẬP NHẬT 2026-06-25 (đợt 2):** Monitor duyệt "làm hết mục 5" + cho phép AI tự tạo folder/ghi file vào repo.
> Trạng thái các mục đã chuyển từ "đề xuất/treo" → "ĐÃ THỰC HIỆN". Xem cột Trạng thái cập nhật bên dưới.

---

## 1. Quy ước version mới (Monitor chốt 2026-06-25)

Trước đây tồn tại 2 quy ước mâu thuẫn:
- `common/config/project-config.json` (LKH thật) ghi: *"by date in filename, not _v2 suffix"*
- File v3 trên giấy dùng: `_v1 / _v2 / _v3`

**→ Quyết định hợp nhất: KẾT HỢP cả hai → `_v{N}_{YYYY-MM-DD}`**
Ví dụ: `step3-tcd_v1_2026-06-25_C360_dashboard-su-kien-truyen-hinh.md`

---

## 2. Bảng mapping ĐỔI TÊN / DI CHUYỂN (tài liệu workflow)

| # | File/Đường dẫn CŨ | File/Đường dẫn MỚI | Trạng thái |
|---|---|---|---|
| 1 | `common/processes/knowledge-pipeline/QC_AI_Workflow_Lakehouse_v1.md` | `core/pipeline/_archive/qc-workflow_v1_lakehouse_origin.md` | ✅ ĐÃ COPY. Bản gốc ở `common/` GIỮ NGUYÊN. |
| 2 | `data/processed/QC_AI_WORKFLOW_v3.md` | `core/pipeline/qc-workflow_core_v3_2026-06-25.md` | ✅ ĐÃ TẠO (promote). Bản cũ ở `data/processed/` GIỮ NGUYÊN. |
| 3 | `data/processed/review_QC_AI_WORKFLOW_v3.md` | (giữ tại `data/processed/` làm bản tra cứu chính) | ✅ KEEP. Không nhân bản. |
| 4 | `data/processed/QC_AI_WORKFLOW_v2_2 (monitor comment).md` | — | ✅ KEEP. Lịch sử trung gian. |
| 5 | `data/processed/excel-md/QC_AI_Workflow_Lakehouse_review_v0.md` | `projects/LKH/knowledge/review_v0_LKH_workflow-lakehouse.md` (pointer) | ✅ ĐÃ TẠO pointer. Bản gốc GIỮ NGUYÊN. |

---

## 3. Mapping + DI CHUYỂN JOB LAKEHOUSE (job đầu tiên đã DONE)

> 🟢 ĐỢT 2: Monitor duyệt di chuyển + đổi tên thật. Toàn bộ artifact job LKH đã MOVE từ `jobs/LKH_...`
> sang `projects/LKH/jobs/LKH_Update-UI-common-rule-sprint-14/` với tên mới theo quy ước.
> Folder `b4_checklist` đổi thành `b4_checkpoint` theo core mới.

| # | File CŨ (tại `jobs/LKH_Update-UI-common-rule-sprint-14/`) | Tên + vị trí MỚI (tại `projects/LKH/jobs/LKH_Update-UI-common-rule-sprint-14/`) | Trạng thái |
|---|---|---|---|
| J1 | `00_meta.md` | `00_meta_v1_2026-06-19_LKH_update-ui-common-rule-sprint-14.md` | ✅ MOVED |
| J2 | `b1_extract/b1_extract.md` | `b1_extract/b1-extract_v1_2026-06-19_LKH_update-ui-common-rule-sprint-14.md` | ✅ MOVED |
| J3 | `b1_extract/b1_extract_v2.md` | `b1_extract/b1-extract_v2_2026-06-19_LKH_update-ui-common-rule-sprint-14.md` | ✅ MOVED |
| J4 | `b1_extract/b1_extract_supplement.md` | `b1_extract/b1-extract-supplement_v1_2026-06-19_LKH_update-ui-common-rule-sprint-14.md` | ✅ MOVED |
| J5 | `b1_extract/b1_extract_supplement_v2.md` | `b1_extract/b1-extract-supplement_v2_2026-06-19_LKH_update-ui-common-rule-sprint-14.md` | ✅ MOVED |
| J6 | `b2_analysis/step1_breakdown.md` | `b2_analysis/step1-breakdown_v1_2026-06-19_LKH_update-ui-common-rule-sprint-14.md` | ✅ MOVED |
| J7 | `b2_analysis/step1_breakdown_v2.md` | `b2_analysis/step1-breakdown_v2_2026-06-19_LKH_update-ui-common-rule-sprint-14.md` | ✅ MOVED |
| J8 | `b2_analysis/step1_context.md` | `b2_analysis/step1-context_v1_2026-06-19_LKH_update-ui-common-rule-sprint-14.md` | ✅ MOVED |
| J9 | `b2_analysis/step2_qa.md` | `b2_analysis/step2-qa_v1_2026-06-19_LKH_update-ui-common-rule-sprint-14.md` | ✅ MOVED |
| J10 | `b2_analysis/step2_qa_anwser.md` | `b2_analysis/step2-qa-answer_v1_2026-06-19_LKH_update-ui-common-rule-sprint-14.md` | ✅ MOVED (sửa typo anwser→answer) |
| J11 | `b2_analysis/step2_qa_r2.md` | `b2_analysis/step2-qa_v2_2026-06-19_LKH_update-ui-common-rule-sprint-14.md` | ✅ MOVED (round 2) |
| J12 | `b3_tcd/step3_tcd.md` | `b3_tcd/step3-tcd_v1_2026-06-19_LKH_update-ui-common-rule-sprint-14.md` | ✅ MOVED |
| J13 | `b4_checklist/step4_checklist.md` | `b4_checkpoint/step4-checkpoint_v1_2026-06-19_LKH_update-ui-common-rule-sprint-14.md` | ✅ MOVED (folder→checkpoint) |
| J14 | `b4_testcase/step4_tc.md` | `b4_testcase/step4-tc_v1_2026-06-19_LKH_update-ui-common-rule-sprint-14.md` | ✅ MOVED |
| J15 | `input/customer-description.md` | `input/customer-description.md` (giữ tên — file input gốc) | ✅ MOVED |
| J16 | `input/figma-url.txt` | `input/figma-url.txt` (giữ tên — file input gốc) | ✅ MOVED |

> Folder cũ `jobs/LKH_Update-UI-common-rule-sprint-14/` sau khi move hết file con sẽ rỗng. Folder rỗng `jobs/` giữ lại theo yêu cầu Monitor.

---

## 4. File MỚI được tạo

| # | Đường dẫn MỚI | Trạng thái |
|---|---|---|
| N1 | `core/pipeline/qc-workflow_core_v3_2026-06-25.md` | ✅ ĐÃ TẠO |
| N2 | `projects/_CHANGELOG_file-rename-mapping.md` | ✅ File này |
| N3 | `projects/C360/project-config.json` | ✅ ĐÃ TẠO (chờ Monitor điền giá trị thật) |
| N4 | `projects/C360/jobs/C360_Dashboard-Su-Kien-Truyen-Hinh/00_meta_v1_...md` | ✅ ĐÃ TẠO |
| N5 | `projects/LKH/knowledge/pipeline-summary_v1_2026-06-19_LKH_...md` | ✅ ĐÃ TẠO |
| N6 | `projects/LKH/knowledge/kaizen_v1_2026-06-19_LKH_...md` | ✅ ĐÃ TẠO |
| N7 | `projects/LKH/knowledge/review_v0_LKH_workflow-lakehouse.md` | ✅ ĐÃ TẠO (pointer) |
| N8 | `projects/LKH/project-config.json` | ✅ ĐÃ COPY từ `common/config/project-config.json` |

---

## 5. Mục 5 cũ — TRẠNG THÁI HOÀN THÀNH (đợt 2: 2026-06-25)

| Việc | Trạng thái trước | Trạng thái nay |
|---|---|---|
| 1. Copy file v1 gốc vào `core/pipeline/_archive/` | Treo | ✅ ĐÃ LÀM (mục 2 #1) |
| 2. Đổi tên thật các artifact job LKH | Treo | ✅ ĐÃ LÀM (mục 3, 16 file) |
| 3. Di chuyển `jobs/LKH_...` vào `projects/LKH/jobs/` | Treo | ✅ ĐÃ LÀM (mục 3) |
| 4. Copy config LKH vào `projects/LKH/` | Treo | ✅ ĐÃ LÀM (mục 4 #N8). Bản gốc `common/config/` GIỮ NGUYÊN để pipeline cũ không gãy. |

> Tất cả thực hiện trực tiếp trong repo. File gốc/bản sao tham chiếu đều GIỮ NGUYÊN nội dung — chỉ di chuyển/đổi tên/copy, không sửa nội dung bên trong bất kỳ file nào.
