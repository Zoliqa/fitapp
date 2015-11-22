
define(["bcrypt"], function (bcrypt) {
	function faProfileCtrl($scope, $location, $uibModal, faCommonSvc, faUser) {
		var loggedInUser = faCommonSvc.loggedInUser();

		$scope.updatedUser = Object.create(loggedInUser);
		$scope.unregisterResultModal = null;
		
		(function init() { 
			$scope.updatedUser.password = "";
		})();

		$scope.save = function () {
			if (!bcrypt.compareSync($scope.updatedUser.currentPassword, loggedInUser.password)) {
				$scope.errorMessage = "Current password is incorrect.";
				
				return;
			}	
			
			if ($scope.updatedUser.newPassword !== $scope.updatedUser.newConfirmedPassword) {
				$scope.errorMessage = "Password and confirmed password don't match.";

				return;
			}
			
			var salt = bcrypt.genSaltSync(10);
			$scope.updatedUser.password = bcrypt.hashSync($scope.updatedUser.newPassword, salt);

			faUser.update({ id: $scope.updatedUser._id }, $scope.updatedUser, function (user) {
				faCommonSvc.loggedInUser(user);

				$location.path("/home");
			});
		};

		$scope.cancel = function () { 
			$location.path("/home");
		};

		$scope.unregister = function () {
			faUser.delete({ id: loggedInUser._id }, function () {
				faCommonSvc.loggedInUser(null);

				$scope.unregisterResultModal = $uibModal.open({
					animation: true,
					templateUrl: "unregister-result.html",
					size: "md",
					scope: $scope
				});
			});
		};

		$scope.closeModal = function () {
			$scope.unregisterResultModal.dismiss();

			$location.path("/login");
		};
	};
	
	return faProfileCtrl;
});