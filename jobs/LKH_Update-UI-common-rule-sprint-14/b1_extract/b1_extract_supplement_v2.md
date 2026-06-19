# B1 Extract — Bổ sung v2 (sau Q&A Round 1 + Figma re-extract)
# LKH_Update-UI-common-rule-sprint-14

**Ngày:** 2026-06-19
**Nguồn:** Figma re-extract + Q&A answers Monitor

---

## 1. TYPOGRAPHY — ĐẦY ĐỦ (kể cả Footnote & Toggle)

| Style | Variant | Size | Line Height | Weight | Ghi chú |
|---|---|---|---|---|---|
| H1 | medium | 38px | 46px | 500 | |
| H2 | medium | 30px | 40px | 500 | |
| H3 | medium | 24px | 32px | 500 | |
| H3 | regular | 24px | 32px | 400 | |
| H4 | medium | 20px | 28px | 500 | |
| H4 | regular | 20px | 28px | 400 | |
| H5 | regular | 16px | 24px | 400 | |
| H5 | medium | 16px | 24px | 500 | |
| H5 | bold | 16px | 24px | 700 | Header/Menu nav label |
| Body | regular | 14px | 22px | 400 | Base text |
| Body | medium | 14px | 22px | 500 | Button label |
| Body | bold | 14px | 22px | 700 | |
| Body | regular-underline | 14px | 22px | 400 | Link |
| Body | regular-strikethrough | 14px | 22px | 400 | |
| Body | code | 14px | 22px | — | Code |
| **Footnote** | **description** | **10px** | **20px** | — | Caption, helper text nhỏ |
| **Footnote** | **system-monospace** | **12px** | **20px** | — | Monospace |
| **Toggle** | **regular** | **12px** | **20px** | 400 | Toggle switch label |

> **QA-07 & QA-15 — RESOLVED:** Footnote/Toggle là text styles trong Figma Style panel. Chỉ cần validate style tồn tại và render đúng.

---

## 2. BUTTON — VARIANT MATRIX ĐẦY ĐỦ

### 2.1 Button Types (từ layer panel Figma)

