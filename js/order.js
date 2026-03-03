/* ================================================================
   js/order.js — Gửi đơn hàng về Google Sheets
   ================================================================ */

function placeOrder() {
  // Validate
  const name    = document.getElementById("recv-name").value.trim();
  const phone   = document.getElementById("recv-phone").value.trim();
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

  // Thu thập dữ liệu
  const orderData = {
    name,
    phone,
    email:          document.getElementById("recv-email").value.trim(),
    address,
    district:       document.getElementById("recv-district").value,
    deliveryDate:   document.getElementById("delivery-date").value,
    deliveryTime:   document.getElementById("delivery-time").value,
    message:        document.getElementById("card-message").value.trim(),
    paymentMethod:  getSelectedPayment(),
    items:          cartLoad(),
    subtotal:       cartSubtotal(),
    discount:       _cartDiscount,
    total:          cartTotal(_cartDiscount),
  };

  // UI: đang gửi
  const btn = document.getElementById("btn-place-order");
  btn.disabled    = true;
  btn.textContent = "⏳ Đang gửi đơn hàng...";

  fetch(CONFIG.GOOGLE_SCRIPT_URL, {
    method:  "POST",
    mode:    "no-cors",         // Google Apps Script yêu cầu no-cors
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(orderData),
  })
  .then(() => {
    // no-cors không trả về response body → coi như thành công
    onOrderSuccess(orderData);
  })
  .catch(err => {
    console.error(err);
    showToast("❌ Gửi đơn thất bại, vui lòng thử lại!");
    btn.disabled    = false;
    btn.textContent = "Đặt Hàng Ngay";
  });
}

function onOrderSuccess(orderData) {
  // Tạo mã đơn hàng phía client (server cũng tạo riêng, chỉ để hiển thị)
  const orderCode = "HV-" + Date.now().toString().slice(-6);

  // Điền trang success
  document.getElementById("success-order-code").textContent = orderCode;
  document.getElementById("success-name").textContent       = orderData.name;
  document.getElementById("success-phone").textContent      = orderData.phone;
  document.getElementById("success-time").textContent       = orderData.deliveryDate + " lúc " + orderData.deliveryTime;
  document.getElementById("success-total").textContent      = formatPrice(orderData.total);

  // Lưu vào lịch sử đơn hàng local
  const history = JSON.parse(localStorage.getItem("hoatuoi_orders") || "[]");
  history.unshift({ ...orderData, orderCode, date: new Date().toLocaleDateString("vi-VN"), status: "pending" });
  localStorage.setItem("hoatuoi_orders", JSON.stringify(history));

  // Xóa giỏ hàng
  localStorage.removeItem(CART_KEY);
  _cartDiscount = 0;
  cartUpdateBadge();
  document.getElementById("floating-cart-btn").style.display = "none";

  showPage("success");
  showToast("🎉 Đặt hàng thành công! Mã: " + orderCode);
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
