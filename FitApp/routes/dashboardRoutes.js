
var express			 = require("express"),
	dashboardQueries = require("../data/queries/dashboardQueries"),
	router			 = express.Router();

function init() {
	router.get("/", function (req, res, next) {
		if (!req.params.id)
			dashboardQueries.findForUser(req.user._id, function (err, dashboards) {
				if (err)
					return next(err);
				
				return res.json({ success: true, dashboards: dashboards });
			});
		else
			dashboardQueries.findById(req.params.id, function (err, dashboard) {
				if (err)
					return next(err);
				
				res.json({ success: true, dashboard: dashboard });
			});
	});

	router.post("/", function (req, res, next) {
		dashboardQueries.create(req.user._id, req.body.title, req.body.description, function (err, dashboard) { 
			if (err)
				return next(err);
			
			res.json({ success: true, dashboard: dashboard });
		});
	});
	
	router.put("/:id", function (req, res, next) {
		
	});

	router.delete("/:id", function (req, res, next) {
		dashboardQueries.remove(req.params.id, function (err) {
			if (err)
				return next(err);
			
			res.json({ success: true });
		});
	});

	return router;
}

function init2(passport) {
	router.get("/", function (req, res, next) {
		if (!req.params.id)
			dashboardModel.find(function (err, dashboards) {
				if (err)
					return next(err);

				res.json({ success: true, dashboards: dashboards });
			});
		else
			dashboardModel.findOne({ _id: id }, function (err, dashboard) {
				if (err)
					return next(err);

				res.json({ success: true, dashboard: dashboard });
			});
	});
	
	router.post("/", function (req, res, next) {
		var dashboard = new dashboardModel();

		dashboard.userId = req.body.username;
		dashboard.title = req.body.title;
		dashboard.created = new Date();

		dashboard.save(function (err) {
			if (err)
				return next(err);

			res.json({ success: true, dashboard: dashboard });
		});
	});
	
	router.put("/:id", function (req, res, next) {
		
	});

	router.delete("/:id", function (req, res, next) {
		dashboardModel.remove({ _id: req.params.id }, function (err) { 
			if (err)
				return next(err);
			
			res.json({ success: true });
		});
	});

	return router;
}

module.exports = init;