
var User	 = require("./user.model"),
	Exercise = require("./exercise.model");

//function find(userId, next) {
//	User.findOne(where, { sessions: 0 }, function (err, user) {
//		if (err)
//			return next(err);
			
//		return next(null, user);
//	});
//}

function create(userId, exercise, next) {
	var newExercise = new Exercise.Exercise(exercise);
	
	User.findOneAndUpdate({
		_id: userId,
		"sessions.endDate": null
	}, {
		$push: {
			"sessions.$.exercises": newExercise
		}
	}, {
		new: true
	}, function (err) {
		if (err)
			return next(err);
		
		return next(null, newExercise);
	});
}

function remove(userId, sessionId, exerciseId, next) {
	//User.findOneAndUpdate({
	//	_id: userId
	//}, {
	//	$pull: {
	//		sessions: {
	//			_id: sessionId
	//		}
	//	}
	//}, function (err) {
	//	if (err)
	//		return next(err);
		
	//	return next(null, null);
	//});
}

module.exports = {
	create: create,
	remove: remove
};