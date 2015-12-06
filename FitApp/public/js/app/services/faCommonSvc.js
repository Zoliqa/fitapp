
define(["underscore"], function (_) {
	function faCommonSvc(faDashboard) {
		var _user;
		
		function loggedInUser(user) { 
			if (arguments.length === 0)
				return _user;

            _user = user;
		}

		return {
			loggedInUser: loggedInUser
		};
	}
	
	return faCommonSvc;
});

