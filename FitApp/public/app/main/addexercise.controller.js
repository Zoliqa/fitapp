
define(["underscore"], 
	function (_) { 

		function AddExerciseController($uibModalInstance, MuscleGroupsService, ExerciseService, session) {
			var vm = this;
		
			this.session = session;
			this.getMuscleGroupById = MuscleGroupsService.getById;
			this.newExercise = {
				groupId: session.selectedGroups[0],
				name: "",
				startTime: "",
				notes: ""
			};
			this.startExercise = startExercise;
			this.cancelStartExercise = cancelStartExercise;
		
			function startExercise() {
				ExerciseService.save(vm.newExercise, function (exercise) { 
					if (exercise._id) 
						$uibModalInstance.close(exercise);
				}, function () { 
					vm.errorMessage = "Error occurred saving the exercise.";
				})
			}

			function cancelStartExercise() {
				$uibModalInstance.close(null);
			}
		}

		return AddExerciseController;
	}
);



