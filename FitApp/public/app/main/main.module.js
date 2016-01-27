
define([
	"angular", 
	"angularRoute", 
	"app/main/main.routes",
	"app/main/home.controller",
	"app/main/newsession.controller",
	"app/main/session.resource.service"], 
	function (angular, 
			  angularRoute, 
			  mainRoutes, 
			  HomeController, 
			  NewSessionController,
			  sessionResourceService) {
	
		angular.module("main", ["ngRoute"])
			.controller("HomeController", HomeController)
			.controller("NewSessionController", NewSessionController)
			.factory("sessionResourceService", sessionResourceService)
			.config(function ($routeProvider) {
		
				mainRoutes($routeProvider);
			})
			.run(function ($rootScope, $location) {
		
				$rootScope.$on("USER_LOGGED_IN", function (event, data) { 
					$location.path("/home");
				});
			});
	}
);