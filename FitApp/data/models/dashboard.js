
var mongoose = require("mongoose"),
	Schema   = mongoose.Schema,
	Session	 = require("./Session.js");

var Dashboard = mongoose.model("Dashboard", {
	id: String,
	owner: { type: Schema.Types.ObjectId, ref: "User" },
	title: String,
	description: String,
	// sharedWith: [{ type: Schema.Types.ObjectId, ref: "User" }],
	created: Date,
	sessions: [Session.SessionSchema]
});

module.exports = Dashboard;