/* js/ui.js — Điều hướng trang, render UI, tiện ích */

// ── Điều hướng ───────────────────────────────────────────────────

function showPage(name) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("page-" + name).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (name === "cart") renderCartPage();
  if (name === "checkout") renderCheckoutItems();
  if (name === "account") renderAccount();
}

function showCategory(cat) {
  document.getElementById("cat-title").textContent = cat;
  document.getElementById("cat-breadcrumb").textContent = cat;
  document.getElementById("cat-desc").textContent = "Khám phá bộ sưu tập " + cat.toLowerCase();

  const list = PRODUCTS.filter(p =>
    Array.isArray(p.category) ? p.category.includes(cat) : p.category === cat
  );
  document.getElementById("cat-count").textContent = `Hiển thị ${list.length} sản phẩm`;
  document.getElementById("cat-grid").innerHTML = list.length
    ? list.map(p => productCardHTML(p)).join("")
    : `<div class="col-12 text-center py-5 text-muted">
         <i class="bi bi-search" style="font-size:3rem;color:#f0c0d0;"></i>
         <p class="mt-3">Không có sản phẩm trong danh mục này</p>
       </div>`;
  showPage("products");
}

function showProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  const catText = Array.isArray(p.category) ? p.category.join(", ") : p.category;
  window._currentProduct = p;

  document.getElementById("detail-img").src = p.img;
  document.getElementById("detail-img").onerror = () =>
    document.getElementById("detail-img").src = p.imgFallback;
  document.getElementById("detail-name").textContent = p.name;
  document.getElementById("detail-price").textContent = formatPrice(p.price);
  document.getElementById("detail-old-price").textContent = p.oldPrice ? formatPrice(p.oldPrice) : "";
  document.getElementById("detail-desc").textContent = p.fullDesc;
  // FIX: tab mô tả cũng cần được điền nội dung
  document.getElementById("detail-desc-full").textContent = p.fullDesc;
  document.getElementById("detail-cat-badge").textContent = catText;
  document.getElementById("detail-breadcrumb-cat").textContent = catText;
  document.getElementById("detail-breadcrumb-name").textContent = p.name;
  document.getElementById("detail-tags").innerHTML = p.tags.map(t =>
    `<span class="badge-tag">${t}</span>`).join("");
  document.getElementById("detail-qty").value = 1;

  // Thumbnails
  document.getElementById("detail-thumbs").innerHTML = [p.img, p.img, p.img].map((src, i) =>
    `<img src="${src}" onerror="this.src='${p.imgFallback}'"
          class="${i === 0 ? "active-thumb" : ""}"
          onclick="switchThumb(this,'${src}')">`
  ).join("");

  // Sản phẩm liên quan
  document.getElementById("related-grid").innerHTML =
    PRODUCTS.filter(x => x.id !== id).slice(0, 4).map(q => productCardHTML(q, "col-6 col-md-3")).join("");

  showPage("detail");
}

function switchThumb(el, src) {
  document.getElementById("detail-img").src = src;
  document.querySelectorAll(".thumbnail-row img").forEach(i => i.classList.remove("active-thumb"));
  el.classList.add("active-thumb");
}

// ── Render card sản phẩm ─────────────────────────────────────────

function productCardHTML(p, colClass = "col-6 col-md-3") {
  return `
  <div class="${colClass}">
    <div class="card product-card h-100" onclick="showProduct(${p.id})">
      <img src="${p.img}" onerror="this.src='${p.imgFallback}'"
           class="card-img-top" alt="${p.name}">
      <div class="card-body d-flex flex-column align-items-center">
        <h5 class="card-title">${p.name}</h5>
        ${p.oldPrice ? `<del class="text-muted" style="font-size:.82rem;">${formatPrice(p.oldPrice)}</del>` : ""}
        <p class="price">${formatPrice(p.price)}</p>
        <button class="btn-order mt-auto"
                onclick="event.stopPropagation(); cartAdd(${p.id})">
          Đặt hàng
        </button>
      </div>
    </div>
  </div>`;
}

