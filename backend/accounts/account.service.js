<<<<<<< HEAD
// account.service

const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { Op } = require('sequelize');
const sendEmail = require('_helpers/send-email');
const db = require('_helpers/db');
const Role = require('_helpers/role');
=======
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const { Op } = require('sequelize');
const sendEmail = require('../_helpers/send_email');
const db = require('../_helpers/db');
const Role = require('../_helpers/role');

// Determine environment
const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const envConfig = config[env];

// Log configuration
console.log(`Using ${env} environment for account service`);
>>>>>>> frontend-backend_CANETE

module.exports = {
    authenticate,
    refreshToken,
    revokeToken,
    register,
    verifyEmail,
    forgotPassword,
    validateResetToken,
    resetPassword,
    getAll,
    getById,
    create,
    update,
<<<<<<< HEAD
    delete: _delete
=======
    delete: _delete,
    getAllAccounts
>>>>>>> frontend-backend_CANETE
};

async function authenticate({ email, password, ipAddress }) {
    const account = await db.Account.scope('withHash').findOne({ where: { email } });

<<<<<<< HEAD
    // Check if account exists first
=======
>>>>>>> frontend-backend_CANETE
    if (!account) {
        throw 'Email does not exist';
    }

<<<<<<< HEAD
    // Then verify password
    if (!(await bcrypt.compare(password, account.passwordHash))) {
        throw 'Password is incorrect';
    }

    if (!account.isVerified) {
        throw 'Account is not verified.';
    }

    // authentication successful so generate jwt and refresh tokens
    const jwtToken = generateJwtToken(account);
    const refreshToken = generateRefreshToken(account, ipAddress);

    // save refresh token
    await refreshToken.save();

    // return basic details and tokens
=======
    if (!account.isVerified) {
        throw 'Email not yet verified';
    }

    if (account.status !== 'Active') {
        throw 'Account is inactive.';
    }

    const isPasswordValid = await bcrypt.compare(password, account.passwordHash);
    if (!isPasswordValid) {
        throw 'Password is incorrect';
    }

    const jwtToken = generateJwtToken(account);
    const refreshToken = generateRefreshToken(account, ipAddress);

    await refreshToken.save();

>>>>>>> frontend-backend_CANETE
    return {
        ...basicDetails(account),
        jwtToken,
        refreshToken: refreshToken.token
    };
}

async function refreshToken({ token, ipAddress }) {
<<<<<<< HEAD
    const refreshToken = await getRefreshToken(token);
    const account = await refreshToken.getAccount();

    // replace old refresh token with a new one and save
    const newRefreshToken = generateRefreshToken(account, ipAddress);
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    refreshToken.replacedByToken = newRefreshToken.token;
    await refreshToken.save();
    await newRefreshToken.save();

    // generate new jwt
    const jwtToken = generateJwtToken(account);

    // return basic details and tokens
    return {
        ...basicDetails(account),
        jwtToken,
        refreshToken: newRefreshToken.token
    };
=======
    if (!token) {
        throw 'Refresh token is required';
    }

    try {
        const refreshToken = await getRefreshToken(token);
        const account = await refreshToken.getAccount();

        // Verify account is still active
        if (account.status !== 'Active') {
            throw 'Account is inactive';
        }

        const newRefreshToken = generateRefreshToken(account, ipAddress);
        refreshToken.revoked = Date.now();
        refreshToken.revokedByIp = ipAddress;
        refreshToken.replacedByToken = newRefreshToken.token;
        
        await refreshToken.save();
        await newRefreshToken.save();

        const jwtToken = generateJwtToken(account);

        return {
            ...basicDetails(account),
            jwtToken,
            refreshToken: newRefreshToken.token
        };
    } catch (error) {
        console.error('Refresh token error:', error);
        throw 'Invalid token';
    }
>>>>>>> frontend-backend_CANETE
}

