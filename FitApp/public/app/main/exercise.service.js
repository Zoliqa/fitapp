
define([], function () {
	
	function exerciseService($resource) {
		var resource = $resource("/exercise/:id", null, {
			update: { method: "PUT" }
		});
		
		return resource;
	}
	
	return exerciseService;
});