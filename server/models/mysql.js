const Sequelize = require('sequelize');

let sequelize = new Sequelize(
    "arkusnexus",
    "root",
    "-.t1n4mIWYAN.-",
    {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
    }
)
console.log("Conectado a la base de datos");

module.exports = sequelize;