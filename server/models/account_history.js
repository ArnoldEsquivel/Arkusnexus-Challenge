const { DataTypes } = require('sequelize');
const sequelize = require('./database');
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
    type_member: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    manager_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    start_day: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    last_day: {
        type: DataTypes.DATE,
        allowNull: true,
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
    as: 'manager',
    foreignKey: 'manager_id',
});

AccountHistory.sync({ alter: true });

module.exports = AccountHistory;