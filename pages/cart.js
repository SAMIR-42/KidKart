document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cartContainer");
  const emptyCart = document.getElementById("emptyCart");
  const cartSummary = document.getElementById("cartSummary");
  const totalPrice = document.getElementById("totalPrice");
  const grandTotal = document.getElementById("grandTotal");
  const backBtn = document.getElementById("backBtn");
  const buyBtn = document.getElementById("buyBtn");

  sessionStorage.removeItem("kidkartBuyNow");

  function renderCart() {
    const cart = KidKart.getCart();
    cartContainer.innerHTML = "";

    if (!cart.length) {
      emptyCart.classList.remove("kk-hidden");
      cartSummary.classList.add("kk-hidden");
      return;
    }

    emptyCart.classList.add("kk-hidden");
    cartSummary.classList.remove("kk-hidden");

    cart.forEach((item) => {
      const el = document.createElement("article");
      el.className = "cart-item";
      el.dataset.id = item.id;
      el.innerHTML = `
        <img src="${item.image || "../assets/turboracing.jpg"}" alt="${item.name}" onerror="this.src='../assets/turboracing.jpg'"/>
        <div class="cart-item-info">
          <h2>${item.name}</h2>
          <p class="meta">${item.age || ""} ${item.category ? "· " + item.category : ""}</p>
          <p class="item-price">${KidKart.formatINR(item.price)} × ${item.qty || 1}</p>
        </div>
        <div class="cart-item-actions">
          <div class="qty-control">
            <button type="button" data-qty-minus aria-label="Decrease">−</button>
            <span>${item.qty || 1}</span>
            <button type="button" data-qty-plus aria-label="Increase">+</button>
          </div>
          <button type="button" class="remove-item"><i class="fas fa-trash"></i> Remove</button>
        </div>`;
      cartContainer.appendChild(el);
    });

    const total = KidKart.getTotal(cart);
    totalPrice.textContent = KidKart.formatINR(total);
    grandTotal.textContent = KidKart.formatINR(total);
  }

  cartContainer.addEventListener("click", (e) => {
    const itemEl = e.target.closest(".cart-item");
    if (!itemEl) return;
    const id = itemEl.dataset.id;

    if (e.target.closest("[data-qty-plus]")) {
      KidKart.updateQty(id, 1);
      renderCart();
    }
    if (e.target.closest("[data-qty-minus]")) {
      const cart = KidKart.getCart();
      const item = cart.find((i) => i.id === id);
      if (item && (item.qty || 1) <= 1) {
        KidKart.removeItem(id);
        KidKart.showToast("Item removed from cart", "info");
      } else {
        KidKart.updateQty(id, -1);
      }
      renderCart();
    }
    if (e.target.closest(".remove-item")) {
      KidKart.removeItem(id);
      KidKart.showToast("Item removed", "info");
      renderCart();
    }
  });

  backBtn.addEventListener("click", () => {
    window.location.href = "shop.html";
  });

  buyBtn.addEventListener("click", () => {
    if (!KidKart.getCart().length) {
      KidKart.showToast("Your cart is empty!", "error");
      return;
    }
    window.location.href = "checkout.html";
  });

  renderCart();
});
