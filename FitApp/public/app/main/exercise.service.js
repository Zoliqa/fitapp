
define([], function () {
	
	function ExerciseService($resource) {
		var resource = $resource("/exercise/:id", null, {
		});
		
		return resource;
	}
	
	return ExerciseService;
});