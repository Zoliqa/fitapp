
define([], function () {
	function faNavigationCtrl($scope, $http, $location, faCommonSvc, faUser) {
		$scope.user = function () { 
			return faCommonSvc.loggedInUser();
		};

		$scope.isActive = function (path) {
			return $location.path() === path;
		};

		$scope.logout = function () {
			faUser.logout(function () { 
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