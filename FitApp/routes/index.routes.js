
var express = require('express'),
	router  = express.Router();

function init(app, passport) {
	router.get("/", function (req, res) {
		res.render("index");
	});
	
	app.use("/", router);
	
	var userRoutes = require("./user.routes");
	app.use("/user", userRoutes);

	var workoutRoutes = require("./workout.routes");
	app.use("/workout", workoutRoutes);

	var exerciseRoutes = require("./exercise.routes");
	app.use("/exercise", exerciseRoutes);
}

module.exports = init;