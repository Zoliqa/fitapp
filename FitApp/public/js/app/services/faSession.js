
define([], function () {
	function faSession($resource) {
		var resource = $resource("/session/:dashboardId", null, {
			"update": { method: "PUT" }
		});
		
		return resource;
	}
	
	return faSession;
});

