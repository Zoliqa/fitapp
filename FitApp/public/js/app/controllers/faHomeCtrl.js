
define([], function () { 
	function faHomeCtrl($scope, $http, $location) {
		$scope.logout = function () {
			$http.get("/auth/logout").success(function () { 
				$location.path("/");
			});
		};	
	};
	
	return faHomeCtrl;
});