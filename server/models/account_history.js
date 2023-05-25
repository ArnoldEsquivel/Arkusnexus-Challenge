const { DataTypes } = require('sequelize');
const sequelize = require('./mysql');
const User = require('./user');
const Account = require('./account');

const AccountHistory = sequelize.define('accounts_history', {
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
    action: {
        type: DataTypes.TEXT,
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
    },
}, {
    paranoid: true,
    freezeTableName: true,
});

AccountHistory.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id',
    targetKey: 'id',
});

AccountHistory.belongsTo(Account, {
    as: 'account',
    foreignKey: 'account_id',
    targetKey: 'id',
});

// AccountHistory.sync({ alter: true });

module.exports = AccountHistory;