
define([], function () { 
	function faLoginCtrl($scope, $http) {
		$scope.message = "login...";
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

		$scope.getUsers = function () {
			$http.get("/users")
				.success(function (result) { 
					console.log(result);	
				});
		};
	};

	return faLoginCtrl;
});

