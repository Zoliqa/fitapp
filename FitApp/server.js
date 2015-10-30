
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