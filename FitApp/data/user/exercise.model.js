
var mongoose = require("mongoose"),
	Schema	 = mongoose.Schema;

var ExerciseSchema = {
	id: String,
	groupId: Number,
	name: String,
	startTime: Date,
	notes: String
};

var Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = {
	Exercise: Exercise,
	ExerciseSchema: ExerciseSchema
};