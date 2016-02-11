
define(["underscore"], 
	function (_) { 

		function NewWorkoutController($location, workoutService, muscleGroupsService, cacheService) {
			var vm = this;
		
			this.errorMessage = "";
			this.workout = {
				startDate: new Date(),
				selectedGroups: [],
				notes: "",
				location: ""
			};
			this.dateOptions = { formatYear: 'yy', startingDay: 1 };
			this.datePickerIsOpened = false;
			this.groups = muscleGroupsService.getAll();
			this.resetDate = resetDate;
			this.addSession = addSession;
			this.cancel = cancel;

			function resetDate () {
				vm.workout.startDate = new Date();
			}
		
			function addSession() {
				_.each(vm.groups, function (group) {
					if (group.selected)
						vm.workout.selectedGroups.push(group.id);
				})

				workoutService.save(vm.workout, function (session) { 
					if (session._id) {
						$location.path("/home");
					
						cacheService.invalidate("/user");
					}
				}, function () { 
					vm.errorMessage = "Error occurred saving the session.";	
				});
			};
		
			function cancel() {
				
			}
		}

		return NewWorkoutController;
	}
);



