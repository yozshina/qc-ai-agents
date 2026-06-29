# Core / Kaizen — Lịch sử tiến hóa WORKFLOW
> Nơi lưu vết kaizen của **chính workflow QC AI-Agent** (KHÔNG phải knowledge của dự án/job).
> Đã tái cấu trúc 2026-06-26 theo comment của Monitor.

---

## 1. Dòng tiến hóa workflow (đúng bản chất)

| Version | Nguồn gốc | Diễn giải |
|---|---|---|
| **v1** | Input workflow của **eContract** → AI phân tích → workflow ĐẦU TIÊN → áp dụng cho dự án Lakehouse (job 1) | Workflow sơ khai, gắn liền eContract + LKH job đầu |
| **v2** | Sau job 1 của Lakehouse → AI phân tích để kaizen (tách ra 1 **workflow tổng**) → workflow v2 + workflow cho chính job đó | Bước tổng quát hóa: tách lõi khỏi dự án |
| v3, v4... | Sau mỗi lần Monitor yêu cầu kaizen tiếp | Sinh ra theo đúng giao thức build/comment bên dưới |

> Lưu ý: trước đây tôi đánh nhầm thành "v3". Theo Monitor, bản tổng quát hóa sau job 1 mới đúng là **v2**. Đã sửa.

---

## 2. Cấu trúc thư mục `core/kaizen/`

```
core/kaizen/
├── README_kaizen-workflow.md          ← file này
├── v1/                                ← file liên quan xây workflow ĐẦU TIÊN (eContract → LKH)
│   ├── kaizen-workflow_expect-LKH.md
│   ├── QC_AI_Workflow_Lakehouse_v1-comment-by-monitor.md
│   └── QC_AI_Workflow_Lakehouse_v2.md
└── v2/                                ← file liên quan xây workflow v2 (sau job 1 LKH)
    ├── kaizen-workflow_LKH_Sprint14_update-common-rule-UI_v1_20-06-2026.md
    ├── kaizen-workflow_LKH_Sprint14_update-common-rule-UI_v1_20-06-2026_comment-by-monitor.md
    ├── kaizen-workflow_LKH_Sprint14_update-common-rule-UI_v2_23-06-2026.md
    └── kaizen-workflow_LKH_Sprint14_update-common-rule-UI_v2_24-06-2026_comment-by-monitor.md
```

---

## 3. Giao thức BUILD ↔ COMMENT (quy tắc sinh file kaizen workflow)

> Đây là vòng lặp chuẩn khi kaizen workflow. Áp dụng cho mọi version về sau.

```
[AI build lần đầu]
   → kaizen-workflow_{projID}_{jobID}_v1_{date}.md

[Monitor comment]
   → file giống hệt + hậu tố: ..._v1_{date}+comment-by-monitor.md

[AI build lại sau comment]
   → kaizen-workflow_{projID}_{jobID}_v2_{date}.md

[Monitor comment tiếp] → lặp lại bước trên (v3, v4...)

[Monitor KHÔNG comment nữa ~ "build đi"]
   → kaizen-workflow_{projID}_{jobID}_final_{date}.md
   → ĐỒNG THỜI lưu bản final vào core/pipeline/ với tên:
        QC-AI-AGENTS-workflow_{version}_{date}.md
```

**Quy tắc tên:**
- File trong kaizen: `kaizen-workflow_{projID}_{jobID}_v{N}_{date}.md`
- File Monitor comment: thêm hậu tố `+comment-by-monitor` (hoặc `+comment-by-monitor-{vai-trò}`)
- File final → vào pipeline: `QC-AI-AGENTS-workflow_{version}_{date}.md`

---

## 4. File workflow đang chạy (core/workflow/)

> Khi chạy job mới, **chỉ cần gọi file workflow MỚI NHẤT trong `core/workflow/`**. Không cần đụng kaizen.

- Hiện tại: `core/workflow/QC-AI-AGENTS_WORKFLOW_v2_25-06-2026.md` (bản mới nhất).
- Cách xác định "mới nhất": file có version/ngày cao nhất trong `core/workflow/`.
- Folder `_archive/` đã **BỎ** (theo comment Monitor: đã lưu version qua mỗi kaizen thì archive là thừa).

---

## 5. Kaizen RETROSPECTIVE (đánh giá xuyên nhiều version)

> Thời điểm do **Monitor quyết định** (không cố định 3 hay 5 lần).

- Monitor chỉ định version nào được "bốc đi" để so sánh — có thể là 3-5 version mới nhất, HOẶC v8-v9 rồi nhảy về v1 đầu tiên để đối chiếu.
- File retrospective nằm trong `core/kaizen/{version}/`, tên:
  `kaizen-workflow_retrospective-{tên file workflow được bốc đi}.md`
  *(rút gọn — không nhồi projID+jobID vì tên quá dài; chỉ ghi version liên quan)*
- Bản chất: các file sau `core/workflow/` được lấy ra để kaizen workflow KHÔNG xuất phát từ project/job nữa, mà từ chính các version workflow.

---

## 6. Phân biệt với KNOWLEDGE dự án

> Kaizen WORKFLOW (file này) = cải tiến chính bản quy trình (v1→v2→...), ở `core/kaizen/`.
> KNOWLEDGE dự án = tri thức riêng từng dự án (flow map, vùng ảnh hưởng, điểm gãy logic, bài học job), ở `projects/{id}/knowledge/`. Hai thứ tách riêng — xem `projects/_README_kien-truc-projects.md`.
