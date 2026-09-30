let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach(function (item) {
    total = total + item.price * item.quantity;
});

document.getElementById("payment-total").textContent = total.toFixed(2);


const paymentForm = document.getElementById("payment-form");

paymentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    alert("Order placed successfully! 🍜");

    localStorage.removeItem("cart");

    window.location.href = "index.html";
});