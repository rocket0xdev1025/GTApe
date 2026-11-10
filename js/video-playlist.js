(() => {
  const box = document.querySelector(".video__video-box");
  if (!box) return;

  const video = box.querySelector("video");
  if (!video) return;

  let playlist = [];
  try {
    playlist = JSON.parse(video.getAttribute("data-playlist") || "[]");
  } catch (_) {
    playlist = [];
  }
  if (!Array.isArray(playlist) || playlist.length === 0) return;

  let index = 0;

  const loadClip = (nextIndex, shouldPlay) => {
    index = ((nextIndex % playlist.length) + playlist.length) % playlist.length;
    const src = playlist[index];
    if (video.getAttribute("src") !== src) {
      video.setAttribute("src", src);
      video.src = src;
      video.load();
    }
    if (shouldPlay) {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    }
  };

  video.removeAttribute("loop");
  loadClip(0, false);

  video.addEventListener("ended", () => {
    loadClip(index + 1, box.classList.contains("play"));
  });
})();
