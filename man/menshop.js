// menshop.js - Handles Men's Shop: display products, search, add-to-cart, buy-now

const products = [
  {
    name: "Smart Learning Tablet",
    age: 8,
    desc: "Interactive learning tablet with alphabets, numbers and fun quiz games",
    price: 1299,
    img: "../assets/sl.jpg",
  },
  {
    name: "Princess Makeup Play Kit",
    age: 10,
    desc: "Safe pretend makeup set with mirror and colorful accessories.",
    price: 899,
    img: "../assets/pm.jpg",
  },
  {
    name: "Turbo Drift Racing Car",
    age: 12,
    desc: "High-speed remote car with drift wheels and LED headlights.",
    price: 1499,
    img: "../assets/td.jpg",
  },
  {
    name: "Creative Art & Craft Box",
    age: 12,
    desc: "Complete DIY craft kit with colors, stickers and activity sheets.",
    price: 699,
    img: "../assets/ca.jpg",
  },
  {
    name: "Dino World Adventure Set",
    age: 9,
    desc: "Realistic dinosaur figures with jungle play mat..",
    price: 849,
    img: "../assets/dw.jpg",
  },

  {
    name: "Cute Talking Teddy Bear",
    age: 8,
    desc: "Soft plush teddy that repeats what kids say in a funny voice.",
    price: 999,
    img: "../assets/ct.jpg",
  },

  {
    name: "Mini Basketball Pro Set",
    age: 12,
    desc: "Indoor wall-mount basketball hoop with mini ball.",
    price: 799,
    img: "../assets/mb.jpg",
  },

  {
    name: "Science Discovery Lab Kit",
    age: 13,
    desc: "Safe science experiments to boost curiosity and",
    price: 1399,
    img: "../assets/sd.jpg",
  },

  {
    name: "Hero Power Blaster",
    age: 14,
    desc: "Foam dart blaster with long-range shooting action.",
    price: 1099,
    img: "../assets/hp.jpg",
  },

  {
    name: "Musical Dance Mat",
    age: 12,
    desc: " Light-up dance mat with music and movement challenges.",
    price: 1199,
    img: "../assets/md.jpg",
  },
];

const shopContainer = document.getElementById("shopContainer");
const searchInput = document.getElementById("searchInput");
const popup = document.getElementById("popup");
let cart = JSON.parse(localStorage.getItem("menCart")) || [];

function displayProducts(list) {
  shopContainer.innerHTML = "";
  list.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src='${product.img}' alt='${product.name}'>
      <h3>${product.name}</h3>
      <p>Age: ${product.age}+</p>
      <p>${product.desc}</p>
      <p class='price'>₹${product.price}</p>
      <button class='add-to-cart'>Add to Cart</button>
      <button class='buy-now'>Buy Now</button>
    `;

    // Add to Cart
    card.querySelector(".add-to-cart").addEventListener("click", () => {
      cart.push(product);
      localStorage.setItem("menCart", JSON.stringify(cart));
      showPopup("Added to Cart!");
    });

    // Buy Now
    card.querySelector(".buy-now").addEventListener("click", () => {
      cart.push(product);
      localStorage.setItem("menCart", JSON.stringify(cart));
      window.location.href = "mencheckout.html";
    });

    shopContainer.appendChild(card);
  });
}

function showPopup(msg) {
  popup.innerText = msg;
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
}

// Search filter
searchInput.addEventListener("input", () => {
  const filter = searchInput.value.toLowerCase();
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(filter)
  );
  displayProducts(filtered);
});

// Initial display
displayProducts(products);
