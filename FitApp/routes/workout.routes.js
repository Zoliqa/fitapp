
var express		   = require("express"),
	workoutQueries = require("../data/user/workout.queries"),
	utilities	   = require("../passport/passport.utilities"),
	router		   = express.Router(),
	_			   = require("../public/lib/underscore/underscore");  

router.get("/(:id)?", utilities.isAuthenticated, function (req, res, next) {
		
	if (!req.params.id) { 
		if (req.query.active === "true")
			sessionQueries.findActiveSession(req.user._id, function (err, session) {
				if (err)
					return next(err);
					
				return res.json(session);
			});
	}
	else {
		var session = _.find(req.user.sessions, function (session) {
			return session._id == req.params.id;
		});
				
		return res.json(session);
	}
});

router.post("/", utilities.isAuthenticated, function (req, res, next) {
	workoutQueries.create(req.user._id, req.body, function (err, workout) {
		if (err)
			return next(err);
			
		res.json(workout);
	});
});
	
router.put("/:id", utilities.isAuthenticated, function (req, res, next) {
	workoutQueries.update(req.params.id, req.body, function (err, workout) {
		if (err)
			return next(err);
			
		res.json(workout);
	});
});
	
router.delete("/:id", utilities.isAuthenticated, function (req, res, next) {
	workoutQueries.remove(req.user._id, req.params.id, function (err, workout) {
		if (err)
			return next(err);
			
		res.json(workout);
	});
});

module.exports = router;