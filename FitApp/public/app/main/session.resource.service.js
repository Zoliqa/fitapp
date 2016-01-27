
define([], function () {
	
	function sessionResourceService($resource) {
		var resource = $resource("/session/:dashboardId", null, {
			"update": { method: "PUT" }
		});
		
		return resource;
	}
	
	return sessionResourceService;
});