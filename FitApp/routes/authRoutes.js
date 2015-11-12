
var express     = require("express"),
	bcrypt      = require('bcrypt-nodejs'),
	userQueries = require("../data/queries/userQueries"),
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

	router.get("/logout", function (req, res) {
		req.logout();
		res.json({ success: true });
	});
	
	router.post("/register", function (req, res, next) {
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
					
						req.logIn(user, function (err) {
							if (err)
								return next(err);
						
							return res.json({ success: true, user: user });
						});
					});
			});
		});
	});

	router.post("/unregister/:id", function (req, res, next) { 
		userQueries.delete(req.params.id, function (err) { 
			if (err)
				return next(err);

			return res.json({ success: true });
		});
	});
	
	var isLoggedIn = function (req, res, next) {
		if (req.isAuthenticated())
			return next();
		
		res.status(401).json({ message: "Unauthorized" });
	}

	router.get("/profile", function (req, res, next) {
		if (req.isAuthenticated())
			res.json({ success: true, user: req.user });
		else
			res.json({ success: false });
	});

	return router;
}

function init2(passport) {
	router.post("/login", function (req, res, next) {
		//passport.authenticate("login", function (err, user, info) {
		//	if (err)
		//		return next(err);
			
		//	if (!user)
		//		return res.json({ success: false });
			
		//	req.logIn(user, function (err) {
		//		if (err)
		//			return next(err);
				
		//		return res.json({ success: true, user: user });
		//	});
		//})(req, res, next);

		userModel.findOne({ username: req.body.username }, function (err, user) {
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