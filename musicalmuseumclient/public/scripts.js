// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Fetching exhibits...');
    fetch('http://localhost:8080/api/public/exhibits')
        .then(response => response.json())
        .then(data => {
            console.log('Received exhibits:', data);
            const exhibitsContainer = document.getElementById('exhibits-container');
            exhibitsContainer.innerHTML = ''; // Clear any previous content

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
});

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname;

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        const normalizedCurrentPage = currentPage.replace(/\/$/, ''); // Remove trailing slash
        const normalizedLinkPath = linkPath.replace(/\/$/, ''); // Remove trailing slash

        if (normalizedCurrentPage === normalizedLinkPath || (normalizedCurrentPage === '/' && normalizedLinkPath === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.getElementById('logout-link');
    logoutLink.addEventListener('click', () => {
        // Handle logout process
        fetch('http://localhost:8080/api/public/auth/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
            .then(() => {
                localStorage.removeItem('jwtToken');
                window.location.href = 'login.html';
            })
            .catch(error => console.error('Logout error:', error));
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Load the header from header.html
    function loadHeader() {
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header-placeholder').innerHTML = data;
                handleAuthentication(); // Ensure authentication handling after loading header
            });
    }

    function isLoggedIn() {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const tokenPayload = parseJwt(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return tokenPayload.exp > currentTime;
        }
        return false;
    }

    function handleAuthentication() {
        if (isLoggedIn()) {
            document.getElementById('login-link').style.display = 'none';
            document.getElementById('register-link').style.display = 'none';
            document.getElementById('logout-link').style.display = 'block';

            const token = localStorage.getItem('jwtToken');
            const tokenPayload = parseJwt(token);
            if (tokenPayload.roles && tokenPayload.roles.some(role => role.authority === 'ROLE_ADMIN')) {
                document.getElementById('admin-panel-link').style.display = 'block';
            } else {
                document.getElementById('admin-panel-link').style.display = 'none';
            }
        } else {
            document.getElementById('login-link').style.display = 'block';
            document.getElementById('register-link').style.display = 'block';
            document.getElementById('logout-link').style.display = 'none';
            document.getElementById('admin-panel-link').style.display = 'none';
        }
        setActiveNavLink(); // Ensure the active class is set after authentication
    }

    function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = decodeURIComponent(atob(base64Url).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(base64);
    }

    function handleLogout() {
        localStorage.removeItem('jwtToken');
        window.location.href = 'login.html'; // Redirect to the login page
    }

    document.addEventListener('click', function (event) {
        if (event.target.id === 'logout-link') {
            event.preventDefault();
            handleLogout();
        }
    });

    loadHeader(); // Load the header initially
});
