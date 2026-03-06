/* js/cart.js — Giỏ hàng dùng localStorage
   Tải lại trang vẫn còn dữ liệu */

const CART_KEY = "hoatuoi_cart";

// Đọc, ghi localStorage 

function cartLoad() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function cartSave(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

// Thêm vào giỏ

function cartAdd(productId, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  let items = cartLoad();
  const existing = items.find(i => i.id === productId);

  if (existing) {
    existing.qty += qty;
  } else {
    items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      imgFallback: product.imgFallback,
      qty
    });
  }

  cartSave(items);
  cartUpdateBadge();
  showToast(`✅ Đã thêm <strong>${product.name}</strong> vào giỏ!`);
}

// Xóa/sửa

function cartRemove(productId) {
  cartSave(cartLoad().filter(i => i.id !== productId));
  cartUpdateBadge();
  renderCartPage();
}

function cartSetQty(productId, qty) {
  qty = Math.max(1, parseInt(qty) || 1);
  const items = cartLoad();
  const item = items.find(i => i.id === productId);
  if (item) { item.qty = qty; cartSave(items); }
  cartUpdateBadge();
  renderCartPage();
}

function cartChangeQty(productId, delta) {
  const items = cartLoad();
  const item = items.find(i => i.id === productId);
  if (item) cartSetQty(productId, item.qty + delta);
}

function cartClear() {
  if (!confirm("Xóa toàn bộ giỏ hàng?")) return;
  localStorage.removeItem(CART_KEY);
  cartUpdateBadge();
  renderCartPage();
}

// Tính tổng

function cartSubtotal() {
  return cartLoad().reduce((s, i) => s + i.price * i.qty, 0);
}

function cartTotal(discount = 0) {
  return Math.max(0, cartSubtotal() - discount);
}

function cartCount() {
  return cartLoad().reduce((s, i) => s + i.qty, 0);
}

// Cập nhật badge

function cartUpdateBadge() {
  const n = cartCount();
  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) cartCountEl.textContent = n;
}

// Render trang giỏ hàng

function renderCartPage() {
  // Guard: chỉ render nếu đang ở trang giỏ hàng
  if (!document.getElementById("cart-empty")) return;

  const items = cartLoad();

  if (items.length === 0) {
    document.getElementById("cart-empty").classList.remove("d-none");
    document.getElementById("cart-content").style.display = "none";
    return;
  }

  document.getElementById("cart-empty").classList.add("d-none");
  document.getElementById("cart-content").style.display = "";

  document.getElementById("cart-items-tbody").innerHTML = items.map(item => `
    <tr>
      <td>
        <div class="d-flex align-items-center gap-3">
          <img src="${item.img}"
               onerror="this.src='${item.imgFallback}'"
               class="cart-item-img" alt="${item.name}">
          <div>
            <div class="fw-bold" style="font-size:.95rem;">${item.name}</div>
            <div class="text-muted d-md-none" style="font-size:.82rem;">${formatPrice(item.price)}</div>
          </div>
        </div>
      </td>
      <td class="d-none d-md-table-cell fw-bold" style="color:var(--pink-dark);">
        ${formatPrice(item.price)}
      </td>
      <td>
        <div class="cart-qty-control">
          <button onclick="cartChangeQty(${item.id}, -1)">−</button>
          <input type="number" value="${item.qty}" min="1"
                 onchange="cartSetQty(${item.id}, this.value)">
          <button onclick="cartChangeQty(${item.id}, 1)">+</button>
        </div>
      </td>
      <td class="fw-bold" style="color:var(--pink-dark);">
        ${formatPrice(item.price * item.qty)}
      </td>
      <td>
        <button onclick="cartRemove(${item.id})"
                style="background:none;border:none;color:#bbb;font-size:1.2rem;cursor:pointer;"
                title="Xóa">✕</button>
      </td>
    </tr>
  `).join("");

  updateCartSummary();
}

// Cập nhật tóm tắt giỏ hàng

let _cartDiscount = 0;

function updateCartSummary() {
  const subtotal = cartSubtotal();
  const total = cartTotal(_cartDiscount);

  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setEl("cart-subtotal", formatPrice(subtotal));
  setEl("cart-discount", _cartDiscount > 0 ? "-" + formatPrice(_cartDiscount) : "0 VND");
  setEl("cart-total", formatPrice(total));
  setEl("checkout-subtotal", formatPrice(subtotal));
  setEl("checkout-discount", _cartDiscount > 0 ? "-" + formatPrice(_cartDiscount) : "0 VND");
  setEl("checkout-total", formatPrice(total));
}

// Áp dụng mã giảm giá

function applyCoupon() {
  const code = document.getElementById("coupon-input").value.trim().toUpperCase();
  const msgEl = document.getElementById("coupon-msg");
  const coupon = CONFIG.COUPONS[code];

  if (coupon !== undefined) {
    _cartDiscount = cartSubtotal() * coupon.discount;
    sessionStorage.setItem("hoatuoi_discount", _cartDiscount.toString());
    msgEl.innerHTML = `<span style="color:green;">✅ ${coupon.label}!</span>`;
  } else {
    _cartDiscount = 0;
    sessionStorage.removeItem("hoatuoi_discount");
    msgEl.innerHTML = `<span style="color:red;">❌ Mã không hợp lệ</span>`;
  }
  updateCartSummary();
}

// Render phần tóm tắt trong checkout

function renderCheckoutItems() {
  const items = cartLoad();
  const el = document.getElementById("checkout-order-items");
  if (!el) return;

  el.innerHTML = items.length === 0
    ? `<p class="text-muted text-center py-3">Giỏ hàng trống</p>`
    : items.map(item => `
        <div class="order-item">
          <img src="${item.img}" onerror="this.src='${item.imgFallback}'" alt="${item.name}">
          <div class="flex-fill">
            <div class="fw-bold" style="font-size:.9rem;">${item.name}</div>
            <div class="text-muted" style="font-size:.82rem;">x${item.qty}</div>
          </div>
          <div class="fw-bold" style="font-size:.9rem;color:var(--pink-dark);">
            ${formatPrice(item.price * item.qty)}
          </div>
        </div>`).join("");

  updateCartSummary();

  // Set ngày giao mặc định = ngày mai
  const dateEl = document.getElementById("delivery-date");
  if (dateEl && !dateEl.value) {
    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);
    dateEl.value = tmr.toISOString().split("T")[0];
  }
}