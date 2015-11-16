
define(["underscore"], function (_) {
	function faCommonSvc($q, $http) {
		var _user, 
			_dashboards,
			_getDashboardsDeferred;
		
		function loggedInUser(user) { 
			if (arguments.length === 0)
				return _user;

			_user = user;
			_getDashboardsDeferred = null;
		}
		
		function getActiveDashboard() {
			if (!_dashboards)
				return null;

			var activeDashboard = _.find(_dashboards, function (dashboard) {
				return dashboard.isActive;
			});

			return activeDashboard;
		}
		
		function getDashboards() {
			if (!_getDashboardsDeferred) {
				_getDashboardsDeferred = $q.defer();
				
				$http.get("/dashboard").then(function (result) {
					_dashboards = result.data.dashboards;
					
					_getDashboardsDeferred.resolve({
						dashboards: _dashboards
					});
				});
			}

			return _getDashboardsDeferred.promise;
		}

		return {
			loggedInUser: loggedInUser,
			getActiveDashboard: getActiveDashboard,
			getDashboards: getDashboards
		};
	}
	
	return faCommonSvc;
});

