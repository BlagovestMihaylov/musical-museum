import { Period, InstrumentType, Region, Genre, Technology } from './enums.js';

document.addEventListener('DOMContentLoaded', () => {
    const periodElement = document.getElementById('search-period');
    const instrumentTypeElement = document.getElementById('search-instrumentType');
    const regionElement = document.getElementById('search-region');
    const genreElement = document.getElementById('search-genre');
    const technologyElement = document.getElementById('search-technology');

    populateDropdown('search-period', Period);
    populateDropdown('search-instrumentType', InstrumentType);
    populateDropdown('search-region', Region);
    populateDropdown('search-genre', Genre);
    populateDropdown('search-technology', Technology);

    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = getSearchQuery();
        fetchExhibits(query);
    });

    const loadAllBtn = document.getElementById('load-all-btn');
    loadAllBtn.addEventListener('click', () => {
        resetSearchForm();
        fetchExhibits(); // Load all exhibits
    });

    // Load all exhibits on initial load
    fetchExhibits();
});

function populateDropdown(selectId, enumObject) {
    const selectElement = document.getElementById(selectId);
    for (const key in enumObject) {
        const option = document.createElement('option');
        option.value = enumObject[key];
        option.text = enumObject[key];
        selectElement.appendChild(option);
    }
}

function getSearchQuery() {
    const name = document.getElementById('search-name').value;
    const period = document.getElementById('search-period').value;
    const instrumentType = document.getElementById('search-instrumentType').value;
    const region = document.getElementById('search-region').value;
    const genre = document.getElementById('search-genre').value;
    const technology = document.getElementById('search-technology').value;

    return {
        name,
        period,
        instrumentType,
        region,
        genre,
        technology
    };
}

function fetchExhibits(query = {}) {
    console.log('Fetching exhibits...', query);
    const queryString = Object.keys(query)
        .filter(key => query[key])
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
        .join('&');

    fetch(`http://localhost:8080/api/public/exhibits${queryString ? '/search?' + queryString : ''}`)
        .then(response => response.json())
        .then(data => {
            console.log('Received exhibits:', data);
            const exhibitsContainer = document.getElementById('exhibits-container');
            exhibitsContainer.innerHTML = ''; // Clear previous results
            data.forEach(exhibit => {
                const exhibitDiv = document.createElement('div');
                exhibitDiv.className = 'exhibit';
                exhibitDiv.innerHTML = `
                    <img src="${exhibit.imageUrl}" alt="${exhibit.name}">
                    <h2>${exhibit.name}</h2>
                    <p>${exhibit.description}</p>
                    <p><strong>Period:</strong> ${exhibit.period}</p>
                    <p><strong>Type:</strong> ${exhibit.instrumentType}</p>
                    <p><strong>Region:</strong> ${exhibit.region}</p>
                    <p><strong>Genre:</strong> ${exhibit.genre}</p>
                    <p><strong>Technology:</strong> ${exhibit.technology}</p>
                `;
                exhibitsContainer.appendChild(exhibitDiv);
            });
        })
        .catch(error => console.error('Error fetching exhibits:', error));
}

function resetSearchForm() {
    document.getElementById('search-form').reset();
}
