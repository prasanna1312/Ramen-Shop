const options = document.querySelectorAll(".options");
const add = document.getElementById("add-to-cart");

add.addEventListener("click",addcart);

function addcart()
{
    const noodles = document.querySelector('input[name="noodles"]:checked');
    const broth = document.querySelector('input[name="broth"]:checked');

    let total=0;
    total=total+Number(noodles.dataset.price);
    total=total+Number(broth.dataset.price);
    const selected = document.querySelectorAll('input[type="checkbox"]:checked');
    
    selected.forEach(function(item)
{
    total=total+Number(item.dataset.price);
})

const bowl={
    name: "Custom Bowl",
    img: "images/custom-bowl.jpg",
    price: total,
    quantity: 1
};

let cart= JSON.parse(localStorage.getItem("cart")) || [];
cart.push(bowl);

localStorage.setItem("cart", JSON.stringify(cart));
}