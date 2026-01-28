// ===== LINK SHOPEE CỦA BẠN =====
const SHOPEE_LINK = "https://s.shopee.vn/qdbdeLuMN";

// ===== BIẾN KIỂM SOÁT CLICK =====
let clicked = false;

/*
  LẦN ĐẦU MỞ LINK:
  - Click ở đâu trên trang cũng mở Shopee
  - Chỉ 1 lần
  - Sau đó gỡ overlay để xem nội dung
*/
document.addEventListener("click", function () {
  if (clicked) return;
  clicked = true;

  // Mở Shopee tab mới
  window.open(SHOPEE_LINK, "_blank");

  // Ẩn overlay nếu có
  const overlay = document.getElementById("overlay");
  if (overlay) overlay.style.display = "none";
}, { once: true });


// ===== LOAD NỘI DUNG THEO ID =====
const params = new URLSearchParams(window.location.search);
const id = params.get("id") || "1";

fetch("contents.json")
  .then(res => res.json())
  .then(data => {
    const item = data[id];
    if (!item) {
      document.body.innerHTML = "<h2>Không tìm thấy nội dung</h2>";
      return;
    }

    // Tiêu đề & nội dung
    const titleEl = document.getElementById("title");
    const contentEl = document.getElementById("content");
    const mediaBox = document.getElementById("media");

    if (titleEl) titleEl.innerText = item.title || "";
    if (contentEl) contentEl.innerText = item.content || "";

    if (mediaBox) {
      mediaBox.innerHTML = "";

      // Ảnh
      if (item.images && Array.isArray(item.images)) {
        item.images.forEach(src => {
          const img = document.createElement("img");
          img.src = src;
          mediaBox.appendChild(img);
        });
      }

      // Video
      if (item.videos && Array.isArray(item.videos)) {
        item.videos.forEach(src => {
          const video = document.createElement("video");
          video.src = src;
          video.controls = true;
          mediaBox.appendChild(video);
        });
      }
    }
  })
  .catch(err => {
    console.error("Lỗi load contents.json:", err);
  });
