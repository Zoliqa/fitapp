
define([], 
	function () { 

		function configureRoutes($routeProvider) {
			$routeProvider
				.when("/home", {
					templateUrl: "/public/app/main/home.html",
					controller: "HomeController",
					controllerAs: "vm",
					resolve: {
						//auth: function ($q, userDataService) { 
						//	if (userDataService.loggedInUser())
						//		return true;
						//	else
						//		return $q.reject("UNAUTHORIZED");
						//}

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
						//auth: function ($q, userDataService) { 
						//	if (userDataService.loggedInUser())
						//		return true;
						//	else
						//		return $q.reject("UNAUTHORIZED");
						//}

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