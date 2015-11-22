
var mongoose = require("mongoose"),
	Schema   = mongoose.Schema,
	Session	 = require("./Session.js");

var Dashboard = mongoose.model("Dashboard", {
	id: String,
	owner: { type: Schema.Types.ObjectId, ref: "User" },
	title: String,
	description: String,
	isActive: Boolean,
	created: Date,
	sessions: [Session]
});

module.exports = Dashboard;