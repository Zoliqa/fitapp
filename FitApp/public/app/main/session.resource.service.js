
define([], function () {
	
	function sessionResourceService($resource) {
		var resource = $resource("/session/:dashboardId", null, {
			"update": { method: "PUT" },
			"getActiveSession": { method: "GET", url: "/session/activesession" }
		});
		
		return resource;
	}
	
	return sessionResourceService;
});