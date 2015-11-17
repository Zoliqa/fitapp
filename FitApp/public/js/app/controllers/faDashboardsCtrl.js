
define(["underscore"], function (_) { 
	function faDashboardsCtrl($scope, $http, $uibModal, faCommonSvc, faDashboard) {
		$scope.dashboards = faDashboard.query();
		$scope.newDashboard = {
			title: "",
			description: ""
		};
		$scope.createDashboardModal = null;

		(function init() {
			//faCommonSvc.getDashboards().then(function (result) { 
			//	$scope.dashboards = result.dashboards;
			//});

			// faDashboardSvc.query();
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
			faDashboard.save($scope.newDashboard, function (dashboard) { 
				$scope.dashboards.push(dashboard);

				$scope.createDashboardModal.dismiss();
			});
		};

		$scope.cancel = function () { 
			$scope.createDashboardModal.dismiss();
		};

		$scope.removeDashboard = function (dashboard) {
			faDashboard.delete({ id: dashboard._id }, function () { 
				var index = $scope.dashboards.indexOf(dashboard);
				
				$scope.dashboards.splice(index, 1);
				
				if (dashboard.isActive) {
					if ($scope.dashboards.length > 0)
						$scope.setActive($scope.dashboards[0]);
				}
			});
		};

		$scope.setActive = function (dashboard) {
			dashboard.isActive = true;
			
			faDashboard.update({ id: dashboard._id }, dashboard, function () { 
				var found = _.find($scope.dashboards, function (dashboard2) {
					return dashboard2 !== dashboard && dashboard2.isActive;
				});
				
				if (found) {
					found.isActive = false;
					
					faDashboard.update({ id: found._id }, found);
				}
			});

			//$http.put("/dashboard/" + dashboard._id, dashboard)
			//.success(function (result) {
			//	var found = _.find($scope.dashboards, function (dashboard2) {
			//		return dashboard2 !== dashboard && dashboard2.isActive;
			//	});
					
			//	if (found) {
			//		found.isActive = false;
						
			//		$http.put("/dashboard/" + found._id, found);
			//	}
			//});
		};
	};
	
	return faDashboardsCtrl;
});