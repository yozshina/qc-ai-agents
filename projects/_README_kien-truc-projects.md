# Projects — Giải thích kiến trúc & vai trò thư mục `knowledge/`

> ⚠️ File này trả lời trực tiếp câu hỏi của Monitor:
> *"Workflow tổng ở core không phụ thuộc project, vậy `projects/{id}/knowledge/` để làm gì? Lưu để đó có tác dụng gì?"*

---

## Câu trả lời ngắn: Đúng là mô hình AGI 2 lớp

Monitor đoán chính xác. Kiến trúc ở đây là:

```
        ┌─────────────────────────────────────────┐
        │   core/  =  "BỘ NÃO" (workflow tổng)    │
        │   Quy trình B0→B5, rule, gate.          │
        │   KHÔNG biết LKH hay C360 là gì.        │
        │   Áp dụng chung mọi dự án.               │
        └────────────────┬────────────────────────┘
                         │ áp dụng + chuyên biệt hóa
        ┌────────────────▼────────────────────────┐
        │   projects/{id}/  =  "KÝ ỨC DỰ ÁN"      │
        │   - project-config.json: tham số dự án  │
        │   - knowledge/: tri thức TÍCH LŨY        │
        │   KHÔNG chứa lại workflow/pipeline.       │
        └─────────────────────────────────────────┘
```

**`knowledge/` KHÔNG chứa workflow/pipeline** (Monitor lo đúng — nếu chứa thì thừa). Nó chứa thứ mà workflow tổng KHÔNG thể biết trước: **tri thức riêng tích lũy được sau mỗi job của dự án đó.**

---

## `knowledge/` chứa gì? (cấu trúc chuẩn — đề xuất)

| Loại file | Tên mẫu | Vai trò | Vì sao KHÔNG để ở core |
|---|---|---|---|
| **Pipeline summary** | `pipeline-summary_v{N}_{date}_{proj}_{job}.md` | "Ký ức" 1 job đã xong: scope, impact, số TC, baseline. Để job/CR sau đọc nhanh, không mở lại toàn bộ artifact. | Gắn chặt job cụ thể của dự án. |
| **Kaizen job** | `kaizen_v{N}_{date}_{proj}_{job}.md` | Bài học sau khi chạy job đó (khác kaizen workflow ở `core/kaizen/`). | Bài học riêng dự án. |
| **Domain knowledge** | `domain-knowledge_{proj}.md` | Glossary mở rộng, đặc thù nghiệp vụ, pattern Q&A lặp lại → feed ngược vào config. | Tri thức riêng dự án, lớn dần theo thời gian. |
| **Regression baseline index** | `regression-index_{proj}.md` | Danh mục TC baseline tái dùng được giữa các job. | Chỉ đúng với dự án đó. |

> **Chốt:** workflow tổng = "cách làm" (ở core). knowledge = "những gì đã học được khi làm dự án này" (ở project). Hai cái bổ sung nhau, không trùng.

---

## Vì sao C360/knowledge đang rỗng?

Vì C360 **chưa chạy job nào xong**. knowledge chỉ sinh ra SAU khi có job DONE → kaizen. Đang rỗng là ĐÚNG trạng thái, không phải lỗi. Khi job "Dashboard Sự kiện Truyền hình" chạy xong B5 → kaizen sẽ sinh file đầu tiên vào đây.

## LKH/knowledge đã có gì?
3 file (pipeline-summary, kaizen, review_v0 pointer) vì LKH đã chạy xong 1 job (240 TC).

---

## Đề xuất bổ sung (chờ Monitor duyệt)
Có nên thêm `domain-knowledge_{proj}.md` ngay từ đầu mỗi dự án (điền dần) thay vì chờ job xong? Lợi: gom glossary + đặc thù nghiệp vụ sớm → giảm Q&A lặp. Đây là đề xuất, chưa tạo.