function renderHomeProducts() {
  const hot = PRODUCTS.filter(p => p.hot);
  const newP = PRODUCTS.filter(p => !p.hot);
  document.getElementById("home-hot-grid").innerHTML = hot.map(p => productCardHTML(p)).join("");
  document.getElementById("home-new-grid").innerHTML = newP.slice(0, 4).map(p => productCardHTML(p)).join("");
}

// ── Tìm kiếm ─────────────────────────────────────────────────────

function handleSearch(val) {
  if (!val.trim()) return;
  const q = val.toLowerCase();
  // FIX: p.desc → p.fullDesc (không có field 'desc' trong data.js)
  const list = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.fullDesc.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  );
  document.getElementById("cat-title").textContent = `Kết quả: "${val}"`;
  document.getElementById("cat-breadcrumb").textContent = "Tìm kiếm";
  document.getElementById("cat-desc").textContent = `Tìm thấy ${list.length} sản phẩm`;
  document.getElementById("cat-count").textContent = `Hiển thị ${list.length} sản phẩm`;
  document.getElementById("cat-grid").innerHTML = list.length
    ? list.map(p => productCardHTML(p)).join("")
    : `<div class="col-12 text-center py-5 text-muted">
         <i class="bi bi-search" style="font-size:3rem;color:#f0c0d0;"></i>
         <p class="mt-3">Không tìm thấy sản phẩm phù hợp</p>
       </div>`;
  showPage("products");
}

