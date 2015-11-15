
define(["underscore"], function (_) { 
	function faDashboardsCtrl($scope, $http, $uibModal, faCommonSvc) {
		$scope.dashboards = [];
		$scope.newDashboard = {
			title: "",
			description: ""
		};
		$scope.createDashboardModal = null;

		(function init() {
			$http.get("/dashboard").success(function (result) { 
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
				$scope.dashboards.push(result.dashboard);

				$scope.createDashboardModal.dismiss();
			});
		};

		$scope.cancel = function () { 
			$scope.createDashboardModal.dismiss();
		};

		$scope.removeDashboard = function (dashboard) {
			$http.delete("/dashboard/" + dashboard._id).success(function (result) {
				var index = $scope.dashboards.indexOf(dashboard);
					
				$scope.dashboards.splice(index, 1);

				if (result.dashboard.isActive) {
					if ($scope.dashboards.length > 0)
						$scope.setActive($scope.dashboards[0]);
				}
			})
		};

		$scope.setActive = function (dashboard) {
			dashboard.isActive = true;

			$http.put("/dashboard/" + dashboard._id, dashboard)
			.success(function (result) {
				faCommonSvc.activeDashboard(dashboard);

				var found = _.find($scope.dashboards, function (dashboard2) {
					return dashboard2 !== dashboard && dashboard2.isActive;
				});
					
				if (found) {
					found.isActive = false;
						
					$http.put("/dashboard/" + found._id, found);
				}
			});
		};
	};
	
	return faDashboardsCtrl;
});