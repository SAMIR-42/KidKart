const orderStages = [
  "Order Placed",
  "Packed",
  "Shipped",
  "Out For Delivery",
  "Delivered",
];

document.addEventListener("DOMContentLoaded", () => {
  const trackBtn = document.getElementById("trackBtn");
  const orderIdInput = document.getElementById("orderId");
  const statusBox = document.getElementById("statusBox");
  const text = document.getElementById("statusText");
  const bar = document.getElementById("progressBar");

  trackBtn.addEventListener("click", () => {
    const id = orderIdInput.value.trim();
    const lastOrder = localStorage.getItem("kidkartLastOrder");

    if (!id) {
      if (window.KidKart) {
        KidKart.showToast("Please enter your Order ID", "error");
      }
      orderIdInput.classList.add("shake");
      setTimeout(() => orderIdInput.classList.remove("shake"), 400);
      return;
    }

    statusBox.classList.remove("hidden");

    let stage;
    if (lastOrder && id.toUpperCase() === lastOrder.toUpperCase()) {
      stage = orderStages.length - 1;
    } else if (id.length >= 4) {
      stage = Math.floor(Math.random() * orderStages.length);
    } else {
      if (window.KidKart) KidKart.showToast("Invalid Order ID format", "error");
      return;
    }

    text.textContent = orderStages[stage];
    bar.style.width = ((stage + 1) / orderStages.length) * 100 + "%";

    if (window.KidKart) {
      KidKart.showToast(`Status: ${orderStages[stage]}`, "success");
    }
  });
});
