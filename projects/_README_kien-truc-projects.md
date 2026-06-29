# Projects — Kiến trúc & vai trò `projects/{id}/`

> Giải thích mô hình 2 lớp: `core/` (bộ não chung) vs `projects/{id}/` (ký ức riêng dự án).

---

## Mô hình AGI 2 lớp

```
        ┌─────────────────────────────────────────┐
        │   core/  =  "BỘ NÃO" (workflow tổng)    │
        │   Quy trình B0→B5, rule, gate.          │
        │   KHÔNG biết LKH hay C360 là gì.        │
        │   Áp dụng chung mọi dự án.               │
        └────────────────┬────────────────────────┘
                         │ áp dụng + chuyên biệt hóa
        ┌────────────────▼────────────────────────┐
        │   projects/{id}/  =  "KÝ ỨC DỰ ÁN"      │
        │   - project-config.json: tham số dự án  │
        │   - knowledge/: tri thức TÍCH LŨY        │
        │   - jobs/: artifact từng job             │
        │   KHÔNG chứa lại workflow/pipeline.       │
        └─────────────────────────────────────────┘
```

`knowledge/` **không chứa workflow** — nó chứa thứ workflow tổng không thể biết trước: tri thức riêng tích lũy của dự án.

---

## Cấu trúc 1 dự án (thực tế hiện tại)

```
projects/{id}/
├── project-config.json          ← tham số dự án: domain, glossary, impact_map, risk,
│                                   figma, input_preprocessing (bật/tắt convert), agent_rules
├── knowledge/                   ← ký ức dự án (lớn dần qua từng job)
│   ├── {id}-system-knowledge.md ← tri thức hệ thống dài hạn (LKH có)
│   ├── domain-knowledge_{id}.md ← glossary + đặc thù nghiệp vụ + flow map
│   └── {Sprint}/{job}/          ← bản ghi từng job
│       └── job-record_{...}.md  ← 1 FILE GỘP/job (không tách rời nhiều file)
└── jobs/                        ← artifact pipeline từng job
    └── {Sprint}/{job}/
        ├── 00_meta_...md
        ├── input/   (figma.md + customer-description.md...)
        ├── b1_extract/  b2_analysis/  b3_tcd/  b4_checkpoint/  b4_testcase/
        └── ...
```

> **Nguyên tắc knowledge gọn:** mỗi job DONE → **1 file `job-record`** (gộp tóm tắt + bài học + trỏ artifact), KHÔNG tách 3-4 file rời để tránh rác và khó quản lý sau vài job.

---

## `knowledge/` chứa gì?

| Loại | Tên | Vai trò |
|---|---|---|
| **System knowledge** | `{id}-system-knowledge.md` | Tri thức hệ thống dài hạn của dự án |
| **Domain knowledge** | `domain-knowledge_{id}.md` | Glossary, đặc thù nghiệp vụ, flow map — lớn dần, feed ngược vào config |
| **Job record** | `{Sprint}/{job}/job-record_{...}.md` | 1 file/job: tóm tắt job + impact + baseline + bài học |

> core = "cách làm". knowledge = "đã học được gì khi làm dự án này". Bổ sung nhau, không trùng.

---

## Tên file trong jobs/ — theo logic comment/version (giống core/kaizen)
- Artifact: `{step}_v{N}_{date}_{project}_{job}.md`
- Bản Monitor comment: thêm hậu tố `_comment-by-monitor` (xem `core/kaizen/README_kaizen-workflow.md`).
- Áp dụng nhất quán cho b1_extract, b2_analysis, b3_tcd, b4_*.

---

## Testcase template của dự án
Mỗi dự án có template TC riêng (đúng template khách cung cấp, vd Viettel KBKT cho LKH). Job sau BẮT BUỘC sinh TC đúng template đó. Vị trí: trong `projects/{id}/` (templates của dự án). Lý do: TC sai template làm Monitor mất công sửa tay.

---

## Trạng thái hiện tại
- **LKH:** đã chạy 1 job (Sprint 14, 240 TC) → có `job-record`, `domain-knowledge`, `system-knowledge`.
- **C360:** chưa chạy job nào → knowledge mới có `domain-knowledge` (mẫu, điền dần). Đúng trạng thái.
