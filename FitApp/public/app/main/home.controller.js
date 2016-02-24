﻿
define([], 
	function () { 

		function HomeController($scope, userService) {
			var vm = this;
		
			this.activeWorkout = null;

			userService.current.get().$promise.then(function (user) { 
				vm.message = "Welcome home " + user.username;
				vm.activeWorkout = user.workouts && user.workouts[0];
			});
		}

		return HomeController; 
	}
);