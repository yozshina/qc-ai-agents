# B1 Extract — Bổ sung (sau Q&A Round 1)
# LKH_Update-UI-common-rule-sprint-14

**Ngày:** 2026-06-19
**Mục đích:** Bổ sung data từ Q&A answers + cần extract thêm từ Figma

---

## 1. COLOR TOKENS BỔ SUNG (từ Q&A + Ant Design standard)

### Character tokens (Ant Design standard opacity-based)

| Token | Hex / Opacity | Mô tả sử dụng |
|---|---|---|
| Character/Title .85 | **rgba(0,0,0,0.85)** | Input label, Breadcrumb active text, text chính trên nền trắng |
| Character/Primary .85 | **rgba(0,0,0,0.85)** | Footer "Autolake" text |
| Character/Secondary .45 | **rgba(0,0,0,0.45)** | Footer "Copyright ©️ 2026..." text |
| Polar Green/1 | **#F6FFED** | Tag/Badge background |
| Polar Green/3 | **#B7EB8F** | Tag/Badge text color |

> ⚠️ Character tokens là Ant Design standard. Cần verify trong Figma xem có override không.

---

## 2. COMPONENT SPECS BỔ SUNG (từ Q&A confirmed)

### 2.1 Tag / Badge
| Thuộc tính | Giá trị |
|---|---|
| Padding | Top 1px, Right 8px, Bottom 1px, Left 8px |
| Border radius | **16px** |
| Background | Polar Green/1 = **#F6FFED** |
| Text color | Polar Green/3 = **#B7EB8F** |

### 2.2 Footer
| Thuộc tính | Giá trị |
|---|---|
| Kích thước | 1440 × 66.18px |
| Background | Conditional/page-background = **#F0F2F5** |
| Font | Roboto 400 Regular |
| Size / Line height | **12px / 16px** |
| Letter spacing | 0% |
| Text "Autolake" | Character/Primary .85 = rgba(0,0,0,0.85) |
| Text "Copyright ©️ 2026 - Developed by Viettel Group" | Character/Secondary .45 = rgba(0,0,0,0.45) |

### 2.3 Breadcrumb
| Thuộc tính | Giá trị |
|---|---|
| Padding | Left 16px, Right 16px |
| Width | Fill theo độ dài text |
| Height | Fixed (px — **cần extract Figma**) |
| Active background | Conditional/header-background = **#FFFFFF** |
| Text color | Character/Title .85 = rgba(0,0,0,0.85) |
| Icon/ảnh | Không cần check |

### 2.4 Button label typography
| Thuộc tính | Giá trị |
|---|---|
| Font | Roboto |
| Size | **14px** |
| Weight | **500 (Medium)** |
| Style | Medium |

### 2.5 Input field — Label & Required
| Thuộc tính | Giá trị |
|---|---|
| Label text color | Character/Title .85 = rgba(0,0,0,0.85) |
| Required asterisk (*) color | Dust Red/6 = **#F5222D** |
| Error: border | **#FF4D4F** (Dust Red/5) |
| Error: helptext bên dưới | **#F5222D** (Dust Red/6) |
| Error: label color | KHÔNG đổi (giữ nguyên) |

### 2.6 Icon system
| Thuộc tính | Giá trị |
|---|---|
| Icon set | Ant Design Icons |
| Format | SVG |
| Size chuẩn | **20 × 20px** |

---

## 3. CẦN EXTRACT FIGMA (PENDING)

### 3.1 Button — States đầy đủ
**Node cần navigate:** Local system → Button frame → từng variant
**Cần lấy:** default / hover / active / focused / disabled cho TẤT CẢ button types (Primary, Ghost, Danger, Standard text, Icon circle)

### 3.2 Pagination — "Phân trang"
**Node cần navigate:** Local system → "Phân trang" (theo QA-13)
**Cần lấy:** Layout, height, padding, font, color, active page state, prev/next button style

### 3.3 Breadcrumb height
**Node cần navigate:** Local system → Breadcrumb Item Container
**Cần lấy:** Fixed height px cụ thể

### 3.4 Footnote / Toggle
**Node cần tìm:** Style panel hoặc component sử dụng Footnote/Toggle style
**Cần lấy:** Size, weight, line-height, vùng UI sử dụng

---

## 4. SCOPE CONFIRMED (từ Q&A)

| Mục | Kết quả |
|---|---|
| Platform | Desktop / PC / Laptop only |
| Color mode | Light mode only |
| Login screen | OUT of scope |
| Mobile | OUT of scope |
| Dark mode | OUT of scope |
| Pagination | IN scope |
| Tag/Badge | IN scope |
| Footer | IN scope |
| Breadcrumb | IN scope |
