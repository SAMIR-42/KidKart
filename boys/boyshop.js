// ========================
// BOYS SHOP PAGE JS
// ========================

// DOM Elements
const dollsGrid = document.getElementById("dollsGrid");
const searchInput = document.getElementById("searchInput");

// ========================
// ADD TO CART FUNCTIONALITY
// ========================
dollsGrid.addEventListener("click", function (e) {
  const target = e.target;

  if (target.classList.contains("add-cart")) {
    const dollCard = target.closest(".doll-card");
    const dollName = dollCard.querySelector("h2").textContent;
    const dollPrice = dollCard.dataset.price;

    // Add to boys cart (localStorage key: 'boysCart')
    let cart = JSON.parse(localStorage.getItem("boysCart")) || [];
    cart.push({
      name: dollName,
      price: dollPrice,
    });
    localStorage.setItem("boysCart", JSON.stringify(cart));

    showPopup(`${dollName} added to Cart!`);
  }

  if (target.classList.contains("buy-now")) {
    window.location.href = "checkout.html";
  }
});

// ========================
// SEARCH BY COUNTRY
// ========================
searchInput.addEventListener("input", function () {
  const filter = searchInput.value.toLowerCase();
  const dollCards = dollsGrid.querySelectorAll(".doll-card");

  dollCards.forEach((card) => {
    const country = card.dataset.country.toLowerCase();
    card.style.display = country.includes(filter) ? "" : "none";
  });
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
