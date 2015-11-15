
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

function create(username, password, firstname, lastname, email, gender, birthdate, next) {
	var user = new User();
	
	user.username = username;
	user.password = password;
	user.firstname = firstname;
	user.lastname = lastname;
	user.emailAddress = email;
	user.gender = gender;
	user.birthdate = new Date(birthdate)
	
	user.save(function (err) {
		if (err)
			return next(err);
		
		next(null, user);
	});
}

function update(next) { 

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