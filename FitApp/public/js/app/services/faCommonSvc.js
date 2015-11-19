
define(["underscore"], function (_) {
	function faCommonSvc(faDashboard) {
		var _user, _activeDashboard;
		
		function loggedInUser(user) { 
			if (arguments.length === 0)
				return _user;

			_user = user;

			 getActiveDashboard().then(function (activeDashboard) { 
				_activeDashboard = activeDashboard;
			});
		}
		
		function getActiveDashboard() { 
			return faDashboard.query().$promise.then(function (dashboards) { 
				var activeDashboard = _.find(dashboards, function (dashboard) {
					return dashboard.isActive;
				});
					
				return activeDashboard;
			});
		}
		
		function activeDashboard(dashboard) {
			if (arguments.length === 0)
				return _activeDashboard;

			_activeDashboard = dashboard;
		}

		return {
			loggedInUser: loggedInUser,
			activeDashboard: activeDashboard
		};
	}
	
	return faCommonSvc;
});

