import {Genre, InstrumentType, Period, Region, Technology} from './enums.js';
import jwt_decode from 'jwt-decode';


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
        // Get the href attribute and ensure it's a relative path
        const linkPath = new URL(link.href).pathname;

        // Remove leading slashes for comparison consistency
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
    checkAuthStatus();

    const logoutLink = document.getElementById('logout-link');
    logoutLink.addEventListener('click', () => {
        // Handle logout process
        fetch('http://localhost:8080/api/public/auth/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        })
            .then(() => {
                localStorage.removeItem('authToken');
                window.location.href = 'login.html';
            })
            .catch(error => console.error('Logout error:', error));
    });
});

function checkAuthStatus() {
    const token = localStorage.getItem('authToken');

    if (token) {
        try {
            const decodedToken = jwt_decode(token);
            const roles = decodedToken.roles || [];

            // Extract authorities from roles
            const authorities = roles.map(role => role.authority);

            if (authorities.includes('ROLE_ADMIN')) {
                document.getElementById('admin-panel-link').style.display = 'block';
            } else {
                document.getElementById('admin-panel-link').style.display = 'none';
            }

            document.getElementById('login-link').style.display = 'none';
            document.getElementById('register-link').style.display = 'none';
            document.getElementById('logout-link').style.display = 'block';
        } catch (error) {
            console.error('Error decoding JWT:', error);
            // Optionally handle errors or unauthenticated states
        }
    } else {
        document.getElementById('admin-panel-link').style.display = 'none';
        document.getElementById('login-link').style.display = 'block';
        document.getElementById('register-link').style.display = 'block';
        document.getElementById('logout-link').style.display = 'none';
    }
}



