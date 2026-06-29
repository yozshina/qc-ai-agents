# HƯỚNG DẪN GỌI JOB — Cú pháp ra lệnh cho AI Agent
> File quan trọng nhất khi bắt đầu 1 job mới. Đọc file này để biết cách "ra lệnh" cho AI.
> Nguyên tắc cốt lõi: **GỌI GÌ CHẠY NẤY.** AI chỉ làm đúng những gì được gọi trong `tool:`. Không gọi → không tự làm.

---

## 1. Mẫu lệnh chuẩn (copy & điền)

```
* Input: <url Figma / đường dẫn tài liệu / mô tả>. Vùng cần lấy trên Figma: <node-id hoặc mô tả vùng>
* Task: <AI cần làm gì — vd: sinh test case cho tính năng X>
* Bối cảnh: <vd: Xây tính năng ABC mới, kiểm tra UI đã follow common rule chưa>
* Target: <mục tiêu — vd: ra bộ TC đầy đủ theo template Viettel, cover common rule>
* Tool: <danh sách tool, cách nhau bằng dấu +>
```

### Trường `Tool:` — đây là "công tắc" điều khiển AI

| Ghi trong Tool | AI sẽ làm | KHÔNG ghi thì |
|---|---|---|
| `QC-AI-workflow` | Chạy theo workflow QC (B0→B5, gate, Q&A...). Tự lấy bản workflow **mới nhất** trong `core/workflow/`. | KHÔNG chạy workflow. AI xử lý input như yêu cầu thường, không bắt buộc gate/pipeline. |
| `convert-md` | Convert input (pdf/docx/xlsx...) sang markdown TRƯỚC khi đọc, bằng `common/scripts/to-markdown/`. | KHÔNG convert. AI đọc thẳng file gốc. (Nếu input đã là .md thì vốn không cần convert.) |
| `project:LKH` (hoặc `project:C360`) | Nạp `projects/{id}/project-config.json` + knowledge của dự án đó. | AI hỏi lại dự án nào nếu cần config. |

> Có thể kết hợp: `Tool: QC-AI-workflow + convert-md + project:LKH`

---

## 2. Ví dụ thực tế

### Ví dụ A — Job cần CẢ workflow + convert
```
* Input: https://figma.com/.../Lakehouse?node-id=179603-8217 + tài liệu yeu-cau.docx. Vùng Figma: màn Common Rule (node 179603-8217)
* Task: Sinh test case kiểm thử UI common rule
* Bối cảnh: Xây tính năng ABC mới, cần kiểm tra UI đã follow common rule chưa
* Target: Bộ TC đầy đủ theo template Viettel, cover toàn bộ common rule
* Tool: QC-AI-workflow + convert-md + project:LKH
```
→ AI: convert `yeu-cau.docx` → `.md`, nạp workflow mới nhất + config LKH, chạy B0→B5.

### Ví dụ B — Job KHÔNG cần convert (input đã là .md hoặc đọc thẳng)
```
* Input: input/yeu-cau.md (đã là markdown)
* Task: Sinh test case
* Bối cảnh: ...
* Target: ...
* Tool: QC-AI-workflow + project:LKH
```
→ AI: KHÔNG convert (không gọi convert-md), đọc thẳng `.md`, chạy workflow.

### Ví dụ C — KHÔNG dùng workflow (chỉ hỏi nhanh)
```
* Input: file abc.xlsx
* Task: Tóm tắt nội dung file này
* Tool: convert-md
```
→ AI: chỉ convert + tóm tắt. KHÔNG chạy pipeline QC, KHÔNG gate. Vì `Tool:` không có `QC-AI-workflow`.

---

## 3. Logic "gọi gì chạy nấy" (AI phải tuân thủ)

```
Đọc trường Tool: của lệnh
   ├─ Có "QC-AI-workflow"?
   │     CÓ  → nạp core/workflow/ (bản mới nhất) → chạy đúng pipeline + gate
   │     KHÔNG → xử lý như task thường, KHÔNG áp gate/pipeline
   │
   ├─ Có "convert-md"?
   │     CÓ  → file chưa .md → convert sang .md rồi đọc bản .md
   │     KHÔNG → đọc thẳng input gốc (kể cả khi config bật convert — lệnh job ưu tiên hơn)
   │
   └─ Có "project:{id}"?
         CÓ  → nạp projects/{id}/project-config.json + knowledge
         KHÔNG → hỏi lại nếu cần, không tự đoán dự án
```

> **Thứ tự ưu tiên:** Lệnh trong cửa sổ chat (trường `Tool:`) **ưu tiên cao nhất**. Config dự án chỉ là mặc định gợi ý — nếu job không gọi `convert-md` thì dù config có `convert_to_markdown: true` cũng KHÔNG convert. Người ra lệnh kiểm soát từng job.

---

## 4. "Workflow mới nhất" là bản nào?
AI tự xác định bằng cách lấy file có version/ngày cao nhất trong `core/workflow/`.
Hiện tại: **`core/workflow/QC-AI-AGENTS_WORKFLOW_v2_25-06-2026.md`** (v2, 25-06-2026).
Khi có bản mới hơn (v3...), AI tự ưu tiên bản đó — không cần sửa file hướng dẫn này.

---

## 5. Tóm tắt 1 dòng
> **Gọi `QC-AI-workflow`** → chạy quy trình QC. **Gọi `convert-md`** → đổi input sang markdown trước. **Không gọi** → không làm. Đơn giản vậy.
