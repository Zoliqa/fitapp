
var User	  = require("./user.model"),
	Session   = require("./session.model"),
	mongoose  = require("mongoose");

function create(userId, session, next) {
	var newSession = new Session.Session(session);
	
	newSession.id = mongoose.Types.ObjectId();

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

function update(userId, sessionId, session, next) {
	var newSession = new Session(session);
	
	//if (!sessionId)
	//	newSession.id = mongoose.Types.ObjectId();

	User.findOneAndUpdate({
		_id: userId, 
		"sessions.id": sessionId
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
				id: sessionId
			}
		}
	}, function (err, rd) {
		if (err)
			return next(err);
		
		return next(null, null);
	});
}

module.exports = {
	create: create,
	update: update,
	remove: remove
};