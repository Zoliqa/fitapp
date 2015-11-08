
define([], function () { 
	function faNavigationCtrl($scope, $http, $location, faCommonSvc) {
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