function sortProducts(type, btn) {
  document.querySelectorAll(".sort-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const cat = document.getElementById("cat-title").textContent;
  let list = PRODUCTS.filter(p =>
    Array.isArray(p.category) ? p.category.includes(cat) : p.category === cat
  );
  if (!list.length) list = [...PRODUCTS];
  if (type === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (type === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  if (type === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name, "vi"));
  document.getElementById("cat-grid").innerHTML = list.map(p => productCardHTML(p)).join("");
}

// ── Detail tabs ───────────────────────────────────────────────────

function switchDetailTab(el, tabId) {
  ["tab-desc", "tab-care", "tab-review"].forEach(id => {
    document.getElementById(id).style.display = "none";
  });
  document.getElementById(tabId).style.display = "block";
  document.querySelectorAll(".detail-info-tab .nav-link").forEach(l => l.classList.remove("active"));
  el.classList.add("active");
  return false;
}

function changeQty(delta) {
  const el = document.getElementById("detail-qty");
  el.value = Math.max(1, (parseInt(el.value) || 1) + delta);
}

function addToCartFromDetail() {
  if (!window._currentProduct) return;
  const qty = parseInt(document.getElementById("detail-qty").value) || 1;
  cartAdd(window._currentProduct.id, qty);
}

function buyNow() {
  addToCartFromDetail();
  showPage("checkout");
}

// ── Tài khoản ────────────────────────────────────────────────────
let _currentUser = null;

function renderAccount() {
  if (_currentUser) {
    document.getElementById("account-login-view").style.display = "none";
    document.getElementById("account-dashboard-view").style.display = "";
    document.getElementById("user-display-name").textContent = _currentUser;
    renderOrderHistory();
  } else {
    document.getElementById("account-login-view").style.display = "";
    document.getElementById("account-dashboard-view").style.display = "none";
  }
}

function doLogin() {
  const user = document.getElementById("login-user").value.trim();
  const pass = document.getElementById("login-pass").value;
  if (!user || !pass) { showToast("⚠️ Vui lòng nhập đầy đủ!"); return; }
  _currentUser = user.split("@")[0] || user;
  showToast("✅ Đăng nhập thành công! Chào " + _currentUser);
  renderAccount();
}

function doRegister() {
  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const agreed = document.getElementById("agree-terms").checked;
  if (!name || !email) { showToast("⚠️ Vui lòng nhập đầy đủ!"); return; }
  if (!agreed) { showToast("⚠️ Vui lòng đồng ý điều khoản!"); return; }
  _currentUser = name;
  showToast("🎉 Đăng ký thành công! Chào " + name);
  renderAccount();
}

function doLogout() {
  _currentUser = null;
  showToast("👋 Đã đăng xuất!");
  renderAccount();
}

function renderOrderHistory() {
  const el = document.getElementById("order-history-list");
  const history = JSON.parse(localStorage.getItem("hoatuoi_orders") || "[]");
  if (!history.length) {
    el.innerHTML = `<div class="text-center py-5">
      <i class="bi bi-bag" style="font-size:3rem;color:#f0c0d0;"></i>
      <p class="text-muted mt-3">Chưa có đơn hàng nào</p>
      <button class="btn-order px-4 py-2" onclick="showPage('home')">Mua sắm ngay</button>
    </div>`;
    return;
  }
  const badges = { pending: "badge-pending", processing: "badge-processing", delivered: "badge-delivered" };
  const labels = { pending: "Chờ xác nhận", processing: "Đang giao", delivered: "Đã giao" };
  el.innerHTML = history.map(o => `
    <div class="order-history-item">
      <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
        <div>
          <div class="fw-bold" style="color:var(--pink-dark);">${o.orderCode}</div>
          <div class="text-muted" style="font-size:.82rem;">Đặt ngày ${o.date}</div>
        </div>
        <span class="badge-status ${badges[o.status]}">${labels[o.status]}</span>
      </div>
      <div class="d-flex gap-2 mb-2 flex-wrap">
        ${o.items.slice(0, 3).map(i => `
          <img src="${i.img}" onerror="this.src='${i.imgFallback}'"
               style="width:48px;height:48px;object-fit:cover;border-radius:8px;">`).join("")}
        ${o.items.length > 3 ? `<div style="width:48px;height:48px;background:var(--pink-light);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--pink-dark);font-weight:700;">+${o.items.length - 3}</div>` : ""}
      </div>
      <div class="d-flex justify-content-between">
        <span class="text-muted" style="font-size:.85rem;">${o.items.length} sản phẩm • ${o.deliveryDate}</span>
        <span class="fw-bold" style="color:var(--pink-dark);">${formatPrice(o.total)}</span>
      </div>
    </div>`).join("");
}

function switchAccountTab(tab, el) {
  ["orders", "profile", "address", "wishlist", "password"].forEach(t => {
    const tabEl = document.getElementById("tab-" + t);
    if (tabEl) tabEl.style.display = "none";
  });
  const show = document.getElementById("tab-" + tab);
  if (show) show.style.display = "";
  document.querySelectorAll(".account-menu-item").forEach(i => i.classList.remove("active"));
  el.classList.add("active");
}

function switchAuthTab(tab, el) {
  document.getElementById("auth-login").style.display = tab === "login" ? "" : "none";
  document.getElementById("auth-register").style.display = tab === "register" ? "" : "none";
  document.querySelectorAll("#auth-tab-nav .nav-link").forEach(l => l.classList.remove("active"));
  el.classList.add("active");
  return false;
}

// ── Tiện ích ─────────────────────────────────────────────────────

function formatPrice(n) {
  return Number(n).toLocaleString("vi-VN") + " VND";
}

function showToast(msg) {
  const box = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast-custom";
  toast.innerHTML = `<div class="toast-icon">🌸</div><div style="font-size:.9rem;">${msg}</div>`;
  box.appendChild(toast);
  setTimeout(() => {
    toast.style.cssText += "opacity:0;transform:translateX(100px);transition:.3s;";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

function togglePass(inputId, icon) {
  const el = document.getElementById(inputId);
  el.type = el.type === "password" ? "text" : "password";
  icon.classList.toggle("bi-eye");
  icon.classList.toggle("bi-eye-slash");
}

function scrollToProducts() {
  document.getElementById("home-products").scrollIntoView({ behavior: "smooth" });
}

// ── Khởi tạo ─────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  cartUpdateBadge();
  if (document.getElementById("home-hot-grid")) renderHomeProducts();

  document.getElementById("subscribe-btn")?.addEventListener("click", () => {
    const emailEl = document.getElementById("subscribe-email");
    if (!emailEl.value.includes("@")) {
      emailEl.style.borderColor = "red"; return;
    }
    emailEl.style.borderColor = "";
    emailEl.value = "";
    document.getElementById("subscribe-btn").textContent = "✓ Xong!";
    setTimeout(() => document.getElementById("subscribe-btn").textContent = "Đăng Ký", 2000);
    showToast("📧 Đăng ký nhận tin thành công!");
  });
});