
define([], function () { 
	function faLoginCtrl($scope, $http, $location) {
		$scope.credentials = {
			username: "",
			password: ""
		};

		$scope.logIn = function () {
			$http.post("/login", $scope.credentials)
				.success(function (result) {
					console.log(result);
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

