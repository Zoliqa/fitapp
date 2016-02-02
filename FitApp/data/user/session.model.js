
var mongoose = require("mongoose"),
	Schema	 = mongoose.Schema;

var SessionSchema = {
	id: String,
	startDate: Date,
	endDate: Date,
	selectedGroups: [Number],
	notes: String,
	location: String
};

var Session = mongoose.model("Session", SessionSchema);

module.exports = {
	Session: Session,
	SessionSchema: SessionSchema
};