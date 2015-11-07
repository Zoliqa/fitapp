
var mongoose = require("mongoose");

var user = mongoose.model("user", {
	id: String,
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	emailAddress: String,
	gender: Number,
	birthdate: Date
});

module.exports = user;