# to-markdown — Convert mọi định dạng sang Markdown

> Script dùng chung cho mọi project/job. **Tại job chỉ CALL lại, không sửa script này.**

## Cài đặt (1 lần duy nhất)
```bash
pip install "markitdown[all]"
# hoặc
pip install -r common/scripts/to-markdown/requirements.txt
```

## Dùng tại job (chỉ call)
```bash
# Convert 1 file → tạo .md cùng tên, cùng thư mục input
python common/scripts/to-markdown/to_markdown.py "projects/LKH/jobs/Sprint 14/update-common-rule-UI/input/yeu-cau.docx"

# Convert cả thư mục input
python common/scripts/to-markdown/to_markdown.py "projects/LKH/jobs/Sprint 14/update-common-rule-UI/input"

# Convert vào thư mục con _converted/ để giữ input gốc sạch
python common/scripts/to-markdown/to_markdown.py "<đường-dẫn-input>" --out-subdir _converted
```

## Quy trình chuẩn mỗi job
```
1. Monitor đưa file (pdf/docx/xlsx/pptx...) vào input/ của job
2. CALL: python common/scripts/to-markdown/to_markdown.py "<input của job>"
3. Script sinh file .md tương ứng
4. AI chỉ đọc file .md → tiết kiệm token
```

## An toàn (theo core/LUAT_giao-thuc-xoa-va-ghi-de.md)
- Script CHỈ tạo file .md mới. KHÔNG xóa, KHÔNG sửa file gốc.
- File .md đã tồn tại → BỎ QUA (skip), trừ khi thêm cờ `--overwrite`.
- Không đụng file/thư mục ngoài đường dẫn được truyền vào.

## Định dạng hỗ trợ
pdf, docx, doc, xlsx, xls, pptx, ppt, csv, tsv, html, json, xml, txt, png, jpg, epub, zip.

## Vì sao MarkItDown?
1 thư viện (Microsoft, MIT) cho 15+ định dạng → không cần viết nhiều script riêng. Markdown tối ưu token cho AI. Chi tiết: `common/scripts/README_convert-to-markdown_DE-XUAT.md`.

## Lưu ý về 2 script cũ trong common/scripts/convert/
`convert-csv.js` và `convert-excel.js` hardcode đường dẫn theo cấu trúc CŨ (đã đổi sau tái cấu trúc) → hiện không chạy đúng. Khuyến nghị: thay bằng script Python này. Quyết định giữ/bỏ 2 file JS thuộc về Monitor (chưa đụng).
