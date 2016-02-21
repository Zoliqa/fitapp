
define([
	"angular", 
	"app/main/main.module",
	"app/users/users.module",
	"app/widgets/widgets.module",
	"app/common/common.module",
	"uiBootstrapTpls",
	"bootstrap"], 
	function (angular, mainModule, usersModule, widgetsModule, commonModule, uiBootstrapTpls, bootstrap) { 

		var fitApp = angular.module("fitApp", ["ngRoute", "ui.bootstrap", "main", "users", "widgets", "common"]);  

		angular.bootstrap(document, ["fitApp"]);            
	}
);