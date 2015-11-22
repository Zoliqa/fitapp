
define([
	"public/js/app/controllers/faNavigationCtrl",
	"public/js/app/controllers/faLoginCtrl",
	"public/js/app/controllers/faRegisterCtrl", 
	"public/js/app/controllers/faProfileCtrl", 
	"public/js/app/controllers/faHomeCtrl", 
	"public/js/app/controllers/faDashboardsCtrl", 
	"public/js/app/controllers/faSessionsCtrl",
	"public/js/app/services/faCommonSvc",
	"public/js/app/services/faUser",
	"public/js/app/services/faDashboard",
	"public/js/app/services/faSession",
	"angular",
	"angularRoute",
	"angularResource",
	"uiBootstrapTpls",
	"bootstrap"
	], function(faNavigationCtrl, 
				faLoginCtrl, 
				faRegisterCtrl, 
				faProfileCtrl,
				faHomeCtrl, 
				faDashboardsCtrl, 
				faSessionsCtrl,
				faCommonSvc, 
				faUser,
				faDashboard,
				faSession,
				angular) {
	
	var fitApp = angular.module("fitApp", ["ngResource", "ngRoute", "ui.bootstrap"]);

	function config($routeProvider, $locationProvider) {
		$routeProvider
		.when("/login", {
			templateUrl: "/public/partials/login.html",
			controller: "faLoginCtrl"
		})
		.when("/register", {
			templateUrl: "/public/partials/register.html",
			controller: "faRegisterCtrl"
		})
		.when("/profile", {
			templateUrl: "/public/partials/profile.html",
			controller: "faProfileCtrl"
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
			redirectTo: "/login"
		});
	}
	
	fitApp.config(config);
	
	fitApp.controller("faNavigationCtrl", faNavigationCtrl);
	fitApp.controller("faLoginCtrl", faLoginCtrl);
	fitApp.controller("faRegisterCtrl", faRegisterCtrl);
	fitApp.controller("faProfileCtrl", faProfileCtrl);
	fitApp.controller("faHomeCtrl", faHomeCtrl);
	fitApp.controller("faDashboardsCtrl", faDashboardsCtrl);
	fitApp.controller("faSessionsCtrl", faSessionsCtrl);
	fitApp.factory("faCommonSvc", faCommonSvc);
	fitApp.factory("faUser", faUser);
	fitApp.factory("faDashboard", faDashboard);
	fitApp.factory("faSession", faSession);
	
	fitApp.run(function ($rootScope, $location, $route, faUser, faCommonSvc) {
		
		function init() { 
			$rootScope.$on('$routeChangeStart', function (event, next, current) {
				if (!faCommonSvc.loggedInUser() && $location.path() !== "/login" && $location.path() !== "/register" && $location.path() !== "") {
					event.preventDefault();
				}
			});
		}

		faUser.profile(function (user) {
			if (user && user._id)
				faCommonSvc.loggedInUser(user);
			else 
				$location.path("/login");
		}).$promise.then(function () { 
			init();
		});
	});

	angular.bootstrap(document, ["fitApp"]);
});

