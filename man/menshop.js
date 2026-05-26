const products = [
  { name: "Smart Learning Tablet", age: 8, desc: "Interactive learning tablet with alphabets, numbers and fun quiz games", price: 1299, img: "../assets/sl.jpg" },
  { name: "Princess Makeup Play Kit", age: 10, desc: "Safe pretend makeup set with mirror and colorful accessories.", price: 899, img: "../assets/pm.jpg" },
  { name: "Turbo Drift Racing Car", age: 12, desc: "High-speed remote car with drift wheels and LED headlights.", price: 1499, img: "../assets/td.jpg" },
  { name: "Creative Art & Craft Box", age: 12, desc: "Complete DIY craft kit with colors, stickers and activity sheets.", price: 699, img: "../assets/ca.jpg" },
  { name: "Dino World Adventure Set", age: 9, desc: "Realistic dinosaur figures with jungle play mat.", price: 849, img: "../assets/dw.jpg" },
  { name: "Cute Talking Teddy Bear", age: 8, desc: "Soft plush teddy that repeats what kids say in a funny voice.", price: 999, img: "../assets/ct.jpg" },
  { name: "Mini Basketball Pro Set", age: 12, desc: "Indoor wall-mount basketball hoop with mini ball.", price: 799, img: "../assets/mb.jpg" },
  { name: "Science Discovery Lab Kit", age: 13, desc: "Safe science experiments to boost curiosity.", price: 1399, img: "../assets/sd.jpg" },
  { name: "Hero Power Blaster", age: 14, desc: "Foam dart blaster with long-range shooting action.", price: 1099, img: "../assets/hp.jpg" },
  { name: "Musical Dance Mat", age: 12, desc: "Light-up dance mat with music and movement challenges.", price: 1199, img: "../assets/md.jpg" },
];

const shopContainer = document.getElementById("shopContainer");
const searchInput = document.getElementById("searchInput");

function displayProducts(list) {
  shopContainer.innerHTML = "";
  list.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card kk-card";
    card.dataset.id = "trend-" + product.name.toLowerCase().replace(/\s+/g, "-").slice(0, 20);
    card.dataset.price = product.price;
    card.innerHTML = `
      <div class="kk-card-img-wrap">
        <img src="${product.img}" alt="${product.name}" loading="lazy"/>
      </div>
      <div class="kk-card-body">
        <h3>${product.name}</h3>
        <p class="kk-card-meta">Age: ${product.age}+</p>
        <p class="kk-card-desc">${product.desc}</p>
        <p class="kk-card-price price">₹${product.price.toLocaleString("en-IN")}</p>
        <div class="kk-card-actions">
          <button type="button" class="kk-btn kk-btn-secondary add-to-cart">Add to Cart</button>
          <button type="button" class="kk-btn kk-btn-primary buy-now">Buy Now</button>
        </div>
      </div>`;
    shopContainer.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayProducts(products);

  KidKart.initShop("#shopContainer", {
    checkoutUrl: "mencheckout.html",
    category: "trending",
  });

  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    displayProducts(products.filter((p) => p.name.toLowerCase().includes(filter)));
  });
});
