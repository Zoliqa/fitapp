
var express     = require("express"),
	bcrypt      = require('bcrypt-nodejs'),
	userQueries = require("../data/queries/userQueries"),
	utilities   = require("../passport/utilities"),
	router	    = express.Router();

function init() {
	router.post("/login", function (req, res, next) {
		userQueries.find({ username: req.body.username }, function (err, user) { 
			if (err)
				return next(err);
			
			if (!user)
				return res.json({ success: false });
			
			bcrypt.compare(req.body.password, user.password, function (err, result) {
				if (err)
					return next(err);
				
				if (!result)
					return res.json({ success: false });
				
				req.logIn(user, function (err) {
					if (err)
						return next(err);
					
					return res.json({ success: true, user: user });
				});
			});
		});
	});

	router.get("/logout", utilities.isAuthenticated, function (req, res) {
		req.logout();
		res.json({ success: true });
	});
	
	router.get("/profile", function (req, res, next) {
		if (req.isAuthenticated())
			return res.json({ success: true, user: req.user });
		
		return res.json({ success: false });
	});

	router.post("/", function (req, res, next) {
		userQueries.find({ username: req.body.username }, function (err, user) { 
			if (err)
				return next(err);
			
			if (user)
				return res.json({ success: false, message: "User with the given name already exists" });
			
			bcrypt.hash(req.body.password, null, null, function (err, passwordHash) {
				userQueries.create(
					req.body.username, 
					passwordHash, 
					req.body.firstname, 
					req.body.lastname, 
					req.body.email, 
					req.body.gender,
					req.body.birthdate, 
					function (err, user) { 
						if (err)
							return next(err);
					
						res.json(user);

						//req.logIn(user, function (err) {
						//	if (err)
						//		return next(err);
						
						//	return res.json({ success: true, user: user });
						//});
					});
			});
		});
	});
	
	router.put(":/id", utilities.isAuthenticated, function (req, res, next) { 
		// update...
	});

	router.delete("/:id", utilities.isAuthenticated, function (req, res, next) { 
		userQueries.remove(req.params.id, function (err, user) { 
			if (err)
				return next(err);

			return res.json({ user: user });
		});
	});

	return router;
}

module.exports = init;