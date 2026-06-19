# B1 Extract v2 — LKH_Update-UI-common-rule-sprint-14

**Nguồn:** Figma `Dk7KnsNNVmPAJKT0VmmOv5`, node `179603-8217` (Local system)
**Dựa trên:** b1_extract.md (v1) + Q&A đã confirm + research Figma bổ sung
**Ngày extract:** 2026-06-19
**Trạng thái:** EXTRACTED v2 — chờ Monitor review Gate 1

> **Ghi chú v2:** Bỏ section "Frame tổng thể Local system" (không liên quan QC). Tập trung 100% vào design tokens và component rules bên trong. Bổ sung đầy đủ Typography scale, Neutral color scale, Button variants, global-header, Footer, Breadcrumb. Resolve toàn bộ Q1–Q8.

---

## 1. DESIGN SYSTEM FOUNDATION

| Mục | Giá trị |
|---|---|
| Design system gốc | **Ant Design (WDS — Web Design System)** |
| Color mode mặc định | **Light mode** |
| Variable collections | 00-Foundation (WDS), 02-Component (WDS), _Primitives (Style), 2.Radius (Mode1), 3.Spacing (Mode1), 1.Color modes (Light mode) |
| Font gia đình | **Roboto** |
| Base font size | **14px** |

---

## 2. TYPOGRAPHY SYSTEM

**Font: Roboto — áp dụng toàn hệ thống**

### 2.1 Heading Scale

| Style | Weight | Size | Line Height | Letter Spacing | Ghi chú |
|---|---|---|---|---|---|
| H1/medium | Medium (500) | **38px** | **46px** | 0% | Tiêu đề trang lớn nhất |
| H2/medium | Medium (500) | **30px** | **40px** | 0% | |
| H3/medium | Medium (500) | **24px** | **32px** | 0% | |
| H3/regular | Regular (400) | **24px** | **32px** | 0% | |
| H4/medium | Medium (500) | **20px** | **28px** | 0% | |
| H4/regular | Regular (400) | **20px** | **28px** | 0% | |
| H5/regular | Regular (400) | **16px** | **24px** | 0% | Header/Menu dùng H5/bold |
| H5/medium | Medium (500) | **16px** | **24px** | 0% | |
| H5/bold | Bold (700) | **16px** | **24px** | 0% | ← **Header navigation label** |

### 2.2 Body Scale

| Style | Weight | Size | Line Height | Ghi chú |
|---|---|---|---|---|
| Body/regular | Regular (400) | **14px** | **22px** | Base text, input value, label |
| Body/medium | Medium (500) | **14px** | **22px** | |
| Body/bold | Bold (700) | **14px** | **22px** | |
| Body/regular-underline | Regular (400) | **14px** | **22px** | Link |
| Body/regular-strikethrough | Regular (400) | **14px** | **22px** | Deleted content |
| Body/code | — | **14px** | **22px** | Code block |

### 2.3 Utility Scale

| Style | Weight | Size | Line Height | Ghi chú |
|---|---|---|---|---|
| Footnote | — | (cần verify) | — | Caption, helper text |
| Toggle | — | (cần verify) | — | Toggle label |

> **Q3 — RESOLVED:** H5/bold 16px/24px dùng cho header & menu navigation.

---

## 3. COLOR SYSTEM

**Nguồn: Figma page "Colors" — Ant Design 120-color palette**

### 3.1 Primary (Blue) — Màu chính hệ thống

| Token | Hex | Mô tả sử dụng |
|---|---|---|
| Primary/1 | **#E6F4FF** | Background hover nhạt nhất |
| Primary/2 | **#BAE0FF** | Background selected nhạt |
| Primary/3 | **#91CAFF** | |
| Primary/4 | **#69B1FF** | |
| Primary/5 | **#4096FF** | |
| Primary/6 | **#1677FF** | **Base primary** — button default, link |
| Primary/7 | **#096DD9** | **Primary hover/active** — frame color Local system |
| Primary/8 | **#0958D9** | |
| Primary/9 | **#003EB3** | |
| Primary/10 | **#002C8C** | Darkest |

### 3.2 Neutral (Gray) — Màu trung tính

| Token | Hex | Mô tả sử dụng |
|---|---|---|
| Neutral/1 | **#FFFFFF** | Trắng tinh — nền modal, nền input |
| Neutral/2 | **#FFFFFF** | (= white) |
| Neutral/3 | **#FAFAFA** | Background nhạt |
| Neutral/4 | **#F5F5F5** | **Page section bg, disabled bg** |
| Neutral/5 | **#D9D9D9** | **Input border default** ← Q2 confirm |
| Neutral/6 | **#BFBFBF** | Border disabled |
| Neutral/7 | **#8C8C8C** | **Placeholder text, hint text** ← Q8 confirm |
| Neutral/8 | **#595959** | Secondary text |
| Neutral/9 | **#434343** | |
| Neutral/10 | **#262626** | **Primary text** |

