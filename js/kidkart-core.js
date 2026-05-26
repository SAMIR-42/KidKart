/**
 * KidKart — shared cart, toast & modal (all pages)
 */
const KidKart = (function () {
  const CART_KEY = "kidkartCart";

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
  }

  function parsePrice(value) {
    if (typeof value === "number") return value;
    return parseInt(String(value).replace(/[^\d]/g, ""), 10) || 0;
  }

  function slugify(name) {
    return String(name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function migrateLegacyCarts() {
    if (getCart().length > 0) return;
    const legacy = [
      { key: "boysCart", category: "action" },
      { key: "menCart", category: "trending" },
      { key: "pleasureCart", category: "learning" },
    ];
    const merged = [];
    legacy.forEach(({ key, category }) => {
      try {
        const items = JSON.parse(localStorage.getItem(key)) || [];
        items.forEach((item) => {
          merged.push({
            id: slugify(item.name) + "-" + category,
            name: item.name,
            price: parsePrice(item.price),
            image: item.img || item.image || "",
            age: item.age ? `Age: ${item.age}+` : "",
            category,
            qty: 1,
          });
        });
      } catch {
        /* ignore */
      }
    });
    if (merged.length) saveCart(merged);
  }

  function addItem(item) {
    const cart = getCart();
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      cart.push({ ...item, qty: item.qty || 1 });
    }
    saveCart(cart);
    return cart;
  }

  function removeItem(id) {
    saveCart(getCart().filter((i) => i.id !== id));
  }

  function updateQty(id, delta) {
    const cart = getCart();
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    item.qty = Math.max(1, (item.qty || 1) + delta);
    saveCart(cart);
  }

  function clearCart() {
    localStorage.removeItem(CART_KEY);
    sessionStorage.removeItem("kidkartBuyNow");
    updateCartBadge();
  }

  function getTotal(items) {
    const list = items || getCheckoutItems();
    return list.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);
  }

  function getCount() {
    return getCart().reduce((sum, i) => sum + (i.qty || 1), 0);
  }

  function getCheckoutItems() {
    const buyNow = sessionStorage.getItem("kidkartBuyNow");
    if (buyNow) {
      try {
        return JSON.parse(buyNow);
      } catch {
        return getCart();
      }
    }
    return getCart();
  }

  function setBuyNow(item) {
    sessionStorage.setItem("kidkartBuyNow", JSON.stringify([{ ...item, qty: 1 }]));
  }

  function extractFromCard(card, category = "toys") {
    const name =
      card.querySelector("h2, h3")?.textContent.trim() || "Toy";
    const priceEl =
      card.querySelector(".price, .kk-card-price") ||
      [...card.querySelectorAll("p")].find((p) => /₹|price/i.test(p.textContent));
    let price = parsePrice(priceEl?.textContent || "");
    if (!price && card.dataset.price) {
      price = parseInt(card.dataset.price, 10) || 0;
    }
    const img = card.querySelector("img")?.getAttribute("src") || "";
    const ageEl =
      card.querySelector(".age, .kk-card-meta") ||
      [...card.querySelectorAll("p")].find((p) =>
        /age/i.test(p.textContent)
      );
    const age = card.dataset.age || ageEl?.textContent.trim() || "";
    const id =
      card.dataset.id || slugify(name) + "-" + (card.dataset.country || category);

    return { id, name, price, image: img, age, category };
  }

  function showToast(message, type = "success") {
    let container = document.getElementById("kk-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "kk-toast-container";
      container.className = "kk-toast-container";
      document.body.appendChild(container);
    }
    const icons = {
      success: "fa-check-circle",
      error: "fa-exclamation-circle",
      info: "fa-info-circle",
    };
    const toast = document.createElement("div");
    toast.className = `kk-toast kk-toast--${type}`;
    toast.innerHTML = `<i class="fas ${icons[type] || icons.success}"></i><span>${message}</span>`;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("kk-toast--visible"));
    setTimeout(() => {
      toast.classList.remove("kk-toast--visible");
      setTimeout(() => toast.remove(), 350);
    }, 2800);
  }

  function showModal({
    title = "",
    message = "",
    icon = "fa-check",
    iconClass = "",
    primaryText = "OK",
    onPrimary,
    secondaryText,
    onSecondary,
  }) {
    return new Promise((resolve) => {
      const overlay = document.createElement("div");
      overlay.className = "kk-overlay";
      overlay.innerHTML = `
        <div class="kk-modal" role="dialog" aria-modal="true">
          <div class="kk-modal-icon ${iconClass}"><i class="fas ${icon}"></i></div>
          <h3>${title}</h3>
          <p>${message}</p>
          <div class="kk-modal-actions">
            ${secondaryText ? `<button type="button" class="kk-btn kk-btn-ghost" data-kk-secondary>${secondaryText}</button>` : ""}
            <button type="button" class="kk-btn kk-btn-primary" data-kk-primary>${primaryText}</button>
          </div>
        </div>`;
      document.body.appendChild(overlay);
      requestAnimationFrame(() => overlay.classList.add("kk-open"));

      function close(result) {
        overlay.classList.remove("kk-open");
        setTimeout(() => overlay.remove(), 300);
        resolve(result);
      }

      overlay.querySelector("[data-kk-primary]").addEventListener("click", () => {
        if (onPrimary) onPrimary();
        close(true);
      });
      const sec = overlay.querySelector("[data-kk-secondary]");
      if (sec) {
        sec.addEventListener("click", () => {
          if (onSecondary) onSecondary();
          close(false);
        });
      }
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close(false);
      });
    });
  }

  function updateCartBadge() {
    const count = getCount();
    document.querySelectorAll("[data-cart-badge]").forEach((el) => {
      el.textContent = count;
      el.classList.toggle("kk-hidden", count === 0);
    });
  }

  function initMobileNav() {
    const btn = document.querySelector("[data-kk-menu]");
    const nav = document.querySelector(".kk-nav");
    if (!btn || !nav) return;
    btn.addEventListener("click", () => nav.classList.toggle("kk-nav-open"));
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => nav.classList.remove("kk-nav-open"))
    );
  }

  function initShop(gridSelector, options = {}) {
    const grid = document.querySelector(gridSelector);
    if (!grid) return;

    const checkoutUrl = options.checkoutUrl || "checkout.html";
    const category = options.category || "toys";

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(
        ".add-cart, .add-to-cart, .buy-now, [data-add-cart], [data-buy-now]"
      );
      if (!btn) return;

      const card = btn.closest(".doll-card, .product-card, .kk-card");
      if (!card) return;

      const item = extractFromCard(card, category);

      if (btn.classList.contains("buy-now") || btn.hasAttribute("data-buy-now")) {
        setBuyNow(item);
        window.location.href = checkoutUrl + "?mode=buyNow";
        return;
      }

      addItem(item);
      showToast(`${item.name} added to cart!`);
    });
  }

  function formatINR(amount) {
    return "₹" + amount.toLocaleString("en-IN");
  }

  function generateOrderId() {
    return "KK" + Date.now().toString(36).toUpperCase().slice(-8);
  }

  migrateLegacyCarts();

  return {
    CART_KEY,
    getCart,
    saveCart,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    getTotal,
    getCount,
    getCheckoutItems,
    setBuyNow,
    extractFromCard,
    parsePrice,
    showToast,
    showModal,
    updateCartBadge,
    initMobileNav,
    initShop,
    formatINR,
    generateOrderId,
  };
})();

window.KidKart = KidKart;

document.addEventListener("DOMContentLoaded", () => {
  KidKart.updateCartBadge();
  KidKart.initMobileNav();
});
