
define([
	"angular", 
	"app/main/main.module",
	"app/users/users.module",
	"app/widgets/widgets.module",
	"uiBootstrapTpls",
	"bootstrap"], 
	function (angular, mainModule, usersModule, widgetsModule, uiBootstrapTpls, bootstrap) { 

		var fitApp = angular.module("fitApp", ["ngRoute", "ui.bootstrap", "main", "users", "widgets"]);  

		angular.bootstrap(document, ["fitApp"]);            
	}
);