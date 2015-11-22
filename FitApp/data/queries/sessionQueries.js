
var Dashboard = require('../models/Dashboard');

function update(dashboardId, sessionId, session, next) {
	Dashboard.findOneAndUpdate({
		_id: dashboardId, 
		"sessions.id": sessionId
	}, {
		"$set": {
			"session.$": session
		}
	}, {
		new: true,
		upsert: true,
	}, function (err, dashboard) {
		if (err)
			return next(err);
		
		return next(null, dashboard);
	});
}

function remove(dashboardId, sessionId, next) {
	Dashboard.findOneAndRemove({
		_id: id,
		"sessions.id": sessionId
	}, function (err, dasgboard) {
		if (err)
			return next(err);
		
		return next(null, dashboard);
	});
}

module.exports = {
	update: update,
	remove: remove
};