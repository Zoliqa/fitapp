
define([], 
	function () { 

		function cacheService($cacheFactory) {
			var $httpDefaultCache = $cacheFactory.get('$http');
			var service = {
				invalidate: invalidate, 
				store: store
			}

			return service;

			function invalidate(key) {
				$httpDefaultCache.remove(key);
			}

			function store(key, value) {
				$httpDefaultCache.put(key, value);
			}
		}

		return cacheService;
	}
);