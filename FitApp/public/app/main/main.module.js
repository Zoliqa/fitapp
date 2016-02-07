
define([
	"angular", 
	"angularRoute", 
	"app/main/main.routes",
	"app/main/home.controller",
	"app/main/newsession.controller",
	"app/main/editsession.controller",
	"app/main/addexercise.controller",
	"app/main/musclegroups.service",
	"app/main/session.service",
	"app/main/exercise.service"], 
	function (angular, 
			  angularRoute, 
			  mainRoutes, 
			  HomeController, 
			  NewSessionController,
			  EditSessionController,
			  AddExerciseController,
			  MuscleGroupsService,
			  SessionService,
			  ExerciseService) {
	
		angular.module("main", ["ngRoute"])
			.controller("HomeController", HomeController)
			.controller("NewSessionController", NewSessionController)
			.controller("EditSessionController", EditSessionController)
			.controller("AddExerciseController", AddExerciseController)
			.factory("SessionService", SessionService)
			.factory("ExerciseService", ExerciseService)
			.factory("MuscleGroupsService", MuscleGroupsService)
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