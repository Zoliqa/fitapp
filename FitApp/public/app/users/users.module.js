
define([
	"angular", 
	"angularRoute", 
	"angularResource",
	"app/users/login.controller",
	"app/users/register.controller",
	"app/users/profile.controller",
	"app/users/user.service",
	"app/users/users.config",
	"app/users/users.run"], 
	function (angular, 
			  angularRoute, 
			  angularResource, 
			  LoginController, 
			  RegisterController,
			  ProfileController, 
			  userService,
			  usersConfig,
			  usersRun) { 

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