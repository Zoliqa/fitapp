
define([
	"angular", 
	"angularRoute", 
	"public/js/app/main/home.controller",
	"public/js/app/users/users.module"], 
	function (angular, angularRoute, HomeController, usersModule) { 

		angular.module("main", ["ngRoute", "users"])
			.controller("HomeController", HomeController)
			.config(function ($routeProvider) { 

				$routeProvider
					.when("/home", {
						templateUrl: "/public/js/app/main/home.html",
						controller: "HomeController"
					})
					.otherwise({
						redirectTo: "/login"
					});
			})
			.run(function ($rootScope, $location, userDataService) {
		
				$rootScope.$watch(function () { 
					return userDataService.loggedInUser();
				}, function (user) { 
					if (user) 
						$location.path("/home");
				});
			});
	}
);