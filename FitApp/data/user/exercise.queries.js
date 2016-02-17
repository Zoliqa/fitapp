
var User	 = require("./user.model"),
	Exercise = require("./exercise.model"),
	_		 = require("../../public/lib/underscore/underscore");

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
		"workouts.ended": null
	}, {
		$push: {
			"workouts.$.exercises": newExercise
		}
	}, {
		new: true
	}, function (err) {
		if (err)
			return next(err);
		
		return next(null, newExercise);
	});
}

function update(userId, exerciseId, exercise, next) {
	User.findOne({
		_id: userId,
		"workouts.ended": null
	}, {
		"workouts.$": 1
	}).lean().exec(function (err, user) { 
		if (err)
			next(err);
		
		var storedExercises = user.workouts[0].exercises;
		var index = _.findIndex(storedExercises, function (storedExercise) { 
			return storedExercise._id.toString() === exerciseId;
		});
		
		var setObject = {};
		setObject["workouts.$.exercises." + index] = exercise;

		User.findOneAndUpdate({
			_id: userId,
			"workouts.ended": null
		}, {
			$set: setObject
		}, {
			new: true
		}, function (err, user) { 
			if (err)
				return next(err);

			return next(null, exercise);
		});
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
	update: update,
	remove: remove
};