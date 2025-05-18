<<<<<<< HEAD
// employee.model

const { DataTypes } = require('sequelize');

=======
const { DataTypes } = require('sequelize');
// Lopez Employee CRUD - Defines the Employee model for database operations
>>>>>>> frontend-backend_CANETE
module.exports = model;

function model(sequelize) {
    const attributes = {
<<<<<<< HEAD
        employeeId: { type: DataTypes.STRING, allowNull: false, unique: true },
        position: { type: DataTypes.STRING, allowNull: false },
        hireDate: { type: DataTypes.DATEONLY, allowNull: false },
        created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updated: { type: DataTypes.DATE },
        status: { 
            type: DataTypes.STRING, 
            allowNull: false, 
            defaultValue: 'active' 
        }
    };

    const options = {
        timestamps: false
    };

=======
        employeeId: { type: DataTypes.STRING, allowNull: false },         // Lopez: Unique employee identifier
        firstName: { type: DataTypes.STRING, allowNull: false },         // Lopez: Employee's first name (required)
        lastName: { type: DataTypes.STRING, allowNull: false },          // Lopez: Employee's last name (required)
        email: { type: DataTypes.STRING, allowNull: false },             // Lopez: Contact email (required)
        departmentId: { type: DataTypes.INTEGER, allowNull: false },     // Lopez: Department reference ID
        accountId: { type: DataTypes.INTEGER, allowNull: true },         // Lopez: Optional linked account ID
        position: { type: DataTypes.STRING },                            // Lopez: Job title/position
        hireDate: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },  // Lopez: Employment start date
        phone: { type: DataTypes.STRING },                              // Lopez: Contact number
        status: { type: DataTypes.ENUM('Active', 'Inactive'), allowNull: false, defaultValue: 'Active' },  // Lopez: Employment status
        created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },   // Lopez: Record creation timestamp
        updated: { type: DataTypes.DATE }                                // Lopez: Last update timestamp
    };

    const options = {
        timestamps: false,  // Lopez: Disables automatic timestamp fields
        hooks: {
            beforeUpdate: async (employee) => {  // Lopez: Auto-updates 'updated' field before saving changes
                employee.updated = new Date();
            }
        }
    };

    // Lopez: Creates and returns the Employee model definition
>>>>>>> frontend-backend_CANETE
    return sequelize.define('employee', attributes, options);
}