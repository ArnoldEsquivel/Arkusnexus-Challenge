const { DataTypes } = require('sequelize');
const sequelize = require('./mysql');
const User = require('./user');

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
        references: {
            model: User,
            key: 'id',
        },
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

Account.belongsTo(User, {
    as: 'manager',
    foreignKey: 'operation_manager',
});

Account.sync({ alter: true });

module.exports = Account;