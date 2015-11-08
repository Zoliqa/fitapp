
var initLogin = require('./login');
var initRegister = require('./register');
var User = require('../models/user');

function init(passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.username);
	});
	
	passport.deserializeUser(function (username, done) {
		User.findOne({ username: username }, function (err, user) {
			done(null, user);
		});
	});
	
	initLogin(passport);
	initRegister(passport);
}

module.exports = init;