
var mongoose = require("mongoose");

var user = mongoose.model("user", {
	id: String,
	username: String,
	password: String,
	firstname: String,
	lastname: String,
	email: String,
	gender: Number,
	birthdate: Date
});

module.exports = user;