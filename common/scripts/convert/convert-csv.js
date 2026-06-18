const fs = require("fs");
const path = require("path");

// ===== CONFIG =====
const inputDir = path.join(__dirname, "../../../data/raw/excel");
const outputDir = path.join(__dirname, "../../../data/processed/excel-md");

// ===== ensure output folder exists =====
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// ===== recursive scan files =====
function getAllFiles(dir) {
  let results = [];

  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath));
    } else {
      results.push(filePath);
    }
  });

  return results;
}

// ===== convert CSV -> Markdown =====
function convertCSVtoMD(filePath) {
  
  let content = fs.readFileSync(filePath, "utf-8");
  // remove BOM nếu có
  if (content.charCodeAt(0) === 0xFEFF) {
  content = content.slice(1);
  }

  console.log(`📄 Processing: ${filePath}`);
  console.log("👉 File size:", content.length);

  const rows = content.split("\n");

  let md = `# Converted from ${path.basename(filePath)}\n\n`;

  rows.forEach((line, index) => {
    if (!line.trim()) return;

    // clean line
    let cleaned = line
      .replace(/,+/g, ",")   // remove duplicate commas
      .replace(/,+$/, "")    // remove trailing commas
      .trim();

    if (cleaned) {
      md += `- ${cleaned.replace(/,/g, " | ")}\n`;
    }
  });

  const fileName = path.basename(filePath, path.extname(filePath)) + ".md";
  const outputPath = path.join(outputDir, fileName);

  fs.writeFileSync(outputPath, md, "utf-8");

  console.log(`✅ Saved: ${outputPath}\n`);
}

// ===== MAIN =====
function run() {
  console.log("🚀 Starting CSV -> MD conversion...\n");

  if (!fs.existsSync(inputDir)) {
    console.error("❌ Input folder not found:", inputDir);
    return;
  }

  const files = getAllFiles(inputDir);

  console.log("📂 Found files:");
  console.log(files, "\n");

  let count = 0;

  files.forEach((file) => {
    if (file.endsWith(".csv")) {
      convertCSVtoMD(file);
      count++;
    }
  });

  if (count === 0) {
    console.warn("⚠️ No CSV files found to convert!");
  } else {
    console.log(`🎉 Done! Converted ${count} file(s).`);
  }
}

run();