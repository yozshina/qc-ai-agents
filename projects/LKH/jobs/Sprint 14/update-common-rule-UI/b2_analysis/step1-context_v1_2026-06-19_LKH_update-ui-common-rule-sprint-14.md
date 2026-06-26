# B2 — Step 1: Context Snapshot
# LKH_Update-UI-common-rule-sprint-14

**Ngày:** 2026-06-19

---

## Hệ thống đã đọc / nguồn tham chiếu

| Mục | Nguồn đã đọc | Liên quan scope |
|---|---|---|
| Figma file | `Dk7KnsNNVmPAJKT0VmmOv5` — "Hệ thống quản lý dữ liệu Lakehouse" | Toàn bộ |
| Figma node | `179603-8217` — Frame "Local system" (màu xanh) | Design tokens chính |
| Figma page | "Colors" — Ant Design palette 120 colors | Color system |
| Figma page | "Autolake (update)" — Layer panel + Styles panel | Typography, component list |
| Customer description | `input/customer-description.md` | Scope & yêu cầu KH |
| QC Workflow | `QC_AI_Workflow_Lakehouse_v1.md` | Quy trình |

## Design system snapshot

| Mục | Giá trị confirmed |
|---|---|
| Design system | Ant Design (WDS) |
| Font | Roboto |
| Color mode | Light mode (default) |
| Page background | #F0F2F5 |
| Primary color | #1677FF (Primary/6) |
| Primary hover | #096DD9 (Primary/7) |
| Error color | #FF4D4F (Dust Red/5) |
| Danger fill | #F5222D (Dust Red/6) |
| Text primary | #262626 (Neutral/10) |
| Text secondary | #8C8C8C (Neutral/7) |
| Border default | #D9D9D9 (Neutral/5) |

## Các frame/page quan sát được trong Figma

| Frame/Layer | Ghi chú |
|---|---|
| Local system | Frame chính — chứa tất cả common components |
| Autolake (update) | Page đang active — production UI |
| Colors | Ant Design color palette page |
| Button, Typography | Sub-pages trong General section |
| Sign-In-Form-Desktop-Layout-1440 | Màn hình Login — có trong layer |
| Glass Effect Login Page - Original | Màn hình Login alternative |
| Metadata technical (×3) | Technical metadata frames |
| image 1–17 | Screenshot/image frames |

## Phạm vi job đã xác định

- **Trong scope:** Input, Button, Table/Data Grid, Modal, Header/Navigation, Typography, Color system, Page background, Spacing, Radius, Breadcrumb, Tag, Footer
- **Chưa rõ scope:** Mobile (Ant Design Mobile có trong Figma), Dark mode (có Colors dark page), Footnote/Toggle size cụ thể
- **Ngoài scope:** Execution, bug tracking, automation (theo D2)
- **Đặc biệt:** Đây là job đầu tiên sinh common rule → output = baseline mới cho tất cả job UI sau
