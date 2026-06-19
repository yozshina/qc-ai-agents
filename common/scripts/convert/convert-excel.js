const fs = require('fs');
const path = require('path');
// Thư viện đọc excel chuyên dụng
const XLSX = require('xlsx');

function convertExcelToMd() {
    const baseDir = process.cwd();
    
    // Khai báo các đường dẫn thư mục nguồn và đích
    const rawExcelDir = path.join(baseDir, 'data', 'raw', 'excel', 'template-testcase'); 
    const destPath1 = path.join(baseDir, 'data', 'processed', 'excel-md');
    const destPath2 = path.join(baseDir, 'common', 'templates', 'viettel-template-testcase');

    // Tự động tạo thư mục đích nếu chưa có
    if (!fs.existsSync(destPath1)) fs.mkdirSync(destPath1, { recursive: true });
    if (!fs.existsSync(destPath2)) fs.mkdirSync(destPath2, { recursive: true });

    if (!fs.existsSync(rawExcelDir)) {
        console.error(`❌ Không tìm thấy thư mục nguồn: ${rawExcelDir}`);
        return;
    }

    // Đọc danh sách file trong thư mục nguồn và lọc file excel
    const files = fs.readdirSync(rawExcelDir).filter(f => f.endsWith('.xlsx') || f.endsWith('.xls'));

    if (files.length === 0) {
        console.log("⚠️ Không tìm thấy file Excel nào trong thư mục!");
        return;
    }

    console.log(`🚀 Bắt đầu chuyển đổi ${files.length} file dữ liệu sang Markdown...`);

    files.forEach(file => {
        const filePath = path.join(rawExcelDir, file);
        const fileName = path.parse(file).name;

        try {
            // Đọc file excel
            const workbook = XLSX.readFile(filePath);

            workbook.SheetNames.forEach(sheetName => {
                const worksheet = workbook.Sheets[sheetName];
                
                // Chuyển dữ liệu sheet thành mảng JSON 2 chiều (gồm cả header)
                const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                
                if (rows.length === 0) return;

                // Hàm tự động build cấu trúc bảng Markdown từ mảng dữ liệu
                let mdTable = "";
                
                // Lấy dòng đầu làm Header
                const headers = rows[0];
                mdTable += `| ${headers.join(' | ')} |\n`;
                mdTable += `| ${headers.map(() => '---').join(' | ')} |\n`;

                // Duyệt qua các dòng data tiếp theo
                for (let i = 1; i < rows.length; i++) {
                    // Đảm bảo số lượng cột khớp với header để bảng không bị lệch cấu trúc
                    const rowData = Array.from({ length: headers.length }, (_, colIdx) => {
                        const val = rows[i][colIdx];
                        return (val !== undefined && val !== null) ? String(val).replace(/\r?\n/g, '<br>') : '';
                    });
                    mdTable += `| ${rowData.join(' | ')} |\n`;
                }

                // Đặt tên file đầu ra (.md)
                const outFilename = workbook.SheetNames.length > 1 ? `${fileName}_${sheetName}.md` : `${fileName}.md`;

                const fileContent = `### Dữ liệu kịch bản - Sheet: ${sheetName}\n\n${mdTable}`;

                // Ghi đồng thời ra 2 thư mục đích
                fs.writeFileSync(path.join(destPath1, outFilename), fileContent, 'utf-8');
                fs.writeFileSync(path.join(destPath2, outFilename), fileContent, 'utf-8');

                console.log(`  ✔ Đã đồng bộ xong file: ${outFilename}`);
            });
        } catch (error) {
            console.error(`❌ Gặp lỗi khi xử lý file ${file}:`, error.message);
        }
    });

    console.log("🎉 Quá trình Convert và đồng bộ dữ liệu hoàn tất thành công!");
}

// Chạy hàm
convertExcelToMd();