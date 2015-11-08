
define([], function () {
	function faRegisterCtrl($scope, $http, $location, faCommonSvc) {
		$scope.genders = {
			male: 1,
			female: 2
		};
		$scope.profile = {
			username: "",
			password: "",
			confirmedPassword: "",
			firstname: "",
			lastname: "",
			emailAddress: "",
			gender: $scope.genders.male,
			birthdate: new Date()
		};
		$scope.errorMessage = "";

		$scope.register = function () {
			$http.post("/auth/register", $scope.profile)
				.success(function (result) {
					if (result.success) {
						faCommonSvc.loggedInUser(result.user);
						
						$location.path("/home");
					}
					else
						$scope.errorMessage = result.message;
				});
		};

		$scope.cancel = function () {
			$location.path("/");
		};
	};

	return faRegisterCtrl;
});

