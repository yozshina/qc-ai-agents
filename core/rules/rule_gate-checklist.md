# Rule — Gate Checklist
> Trạng thái: 🔲 CHƯA TÁCH (nội dung ở `core/pipeline/qc-workflow_core_v3_2026-06-25.md` §08)

## Mục đích
Điều kiện PASS/FAIL của 6 gate — chốt chặn để AI không "sinh một mạch rồi tin luôn".

## Nội dung cần có (gợi ý)
- Gate 0 — Input & phân loại: input truy cập OK + loại ticket confirm.
- Gate 1 — Extract: đủ 7 hạng mục + Monitor confirm.
- Gate 2 — Analysis + Q&A: 100% Q&A CRITICAL closed.
- Gate 3 — TCD + Risk: coverage không trắng + risk confirm.
- Gate 4a — B4-before: checklist/skeleton confirm (Lightweight bỏ qua).
- Gate 4b — TC + Diff: TC executable + diff duyệt từng dòng.
- Mỗi gate: điều kiện PASS, cách kiểm, hành động nếu FAIL.

## Liên kết
- Workflow core: §08
- Liên quan Trust Level: gate có thể bypass theo §00 (Level 1/2).
