const { DataTypes } = require('sequelize');
const sequelize = require('./mysql');
// const User = require('./user.js');

const Account = sequelize.define('account', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    account_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    client_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    operation_manager: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // references: {
        //     model: 'users',
        //     key: 'id',
        // },
    },
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: true, //Checar donde se colo
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    paranoid: true,
});

// Account.hasOne(User, {
//     as: 'manager',
//     foreignKey: 'operation_manager',
// });

// Account.sync({ alter: true });

module.exports = Account;