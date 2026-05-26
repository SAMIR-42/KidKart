// Landing page interactions
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroTitle.style.opacity = "0";
    heroTitle.style.transform = "translateY(12px)";
    requestAnimationFrame(() => {
      heroTitle.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      heroTitle.style.opacity = "1";
      heroTitle.style.transform = "translateY(0)";
    });
  }
});
