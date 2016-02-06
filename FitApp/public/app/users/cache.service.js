
define([], 
	function () { 

		function CacheService($cacheFactory) {
			var $httpDefaultCache = $cacheFactory.get('$http');
		
			return {
				invalidate: function (key) {
					$httpDefaultCache.remove(key);
				}
			}
		}

		return CacheService;
	}
);