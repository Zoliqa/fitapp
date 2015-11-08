
define([], function () { 
	function faLoginCtrl($scope, $http, $location) {
		$scope.credentials = {
			username: "",
			password: ""
		};
		$scope.showErrorMessage = false;

		$scope.logIn = function () {
			$http.post("/login", $scope.credentials)
				.success(function (result) {
				if (result.success)
					$location.path("/home");
				else
					$scope.showErrorMessage = true;
				});
		};
		
		$scope.register = function () {
			$location.path("/register");
		};

		$scope.getUsers = function () {
			$http.get("/users")
				.success(function (result) { 
					console.log(result);	
				});
		};
	};

	return faLoginCtrl;
});

