document.addEventListener('DOMContentLoaded', () => {
    function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = decodeURIComponent(atob(base64Url).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        return JSON.parse(base64);
    }

    function isLoggedIn() {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const tokenPayload = parseJwt(token);
            return tokenPayload.exp > Math.floor(Date.now() / 1000);
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

    function setActiveNavLink() {
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
    }

    function handleLogout() {
        localStorage.removeItem('jwtToken');
        window.location.href = 'login.html'; // Redirect to the login page
    }

    function loadHeader() {
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header-placeholder').innerHTML = data;
                handleAuthentication(); // Ensure authentication handling after loading header

                // Attach event listeners after loading header
                const logoutLink = document.getElementById('logout-link');
                if (logoutLink) {
                    logoutLink.addEventListener('click', (event) => {
                        event.preventDefault();
                        handleLogout();
                    });
                }
            });
    }

    // Initial setup
    loadHeader(); // Load the header initially
});
