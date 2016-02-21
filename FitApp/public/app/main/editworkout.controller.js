
define(["underscore", "angular"], 
	function (_, angular) { 

		function EditWorkoutController($location, $uibModal, muscleGroupsService, workoutService, exerciseService, userService) {
			var vm = this;
		
			this.workout = null;
			this.getMuscleGroupById = muscleGroupsService.getById;
			this.removeWorkout = removeWorkout;
			this.formatGroups = formatGroups;
			this.addExercise = addExercise;
			this.newSet = {};
			this.addNewSet = addNewSet;
			this.selectExercise = selectExercise;
			this.removeExercise = removeExercise;
		
			userService.get(function (user) {
				vm.workout = user.workouts[0];
			});
		
			function removeWorkout() {
				workoutService.delete({ id: vm.session._id }, function () { 
					$location.path("/home");
				});
			}
		
			function formatGroups() {
				return _.reduce(vm.workout.selectedGroups, function (memo, groupId) { 
					return memo + ", " + muscleGroupsService.getById(groupId).name;
				}, "").slice(1);
			}

			function addExercise() {
				var modal = $uibModal.open({
					templateUrl: "/public/app/main/add-exercise.html",
					size: "md",
					controller: "AddExerciseController",
					controllerAs: "vm",
					resolve: {
						workout: function () {
							return vm.workout;
						}	
					}
				});
			
				modal.result.then(function (exercise) {
					vm.workout.exercises.push(exercise);
				}, function () {
				});
			}

			function addNewSet(exercise) {
				if (vm.newSet.reps > 0 && vm.newSet.weight > 0) {
					if (!exercise.sets)
						exercise.sets = [];

					exercise.sets.push(angular.copy(vm.newSet));

					exerciseService.update({ id: exercise._id }, exercise);
				}
			}

			function selectExercise() {
				vm.newSet.reps = 0;
				vm.newSet.weight = null;
			}

			function removeExercise(exercise) {
				exerciseService.remove({ id: exercise._id }, function () { 
					vm.workout.exercises = _.filter(vm.workout.exercises, function (exercise2) { 
						return exercise2._id !== exercise._id;
					});
				});
			}
		}

		return EditWorkoutController;
	}
);



