<<<<<<< HEAD
// account.controller

const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const Role = require('_helpers/role');
const accountService = require('./account.service');
const { route } = require('../_helpers/swagger');

//routes
=======
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate_request');
const authorize = require('../_middleware/authorize');
const Role = require('../_helpers/role');
const accountService = require('./account.service');
const db = require('../_helpers/db');

// routes
>>>>>>> frontend-backend_CANETE
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/refresh-token', refreshToken);
router.post('/revoke-token', authorize(), revokeTokenSchema, revokeToken);
router.post('/register', registerSchema, register);
<<<<<<< HEAD
router.post('/verify-email', VerifyEmailSchema, verifyEmail);
=======
router.post('/verify-email', verifyEmailSchema, verifyEmail);
>>>>>>> frontend-backend_CANETE
router.post('/forgot-password', forgotPasswordSchema, forgotPassword);
router.post('/validate-reset-token', validateResetTokenSchema, validateResetToken);
router.post('/reset-password', resetPasswordSchema, resetPassword);
router.get('/', authorize(Role.Admin), getAll);
router.get('/:id', authorize(), getById);
<<<<<<< HEAD
router.post('/', authorize(Role.Admin),createSchema,create);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function authenticateSchema(req,res,next) {
=======
router.post('/', authorize(Role.Admin), createSchema, create);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);
// Debug routes
router.get('/debug/tokens', authorize(), getActiveTokens);
router.post('/debug/clear-tokens', authorize(), clearInactiveTokens);

module.exports = router;

function authenticateSchema(req, res, next) {
>>>>>>> frontend-backend_CANETE
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
<<<<<<< HEAD

=======
>>>>>>> frontend-backend_CANETE
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    const { email, password } = req.body;
    const ipAddress = req.ip;
    accountService.authenticate({ email, password, ipAddress })
        .then(({ refreshToken, ...account }) => {
            setTokenCookie(res, refreshToken);
<<<<<<< HEAD
            res.json(account);
=======
            // Include user ID in the response
            res.json({
                ...account,
                id: account.id // Ensure this is included
            });
>>>>>>> frontend-backend_CANETE
        })
        .catch(next);
}

function refreshToken(req, res, next) {
<<<<<<< HEAD
    const token = req.cookies.refreshToken;
    const ipAddress = req.ip;
    accountService.refreshToken({token, ipAddress})
        .then(({ refreshToken, ...account}) => {
            setTokenCookie(res, refreshToken);
            res.json(account);
        })
        .catch(next);
=======
    // Try to get token from cookie first, then from request body or query
    let token = req.cookies?.refreshToken;
    
    // Check request body as a fallback
    if (!token && req.body) {
        token = req.body.refreshToken || req.body.token;
    }
    
    // Last resort, check query params
    if (!token && req.query) {
        token = req.query.refreshToken || req.query.token;
    }
    
    const ipAddress = req.ip;
    
    // Log detailed token info for debugging, but hide sensitive parts
    console.log(`Refresh token request details:`);
    console.log(`- Cookie present: ${!!req.cookies?.refreshToken}`);
    console.log(`- Body token present: ${!!(req.body && (req.body.refreshToken || req.body.token))}`);
    console.log(`- Query token present: ${!!(req.query && (req.query.refreshToken || req.query.token))}`);
    console.log(`- Final token used: ${token ? 'Found' : 'Missing'}`);
    
    // Sanitize token - ensure it's not undefined, null, or "undefined" string
    if (!token || token === 'undefined' || token === 'null') {
        return res.status(400).json({ message: 'Refresh token is required' });
    }
    
    accountService.refreshToken({ token, ipAddress })
        .then(({ refreshToken, ...account }) => {
            setTokenCookie(res, refreshToken);
            res.json(account);
        })
        .catch(err => {
            console.error('Refresh token error:', err);
            next(err);
        });
>>>>>>> frontend-backend_CANETE
}

function revokeTokenSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function revokeToken(req, res, next) {
<<<<<<< HEAD
    //accpet token from request body or cookie
=======
    // accept token from request body or cookie
>>>>>>> frontend-backend_CANETE
    const token = req.body.token || req.cookies.refreshToken;
    const ipAddress = req.ip;

    if (!token) return res.status(400).json({ message: 'Token is required' });

<<<<<<< HEAD
    //users can revoke their own tokens and admins can revoke any token 
    if (!req.user.ownToken(token) && req.user.role !== Role.Admin) {
=======
    // users can revoke their own tokens and admins can revoke any tokens
    if (!req.user.ownsToken(token) && req.user.role !== Role.Admin) {
>>>>>>> frontend-backend_CANETE
        return res.status(401).json({ message: 'Unauthorized' });
    }

    accountService.revokeToken({ token, ipAddress })
        .then(() => res.json({ message: 'Token revoked' }))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        acceptTerms: Joi.boolean().valid(true).required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    accountService.register(req.body, req.get('origin'))
<<<<<<< HEAD
        .then(account => res.json({ 
            message: 'Registration successful, please check your email for verfication instructions',
            isVerified: account.isVerified
        }))
        .catch(next);
}

function VerifyEmailSchema(req, res, next) {
=======
        .then(result => {
            res.json(result);
        })
        .catch(next);
}

function verifyEmailSchema(req, res, next) {
>>>>>>> frontend-backend_CANETE
    const schema = Joi.object({
        token: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function verifyEmail(req, res, next) {
    accountService.verifyEmail(req.body)
<<<<<<< HEAD
    .then(() => res.json({message: 'Verification successful, you can now login'}))
    .catch(next);
=======
        .then(() => res.json({ message: 'Verification successful, you can now login' }))
        .catch(next);
>>>>>>> frontend-backend_CANETE
}

function forgotPasswordSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required()
    });
    validateRequest(req, next, schema);
}

function forgotPassword(req, res, next) {
    accountService.forgotPassword(req.body, req.get('origin'))
        .then(() => res.json({ message: 'Please check your email for password reset instructions' }))
        .catch(next);
}

function validateResetTokenSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function validateResetToken(req, res, next) {
    accountService.validateResetToken(req.body)
        .then(() => res.json({ message: 'Token is valid' }))
        .catch(next);
}

function resetPasswordSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req, next, schema);
}

