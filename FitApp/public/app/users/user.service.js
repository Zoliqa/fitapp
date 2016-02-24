
define([], function () { 

	function userService(Offline, userOnlineService, userOfflineService) {
		var service =  {
			current: userOnlineService
		};
	
		Offline.on("confirmed-down", function () {
			service.current = userOfflineService;
		});

		Offline.on("confirmed-up", function () {
			service.current = userOnlineService;
		});

		return service;
	}

	return userService;
});