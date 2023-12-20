document.addEventListener('DOMContentLoaded', function () {
    const inventoryList = document.getElementById('inventoryList');
    const addProductForm = document.getElementById('addProductForm');
    const productSelect = document.getElementById('productSelect');
    const quantityInput = document.getElementById('quantity');
    const cartList = document.getElementById('cartList');

    // Sample data for the inventory
    let inventoryData = [
        { id: 1, name: 'Croissant', price: 2.5, quantity: 10 },
        { id: 2, name: 'Baguette', price: 1.5, quantity: 20 },
        // Add more products as needed
    ];

    // Function to format price in Indian Rupees
    function formatIndianCurrency(price) {
        const formattedPrice = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(price);
        return formattedPrice;
    }

    // Initialize the inventory list
    function updateInventory() {
        inventoryList.innerHTML = "";
        inventoryData.forEach(item => {
            const li = document.createElement('li');
            const formattedPrice = formatIndianCurrency(item.price);
            li.textContent = `${item.name} - ${formattedPrice} (Quantity: ${item.quantity})`;
            inventoryList.appendChild(li);
        });

        // Update the product select dropdown in the order section
        productSelect.innerHTML = "";
        inventoryData.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
            productSelect.appendChild(option);
        });
    }

    updateInventory();

    // Event listener for adding a new product
    addProductForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const productName = document.getElementById('productName').value;
        const productPrice = parseFloat(document.getElementById('productPrice').value);
        const productQuantity = parseInt(document.getElementById('productQuantity').value);

        if (productName && !isNaN(productPrice) && !isNaN(productQuantity) && productPrice > 0 && productQuantity > 0) {
            // Create a new product object
            const newProduct = {
                id: inventoryData.length + 1,
                name: productName,
                price: productPrice,
                quantity: productQuantity,
            };

            // Add the new product to the inventory
            inventoryData.push(newProduct);

            // Update the inventory list
            updateInventory();

            // Clear the form
            addProductForm.reset();

            alert('Product added successfully!');
        } else {
            alert('Invalid input. Please enter valid product details.');
        }
    });

    // Function to add items to the cart
    function addToCart() {
        const productId = parseInt(productSelect.value);
        const quantity = parseInt(quantityInput.value);

        // Find the selected product in the inventory
        const selectedProduct = inventoryData.find(item => item.id === productId);

        if (selectedProduct && quantity <= selectedProduct.quantity) {
            // Add item to the cart
            const li = document.createElement('li');
            const formattedPrice = formatIndianCurrency(selectedProduct.price);
            li.textContent = `${selectedProduct.name} x${quantity} - ${formattedPrice} each = ${formatIndianCurrency(selectedProduct.price * quantity)}`;
            cartList.appendChild(li);

            // Update the inventory quantity
            selectedProduct.quantity -= quantity;

            // Clear the input fields
            quantityInput.value = '';

            alert('Item added to cart!');
        } else {
            alert('Invalid quantity or product out of stock');
        }
    }

    // Function to simulate the checkout process
    function checkout() {
        if (cartList.children.length > 0) {
            alert('Checkout successful! Thank you for your purchase.');

            // Clear the cart
            while (cartList.firstChild) {
                cartList.removeChild(cartList.firstChild);
            }
        } else {
            alert('Your cart is empty. Add items before checking out.');
        }
    }

    // Event listener for the "Add to Cart" button
    document.getElementById('addToCartBtn').addEventListener('click', addToCart);

    // Event listener for the "Checkout" button
    document.getElementById('checkoutBtn').addEventListener('click', checkout);
});
