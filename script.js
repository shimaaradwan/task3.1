// Utility function to get data from LocalStorage
function getLocalStorageData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Utility function to save data to LocalStorage
function setLocalStorageData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Login functionality
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            localStorage.setItem('loggedIn', 'true');
            window.location.href = 'homepage.html';
        } else {
            document.getElementById('error-message').textContent = 'Please enter valid credentials';
        }
    });
}

// Check if the user is logged in
if (!localStorage.getItem('loggedIn')) {
    const protectedPages = ['homepage.html', 'shoppingcart.html'];
    const currentPage = window.location.pathname.split('/').pop();
    if (protectedPages.includes(currentPage)) {
        window.location.href = 'index.html';
    }
}

// Logout functionality
const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('loggedIn');
        window.location.href = 'index.html';
    });
}

// Cart functionality
let cart = getLocalStorageData('cart');

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCountElement = document.getElementById('cart-count');

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const productElement = document.createElement('div');
            productElement.textContent = `${item.name} - $${item.price}`;
            cartItemsContainer.appendChild(productElement);
            total += item.price;
        });

        totalPriceElement.textContent = total;
    }

    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// Add to Cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productElement = this.closest('.product');
        const productId = productElement.getAttribute('data-id');
        const productName = productElement.querySelector('h2').textContent;
        const productPrice = parseFloat(productElement.querySelector('p:nth-of-type(2)').textContent.replace('$', ''));

        const product = { id: productId, name: productName, price: productPrice };
        cart.push(product);

        setLocalStorageData('cart', cart);
        updateCartDisplay();
    });
});

// Initialize cart display on page load
updateCartDisplay();
