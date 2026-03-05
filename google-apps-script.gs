const SHEET_NAME = "DonHang";
  const NOTIFY_EMAIL = "quyco4444@gmail.com";

  // ----------------------------------------------------------------
  // doPost — nhận đơn hàng từ frontend
  // ----------------------------------------------------------------
  function doPost(e) {
    try {
      const data = JSON.parse(e.postData.contents);

      // Validate dữ liệu đầu vào trước khi xử lý
      if (!data.name || !data.phone || !data.address ||
        !data.deliveryDate || !data.deliveryTime ||
        !data.paymentMethod || !data.total ||
        !Array.isArray(data.items) || data.items.length === 0) {
        throw new Error("Thiếu thông tin bắt buộc trong đơn hàng");
      }

      const ss = SpreadsheetApp.getActiveSpreadsheet();

      // Tạo sheet nếu chưa có
      let sheet = ss.getSheetByName(SHEET_NAME);
      if (!sheet) {
        sheet = ss.insertSheet(SHEET_NAME);
        // Tạo header (thêm cột STT ở đầu — tổng 15 cột)
        sheet.appendRow([
          "STT", "Mã ĐH", "Ngày đặt", "Họ tên", "SĐT", "Email",
          "Địa chỉ", "Quận/Huyện", "Ngày giao", "Khung giờ",
          "Lời nhắn", "Thanh toán", "Sản phẩm", "Tổng tiền", "Trạng thái"
        ]);
        // Format header
        sheet.getRange(1, 1, 1, 15)
          .setBackground("#FF5CA4")
          .setFontColor("#fff")
          .setFontWeight("bold");

        // Cột I (cột 9) = "Ngày giao" — format dd/mm/yyyy
        sheet.getRange("I:I").setNumberFormat("dd/mm/yyyy");
      }

      // Dùng mã đơn hàng do client tạo (để đồng bộ với trang web)
      // Nếu không có thì tạo dự phòng
      const orderCode = data.orderCode ||
        ("HV-" + Date.now().toString().slice(-8) + Math.random().toString(36).toUpperCase().slice(2, 5));

      // Tính STT tự động = số dòng hiện tại (trừ 1 dòng header)
      const lastRow = sheet.getLastRow();
      const stt = lastRow; // dòng 1 là header → dòng 2 là STT=1, dòng 3 là STT=2,...

      // Parse ngày giao thành Date object để hiển thị đúng format dd/mm/yyyy
      const deliveryDateObj = new Date(data.deliveryDate);

      // Format danh sách sản phẩm
      const itemsList = data.items
        .map(i => `${i.name} x${i.qty} (${formatPrice(i.price * i.qty)})`)
        .join(" | ");

      // Ghi vào sheet (thêm STT ở đầu)
      sheet.appendRow([
        stt,
        orderCode,
        new Date().toLocaleString("vi-VN"),
        data.name,
        data.phone,
        data.email || "",
        data.address,
        data.district || "",
        deliveryDateObj,       // Cột I — Date object để format dd/mm/yyyy áp dụng được
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
      // Log lỗi để debug trong Apps Script
      Logger.log("❌ doPost error: " + err.message);
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: err.message }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  // ----------------------------------------------------------------
  // doGet — trả về thông báo khi truy cập URL bằng GET (tránh lỗi 404)
  // ----------------------------------------------------------------
  function doGet() {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok", message: "Hoa Tươi Hy Vọng API is running" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // ----------------------------------------------------------------
  // sendNotificationEmail — gửi email cho shop và khách
  // ----------------------------------------------------------------
  function sendNotificationEmail(data, orderCode, itemsList) {
    // Email cho shop
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

    // Email xác nhận cho khách (nếu có email)
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

  // ----------------------------------------------------------------
  // formatPrice — định dạng tiền VND
  // ----------------------------------------------------------------
  function formatPrice(n) {
    return Number(n).toLocaleString("vi-VN") + " VND";
  }

  // ----------------------------------------------------------------
  // testSetup — chạy thủ công để kiểm tra kết nối sheet
  // ----------------------------------------------------------------
  function testSetup() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        "STT", "Mã ĐH", "Ngày đặt", "Họ tên", "SĐT", "Email",
        "Địa chỉ", "Quận/Huyện", "Ngày giao", "Khung giờ",
        "Lời nhắn", "Thanh toán", "Sản phẩm", "Tổng tiền", "Trạng thái"
      ]);
      sheet.getRange("I:I").setNumberFormat("dd/mm/yyyy");
      Logger.log("✅ Đã tạo sheet mới: " + sheet.getName());
    } else {
      Logger.log("✅ Sheet đã tồn tại: " + sheet.getName());
    }
  }

  // ----------------------------------------------------------------
  // testDoPost — giả lập đơn hàng để test toàn bộ luồng
  // ----------------------------------------------------------------
  function testDoPost() {
    const fakeData = {
      name: "Nguyễn Văn A",
      phone: "0901234567",
      email: "test@example.com",
      address: "123 Đường Hoa Mai",
      district: "Quận 1",
      deliveryDate: "2025-12-25",
      deliveryTime: "08:00 - 10:00",
      message: "Gói đẹp giúp mình nhé",
      paymentMethod: "Tiền mặt khi nhận hàng",
      total: 350000,
      items: [
        { name: "Hoa Hồng Đỏ", qty: 2, price: 120000 },
        { name: "Hoa Cúc Vàng", qty: 1, price: 110000 }
      ]
    };

    const fakeEvent = { postData: { contents: JSON.stringify(fakeData) } };
    const result = doPost(fakeEvent);
    Logger.log("📦 Kết quả test: " + result.getContent());
  }