const cartItems = document.querySelectorAll(".cart-items");
const addCart = document.querySelectorAll(".addCart-btn");
const ramen = document.querySelectorAll(".ramen");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

addCart.forEach(function (button) {
  button.addEventListener("click", addToCart);
});

function addToCart(event) {
  const ramen = event.target.closest(".ramen");

  const name = ramen.querySelector("h3").textContent;

  const priceText = ramen.querySelector(".name-cost p").textContent;

  const price = parseInt(priceText.replace("$", ""));

  const img = ramen.querySelector(".ramen-img").src;

  const existingItem = cart.find(function (item) {
    return item.name === name;
  });

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
      img: img,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  event.target.textContent = "✓ Added to cart";
  event.target.classList.add("added");
}
