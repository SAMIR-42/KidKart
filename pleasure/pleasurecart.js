// pleasurecart.js - Handles Pleasure Cart: display, remove, total, checkout

const cartContainer = document.getElementById("cartContainer");
const totalPriceElem = document.getElementById("totalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");
const popup = document.getElementById("popup");

let cart = JSON.parse(localStorage.getItem("pleasureCart")) || [];

// Display cart items
function displayCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    // Display first image from product imgs array
    const imgSrc = item.imgs ? item.imgs[0] : "";
    div.innerHTML = `
      <img src="${imgSrc}" alt="${item.name}">
      <div class="item-info">
        <h4>${item.name}</h4>
        <p>Age: ${item.age}+</p>
        <p>₹${item.price}</p>
      </div>
      <button class="remove-btn">Remove</button>
    `;

    // Remove item from cart
    div.querySelector(".remove-btn").addEventListener("click", () => {
      cart.splice(index, 1);
      localStorage.setItem("pleasureCart", JSON.stringify(cart));
      displayCart();
      showPopup("Item Removed!");
    });

    cartContainer.appendChild(div);
  });

  totalPriceElem.innerText = `₹${total}`;
}

// Checkout button functionality
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    showPopup("Cart is empty!");
    return;
  }
  window.location.href = "pleasurecheckout.html";
});

// Show popup message
function showPopup(msg) {
  popup.innerText = msg;
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
}

// Initial display
displayCart();
