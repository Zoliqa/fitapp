
define([], function () { 
	function faDashboardsCtrl($scope, $http, $uibModal) {
		$scope.dashboards = [];
		$scope.newDashboard = {
			title: "",
			description: ""
		};
		$scope.createDashboardModal = null;

		(function init() {
			$http.get("/dashboard").success(function (result) { 
				if (result.success)
					$scope.dashboards = result.dashboards;
			});
		})();

		$scope.initCreate = function () { 
			$scope.createDashboardModal = $uibModal.open({
				animation: true,
				templateUrl: 'create-dashboard.html',
				size: "lg",
				scope: $scope
			});
		};

		$scope.create = function () {
			$http.post("/dashboard", $scope.newDashboard).success(function (result) { 
				if (result.success) {
					$scope.dashboards.push(result.dashboard);

					$scope.createDashboardModal.dismiss();
				}
			});
		};

		$scope.cancel = function () { 
			$scope.createDashboardModal.dismiss();
		};

		$scope.removeDashboard = function (dashboard) {
			$http.delete("/dashboard/" + dashboard._id).success(function (result) {
				if (result.success) { 
					var index = $scope.dashboards.indexOf(dashboard);
					
					$scope.dashboards.splice(index, 1);
				}
			})
		};
	};
	
	return faDashboardsCtrl;
});