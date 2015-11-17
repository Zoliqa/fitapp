
define([], function () {
	function faNavigationCtrl($scope, $http, $location, faCommonSvc) {
		$scope.activeDashboard = null;

		(function init() {
			$scope.$watch(function () { 
				return faCommonSvc.loggedInUser();
			}, function (user) { 
				if (user)
					faCommonSvc.getActiveDashboard().then(function (dashboard) { 
						$scope.activeDashboard = dashboard;
					});
				else
					$scope.activeDashboard = null;
			})
		})();

		$scope.user = function () { 
			return faCommonSvc.loggedInUser();
		};

		$scope.isActive = function (path) {
			return $location.path() === path;
		};

		$scope.logout = function () {
			$http.get("/auth/logout").success(function () {
				$location.path("/");

				faCommonSvc.loggedInUser(null);
			});
		};

		$scope.isUserLoggedIn = function () { 
			return !!faCommonSvc.loggedInUser();
		};
	};
	
	return faNavigationCtrl;
});