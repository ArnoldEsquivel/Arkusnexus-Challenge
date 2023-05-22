const { DataTypes } = require('sequelize');
const sequelize = require('./mysql');
const Account = require('./account');
const TypeUser = require('./type_user');

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
            model: Account,
            key: 'id',
        },
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TypeUser,
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

User.belongsTo(Account, {
    as: 'account',
    foreignKey: 'account_id',
});

User.belongsTo(TypeUser, {
    as: 'type_user',
    foreignKey: 'type_id',
});

User.sync({ alter: true });

module.exports = User;