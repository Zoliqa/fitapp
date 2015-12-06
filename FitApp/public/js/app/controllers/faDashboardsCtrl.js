
define(["underscore"], function (_) { 
	function faDashboardsCtrl($scope, $uibModal, faCommonSvc, faDashboard) {
		$scope.dashboards = faDashboard.query();
		$scope.newDashboard = {
			owner: faCommonSvc.loggedInUser()._id,
			title: "",
			description: "",
			created: new Date()
		};
        $scope.createDashboardModal = null;

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

		$scope.isShared = function (dashboard) {
		    return true;
        };

        $scope.initAddSession = function (dashboard) { 
            var modal = $uibModal.open({
                animation: true,
                templateUrl: 'add-session-modal.html',
                size: "lg",
                scope: $scope,
                controller: "faSessionsCtrl",
                resolve: {
                    dashboard: function () {
                        return dashboard;
                    }
                }
            });

            modal.result.then(function (session) { 
                console.log("session has been created: " + session);
            });
        };

        
	};
	
	return faDashboardsCtrl;
});