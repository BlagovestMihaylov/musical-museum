document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const row = document.createElement('tr');

            const exhibitCell = document.createElement('td');
            exhibitCell.textContent = item.exhibitName;
            row.appendChild(exhibitCell);

            const priceCell = document.createElement('td');
            priceCell.textContent = `$${item.price.toFixed(2)}`;
            row.appendChild(priceCell);

            const quantityCell = document.createElement('td');
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = item.quantity;
            quantityInput.min = 1;
            quantityInput.addEventListener('change', (e) => {
                item.quantity = parseInt(e.target.value);
                updateCart();
            });
            quantityCell.appendChild(quantityInput);
            row.appendChild(quantityCell);

            const totalCell = document.createElement('td');
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            totalCell.textContent = `$${itemTotal.toFixed(2)}`;
            row.appendChild(totalCell);

            const actionsCell = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                cart.splice(index, 1);
                updateCart();
            });
            actionsCell.appendChild(removeButton);
            row.appendChild(actionsCell);

            cartItemsContainer.appendChild(row);
        });

        cartTotalElement.textContent = total.toFixed(2);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    document.getElementById('checkout-btn').addEventListener('click', () => {
        alert('Proceeding to checkout...');
    });

    updateCart();
});
