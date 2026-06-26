# QC AI-Agents

> Bộ quy trình QC tự động hóa bằng AI agent — "AGI cho QC": một workflow tổng áp dụng được cho nhiều dự án.

## Cấu trúc repo

```
QC-AI-Agents/
├── README.md                  ← file này
├── core/                      ← LÕI: không phụ thuộc dự án
│   ├── pipeline/              ← Workflow đang chạy (gọi bản MỚI NHẤT khi chạy job)
│   ├── rules/                 ← Rule chi tiết tách riêng (impact, risk, gate, qa, tc...)
│   ├── kaizen/                ← Lịch sử tiến hóa CHÍNH workflow
│   │   ├── v1/                ← workflow đầu tiên (eContract → LKH)
│   │   └── v2/                ← kaizen sau job 1 LKH (tách workflow tổng)
│   └── LUAT_giao-thuc-xoa-va-ghi-de.md  ← LUẬT an toàn: xóa/ghi đè có kiểm soát
│
├── projects/                  ← KÝ ỨC từng dự án
│   ├── _README_kien-truc-projects.md
│   ├── _CHANGELOG_*.md        ← lịch sử đổi tên/cấu trúc
│   ├── LKH/                   ← config + knowledge + jobs + templates
│   └── C360/                  ← config + knowledge + jobs + templates
│
├── common/                    ← Tài nguyên dùng chung (scripts). Một số mục chờ dọn — xem _TRASH.
├── data/                      ← Dữ liệu thô/đã xử lý (excel, csv nguồn)
└── _TRASH_cho-monitor-xoa/    ← Rác đã gom + danh sách folder rỗng, chờ Monitor xóa
```

## Bắt đầu từ đâu
- Quy trình đang chạy: `core/pipeline/` (bản mới nhất)
- LUẬT xóa/ghi đè (BẮT BUỘC đọc): `core/LUAT_giao-thuc-xoa-va-ghi-de.md`
- Lịch sử tiến hóa workflow: `core/kaizen/README_kaizen-workflow.md`
- Kiến trúc project & knowledge: `projects/_README_kien-truc-projects.md`
- Việc dọn dẹp đang chờ: `_TRASH_cho-monitor-xoa/_DANH-SACH-CHO-XOA.md`

## Quy ước đặt tên file
- Artifact job: `{loại}_v{N}_{YYYY-MM-DD}_{project-id}_{job-id}.{ext}`
- Kaizen workflow: `kaizen-workflow_{projID}_{jobID}_v{N}_{date}.md` (+`comment-by-monitor` nếu là bản Monitor comment, `final` khi chốt)
- Workflow chốt vào pipeline: `QC-AI-AGENTS-workflow_{version}_{date}.md`

## Nguyên tắc an toàn (tóm tắt)
- AI **không có khả năng xóa vĩnh viễn** — chỉ soft-delete vào `_TRASH`. Monitor là người xóa thật.
- AI **không tự ghi đè** file cũ/baseline khi chưa được Monitor confirm.
- Mọi quyết định gate, OBSOLETED, ghi đè → thuộc về Monitor.

## Vai trò
- **AI Agent:** đọc, phân tích, sinh artifact theo workflow; không tự quyết, không tự xóa, không ghi đè baseline.
- **Monitor (Senior Tester):** gác mọi gate, duyệt output, ra quyết định cuối, xóa thật.
