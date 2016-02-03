
define([
	"angular", 
	"angularRoute", 
	"app/main/main.routes",
	"app/main/home.controller",
	"app/main/newsession.controller",
	"app/main/editsession.controller",
	"app/main/session.service"], 
	function (angular, 
			  angularRoute, 
			  mainRoutes, 
			  HomeController, 
			  NewSessionController,
			  EditSessionController,
			  SessionService) {
	
		angular.module("main", ["ngRoute"])
			.controller("HomeController", HomeController)
			.controller("NewSessionController", NewSessionController)
			.controller("EditSessionController", EditSessionController)
			.factory("SessionService", SessionService)
			.config(function ($routeProvider) {
		
				mainRoutes($routeProvider);
			})
			.run(function ($rootScope, $location) {
		
				$rootScope.$on("USER_LOGGED_IN", function (event, data) { 
					$location.path("/home");
				});

				$rootScope.$on("$routeChangeError", function (evt, current, previous, rejection) {
					if (rejection == "UNAUTHORIZED") {
						$location.path("/user/login");
					}
				});
			});
	}
);