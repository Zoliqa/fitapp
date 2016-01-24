
define([
	"angular", 
	"angularRoute", 
	"angularResource",
	"bcrypt", 
	"public/app/users/login.controller",
	"public/app/users/register.controller",
	"public/app/users/profile.controller",
	"public/app/users/user.resource.service",
	"public/app/users/user.data.service"], 
	function (angular, 
			  angularRoute, 
			  angularResource, 
			  bcrypt, 
			  LoginController, 
			  RegisterController,
			  ProfileController, 
			  userResourceService, 
			  userDataService) { 

		angular.module("users", ["ngRoute", "ngResource"])
			.controller("LoginController", LoginController)
			.controller("RegisterController", RegisterController)
			.controller("ProfileController", ProfileController)
			.factory("userResourceService", userResourceService)
			.factory("userDataService", userDataService)
			.config(function ($provide, $routeProvider) { 
				$provide.value("bcrypt", bcrypt);

				$routeProvider
					.when("/user/login", {
						templateUrl: "/public/app/users/login.html",
						controller: "LoginController",
						controllerAs: "vm"
					})
					.when("/user/register", {
						templateUrl: "/public/app/users/register.html",
						controller: "RegisterController",
						controllerAs: "vm"
					})
					.when("/user/profile", {
						templateUrl: "/public/app/users/profile.html",
						controller: "ProfileController",
						controllerAs: "vm"
					})
					.otherwise({
						redirectTo: "/user/login"
					});
			});
	}
);