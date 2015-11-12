
var express = require('express'),
	router  = express.Router();

function init(app, passport) {
	router.get("/", function (req, res) {
		res.render("index");
	});
	
	app.use("/", router);

	var authRoutes = require("./authRoutes")(passport);
	app.use("/auth", authRoutes);
	
	var dashboardRoutes = require("./dashboardRoutes")();
	app.use("/dashboard", dashboardRoutes);
}



module.exports = init;