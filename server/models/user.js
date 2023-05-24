const { DataTypes } = require('sequelize');
const sequelize = require('./mysql');
const TypeUser = require('./type_user.js');
const Account = require('./account.js');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'accounts',
            key: 'id',
        },
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'type_users',
            key: 'id',
        },
    },
    cv_link: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    technicality: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    english_level: {
        type: DataTypes.STRING(50),
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
    }
}, {
    paranoid: true,
});

User.belongsTo(Account, {
    as: 'account',
    foreignKey: 'account_id',
    targetKey: 'id',
});

User.belongsTo(TypeUser, {
    as: 'role',
    foreignKey: 'type_id',
    targetKey: 'id',
});

// User.sync({ alter: true });

module.exports = User;