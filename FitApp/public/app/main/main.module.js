
define([
	"angular", 
	"angularRoute", 
	"app/main/main.routes",
	"app/main/home.controller",
	"app/main/newworkout.controller",
	"app/main/editworkout.controller",
	"app/main/addexercise.controller",
	"app/main/musclegroups.service",
	"app/main/workout.service",
	"app/main/exercise.service"], 
	function (angular, 
			  angularRoute, 
			  mainRoutes, 
			  HomeController, 
			  NewWorkoutController,
			  EditWorkoutController,
			  AddExerciseController,
			  muscleGroupsService,
			  workoutService,
			  exerciseService) {
	
		angular.module("main", ["ngRoute"])
			.controller("HomeController", HomeController)
			.controller("NewWorkoutController", NewWorkoutController)
			.controller("EditWorkoutController", EditWorkoutController)
			.controller("AddExerciseController", AddExerciseController)
			.factory("muscleGroupsService", muscleGroupsService)
			.factory("workoutService", workoutService)
			.factory("exerciseService", exerciseService)
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