function resetPassword(req, res, next) {
    accountService.resetPassword(req.body)
        .then(() => res.json({ message: 'Password reset successful, you can now login' }))
        .catch(next);
}

function getAll(req, res, next) {
    accountService.getAll()
        .then(accounts => res.json(accounts))
        .catch(next);
}

function getById(req, res, next) {
    // users can get their own account and admins can get any account
    if (Number(req.params.id) !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
<<<<<<< HEAD

=======
>>>>>>> frontend-backend_CANETE
    accountService.getById(req.params.id)
        .then(account => account ? res.json(account) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
<<<<<<< HEAD
        role: Joi.string().valid(Role.Admin, Role.User).required(),
        status: Joi.string().valid('active', 'inactive').default('active')
=======
        role: Joi.string().valid(Role.Admin, Role.User).required()
>>>>>>> frontend-backend_CANETE
    });
    validateRequest(req, next, schema);
}

<<<<<<< HEAD
function create(req,res,next) {
=======
function create(req, res, next) {
>>>>>>> frontend-backend_CANETE
    accountService.create(req.body)
        .then(account => res.json(account))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schemaRules = {
        title: Joi.string().empty(''),
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
<<<<<<< HEAD
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty(''),
        status: Joi.string().valid('active', 'inactive').default('active')
    };

    //only admins can update role 
    if (req.user.role === Role.Admin) {
        schemaRules.role = Joi.string().valid(Role.Admin, Role.User).empty('');
=======
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
    };

    // only admins can update role and status
    if (req.user.role === Role.Admin) {
        schemaRules.role = Joi.string().valid(Role.Admin, Role.User).empty('');
        schemaRules.status = Joi.string().valid('Active', 'Inactive').empty('');
>>>>>>> frontend-backend_CANETE
    }

    const schema = Joi.object(schemaRules).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}

function update(req, res, next) {
<<<<<<< HEAD
    console.log('Request Body: ', req.body);
    //users can update their own account and admins can update any account
=======
    // users can update their own account and admins can update any account
>>>>>>> frontend-backend_CANETE
    if (Number(req.params.id) !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    accountService.update(req.params.id, req.body)
        .then(account => res.json(account))
        .catch(next);
}

function _delete(req, res, next) {
<<<<<<< HEAD
    //users can delete their own account and admins can delete any account
=======
    // users can delete their own account and admins can delete any account
>>>>>>> frontend-backend_CANETE
    if (Number(req.params.id) !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    accountService.delete(req.params.id)
<<<<<<< HEAD
        .then(account => res.json({ message: 'Account deleted successfully' }))
        .catch(next);
}

//helper functions

function setTokenCookie(res, token) {
    //create cookie with refresh token that expires in 7 days
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7*24*60*60*1000)
    };
    res.cookie('refreshToken', token, cookieOptions);
}
=======
        .then(() => res.json({ message: 'Account deleted successfully' }))
        .catch(next);
}

// helper functions

function setTokenCookie(res, token) {
    // create cookie with refresh token that expires in 7 days
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        path: '/',
        domain: isProduction ? '.vercel.app' : undefined // Allow cookie to work across subdomains in production
    };

    // Set the cookie
    res.cookie('refreshToken', token, cookieOptions);
    
    // For debugging
    console.log(`Setting refreshToken cookie with options: ${JSON.stringify({
        secure: cookieOptions.secure,
        sameSite: cookieOptions.sameSite,
        httpOnly: cookieOptions.httpOnly,
        path: cookieOptions.path,
        domain: cookieOptions.domain
    })}`);
}

// Debug functions
function getActiveTokens(req, res, next) {
    // Only allow users to get their own tokens and admins to get any tokens
    const id = parseInt(req.params.id || req.user.id);
    if (id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    db.RefreshToken.findAll({
        where: { 
            accountId: id,
            revoked: null,
            expires: { [db.Sequelize.Op.gt]: new Date() }
        },
        attributes: ['id', 'created', 'expires', 'createdByIp']
    })
    .then(tokens => {
        res.json({ 
            activeTokenCount: tokens.length,
            tokens: tokens.map(t => ({
                id: t.id,
                created: t.created,
                expires: t.expires,
                createdByIp: t.createdByIp,
                expiresIn: Math.round((new Date(t.expires).getTime() - new Date().getTime()) / 1000 / 60) + ' minutes'
            }))
        });
    })
    .catch(next);
}

function clearInactiveTokens(req, res, next) {
    // Only allow admins to clear tokens
    if (req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Find and delete all revoked or expired tokens
    db.RefreshToken.destroy({
        where: {
            [db.Sequelize.Op.or]: [
                { revoked: { [db.Sequelize.Op.ne]: null } },
                { expires: { [db.Sequelize.Op.lt]: new Date() } }
            ]
        }
    })
    .then(count => {
        res.json({ message: `${count} inactive tokens cleared` });
    })
    .catch(next);
}
>>>>>>> frontend-backend_CANETE
