# QC AI-Agents

> Bộ quy trình QC tự động hóa bằng AI agent — "AGI cho QC": một workflow tổng áp dụng cho nhiều dự án, mỗi dự án có "ký ức" riêng.

## 🚀 Bắt đầu 1 job mới → đọc `HUONG-DAN-GOI-JOB.md`
Cách ra lệnh cho AI (mẫu Input/Task/Bối cảnh/Target/Tool) và cơ chế **"gọi gì chạy nấy"** nằm ở `HUONG-DAN-GOI-JOB.md`. Đây là file cần đọc đầu tiên.

## Cấu trúc repo (thực tế)

```
qc-ai-agents/
├── README.md                         ← file này
├── HUONG-DAN-GOI-JOB.md              ← cách gọi job + công tắc Tool
│
├── core/                             ← LÕI: không phụ thuộc dự án
│   ├── workflow/                     ← Workflow đang chạy — gọi bản MỚI NHẤT
│   │   ├── QC-AI-AGENTS_WORKFLOW_v1_19-01-2026.md
│   │   └── QC-AI-AGENTS_WORKFLOW_v2_25-06-2026.md   ← bản mới nhất hiện tại
│   ├── rules/                        ← Rule chi tiết (impact, risk, gate, qa, tc...)
│   ├── kaizen/                       ← Lịch sử tiến hóa workflow
│   │   ├── v1/                       ← workflow đầu tiên (eContract → LKH)
│   │   └── v2/                       ← kaizen sau job 1 LKH (tách workflow tổng)
│   ├── reference-workflow/           ← Tài liệu tham chiếu (Plan Test fresher: excel + markdown)
│   └── LUAT_giao-thuc-xoa-va-ghi-de.md  ← LUẬT an toàn: xóa/ghi đè có kiểm soát
│
├── projects/                         ← KÝ ỨC từng dự án
│   ├── _README_kien-truc-projects.md ← giải thích kiến trúc core vs project
│   ├── LKH/   (project-config.json + knowledge/ + jobs/)
│   └── C360/  (project-config.json + knowledge/ + jobs/)
│
├── common/
│   └── scripts/
│       ├── to-markdown/              ← script convert đa định dạng → md (MarkItDown)
│       └── convert/                  ← script JS cũ (csv/excel/txt → md)
│
├── node_modules/  ·  package.json    ← phụ thuộc Node cho script JS
```

## Hai lớp kiến trúc
- **`core/`** = "bộ não": workflow + rule, độc lập dự án. Job nào cũng dùng chung.
- **`projects/{id}/`** = "ký ức dự án": config + knowledge tích lũy + jobs. Riêng từng dự án.

Chi tiết: `projects/_README_kien-truc-projects.md`.

## Các file hướng dẫn quan trọng
- Cách gọi job: `HUONG-DAN-GOI-JOB.md`
- Workflow đang chạy: `core/workflow/` (bản version/ngày mới nhất)
- LUẬT xóa/ghi đè (BẮT BUỘC): `core/LUAT_giao-thuc-xoa-va-ghi-de.md`
- Tiến hóa workflow: `core/kaizen/README_kaizen-workflow.md`
- Kiến trúc project: `projects/_README_kien-truc-projects.md`
- Convert input → markdown: `common/scripts/to-markdown/README.md`

## Quy ước đặt tên file
- Artifact job: `{step}_v{N}_{YYYY-MM-DD}_{project-id}_{job-id}.{ext}`
- Workflow trong core/workflow: `QC-AI-AGENTS_WORKFLOW_v{N}_{dd-MM-yyyy}.md`
- Kaizen workflow: `kaizen-workflow_{projID}_{job}_v{N}_{date}.md` (+`comment-by-monitor` nếu là bản Monitor comment)

## Nguyên tắc an toàn (tóm tắt — chi tiết ở LUAT)
- AI **không có khả năng xóa vĩnh viễn** (công cụ không hỗ trợ). Khi cần xóa: soft-delete, Monitor xóa thật.
- AI **không tự ghi đè** file cũ/baseline khi chưa được Monitor confirm.
- Mọi quyết định gate, OBSOLETED, ghi đè → thuộc về Monitor.

## Vai trò
- **AI Agent:** đọc, phân tích, sinh artifact theo workflow khi được gọi; không tự quyết, không tự xóa, không ghi đè baseline.
- **Monitor (Senior Tester):** gác mọi gate, duyệt output, ra quyết định cuối.
