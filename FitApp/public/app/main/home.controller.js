
define([], 
	function () { 

		function HomeController($scope, userDataService, sessionResourceService) {
			
			var vm = this;
		
			this.message = "Welcome home " + (userDataService.loggedInUser() && userDataService.loggedInUser().username || "not logged in");
			this.activeSession = sessionResourceService.getActiveSession();
		}

		return HomeController; 
	}
);