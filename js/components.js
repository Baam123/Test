/* js/components.js — Header & Footer dùng chung cho tất cả trang */

// ── Auth state (dùng sessionStorage để giữ giữa các trang) ───────
function authGetUser() {
  try { return JSON.parse(sessionStorage.getItem("hoatuoi_user")) || null; } catch { return null; }
}
function authSetUser(user) {
  sessionStorage.setItem("hoatuoi_user", JSON.stringify(user));
}
function authLogout() {
  sessionStorage.removeItem("hoatuoi_user");
}

// ── Header ───────────────────────────────────────────────────────
function renderHeader() {
  const user = authGetUser();
  const userHTML = user
    ? `<div class="user-dropdown-wrap" id="user-dropdown-wrap">
         <button class="user-icon-btn" onclick="toggleUserDropdown(event)" title="${user.name}">
           <i class="bi bi-person-circle"></i>
           <span class="user-icon-name">${user.name.split(' ').pop()}</span>
         </button>
         <div class="user-dropdown" id="user-dropdown">
           <div class="user-dropdown-header">
             <i class="bi bi-person-circle" style="font-size:1.6rem;color:var(--pink-main);"></i>
             <div>
               <div class="fw-bold" style="font-size:.9rem;">${user.name}</div>
               <div class="text-muted" style="font-size:.78rem;">${user.email || ''}</div>
             </div>
           </div>
           <a href="taikhoan.html" class="user-dropdown-item"><i class="bi bi-bag-check"></i> Đơn hàng của tôi</a>
           <a href="taikhoan.html" class="user-dropdown-item"><i class="bi bi-person"></i> Thông tin tài khoản</a>
           <div class="user-dropdown-divider"></div>
           <a href="#" class="user-dropdown-item text-danger" onclick="doLogoutGlobal();return false;">
             <i class="bi bi-box-arrow-right"></i> Đăng xuất
           </a>
         </div>
       </div>`
    : `<div class="user-dropdown-wrap" id="user-dropdown-wrap">
         <button class="user-icon-btn" onclick="toggleUserDropdown(event)" title="Tài khoản">
           <i class="bi bi-person"></i>
         </button>
         <div class="user-dropdown" id="user-dropdown">
           <div class="user-dropdown-header" style="justify-content:center;text-align:center;">
             <div>
               <div style="font-size:2rem;">🌸</div>
               <div class="fw-bold" style="color:var(--pink-dark);">Chào mừng!</div>
               <div class="text-muted" style="font-size:.82rem;">Đăng nhập để xem đơn hàng</div>
             </div>
           </div>
           <a href="taikhoan.html?tab=login" class="user-dropdown-item fw-bold" style="color:var(--pink-dark);">
             <i class="bi bi-box-arrow-in-right"></i> Đăng nhập
           </a>
           <a href="taikhoan.html?tab=register" class="user-dropdown-item">
             <i class="bi bi-person-plus"></i> Đăng ký tài khoản
           </a>
         </div>
       </div>`;

  document.getElementById("site-header").innerHTML = `
  <header>
    <div class="logo-header">
      <div class="container d-flex justify-content-between align-items-center">
        <a href="index.html">
          <img src="./img/logo1.png" alt="Hoa Tươi Hy Vọng" class="logo" onerror="this.style.display='none'">
        </a>
        <div class="search-bar">
          <input type="text" placeholder="🔍 Tìm kiếm hoa..." class="form-control" oninput="handleSearch(this.value)">
          ${userHTML}
          <a href="giohang.html" class="btn btn-light border position-relative"
             style="background:linear-gradient(135deg,#FFF3CC,#FFE4E1);">
            <i class="bi bi-cart"></i>
            <span class="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle" id="cart-count">0</span>
          </a>
        </div>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-custom">
      <div class="container">
        <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <i class="bi bi-list fs-2" style="color:#FF5CA4;"></i>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="mainNav">
          <ul class="navbar-nav">
            <li class="nav-item"><a class="nav-link" href="danhmuc.html?cat=HOA SINH NHẬT">HOA SINH NHẬT</a></li>
            <li class="nav-item"><a class="nav-link" href="danhmuc.html?cat=HOA KHAI TRƯƠNG">HOA KHAI TRƯƠNG</a></li>
            <li class="nav-item"><a class="nav-link" href="danhmuc.html?cat=HOA THEO BÓ">HOA THEO BÓ</a></li>
            <li class="nav-item"><a class="nav-link" href="danhmuc.html?cat=CHỦ ĐỀ ĐẶC BIỆT">CHỦ ĐỀ</a></li>
            <li class="nav-item"><a class="nav-link" href="danhmuc.html?cat=THIẾT KẾ RIÊNG">THIẾT KẾ</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>`;

  // Đóng dropdown khi click ngoài
  document.addEventListener("click", (e) => {
    const wrap = document.getElementById("user-dropdown-wrap");
    if (wrap && !wrap.contains(e.target)) {
      document.getElementById("user-dropdown")?.classList.remove("show");
    }
  });
}

function toggleUserDropdown(e) {
  e.stopPropagation();
  document.getElementById("user-dropdown").classList.toggle("show");
}

function doLogoutGlobal() {
  authLogout();
  // Re-render header để cập nhật trạng thái đăng xuất
  renderHeader();
  if (typeof cartUpdateBadge === 'function') cartUpdateBadge();
  // Toast vẫn nằm trong footer (không re-render footer để tránh mất toast-container)
  showToast("👋 Đã đăng xuất!");
}

