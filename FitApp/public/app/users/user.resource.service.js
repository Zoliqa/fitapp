﻿
define([], function () { 

		function userResourceService($resource) {
			
			var resource = $resource("/user/:id", null, {
				"update": { method: "PUT" },
				"logout": {
					url: "/user/logout",
					method: "GET"
				},
				"getProfile": {
					url: "/user/profile",
					method: "GET"
				}
			});
		
			return resource;
		}

		return userResourceService;
	}
);