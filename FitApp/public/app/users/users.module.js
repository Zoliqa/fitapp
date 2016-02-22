
define([
	"angular", 
	"angularRoute", 
	"angularResource",
	"offline",
	"app/users/login.controller",
	"app/users/register.controller",
	"app/users/profile.controller",
	"app/users/user.service",
	"app/users/users.config",
	"app/users/users.run"], 
	function (angular, 
			  angularRoute, 
			  angularResource, 
			  offline,
			  LoginController, 
			  RegisterController,
			  ProfileController, 
			  userService,
			  usersConfig,
			  usersRun) {
	
	console.log(Offline.check());

	angular.module("users", ["ngRoute", "ngResource"])
		.controller("LoginController", LoginController)
		.controller("RegisterController", RegisterController)
		.controller("ProfileController", ProfileController)
		.factory("userService", userService)
		.constant("USER_LOGGED_IN", "USER_LOGGED_IN")
		.config(usersConfig)
		.run(usersRun);
	}
);