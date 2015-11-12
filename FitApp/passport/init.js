
var userQueries = require("../data/queries/userQueries");

function init(passport) {
	passport.serializeUser(function (user, done) {
		done(null, user._id);
	});
	
	passport.deserializeUser(function (id, done) {
		userQueries.find({ _id: id }, function (err, user) {
			if (err)
				return done(null);
			
			return done(null, user);
		});
	});
}

module.exports = init;