**Text/Standard Button types:**
- **Primary** — Filled xanh (#1677FF)
- **Secondary** — (variant của outline/ghost)
- **Gray** — Filled xám
- **Outline** — Viền, transparent fill
- **Outline/Gray** — Outline với màu xám

**Icon Button types (circle 36px):**
- **Primary** — Fill màu (Dust Red/6 = #F5222D cho danger)
- **Ghost/Blue** — Transparent + xanh
- **Secondary** — Variant
- **Gray** — Filled xám
- **Outline** — Viền

### 2.2 States cho tất cả button types

| State | Mô tả |
|---|---|
| **Default** | Trạng thái mặc định |
| **Hover** | Khi di chuột vào |
| **Active** | Khi đang click/pressed |
| **Focused** | Khi được focus (tab/keyboard) |
| **Disabled** | Không tương tác được |

### 2.3 Button variants đầy đủ (từ layer list Figma)

**Text Button (Standard):**

| Tên layer | Type | State |
|---|---|---|
| Primary, Default, Button | Primary | Default |
| Primary, Hover, Button | Primary | Hover |
| Primary, Active, Button | Primary | Active |
| Primary, Focused, Button | Primary | Focused |
| Primary, Disabled, Button | Primary | Disabled |
| Secondary, Default, Button | Secondary | Default |
| Secondary, Hover, Button | Secondary | Hover |
| Secondary, Active, Button | Secondary | Active |
| Secondary, Focused, Button | Secondary | Focused |
| Secondary, Disabled, Button | Secondary | Disabled |
| Gray, Default, Button | Gray | Default |
| Gray, Hover, Button | Gray | Hover |
| Gray, Active, Button | Gray | Active |
| Gray, Focused, Button | Gray | Focused |
| Gray, Disabled, Button | Gray | Disabled |
| Outline, Default, Button | Outline | Default |
| Outline, Hover, Button | Outline | Hover |
| Outline, Active, Button | Outline | Active |
| Outline, Focused, Button | Outline | Focused |
| Outline, Disabled, Button | Outline | Disabled |
| Outline/Gray, Default, Button | Outline/Gray | Default |
| Outline/Gray, Hover, Button | Outline/Gray | Hover |
| Outline/Gray, Active, Button | Outline/Gray | Active |
| Outline/Gray, Focused, Button | Outline/Gray | Focused |
| Outline/Gray, Disabled, Button | Outline/Gray | Disabled |

**Icon Button (circle 36px):**

| Tên layer | Type | State |
|---|---|---|
| Primary, Hover, Icon button | Primary | Hover |
| Secondary, Hover, Icon button | Secondary | Hover |
| Gray, Hover, Icon button | Gray | Hover |
| Outline, Hover, Icon button | Outline | Hover |
| Outline, Hover, Icon button | Outline | Hover |
| Ghost/BLue, Hover, Icon button | Ghost/Blue | Hover |
| Primary, Focused, Icon button | Primary | Focused |
| Secondary, Focused, Icon button | Secondary | Focused |
| Gray, Focused, Icon button | Gray | Focused |
| Ghost, Focused, Icon button | Ghost | Focused |
| Secondary, Focused, Icon button (variant) | Secondary | Focused |

### 2.4 Button typography (label)
- Font: **Roboto**, Size: **14px**, Weight: **500 (Medium)**

---

## 3. PAGINATION — PHÂN TRANG

**Node:** `187211-30849` (frame container), `187211-30850` (Variant2), `187147-31767` (Default)

### 3.1 Pagination layout

| Thuộc tính | Giá trị |
|---|---|
| Container frame | 706 × 132px |
| Pagination row flow | **Horizontal** |
| Pagination row width | Fixed **666px** |
| **Pagination row height** | Hug **36px** |
| Top offset | 20px (Default), 76px (Variant2) |
| Border top | **2px** |
| Container bg | Conditional/page-background = **#F0F2F5** |

### 3.2 Pagination variants
- **Default** — Standard pagination
- **Variant2** — Second layout variant (cùng dimensions)

### 3.3 Pagination sub-components
- **Phân trang** (◈) — Main pagination component
- **Status** (◈) — Status indicator
- **Text** (◈) — Text component
- **Table element** (◈) — Table row element
- **.components/empty-img-simple** — Empty state image

---

## 4. TYPOGRAPHY COLOR TOKENS (từ Q&A)

| Token | Value | Mô tả |
|---|---|---|
| Character/Title .85 | rgba(0,0,0,0.85) | Label, breadcrumb active, input label |
| Character/Primary .85 | rgba(0,0,0,0.85) | Footer "Autolake" |
| Character/Secondary .45 | rgba(0,0,0,0.45) | Footer copyright text |

---

## 5. COMPONENT SPECS BỔ SUNG ĐẦY ĐỦ

### 5.1 Breadcrumb Item Container
| Thuộc tính | Giá trị |
|---|---|
| Height | **22px** (confirmed QA-17) |
| Padding | L16px, R16px |
| Width | Fill theo text |
| Active bg | Conditional/header-background = **#FFFFFF** |
| Text color | Character/Title .85 = rgba(0,0,0,0.85) |

### 5.2 Tag / Badge
| Thuộc tính | Giá trị |
|---|---|
| Padding | T1px, R8px, B1px, L8px |
| Border radius | **16px** |
| Background | Polar Green/1 = **#F6FFED** |
| Text color | Polar Green/3 = **#B7EB8F** |

### 5.3 Footer
| Thuộc tính | Giá trị |
|---|---|
| Size | 1440 × 66.18px |
| Background | **#F0F2F5** |
| Typography | Roboto 400 Regular **12px/16px** |
| Text "Autolake" | rgba(0,0,0,0.85) |
| Text "Copyright..." | rgba(0,0,0,0.45) |

### 5.4 Icon
| Thuộc tính | Giá trị |
|---|---|
| Set | **Ant Design Icons** |
| Format | **SVG** |
| Size chuẩn | **20 × 20px** |

---

## 6. SCOPE FINAL CONFIRMED

| Mục | Kết quả |
|---|---|
| Platform | Desktop PC/Laptop ONLY |
| Color mode | Light mode ONLY |
| Login | OUT of scope |
| Mobile | OUT of scope |
| Dark mode | OUT of scope |
| Pagination | IN scope |
| Button (5 types × 5 states) | IN scope |
| Footnote/Toggle | IN scope (validate style, không cần biết dùng ở đâu) |
| Table header height | SMOKE ONLY (1 TC baseline) |
| Module list | KHÔNG cần — TC chung, apply theo màn khi execute |
