
var Dashboard = require("../models/Dashboard"),
	Session   = require("../models/Session"),
	mongoose  = require("mongoose");

function create(dashboardId, session, next) {
	var newSession = new Session.Session(session);
	
	Dashboard.findOneAndUpdate({
		_id: dashboardId
	}, {
		$push: {
			sessions: newSession
		}
	}, {
		new: true
	}, function (err) {
		if (err)
			return next(err);
		
		return next(null, newSession);
	});
}

function update(dashboardId, sessionId, session, next) {
	var newSession = new Session(session);
	
	if (!sessionId)
		newSssion.id = mongoose.Types.ObjectId();

	Dashboard.findOneAndUpdate({
		_id: dashboardId, 
		"sessions.id": sessionId
	}, {
		$set: {
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
	create: create,
	update: update,
	remove: remove
};