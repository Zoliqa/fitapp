
var mongoose = require("mongoose"),
	Schema	 = mongoose.Schema,
	Workout  = require("./workout.model.js");

var User = mongoose.model("User", {
	id: String,
	username: String,
	password: String,
	firstname: String,
	lastname: String,
	email: String,
	gender: Number,
	birthdate: Date,
	workouts: [Workout.WorkoutSchema]
});

module.exports = User;