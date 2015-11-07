
define([], function () {
	function faRegisterCtrl($scope, $http, $location) {
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

		$scope.register = function () {
			$http.post("/register", $scope.profile)
				.success(function (result) {
					console.log(result);
				});
		};

		$scope.cancel = function () {
			$location.path("/");
		};
	};

	return faRegisterCtrl;
});

