
define([
	"angular", 
	"angularRoute", 
	"angularResource",
	"bcrypt", 
	"app/users/login.controller",
	"app/users/register.controller",
	"app/users/profile.controller",
	"app/users/user.resource.service",
	"app/users/user.data.service"], 
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
			.config(myconfig)
			.run(function (userResourceService, userDataService) { 

				//userResourceService.getProfile(function (user) { 
				//	userDataService.loggedInUser(user.id && user);
				//});
			});
	
		myconfig.$inject = ["$provide", "$routeProvider"];

		function myconfig($provide, $routeProvider) {
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
		}
	}
);