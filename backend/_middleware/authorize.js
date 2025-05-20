<<<<<<< HEAD
const jwt = require('express-jwt');
const { secret } = require('../config.json');
const db = require('_helpers/db');
=======
const { expressjwt: jwt } = require("express-jwt");
const config = require('../config.json');
const db = require('../_helpers/db');

// Determine environment
const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const envConfig = config[env];
>>>>>>> frontend-backend_CANETE

module.exports = authorize;

function authorize(roles = []) {
<<<<<<< HEAD
    // roles param can be a single role string
    // or an array of roles
=======
>>>>>>> frontend-backend_CANETE
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
<<<<<<< HEAD
        jwt({ secret, algorithms: ['HS256'] }),

        async (req, res, next) => {
            const account = await db.Account.findByPk(req.user.id);

            // check if account exists
            if (!account || (roles.length && !roles.includes(account.role))) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            
            // auth successful
            req.user.role = account.role;
            const refreshTokens = await account.getRefreshTokens();
            req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token);
            next();
=======
        // JWT middleware with proper configuration
        jwt({
            secret: envConfig.secret,
            algorithms: ['HS256'],
            credentialsRequired: true,
            requestProperty: 'auth' // Store decoded token in req.auth
        }),

        // Authorization middleware
        async (req, res, next) => {
            try {
                // Check if token was properly verified
                if (!req.auth || !req.auth.id) {
                    return res.status(401).json({ message: 'Invalid token' });
                }
                // Get account from database
                const account = await db.Account.findByPk(req.auth.id);        
                if (!account) {
                    return res.status(401).json({ message: 'Account not found' });
                }
                
                // Check roles if specified
                if (roles.length && !roles.includes(account.role)) {
                    return res.status(401).json({ message: 'Insufficient permissions' });
                }

                // Attach user to request
                req.user = {
                    id: account.id,
                    role: account.role,
                    // Add refresh token verification
                    ownsToken: async (token) => {
                        const refreshTokens = await account.getRefreshTokens();
                        return refreshTokens.some(x => x.token === token);
                    }
                };

                next();
            } catch (err) {
                next(err);
            }
>>>>>>> frontend-backend_CANETE
        }
    ];
//Roldan\\