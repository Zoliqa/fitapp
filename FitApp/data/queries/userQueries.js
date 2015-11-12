
var userModel = require('../models/user');

function find(where, next) {
	if (where)
		userModel.findOne(where, function (err, user) {
			if (err)
				return next(err);
			
			return next(null, user);
		});
	else
		userModel.find(function (err, users) {
			if (err)
				return next(err);
			
			return next(null, users);
		}); 
}

function create(username, password, firstname, lastname, email, gender, birthdate, next) {
	var user = new userModel();
	
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
	userModel.remove({ _id: id }, function (err) {
		if (err)
			return next(err);
		
		return next(null);
	});
}

module.exports = {
	find: find,
	create: create,
	update: update,
	remove: remove
};