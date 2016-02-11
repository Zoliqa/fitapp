
define([], function () {
	
	function workoutService($resource) {
		var resource = $resource("/workout/:id", null, {
			"update": { method: "PUT" }
		});
		
		return resource;
	}
	
	return workoutService;
});