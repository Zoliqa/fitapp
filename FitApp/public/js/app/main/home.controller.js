
define([], 
	function () { 

		function HomeController($scope, userDataService) {
			
			$scope.message = "Welcome home " + userDataService.loggedInUser().username;
		}

		return HomeController;
	}
);