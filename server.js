var express = require("express");
var app = express();

app.use(express.static("public")).listen(80);

var urlPrefix = `http://127.0.0.1`;
console.log(urlPrefix);