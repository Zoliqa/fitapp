
var express		    = require("express"),
	exerciseQueries = require("../data/user/exercise.queries"),
	utilities	    = require("../passport/passport.utilities"),
	router		    = express.Router();  

router.post("/", utilities.isAuthenticated, function (req, res, next) {
	exerciseQueries.create(req.user._id, req.body, function (err, exercise) {
		if (err)
			return next(err);
			
		res.json(exercise);
	});
});

router.put("/:id", utilities.isAuthenticated, function (req, res, next) {
	exerciseQueries.update(req.user._id, req.params.id, req.body, function (err, exercise) {
		if (err)
			return next(err);
		
		res.json(exercise);
	});
});

router.delete("/:id", utilities.isAuthenticated, function (req, res, next) {
	sessionQueries.remove(req.user._id, req.params.id, function (err, session) {
		if (err)
			return next(err);
			
		res.json(session);
	});
});

module.exports = router;