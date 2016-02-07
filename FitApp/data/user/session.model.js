
var mongoose = require("mongoose"),
	Schema	 = mongoose.Schema,
	Exercise = require("./exercise.model");

var SessionSchema = {
	id: String,
	startDate: Date,
	endDate: Date,
	selectedGroups: [Number],
	notes: String,
	location: String,
	exercises: [Exercise.ExerciseSchema]
};

var Session = mongoose.model("Session", SessionSchema);

module.exports = {
	Session: Session,
	SessionSchema: SessionSchema
};