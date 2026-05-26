document.addEventListener("DOMContentLoaded", () => {
  const paymentForm = document.getElementById("paymentForm");
  const loading = document.getElementById("loading");
  const backBtn = document.getElementById("backBtn");
  const orderItems = document.getElementById("orderItems");
  const checkoutTotal = document.getElementById("checkoutTotal");
  const cardInput = document.getElementById("card");
  const expiryInput = document.getElementById("expiry");

  const items = KidKart.getCheckoutItems();

  if (!items.length) {
    KidKart.showToast("No items to checkout — add toys first!", "error");
    setTimeout(() => (window.location.href = "shop.html"), 1500);
    return;
  }

  orderItems.innerHTML = items
    .map(
      (i) =>
        `<li><span>${i.name} ×${i.qty || 1}</span><span>${KidKart.formatINR(i.price * (i.qty || 1))}</span></li>`
    )
    .join("");
  checkoutTotal.textContent = KidKart.formatINR(KidKart.getTotal(items));

  backBtn.addEventListener("click", () => {
    sessionStorage.removeItem("kidkartBuyNow");
    window.location.href = items.length && KidKart.getCart().length ? "cart.html" : "shop.html";
  });

  cardInput.addEventListener("input", () => {
    let v = cardInput.value.replace(/\D/g, "").slice(0, 16);
    cardInput.value = v.replace(/(.{4})/g, "$1 ").trim();
  });

  expiryInput.addEventListener("input", () => {
    let v = expiryInput.value.replace(/\D/g, "").slice(0, 4);
    if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2);
    expiryInput.value = v;
  });

  paymentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fields = paymentForm.querySelectorAll("input[required]");
    let valid = true;
    fields.forEach((f) => {
      f.classList.toggle("kk-invalid", !f.value.trim());
      if (!f.value.trim()) valid = false;
    });

    const cardDigits = cardInput.value.replace(/\s/g, "");
    if (cardDigits.length < 16) {
      cardInput.classList.add("kk-invalid");
      valid = false;
    }

    if (!valid) {
      KidKart.showToast("Please fill all details correctly", "error");
      return;
    }

    loading.classList.remove("kk-hidden");
    paymentForm.style.pointerEvents = "none";

    await new Promise((r) => setTimeout(r, 2200));

    loading.classList.add("kk-hidden");
    paymentForm.style.pointerEvents = "";

    const orderId = KidKart.generateOrderId();
    localStorage.setItem("kidkartLastOrder", orderId);
    KidKart.clearCart();
    paymentForm.reset();

    await KidKart.showModal({
      title: "Payment Successful!",
      message: `Order ${orderId} confirmed. Your toys will arrive in 2 days!`,
      icon: "fa-check",
      primaryText: "Continue Shopping",
    });

    window.location.href = "shop.html";
  });
});
