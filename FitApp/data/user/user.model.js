
var mongoose = require("mongoose"),
	Schema	 = mongoose.Schema,
	Session  = require("./session.model.js");

var User = mongoose.model("User", {
	id: String,
	username: String,
	password: String,
	firstname: String,
	lastname: String,
	email: String,
	gender: Number,
	birthdate: Date,
	sessions: [Session.SessionSchema]
});

module.exports = User;