// ========================
// CART PAGE JS
// ========================

// DOM Elements
const cartContainer = document.getElementById("cartContainer");
const totalPriceElem = document.getElementById("totalPrice");
const backBtn = document.getElementById("backBtn");
const buyBtn = document.getElementById("buyBtn");

// ========================
// CALCULATE TOTAL PRICE
// ========================
function updateTotal() {
  const cartItems = document.querySelectorAll(".cart-item");
  let total = 0;
  cartItems.forEach((item) => {
    total += parseInt(item.dataset.price);
  });
  totalPriceElem.textContent = total.toLocaleString();
}

// ========================
// REMOVE ITEM
// ========================
cartContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item")) {
    const item = e.target.closest(".cart-item");
    const itemName = item.querySelector("h2").textContent;
    item.remove();
    showPopup(`${itemName} removed from cart! ❌`);
    updateTotal();
  }
});

// ========================
// BACK BUTTON
// ========================
backBtn.addEventListener("click", () => {
  window.location.href = "shop.html";
});

// ========================
// PROCEED TO BUY
// ========================
buyBtn.addEventListener("click", () => {
  window.location.href = "checkout.html";
});

// ========================
// CUSTOM POPUP FUNCTION
// ========================
function showPopup(message) {
  const popup = document.createElement("div");
  popup.classList.add("custom-popup");
  popup.textContent = message;

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

  setTimeout(() => {
    popup.style.transform = "translate(-50%, -50%) scale(1)";
    popup.style.opacity = 1;
  }, 100);

  setTimeout(() => {
    popup.style.transform = "translate(-50%, -50%) scale(0)";
    popup.style.opacity = 0;
  }, 1600);

  setTimeout(() => {
    popup.remove();
  }, 2000);
}

// ========================
// INITIALIZE
// ========================
updateTotal();
