const add = document.getElementById("add-to-cart");

add.addEventListener("click", addcart);

function addcart() {
  const noodles = document.querySelector('input[name="noodles"]:checked');

  const broth = document.querySelector('input[name="broth"]:checked');

  if (!noodles || !broth) {
    return;
  }

  let total = 0;

  total += Number(noodles.dataset.price);

  total += Number(broth.dataset.price);

  const selectedIngredients = document.querySelectorAll(
    'input[name="protein"]:checked, ' +
      'input[name="topping"]:checked, ' +
      'input[name="sauce"]:checked',
  );

  let ingredients = [];

  selectedIngredients.forEach(function (item) {
    const price = Number(item.dataset.price);

    const quantity = 1;

    total += price * quantity;

    ingredients.push({
      name: item.value,

      price: price,

      quantity: quantity,
    });
  });

  const bowl = {
    name: "Custom Bowl",

    img: "images/custom-bowl.jpg",

    price: total,

    quantity: 1,

    noodles: {
      name: noodles.value,
      price: Number(noodles.dataset.price),
      quantity: 1,
    },

    broth: {
      name: broth.value,
      price: Number(broth.dataset.price),
      quantity: 1,
    },

    ingredients: ingredients,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(bowl);

  localStorage.setItem("cart", JSON.stringify(cart));

  add.textContent = "✓ Added to cart";

  add.classList.add("added");
}
