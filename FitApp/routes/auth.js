
var express = require("express");
var router = express.Router();

function init(passport) {
	router.post("/login", function (req, res, next) {
		passport.authenticate("login", function (err, user, info) {
			if (err)
				return next(err);
			
			if (!user)
				return res.json({ success: false });
			
			req.logIn(user, function (err) {
				if (err)
					return next(err);
				
				return res.json({ success: true, user: user });
			});
		})(req, res, next);
	});
	
	router.get("/logout", function (req, res) {
		req.logout();
		res.json({ success: true });
	});
	
	router.post("/register", function (req, res, next) {
		passport.authenticate("register", function (err, user, info) {
			if (err)
				return next(err);
			
			if (!user)
				return res.json({ success: false, message: "User with the given name already exists" });
			
			req.logIn(user, function (err) {
				if (err)
					return next(err);
				
				return res.json({ success: true, user: user });
			});
		})(req, res, next);
	});

	return router;
}

module.exports = init;