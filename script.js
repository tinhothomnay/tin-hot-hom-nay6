<script>
document.addEventListener("DOMContentLoaded", () => {
  const SHOPEE_LINK = "https://s.shopee.vn/qdbdeLuMN";

  // Nếu đã click trong phiên → không làm gì nữa
  if (sessionStorage.getItem("opened_shopee")) return;

  // ===== Overlay =====
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = "rgba(0,0,0,0.75)";
  overlay.style.zIndex = "9999";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.cursor = "pointer";

  // Banner (ảnh hoặc nút)
  const banner = document.createElement("div");
  banner.innerHTML = `
    <img src="banner.png" style="max-width:320px;border-radius:12px">
  `;

  overlay.appendChild(banner);
  document.body.appendChild(overlay);

  // ===== Bắt click TOÀN TRANG (1 lần) =====
  const handleFirstClick = () => {
    sessionStorage.setItem("opened_shopee", "1");
    window.open(SHOPEE_LINK, "_blank");

    overlay.remove();
    document.removeEventListener("click", handleFirstClick);
  };

  // Delay nhẹ để tránh auto-click khi load
  setTimeout(() => {
    document.addEventListener("click", handleFirstClick);
  }, 300);
});
</script>
