
define([], function () { 
	function faDashboardsCtrl($scope, $http) {
		$scope.dashboards = [];
		$scope.isCreating = false;
		$scope.newDashboard = {
			title: "",
			username: ""
		};

		(function init() {
			$http.get("/dashboard").success(function (result) { 
				if (result.success)
					$scope.dashboards = result.dashboards;
			});
		})();

		$scope.initCreate = function () { 
			$scope.isCreating = true;
		};

		$scope.create = function () {
			$http.post("/dashboard", $scope.newDashboard).success(function (result) { 
				if (result.success) {
					$scope.dashboards.push(result.dashboard);

					$scope.isCreating = false;
				}
			});
		};

		$scope.cancel = function () { 
			$scope.isCreating = false;
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