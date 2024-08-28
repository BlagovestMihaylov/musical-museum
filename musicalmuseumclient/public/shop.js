document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/api/public/shopAds')
        .then(response => response.json())
        .then(data => {
            const shopContainer = document.getElementById('shop-container');
            data.forEach(shopAd => {
                const shopAdDiv = document.createElement('div');
                shopAdDiv.className = 'shop-ad';
                shopAdDiv.innerHTML = `
                    <img src="${shopAd.exhibit.imageUrl}" alt="${shopAd.exhibit.name}">
                    <h2>${shopAd.exhibit.name}</h2>
                    <p>${shopAd.exhibit.description}</p>
                    <p><strong>Price:</strong> $${shopAd.price}</p>
                    <p><strong>Date Posted:</strong> ${new Date(shopAd.datePosted).toLocaleDateString()}</p>
                    <button class="buy-btn" data-exhibit-name="${shopAd.exhibit.name}" data-price="${shopAd.price}">BUY</button>
                `;
                shopContainer.appendChild(shopAdDiv);
            });

            // Add event listener to dynamically created "BUY" buttons
            shopContainer.addEventListener('click', (event) => {
                if (event.target.classList.contains('buy-btn')) {
                    const button = event.target;
                    const exhibitName = button.getAttribute('data-exhibit-name');
                    const price = parseFloat(button.getAttribute('data-price'));

                    addToCart(exhibitName, price);
                }
            });
        })
        .catch(error => console.error('Error fetching shop ads:', error));
});

function addToCart(exhibitName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.exhibitName === exhibitName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            exhibitName: exhibitName,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${exhibitName} has been added to your cart.`);
}
