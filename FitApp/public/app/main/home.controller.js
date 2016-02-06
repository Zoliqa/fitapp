
define([], 
	function () { 

		function HomeController($scope, SessionService, UserService) {
			
			var vm = this;
		
			this.activeSession = SessionService.get({ active: true });

			UserService.get(function (user) { 
				vm.message = "Welcome home " + user.username;
			});
		}

		return HomeController; 
	}
);