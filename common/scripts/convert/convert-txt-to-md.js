const fs = require("fs");
const path = require("path");

const inputPath = path.join(
  __dirname,
  "../../../data/raw/txt/knowledge-pipeline_applied_LKH_Update-UI-common-rule-sprint-14_summary_v1.txt"
);

const outputPath = path.join(
  __dirname,
  "../../../data/processed/knowledge-pipeline_applied_LKH_Update-UI-common-rule-sprint-14_summary_v1.md"
);

try {
  // đọc file txt
  const content = fs.readFileSync(inputPath, "utf-8");

  // (optional) format markdown nhẹ nếu cần
  const mdContent = content
    .replace(/\r\n/g, "\n") // normalize line break
    .trim();

  // ghi ra file md
  fs.writeFileSync(outputPath, mdContent, "utf-8");

  console.log("✅ Convert thành công:", outputPath);
} catch (err) {
  console.error("❌ Lỗi:", err);
}