<<<<<<< HEAD
// account.model

const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false },
        passwordHash: { type: DataTypes.STRING, allowNull: false },
        title: { type: DataTypes.STRING, allowNull: false },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        acceptTerms: {type: DataTypes.BOOLEAN},
        role: { type: DataTypes.STRING, allowNull: false },
        status: { 
            type: DataTypes.STRING, 
            allowNull: false, 
            defaultValue: 'active' // Default value for new accounts
        },
        verificationToken: { type: DataTypes.STRING },
        verified: { type: DataTypes.DATE },
        resetToken: { type: DataTypes.STRING },
        resetTokenExpires: { type: DataTypes.DATE },
        passwordReset: { type: DataTypes.DATE },
        created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updated: { type: DataTypes.DATE },
        isVerified: {
            type: DataTypes.VIRTUAL,
            get() { return !!(this.verified || this.passwordReset); }
        }
    };

    const options = {
        //disable default timestamp fields (createdAt and UpdatedAt)
        timestamps: false,
        defaultScope: {
            //exclude password hash by default
            attributes: { exclude: ['passwordHash'] }
        },

        scopes: {
            //include hash with this scope
            withHash: { attributes: {}, }
        }
    };

=======
// Import DataTypes from Sequelize for defining model attributes
const { DataTypes } = require('sequelize');

// Export the model function to be used elsewhere
module.exports = model;

// Main model definition function
function model(sequelize) {
    // Define the attributes (columns) for the account table
    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false }, // Email field, required
        passwordHash: { type: DataTypes.STRING, allowNull: false }, // Hashed password, required
        title: { type: DataTypes.STRING, allowNull: false }, // Title (Mr, Mrs, etc), required
        firstName: { type: DataTypes.STRING, allowNull: false }, // First name, required
        lastName: { type: DataTypes.STRING, allowNull: false }, // Last name, required
        acceptTerms: { type: DataTypes.BOOLEAN }, // Whether terms were accepted
        role: { type: DataTypes.STRING, allowNull: false }, // User role, required
        verificationToken: { type: DataTypes.STRING }, // Token for email verification
        verified: { type: DataTypes.DATE }, // Date when account was verified
        resetToken: { type: DataTypes.STRING }, // Token for password reset
        resetTokenExpires: { type: DataTypes.DATE }, // Expiration date for reset token
        passwordReset: { type: DataTypes.DATE }, // Date when password was last reset
        created: { 
            type: DataTypes.DATE, 
            allowNull: false, 
            defaultValue: DataTypes.NOW // Default to current timestamp
        },
        status: { 
            type: DataTypes.ENUM('Active', 'Inactive'), // Only allow these values
            allowNull: false, 
            defaultValue: 'Inactive' // Default status
        },
        updated: { type: DataTypes.DATE }, // Last updated timestamp
        isVerified: {
            type: DataTypes.VIRTUAL, // Virtual field (not stored in DB)
            get() { 
                // Returns true if either verified or passwordReset exists
                return !!(this.verified || this.passwordReset); 
            }
        }
    };

    // Model options configuration
    const options = {
        // Disable automatic createdAt and updatedAt fields
        timestamps: false,
        // Default scope applied to all queries
        defaultScope: {
            // Exclude passwordHash by default for security
            attributes: { exclude: ['passwordHash'] }
        },
        // Additional scope that includes passwordHash
        scopes: {
            withHash: { attributes: {} } // No attributes excluded
        }
    };

    // Create and return the Account model
>>>>>>> frontend-backend_CANETE
    return sequelize.define('account', attributes, options);
}