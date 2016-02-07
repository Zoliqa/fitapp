
define(["underscore"], 
	function (_) { 

		function NewSessionController($location, SessionService, MuscleGroupsService) {
			var vm = this;
		
			this.errorMessage = "";
			this.newSession = {
				startDate: new Date(),
				selectedGroups: [],
				notes: "",
				location: ""
			};
			this.dateOptions = { formatYear: 'yy', startingDay: 1 };
			this.datePickerIsOpened = false;
			this.groups = MuscleGroupsService.getAll();
			this.resetDate = resetDate;
			this.addSession = addSession;
			this.cancel = cancel;

			function resetDate () {
				vm.newSession.startDate = new Date();
			}
		
			function addSession() {
				_.each(vm.groups, function (group) {
					if (group.selected)
						vm.newSession.selectedGroups.push(group.id);
				})

				SessionService.save(vm.newSession, function (session) { 
					if (session._id)
						$location.path("/home");
				}, function () { 
					vm.errorMessage = "Error occurred saving the session.";	
				});
			};
		
			function cancel() {
				
			}
		}

		return NewSessionController;
	}
);



