
var mongoose = require("mongoose"),
	Schema  = mongoose.Schema;

var Session = mongoose.model("Session", {
	_id: Schema.Types.ObjectId,
	date: Date,
	selectedGroups: [Number],
	notes: String,
	location: String
});

module.exports = Session;