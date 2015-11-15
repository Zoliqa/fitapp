
define([], function () {
	function faSessionsCtrl($scope, $http, $location, $uibModal, faCommonSvc) {
		$scope.newSession = {
		
		};
		$scope.createSessionModal = null;
		$scope.activeDashboard = faCommonSvc.activeDashboard();

		$scope.initCreate = function () { 
			$scope.createSessionModal = $uibModal.open({
				animation: true,
				templateUrl: 'create-session.html',
				size: "lg",
				scope: $scope
			});
		};
	};

	return faSessionsCtrl;
});

