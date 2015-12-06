
define(["underscore"], function (_) {
	function faAddSessionCtrl($scope, $http, $location, $uibModal, $uibModalInstance, faCommonSvc, faSession, dashboard) {
		$scope.newSession = {
			date: new Date(),
			group: "",
			notes: "",
			location: "",
			selectedGroups: []
		};
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
        $scope.dashboard = dashboard;

		$scope.updateStartTime = function () { 
			$scope.newSession.startTime = new Date();
		};

		$scope.addSession = function () {
			_.each($scope.groups, function (group) { 
				if (group.selected)
					$scope.newSession.selectedGroups.push(group.id);
			})

			faSession.save({
				dashboardId: $scope.dashboard._id
			}, $scope.newSession, function (session) {
                $uibModalInstance.close(session);
            });
        };

        $scope.cancelAddSession = function () {
            $uibModalInstance.dismiss();
        };
	};

	return faAddSessionCtrl;
});

