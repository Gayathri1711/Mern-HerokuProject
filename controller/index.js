/**
 * This file contains the logic of what particular api needs to do
 */

 // for 3rd party api calls
var axios=require("axios");
//to use collection article
var ArticleModel = require("../model/article")
require('dotenv').config()
var Api_key = process.env.api_key;

/**
 * Import New york times Top article to mongo db
 * 
 * @param {JSON} req 
 * @param {JSON} res 
 * 
 * @returns {JSON} 200 for success with "Data saved successfully" message
 * 
 * @throws 400 for error and bad request
 */
const getNycArticle = (req,res)=>{
    var url="https://api.nytimes.com/svc/mostpopular/v2/viewed/"+7+".json?api-key="+Api_key;
    axios.get(url)
    .then(response=>{
    var results = response.data.results;
    var articleArray=[];
    var articleObj={
        url:"",
        title:"",
        description:"",
        imageUrl:""
    }
    results.map((data)=>{
        articleObj.url=data.url;
        articleObj.title=data.title;
        articleObj.description=data.abstract;
        articleObj.imageUrl=data.media[0]?data.media[0]["media-metadata"][0].url:null;
        articleArray.push({...articleObj});
    })
    //To create document in articles collection
    ArticleModel.create(articleArray,function(err,data){
        if(data){
           res.status(200).send({
               "message":"Data saved successfully"
           });
        }else{
            console.log(err);
        }
    })
}).catch(err=>{
    console.log(err);
})
}

/**
 * To get all article
 * 
 * @param {JSON} req 
 * @param {JSON} res 
 * 
 * @returns {JSON} 200 for success with Array of article
 * 
 * @throws 400 for error and bad request
 */
const getAllArticle=(req,res)=>{
    //To find all documents from articles collection
    ArticleModel.find({},"-__v").then(data=>{
        res.status(200).send({
            "des":"List of Articles",
            "data":data
        })
    }).catch(err=>{
        console.log(err);
        res.status(400).send({
            err
        })
    })
}
/**
 * To delete particular article
 * 
 * @param {JSON} req contains id in query parameter
 * @param {JSON} res 
 * 
 * @returns {JSON} 200 for success with "Data saved successfully" message
 * 
 * @throws 400 for error and bad request
 */
const deleteArticle=async(req,res)=>{
    var id = req.query.id?req.query.id:null;
    if(!id){
        res.status(400).send({
            "err":"Id not present"
        })
    }else{
    try{
    //To delete particular document from articles collection
    await ArticleModel.findByIdAndDelete(id);
    res.status(200).send({
        "message":"Deleted successfully"
    })
    }catch(err){
        console.log(err);
        res.status(400).send({
            err
        })
    }
}
}

/**
 * To create new article
 * 
 * @param {JSON} req contains object payload in request body
 * @param {JSON} res 
 * 
 * @returns {JSON} 200 for success with "Data saved successfully" message
 * 
 * @throws 400 for error and bad request
 */
const createArticle = (req,res)=>{
    var article = req.body;
    console.log(req.body)
     //To create document in articles collection
    ArticleModel.create(article,function(err,data){
        if(data){
           res.status(200).send({
               "message":"Data saved successfully"
           });
        }else{
            console.log(err);
            res.status(400).send({
               err
            });
        }
    })
}

/**
 * To update particular article
 * 
 * @param {JSON} req contains id in url path
 * @param {JSON} res 
 * 
 * @returns {JSON} 200 for success with "updated successfully" message
 * 
 * @throws 400 for error and bad request
 */
const updateArticle=(req,res)=>{
    var id= req.params.id;
     //To update particular documents from articles collection
    ArticleModel.findByIdAndUpdate(id,req.body).then(data=>{
        res.status(200).send({
            "message":"updated successfully"
        })
    }).catch(err=>{
        res.status(400).send({
            err
        })
    })
}

/**
 * Search Article from the provide title
 * 
 * @param {JSON} req contains the string needed to be searched in query
 * @param {JSON} res 
 * 
 * @returns {JSON} 200 for success with Array of Articles
 * 
 * @throws 400 for error and bad request
 */
const searchArticle=(req,res)=>{
    var searchTerm = req.query.searchTerm;
    //To find document with title using regex with option as case insensitive
    ArticleModel.find({
        "title":{
            "$regex":searchTerm,
            "$options":"i"
        }
    },"-__v").then((data)=>{
        res.status(200).send({
            data
        })
    }).catch(err=>{
        console.log(err);
        res.status(400).send(err)
    })
}

module.exports = {
    getNycArticle,
    getAllArticle,
    deleteArticle,
    createArticle,
    updateArticle,
    searchArticle
}