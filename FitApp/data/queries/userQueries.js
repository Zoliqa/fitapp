
var User = require('../models/User');

function find(where, next) {
	if (where)
		User.findOne(where, function (err, user) {
			if (err)
				return next(err);
			
			return next(null, user);
		});
	else
		User.find(function (err, users) {
			if (err)
				return next(err);
			
			return next(null, users);
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
	find: find,
	create: create,
	update: update,
	remove: remove
};