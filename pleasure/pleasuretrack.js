const orderStages = [
  "Order Placed",
  "Packed",
  "Shipped",
  "Out For Delivery",
  "Delivered",
];

document.getElementById("trackBtn").addEventListener("click", () => {
  let id = document.getElementById("orderId").value.trim();
  let statusBox = document.getElementById("statusBox");
  let text = document.getElementById("statusText");
  let bar = document.getElementById("progressBar");

  if (id === "") {
    alert("Please enter valid Order ID");
    return;
  }

  statusBox.classList.remove("hidden");

  // Choose random stage
  let stage = Math.floor(Math.random() * orderStages.length);

  text.innerText = orderStages[stage];
  bar.style.width = ((stage + 1) / orderStages.length) * 100 + "%";
});
