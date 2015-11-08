
define([], function () { 
	function faHomeCtrl($scope, $http, $location) {
		$scope.logout = function () {
			$http.get("/logout").success(function () { 
				$location.path("/");
			});
		};	
	};
	
	return faHomeCtrl;
});