
var User	  = require("./user.model"),
	Workout   = require("./workout.model"),
	mongoose  = require("mongoose");

function create(userId, workout, next) {
	var newWorkout = new Workout.Workout(workout);
	
	newWorkout.lastModified = new Date(); 

	User.findOneAndUpdate({
		_id: userId
	}, {
		$push: {
			workouts: newWorkout
		}
	}, {
		new: true
	}, function (err) {
		if (err)
			return next(err);
		
		return next(null, newWorkout);
	});
}

function find(userId, workoutId, next) {
	if (!/^[0-9a-fA-F]{24}$/.exec(workoutId))
		return next(null);

	User.findOne({
		_id: userId,
		"workouts._id": workoutId 
	}, "workouts.$", function (err, user) {
		if (err)
			return next(err);
			
		return next(null, user && user.workouts[0]);
	});
}

function update(userId, workoutId, workout, next) {
	workout.lastModified = new Date();

	User.findOneAndUpdate({
		_id: userId, 
		"workouts._id": workoutId
	}, {
		$set: {
			"workouts.$": workout
		}
	}, {
		new: true
	}, function (err) {
		if (err)
			return next(err);
		
		return next(null, workout);
	});
}

function remove(userId, workoutId, next) {
	User.findOneAndUpdate({
		_id: userId
	}, {
		$pull: {
			workouts: {
				_id: workoutId
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
	find: find,
	update: update,
	remove: remove
};