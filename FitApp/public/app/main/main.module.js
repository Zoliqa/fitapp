
define([
	"angular", 
	"angularRoute", 
	"public/app/main/home.controller",
	"public/app/users/users.module"], 
	function (angular, angularRoute, HomeController, usersModule) { 

		angular.module("main", ["ngRoute", "users"])
			.controller("HomeController", HomeController)
			.config(function ($routeProvider) { 

				$routeProvider
					.when("/home", {
						templateUrl: "/public/app/main/home.html",
						controller: "HomeController",
						controllerAs: "vm"
					})
					.otherwise({
						redirectTo: "/user/login"
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