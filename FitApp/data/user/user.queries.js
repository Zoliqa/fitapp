
var User = require('./user.model');

//function find(where, next) {
//	if (where)
//		User.findOne(where, { sessions: 0 }, function (err, user) {
//			if (err)
//				return next(err);
			
//			return next(null, user);
//		});
//	else
//		User.find({}, { sessions: 0 }, function (err, users) {
//			if (err)
//				return next(err);
			
//			return next(null, users);
//		});
//}

function findByUsername(username, next) {
	User.findOne({
		username: username
	}, function (err, user) {
		if (err)
			return next(err);
		
		if (user && user.workouts)
			// TODO: retrieve only the first active workout
			user.workouts = user.workouts.filter(function (workout) {
				return !workout.endDate;
			});

		return next(null, user);
	});
}

function findById(id, next) {
	User.findOne({
		_id: id
	}, function (err, user) {
		if (err)
			return next(err);
		
		if (user && user.workouts)
			user.workouts = user.workouts.filter(function (workout) {
				return !workout.endDate;
			});

		return next(null, user);
	});
}

function create(user, next) {
	var newUser = new User(user);
	
	newUser.save(function (err) {
		if (err)
			return next(err);
		
		next(null, newUser);
	});
}

function update(id, user, next) {
	User.findOneAndUpdate({ _id: id }, user, {
		new: true
	}, function (err, updatedUser) {
		if (err)
			return next(err);
		
		return next(null, updatedUser);
	});
}

function remove(id, next) {
	User.findOneAndRemove({ _id: id }, function (err, user) {
		if (err)
			return next(err);
		
		return next(null, user);
	});
}

module.exports = {
	findByUsername: findByUsername,
	findById: findById,
	create: create,
	update: update,
	remove: remove
};