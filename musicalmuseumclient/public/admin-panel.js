document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('admin-search-form');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = getSearchQuery();
        fetchSearchResults(query);
    });

    const loadAllBtn = document.getElementById('load-all-btn');
    loadAllBtn.addEventListener('click', () => {
        resetSearchForm();
        fetchSearchResults(); // Load all results
    });

    document.querySelector('input[name="searchType"]').addEventListener('change', toggleShopAdFields);
    toggleShopAdFields(); // Set initial state of fields

    // Populate select options for exhibit criteria
    populateSelectOptions();
});

function toggleShopAdFields() {
    const searchType = document.querySelector('input[name="searchType"]:checked').value;
    // Shop ad specific fields are no longer present
}

function getSearchQuery() {
    const searchType = document.querySelector('input[name="searchType"]:checked').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const period = document.getElementById('period').value;
    const instrumentType = document.getElementById('instrumentType').value;
    const region = document.getElementById('region').value;
    const genre = document.getElementById('genre').value;
    const technology = document.getElementById('technology').value;

    return {
        searchType,
        name,
        description,
        period,
        instrumentType,
        region,
        genre,
        technology
    };
}

function fetchSearchResults(query = {}) {
    const {searchType, name, description, period, instrumentType, region, genre, technology} = query;
    const baseUrl = searchType === 'exhibit'
        ? 'http://localhost:8080/api/public/exhibits/search'
        : 'http://localhost:8080/api/public/shop-ads/search';

    const url = new URL(baseUrl);
    if (name) url.searchParams.append('name', name);
    if (description) url.searchParams.append('description', description);
    if (period) url.searchParams.append('period', period);
    if (instrumentType) url.searchParams.append('instrumentType', instrumentType);
    if (region) url.searchParams.append('region', region);
    if (genre) url.searchParams.append('genre', genre);
    if (technology) url.searchParams.append('technology', technology);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Received search results:', data);
            const resultsList = document.getElementById('results-list');
            resultsList.innerHTML = ''; // Clear previous results
            data.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'result-item';
                itemDiv.innerHTML = searchType === 'exhibit'
                    ? `
                        <img src="${item.imageUrl}" alt="Exhibit Image">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p><strong>Period:</strong> ${item.period}</p>
                        <p><strong>Type:</strong> ${item.instrumentType}</p>
                        <p><strong>Region:</strong> ${item.region}</p>
                        <p><strong>Genre:</strong> ${item.genre}</p>
                        <p><strong>Technology:</strong> ${item.technology}</p>
                        <div class="result-item-buttons">
                            <button onclick="updateExhibit('${item.id}')">Update</button>
                            <button onclick="removeExhibit('${item.id}')">Remove</button>
                        </div>`
                    : `
                        <img src="${item.exhibitImageUrl}" alt="Exhibit Image">
                        <h3>Exhibit ID: ${item.exhibitId}</h3>
                        <p>Price: $${item.price}</p>
                        <div class="result-item-buttons">
                            <button onclick="createShopAd('${item.exhibitId}')">Create Ad</button>
                            <button onclick="updateShopAd('${item.id}')">Update</button>
                            <button onclick="removeShopAd('${item.id}')">Remove</button>
                        </div>`;
                resultsList.appendChild(itemDiv);
            });
        });
}

function populateSelectOptions() {
    // Example: populate options for periods
    fetch('http://localhost:8080/api/public/exhibits/criteria') // Endpoint to get criteria options
        .then(response => response.json())
        .then(data => {
            populateSelect('period', data.periods);
            populateSelect('instrumentType', data.instrumentTypes);
            populateSelect('region', data.regions);
            populateSelect('genre', data.genres);
            populateSelect('technology', data.technologies);
        });
}

function populateSelect(id, options) {
    const select = document.getElementById(id);
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
    });
}

function updateExhibit(id) {
    console.log('Update exhibit:', id);
    // Implement functionality to update the exhibit with the given ID
}

function removeExhibit(id) {
    console.log('Remove exhibit:', id);
    // Implement functionality to remove the exhibit with the given ID
}

function createShopAd(exhibitId) {
    console.log('Create shop ad for exhibit:', exhibitId);
    // Redirect to the Create Shop Ad page with exhibitId
    window.location.href = `add-shop-ad.html?exhibitId=${exhibitId}`;
}

function updateShopAd(adId) {
    console.log('Update shop ad:', adId);
    // Implement functionality to update the shop ad with the given ID
}

function removeShopAd(adId) {
    console.log('Remove shop ad:', adId);
    // Implement functionality to remove the shop ad with the given ID
}

function resetSearchForm() {
    document.getElementById('admin-search-form').reset();
}
