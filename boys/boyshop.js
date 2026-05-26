document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const dollsGrid = document.getElementById("dollsGrid");

  KidKart.initShop("#dollsGrid", {
    checkoutUrl: "checkout.html",
    category: "action",
  });

  if (searchInput && dollsGrid) {
    searchInput.addEventListener("input", () => {
      const filter = searchInput.value.toLowerCase().trim();
      dollsGrid.querySelectorAll(".doll-card").forEach((card) => {
        const country = (card.dataset.country || "").toLowerCase();
        const name = card.querySelector("h2")?.textContent.toLowerCase() || "";
        const match = !filter || country.includes(filter) || name.includes(filter);
        card.style.display = match ? "" : "none";
      });
    });
  }
});
