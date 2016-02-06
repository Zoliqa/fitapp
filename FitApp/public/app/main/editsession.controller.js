
define(["underscore"], 
	function (_) { 

		function EditSessionController($location, $uibModal, SessionService, groups) {
			
			var vm = this;
		
			this.session = SessionService.get({ active: true });
			this.removeSession = removeSession;
			this.formatGroups = formatGroups;
			this.addExercise = addExercise;
		
			function removeSession() {
				SessionService.delete({ id: vm.session._id }, function () { 
					$location.path("/home");
				});
			}
		
			function formatGroups() {
				return _.reduce(vm.session.selectedGroups, function (memo, groupId) { 
					return memo + ", " + groups[groupId];
				}, "").slice(1);
			}

			function addExercise() {
				var modal = $uibModal.open({
					templateUrl: 'add-exercise',
					size: "md"
				});
			
				modal.result.then(function (selectedItem) {
				}, function () {
				});
			}
		}

		return EditSessionController;
	}
);



