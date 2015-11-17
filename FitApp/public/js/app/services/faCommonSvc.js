
define(["underscore"], function (_) {
	function faCommonSvc(faDashboard) {
		var _user;
		
		function loggedInUser(user) { 
			if (arguments.length === 0)
				return _user;

			_user = user;
		}
		
		function getActiveDashboard() {
			if (_user) {
				return faDashboard.query().$promise.then(function (dashboards) { 
					var activeDashboard = _.find(dashboards, function (dashboard) {
						return dashboard.isActive;
					});
					
					return activeDashboard;
				});
			}

			return null;
		}

		return {
			loggedInUser: loggedInUser,
			getActiveDashboard: getActiveDashboard
		};
	}
	
	return faCommonSvc;
});

