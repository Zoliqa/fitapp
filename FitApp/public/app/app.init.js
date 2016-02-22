
define([
	"angular", 
	"app/main/main.module",
	"app/users/users.module",
	"app/widgets/widgets.module",
	"app/common/common.module",
	"uiBootstrapTpls",
	"bootstrap",
	"offline",
	"public/lib/offlinejs-simulate-ui/offline-simulate-ui.min"], 
	function (angular, mainModule, usersModule, widgetsModule, commonModule, uiBootstrapTpls, bootstrap, offline, offlineSimulate) {
	
		console.log(Offline.check());

		var fitApp = angular.module("fitApp", ["ngRoute", "ui.bootstrap", "main", "users", "widgets", "common"]);  

		angular.bootstrap(document, ["fitApp"]);            
	}
);