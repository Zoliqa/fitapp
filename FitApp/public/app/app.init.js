
define([
	"angular", 
	"app/main/main.module",
	"app/users/users.module",
	"uiBootstrapTpls",
	"bootstrap"], 
	function (angular, mainModule, usersModule, uiBootstrapTpls, bootstrap) { 

		var fitApp = angular.module("fitApp", ["ngRoute", "ui.bootstrap", "main", "users"]);  

		angular.bootstrap(document, ["fitApp"]);            
	}
);