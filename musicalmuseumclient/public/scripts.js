document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display exhibits if on the index page
    if (document.getElementById('exhibits-container')) {
        fetch('/api/exhibits')
            .then(response => response.json())
            .then(data => {
                const exhibitsContainer = document.getElementById('exhibits-container');
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

    // Handle form submission if on the add-exhibit page
    if (document.getElementById('exhibit-form')) {
        document.getElementById('exhibit-form').addEventListener('submit', async (e) => {
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

            try {
                await fetch('/api/exhibits', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(exhibit)
                });
                alert('Exhibit added successfully!');
                document.getElementById('exhibit-form').reset();
            } catch (error) {
                console.error('Error adding exhibit:', error);
                alert('Error adding exhibit.');
            }
        });
    }
});
