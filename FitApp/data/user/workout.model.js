
var mongoose = require("mongoose"),
	Schema	 = mongoose.Schema,
	Exercise = require("./exercise.model");

var WorkoutSchema = {
	id: String,
	startDate: Date,
	endDate: Date,
	selectedGroups: [Number],
	notes: String,
	location: String,
	exercises: [Exercise.ExerciseSchema]
};

var Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = {
	Workout: Workout,
	WorkoutSchema: WorkoutSchema
};