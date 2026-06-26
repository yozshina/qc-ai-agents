# Scripts — Convert mọi định dạng → Markdown (đề xuất sau khi search GitHub)
> Trả lời comment Monitor: "cần thêm scripts convert nhiều định dạng sang MD, search GitHub xem có repo nào hỗ trợ, tránh viết nhiều script."

---

## Kết luận search: KHÔNG cần viết nhiều script. Dùng 1 thư viện duy nhất.

**MarkItDown (Microsoft)** — https://github.com/microsoft/markitdown
- MIT license, mã nguồn mở, ~139k sao GitHub (06/2026).
- Chuyển **15+ định dạng** → Markdown trong 1 API: PDF, DOCX, XLSX, PPTX, HTML, CSV, JSON, XML, image, audio, ZIP...
- Không cần GPU. Python ≥ 3.10. ~12 giây / 100 trang.
- Tối ưu cho LLM (giữ cấu trúc heading/table/list, ít token).

> Đây đúng mục tiêu Monitor: "mỗi job chỉ đưa file vào input → convert sang markdown trước → AI đọc markdown". MarkItDown thay thế toàn bộ nhu cầu viết script riêng cho từng định dạng.

---

## Mục tiêu kiến trúc (đúng ý Monitor)

```
Monitor đưa file (pdf/docx/xlsx/pptx...) vào input/
        │
        ▼
[script convert: file → markdown]   ← chạy TRƯỚC
        │
        ▼
Lưu .md vào input/ (hoặc input/_converted/)
        │
        ▼
AI chỉ đọc file .md  ← tiết kiệm token, markdown là tối ưu cho AI ✅
```

**Vì sao markdown tốt nhất cho AI:** giữ cấu trúc ngữ nghĩa (heading/table/list) nhưng bỏ noise định dạng → ít token, dễ parse, ổn định hơn đọc trực tiếp pdf/xlsx nặng.

---

## Cài đặt (đề xuất — CHỜ Monitor duyệt trước khi cài)

```bash
pip install "markitdown[all]"
```

## Script wrapper đề xuất (chưa tạo file thật — chờ Monitor duyệt)
`common/scripts/convert/to_markdown.py`:
```python
# Convert bất kỳ file nào sang markdown
from markitdown import MarkItDown
import sys, pathlib

md = MarkItDown(enable_plugins=False)
src = pathlib.Path(sys.argv[1])
result = md.convert(str(src))
out = src.with_suffix(".md")
out.write_text(result.text_content, encoding="utf-8")
print(f"✅ {src.name} → {out.name}")
```
Dùng: `python to_markdown.py input/yeu-cau.docx` → sinh `input/yeu-cau.md`.

---

## So sánh các lựa chọn khác (tham khảo)
| Thư viện | Định dạng | Ghi chú |
|---|---|---|
| **MarkItDown** (Microsoft) ⭐ khuyến nghị | 15+ | Phổ biến nhất, MIT, không GPU |
| markitdown (conductor-oss) | 12 | Bản port Go nếu muốn binary |
| file2md (ricky-clevi) | pdf/docx/xlsx/pptx | Bản Node.js (hợp nếu giữ hệ JS hiện có) |
| marker (datalab-to) | PDF/PPTX/DOCX/XLSX | Độ chính xác cao, nặng hơn |

> Repo hiện có sẵn 2 script JS (`convert-csv.js`, `convert-excel.js`). Nếu muốn đồng bộ hệ Node → cân nhắc **file2md** thay vì thêm Python. Monitor quyết hướng (Python MarkItDown hay Node file2md).

---

## ⚠️ Trạng thái: ĐỀ XUẤT — chưa cài, chưa tạo script thật
Chờ Monitor chọn: (a) Python MarkItDown, hay (b) Node file2md. Sau khi chọn, AI sẽ tạo script + tích hợp vào quy trình input của mỗi job.
