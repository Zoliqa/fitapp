
define(["underscore"], function (_) {
	function faSessionsCtrl($scope, $http, $location, $uibModal, faCommonSvc, faSession) {
		$scope.newSession = {
			date: new Date(),
			group: "",
			notes: "",
			location: "",
			selectedGroups: []
		};
		$scope.addSessionModal = null;
		$scope.date = {
			options: {
				formatYear: 'yy',
				startingDay: 1
			},
			opened: false
		};
		$scope.groups = [
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

		$scope.activeDashboard = function () {
			return faCommonSvc.activeDashboard();
		};

		$scope.initAddSession = function () { 
			$scope.addSessionModal = $uibModal.open({
				animation: true,
				templateUrl: 'create-session.html',
				size: "lg",
				scope: $scope
			});
		};

		$scope.updateStartTime = function () { 
			$scope.newSession.startTime = new Date();
		};

		$scope.addSession = function () {
			_.each($scope.groups, function (group) { 
				if (group.selected)
					$scope.newSession.selectedGroups.push(group.id);
			})

			faSession.save({
				dashboardId: faCommonSvc.activeDashboard()._id
			}, $scope.newSession, function () {
				console.log("Session added");

				$scope.addSessionModal.dismiss();
			});
		};

		$scope.cancelAddSession = function () {
			$scope.addSessionModal.dismiss();
		};
	};

	return faSessionsCtrl;
});

