
define([], function () {
	
	// mainRun.$inject = ["$rootScope", "$location", "USER_LOGGED_IN", "Offline"];

	function mainRun(
		$rootScope, $location, _, USER_LOGGED_IN, Offline, cacheService, userOnlineService, userOfflineService) {
		
		$rootScope.$on(USER_LOGGED_IN, function (event, data) {
			$location.path("/home");
		});
		
		$rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
			if (rejection === "UNAUTHORIZED") {
				$location.path("/user/login");
			}
		});
		
		Offline.on("down", function () {
			$rootScope.$apply(function () {
				// cacheService.invalidate("/user");
				userOfflineService.setCurrentUser(null);

				$location.path("/user/login");
			});
		});

		Offline.on("up", function () {
			$rootScope.$apply(function () {
				userOnlineService.logout().$promise.then(function () {
					$location.path("/user/login");
				});
			});
		});
	}

	return mainRun;
});