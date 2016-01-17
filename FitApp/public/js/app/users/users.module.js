
define([
	"angular", 
	"angularRoute", 
	"angularResource",
	"bcrypt", 
	"public/js/app/users/login.controller",
	"public/js/app/users/register.controller",
	"public/js/app/users/user.resource.service",
	"public/js/app/users/user.data.service"], 
	function (angular, angularRoute, angularResource, bcrypt, LoginController, RegisterController, userResourceService, userDataService) { 

		angular.module("users", ["ngRoute", "ngResource"])
			.controller("LoginController", LoginController)
			.controller("RegisterController", RegisterController)
			.factory("userResourceService", userResourceService)
			.factory("userDataService", userDataService)
			.config(function ($provide, $routeProvider) { 
				$provide.value("bcrypt", bcrypt);

				$routeProvider
					.when("/login", {
						templateUrl: "/public/js/app/users/login.html",
						controller: "LoginController",
						controllerAs: "vm"
					})
					.when("/register", {
						templateUrl: "/public/js/app/users/register.html",
						controller: "RegisterController",
						controllerAs: "vm"
					})
					.when("/profile", {
						templateUrl: "/public/js/app/users/profile.html",
						controller: "faProfileCtrl"
					})
					.otherwise({
						redirectTo: "/login"
					});
			});
	}
);