
var mongoose = require("mongoose");

var dashboard = mongoose.model("dashboard", {
	id: String,
	userId: String,
	title: String,
	created: Date
});

module.exports = dashboard;