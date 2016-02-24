
define([], function () { 

	function userOnlineService($resource) {
		var resource = $resource("/user/:id", null, {
			"get": { cache: true },
			"update": { method: "PUT" },
			"login": {
				url: "/user/login",
				method: "POST", 
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