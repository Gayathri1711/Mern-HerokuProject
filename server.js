var express = require("express");
var app=express();
const path = require("path")
const PORT = process.env.PORT || 5000;
//To get json payload from request
app.use(express.json());
//For forms 
app.use(express.urlencoded({extended:false}));


//To import router
var router= require("./route/index");

//To start database on startup
var database = require("./database/config")

app.use((req,res,next)=>{
 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers","content-type")
    next();
}
    );
    
//To have a standard endpoint ie:/api and mounted the imported router
app.use("/api",router)
app.use(express.static(path.join(__dirname, "client", "build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


//To send status 404 for wrong url calls
app.use((req,res)=>{
    res.status(404).send({
        "message":"Requested URL not present"
    })

})

// To Start server and to listen in PORT 5000
app.listen(PORT,()=>{
    console.log("Server is started in port ${PORT}.")
});