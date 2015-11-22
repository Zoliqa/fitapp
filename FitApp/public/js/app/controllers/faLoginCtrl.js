
define(["bcrypt"], function (bcrypt) { 
	function faLoginCtrl($scope, $http, $location, faCommonSvc) {
		$scope.credentials = {
			username: $location.search().username || "",
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
			
			if (!$scope.errors.isUsernameEmpty() && !$scope.errors.isPasswordEmpty()) {
				var salt = bcrypt.genSaltSync(10);
				
				$http.post("/user/login", $scope.credentials)
				.success(function (user) {
					if (user) {
						faCommonSvc.loggedInUser(user);
						
						$location.path("/home");
					}
					else
						$scope.errors.message = "Wrong username and/or password";
				});
			}
			else
				$scope.errors.message = "Username and/or password is empty";
		};
		
		$scope.register = function () {
			$location.path("/register");
		};
	};

	return faLoginCtrl;
});

