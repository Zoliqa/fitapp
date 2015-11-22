
define([], function () {
	function faSession($resource) {
		var resource = $resource("/session/:id", null, {
			"update": { method: "PUT" }
		});
		
		return resource;
	}
	
	return faSession;
});

