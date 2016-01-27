
var express = require("express"),
	user
	sessionQueries = require("../data/user/sessionQueries"),
	utilities	     = require("../passport/passport.utilities"),
	router			 = express.Router();

function init() {
	router.get("/(:id)?", utilities.isAuthenticated, function (req, res, next) {
		if (!req.params.id)
			return res.json(req.user.sessions);
		else {
			var session = req.user.sessions.find(session => session.id == req.params.id);

			return res.json(session);
		}
	});
	
	router.post("/", utilities.isAuthenticated, function (req, res, next) {
		dashboardQueries.create(req.body, function (err, dashboard) {
			if (err)
				return next(err);
			
			res.json(dashboard);
		});
	});
	
	router.put("/:id", utilities.isAuthenticated, function (req, res, next) {
		dashboardQueries.update(req.params.id, req.body, function (err, dashboard) {
			if (err)
				return next(err);
			
			res.json(dashboard);
		});
	});
	
	router.delete("/:id", utilities.isAuthenticated, function (req, res, next) {
		dashboardQueries.remove(req.params.id, function (err, dashboard) {
			if (err)
				return next(err);
			
			res.json(dashboard);
		});
	});
	
	return router;
}

module.exports = init;