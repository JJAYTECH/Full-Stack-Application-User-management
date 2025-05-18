<<<<<<< HEAD
// refresh-token.model

const sequelize = require('sequelize');
=======
>>>>>>> frontend-backend_CANETE
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
<<<<<<< HEAD
        token: { type:DataTypes.STRING },
        expires: { type:DataTypes.DATE },
=======
        token: { type: DataTypes.STRING },
        expires: { type: DataTypes.DATE },
>>>>>>> frontend-backend_CANETE
        created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        createdByIp: { type: DataTypes.STRING },
        revoked: { type: DataTypes.DATE },
        revokedByIp: { type: DataTypes.STRING },
        replacedByToken: { type: DataTypes.STRING },
        isExpired: {
            type: DataTypes.VIRTUAL,
<<<<<<< HEAD
            get() { return Date.now() >- this.expires; }
=======
            get() { return Date.now() >= this.expires; }
>>>>>>> frontend-backend_CANETE
        },
        isActive: {
            type: DataTypes.VIRTUAL,
            get() { return !this.revoked && !this.isExpired; }
        }
    };

    const options = {
<<<<<<< HEAD
        //disable fefault timestamp fields (createdAt and updatedAt)
=======
        // disable default timestamp fields (createdAt and updatedAt)
>>>>>>> frontend-backend_CANETE
        timestamps: false
    };

    return sequelize.define('refreshToken', attributes, options);
}