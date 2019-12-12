const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const app = express();


app.use(bodyParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


app.listen(port,()=>{
  console.log("Running on localhost:3001");
});

app.get("/*",(req,res)=>{
  console.log(__dirname + '/public/index.html');
    res.sendFile(__dirname + '/public/index.html');
});
