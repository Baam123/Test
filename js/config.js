/* ================================================================
   js/config.js — Cấu hình website
   ================================================================
   SAU KHI DEPLOY GOOGLE APPS SCRIPT:
   1. Copy URL deployment (dạng: https://script.google.com/macros/s/ABC.../exec)
   2. Dán vào GOOGLE_SCRIPT_URL bên dưới
   3. Đổi thông tin shop theo thực tế
   ================================================================ */

const CONFIG = {

  // ► BƯỚC 1: Dán URL Google Apps Script vào đây
  GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/PASTE_YOUR_URL_HERE/exec",

  // ► Thông tin shop
  SHOP_NAME:    "Hoa Tươi Hy Vọng",
  SHOP_PHONE:   "0123 456 789",
  SHOP_PHONE2:  "1234 567 890",
  SHOP_EMAIL:   "shophoatuoi@gmail.com",
  SHOP_ADDRESS: "123 Đường ABC, Quận 1, TP.HCM",
  SHOP_HOURS:   "07:00 - 18:30 (T2 - CN)",

  // ► Mã giảm giá (thêm/xóa tùy ý)
  COUPONS: {
    "HOATUOI20": { discount: 0.20, label: "Giảm 20%" },
    "SALE15":    { discount: 0.15, label: "Giảm 15%" },
    "HOPHUONG":  { discount: 0.10, label: "Giảm 10%" },
    "FREESHIP":  { discount: 0,    label: "Freeship" },
  }
};
