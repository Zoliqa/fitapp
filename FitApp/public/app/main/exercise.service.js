
define([], function () {
	
	function exerciseService($resource) {
		var resource = $resource("/exercise/:id", null, {
		});
		
		return resource;
	}
	
	return exerciseService;
});