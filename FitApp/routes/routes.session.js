
var express		   = require("express"),
	sessionQueries = require("../data/user/session.queries"),
	utilities	   = require("../passport/passport.utilities"),
	router		   = express.Router(),
	_			   = require("../public/lib/underscore/underscore");  

function init() {
	router.get("/activesession", utilities.isAuthenticated, function (req, res, next) {
		sessionQueries.findActiveSession(req.user._id, function (err, session) {
			if (err)
				return next(err);
			
			return res.json(session);
		});
	});

	router.get("/(:id)?", utilities.isAuthenticated, function (req, res, next) {
		if (!req.params.id)
			return res.json(req.user.sessions);
		else {
			var session = _.find(req.user.sessions, function (session) {
				return session.id == req.params.id; 
			});

			return res.json(session);
		}
	});

	router.post("/", utilities.isAuthenticated, function (req, res, next) {
		sessionQueries.create(req.user._id, req.body, function (err, session) {
			if (err)
				return next(err);
			
			res.json(session);
		});
	});
	
	router.put("/:id", utilities.isAuthenticated, function (req, res, next) {
		sessionQueries.update(req.params.id, req.body, function (err, session) {
			if (err)
				return next(err);
			
			res.json(session);
		});
	});
	
	router.delete("/:id", utilities.isAuthenticated, function (req, res, next) {
		sessionQueries.remove(req.params.id, function (err, session) {
			if (err)
				return next(err);
			
			res.json(session);
		});
	});
	
	return router;
}

module.exports = init;