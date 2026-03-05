/* js/order.js — Gửi đơn hàng về Google Sheets */

function placeOrder() {
  // Validate
  const name = document.getElementById("recv-name").value.trim();
  const phone = document.getElementById("recv-phone").value.trim();
  const address = document.getElementById("recv-address").value.trim();

  if (!name || !phone || !address) {
    showToast("⚠️ Vui lòng điền đầy đủ thông tin người nhận!");
    highlightEmpty(["recv-name", "recv-phone", "recv-address"]);
    return;
  }
  if (cartCount() === 0) {
    showToast("⚠️ Giỏ hàng đang trống!");
    return;
  }
  if (CONFIG.GOOGLE_SCRIPT_URL.includes("PASTE_YOUR_URL_HERE")) {
    showToast("⚠️ Chưa cấu hình Google Apps Script URL trong js/config.js!");
    return;
  }

  // Tạo mã đơn hàng 1 lần duy nhất ở client, gửi lên server để dùng chung
  const orderCode = "HV-" + Math.floor(100000 + Math.random() * 900000);

  // Thu thập dữ liệu
  const orderData = {
    orderCode,
    name,
    phone,
    email: document.getElementById("recv-email").value.trim(),
    address,
    district: document.getElementById("recv-district").value,
    deliveryDate: document.getElementById("delivery-date").value,
    deliveryTime: document.getElementById("delivery-time").value,
    message: document.getElementById("card-message").value.trim(),
    paymentMethod: getSelectedPayment(),
    items: cartLoad(),
    subtotal: cartSubtotal(),
    discount: _cartDiscount,
    total: cartTotal(_cartDiscount),
  };

  // UI: đang gửi
  const btn = document.getElementById("btn-place-order");
  btn.disabled = true;
  btn.textContent = "⏳ Đang gửi đơn hàng...";

  fetch(CONFIG.GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",         // Google Apps Script yêu cầu no-cors
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  })
    .then(() => {
      // no-cors không trả về response body → coi như thành công
      onOrderSuccess(orderData);
    })
    .catch(err => {
      console.error(err);
      showToast("❌ Gửi đơn thất bại, vui lòng thử lại!");
      btn.disabled = false;
      btn.textContent = "Đặt Hàng Ngay";
    });
}

function onOrderSuccess(orderData) {
  // Dùng mã đã tạo từ trước (cùng mã đã gửi lên Google Sheets)
  const orderCode = orderData.orderCode;

  // Lưu vào lịch sử đơn hàng local
  const history = JSON.parse(localStorage.getItem("hoatuoi_orders") || "[]");
  history.unshift({ ...orderData, orderCode, date: new Date().toLocaleDateString("vi-VN"), status: "pending" });
  localStorage.setItem("hoatuoi_orders", JSON.stringify(history));

  // Lưu thông tin để trang thanhcong.html đọc
  sessionStorage.setItem("lastOrder", JSON.stringify({ ...orderData, orderCode }));

  // Xóa giỏ hàng
  localStorage.removeItem(CART_KEY);
  _cartDiscount = 0;
  cartUpdateBadge();

  showToast("🎉 Đặt hàng thành công! Mã: " + orderCode);
  setTimeout(() => window.location.href = "thanhcong.html", 1200);
}

// ── Helper ───────────────────────────────────────────────────────

function getSelectedPayment() {
  const selected = document.querySelector(".payment-option.selected");
  if (!selected) return "COD";
  const label = selected.querySelector(".fw-bold");
  return label ? label.textContent.trim() : "COD";
}

function highlightEmpty(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el && !el.value.trim()) {
      el.style.borderColor = "red";
      el.addEventListener("input", () => el.style.borderColor = "", { once: true });
    }
  });
}

function selectPayment(el, type) {
  document.querySelectorAll(".payment-option").forEach(o => {
    o.classList.remove("selected");
    o.querySelector("input").checked = false;
  });
  el.classList.add("selected");
  el.querySelector("input").checked = true;
  const bankDetails = document.getElementById("bank-details");
  if (bankDetails) bankDetails.classList.toggle("d-none", type !== "bank");
}