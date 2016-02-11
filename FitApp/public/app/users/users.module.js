
define([
	"angular", 
	"angularRoute", 
	"angularResource",
	"bcrypt", 
	"app/users/login.controller",
	"app/users/register.controller",
	"app/users/profile.controller",
	"app/users/user.service",
	"app/users/cache.service"], 
	function (angular, 
			  angularRoute, 
			  angularResource, 
			  bcrypt, 
			  LoginController, 
			  RegisterController,
			  ProfileController, 
			  userService,
			  cacheService) { 

	angular.module("users", ["ngRoute", "ngResource"])
			.controller("LoginController", LoginController)
			.controller("RegisterController", RegisterController)
			.controller("ProfileController", ProfileController)
			.factory("userService", userService)
			.factory('cacheService', cacheService)
			.config(myconfig)
			.run(function ($rootScope, userService) { 

				userService.get(function (user) { 
					if (user._id)
						$rootScope.$emit("USER_LOGGED_IN");
				});
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