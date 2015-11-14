
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

function create(userId, title, description, next) { 
	var dashboard = new Dashboard();
	
	dashboard.owner = userId;
	dashboard.title = title;
	dashboard.description = description;
	dashboard.created = new Date();
	
	dashboard.save(function (err) {
		if (err)
			return next(err);
		
		next(null, dashboard);
	});
}

function update(next) { 

}

function remove(id, next) { 
	Dashboard.remove({ _id: id }, function (err) {
		if (err)
			return next(err);
		
		return next(null);
	});
}

module.exports = {
	findById: findById,
	findForUser: findForUser,
	create: create,
	update: update,
	remove: remove
};