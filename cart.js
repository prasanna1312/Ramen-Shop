let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.querySelector(".cart-items");
const subtotal = document.getElementById("subtotal");
const total = document.getElementById("total");
const del = document.getElementById("delivery");

function displayCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `<p>No items selected</p>`;

    subtotal.textContent = "$0";
    del.textContent = "$0";
    total.textContent = "$0";

    return;
  }

  let subtotalAmount = 0;

  cart.forEach(function (item, index) {
    if (item.name === "Custom Bowl") {
      let bowlTotal = item.noodles.price + item.broth.price;

      let ingredientsHTML = `

                <div class="cart-ingredient">

                    <span>${item.noodles.name}</span>

                    <span>$${item.noodles.price}</span>

                    <span>× 1</span>

                </div>


                <div class="cart-ingredient">

                    <span>${item.broth.name}</span>

                    <span>$${item.broth.price}</span>

                    <span>× 1</span>

                </div>

            `;

      item.ingredients.forEach(function (ingredient, ingredientIndex) {
        bowlTotal = bowlTotal + ingredient.price * ingredient.quantity;

        ingredientsHTML += `

                    <div class="cart-ingredient">

                        <span>${ingredient.name}</span>

                        <span>$${ingredient.price}</span>


                        <div class="quantity">

                            <button
                                class="quantity-btn ingredient-decrease"
                                data-cart-index="${index}"
                                data-ingredient-index="${ingredientIndex}">
                                −
                            </button>


                            <span>${ingredient.quantity}</span>


                            <button
                                class="quantity-btn ingredient-increase"
                                data-cart-index="${index}"
                                data-ingredient-index="${ingredientIndex}">
                                +
                            </button>

                        </div>

                    </div>

                `;
      });

      subtotalAmount = subtotalAmount + bowlTotal;

      const cartItem = document.createElement("div");

      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `

                <img src="${item.img}" alt="${item.name}">


                <div>

                    <h3>${item.name}</h3>


                    <div class="custom-ingredients">

                        ${ingredientsHTML}

                    </div>


                    <p>Bowl Total: $${bowlTotal}</p>


                    <button
                        class="remove-btn"
                        data-index="${index}">
                        Remove
                    </button>

                </div>

            `;

      cartItems.appendChild(cartItem);
    } else {
      subtotalAmount = subtotalAmount + item.price * item.quantity;

      const cartItem = document.createElement("div");

      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `

                <img src="${item.img}" alt="${item.name}">


                <div>

                    <h3>${item.name}</h3>

                    <p>Price: $${item.price}</p>


                    <div class="quantity">

                        <button
                            class="quantity-btn decrease"
                            data-index="${index}">
                            −
                        </button>


                        <span>${item.quantity}</span>


                        <button
                            class="quantity-btn increase"
                            data-index="${index}">
                            +
                        </button>

                    </div>


                    <button
                        class="remove-btn"
                        data-index="${index}">
                        Remove
                    </button>

                </div>

            `;

      cartItems.appendChild(cartItem);
    }
  });

  const delivery = 5;

  const finalTotal = subtotalAmount + delivery;

  subtotal.textContent = "$" + subtotalAmount;

  del.textContent = "$" + delivery;

  total.textContent = "$" + finalTotal;
}

cartItems.addEventListener("click", function (event) {
  if (event.target.classList.contains("increase")) {
    const index = Number(event.target.dataset.index);

    cart[index].quantity++;
  }

  if (event.target.classList.contains("decrease")) {
    const index = Number(event.target.dataset.index);

    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    }
  }

  if (event.target.classList.contains("ingredient-increase")) {
    const cartIndex = Number(event.target.dataset.cartIndex);

    const ingredientIndex = Number(event.target.dataset.ingredientIndex);

    cart[cartIndex].ingredients[ingredientIndex].quantity++;
  }

  if (event.target.classList.contains("ingredient-decrease")) {
    const cartIndex = Number(event.target.dataset.cartIndex);

    const ingredientIndex = Number(event.target.dataset.ingredientIndex);

    const ingredient = cart[cartIndex].ingredients[ingredientIndex];

    if (ingredient.quantity > 1) {
      ingredient.quantity--;
    }
  }

  if (event.target.classList.contains("remove-btn")) {
    const index = Number(event.target.dataset.index);

    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();
});

const paymentBtn = document.getElementById("checkout");

paymentBtn.addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Your cart is empty!");

    return;
  }

  window.location.href = "payment.html";
});

displayCart();
