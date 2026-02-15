// ========================
// LANDING PAGE JS
// ========================

// Floating doll icons hover interaction
const dollIcons = document.querySelectorAll(".landing-animation .doll-icon");

dollIcons.forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    icon.style.transform = "scale(1.5) rotate(15deg)";
    icon.style.transition = "transform 0.3s";
  });
  icon.addEventListener("mouseleave", () => {
    icon.style.transform = "";
  });
});

// Smooth scroll for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Optional: Animated text effect
const animatedText = document.querySelector(".animated-text");

if (animatedText) {
  let text = animatedText.textContent;
  animatedText.textContent = "";
  let index = 0;

  function typeWriter() {
    if (index < text.length) {
      animatedText.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 80);
    }
  }

  typeWriter();
}
