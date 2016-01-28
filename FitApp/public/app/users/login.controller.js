﻿
define([], 
	function () { 

		function LoginController($scope, $http, $location, userDataService) {  
		
			var vm = this;    
		 
			vm.credentials = {
				username: $location.search().username || "",
				password: ""
			};
			vm.isUsernameEmpty = isUsernameEmpty;
			vm.isPasswordEmpty = isPasswordEmpty;
			vm.errorMessage = "";
			vm.logIn = logIn;
			vm.register = register;

			function isUsernameEmpty() {
				return vm.credentials.username.length === 0 || !!/\s+/.exec(vm.credentials.username);
			}
		
			function isPasswordEmpty() {
				return vm.credentials.password.length === 0 || !!/\s+/.exec(vm.credentials.password);
			}
		
			function logIn() {
				vm.errorMessage = "";
			
				if (!vm.isUsernameEmpty() && !vm.isPasswordEmpty()) {
				
					$http.post("/user/login", vm.credentials)
						.success(function (user) {
							if (user) {
								userDataService.loggedInUser(user);
							
								$scope.$emit("USER_LOGGED_IN");
							}
							else
								vm.errorMessage = "Wrong username and/or password";
						});
				}
				else
					vm.errorMessage = "Username and/or password is empty";
			} 
		
			function register () {
				$location.path("/user/register");
			};
		}

		return LoginController;
	}
);