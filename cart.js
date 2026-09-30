let cart = JSON.parse(localStorage.getItem("cart"))||[];
const cartItems = document.querySelector(".cart-items");
const subtotal = document.getElementById("subtotal");
const total =document.getElementById("total");
const del = document.getElementById("delivery");


function displayCart()
{
    cartItems.innerHTML="";
    if(cart.length===0)
    {
      cartItems.innerHTML = ` <p>No items selected</p> `;

      subtotal.textContent = "$0";
      total.textContent = "$0";
      return;
    }
    
    let subtotalAmount = 0;

    cart.forEach(function(item) {
        subtotalAmount= subtotalAmount+ item.price*item.quantity;
        const cartItem= document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML =`
        <img src="${item.img}" alt="${item.name}">
        <div> 
        <h3>${item.name}</h3> 
        <p>Price: $${item.price}</p> 
        <p>Quantity: ${item.quantity}</p> </div>`;

        cartItems.appendChild(cartItem);

    });

    const delivery = 5;
    const finalTotal = subtotalAmount + delivery;

    subtotal.textContent = "$" + subtotalAmount;
    del.textContent ="$"+delivery;
    total.textContent = "$" + finalTotal;
}
const paymentBtn = document.getElementById("checkout");

paymentBtn.addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    window.location.href = "payment.html";
});
displayCart();

