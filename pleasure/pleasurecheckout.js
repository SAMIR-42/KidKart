// pleasurecheckout.js - Handles fake payment process for Pleasure section

const checkoutForm = document.getElementById("checkoutForm");
const loading = document.getElementById("loading");
const success = document.getElementById("success");

// Handle form submission
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Show loading animation
  loading.style.display = "block";
  success.style.display = "none";

  // Simulate payment processing
  setTimeout(() => {
    loading.style.display = "none";
    success.style.display = "block";

    // Clear Pleasure cart
    localStorage.removeItem("pleasureCart");

    // Optional: redirect back to shop after 3 seconds
    setTimeout(() => {
      window.location.href = "pleasure.html";
    }, 3000);
  }, 2000); // 2 seconds loading
});
