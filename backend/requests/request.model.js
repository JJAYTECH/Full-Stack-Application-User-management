<<<<<<< HEAD
// request.model

=======
>>>>>>> frontend-backend_CANETE
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
<<<<<<< HEAD
        type: { type: DataTypes.STRING, allowNull: false },
        items: { type: DataTypes.JSON, allowNull: true },
        status: { 
            type: DataTypes.STRING, 
            allowNull: false, 
            defaultValue: 'pending' 
        },
=======
        employeeId: { type: DataTypes.INTEGER, allowNull: false },
        status: { type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'), allowNull: false, defaultValue: 'Pending' },
        type: { type: DataTypes.STRING, allowNull: false },
>>>>>>> frontend-backend_CANETE
        created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updated: { type: DataTypes.DATE }
    };

    const options = {
        timestamps: false
    };

    return sequelize.define('request', attributes, options);
<<<<<<< HEAD
}
=======
} 
>>>>>>> frontend-backend_CANETE
