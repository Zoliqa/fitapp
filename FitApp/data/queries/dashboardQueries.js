
var Dashboard = require('../models/Dashboard');

function findById(id, next) { 
	Dashboard.findOne({ _id: id }, function (err, dashboard) {
		if (err)
			return next(err);
			
		return next(null, dashboard);
	});	
}

function findForUser(userId, next) { 
	Dashboard.find({ owner: userId })
		.populate("owner")
		.exec(function(err, dashboards) {
			if (err)
				return next(err);
		
			return next(null, dashboards);
		});
}

function create(dashboard, next) { 
	var newDashboard = new Dashboard(dashboard);
	
	newDashboard.save(function (err) {
		if (err)
			return next(err);
		
		next(null, newDashboard);
	});
}

function update(id, dashboard, next) {
	Dashboard.findOneAndUpdate({ _id: id }, {
		title: dashboard.title,
		description: dashboard.description,
		isActive: dashboard.isActive,
		created: dashboard.created
	}, {
		new: true
	}, function (err, dashboard) { 
		if (err)
			return next(err);

		return next(null, dashboard);
	});
}

function remove(id, next) { 
	Dashboard.findOneAndRemove({ _id: id }, function (err, dashboard) {
		if (err)
			return next(err);
		
		return next(null, dashboard);
	});
}

module.exports = {
	findById: findById,
	findForUser: findForUser,
	create: create,
	update: update,
	remove: remove
};