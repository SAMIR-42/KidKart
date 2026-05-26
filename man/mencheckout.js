document.addEventListener("DOMContentLoaded", () => {
  const checkoutForm = document.getElementById("checkoutForm");
  const loading = document.getElementById("loading");

  if (!KidKart.getCheckoutItems().length) {
    KidKart.showToast("Cart is empty!", "error");
    setTimeout(() => (window.location.href = "menshop.html"), 1200);
    return;
  }

  checkoutForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loading.style.display = "block";

    await new Promise((r) => setTimeout(r, 2000));
    loading.style.display = "none";

    const orderId = KidKart.generateOrderId();
    KidKart.clearCart();
    checkoutForm.reset();

    await KidKart.showModal({
      title: "Payment Successful!",
      message: `Order ${orderId} is on the way!`,
      icon: "fa-check",
      primaryText: "Continue",
    });

    window.location.href = "menshop.html";
  });
});
