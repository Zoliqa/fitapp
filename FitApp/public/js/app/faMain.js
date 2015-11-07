﻿
define([
	"public/js/app/controllers/faLoginCtrl",
	"public/js/app/controllers/faRegisterCtrl", 
	"public/js/app/controllers/faHomeCtrl", 
	"public/js/app/services/faCommonSvc",
	"angular",
	"angularRoute",
	"bootstrap"
	], function(faLoginCtrl, faRegisterCtrl, faHomeCtrl, faCommonSvc, angular, angularRoute) {
	
	var fitApp = angular.module("fitApp", ["ngRoute"]);

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
		.when("/sessions", {
			templateUrl: "/public/partials/sessions.html",
			controller: "faSessionsCtrl"
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
	
	fitApp.controller("faLoginCtrl", faLoginCtrl);
	fitApp.controller("faRegisterCtrl", faRegisterCtrl);
	fitApp.controller("faHomeCtrl", faHomeCtrl);
	fitApp.factory("faCommonSvc", faCommonSvc);
	
	angular.bootstrap(document, ["fitApp"]);
});

