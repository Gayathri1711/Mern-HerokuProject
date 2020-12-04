var mongoose = require("mongoose");
// Defining what are the fields required and its type for document
var schema = new mongoose.Schema({
    title:String,
    url:String,
    description:String,
    imageUrl:String
})
module.exports=mongoose.model("article",schema);