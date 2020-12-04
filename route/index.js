/**
 * This file holds are the route path and controller function for which 
 * it need to be routed
 */

//To create a router as module
var route = require("express").Router();
//Import the index Controller file
var indexController = require("../controller/index");
//Route to import all the top articles from newyork times
route.get("/ny-article",indexController.getNycArticle);
//Route to get all the article from mongo db
route.get("/article/get-all",indexController.getAllArticle);
//Route to delete particular article from mongo db
route.delete("/article",indexController.deleteArticle);
//Route to create article in mongo db
route.post("/article",indexController.createArticle);
//Route to update a particular article
route.put("/article/:id",indexController.updateArticle);
//Route to search article b title
route.get("/article/search",indexController.searchArticle);

//To expose this router function to index file
module.exports = route;