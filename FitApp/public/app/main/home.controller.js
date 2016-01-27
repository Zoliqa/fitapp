
define([], 
	function () { 

		function HomeController(userDataService) {
			
			var vm = this;
		
			this.message = "Welcome home " + userDataService.loggedInUser().username;
		}

		return HomeController; 
	}
);