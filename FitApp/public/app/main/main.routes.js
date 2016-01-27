
define([], 
	function () { 

		function configureRoutes($routeProvider) {
			$routeProvider
				.when("/home", {
					templateUrl: "/public/app/main/home.html",
					controller: "HomeController",
					controllerAs: "vm"
				})
				.when("/newsession", {
					templateUrl: "/public/app/main/new-session.html",
					controller: "NewSessionController",
					controllerAs: "vm"
				})
				.otherwise({
					redirectTo: "/user/login"
				});
		}

		return configureRoutes;		
	}
);