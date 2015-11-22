
var express			 = require("express"),
	dashboardQueries = require("../data/queries/dashboardQueries"),
	utilities		 = require("../passport/utilities"),
	router			 = express.Router();

function init() {
	router.get("/(:id)?", utilities.isAuthenticated, function (req, res, next) {
		if (!req.params.id)
			dashboardQueries.findForUser(req.user._id, function (err, dashboards) {
				if (err)
					return next(err);
				
				res.json(dashboards);
			});
		else
			dashboardQueries.findById(req.params.id, function (err, dashboard) {
				if (err)
					return next(err);
				
				res.json({ dashboard: dashboard });
			});
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