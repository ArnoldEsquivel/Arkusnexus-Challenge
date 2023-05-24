const { DataTypes } = require('sequelize');
const sequelize = require('./mysql');
const User = require('./user');
const Account = require('./account');

const AccountHistory = sequelize.define('account_history', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Account,
            key: 'id',
        },
    },
    rol: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
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
    },
});

AccountHistory.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id',
});

AccountHistory.belongsTo(Account, {
    as: 'account',
    foreignKey: 'account_id',
});

AccountHistory.belongsTo(User, {
    foreignKey: 'created_by',
    targetKey: 'id',
});

// AccountHistory.sync({ alter: true });

module.exports = AccountHistory;