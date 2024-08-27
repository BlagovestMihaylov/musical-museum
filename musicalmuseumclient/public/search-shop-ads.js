document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = getSearchQuery();
        fetchSearchResults(query);
    });

    const loadAllBtn = document.getElementById('load-all-btn');
    loadAllBtn.addEventListener('click', () => {
        resetSearchForm();
        fetchSearchResults({});
    });

    populateSelectOptions();

    function getSearchQuery() {
        const name = document.getElementById('name').value;
        const period = document.getElementById('period').value;
        const instrumentType = document.getElementById('instrumentType').value;
        const region = document.getElementById('region').value;
        const genre = document.getElementById('genre').value;
        const technology = document.getElementById('technology').value;

        return { name, period, instrumentType, region, genre, technology };
    }

    function fetchSearchResults(query = {}) {
        const url = new URL('http://localhost:8080/public/api/shopAds/search');
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
                    itemDiv.innerHTML = `
                        <img src="${item.exhibit.imageUrl}" alt="Exhibit Image">
                        <h3>${item.exhibit.name}</h3>
                        <p><strong>Period:</strong> ${item.exhibit.period}</p>
                        <p><strong>Type:</strong> ${item.exhibit.instrumentType}</p>
                        <p><strong>Region:</strong> ${item.exhibit.region}</p>
                        <p><strong>Genre:</strong> ${item.exhibit.genre}</p>
                        <p><strong>Technology:</strong> ${item.exhibit.technology}</p>
                        <p><strong>Price:</strong> $${item.price}</p>
                        <div class="result-item-buttons">
                            <button onclick="editShopAd('${item.id}')">Edit</button>
                            <button onclick="removeShopAd('${item.id}')">Remove</button>
                        </div>`;
                    resultsList.appendChild(itemDiv);
                });
            });
    }

    function populateSelectOptions() {
        fetch('http://localhost:8080/api/exhibits/options')
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

    window.editShopAd = (id) => {
        window.location.href = `edit-shop-ad.html?id=${id}`;
    };

    window.removeShopAd = (id) => {
        fetch(`http://localhost:8080/api/admin/shopad/${id}`, { method: 'DELETE' })
            .then(() => {
                alert('Shop ad removed successfully!');
                fetchSearchResults({});
            })
            .catch(error => console.error('Error:', error));
    };
});
