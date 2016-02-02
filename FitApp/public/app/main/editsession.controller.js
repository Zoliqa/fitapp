
define(["underscore"], 
	function (_) { 

		function EditSessionController(sessionResourceService) {
			
			var vm = this;
		
			this.newSession = {
				startDate: new Date(),
				selectedGroups: [],
				notes: "",
				location: ""
			};
			this.dateOptions = { formatYear: 'yy', startingDay: 1 };
			this.datePickerIsOpened = false;
			this.groups = [
				{ id: 1, name: "Chest" },
				{ id: 2, name: "Lats" },
				{ id: 3, name: "Biceps" },
				{ id: 4, name: "Triceps" },
				{ id: 5, name: "Legs" },
				{ id: 6, name: "Shoulders" },
				{ id: 7, name: "Traps" },
				{ id: 8, name: "Abs" },
				{ id: 9, name: "Cardio" },
				{ id: 10, name: "Other" }
			];
			this.resetDate = resetDate;
			this.addSession = addSession;
			this.cancel = cancel;

			function resetDate () {
				vm.newSession.startDate = new Date();
			}
		
			function saveSession() {
				_.each(vm.groups, function (group) {
					if (group.selected)
						vm.newSession.selectedGroups.push(group.id);
				})
			
				console.log(vm.newSession.selectedGroups);

				sessionResourceService.save(vm.newSession);
			};
		
			function cancelEditSession() {
				
			}
		}

		return EditSessionController;
	}
);



