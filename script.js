const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");
const header = document.querySelector(".site-header");

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.classList.toggle("active", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
}, { passive: true });

document.querySelectorAll("img[data-fallback]").forEach((image) => {
  const setFallback = () => {
    image.classList.add("fallback");
    const frame = image.closest(".photo-frame");
    if (frame) frame.dataset.label = image.dataset.fallback;
  };
  image.addEventListener("error", setFallback);
  if (image.complete && image.naturalWidth === 0) setFallback();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
