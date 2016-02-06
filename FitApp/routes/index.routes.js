
var express = require('express'),
	router  = express.Router();

function init(app, passport) {
	router.get("/", function (req, res) {
		res.render("index");
	});
	
	app.use("/", router);
	
	var userRoutes = require("./user.routes");
	app.use("/user", userRoutes);

	var sessionRoutes = require("./session.routes");
	app.use("/session", sessionRoutes);
}

module.exports = init;