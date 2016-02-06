
define([], 
	function () { 

		function configureRoutes($routeProvider) {
			$routeProvider
				.when("/home", {
					templateUrl: "/public/app/main/home.html",
					controller: "HomeController",
					controllerAs: "vm",
					resolve: {
						auth: function ($q, UserService) {
					
							return UserService.get().$promise.then(function (user) { 
								if (user._id)
									return true;
						
								return $q.reject("UNAUTHORIZED");
							});
						}
					}
				})
				.when("/newsession", {
					templateUrl: "/public/app/main/new-session.html",
					controller: "NewSessionController",
					controllerAs: "vm",
					resolve: {
						auth: function ($q, UserService) {
					
							return UserService.get().$promise.then(function (user) {
								if (user._id)
									return true;
						
								return $q.reject("UNAUTHORIZED");
							});
						}
					}
				})
				.when("/editsession", {
					templateUrl: "/public/app/main/edit-session.html",
					controller: "EditSessionController",
					controllerAs: "vm",
					resolve: {
						auth: function ($q, UserService) {
					
							return UserService.get().$promise.then(function (user) {
								if (user._id)
									return true;
						
								return $q.reject("UNAUTHORIZED");
							});
						}
					}
				})
				.otherwise({
					redirectTo: "/user/login"
				});
		}

		return configureRoutes;		
	}
);