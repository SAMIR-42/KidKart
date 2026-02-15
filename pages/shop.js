// ========================
// SHOP PAGE JS
// ========================

// DOM Elements
const searchInput = document.getElementById("searchInput");
const dollGrid = document.getElementById("dollGrid");
const addCartButtons = document.querySelectorAll(".add-cart");
const buyNowButtons = document.querySelectorAll(".buy-now");

// ========================
// SEARCH FILTER FUNCTION
// ========================
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  const dolls = document.querySelectorAll(".doll-card");
  dolls.forEach((doll) => {
    const country = doll.dataset.country.toLowerCase();
    if (country.includes(query)) {
      doll.style.display = "block";
    } else {
      doll.style.display = "none";
    }
  });
});

// ========================
// ADD TO CART POPUP
// ========================
addCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const dollCard = button.closest(".doll-card");
    const dollName = dollCard.querySelector("h2").textContent;

    showPopup(`${dollName} added to cart! 🛒`);
  });
});

// ========================
// BUY NOW BUTTON
// ========================
buyNowButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "checkout.html";
  });
});

// ========================
// CUSTOM POPUP FUNCTION
// ========================
function showPopup(message) {
  // Create popup element
  const popup = document.createElement("div");
  popup.classList.add("custom-popup");
  popup.textContent = message;

  // Style popup
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%) scale(0)";
  popup.style.background = "#ff4d6d";
  popup.style.color = "#fff";
  popup.style.padding = "20px 30px";
  popup.style.borderRadius = "15px";
  popup.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
  popup.style.fontSize = "1.2rem";
  popup.style.zIndex = 10000;
  popup.style.transition = "transform 0.3s ease, opacity 0.3s ease";
  popup.style.opacity = 0;

  document.body.appendChild(popup);

  // Animate popup in
  setTimeout(() => {
    popup.style.transform = "translate(-50%, -50%) scale(1)";
    popup.style.opacity = 1;
  }, 100);

  // Remove popup after 1.5 seconds
  setTimeout(() => {
    popup.style.transform = "translate(-50%, -50%) scale(0)";
    popup.style.opacity = 0;
  }, 1600);

  setTimeout(() => {
    popup.remove();
  }, 2000);
}
