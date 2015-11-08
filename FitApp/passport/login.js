
var User = require('../models/user'),
	LocalStrategy = require("passport-local").Strategy,
	bcrypt = require('bcrypt-nodejs');

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
					return done(null, false, { isBadUsername: true });
			
				bcrypt.compare(password, user.password, function (err, res) {
					if (!res)
						return done(null, false, { isBadPassword: true });
				
					return done(null, user);
				});
			});
		})
	);
}

module.exports = init;