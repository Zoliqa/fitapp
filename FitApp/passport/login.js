
var User = require('../models/user'),
	LocalStrategy = require("passport-local").Strategy;

function init(passport) {
	passport.use("login", new LocalStrategy({
			usernameField: "username",
			passwordField: "password"
		},
		function (username, password, done) {
			User.findOne({ username: username }, function (err, user) {
				if (err)
					return done(err);
			
				if (!user)
					return done(null, false, { message: "Incorrect username." });
			
				if (user.password !== password)
					return done(null, false, { message: "Incorrect password." });
			
				return done(null, user);
			});
		})
	);
}

module.exports = init;