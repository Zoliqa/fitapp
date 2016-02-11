﻿
define([], 
	function () { 

		function cacheService($cacheFactory) {
			var $httpDefaultCache = $cacheFactory.get('$http');
		
			return {
				invalidate: function (key) {
					$httpDefaultCache.remove(key);
				}
			}
		}

		return cacheService;
	}
);