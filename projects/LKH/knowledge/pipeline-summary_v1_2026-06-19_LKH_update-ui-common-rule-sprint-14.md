# Pipeline Summary — LKH Update UI Common Rule Sprint 14
> File: `pipeline-summary_v1_2026-06-19_LKH_update-ui-common-rule-sprint-14.md`
> Dựng lại từ `00_meta.md` của job (job đã DONE)
> Mục đích: làm "ký ức dự án" để job/CR sau đọc lại nhanh, không phải mở toàn bộ artifact.

---

## Tóm tắt job

| Mục | Nội dung |
|---|---|
| **Project** | LKH (Hệ thống quản lý dữ liệu Lakehouse) |
| **Job** | LKH_Update-UI-common-rule-sprint-14 |
| **Loại** | Update UI — common rule, sprint 14 |
| **Trạng thái** | ✅ DONE — B5 Export Excel hoàn thành |
| **Ngày** | 2026-06-19 |
| **Deliverable** | `KBKT_UI_CommonRule_Sprint14.xlsx` |
| **Quy mô** | 240 TC / 18 nhóm / 2 sheet (Tổng hợp + UI_TC) |

---

## Lịch sử bước

| Bước | Trạng thái |
|---|---|
| B1 → B4 | DONE |
| B5 Export Excel | DONE — 240 TC / 18 nhóm / 2 sheet |

---

## Artifact gốc (vị trí MỚI sau đợt tái cấu trúc 2026-06-25)

> Toàn bộ artifact đã được MOVE từ `jobs/LKH_...` sang `projects/LKH/jobs/LKH_Update-UI-common-rule-sprint-14/`
> với tên mới theo quy ước `_v{N}_{date}_{project}_{job}`. Mapping đầy đủ: xem `projects/_CHANGELOG_file-rename-mapping.md` mục 3.

- `input/customer-description.md`, `input/figma-url.txt`
- `b1_extract/` (4 file: b1-extract v1/v2 + supplement v1/v2)
- `b2_analysis/` (step1-breakdown v1/v2, step1-context v1, step2-qa v1/v2, step2-qa-answer v1)
- `b3_tcd/step3-tcd_v1_...md`
- `b4_checkpoint/step4-checkpoint_v1_...md` (folder đổi từ b4_checklist → b4_checkpoint)
- `b4_testcase/step4-tc_v1_...md`

---

## Để dùng cho CR / regression sau này

- Baseline TC: 240 TC trong file deliverable Excel.
- Khi có CR chạm vào common rule UI sprint này → đọc summary này + CR mới → B2 delta (không re-run từ B0).
- Vùng common rule (header, menu, input, button, icon, data grid) là vùng dùng chung toàn hệ thống → Impact B luôn cần check kỹ.

---

## Ghi chú
> Summary này được dựng SAU khi job DONE, trong đợt tái cấu trúc 2026-06-25. Job gốc chạy theo workflow v1 (Lakehouse), chưa có quy ước version/Q&A-phân-loại của core mới. Giữ nguyên để phản ánh đúng lịch sử.
