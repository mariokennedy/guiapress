const Sequelize = require("sequelize");
const connection = new Sequelize("guiapress","root","KMario23",{
    host: "localhost",
    dialect: "mysql",
    timezone: "-03:00"
});

module.exports = connection;