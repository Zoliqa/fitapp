
var User = require('../models/user'),
	LocalStrategy = require("passport-local").Strategy,
	bcrypt = require('bcrypt-nodejs');

function init(passport) {
	passport.use("register", new LocalStrategy({
			passReqToCallback: true
		},
		function (req, username, password, done) {
			var profile = req.body;
		
			User.findOne({ username: profile.username }, function (err, user) {
				if (user) {
					console.log("User " + user.username + " already exists");
				
					return done(null, false);
				}
				else {
					bcrypt.hash(profile.password, null, null, function (err, passwordHash) {
						var user = new User();
					
						user.username = profile.username;
						user.password = passwordHash;				
						user.firstname = profile.firstname;
						user.lastname = profile.lastname;
						user.emailAddress = profile.emailAddress;
						user.gender = profile.gender;
						user.birthdate = new Date(profile.birthdate)
					
						user.save(function (err) {
							if (err) {
								console.log('Error in saving user: ' + err);
								throw err;
							}
						
							console.log("user saved");
							return done(null, user);
						});
					});
				}
			});
		})
	);
}

module.exports = init;