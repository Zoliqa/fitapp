﻿
define([
	"angular", 
	"angularRoute", 
	"underscore",
	"app/main/home.controller",
	"app/main/newworkout.controller",
	"app/main/editworkout.controller",
	"app/main/addexercise.controller",
	"app/main/musclegroups.service",
	"app/main/workout.service",
	"app/main/workout.online.service",
	"app/main/workout.offline.service",
	"app/main/exercise.service",
	"app/main/main.config",
	"app/main/main.run"], 
	function (angular, 
			  angularRoute, 
			  _,
			  HomeController, 
			  NewWorkoutController,
			  EditWorkoutController,
			  AddExerciseController,
			  muscleGroupsService,
			  workoutService,
			  workoutOnlineService,
			  workoutOfflineService,
			  exerciseService,
			  mainConfig,
			  mainRun) {
	
		angular.module("main", ["ngRoute"])
			.controller("HomeController", HomeController)
			.controller("NewWorkoutController", NewWorkoutController)
			.controller("EditWorkoutController", EditWorkoutController)
			.controller("AddExerciseController", AddExerciseController)
			.factory("muscleGroupsService", muscleGroupsService)
			.factory("workoutService", workoutService)
			.factory("workoutOnlineService", workoutOnlineService)
			.factory("workoutOfflineService", workoutOfflineService)
			.factory("exerciseService", exerciseService)
			.constant("_", _)
			.config(mainConfig)
			.run(mainRun);
	}
);

