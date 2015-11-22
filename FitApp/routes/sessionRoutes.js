
var express        = require("express"),
	sessionQueries = require("../data/queries/sessionQueries"),
	utilities      = require("../passport/utilities"),
	router	       = express.Router();

function init() {
	router.post("/:dashboardId", utilities.isAuthenticated, function (req, res, next) {
		sessionQueries.create(req.params.dashboardId, req.body, function (err, dashboard) {
			if (err)
				return next(err);
			
			res.json(dashboard);
		});
	});

	router.put("/:dashboardId/:sessionId", utilities.isAuthenticated, function (req, res, next) {
		sessionQueries.update(req.params.dashboardId, req.params.sessionId, req.session, function (err, dashboard) { 
			if (err)
				return next(err);
			
			res.json(dashboard);
		});
	});

	router.delete("/:dashboardId/:sessionId", utilities.isAuthenticated, function (req, res, next) { 
		sessionQueries.remove(req.params.id, req.params.sessionId, function (err, dashboard) { 
			if (err)
				return next(err);

			return res.json(dashboard);
		});
	});

	return router;
}

module.exports = init;