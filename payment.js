
const paymentForm = document.getElementById("payment-form");
const modal = document.getElementById("payment-modal");
const closeModal = document.getElementById("close-modal");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

cart.forEach(function (item) {
  total = total + item.price * item.quantity;
});

document.getElementById("payment-total").textContent = total.toFixed(2);

paymentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  modal.style.display = "flex";

  localStorage.removeItem("cart");
});

closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});
const continueBtn = document.getElementById("continue-btn");

continueBtn.addEventListener("click", function () {
  window.location.href = "menu.html";
});
