
function faLoginCtrl($scope) {
	$scope.message = "login...";
};

var faControllers = angular.module("faControllers", []);

faControllers.controller("faLoginCtrl", faLoginCtrl);