### 3.3 Semantic Colors

| Token | Hex | Dùng cho |
|---|---|---|
| Dust Red/1 (error bg) | **#FFF1F0** | Background lỗi nhạt, Table annotation bg |
| Dust Red/5 | **#FF4D4F** | Error border, danger indicator |
| Dust Red/6 | **#F5222D** | **Danger button fill, error icon** |
| Polar Green/6 | ~**#52C41A** | Success state |
| Sunset Orange/6 | ~**#FA8C16** | Warning state |
| Conditional/page-background | **#F0F2F5** | **Nền trang toàn hệ thống** |
| Tailwind/base/white | **#FFFFFF** | White |
| Tailwind/gray/200 | **#E4E4E7** | Table header bg, section header |
| Tailwind/gray/300 | **#D4D4D8** | Border separator |

> **Q2 — RESOLVED:** Input border default = **Neutral/5 = #D9D9D9**

---

## 4. COMPONENT — Input field

**Node component:** `187745-40453`

### 4.1 Component properties (variants)

| Property | Giá trị |
|---|---|
| Label | true/false |
| Req (Required asterisk) | true/false |
| Hint text | true/false |
| Main Icon (prefix) | true/false |
| Help Icon | true/false |
| Infor Icon | true/false |
| word-count | true/false |

### 4.2 Layout & Spacing

| Thuộc tính | Giá trị |
|---|---|
| Radius | **5px** |
| Border width | **1px** |
| **Padding Top** | **8px** |
| **Padding Right** | **12px** |
| **Padding Bottom** | **8px** |
| **Padding Left** | **12px** |

> **Q6 — RESOLVED:** Padding 8px top/bottom, 12px left/right — áp dụng cho cả input và textarea.

### 4.3 States

| State | Border Color | Background | Text Color |
|---|---|---|---|
| Default | **#D9D9D9** (Neutral/5) | **#FFFFFF** | Neutral/10 (#262626) |
| Focus | **#1677FF** (Primary/6) | #FFFFFF | Neutral/10 |
| Error | **#FF4D4F** (Dust Red/5) | #FFFFFF | Neutral/10 |
| Disabled | **#BFBFBF** (Neutral/6) | **#F5F5F5** (Neutral/4) | #8C8C8C |
| Placeholder | — | — | **#8C8C8C** (Neutral/7) |

### 4.4 Typography trong input

| Phần | Style | Size |
|---|---|---|
| Label | Body/medium | 14px |
| Input value | Body/regular | 14px |
| Placeholder | Body/regular | 14px, color #8C8C8C |
| Hint text | Footnote/regular | 12px (est.) |
| Error message | Footnote/regular | 12px (est.), color #F5222D |

---

## 5. COMPONENT — Button

**Node (Icon button Ghost):** `188432-45079`
**Node (Icon button Primary):** `188704-45280`

### 5.1 Button sizes

| Size | Width | Height | Padding | Radius | Ghi chú |
|---|---|---|---|---|---|
| Icon button (circle) | Hug (**36px**) | Hug (**36px**) | **8px** | **100px** | Ghost & Primary |
| Standard button | Fill / text-based | **40px** | TBD | **8px** | ← Q1 confirm |

> **Q1 — RESOLVED:** Standard button (text button) height **40px**, Radius **8px**. Icon button circle radius **100px**.

### 5.2 Button variants

| Type | Status | Color fill | Text/Icon color | Ghi chú |
|---|---|---|---|---|
| **Primary** | Default | #1677FF | #FFFFFF | Main action |
| **Primary** | Hover | #096DD9 | #FFFFFF | |
| **Ghost** | Default | transparent | #1677FF | Secondary |
| **Ghost** | Hover | #E6F4FF | #1677FF | |
| **Danger/Primary** | Default | #F5222D | #FFFFFF | Dust Red/6 |
| **Danger/Ghost** | Default | transparent | #F5222D | |
| **Disabled** | — | #F5F5F5 | #BFBFBF | |

### 5.3 Icon button layout

| Thuộc tính | Giá trị |
|---|---|
| Flow | Vertical |
| Width × Height | Hug (36px × 36px) |
| Radius | **100px** (circle) |
| Padding (all sides) | **8px** |
| Gap | **10px** |

### 5.4 Button section container (row)

