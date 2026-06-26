#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
to_markdown.py — Convert mọi định dạng (pdf, docx, xlsx, pptx, csv, html, image...) sang Markdown.
Dùng thư viện MarkItDown (Microsoft). Đặt tại common/scripts/to-markdown/.

MỤC TIÊU: mỗi job chỉ cần đưa file vào input/ → chạy script này → AI đọc bản .md (tiết kiệm token).

CÁCH DÙNG (job chỉ CALL lại, không sửa script):
    # Convert 1 file → tạo file .md cùng tên, cùng thư mục:
    python common/scripts/to-markdown/to_markdown.py "projects/LKH/jobs/Sprint 14/update-common-rule-UI/input/yeu-cau.docx"

    # Convert cả thư mục input → sinh .md cho mọi file hỗ trợ:
    python common/scripts/to-markdown/to_markdown.py "projects/LKH/jobs/Sprint 14/update-common-rule-UI/input"

    # Convert vào thư mục con _converted/ (giữ input gốc sạch):
    python common/scripts/to-markdown/to_markdown.py "<đường-dẫn>" --out-subdir _converted

NGUYÊN TẮC AN TOÀN (theo core/LUAT_giao-thuc-xoa-va-ghi-de.md):
    - Script CHỈ tạo file .md mới. KHÔNG xóa, KHÔNG sửa file gốc.
    - Nếu file .md đích đã tồn tại: BỎ QUA (skip), trừ khi truyền --overwrite.
    - Không đụng tới bất kỳ file/thư mục nào ngoài đường dẫn được chỉ định.
"""

import sys
import argparse
from pathlib import Path

SUPPORTED = {".pdf", ".docx", ".doc", ".xlsx", ".xls", ".pptx", ".ppt",
             ".csv", ".tsv", ".html", ".htm", ".json", ".xml", ".txt",
             ".png", ".jpg", ".jpeg", ".epub", ".zip"}


def get_converter():
    try:
        from markitdown import MarkItDown
    except ImportError:
        sys.exit(
            "❌ Chưa cài MarkItDown. Chạy: pip install \"markitdown[all]\"\n"
            "   (xem common/scripts/to-markdown/requirements.txt)"
        )
    return MarkItDown(enable_plugins=False)


def convert_one(md, src: Path, out_dir: Path, overwrite: bool) -> str:
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / (src.stem + ".md")
    if out_path.exists() and not overwrite:
        return f"⏭️  Bỏ qua (đã có): {out_path.name}"
    try:
        result = md.convert(str(src))
        out_path.write_text(result.text_content, encoding="utf-8")
        return f"✔ {src.name} → {out_path.name}"
    except Exception as e:
        return f"❌ Lỗi {src.name}: {e}"


def main():
    ap = argparse.ArgumentParser(description="Convert file(s) sang Markdown bằng MarkItDown.")
    ap.add_argument("path", help="Đường dẫn 1 file hoặc 1 thư mục cần convert.")
    ap.add_argument("--out-subdir", default=None,
                    help="Tên thư mục con để chứa .md (vd: _converted). Mặc định: cùng chỗ file gốc.")
    ap.add_argument("--overwrite", action="store_true",
                    help="Ghi đè file .md nếu đã tồn tại (mặc định: bỏ qua).")
    args = ap.parse_args()

    target = Path(args.path)
    if not target.exists():
        sys.exit(f"❌ Không tìm thấy: {target}")

    md = get_converter()

    if target.is_file():
        files = [target]
        base_dir = target.parent
    else:
        files = [f for f in sorted(target.iterdir())
                 if f.is_file() and f.suffix.lower() in SUPPORTED]
        base_dir = target
        if not files:
            sys.exit(f"⚠️ Không có file định dạng hỗ trợ trong: {target}")

    out_dir = (base_dir / args.out_subdir) if args.out_subdir else base_dir

    print(f"🚀 Convert {len(files)} file → {out_dir}")
    for f in files:
        print("  " + convert_one(md, f, out_dir, args.overwrite))
    print("🎉 Hoàn tất.")


if __name__ == "__main__":
    main()
