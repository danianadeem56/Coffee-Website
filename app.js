// Cart Logic
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Update cart count on navbar
function updateCartCount() {
  const cartCountSpan = document.getElementById("cart-count");
  let totalCount = 0;
  cart.forEach(item => totalCount += item.quantity);
  if (cartCountSpan) cartCountSpan.textContent = totalCount;
}

// Initially update cart count on page load
updateCartCount();

// MENU PAGE: Display Products & Add to Cart
if (document.getElementById('products-container')) {

  const products = [
    { name: "Brown Sugar Espresso", price: 500, image: "Brown Sugar Espresso.jpg" },
    { name: "Cafe Americano", price: 500, image: "caffe Americano.jpg" },
    { name: "Cappucino", price: 600, image: "cappucino.jpg" },
    { name: "Caramel Cappucino", price: 650, image: "Caramel Cappucino.jpg" },
    { name: "Vanilla Cappucino", price: 650, image: "Vanilla Cappucino.jpg" },
    { name: "Caramel Latte", price: 550, image: "Caramel Latte.jpg" },
    { name: "Cinnamon Vanilla latte", price: 600, image: "Cinnamon Vanilla latte.jpg" },
    { name: "Cookie Latte", price: 600, image: "Cookie Latte.jpg" },
    { name: "Crumble Frappicino", price: 550, image: "Crumble Frappicino.jpg" },
    { name: "Hazelnut Iced Coffee", price: 400, image: "Hazelnut iced coffe.jpg" },
    { name: "Dalgona Coffee", price: 500, image: "Dalgona Coffee.jpg" },
    { name: "Vanilla Dalgona", price: 550, image: "Vanilla Dalgona.jpg" },
    { name: "Mocha Latte", price: 550, image: "Mocha Latte.jpg" },
    { name: "White Chocolate Mocha", price: 600, image: "White chocolate Mocha.jpg" },
    { name: "Iced Mocha", price: 400, image: "iced mocha.jpg" }
  ];

  const productsContainer = document.getElementById('products-container');

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.innerHTML = `
      <div class="card">
        <img src="${product.image}" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">Rs. ${product.price}</p>
          <button class="btn btn-cart">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
        </div>
      </div>
    `;
    productsContainer.appendChild(card);
  });

  // Add to cart on button click
  productsContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON" || e.target.closest("button")) {
      const btn = e.target.tagName === "BUTTON" ? e.target : e.target.closest("button");
      const cardBody = btn.closest(".card-body");
      const name = cardBody.querySelector(".card-title").innerText;
      const priceText = cardBody.querySelector(".card-text").innerText;
      const price = parseInt(priceText.replace("Rs. ", "").trim());
      const image = btn.closest(".card").querySelector("img").getAttribute("src");

      // Check if product exists in cart
      const existing = cart.find(p => p.name === name);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }

      saveCart();
      alert(`${name} has been added to your cart.`);
    }
  });
}

// CART PAGE: Display Cart Details
if (document.getElementById('cart-items')) {
  renderCart();
}

function renderCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  const totalQuantitySpan = document.getElementById("total-quantity");
  const totalPriceSpan = document.getElementById("total-price");

  if (!cartItemsDiv) return;

  cartItemsDiv.innerHTML = "";
  let totalQty = 0;
  let total = 0;

  cart.forEach(item => {
    totalQty += item.quantity;
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div class="item-details">
        <img src="${item.image}" alt="${item.name}">
        <div class="item-info">
          <p class="item-name">${item.name}</p>
          <p class="item-price">Rs. ${item.price}</p>
          <div class="quantity-controls">
            <button onclick="decreaseQty('${item.name}')">-</button>
            <span>${item.quantity}</span>
            <button onclick="increaseQty('${item.name}')">+</button>
          </div>
        </div>
        <div class="item-total">Rs. ${item.price * item.quantity}</div>
      </div>
      <hr/>
    `;
    cartItemsDiv.appendChild(div);
  });

  totalQuantitySpan.textContent = totalQty;
  totalPriceSpan.textContent = total;

  saveCart(); // save updated cart
}

function increaseQty(name) {
  const item = cart.find(p => p.name === name);
  if (item) {
    item.quantity++;
  }
  renderCart();
}

function decreaseQty(name) {
  const item = cart.find(p => p.name === name);
  if (item) {
    item.quantity--;
    if (item.quantity === 0) {
      cart = cart.filter(p => p.name !== name);
    }
  }
  renderCart();
}

