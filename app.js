const http = require('http');
const express = require('express');
const fs = require('fs');
const path = require('path');
const Morgan = require('morgan');

const pathToStatic = path.join(__dirname, 'static');

const app = express();
app.use(Morgan('dev'));

app.use((req, res, next) => {
  console.log(`Request IP ${req.url}`);
  console.log(`Request Time ${new Date()}`);
  next();
});

app.use(express.static(pathToStatic));

app.use((req, res, next) => {
  res.sendStatus(404);
});



http.createServer(app).listen(3000, () => {
  console.log('started on port 3000');
});
