﻿
var mongoose = require("mongoose"),
	Schema   = mongoose.Schema;

var Dashboard = mongoose.model("Dashboard", {
	id: String,
	owner: { type: Schema.Types.ObjectId, ref: "User" },
	title: String,
	description: String,
	created: Date
});

module.exports = Dashboard;