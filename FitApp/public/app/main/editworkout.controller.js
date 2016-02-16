
define(["underscore", "angular"], 
	function (_, angular) { 

		function EditWorkoutController($location, $uibModal, muscleGroupsService, workoutService, exerciseService, userService) {
			var vm = this;
		
			this.workout = null;
			this.getMuscleGroupById = muscleGroupsService.getById;
			this.removeWorkout = removeWorkout;
			this.formatGroups = formatGroups;
			this.addExercise = addExercise;
			this.nrRepetitions = _.range(1, 30);
			this.newSet = {};
			this.addNewSet = addNewSet;
			this.selectExercise = selectExercise;
		
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
				if (vm.newSet.nrRepetition && vm.newSet.weight) {
					if (!exercise.sets)
						exercise.sets = [];

					exercise.sets.push(angular.copy(vm.newSet));

					exerciseService.update({ id: exercise._id }, exercise);
				}
			}

			function selectExercise() {
				vm.newSet.nrRepetition = null;
				vm.newSet.weight = null;
			}
		}

		return EditWorkoutController;
	}
);



