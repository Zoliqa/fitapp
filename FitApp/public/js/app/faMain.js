
define([
	"public/js/app/controllers/faNavigationCtrl",
	"public/js/app/controllers/faLoginCtrl",
	"public/js/app/controllers/faRegisterCtrl", 
	"public/js/app/controllers/faHomeCtrl", 
	"public/js/app/controllers/faDashboardsCtrl", 
	"public/js/app/services/faCommonSvc",
	"angular",
	"angularRoute",
	"uiBootstrapTpls",
	"bootstrap"
	], function(faNavigationCtrl, 
				faLoginCtrl, 
				faRegisterCtrl, 
				faHomeCtrl, 
				faDashboardsCtrl, 
				faCommonSvc, 
				angular, 
				angularRoute,
				uiBootstrapTpls) {
	
	var fitApp = angular.module("fitApp", ["ngRoute", "ui.bootstrap"]);

	function config($routeProvider, $locationProvider) {
		$routeProvider
		.when("/", {
			templateUrl: "/public/partials/login.html",
			controller: "faLoginCtrl"
		})
		.when("/register", {
			templateUrl: "/public/partials/register.html",
			controller: "faRegisterCtrl"
		})
		.when("/home", {
			templateUrl: "/public/partials/home.html",
			controller: "faHomeCtrl"
		})
		.when("/dashboards", {
			templateUrl: "/public/partials/dashboards.html",
			controller: "faDashboardsCtrl"
		})
		.when("/groups", {
			templateUrl: "/public/partials/groups.html",
			controller: "faGroupsCtrl"
		})
		.otherwise({
			redirectTo: "/"
		});
	}
	
	fitApp.config(config);
	
	fitApp.controller("faNavigationCtrl", faNavigationCtrl);
	fitApp.controller("faLoginCtrl", faLoginCtrl);
	fitApp.controller("faRegisterCtrl", faRegisterCtrl);
	fitApp.controller("faHomeCtrl", faHomeCtrl);
	fitApp.controller("faDashboardsCtrl", faDashboardsCtrl);
	fitApp.factory("faCommonSvc", faCommonSvc);
	
	fitApp.run(function ($rootScope, $location, $route, $http, faCommonSvc) {
		
		function init() { 
			$rootScope.$on('$routeChangeStart', function (event, next, current) {
				if ($location.path() !== "/" && !faCommonSvc.loggedInUser() && $location.path() !== "" && $location.path() !== "/" && $location.path() !== "/register") {
					event.preventDefault();
				}
			});
		}

		$http.get("/auth/profile")
		    .success(function (result) {
				if (result.success) 
					faCommonSvc.loggedInUser(result.user);
				else
					$location.path("/");

				init();
			});
	});

	angular.bootstrap(document, ["fitApp"]);
});

