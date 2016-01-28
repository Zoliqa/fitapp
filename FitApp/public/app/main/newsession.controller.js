
define(["underscore"], 
	function (_) { 

		function NewSessionController(sessionResourceService) {
			
			var vm = this;
		
			this.newSession = {
				date: new Date(),
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
				vm.newSession.date = new Date();
			}
		
			function addSession() {
				_.each(vm.groups, function (group) {
					if (group.selected)
						vm.newSession.selectedGroups.push(group.id);
				})
			
				console.log(vm.newSession.selectedGroups);

				sessionResourceService.save(vm.newSession);

				//faSession.save({
				//	dashboardId: $scope.dashboard._id
				//}, $scope.newSession, function (session) {
				//	$uibModalInstance.close(session);
				//});
			};
		
			function cancel() {
				
			}
		}

		return NewSessionController;
	}
);



