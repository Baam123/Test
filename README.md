# 🌸 Hoa Tươi Hy Vọng — Hướng dẫn cài đặt

## Cấu trúc thư mục

```
hoatuoi/
├── index.html                  ← Trang web chính (mở file này)
├── style.css                   ← Giao diện / màu sắc
├── js/
│   ├── config.js               ← ⚙️ CẤU HÌNH (đổi URL Google Script ở đây)
│   ├── data.js                 ← 📦 Dữ liệu sản phẩm
│   ├── cart.js                 ← 🛒 Giỏ hàng (localStorage)
│   ├── order.js                ← 📨 Gửi đơn → Google Sheets
│   └── ui.js                   ← 🖥️ Điều hướng & render
├── google-apps-script.gs       ← 📋 Code dán vào Google Apps Script
└── img/                        ← 🖼️ Ảnh sản phẩm (tự thêm vào)
```

---

## BƯỚC 1 — Chạy thử ngay (không cần Google Sheets)

Chỉ cần mở `index.html` bằng trình duyệt là xem được giao diện.

> Khi bấm "Đặt hàng" sẽ báo lỗi chưa có URL → bình thường, làm Bước 2 để fix.

---

## BƯỚC 2 — Kết nối Google Sheets (nhận đơn hàng thật)

### 2.1 Tạo Google Sheet
1. Vào [sheets.google.com](https://sheets.google.com) → Tạo bảng tính mới
2. Đặt tên tùy ý, ví dụ: **"Đơn hàng Hoa Tươi"**

### 2.2 Tạo Apps Script
1. Trong Google Sheet: chọn **Extensions → Apps Script**
2. Xóa toàn bộ code cũ
3. Mở file `google-apps-script.gs`, copy toàn bộ, dán vào
4. Đổi email ở dòng: `const NOTIFY_EMAIL = "email_cua_ban@gmail.com";`
5. Nhấn **Save** (Ctrl+S)

### 2.3 Chạy test một lần
1. Chọn function `testSetup` trong dropdown
2. Nhấn **Run** → cấp quyền nếu được hỏi
3. Kiểm tra Google Sheet đã có tab "DonHang" chưa

### 2.4 Deploy
1. Nhấn **Deploy → New deployment**
2. Chọn type: **Web app**
3. Cài đặt:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Nhấn **Deploy** → Copy URL (dạng `https://script.google.com/macros/s/ABC.../exec`)

### 2.5 Dán URL vào config
Mở `js/config.js`, thay dòng:
```js
GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/PASTE_YOUR_URL_HERE/exec",
```
thành URL vừa copy.

---

## BƯỚC 3 — Deploy lên GitHub Pages (miễn phí)

1. Tạo repository mới trên GitHub
2. Upload toàn bộ file lên
3. Vào **Settings → Pages → Branch: main → Save**
4. Website sẽ chạy tại: `https://[username].github.io/[repo-name]`

---

## Tùy chỉnh nhanh

| Muốn thay đổi | Sửa file |
|---|---|
| Màu sắc chính | `style.css` → dòng `:root` |
| Thêm/xóa sản phẩm | `js/data.js` |
| Thêm mã giảm giá | `js/config.js` → `COUPONS` |
| Thông tin shop | `js/config.js` → `SHOP_NAME`, `SHOP_PHONE`... |
| Email nhận đơn | `google-apps-script.gs` → `NOTIFY_EMAIL` |

---

## Mã giảm giá có sẵn (để test)

| Mã | Giảm |
|---|---|
| `HOATUOI20` | 20% |
| `SALE15` | 15% |
| `HOPHUONG` | 10% |
| `FREESHIP` | Freeship |
