
var mongoose = require("mongoose"),
	Schema	 = mongoose.Schema;

var ExerciseSchema = {
	id: String,
	groupId: Number,
	name: String,
	started: Date,
	ended: Date,
	notes: String,
	sets: Array
};

var Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = {
	Exercise: Exercise,
	ExerciseSchema: ExerciseSchema
};