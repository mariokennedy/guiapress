const express = require("express");
const app = express();

const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const article = require("./articles/Article");
const category = require("./categories/Category");
const Article = require("./articles/Article");
const Category = require("./categories/Category");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

connection
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

app.use("/",categoriesController);
app.use("/",articlesController);
  
app.get('/' , (req , res)=>{

    Article.findAll({
      order:[
        ["id","desc"]
      ]
    }).then(articles => {
      
      Category.findAll().then(categories => {
        res.render("index",{
          articles: articles,
          categories: categories
        });
      });

    });
});

app.get('/:slug' , (req , res)=>{

  var slug = req.params.slug;

  Article.findOne({
     where:{
        slug: slug
     }
  }).then(article => {
     if(article != undefined){

      Category.findAll().then(categories => {
        res.render("article",{
          article: article,
          categories: categories
        });
      });

     }else{
        res.redirect("/");
     }
  }).catch(err => {
     res.redirect("/");
  });
});

app.get('/category/:slug' , (req , res)=>{

    var slug = req.params.slug;

    Category.findOne({
      where:{
        slug: slug
      },
      include: [
        {
           model: Article,
        }
     ],
     order:[
      [Article,"id","desc"]
    ]
    }).then( category => {
        if(category != undefined){
            Category.findAll().then(categories => {
              res.render("index",{
                categories: categories,
                articles: category.articles
              })
            })
        }else{
          res.redirect("/");
        }
    }).catch(err => {
      res.redirect("/");
    });
  

});

app.listen(8080,() => {
    console.log("Server is running on port 8080");
});