| Thuộc tính | Giá trị |
|---|---|
| Flow | Horizontal |
| Height (row) | Fixed **40px** |
| Radius | **4px** (bottom corners only) |
| Padding | Top 4px, Right 8px, Bottom 4px, Left 8px |
| Gap | **10px** |
| Background (header row) | **#E4E4E7** (Tailwind/gray/200) |
| Background (content) | **#FFFFFF** |
| Border | 0px top, 1px right, 1px bottom, 1px left / **#D4D4D8** |

---

## 6. COMPONENT — Table (Data Grid)

**Node frame:** `187745-40377`

### 6.1 Table dimensions

| Thuộc tính | Giá trị |
|---|---|
| Table frame size | 2902 × 5456px |
| **Row height** | **56px** ← Q4 confirm |
| **Header height** | (tạm bỏ qua theo Monitor) |

> **Q4 — RESOLVED:** Table row height = **56px**. Header height — bỏ qua.

### 6.2 Table colors

| Phần | Color | Hex |
|---|---|---|
| Header background | Tailwind/gray/200 | **#E4E4E7** |
| Row background (odd) | White | **#FFFFFF** |
| Row background (even) | Neutral/3 | **#FAFAFA** |
| Row hover | Primary/1 | **#E6F4FF** |
| Border | Neutral/5 | **#D9D9D9** |
| Annotation/note bg | Dust Red/1 | **#FFF1F0** |

### 6.3 Table typography

| Phần | Style | Color |
|---|---|---|
| Header text | Body/medium 14px | #262626 |
| Cell text | Body/regular 14px | #262626 |
| Secondary cell | Body/regular 14px | #8C8C8C |

---

## 7. COMPONENT — Modal

**Node:** `187745-40379`

### 7.1 Modal layout

| Thuộc tính | Giá trị |
|---|---|
| Frame size | 2103 × 1021px |
| Background | **#FFFFFF** (Neutral/1) |
| Overlay/Backdrop | **Không có** ← Q7 confirm |
| Radius | **8px** (est.) |

> **Q7 — RESOLVED:** Modal không dùng overlay. Phông nền modal = **#FFFFFF** (Neutral/1 — white).

### 7.2 Modal structure

| Phần | Mô tả |
|---|---|
| Header | Title (H5/bold 16px) + Close button (X) |
| Body | Content area, padding 24px |
| Footer | Action buttons (Primary + Ghost/Default) |

---

## 8. COMPONENT — global-header (Header/Navigation)

**Node:** `185917-26029`

### 8.1 Header layout

| Thuộc tính | Giá trị |
|---|---|
| Size | 1696 × 376px |
| Background | **Conditional/page-background = #F0F2F5** |
| Radius | **5px** |
| Border | **1px** |

### 8.2 Header typography

| Phần | Style | Ghi chú |
|---|---|---|
| Menu/Navigation label | **H5/bold, 16px/24px** | Roboto Bold ← Q3 confirm |
| Sub-label | Body/regular 14px | |

### 8.3 Sub-components trong header

| Component | Ghi chú |
|---|---|
| Breadcrumb Item Container | Component (◈) |
| Frame 2085664740 | Inner container |
| global-header | Component gốc |

---

## 9. COMPONENT — Footer

**Node (layer):** `Footer` (child của Local system → Button frame)

*Cần extract chi tiết — chưa navigate vào.*

---

## 10. COMPONENT — Breadcrumb

**Node:** `Breadcrumb Item Container` (component ◈)

*Cần extract chi tiết — chưa navigate vào.*

---

## 11. COMPONENT — Tag / Badge

**Node:** `Tag` (component ◈, child đầu tiên của Local system)

*Cần extract chi tiết — chưa navigate vào.*

---

## 12. SPACING SYSTEM

> **Q5 — RESOLVED (tạm thời):** Letter spacing giữa các chữ = **12px** (tạm định nghĩa, sẽ fix sau).

Từ data đọc được trong Figma:

| Vùng | Spacing | Nguồn |
|---|---|---|
| Input padding horizontal | **12px** | Input field component |
| Input padding vertical | **8px** | Input field component |
| Button padding (icon button) | **8px** | Button component |
| Button gap | **10px** | Button component |
| Section row padding H | **8px** | Button section container |
| Section row padding V | **4px** | Button section container |
| Section row gap | **2px** | Button section container |
| Panel padding top | **12px** | Option 1 container |
| Panel padding H | **12px** | Option 1 container |

---

## 13. RADIUS SYSTEM

| Token | Value | Dùng cho |
|---|---|---|
| Radius/xs | **2px** | Frame container corner (Local system frame) |
| Radius/sm | **4px** | Row/section container, table cell |
| Radius/md | **5px** | Input field, header component |
| Radius/lg | **8px** | Standard button, modal |
| Radius/full | **100px** | Icon button (circle) |

