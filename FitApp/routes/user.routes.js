﻿
var express				= require("express"),
	bcrypt				= require('bcrypt-nodejs'),
	userQueries			= require("../data/user/user.queries"),
	passportUtilities	= require("../passport/passport.utilities"),
	router				= express.Router();

router.post("/login", function (req, res, next) {
		
userQueries.find({ username: req.body.username }, function (err, user) {
	if (err)
		return next(err);
			
	if (!user)
		return res.json(null);
			
	bcrypt.compare(req.body.password, user.password, function (err, result) {
		if (err)
			return next(err);
				
		if (!result)
			return res.json(null);
				
		req.logIn(user, function (err) {
			if (err)
				return next(err);
					
			return res.json(user);
		});
	});
});
});
	
router.get("/logout", passportUtilities.isAuthenticated, function (req, res) {
req.logout();
res.json({});
});
	
router.get("/", function (req, res, next) {
if (req.isAuthenticated())
	return res.json(req.user);
		
return res.json(null);
});
	
router.post("/", function (req, res, next) {
userQueries.create(req.body, function (err, user) {
	if (err)
		return next(err);
			
	res.json(user);
});
});
	
router.put("/:id", passportUtilities.isAuthenticated, function (req, res, next) {
userQueries.update(req.params.id, req.body, function (err, user) {
	if (err)
		return next(err);
			
	res.json(user);
});
});
	
router.delete("/:id", passportUtilities.isAuthenticated, function (req, res, next) {
userQueries.remove(req.params.id, function (err, user) {
	if (err)
		return next(err);
			
	return res.json({ user: user });
});
});
	
module.exports = router;