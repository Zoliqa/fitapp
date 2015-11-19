
define([], function () {
	function faDashboard($resource, $cacheFactory) {
		var dashboardsCache = $cacheFactory("dashboards");
		var resource = $resource("/dashboard/:id", null, {
			"update": { method: "PUT" },
			"query": { method: "GET", cache: true, isArray: true }
		});
		
		return resource;
	}
	
	return faDashboard;
});

