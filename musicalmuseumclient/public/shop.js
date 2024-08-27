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
                `;
                shopContainer.appendChild(shopAdDiv);
            });
        })
        .catch(error => console.error('Error fetching shop ads:', error));
});
