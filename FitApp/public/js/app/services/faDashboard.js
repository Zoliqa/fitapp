
define([], function () {
	function faDashboard($resource) {
		var resource = $resource("/dashboard/:id", null, {
			"update": { method: "PUT" }
		});

		return resource;
	}
	
	return faDashboard;
});

