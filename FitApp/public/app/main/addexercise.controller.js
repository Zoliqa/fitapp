
define(["underscore"], 
	function (_) { 

		function AddExerciseController($uibModalInstance, muscleGroupsService, exerciseService, workout) {
			var vm = this;
		
			this.workout = workout;
			this.getMuscleGroupById = muscleGroupsService.getById;
			this.exercise = {
				groupId: workout.selectedGroups[0],
				name: "",
				started: "",
				notes: ""
			};
			this.startExercise = startExercise;
			this.cancelStartExercise = cancelStartExercise;
		
			function startExercise() {
				exerciseService.save(vm.exercise, function (exercise) { 
					if (exercise._id) 
						$uibModalInstance.close(exercise);
				}, function () { 
					vm.errorMessage = "Error occurred saving the exercise.";
				})
			}

			function cancelStartExercise() {
				$uibModalInstance.dismiss();
			}
		}

		return AddExerciseController;
	}
);



