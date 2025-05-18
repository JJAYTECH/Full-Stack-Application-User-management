<<<<<<< HEAD
export const environment = {
    production: false,
    apiUrl: 'http://localhost:4000'
};
=======
// Dynamic environment configuration based on hostname
const hostname = window.location.hostname;
const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

export const environment = {
    production: false,
    apiUrl: 'https://full-stack-application-user-management.onrender.com/accounts',
    wsUrl: isLocalhost
        ? 'ws://localhost:4000'
        : 'wss://full-stack-application-user-management.onrender.com'
};

>>>>>>> frontend-backend_CANETE
