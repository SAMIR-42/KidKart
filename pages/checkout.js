// ========================
// CHECKOUT PAGE JS
// ========================

// DOM Elements
const paymentForm = document.getElementById("paymentForm");
const loading = document.getElementById("loading");
const backBtn = document.getElementById("backBtn");

// ========================
// BACK TO SHOP
// ========================
backBtn.addEventListener("click", () => {
  window.location.href = "shop.html";
});

// ========================
// PAY NOW SUBMIT
// ========================
paymentForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent actual submission

  // Show loading animation
  loading.style.display = "block";

  // Simulate processing time
  setTimeout(() => {
    loading.style.display = "none";
    showPopup("Payment Successful! Your doll will arrive in 2 days 🤭");
    // Optionally, reset form
    paymentForm.reset();
  }, 2000);
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

  // Animate in
  setTimeout(() => {
    popup.style.transform = "translate(-50%, -50%) scale(1)";
    popup.style.opacity = 1;
  }, 100);

  // Animate out after 2 seconds
  setTimeout(() => {
    popup.style.transform = "translate(-50%, -50%) scale(0)";
    popup.style.opacity = 0;
  }, 2100);

  setTimeout(() => {
    popup.remove();
  }, 2500);
}
