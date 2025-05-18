<<<<<<< HEAD
// db.js

const config = require('config.json');
const { Sequelize } = require('sequelize');

=======
const config = require('../config.json');
const { Sequelize } = require('sequelize');

// Determine environment
const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const envConfig = config[env];

>>>>>>> frontend-backend_CANETE
module.exports = db = {};

initialize();

async function initialize() {
<<<<<<< HEAD
    // Create a Sequelize instance
    const sequelize = new Sequelize(config.database.url, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: config.database.ssl ? {
                require: true,
                rejectUnauthorized: false,
            } : false
        },
        logging: console.log
    });

    try {
        // Test the connection
        await sequelize.authenticate();
        console.log("PostgreSQL connection established successfully.");

        // Init models and add them to the exported db object
        db.Account = require('../accounts/account.model')(sequelize);
        db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);
        db.Department = require('../departments/department.model')(sequelize);
        db.Employee = require('../employees/employee.model')(sequelize);
        db.Workflow = require('../workflows/workflow.model')(sequelize);
        db.Request = require('../requests/request.model')(sequelize);

        // Define relationships
        // Account-RefreshToken
        db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
        db.RefreshToken.belongsTo(db.Account);

        // Account-Employee (one-to-one)
        db.Account.hasOne(db.Employee, { foreignKey: 'userId' });
        db.Employee.belongsTo(db.Account, { foreignKey: 'userId' });

        // Department-Employee (one-to-many)
        db.Department.hasMany(db.Employee);
        db.Employee.belongsTo(db.Department);

        // Employee-Workflow (one-to-many)
        db.Employee.hasMany(db.Workflow, { onDelete: 'CASCADE'});
        db.Workflow.belongsTo(db.Employee);

        // Employee-Request (one-to-many)
        db.Employee.hasMany(db.Request, { onDelete: 'CASCADE'});
        db.Request.belongsTo(db.Employee);

        // Sync all models with database
        await sequelize.sync({ alter: true });
        console.log("Database synced successfully.");
    } catch (error) {
        console.error("Unable to connect to the PostgreSQL database:", error);
=======
    try {
        console.log(`Using ${env} database configuration`);
        
        // Connect Sequelize with MySQL using connection parameters
        const sequelize = new Sequelize(
            envConfig.database.database,
            envConfig.database.user,
            envConfig.database.password, 
            { 
                host: envConfig.database.host,
                dialect: 'mysql',
                logging: console.log // Enable to see SQL queries
            }
        );

        // Initialize models
        db.Account = require('../accounts/account.model')(sequelize);
        db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);
        db.Employee = require('../employees/employee.model')(sequelize);
        db.Department = require('../employees/department.model')(sequelize);
        db.Workflow = require('../employees/workflow.model')(sequelize);
        db.Request = require('../requests/request.model')(sequelize);
        db.RequestItem = require('../requests/requestItem.model')(sequelize);

        // Setup relationships
        db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
        db.RefreshToken.belongsTo(db.Account);

        // Employee-Department relationship
        db.Department.hasMany(db.Employee, { foreignKey: 'departmentId' });
        db.Employee.belongsTo(db.Department, { foreignKey: 'departmentId' });

        // Employee-Workflow relationship
        db.Employee.hasMany(db.Workflow, { foreignKey: 'employeeId' });
        db.Workflow.belongsTo(db.Employee, { foreignKey: 'employeeId' });

        // Account-Employee relationship
        db.Account.hasOne(db.Employee, { foreignKey: 'accountId' });
        db.Employee.belongsTo(db.Account, { foreignKey: 'accountId' });
        
        // Request-Employee relationship
        db.Employee.hasMany(db.Request, { foreignKey: 'employeeId' });
        db.Request.belongsTo(db.Employee, { foreignKey: 'employeeId' });

        // Request-RequestItem relationship
        db.Request.hasMany(db.RequestItem, { foreignKey: 'requestId', onDelete: 'CASCADE' });
        db.RequestItem.belongsTo(db.Request, { foreignKey: 'requestId' });

        // Sync models
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('Database synchronized');
        
    } catch (err) {
        console.error('Database initialization failed:', err);
        process.exit(1);
>>>>>>> frontend-backend_CANETE
    }
}