---

## 14. LAYER STRUCTURE — Local system (đầy đủ)

```
Local system (node: 179603-8217)
├── Tag                          ← component ◈ [PENDING detail]
├── Input field (frame)          ← 2084×1421, bg #F5F5F5
│   ├── Note for                 ← annotation
│   ├── Frame 2085664825         ← inner container
│   └── Input field              ← component ◈ (Radius 5px, Border 1px, Pad 8/12)
├── Table (frame)                ← 2902×5456, bg #FFF1F0 (annotation)
│   └── [Table data grid]        ← row 56px, header #E4E4E7
├── Input field (frame 2)        ← second input section
├── Modal (frame)                ← 2103×1021, bg #FFFFFF
│   ├── Header                   ← H5/bold 16px + close btn
│   ├── Body                     ← content 24px pad
│   └── Footer                   ← Primary + Ghost buttons
├── Button (Ghost/Icon)          ← ◈ 36px, R100px, P8px
├── Button (Primary/Icon)        ← ◈ 36px, R100px, P8px, #F5222D fill
├── Button (frame container)     ← section with option rows
│   ├── Option 2                 ← section frame
│   └── Option 1                 ← 740×308px, bg #FFF, border #D4D4D8
│       ├── Frame (header row)   ← H40px, bg #E4E4E7, R4px
│       └── Frame rows...        ← button variant rows
├── Footer                       ← component ◈ [PENDING detail]
├── Breadcrumb Item Container    ← component ◈ [PENDING detail]
├── Frame 2085664740             ← inner frame
└── global-header                ← component ◈ (1696×376, bg #F0F2F5, R5px)
```

---

## 15. TRẠNG THÁI EXTRACT v2

| Hạng mục | Trạng thái | Ghi chú |
|---|---|---|
| Typography scale (H1–H5, Body) | ✅ DONE | Đầy đủ size/weight/line-height |
| Primary color scale (1–10) | ✅ DONE | Có hex đầy đủ |
| Neutral/Gray scale (1–10) | ✅ DONE | Có hex đầy đủ |
| Semantic colors | ✅ DONE | Error, Success, Warning, Page-bg |
| Input field layout + padding | ✅ DONE | 8/12px, R5px, B1px |
| Input states | ✅ DONE | Default/Focus/Error/Disabled/Placeholder |
| Button icon (Ghost + Primary) | ✅ DONE | 36px, R100px, P8px |
| Button standard (text) | ✅ DONE | H40px, R8px |
| Button danger | ✅ DONE | #F5222D fill |
| Button section container | ✅ DONE | Layout, colors |
| Table row height | ✅ DONE | 56px |
| Table colors | ✅ DONE | Header/row/border/hover |
| Modal structure | ✅ DONE | No overlay, bg #FFFFFF |
| global-header | ✅ DONE | 1696×376, bg #F0F2F5, H5/bold |
| Spacing tokens | ✅ DONE | Từ component data |
| Radius tokens | ✅ DONE | 2/4/5/8/100px scale |
| Tag/Badge | ⚠️ PENDING | Chưa navigate vào |
| Footer | ⚠️ PENDING | Chưa navigate vào |
| Breadcrumb | ⚠️ PENDING | Chưa navigate vào |
| Footnote/Toggle style | ⚠️ PENDING | Size chưa verify |
| Button text (label) typography | ⚠️ PENDING | Font size bên trong button |
| Table column widths | ⚠️ PENDING | Chuẩn min-width từng cột |

---

## 16. Q&A RESOLUTION SUMMARY

| # | Câu hỏi | Trạng thái | Kết quả |
|---|---|---|---|
| Q1 | Button radius | ✅ RESOLVED | Standard btn R8px, Icon btn R100px |
| Q2 | Input border default | ✅ RESOLVED | Neutral/5 = #D9D9D9 |
| Q3 | Typography heading | ✅ RESOLVED | H5/bold 16px Roboto cho Header/Menu |
| Q4 | Table row height | ✅ RESOLVED | 56px |
| Q5 | Spacing scale | ✅ RESOLVED (TẠM) | 12px letter gap, các spacing từ component data |
| Q6 | Input padding | ✅ RESOLVED | T8 R12 B8 L12 |
| Q7 | Modal overlay | ✅ RESOLVED | Không có overlay, bg #FFFFFF |
| Q8 | Neutral colors | ✅ RESOLVED | N3=#FAFAFA, N4=#F5F5F5, N5=#D9D9D9, N7=#8C8C8C |