async function revokeToken({ token, ipAddress }) {
    const refreshToken = await getRefreshToken(token);
<<<<<<< HEAD

    // revoke token and save
=======
    
>>>>>>> frontend-backend_CANETE
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    await refreshToken.save();
}

async function register(params, origin) {
<<<<<<< HEAD
    // Validate if email already exists
    if (await db.Account.findOne({ where: { email: params.email } })) {
        return await sendAlreadyRegisteredEmail(params.email, origin);
    }

    // Create account object
    const account = new db.Account(params);

    // First account = Admin (auto-verified), others = User (needs verification)
    const isFirstAccount = (await db.Account.count()) === 0;
    account.role = isFirstAccount ? Role.Admin : Role.User;

    // Set verified date (Admin) OR verification token (User)
    if (isFirstAccount) {
        account.verified = new Date(); // Auto-verify admin
    } else {
        account.verificationToken = randomTokenString(); // Require email verification
    }

    // Hash password
    account.passwordHash = await hash(params.password);

    // Save account
    await account.save();

    // Send verification email only for users after first account
    if (!isFirstAccount) {
        await sendVerificationEmail(account, origin);
    }
    console.log('\nIsFirstAccount: ', isFirstAccount);
    return account; // Return the account in all cases
=======
    if (await db.Account.findOne({ where: { email: params.email } })) {
        await sendAlreadyRegisteredEmail(params.email, origin);
        throw 'Email "' + params.email + '" is already registered';
    }

    const account = new db.Account(params);
    const isFirstAccount = (await db.Account.count()) === 0;
    account.role = isFirstAccount ? Role.Admin : Role.User;
    account.status = isFirstAccount ? 'Active' : 'Inactive';
    account.verificationToken = isFirstAccount ? null : randomTokenString();

    if (isFirstAccount) {
        account.verified = Date.now();
    }

    account.passwordHash = await hash(params.password);
    await account.save();

    try {
        if (!isFirstAccount) {
            await sendVerificationEmail(account, origin);
        }
    } catch (err) {
        console.error("Email sending failed:", err.message);
        throw 'Failed to send verification email';
    }

    return {
        message: isFirstAccount 
            ? 'Registration successful. You can now login.'
            : 'Registration successful, please check your email for verification instructions'
    };
>>>>>>> frontend-backend_CANETE
}

async function verifyEmail({ token }) {
    const account = await db.Account.findOne({ where: { verificationToken: token } });
    if (!account) throw 'Verification failed';

    account.verified = Date.now();
    account.verificationToken = null;
<<<<<<< HEAD
=======
    account.status = 'Active';
>>>>>>> frontend-backend_CANETE
    await account.save();
}

async function forgotPassword({ email }, origin) {
    const account = await db.Account.findOne({ where: { email } });

<<<<<<< HEAD
    // always return ok response to prevent email enumeration
    if (!account) return;

    // create reset token that expires after 24 hours
    account.resetToken = randomTokenString();
    account.resetTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await account.save();

    // send email
=======
    if (!account) return;

    account.resetToken = randomTokenString();
    account.resetTokenExpires = new Date(Date.now() + 24*60*60*1000);
    await account.save();

>>>>>>> frontend-backend_CANETE
    await sendPasswordResetEmail(account, origin);
}

async function validateResetToken({ token }) {
    const account = await db.Account.findOne({
        where: {
            resetToken: token,
            resetTokenExpires: { [Op.gt]: Date.now() }
        }
    });

    if (!account) throw 'Invalid token';

    return account;
}

async function resetPassword({ token, password }) {
    const account = await validateResetToken({ token });

<<<<<<< HEAD
    // update password and remove reset token
    account.passwordHash = await hash(password);
    account.passwordReset = Date.now();
    account.resetToken = null;
=======
    account.passwordHash = await hash(password);
    account.passwordReset = Date.now();
    account.resetToken = null;
    account.resetTokenExpires = null;
>>>>>>> frontend-backend_CANETE
    await account.save();
}

