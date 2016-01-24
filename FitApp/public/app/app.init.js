
define([
			 "angular", "angularRoute", "public/app/main/main.module"], 
	function (angular,   angularRoute,   usersModule) { 

		var fitApp = angular.module("fitApp", ["ngRoute", "main"]);  

		angular.bootstrap(document, ["fitApp"]);            
	}
);