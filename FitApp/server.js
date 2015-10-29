//var http = require('http');
//var port = process.env.port || 1337;
//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);

var express = require("express");
var app = express();
var swig = require("swig");
   
app.engine("html", swig.renderFile);

app.set("view engine", "html");
app.set("views", "./views");    

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) { 
	res.render('index');
});

if (!module.parent) {
	app.listen(4000);
}

module.exports = app;