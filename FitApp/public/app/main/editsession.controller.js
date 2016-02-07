
define(["underscore"], 
	function (_) { 

		function EditSessionController($location, $uibModal, MuscleGroupsService, SessionService, ExerciseService) {
			var vm = this;
		
			this.session = SessionService.get({ active: true });
			this.getMuscleGroupById = MuscleGroupsService.getById;
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
					return memo + ", " + MuscleGroupsService.getById(groupId).name;
				}, "").slice(1);
			}

			function addExercise() {
				var modal = $uibModal.open({
					templateUrl: "start-exercise",
					size: "md",
					controller: "AddExerciseController",
					controllerAs: "vm",
					resolve: {
						session: function () {
							return vm.session;
						}	
					}
				});
			
				modal.result.then(function (newExercise) {
					console.log(newExercise);
				}, function () {
				});
			}
		}

		return EditSessionController;
	}
);



