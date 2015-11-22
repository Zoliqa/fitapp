
define(["bcrypt"], function (bcrypt) {
	function faRegisterCtrl($scope, $location, faUser) {
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
			email: "",
			gender: $scope.genders.male,
			birthdate: new Date()
		};
		$scope.errorMessage = "";

		$scope.register = function () {
			if ($scope.user.password !== $scope.user.confirmedPassword) {
				$scope.errorMessage = "Password and confirmed password don't match.";
				
				return;
			}
			
			var salt = bcrypt.genSaltSync(10);
			$scope.user.password = bcrypt.hashSync($scope.user.password, salt);

			faUser.save($scope.user, function (user) { 
				$location.path("/login").search("username", user.username);
			});
		};

		$scope.cancel = function () {
			$location.path("/login");
		};
	};

	return faRegisterCtrl;
});

