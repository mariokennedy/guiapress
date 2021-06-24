const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define("articles",{
    title:{
        type: Sequelize.STRING,
        AllowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        AllowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        AllowNull: false
    }
});


Article.belongsTo(Category);
Category.hasMany(Article);

module.exports = Article;