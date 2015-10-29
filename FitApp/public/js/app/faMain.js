
var fitApp = angular.module("fitApp", ["ngRoute", "faControllers", "faServices"]);

function config($routeProvider, $locationProvider) {
	$routeProvider
    .when("/", {
		templateUrl: "/public/partials/login.html",
		controller: "faLoginCtrl"
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

angular.bootstrap(document, ["fitApp"]);

