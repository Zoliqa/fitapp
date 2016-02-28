
define([], function () {
	
	// mainRun.$inject = ["$rootScope", "$location", "USER_LOGGED_IN", "Offline"];

	function mainRun(
		$rootScope, $location, _, USER_LOGGED_IN, Offline, dbService, userOnlineService, workoutOnlineService, cacheService) {
		
		$rootScope.$on(USER_LOGGED_IN, function (event, data) {
			$location.path("/home");
		});
		
		$rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
			if (rejection === "UNAUTHORIZED") {
				$location.path("/user/login");
			}
		});
		
		// return;

		//Offline.on("confirmed-up", function () {
		//});
	}

	return mainRun;
});