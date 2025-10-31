/* ===============================
   Watch Movies - Main Script
   =============================== */

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // Banner rotation
  const banners = [
    "../assets/premier-banner.jpg",
    "../assets/movie_thriller.jpg"
  ];
  let index = 0;
  const bannerEl = document.querySelector(".hero-banner");

  if (bannerEl) {
    setInterval(() => {
      index = (index + 1) % banners.length;
      bannerEl.style.backgroundImage = `url('${banners[index]}')`;
    }, 4000);
  }

  console.log("🎬 Watch Movies - Main initialized");
});
