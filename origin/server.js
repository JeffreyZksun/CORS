var express=require('express');
var http = require('http');

var app = express();
app.use(express.static(__dirname + '/static'));

http.createServer(app).listen(8081);
console.log("server is listening on 8081. Access http://localhost:8081/index.html");