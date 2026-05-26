document.addEventListener("DOMContentLoaded", () => {
  const checkoutForm = document.getElementById("checkoutForm");
  const loading = document.getElementById("loading");

  if (!checkoutForm) return;

  const items = KidKart.getCheckoutItems();
  if (!items.length) {
    KidKart.showToast("Add toys to cart first!", "error");
    setTimeout(() => (window.location.href = "boyshop.html"), 1200);
    return;
  }

  checkoutForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loading.style.display = "flex";
    checkoutForm.style.pointerEvents = "none";

    await new Promise((r) => setTimeout(r, 2000));

    loading.style.display = "none";
    checkoutForm.style.pointerEvents = "";

    const orderId = KidKart.generateOrderId();
    KidKart.clearCart();
    checkoutForm.reset();

    await KidKart.showModal({
      title: "Payment Successful!",
      message: `Order ${orderId} confirmed. Your toys arrive in 2 days!`,
      icon: "fa-check",
      primaryText: "Back to Shop",
    });

    window.location.href = "boyshop.html";
  });
});
