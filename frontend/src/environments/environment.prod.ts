<<<<<<< HEAD
export const environment = {
    production: true,
    apiUrl: 'https://user-management-system-angular-master-production.up.railway.app'
}
=======
// Dynamic environment configuration based on hostname
const hostname = window.location.hostname;
const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
const isVercel = hostname.includes('vercel.app');

export const environment = {
    production: true,
    apiUrl: 'https://full-stack-application-user-management.onrender.com/accounts',
    wsUrl: isLocalhost
        ? 'ws://localhost:4000'
        : 'wss://full-stack-application-user-management.onrender.com',
    cookieDomain: isLocalhost 
        ? undefined 
        : isVercel 
            ? '.vercel.app'
            : '.onrender.com'
};
>>>>>>> frontend-backend_CANETE
