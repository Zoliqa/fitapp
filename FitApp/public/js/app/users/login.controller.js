
define([], 
	function () { 

		function LoginController($http, $location, bcrypt, userDataService) { 
		
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
					var salt = bcrypt.genSaltSync(10);
				
					$http.post("/user/login", vm.credentials)
						.success(function (user) {
							if (user) {
								// $location.path("/home");

								userDataService.loggedInUser(user);
							}
							else
								vm.errorMessage = "Wrong username and/or password";
						});
				}
				else
					vm.errorMessage = "Username and/or password is empty";
			} 
		
			function register () {
				$location.path("/register");
			};
		}

		return LoginController;
	}
);