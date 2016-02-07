
var User	  = require("./user.model"),
	Session   = require("./session.model"),
	mongoose  = require("mongoose");

function create(userId, session, next) {
	var newSession = new Session.Session(session);
	
	User.findOneAndUpdate({
		_id: userId
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

function findActiveSession(userId, next) {
	User.findOne({
		_id: userId,
		"sessions.endDate": null,
		sessions: { $exists: true }
	},
	"sessions.$",
	function (err, user) {
		if (err)
			return next(err);
		
		return next(null, user && user.sessions[0]);
	});
}

function update(userId, session, next) {
	//var newSession = new Session(session);
	
	//if (!sessionId)
	//	newSession.id = mongoose.Types.ObjectId();

	User.findOneAndUpdate({
		_id: userId, 
		"sessions.id": session._id
	}, {
		$set: {
			"session.$": session
		}
	}, {
		new: true,
		upsert: true,
	}, function (err, user) {
		if (err)
			return next(err);
		
		return next(null, session);
	});
}

function remove(userId, sessionId, next) {
	User.findOneAndUpdate({
		_id: userId
	}, {
		$pull: {
			sessions: {
				_id: sessionId
			}
		}
	}, function (err) {
		if (err)
			return next(err);
		
		return next(null, null);
	});
}

module.exports = {
	create: create,
	findActiveSession: findActiveSession,
	update: update,
	remove: remove
};