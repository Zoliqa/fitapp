
define([
	"angular", 
	"app/common/cache.service"], 
	function (angular, 
			  cacheService) {
	
		angular.module("common", [])
			.factory("cacheService", cacheService);
	}
);

