# Rule — Test Case Generation
> Trạng thái: 🔲 CHƯA TÁCH (nội dung ở `core/pipeline/qc-workflow_core_v3_2026-06-25.md` §04-B4-after)

## Mục đích
Quy tắc sinh TC chi tiết, chạy được, có kiểm soát reuse/ghi đè.

## Nội dung cần có (gợi ý)
- **1 TC = 1 assertion** (1 property HOẶC 1 state). Không merge nhiều assert.
- Expected result KHÔNG lẫn vào Steps. Tên TC tự mô tả được.
- Quy trình: hỏi path template → mở → re-check format → sinh TC → reuse map → tô màu diff → cờ CHỜ DUYỆT.
- Màu: 🟡 VÀNG=sửa / 🟢 XANH LÁ=mới / 🔴 ĐỎ HỒNG=obsoleted.

## Ghi chú từ review (R-14/R-21, chưa áp dụng — HƯỚNG TƯƠNG LAI QUAN TRỌNG)
Để TC follow được Manual-MCP và Automation: cấu trúc Steps thành ATOMIC (action enum / target / data / assertion_type). Đây là điểm bắc cầu sang execution. Cân nhắc khi làm v3.5.

## Liên kết
- Workflow core: §04-B4-after
- Rule liên quan: `rule_overwrite-control.md`
