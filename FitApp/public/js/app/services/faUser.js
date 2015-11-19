
define([], function () {
	function faUser($resource) {
		var resource = $resource("/user/:id", null, {
			"update": { method: "PUT" }
		});
		
		return resource;
	}
	
	return faUser;
});