async function getAll() {
    const accounts = await db.Account.findAll();
    return accounts.map(x => basicDetails(x));
}

<<<<<<< HEAD
=======
async function getAllAccounts() {
    return await db.Account.findAll();
}

>>>>>>> frontend-backend_CANETE
async function getById(id) {
    const account = await getAccount(id);
    return basicDetails(account);
}

async function create(params) {
<<<<<<< HEAD
    // validate
=======
>>>>>>> frontend-backend_CANETE
    if (await db.Account.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    const account = new db.Account(params);
    account.verified = Date.now();
<<<<<<< HEAD

    // hash password
    account.passwordHash = await hash(params.password);

    // save account
    await account.save();

=======
    account.verificationToken = null;
    account.status = params.status || 'Active';
    account.role = params.role || Role.User;
    account.passwordHash = await hash(params.password);
    await account.save();
>>>>>>> frontend-backend_CANETE
    return basicDetails(account);
}

async function update(id, params) {
<<<<<<< HEAD
    try {
        // Log inputs for debugging
        console.log('ID:', id);

        // Fetch the account by ID
        const account = await getAccount(id);
        console.log('Account:', account);

        // Validate email uniqueness (if email is being updated)
        // Validate email uniqueness (if email is being updated)
        if (params && params.email && account.email !== params.email && await db.Account.findOne({ where: { email: params.email }})) {
            throw 'Email "' + params.email + '" is already taken';
        }

        // Hash password if it is provided and valid
        if (params && params.password) {
            params.passwordHash = await hash(params.password);
        }

        Object.assign(account, params);
        
        // Update timestamp
        account.updated = Date.now();

        // Save the updated account
        await account.save();

        // Return basic details of the updated account
        return basicDetails(account);
    } catch (error) {
        console.error('Error updating account:', error);
        throw 'An error occurred while updating the account';
    }
=======
    const account = await getAccount(id);
    if (params.email && account.email !== params.email && await db.Account.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    if (params.password) {
        params.passwordHash = await hash(params.password);
    }

    Object.assign(account, params);
    account.updated = Date.now();
    await account.save();
    return basicDetails(account);
>>>>>>> frontend-backend_CANETE
}

async function _delete(id) {
    const account = await getAccount(id);
    await account.destroy();
}

<<<<<<< HEAD
// helper functions

=======
>>>>>>> frontend-backend_CANETE
async function getAccount(id) {
    const account = await db.Account.findByPk(id);
    if (!account) throw 'Account not found';
    return account;
}

async function getRefreshToken(token) {
<<<<<<< HEAD
    const refreshToken = await db.RefreshToken.findOne({ where: { token } });
    if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';
    return refreshToken;
=======
    if (!token || token === 'undefined') {
        console.error('Invalid refresh token: token is undefined or null');
        throw 'Invalid refresh token: token is missing';
    }
    
    try {
        const refreshToken = await db.RefreshToken.findOne({ where: { token } });
        
        if (!refreshToken) {
            console.error(`No refresh token found in database for token: ${token.substring(0, 10)}...`);
            throw 'Invalid token: token not found';
        }
        
        if (!refreshToken.isActive) {
            console.error(`Refresh token is inactive or expired: ${token.substring(0, 10)}...`);
            throw 'Invalid token: token is inactive or expired';
        }
        
        return refreshToken;
    } catch (error) {
        console.error('Error retrieving refresh token:', error);
        throw 'Invalid token';
    }
>>>>>>> frontend-backend_CANETE
}

async function hash(password) {
    return await bcrypt.hash(password, 10);
}

function generateJwtToken(account) {
<<<<<<< HEAD
    // create a jwt token containing the account id that expires in 15 minutes
    return jwt.sign({ sub: account.id, id: account.id }, config.secret, { expiresIn: '15m' });
}

function generateRefreshToken(account, ipAddress) {
    // create a refresh token that expires in 7 days
=======
    if (!envConfig.secret) {
        console.error('JWT secret is missing or undefined!');
        throw new Error('JWT secret configuration is missing');
    }
    
    return jwt.sign(
        {
            sub: account.id,
            id: account.id,
            role: account.role
        },
        envConfig.secret,
        { expiresIn: '15m' }
    );
}

function generateRefreshToken(account, ipAddress) {
>>>>>>> frontend-backend_CANETE
    return new db.RefreshToken({
        accountId: account.id,
        token: randomTokenString(),
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdByIp: ipAddress
    });
}

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

function basicDetails(account) {
<<<<<<< HEAD
    const { id, title, firstName, lastName, email, role, created, updated, isVerified, status } = account;
    return { id, title, firstName, lastName, email, role, created, updated, isVerified, status };
}

async function sendVerificationEmail(account, origin) {
    let message;
    if (origin) {
        const verifyUrl = `${origin}/account/verify-email?token=${account.verificationToken}`;
        message = `<p>Please click the below link to verify your email address:</p>
                    <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to verify your email address with the <code>/account/verify-email</code> api route:</p>
                    <p><code>${account.verificationToken}</code></p>`;
    }

    await sendEmail({
        to: account.email,
        subject: 'Sign-up Verification API - Verify Email',
        html: `<h4>Verify Email</h4>
               <p>Thanks for registering!</p>
                ${message}`
=======
    const { id, title, firstName, lastName, email, role, created, updated, status, isVerified } = account;
    return { id, title, firstName, lastName, email, role, created, updated, status, isVerified };
}

async function sendVerificationEmail(account, origin) {
    // Always use proper production URL if no origin provided
    const productionUrl = 'https://full-stack-application-user-management.vercel.app';
    const verifyUrl = `${origin || productionUrl}/account/verify-email?token=${account.verificationToken}`;
    
    const emailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Verify Your Email Address</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #2c3e50;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
        }
        .content {
            padding: 30px;
            background-color: #f9f9f9;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #3498db;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #777;
            background-color: #f0f0f0;
            border-radius: 0 0 8px 8px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Welcome to Our Platform</h1>
    </div>
    <div class="content">
        <div class="logo">User Management System</div>
        <p>Hello ${account.firstName},</p>
        <p>Thank you for registering with us! To complete your registration, please verify your email address by clicking the button below:</p>
        
        <p style="text-align: center;">
            <a href="${verifyUrl}" class="button">Verify Email Address</a>
        </p>
        
        <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
        <p><a href="${verifyUrl}" style="word-break: break-all;">${verifyUrl}</a></p>
        
        <p>This verification link will expire in 24 hours.</p>
        
        <p>If you didn't create an account with us, please ignore this email or contact support if you have questions.</p>
        
        <p>Best regards,<br>The User Management Team</p>
    </div>
    <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>&copy; ${new Date().getFullYear()} User Management System. All rights reserved.</p>
    </div>
</body>
</html>
    `;

    await sendEmail({
        to: account.email,
        subject: 'Please Verify Your Email Address',
        html: emailTemplate
>>>>>>> frontend-backend_CANETE
    });
}

async function sendAlreadyRegisteredEmail(email, origin) {
<<<<<<< HEAD
    let message;
    if (origin) {
        message = `
        <p>If you don't know your password please visit the <a href="${origin}/account/forgot-password">forgot password</a> page.</p>`;
    } else {
        message = `
        <p>If you don't know your password you can reset it via the <code>/account/forgot-password</code> api route.</p>`;
    }

    await sendEmail({
        to: email,
        subject: 'Sign-up Verification API - Email Already Registered',
        html: `<h4>Email Already Registered</h4>
                <p>Your email <strong>${email}</strong> is already registered.</p>
                ${message}`
=======
    // Always use proper production URL if no origin provided
    const productionUrl = 'https://full-stack-application-user-management.vercel.app';
    const resetUrl = `${origin || productionUrl}/account/forgot-password`;
    
    const emailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Email Already Registered</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #e74c3c;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
        }
        .content {
            padding: 30px;
            background-color: #f9f9f9;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #3498db;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #777;
            background-color: #f0f0f0;
            border-radius: 0 0 8px 8px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Account Already Exists</h1>
    </div>
    <div class="content">
        <div class="logo">User Management System</div>
        <p>Hello,</p>
        <p>We received a request to register a new account using this email address (${email}). However, this email is already registered in our system.</p>
        
        <p>If you've forgotten your password, you can reset it using the link below:</p>
        
        <p style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset Password</a>
        </p>
        
        <p>If you didn't attempt to register, no further action is required. Your account security is not affected.</p>
        
        <p>For security reasons, we recommend:</p>
        <ul>
            <li>Using a strong, unique password</li>
            <li>Enabling two-factor authentication if available</li>
            <li>Regularly updating your password</li>
        </ul>
        
        <p>If you need any assistance, please contact our support team.</p>
        
        <p>Best regards,<br>The User Management Team</p>
    </div>
    <div class="footer">
        <p>This is an automated security message. Please do not reply to this email.</p>
        <p>&copy; ${new Date().getFullYear()} User Management System. All rights reserved.</p>
    </div>
</body>
</html>
    `;

    await sendEmail({
        to: email,
        subject: 'Email Address Already Registered',
        html: emailTemplate
>>>>>>> frontend-backend_CANETE
    });
}

async function sendPasswordResetEmail(account, origin) {
<<<<<<< HEAD
    let message;
    if (origin) {
        const resetUrl = `${origin}/account/reset-password?token=${account.resetToken}`;
        message = `<p>Please click the link below to reset your password, the link will be valid for 1 day:</p>
                    <p><a href="${resetUrl}">${resetUrl}</a></p>`;
    } else {
        message = `<p>Please use the token below to reset your password with the <code>/account/reset-password</code> api route:</p>
                    <p><code>${account.resetToken}</code></p>`;
    }

    await sendEmail({
        to: account.email,
        subject: 'Sign-up Verification API - Reset Password',
        html: `<h4>Reset Password Email</h4>
                ${message}`
=======
    // Always use proper production URL if no origin provided
    const productionUrl = 'https://full-stack-application-user-management.vercel.app';
    const resetUrl = `${origin || productionUrl}/account/reset-password?token=${account.resetToken}`;
    
    const emailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #3498db;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
        }
        .content {
            padding: 30px;
            background-color: #f9f9f9;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #e74c3c;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #777;
            background-color: #f0f0f0;
            border-radius: 0 0 8px 8px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 20px;
        }
        .security-tip {
            background-color: #fff8e1;
            padding: 15px;
            border-left: 4px solid #ffc107;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Password Reset Request</h1>
    </div>
    <div class="content">
        <div class="logo">User Management System</div>
        <p>Hello ${account.firstName},</p>
        <p>We received a request to reset the password for your account (${account.email}).</p>
        
        <p>To reset your password, click the button below:</p>
        
        <p style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset Password</a>
        </p>
        
        <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
        
        <div class="security-tip">
            <h3 style="margin-top: 0;">Security Tips:</h3>
            <ul>
                <li>Never share your password with anyone</li>
                <li>Make sure your password is strong and unique</li>
                <li>Change your password regularly</li>
                <li>Be cautious of phishing attempts</li>
            </ul>
        </div>
        
        <p>This password reset link will expire in 24 hours.</p>
        
        <p>Best regards,<br>The User Management Team</p>
    </div>
    <div class="footer">
        <p>This is an automated security message. Please do not reply to this email.</p>
        <p>&copy; ${new Date().getFullYear()} User Management System. All rights reserved.</p>
    </div>
</body>
</html>
    `;

    await sendEmail({
        to: account.email,
        subject: 'Password Reset Request',
        html: emailTemplate
>>>>>>> frontend-backend_CANETE
    });
}