// mencheckout.js - Handles Men's Checkout: fake payment processing and popup

const checkoutForm = document.getElementById("checkoutForm");
const loading = document.getElementById("loading");
const popup = document.getElementById("popup");

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loading.style.display = "block";

  // Simulate fake payment delay
  setTimeout(() => {
    loading.style.display = "none";
    showPopup("Payment Successful! Your order will arrive soon 🤭");
    localStorage.removeItem("menCart");
    checkoutForm.reset();
  }, 2000);
});

function showPopup(msg) {
  popup.innerText = msg;
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
}
