
define([
			 "angular", "angularRoute", "public/js/app/main/main.module"], 
	function (angular,   angularRoute,   usersModule) { 

		var fitApp = angular.module("fitApp", ["ngRoute", "main"]);  

		angular.bootstrap(document, ["fitApp"]);            
	}
);