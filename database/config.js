var mongo=require("mongoose");
require('dotenv').config()
var DBurl = process.env.MONGOLAB_URL;
//To connect to Atlas (Cloud) server
mongo.connect(DBurl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(res=>{
    console.log("Database connected successfully");
}).catch(err=>{
    console.log(err);
});