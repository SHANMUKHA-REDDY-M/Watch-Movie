/* ===============================
   Cart / Booking Cart System
   =============================== */

const cartKey = "wm_cart";

function addToCart(movie) {
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  cart.push(movie);
  localStorage.setItem(cartKey, JSON.stringify(cart));
  alert(`${movie.title} added to cart!`);
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  const container = document.getElementById("cartItems");
  if (!container) return;

  container.innerHTML = cart
    .map(
      item => `
    <div class="cart-item">
      <h4>${item.title}</h4>
      <p>${item.theatre}</p>
      <p>₹${item.price}</p>
      <button onclick="removeFromCart('${item.id}')">Remove</button>
    </div>
  `
    )
    .join("");

  document.getElementById("totalPrice").textContent = cart
    .reduce((t, c) => t + c.price, 0)
    .toFixed(2);
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem(cartKey, JSON.stringify(cart));
  renderCart();
}
