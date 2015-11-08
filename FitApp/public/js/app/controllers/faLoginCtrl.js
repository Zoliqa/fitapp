
define([], function () { 
	function faLoginCtrl($scope, $http, $location, faCommonSvc) {
		$scope.credentials = {
			username: "",
			password: ""
		};
		$scope.errors = {
			isUsernameEmpty: function () { 
				return $scope.credentials.username.length === 0 || !!/\s+/.exec($scope.credentials.username);
			},
			isPasswordEmpty: function () { 
				return $scope.credentials.password.length === 0 || !!/\s+/.exec($scope.credentials.password);
			},
			message: ""
		};

		$scope.logIn = function () {
			$scope.errors.message = "";

			if (!$scope.errors.isUsernameEmpty() && !$scope.errors.isPasswordEmpty())
				$http.post("/auth/login", $scope.credentials)
					.success(function (result) {
						if (result.success) {
							faCommonSvc.loggedInUser(result.user);

							$location.path("/home");
						}
						else
							$scope.errors.message = "Wrong username and/or password";
				});
			else
				$scope.errors.message = "Username and/or password is empty";
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

