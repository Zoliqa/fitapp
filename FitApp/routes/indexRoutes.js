
var express = require('express'),
	router  = express.Router();

function init(app, passport) {
	router.get("/", function (req, res) {
		res.render("index");
	});
	
	app.use("/", router);

	var authRoutes = require("./userRoutes")(passport);
	app.use("/user", authRoutes);
	
	var dashboardRoutes = require("./dashboardRoutes")();
	app.use("/dashboard", dashboardRoutes);

	var sessionRoutes = require("./sessionRoutes")();
	app.use("/session", sessionRoutes);
}

module.exports = init;