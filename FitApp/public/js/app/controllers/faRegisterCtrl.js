
define([], function () {
	function faRegisterCtrl($scope, $http, $location, faCommonSvc, faUser) {
		$scope.genders = {
			male: 1,
			female: 2
		};
		$scope.user = {
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
			faUser.save($scope.user).$promise.then(function (user) { 
				$location.path("/login").search("username", user.username);
			});
		};

		$scope.cancel = function () {
			$location.path("/login");
		};
	};

	return faRegisterCtrl;
});

