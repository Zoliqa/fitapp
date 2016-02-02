
define([
	"angular", 
	"angularRoute", 
	"app/main/main.routes",
	"app/main/home.controller",
	"app/main/newsession.controller",
	"app/main/editsession.controller",
	"app/main/session.resource.service"], 
	function (angular, 
			  angularRoute, 
			  mainRoutes, 
			  HomeController, 
			  NewSessionController,
			  EditSessionController,
			  sessionResourceService) {
	
		angular.module("main", ["ngRoute"])
			.controller("HomeController", HomeController)
			.controller("NewSessionController", NewSessionController)
			.controller("EditSessionController", EditSessionController)
			.factory("sessionResourceService", sessionResourceService)
			.config(function ($routeProvider) {
		
				mainRoutes($routeProvider);
			})
			.run(function ($rootScope, $location, userResourceService, userDataService) {
		
				$rootScope.$on("USER_LOGGED_IN", function (event, data) { 
					$location.path("/home");
				});

				$rootScope.$on("$routeChangeStart", function (event, next) {
			
					if (!userDataService.loggedInUser())
						userResourceService.getProfile(function (user) {
							if (!user._id)
								$location.path("/user/login");
							else
								userDataService.loggedInUser(user);
						});
				});
			});
	}
);