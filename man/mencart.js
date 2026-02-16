// mencart.js - Handles Men's Cart: display items, remove, total, checkout

const cartContainer = document.getElementById("cartContainer");
const totalPriceElem = document.getElementById("totalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");
const cartPopup = document.getElementById("popup");
let cart = JSON.parse(localStorage.getItem("menCart")) || [];

function displayCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src='${item.img}' alt='${item.name}'>
      <div class='item-info'>
        <h4>${item.name}</h4>
        <p>Age: ${item.age}+</p>
        <p>₹${item.price}</p>
      </div>
      <button class='remove-btn'>Remove</button>
    `;

    div.querySelector(".remove-btn").addEventListener("click", () => {
      cart.splice(index, 1);
      localStorage.setItem("menCart", JSON.stringify(cart));
      displayCart();
      showCartPopup("Item Removed!");
    });

    cartContainer.appendChild(div);
  });

  totalPriceElem.innerText = `₹${total}`;
}

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    showCartPopup("Cart is empty!");
    return;
  }
  window.location.href = "mencheckout.html";
});

function showCartPopup(msg) {
  cartPopup.innerText = msg;
  cartPopup.classList.add("show");
  setTimeout(() => {
    cartPopup.classList.remove("show");
  }, 2000);
}

// Initial display
displayCart();
