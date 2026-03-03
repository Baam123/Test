// ================================================================
// google-apps-script.gs
// Copy toàn bộ file này vào Google Apps Script
//
// HƯỚNG DẪN:
// 1. Mở Google Sheets → Extensions → Apps Script
// 2. Xóa code cũ, dán code này vào
// 3. Nhấn Deploy → New deployment → Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 4. Copy URL deployment → dán vào js/config.js
// ================================================================

const SHEET_NAME = "DonHang";   // tên sheet tab bên dưới
const NOTIFY_EMAIL = "email_cua_ban@gmail.com"; // ← đổi thành email của bạn

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss    = SpreadsheetApp.getActiveSpreadsheet();

    // Tạo sheet nếu chưa có
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Tạo header
      sheet.appendRow([
        "Mã ĐH", "Ngày đặt", "Họ tên", "SĐT", "Email",
        "Địa chỉ", "Quận/Huyện", "Ngày giao", "Khung giờ",
        "Lời nhắn", "Thanh toán", "Sản phẩm", "Tổng tiền", "Trạng thái"
      ]);
      // Format header
      sheet.getRange(1, 1, 1, 14).setBackground("#FF5CA4").setFontColor("#fff").setFontWeight("bold");
    }

    // Tạo mã đơn hàng
    const orderCode = "HV-" + new Date().getTime().toString().slice(-6);

    // Format danh sách sản phẩm
    const itemsList = data.items.map(i => `${i.name} x${i.qty} (${formatPrice(i.price * i.qty)})`).join(" | ");

    // Ghi vào sheet
    sheet.appendRow([
      orderCode,
      new Date().toLocaleString("vi-VN"),
      data.name,
      data.phone,
      data.email || "",
      data.address,
      data.district || "",
      data.deliveryDate,
      data.deliveryTime,
      data.message || "",
      data.paymentMethod,
      itemsList,
      formatPrice(data.total),
      "Chờ xác nhận"
    ]);

    // Gửi email thông báo
    sendNotificationEmail(data, orderCode, itemsList);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, orderCode: orderCode }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendNotificationEmail(data, orderCode, itemsList) {
  const subject = `🌸 Đơn hàng mới #${orderCode} - ${data.name}`;
  const body = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌸 HOA TƯƠI HY VỌNG — ĐƠN HÀNG MỚI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Mã đơn hàng : ${orderCode}
📅 Thời gian   : ${new Date().toLocaleString("vi-VN")}

👤 THÔNG TIN KHÁCH HÀNG
   Họ tên  : ${data.name}
   SĐT     : ${data.phone}
   Email   : ${data.email || "Không có"}

📍 THÔNG TIN GIAO HÀNG
   Địa chỉ : ${data.address}
   Quận    : ${data.district || "Không có"}
   Ngày    : ${data.deliveryDate}
   Giờ     : ${data.deliveryTime}
   Lời nhắn: ${data.message || "Không có"}

🛒 SẢN PHẨM ĐẶT
   ${data.items.map(i => `• ${i.name} x${i.qty} — ${formatPrice(i.price * i.qty)}`).join("\n   ")}

💰 THANH TOÁN
   Phương thức : ${data.paymentMethod}
   Tổng cộng   : ${formatPrice(data.total)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Vui lòng xử lý đơn hàng sớm nhất có thể!
  `;

  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);

  // Gửi email xác nhận cho khách (nếu có email)
  if (data.email) {
    const customerSubject = `🌸 Xác nhận đơn hàng #${orderCode} — Hoa Tươi Hy Vọng`;
    const customerBody = `
Xin chào ${data.name}! 🌸

Cảm ơn bạn đã đặt hoa tại Hoa Tươi Hy Vọng.
Đơn hàng của bạn đã được ghi nhận thành công!

📋 Mã đơn hàng: ${orderCode}
⏰ Giao hàng  : ${data.deliveryDate} lúc ${data.deliveryTime}
💰 Tổng tiền  : ${formatPrice(data.total)}

Chúng tôi sẽ liên hệ xác nhận trong vòng 30 phút.
Hotline: 0123 456 789

Trân trọng,
Shop Hoa Tươi Hy Vọng 🌸
    `;
    MailApp.sendEmail(data.email, customerSubject, customerBody);
  }
}

function formatPrice(n) {
  return n.toLocaleString("vi-VN") + " VND";
}

// Test function — chạy thủ công để kiểm tra
function testSetup() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let sheet   = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["Mã ĐH","Ngày đặt","Họ tên","SĐT","Email","Địa chỉ","Quận/Huyện","Ngày giao","Khung giờ","Lời nhắn","Thanh toán","Sản phẩm","Tổng tiền","Trạng thái"]);
  }
  Logger.log("✅ Setup OK! Sheet: " + sheet.getName());
}
