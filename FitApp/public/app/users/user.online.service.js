
define([], function () { 

	function userOnlineService($resource, syncService, userOfflineService) {
		var resource = $resource("/user/:id", null, {
			"get": {
				cache: true
			},
			"update": { method: "PUT" },
			"login": {
				url: "/user/login",
				method: "POST", 
				interceptor: {
					response: function (result) {
						if (result && result.data && result.data._id)
							return syncService.synchronizeData(resource.get, result.data).then(function (user) {
								userOfflineService.setLoggedInUser(user);

								return user;
							});
						
						return {};
					}
				}
			},
			"logout": {
				url: "/user/logout",
				method: "GET"
			}
		});
		
		return resource;
	}
	
	return userOnlineService;
});