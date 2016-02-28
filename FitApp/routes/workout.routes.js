
var express		   = require("express"),
	workoutQueries = require("../data/user/workout.queries"),
	utilities	   = require("../passport/passport.utilities"),
	router		   = express.Router();  

router.get("/:id", utilities.isAuthenticated, function (req, res, next) {
	workoutQueries.find(req.user._id, req.params.id, function (err, workout) { 
		if (err)
			return next(err);
		
		res.json(workout);
	});
});

router.post("/", utilities.isAuthenticated, function (req, res, next) {
	workoutQueries.create(req.user._id, req.body, function (err, workout) {
		if (err)
			return next(err);
			
		res.json(workout);
	});
});
	
router.put("/:id", utilities.isAuthenticated, function (req, res, next) {
	workoutQueries.update(req.user._id, req.params.id, req.body, function (err, workout) {
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