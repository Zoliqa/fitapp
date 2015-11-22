
define([], function () {
	function faSessionsCtrl($scope, $http, $location, $uibModal, faCommonSvc) {
		$scope.newSession = {
			date: new Date(),
			startTime: "",
			group: "",
			notes: "",
			location: ""
		};
		$scope.createSessionModal = null;
		$scope.date = {
			options: {
				formatYear: 'yy',
				startingDay: 1
			},
			opened: false
		};
		
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
	};

	return faSessionsCtrl;
});

