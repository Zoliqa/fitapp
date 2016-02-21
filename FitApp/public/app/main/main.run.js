
define([], function () {
	
	mainRun.$inject = ["$rootScope", "$location", "USER_LOGGED_IN"];

	function mainRun($rootScope, $location, USER_LOGGED_IN) {
		$rootScope.$on(USER_LOGGED_IN, function (event, data) {
			$location.path("/home");
		});
		
		$rootScope.$on("$routeChangeError", function (evt, current, previous, rejection) {
			if (rejection === "UNAUTHORIZED") {
				$location.path("/user/login");
			}
		});
	}

	return mainRun;
});