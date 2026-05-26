document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cartContainer");
  const totalPriceElem = document.getElementById("totalPrice");
  const checkoutBtn = document.getElementById("checkoutBtn");

  function render() {
    const cart = KidKart.getCart().filter((i) => i.category === "trending" || !i.category);
    const allCart = KidKart.getCart();

    cartContainer.innerHTML = "";
    let total = 0;

    if (!allCart.length) {
      cartContainer.innerHTML =
        '<p class="empty-msg">Cart is empty. <a href="menshop.html">Shop now</a></p>';
      totalPriceElem.textContent = "₹0";
      return;
    }

    allCart.forEach((item) => {
      total += item.price * (item.qty || 1);
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <img src="${item.image || "../assets/sl.jpg"}" alt="${item.name}" onerror="this.style.display='none'"/>
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>${item.age || ""}</p>
          <p>₹${(item.price * (item.qty || 1)).toLocaleString("en-IN")}</p>
        </div>
        <button type="button" class="remove-btn" data-id="${item.id}">Remove</button>`;
      cartContainer.appendChild(div);
    });

    totalPriceElem.textContent = KidKart.formatINR(total);

    cartContainer.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        KidKart.removeItem(btn.dataset.id);
        KidKart.showToast("Item removed", "info");
        render();
      });
    });
  }

  checkoutBtn.addEventListener("click", () => {
    if (!KidKart.getCart().length) {
      KidKart.showToast("Cart is empty!", "error");
      return;
    }
    sessionStorage.removeItem("kidkartBuyNow");
    window.location.href = "mencheckout.html";
  });

  render();
});
