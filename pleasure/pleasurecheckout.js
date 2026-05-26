document.addEventListener("DOMContentLoaded", () => {
  const checkoutForm = document.getElementById("checkoutForm");
  const loading = document.getElementById("loading");
  const success = document.getElementById("success");

  if (!KidKart.getCheckoutItems().length) {
    KidKart.showToast("Cart is empty!", "error");
    setTimeout(() => (window.location.href = "pleasure.html"), 1200);
    return;
  }

  checkoutForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loading.style.display = "block";
    if (success) success.style.display = "none";

    await new Promise((r) => setTimeout(r, 2000));

    loading.style.display = "none";
    const orderId = KidKart.generateOrderId();
    localStorage.setItem("kidkartLastOrder", orderId);
    KidKart.clearCart();
    checkoutForm.reset();

    if (success) {
      success.style.display = "block";
      success.textContent = `Payment successful! Order ID: ${orderId}`;
    }

    await KidKart.showModal({
      title: "Payment Successful!",
      message: `Order ${orderId} confirmed. Happy learning!`,
      icon: "fa-check",
      primaryText: "Back to Shop",
    });

    window.location.href = "pleasure.html";
  });
});