--------------> Comment <---------------
1. Đề xuất bổ sung (chờ Monitor duyệt)
Có nên thêm `domain-knowledge_{proj}.md` ngay từ đầu mỗi dự án (điền dần) thay vì chờ job xong? Lợi: gom glossary + đặc thù nghiệp vụ sớm → giảm Q&A lặp. Đây là đề xuất, chưa tạo. -> Tạo luôn, đưa ví dụ để người monitor xử lý ngay lập tức

2. LKH/knowledge đã có gì?
3 file (pipeline-summary, kaizen, review_v0 pointer) vì LKH đã chạy xong 1 job (240 TC).
Nếu để như này sẽ là rác sau 2-3 job nữa, sau này người monitor biết đc file nào? AI biết nên đọc cái gì cái nào ko???? cấu trúc lại file xem, job 1 của LKH -> thì chỉ nên lưu lại những gì? (Đề xuất)  Và chỉ cho vào chung 1 file thôi, ko thể tạo thành 3 file được lsao có thể quản lý đc??? File name cũng phải chuẩn chỉ

3. Đi sâu vào trong cấu trúc file của job
+ input: Tương đối đúng ý nhưng tên file cần thay đổi, chỉ cần lưu là figma (vì url sẽ đc lưu vào file project-config), kiểm tra xem 2 file đã lưu đầy đủ thông tin chưa, tất nhiên phải lưu lại để người monitor có thể truy vết lại sau mỗi job, không loại trừ trường hợp nhầm link, sai link, nhầm file chả hạn
+ b1_extract: đúng rồi nhưng tên file lưu lại -> file comment sẽ tương tự logic bên phần core đã được hướng dẫn tại file README_kaizen-workflow.md 
+ áp dung cho b2, b3, b4 cũng như vậy về logic tên file

4. Folder testcase template của mỗi project đâu? Kiến trúc bị kém tắm à?
** QUAN TRỌNG: YÊU CẦU AI AGENTS THỰC THI VIÊT LẠI TESTCASE TEMPLATE THEO TEMPLATE ĐÃ ĐƯỢC NGƯỜI MONITOR CUNG CẤP (quy tắc là đúng cấu trúc 100% và bắt buộc job sau AI phải sinh ra Testcase theo đúng Template đó được) (hiện tại có template testcase của dự án LKH, thực hiện xong lưu thẳng vào folder của dự án LKH để tôi review trước) **
Lý do: Testcase cũ sinh ra sai template, kiến tôi mất thời gian để sửa lại theo đúng template!

5. Folder Common:
+ Tại sao vẫn còn folder config, file project-config -> Có còn cần thiết, nếu ko thực hiện xóa đi tránh rác folder common
+ Tại sao vẫn còn folder processes, và file QC_AI_Workflow_Lakehouse_v1.md trong đó? -> File này đã được lưu lại vào đâu? (đây là file quan trọng, chính là workflow đầu tiên được áp dung cho JOB 1 của LKH). Đã thực hiện theo kiến trúc được comment ở folder README_kaizen-workflow.md hay chưa? Nếu chưa thì thực hiện ngay và kiếm tra kỹ file có bị thay đổi nội dung nếu đã được di chuyển hay ko? Nếu ko còn giá trị gì cũng xóa đi tránh rách chứ???
+ folder scripts tôi cần thêm các scripts để có thể convert nhiều định dạng khác sang MD, thực hiện kiểm tra trên GitHub xem có repo nào mới hỗ trợ đc cái này không, để tránh việc phải tạo nhiều scripts chẳng hạn. Ngoài ra dựa có cấu trúc folder/file đc thiết kế. Làm sao để mỗi dự án, mỗi job tôi chỉ đưa file vào input, thực hiện convert sang markdown trước, lưu lại rồi AI mới đọc file markdown đó. Mục tiêu: Để AI đọc file markdown tránh đốt token vào các định dạng nặng khác và file markdown là tốt nhất cho AI có đúng ko?
+ Folder templates xử lý xong việc ở phần 4 đã comment thì thực hiện xóa đi thôi vì còn tác dụng đâu đúng ko?