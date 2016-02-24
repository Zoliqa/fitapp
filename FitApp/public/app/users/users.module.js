﻿
define([
	"angular", 
	"angularRoute", 
	"angularResource",
	"app/users/login.controller",
	"app/users/register.controller",
	"app/users/profile.controller",
	"app/users/user.service",
	"app/users/user.online.service",
	"app/users/user.offline.service",
	"app/users/users.config",
	"app/users/users.run",
	"underscore",
	"bcrypt",
	"offline", 
	"offlineSimulateUI"], 
	function (angular, 
			  angularRoute, 
			  angularResource, 
			  LoginController, 
			  RegisterController,
			  ProfileController, 
			  userService,
			  userOnlineService,
			  userOfflineService,
			  usersConfig,
			  usersRun,
			  _,
			  bcrypt) {
	
		angular.module("users", ["ngRoute", "ngResource"])
			.controller("LoginController", LoginController)
			.controller("RegisterController", RegisterController)
			.controller("ProfileController", ProfileController)
			.factory("userService", userService)
			.factory("userOnlineService", userOnlineService)
			.factory("userOfflineService", userOfflineService)
			.constant("USER_LOGGED_IN", "USER_LOGGED_IN")
			.constant("Offline", Offline)
			.constant("_", _)
			.constant("bcrypt", bcrypt)
			.config(usersConfig)
			.run(usersRun);
	}
);