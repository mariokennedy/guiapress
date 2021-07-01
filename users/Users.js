const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define("users",{
    email:{
        type: Sequelize.STRING,
        AllowNull: false
    },
    password:{
        type: Sequelize.STRING,
        AllowNull: false
    }
});


module.exports = User;