const { DataTypes } = require('sequelize');
const sequelize = require('./mysql');

const TypeUser = sequelize.define('type_user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_type: {
        type: DataTypes.STRING(100),
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

TypeUser.sync({ alter: true });

module.exports = TypeUser;