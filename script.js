// Initialize an empty cart in localStorage
if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
}

// Function to add item to cart
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        const itemName = this.dataset.name;
        const itemPrice = parseFloat(this.dataset.price);

        const cart = JSON.parse(localStorage.getItem('cart'));
        const item = { name: itemName, price: itemPrice };
        cart.push(item);

        localStorage.setItem('cart', JSON.stringify(cart));
    });
});

// Load cart items on Cart page
if (window.location.pathname.endsWith('cart.html')) {
    const cartItemsDiv = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        let total = 0;
        cartItemsDiv.innerHTML = '';
        cart.forEach((item, index) => {
            total += item.price;
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <p>${item.name} - $${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsDiv.appendChild(itemDiv);
        });

        const totalDiv = document.getElementById('total');
        totalDiv.innerHTML = `Total: $${total.toFixed(2)}`;
    }
}

// Function to remove item from cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
}

// Clear cart function
function clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
    window.location.reload();
}
