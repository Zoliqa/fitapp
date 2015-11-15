
define([], function () {
	function faCommonSvc() {
		var _user, _dashboard;
		
		function loggedInUser(user) { 
			if (arguments.length === 0)
				return _user;

			_user = user;
		}
		
		function activeDashboard(dashboard) {
			if (arguments.length === 0)
				return _dashboard;
			
			_dashboard = dashboard;
		}

		return {
			loggedInUser: loggedInUser,
			activeDashboard: activeDashboard
		};
	}
	
	return faCommonSvc;
});

