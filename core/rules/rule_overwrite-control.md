# Rule — Overwrite Control (Ghi đè có kiểm soát)
> Trạng thái: 🔲 CHƯA TÁCH (nội dung ở `core/pipeline/qc-workflow_core_v3_2026-06-25.md` §07)

## Mục đích
Bảo vệ baseline: AI không bao giờ tự ghi đè; mọi thay đổi qua tô màu → Monitor duyệt từng dòng.

## Nội dung cần có (gợi ý)
- Baseline = bản artifact Monitor confirm gần nhất.
- Quy trình: sinh output mới → so baseline → tô màu diff → CHỜ DUYỆT → Monitor xóa màu = confirm → AI mới ghi.
- Màu: 🟡 #FFF2CC sửa / 🟢 #E2EFDA mới / 🔴 #FFE6E6 obsoleted.
- Ghi chú review R-19 (chưa áp dụng): thêm trạng thái màu thứ 4 "DEFERRED" cho dòng Monitor hoãn quyết.

## Liên kết
- Workflow core: §07
