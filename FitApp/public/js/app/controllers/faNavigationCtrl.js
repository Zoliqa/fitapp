
define([], function () {
	function faNavigationCtrl($scope, $http, $location, faCommonSvc) {
		$scope.activeDashboard = function () { 
			return faCommonSvc.activeDashboard();
		};

		$scope.user = function () { 
			return faCommonSvc.loggedInUser();
		};

		$scope.isActive = function (path) {
			return $location.path() === path;
		};

		$scope.logout = function () {
			$http.get("/user/logout").success(function () {
				$location.path("/login");

				faCommonSvc.loggedInUser(null);
			});
		};

		$scope.isUserLoggedIn = function () { 
			return !!faCommonSvc.loggedInUser();
		};
	};
	
	return faNavigationCtrl;
});