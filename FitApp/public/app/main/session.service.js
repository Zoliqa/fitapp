
define([], function () {
	
	function SessionService($resource) {
		var resource = $resource("/session/:sessionId?active=:active", null, {
			"update": { method: "PUT" }
		});
		
		return resource;
	}
	
	return SessionService;
});