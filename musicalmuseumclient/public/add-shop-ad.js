document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('shop-ad-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const exhibitId = document.getElementById('exhibitId').value;
        const price = document.getElementById('price').value;

        fetch('http://localhost:8080/api/admin/shopad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({exhibit: {id: exhibitId}, price: parseFloat(price)})
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create shop ad');
                }
                return response.json();
            })
            .then(data => {
                alert('Shop ad created successfully');
                form.reset();
            })
            .catch(error => {
                console.error('Error creating shop ad:', error);
                alert('Error creating shop ad');
            });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const exhibitIdField = document.getElementById('exhibitId');

    // Function to get query parameters from URL
    function getQueryParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            exhibitId: params.get('exhibitId')
        };
    }

    // Populate form fields with query parameters
    function populateForm() {
        const queryParams = getQueryParams();
        if (queryParams.exhibitId) {
            exhibitIdField.value = queryParams.exhibitId;
        }
    }

    populateForm();
});

