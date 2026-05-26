const products = [
  { name: "Smart Alphabet Learning Board", age: 18, desc: "Interactive board to learn alphabets, numbers and basic words with sound buttons.", price: 799, imgs: ["../assets/sa.jpg"] },
  { name: "Junior Math Practice Kit", age: 8, desc: "Fun counting sticks and number cards to improve basic math skills.", price: 499, imgs: ["../assets/jm.jpg"] },
  { name: "Creative Building Blocks (150 pcs)", age: 10, desc: "Colorful blocks to boost creativity, logic and problem-solving.", price: 1199, imgs: ["../assets/cbb.jpg"] },
  { name: "Science Explorer Experiment Kit", age: 12, desc: "Safe science activities to encourage curiosity and hands-on learning.", price: 1399, imgs: ["../assets/se.jpg"] },
  { name: "Magnetic World Map Puzzle", age: 12, desc: "Educational world map puzzle to learn countries and geography.", price: 899, imgs: ["../assets/mw.jpg"] },
  { name: "English Spelling Learning Game", age: 12, desc: "Fun spelling game to build vocabulary and reading skills.", price: 649, imgs: ["../assets/es.jpg"] },
  { name: "Brain Booster Puzzle Set", age: 12, desc: "Logic puzzles to enhance concentration and thinking skills.", price: 599, imgs: ["../assets/bbp.jpg"] },
  { name: "DIY Art & Craft Activity Box", age: 12, desc: "Creative art set with colors, papers and craft materials.", price: 699, imgs: ["../assets/da.jpg"] },
  { name: "Solar System Model Kit", age: 13, desc: "Build and paint your own solar system model.", price: 1049, imgs: ["../assets/ss.jpg"] },
  { name: "Kids Coding Starter Kit", age: 14, desc: "Beginner-friendly coding toy for basic programming concepts.", price: 1799, imgs: ["../assets/kc.jpg"] },
];

const shopContainer = document.getElementById("shopContainer");
const searchInput = document.getElementById("searchInput");
const intervals = [];

function displayProducts(list) {
  intervals.forEach(clearInterval);
  intervals.length = 0;
  shopContainer.innerHTML = "";

  list.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card kk-card";
    card.dataset.id = "learn-" + product.name.toLowerCase().replace(/\s+/g, "-").slice(0, 20);
    card.dataset.price = product.price;

    const slider = document.createElement("div");
    slider.className = "kk-card-img-wrap image-slider";
    const imgElement = document.createElement("img");
    imgElement.src = product.imgs[0];
    imgElement.alt = product.name;
    imgElement.loading = "lazy";
    slider.appendChild(imgElement);

    let index = 0;
    if (product.imgs.length > 1) {
      const id = setInterval(() => {
        index = (index + 1) % product.imgs.length;
        imgElement.src = product.imgs[index];
      }, 3000);
      intervals.push(id);
    }

    const info = document.createElement("div");
    info.className = "kk-card-body";
    info.innerHTML = `
      <h3>${product.name}</h3>
      <p class="kk-card-meta">Age: ${product.age}+</p>
      <p class="kk-card-desc">${product.desc}</p>
      <p class="kk-card-price price">₹${product.price.toLocaleString("en-IN")}</p>
      <div class="kk-card-actions">
        <button type="button" class="kk-btn kk-btn-secondary add-to-cart">Add to Cart</button>
        <button type="button" class="kk-btn kk-btn-primary buy-now">Buy Now</button>
      </div>`;

    card.appendChild(slider);
    card.appendChild(info);
    shopContainer.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayProducts(products);

  KidKart.initShop("#shopContainer", {
    checkoutUrl: "pleasurecheckout.html",
    category: "learning",
  });

  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    displayProducts(products.filter((p) => p.name.toLowerCase().includes(filter)));
  });
});
