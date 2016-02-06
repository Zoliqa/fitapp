
define([], function () { 

		function UserService($resource) {
			
			var resource = $resource("/user/:id", null, {
				"get": { cache: true },
				"update": { method: "PUT" },
				"logout": {
					url: "/user/logout",
					method: "GET"
				}
			});
		
			return resource;
		}

		return UserService;
	}
);