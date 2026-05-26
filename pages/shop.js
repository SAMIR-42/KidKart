document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const dollGrid = document.getElementById("dollGrid");

  KidKart.initShop("#dollGrid", {
    checkoutUrl: "checkout.html",
    category: "toys",
  });

  if (searchInput && dollGrid) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase().trim();
      dollGrid.querySelectorAll(".doll-card").forEach((card) => {
        const country = (card.dataset.country || "").toLowerCase();
        const name = card.querySelector("h2")?.textContent.toLowerCase() || "";
        const desc = card.querySelector(".kk-card-desc")?.textContent.toLowerCase() || "";
        const match =
          !query || country.includes(query) || name.includes(query) || desc.includes(query);
        card.classList.toggle("kk-hidden-card", !match);
      });
    });
  }
});
