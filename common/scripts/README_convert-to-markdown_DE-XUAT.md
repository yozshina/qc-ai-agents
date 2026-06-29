# Scripts — Convert mọi định dạng → Markdown
> Trạng thái: ✅ ĐÃ CHỐT & ĐÃ TRIỂN KHAI (không còn là đề xuất).
> Hướng dẫn dùng chính thức: **`common/scripts/to-markdown/README.md`**. File này chỉ lưu lại bối cảnh quyết định.

---

## Đã chốt: dùng MarkItDown (Microsoft)
https://github.com/microsoft/markitdown — MIT, mã nguồn mở, 1 thư viện cho 15+ định dạng (PDF, DOCX, XLSX, PPTX, HTML, CSV, JSON, image, ZIP...). Python ≥ 3.10, không cần GPU. Tối ưu token cho LLM.

→ Không phải viết nhiều script riêng. 1 thư viện xử lý tất cả.

## Script thật đã tạo
- `common/scripts/to-markdown/to_markdown.py` — convert 1 file hoặc cả thư mục input.
- `common/scripts/to-markdown/requirements.txt` — `markitdown[all]`.
- `common/scripts/to-markdown/README.md` — hướng dẫn dùng (đọc file này).

## Cài đặt
```bash
pip install "markitdown[all]"
```

## Mục tiêu kiến trúc (đã đạt)
```
Đưa file (pdf/docx/xlsx/pptx...) vào input/ của job
   → CALL to_markdown.py → sinh .md cạnh file gốc (không xóa/sửa gốc)
   → AI chỉ đọc .md → tiết kiệm token
```
Markdown tối ưu cho AI: giữ cấu trúc (heading/table/list), bỏ noise, ít token, ổn định hơn đọc pdf/xlsx nặng.

## Bật/tắt theo từng dự án & từng job
- **Theo dự án:** `projects/{id}/project-config.json` → block `input_preprocessing.convert_to_markdown`.
- **Theo job:** ghi `convert-md` trong trường `Tool:` của lệnh (xem `HUONG-DAN-GOI-JOB.md`). Không gọi → không convert. File đã là `.md` → bỏ qua.

## Script JS cũ trong common/scripts/convert/
`convert-csv.js`, `convert-excel.js`, `convert-txt-to-md.js` hardcode đường dẫn theo cấu trúc CŨ → không còn chạy đúng. Khuyến nghị thay bằng `to-markdown/`. Giữ hay xóa: Monitor quyết (chưa đụng).