// ── Footer ───────────────────────────────────────────────────────
function renderFooter() {
  document.getElementById("site-footer").innerHTML = `
  <footer>
    <!-- Wave divider -->
    <div class="footer-wave">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#1a0a12"/>
      </svg>
    </div>

    <div class="footer-main">
      <div class="container">
        <div class="row g-5">

          <!-- Cột 1: Brand -->
          <div class="col-12 col-md-4">
            <div class="footer-brand">
              <div class="footer-logo-text">🌸 Hoa Tươi Hy Vọng</div>
              <p class="footer-tagline">Mỗi bó hoa là một câu chuyện — chúng tôi giúp bạn kể câu chuyện đó thật đẹp.</p>
              <div class="footer-contact-list">
                <div class="footer-contact-item">
                  <span class="footer-contact-icon"><i class="bi bi-geo-alt-fill"></i></span>
                  <span>123 Đường ABC, Q1, TP.HCM</span>
                </div>
                <div class="footer-contact-item">
                  <span class="footer-contact-icon"><i class="bi bi-telephone-fill"></i></span>
                  <span>0123 456 789</span>
                </div>
                <div class="footer-contact-item">
                  <span class="footer-contact-icon"><i class="bi bi-envelope-fill"></i></span>
                  <span>shophoatuoi@gmail.com</span>
                </div>
                <div class="footer-contact-item">
                  <span class="footer-contact-icon"><i class="bi bi-clock-fill"></i></span>
                  <span>07:00 – 18:30 (Thứ 2 – CN)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Cột 2: Danh mục + Hỗ trợ -->
          <div class="col-6 col-md-2">
            <div class="footer-section-title">Danh Mục</div>
            <ul class="footer-links">
              <li><a href="danhmuc.html?cat=HOA SINH NHẬT">Hoa Sinh Nhật</a></li>
              <li><a href="danhmuc.html?cat=HOA KHAI TRƯƠNG">Hoa Khai Trương</a></li>
              <li><a href="danhmuc.html?cat=HOA THEO BÓ">Hoa Theo Bó</a></li>
              <li><a href="danhmuc.html?cat=CHỦ ĐỀ ĐẶC BIỆT">Chủ Đề Đặc Biệt</a></li>
              <li><a href="danhmuc.html?cat=THIẾT KẾ RIÊNG">Thiết Kế Riêng</a></li>
            </ul>
          </div>

          <div class="col-6 col-md-2">
            <div class="footer-section-title">Hỗ Trợ</div>
            <ul class="footer-links">
              <li><a href="#">Chính Sách Giao Hàng</a></li>
              <li><a href="#">Chính Sách Đổi Trả</a></li>
              <li><a href="#">Hướng Dẫn Mua Hàng</a></li>
              <li><a href="#">Điều Khoản Sử Dụng</a></li>
              <li><a href="#">Liên Hệ Chúng Tôi</a></li>
            </ul>
          </div>

          <!-- Cột 4: Social + Email -->
          <div class="col-12 col-md-4">
            <div class="footer-section-title">Kết Nối Với Chúng Tôi</div>
            <div class="footer-social-row">
              <a href="#" class="footer-social-btn facebook" title="Facebook"><i class="bi bi-facebook"></i></a>
              <a href="#" class="footer-social-btn youtube" title="YouTube"><i class="bi bi-youtube"></i></a>
              <a href="#" class="footer-social-btn instagram" title="Instagram"><i class="bi bi-instagram"></i></a>
              <a href="#" class="footer-social-btn tiktok" title="TikTok"><i class="bi bi-tiktok"></i></a>
            </div>
            <div class="footer-subscribe-box">
              <div class="footer-section-title" style="margin-top:24px;">Nhận Ưu Đãi Độc Quyền</div>
              <p style="color:#c084a0;font-size:.82rem;margin-bottom:10px;">Đăng ký để nhận thông tin khuyến mãi và bộ sưu tập mới nhất.</p>
              <div class="footer-subscribe-row">
                <input type="email" id="subscribe-email" placeholder="Nhập email của bạn...">
                <button id="subscribe-btn">Đăng Ký</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom-bar">
      <div class="container">
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <span>© 2025 Hoa Tươi Hy Vọng. All rights reserved.</span>
          <div class="footer-badges">
            <span><i class="bi bi-shield-check me-1"></i>Thanh toán bảo mật</span>
            <span><i class="bi bi-truck me-1"></i>Freeship nội thành</span>
            <span><i class="bi bi-arrow-counterclockwise me-1"></i>Đổi trả 24h</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <div id="toast-container" class="toast-container"></div>`;
}

// ── Init ─────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("site-header")) renderHeader();
  if (document.getElementById("site-footer")) renderFooter();

  setTimeout(() => {
    document.getElementById("subscribe-btn")?.addEventListener("click", () => {
      const emailEl = document.getElementById("subscribe-email");
      if (!emailEl.value.includes("@")) { emailEl.style.borderColor = "red"; return; }
      emailEl.style.borderColor = "";
      emailEl.value = "";
      document.getElementById("subscribe-btn").textContent = "✓ Xong!";
      setTimeout(() => document.getElementById("subscribe-btn").textContent = "Đăng Ký", 2000);
      showToast("📧 Đăng ký nhận tin thành công!");
    });
  }, 100);
});