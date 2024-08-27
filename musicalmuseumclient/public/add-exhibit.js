import { Genre, InstrumentType, Period, Region, Technology } from './enums.js';

document.addEventListener('DOMContentLoaded', () => {
    const periodOptions = Object.values(Period);
    const instrumentTypeOptions = Object.values(InstrumentType);
    const regionOptions = Object.values(Region);
    const genreOptions = Object.values(Genre);
    const technologyOptions = Object.values(Technology);

    function populateSelect(id, options) {
        const select = document.getElementById(id);
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.innerHTML = option;
            select.appendChild(opt);
        });
    }

    // Populate select options
    populateSelect('period', periodOptions);
    populateSelect('instrumentType', instrumentTypeOptions);
    populateSelect('region', regionOptions);
    populateSelect('genre', genreOptions);
    populateSelect('technology', technologyOptions);

    // Handle form submission
    document.getElementById('exhibit-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const exhibit = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            imageUrl: document.getElementById('imageUrl').value,
            period: document.getElementById('period').value,
            instrumentType: document.getElementById('instrumentType').value,
            region: document.getElementById('region').value,
            genre: document.getElementById('genre').value,
            technology: document.getElementById('technology').value
        };

        // Post exhibit data to the server
        fetch('http://localhost:8080/api/admin/exhibits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exhibit)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Exhibit added:', data);
                alert('Exhibit added successfully!');
                e.target.reset();
            })
            .catch(error => console.error('Error adding exhibit:', error));
    });
});
