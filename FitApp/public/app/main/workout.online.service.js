
define([], function () {
	
	function workoutOnlineService($resource) {
		var resource = $resource("/workout/:id", null, {
			"update": { method: "PUT" }
		});
		
		return resource;
	}
	
	return workoutOnlineService;
});