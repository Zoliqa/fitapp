
var dashboardModel = require('../models/dashboard');

function find(id, next) { 
	if (id)
		dashboardModel.findOne({ _id: id }, function (err, dashboard) {
			if (err)
				return next(err);
			
			return next(null, dashboard);
		});
	else
		dashboardModel.find(function (err, dashboards) {
			if (err)
				return next(err);
			
			return next(null, dashboards);
		});
}

function create(username, title, next) { 
	var dashboard = new dashboardModel();
	
	dashboard.userId = username;
	dashboard.title = title;
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
	dashboardModel.remove({ _id: id }, function (err) {
		if (err)
			return next(err);
		
		return next(null);
	});
}

module.exports = {
	find: find,
	create: create,
	update: update,
	remove: remove
};