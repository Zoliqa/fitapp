
define(["underscore"], function (_) {
	function faSessionsCtrl($scope, $http, $location, $uibModal, faCommonSvc, faSession) {
		$scope.newSession = {
			date: new Date(),
			group: "",
			notes: "",
			location: "",
			selectedGroups: []
		};
		$scope.createSessionModal = null;
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

		$scope.initCreate = function () { 
			$scope.createSessionModal = $uibModal.open({
				animation: true,
				templateUrl: 'create-session.html',
				size: "lg",
				scope: $scope
			});
		};

		$scope.updateStartTime = function () { 
			$scope.newSession.startTime = new Date();
		};

		$scope.startSession = function () {
			_.each($scope.groups, function (group) { 
				if (group.selected)
					$scope.newSession.selectedGroups.push(group.id);
			})

			faSession.save($scope.newSession, function () {
				console.log("Session created");

				$scope.createSessionModal.dismiss();
			});
		};

		$scope.cancelSession = function () {
			$scope.createSessionModal.dismiss();
		};
	};

	return faSessionsCtrl;
});

