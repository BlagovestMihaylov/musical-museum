document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = getSearchQuery();
        fetchSearchResults(query, 'exhibit');
    });

    const loadAllBtn = document.getElementById('load-all-btn');
    loadAllBtn.addEventListener('click', () => {
        resetSearchForm();
        fetchSearchResults({}, 'exhibit');
    });

    populateSelectOptions();

    function getSearchQuery() {
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const period = document.getElementById('period').value;
        const instrumentType = document.getElementById('instrumentType').value;
        const region = document.getElementById('region').value;
        const genre = document.getElementById('genre').value;
        const technology = document.getElementById('technology').value;

        return { name, description, period, instrumentType, region, genre, technology };
    }

    function fetchSearchResults(query = {}, type) {
        const baseUrl = type === 'exhibit' ? 'http://localhost:8080/api/public/exhibits/search' : 'http://localhost:8080/api/public/shop-ads/search';
        const url = new URL(baseUrl);
        Object.keys(query).forEach(key => {
            if (query[key]) url.searchParams.append(key, query[key]);
        });

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const resultsList = document.getElementById('results-list');
                resultsList.innerHTML = ''; // Clear previous results
                data.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'result-item';
                    itemDiv.innerHTML = type === 'exhibit'
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
                                <button onclick="createShopAd('${item.id}')">Create Shop Ad</button>
                                <button onclick="editExhibit('${item.id}')">Edit</button>
                                <button onclick="removeExhibit('${item.id}')">Remove</button>
                            </div>`
                        : `
                            <img src="${item.exhibitImageUrl}" alt="Exhibit Image">
                            <h3>Exhibit ID: ${item.exhibitId}</h3>
                            <p>Price: $${item.price}</p>
                            <div class="result-item-buttons">
                                <button onclick="editShopAd('${item.id}')">Edit</button>
                                <button onclick="removeShopAd('${item.id}')">Remove</button>
                            </div>`;
                    resultsList.appendChild(itemDiv);
                });
            });
    }

    function populateSelectOptions() {
        fetch('http://localhost:8080/api/public/exhibits/criteria') // Example endpoint
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

    function resetSearchForm() {
        document.getElementById('search-form').reset();
    }

    window.createShopAd = (exhibitId) => {
        // Redirect to add shop ad page with exhibitId prefilled if necessary
        window.location.href = `add-shop-ad.html?exhibitId=${exhibitId}`;
    };

    window.editExhibit = (id) => {
        // Redirect to edit exhibit page
        window.location.href = `edit-exhibit.html?id=${id}`;
    };

    window.removeExhibit = (id) => {
        // Implement removal logic
        alert(`Remove exhibit ${id}`);
    };
});
