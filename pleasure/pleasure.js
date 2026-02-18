// pleasure.js - Shop page for Pleasure section with auto-swipe and arrow

const products = [
  {
    name: "Smart Alphabet Learning Board",
    age: 18,
    desc: "Interactive board to learn alphabets, numbers and basic words with sound buttons.",
    price: 799,
    imgs: ["../assets/sa.jpg", "../assets/sa.jpg", "../assets/sa.jpg"],
  },
  {
    name: "Junior Math Practice Kit",
    age: 8,
    desc: "Fun counting sticks and number cards to improve basic math skills..",
    price: 499,
    imgs: ["../assets/jm.jpg", "../assets/jm.jpg", "../assets/jm.jpg"],
  },
  {
    name: "Creative Building Blocks (150 pcs)",
    age: 10,
    desc: "Colorful blocks to boost creativity, logic and problem-solving ability..",
    price: 1199,
    imgs: ["../assets/cbb.jpg", "../assets/cbb.jpg", "../assets/cbb.jpg"],
  },
  {
    name: "Science Explorer Experiment Kit",
    age: 12,
    desc: "Safe science activities to encourage curiosity and hands-on learning.",
    price: 1399,
    imgs: ["../assets/se.jpg", "../assets/se.jpg", "../assets/se.jpg"],
  },

  {
    name: " Magnetic World Map Puzzle",
    age: 12,
    desc: "Educational world map puzzle to learn countries and geography in a fun way.",
    price: 899,
    imgs: ["../assets/mw.jpg", "../assets/mw.jpg", "../assets/mw.jpg"],
  },


  {
    name: "English Spelling Learning Game",
    age: 12,
    desc: " Educational world map puzzle to learn countries and geography in a fun way.",
    price: 649,
    imgs: ["../assets/es.jpg", "../assets/es.jpg", "../assets/es.jpg"],
  },

  {
    name: "Brain Booster Puzzle Set",
    age: 12,
    desc: "Logic and thinking puzzles to enhance concentration and IQ skills..",
    price: 599,
    imgs: ["../assets/bbp.jpg", "../assets/bbp.jpg", "../assets/bbp.jpg"],
  },

  {
    name: "DIY Art & Craft Activity Box",
    age: 12,
    desc: "Creative art set with colors, papers and craft materials for skill development",
    price: 699,
    imgs: ["../assets/da.jpg", "../assets/da.jpg", "../assets/da.jpg"],
  },

  {
    name: "Solar System Model Kit",
    age: 13,
    desc: "Build and paint your own solar system model while learning about planets.",
    price: 1049,
    imgs: ["../assets/ss.jpg", "../assets/ss.jpg", "../assets/ss.jpg"],
  },

  {
    name: "Kids Coding Starter Kit",
    age: 14,
    desc: "Beginner-friendly coding toy to introduce basic programming concepts.",
    price: 1799,
    imgs: ["../assets/kc.jpg", "../assets/kc.jpg", "../assets/kc.jpg"],
  },
];

const shopContainer = document.getElementById("shopContainer");
const searchInput = document.getElementById("searchInput");
const popup = document.getElementById("popup");
let cart = JSON.parse(localStorage.getItem("pleasureCart")) || [];

// Display products
function displayProducts(list) {
  shopContainer.innerHTML = "";
  list.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    // Arrow hint
    const arrowHint = document.createElement("div");
    arrowHint.classList.add("swipe-hint");
    arrowHint.innerText = "⬅️ Swipe ➡️";

    // Image slider
    const slider = document.createElement("div");
    slider.classList.add("image-slider");
    const imgElement = document.createElement("img");
    imgElement.src = product.imgs[0];
    imgElement.alt = product.name;
    slider.appendChild(imgElement);

    // Auto swipe logic
    let index = 0;
    let direction = 1; // 1: forward, -1: backward
    setInterval(() => {
      index += direction;
      if (index >= product.imgs.length)
        (direction = -1), (index = product.imgs.length - 2);
      if (index < 0) (direction = 1), (index = 1);
      imgElement.src = product.imgs[index];
    }, 3000);

    // Product info
    const info = document.createElement("div");
    info.innerHTML = `
      <h3>${product.name}</h3>
      <p>Age: ${product.age}+</p>
      <p>${product.desc}</p>
      <p class="price">₹${product.price}</p>
      <button class="add-to-cart">Add to Cart</button>
      <button class="buy-now">Buy Now</button>
    `;

    // Add-to-cart
    info.querySelector(".add-to-cart").addEventListener("click", () => {
      cart.push(product);
      localStorage.setItem("pleasureCart", JSON.stringify(cart));
      showPopup("Added to Cart!");
    });

    // Buy-now
    info.querySelector(".buy-now").addEventListener("click", () => {
      cart.push(product);
      localStorage.setItem("pleasureCart", JSON.stringify(cart));
      window.location.href = "pleasurecheckout.html";
    });

    // Assemble card
    card.appendChild(arrowHint);
    card.appendChild(slider);
    card.appendChild(info);
    shopContainer.appendChild(card);
  });
}

// Popup
function showPopup(msg) {
  popup.innerText = msg;
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 2000);
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
