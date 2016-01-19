
var express = require('express'),
	router = express.Router();

function init(app, passport) {
	router.get("/", function (req, res) {
		res.render("index");
	});
	
	router.get("/tests", function (req, res) {
		res.render("tests-index");
	});
	
	app.use("/", router);
	
	var routesUser = require("./routes.user")(passport);
	app.use("/user", routesUser);
}

module.exports = init;