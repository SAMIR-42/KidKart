// ========================
// BOYS CHECKOUT JS
// ========================

const checkoutForm = document.getElementById("checkoutForm");
const payBtn = document.getElementById("payBtn");
const loading = document.getElementById("loading");

checkoutForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Show loading animation
  loading.style.display = "block";
  payBtn.disabled = true;

  // Simulate payment delay (2 seconds)
  setTimeout(() => {
    loading.style.display = "none";
    payBtn.disabled = false;

    // Clear boys cart
    localStorage.removeItem("boysCart");

    // Show success popup
    showPopup("Payment Successful! Your Toy will arrive in 2 days 🤭");

    // Optional: Redirect back to boys shop after 2.5 seconds
    setTimeout(() => {
      window.location.href = "boyshop.html";
    }, 2500);
  }, 2000);
});

// ========================
// CUSTOM POPUP FUNCTION
// ========================
function showPopup(message) {
  const popup = document.createElement("div");
  popup.classList.add("custom-popup");
  popup.textContent = message;

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
