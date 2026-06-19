# B1 Extract — LKH_Update-UI-common-rule-sprint-14
**Nguồn:** Figma `Dk7KnsNNVmPAJKT0VmmOv5`, node `179603-8217` (Local system)
**Trạng thái:** EXTRACTED — chờ Monitor review
**Ngày extract:** 2026-06-19

---

## 1. FRAME TỔNG THỂ — Local system

| Thuộc tính | Giá trị |
|---|---|
| Node ID | 179603-8217 |
| Kích thước | 7,702 × 6,294 px |
| Radius | Top-right 2px, Bottom-right 2px, Bottom-left 2px |
| Fill Color (Primary/7) | #096DD9 |
| Background | Light blue (#1677FF vùng xanh frame) |

### Variable Modes áp dụng toàn frame:
| Collection | Mode |
|---|---|
| Variable collection (1) | Auto (Mode 1) |
| Variable collection (2) | Auto (Light mode) |
| 00 - Foundation | Auto (WDS) |
| 02 - Component | Auto (WDS) |
| _Primitives | Auto (Style) |
| 2. Radius | Auto (Mode 1) |
| 3. Spacing | Auto (Mode 1) |
| 1. Color modes | Auto (Light mode) |

**Ghi chú:** Hệ thống dùng **Ant Design (WDS)** làm design system gốc, Light mode mặc định.

---

## 2. COLOR SYSTEM — Ant Design Base Palette

**Nguồn:** Figma page "Colors" — Ant Design's base color palette (120 colors, 12 primary groups)

### 2.1 Color Groups
| Group | Mô tả |
|---|---|
| Primary | Xanh dương chính (1–10 scale) |
| Neutral | Trắng/Xám/Đen trung tính |
| DayBreak Blue | Xanh dương sáng |
| Dust Red | Đỏ lỗi/nguy hiểm |
| Volcano | Cam đỏ |
| Sunset Orange | Cam cảnh báo |
| Calendula Gold | Vàng |
| Sunrise Yellow | Vàng sáng |
| Lime | Xanh lá nhạt |
| Polar Green | Xanh lá thành công |
| Cyan | Xanh ngọc |
| Geek Blue | Xanh đậm |
| Golden Purple | Tím |
| Magenta | Hồng đậm |
| Character | Màu text (semantic) |
| Tooltip | Màu tooltip |
| Conditional | Màu điều kiện |
| placeholder | Màu placeholder |

### 2.2 Primary Color Scale (xanh dương — màu chính hệ thống)
| Token | Hex | Mô tả |
|---|---|---|
| Primary/1 | ~#E6F4FF | Lightest tint |
| Primary/2 | ~#BAE0FF | Very light |
| Primary/3 | ~#91CAFF | Light |
| Primary/4 | ~#69B1FF | Light-medium |
| Primary/5 | ~#4096FF | Medium |
| Primary/6 | ~#1677FF | Base (Ant Design default) |
| Primary/7 | #096DD9 | Dark (dùng trong Local system) |
| Primary/8 | ~#0958D9 | Darker |
| Primary/9 | ~#003EB3 | Very dark |
| Primary/10 | ~#002C8C | Darkest |

### 2.3 Semantic Colors (quan sát từ frame)
| Token | Hex | Dùng cho |
|---|---|---|
| Error/danger bg | #FFF1F0 | Table background (error state) |
| Error/Dust Red 1 | #fff1f0 | Background lỗi nhạt |
| Focus/Selected border | #9747FF | Input field focus border (Figma selection) |

---

## 3. TYPOGRAPHY

**Font gia đình chính: Roboto**

| Style name | Font | Weight | Size | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| Body/regular | Roboto | 400 (Regular) | 14px | 22px | 0% |

**Ghi chú:** Body/regular là text style cơ bản — cần extract thêm các variant (heading, label, caption) từ Typography page.

---

## 4. COMPONENT — Input field

**Node:** `187817-54688` (frame container) → `187745-40453` (component)

### 4.1 Frame container Input field
| Thuộc tính | Giá trị |
|---|---|
| Kích thước frame | 2,084 × 1,421 px |
| Background | #F5F5F5 |
| Variable Modes | Light mode, WDS Foundation, WDS Component |

### 4.2 Input field Component properties
| Property | Giá trị mặc định |
|---|---|
| Label | true |
| Req (Required) | true |
| Hint | true |
| Main Icon | true |
| Help Icon | true |
| Infor Icon | true |
| word-count | true |

### 4.3 Input field Layout
| Thuộc tính | Giá trị |
|---|---|
| Width | 1,370 px |
| Height | 1,221 px |
| Radius | **5px** |
| Border | **1px** |
| Border style | Dashed (Figma selection state) |
| Dashes | 10, 5 |

### 4.4 Input field Colors
| Token | Hex | Vùng dùng |
|---|---|---|
| Background | #FFFFFF | Fill chính |
| Border (focus/selected) | #9747FF | Viền khi select |

**Ghi chú cần làm rõ (Q&A):** Border thực tế của input trong các state (default, hover, focus, error, disabled) cần verify thêm từ các variant khác.

---

## 5. COMPONENT — Table

**Node:** `187745-40377`

### 5.1 Table frame
| Thuộc tính | Giá trị |
|---|---|
| Kích thước | 2,902 × 5,456 px |
| Background | **#FFF1F0** (hồng nhạt — error/danger tone) |
| Variable Modes | WDS Foundation, WDS Component, Light mode, Mode 1 |

**Ghi chú:** Background #FFF1F0 của frame container là vùng "Note for" (annotation), không phải màu table thực. Table data grid cần extract thêm từ sub-components.

---

## 6. COMPONENT — Modal

**Node:** `187745-40379`

| Thuộc tính | Giá trị |
|---|---|
| Kích thước | 2,103 × 1,021 px |
| Background | **#F5F5F5** |
| Variable Modes | Auto (Mode 1) ×2 |

---

## 7. COMPONENT — Button

**Node:** `188432-45079` (Icon button — Ghost/Default)

### 7.1 Button component properties
| Property | Giá trị |
|---|---|
| Type | Ghost |
| Status | Default |
| Name | Icon button |

### 7.2 Button Layout
| Thuộc tính | Giá trị |
|---|---|
| Flow | Vertical |
| Width | Hug (**36px**) |
| Height | Hug (**36px**) |
| **Radius** | **100px** (pill/circle) |
| **Padding** | **8px** |
| **Gap** | **10px** |

---

## 8. COMPONENT — Tag (Label/Badge)

**Node:** Child của Local system, type: Component (◈)
**Ghi chú:** Cần navigate vào để extract chi tiết.

---

## 9. LAYER STRUCTURE — Local system children

```
Local system (7702×6294)
├── Tag                     ← component ◈
├── Input field (frame)     ← 2084×1421, bg #F5F5F5
│   ├── Note for            ← annotation text
│   ├── Frame 2085664825    ← inner container
│   └── Input field         ← component ◈ (Radius 5px, Border 1px)
├── Table (frame)           ← 2902×5456, bg #FFF1F0
├── Input field (frame)     ← cái thứ 2
├── Modal (frame)           ← 2103×1021, bg #F5F5F5
├── Button                  ← component ◈ (Ghost, 36px, Radius 100px)
└── Button                  ← component ◈ (variant khác)
```

---

## 10. SPACING & RADIUS TOKENS (Variable Mode: "3. Spacing" & "2. Radius")

Được define qua Variable collections (WDS Mode 1). Từ data quan sát:

| Token | Giá trị |
|---|---|
| Border radius — input | 5px |
| Border radius — button (circle) | 100px |
| Border radius — frame container | 2px |
| Padding — button | 8px |
| Gap — button | 10px |
| Border width — input | 1px |

---

## 11. TRẠNG THÁI EXTRACT

| Hạng mục | Trạng thái | Ghi chú |
|---|---|---|
| Frame Local system | ✅ OK | Size, radius, primary color |
| Color system | ✅ OK | 18 groups, Primary scale, semantic colors |
| Typography (base) | ✅ OK | Roboto 400, 14px/22px |
| Input field component | ✅ OK | Radius 5px, border 1px, props đầy đủ |
| Table frame | ✅ OK | Size, bg — cần thêm header/row detail |
| Modal frame | ✅ OK | Size, bg |
| Button (Icon/Ghost) | ✅ OK | 36px, Radius 100px, Padding 8px |
| Button (các type khác) | ⚠️ THIẾU | Cần extract Primary/Secondary/Danger/Default |
| Typography (các variant) | ⚠️ THIẾU | Chỉ có Body/regular — cần H1-H6, label, caption |
| Input states | ⚠️ THIẾU | Default/hover/focus/error/disabled |
| Table sub-components | ⚠️ THIẾU | Header, row, cell, pagination, sort |
| Modal sub-components | ⚠️ THIẾU | Header, body, footer, close button |
| Tag/Badge | ⚠️ THIẾU | Chưa navigate vào |
| Icon system | ⚠️ THIẾU | Chưa thấy icon library |
| Header/Navigation | ⚠️ THIẾU | Thấy "global-header" trong layers |
| Spacing scale | ⚠️ THIẾU | Variable collection "3. Spacing" chưa mở |
| Radius scale | ⚠️ THIẾU | Variable collection "2. Radius" chưa mở |

---

## 12. Q&A FLAGS (phát sinh từ B1)

| # | Câu hỏi | Loại |
|---|---|---|
| Q1 | Button Primary/Secondary/Danger có radius bao nhiêu? Hay dùng chung 100px? | MISSING-DATA | Radius 8px - kích thước dài fill theo text * 40px
| Q2 | Input border color thực tế (default state) là màu gì? (#9747FF là Figma selection) | MISSING-DATA | neutral/5 ~ #D9D9D9
| Q3 | Typography heading H1-H6 dùng font gì, size bao nhiêu? | MISSING-DATA | Chỗ này chưa hiểu, nhưng ở Header - Menu dùng font Roboto (font chung cho hệ thống), size chữ 16px, H5/bold
| Q4 | Table row height, header height chuẩn là bao nhiêu? | MISSING-DATA | Table row hieght 56px, header height tạm bỏ qua
| Q5 | Spacing scale cụ thể: 4/8/12/16/24/32/48px hay khác? | MISSING-DATA | scaping giữa các chữ chưa biết, chỗ này cứ tạm cho là 12px, sẽ fix sau
| Q6 | Input field padding (top/right/bottom/left) là bao nhiêu? | MISSING-DATA | Top 8px - right 12px - bottom 8px - left 12px áp dụng cho cả text area và input
| Q7 | Modal có overlay (backdrop) không? Màu/opacity là gì? | MISSING-DATA | Modal không có overlay, phông nền màu trắng neutral/1 ~ #FFFFFF
| Q8 | Neutral color scale (gray) — cần hex values đầy đủ | MISSING-DATA | Neutral/1 - Neutral/10 với neutral/3 ~ #F5F5F5, neutral/7 ~ #8C8C8C
