
define([], 
	function () { 

		function userDataService() {
			var _user = {};
			var service = {
				loggedInUser: loggedInUser
			};
		
			return service;

			function loggedInUser(user) {
				if (arguments.length === 0)
					return _user;

				_user = user;
			}
		}

		return userDataService;
	}
);