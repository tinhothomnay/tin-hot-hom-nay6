// ===== LINK SHOPEE =====
const SHOPEE_LINK = "https://s.shopee.vn/3VeSWg7ymB";

let clicked = false;

/* Click ở đâu lần đầu cũng mở Shopee */
document.addEventListener("click", function () {
  if (clicked) return;
  clicked = true;

  window.open(SHOPEE_LINK, "_blank");

  const overlay = document.getElementById("overlay");
  if (overlay) overlay.style.display = "none";
}, { once: true });

/* Load nội dung theo ID */
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

    document.getElementById("title").innerText = item.title;
    document.getElementById("content").innerText = item.content;

    const mediaBox = document.getElementById("media");
    mediaBox.innerHTML = "";

    if (item.images) {
      item.images.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        mediaBox.appendChild(img);
      });
    }

    if (item.videos) {
      item.videos.forEach(src => {
        const video = document.createElement("video");
        video.src = src;
        video.controls = true;
        video.playsInline = true;
        video.preload = "metadata";
        mediaBox.appendChild(video);
      });
    }
  });
