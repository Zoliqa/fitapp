
define([
	"angular", 
	"dexie",
	"app/common/cache.service",
	"app/common/db.service"], 
	function (angular, 
			  Dexie,
			  cacheService,
			  dbService) {
	
		angular.module("common", [])
			.factory("cacheService", cacheService)
			.factory("dbService", dbService)
			.constant("Dexie", Dexie);
	}
);

