
define(["underscore"], function (_) {
	function faCommonSvc($q, $http) {
		var _user, _activeDashboard;
		
		function loggedInUser(user) { 
			if (arguments.length === 0)
				return _user;

			_user = user;
		}
		
		function activeDashboard(activeDashboard) {
			if (arguments.length === 0)
				return _activeDashboard;
			
			_activeDashboard = activeDashboard;
		}
		
		function getActiveDashboard() {
			return $http.get("/dashboard").then(function (result) { 
				var activeDashboard = _.find(result.data.dashboards, function (dashboard) {
					return dashboard.isActive;
				});
						
				activeDashboard(activeDashboard);

				return $q.when({ activeDashboard: activeDashboard });
			});
		}

		return {
			loggedInUser: loggedInUser,
			activeDashboard: activeDashboard,
			getActiveDashboard: getActiveDashboard

		};
	}
	
	return faCommonSvc;
});

