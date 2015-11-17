
define([
	"public/js/app/controllers/faNavigationCtrl",
	"public/js/app/controllers/faLoginCtrl",
	"public/js/app/controllers/faRegisterCtrl", 
	"public/js/app/controllers/faHomeCtrl", 
	"public/js/app/controllers/faDashboardsCtrl", 
	"public/js/app/controllers/faSessionsCtrl",
	"public/js/app/services/faCommonSvc",
	"public/js/app/services/faDashboard",
	"angular",
	"angularRoute",
	"angularResource",
	"uiBootstrapTpls",
	"bootstrap"
	], function(faNavigationCtrl, 
				faLoginCtrl, 
				faRegisterCtrl, 
				faHomeCtrl, 
				faDashboardsCtrl, 
				faSessionsCtrl,
				faCommonSvc, 
				faDashboard,
				angular) {
	
	var fitApp = angular.module("fitApp", ["ngResource", "ngRoute", "ui.bootstrap"]);

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
		.when("/sessions", {
			templateUrl: "/public/partials/sessions.html",
			controller: "faSessionsCtrl"
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
	fitApp.controller("faSessionsCtrl", faSessionsCtrl);
	fitApp.factory("faCommonSvc", faCommonSvc);
	fitApp.factory("faDashboard", faDashboard);
	
	fitApp.run(function ($rootScope, $location, $route, $http, faCommonSvc) {
		
		function init() { 
			$rootScope.$on('$routeChangeStart', function (event, next, current) {
				if ($location.path() !== "/" && !faCommonSvc.loggedInUser() && $location.path() !== "" && $location.path() !== "/" && $location.path() !== "/register") {
					event.preventDefault();
				}
			});
		}

		$http.get("/auth/profile")
		.then(function (result) {
			if (result.data.success) {
				faCommonSvc.loggedInUser(result.data.user);
			}
			else {
				$location.path("/");
			}
		})
		.finally(function () {
			init();
		});
	});

	angular.bootstrap(document, ["fitApp"]);
});

