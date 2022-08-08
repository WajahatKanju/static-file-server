const http = require("http");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use((req, res, next) => {
  console.log(`Request IP ${req.url}`);
  console.log(`Request Time ${new Date()}`);
  next();
});

app.use((req, res, next) => {
    const pathToFile = path.join(__dirname, "static", req.url );
    fs.stat(pathToFile,  (err, fileInfo)=> {
        if(err){
            next();
            return;
        }
        if(fileInfo.isFile()){
            res.sendFile(pathToFile);
            console.log(`path ==> ${pathToFile}`);
          
        }else{
          next();
        }
    })
});


app.use((req, res, next) => {
  res.sendStatus(404);
});



http.createServer(app).listen(3000, () => {
  console.log("started on port 3000");
});
