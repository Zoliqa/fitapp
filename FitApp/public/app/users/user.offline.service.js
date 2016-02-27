
define(["angular"], function (angular) { 

	function userOfflineService($q, _, bcrypt, dbService) {
		var currentUser;
		var service = {
			get: get,
			login: login
		};
		
		return service;
		
		function get() { 
			return { $promise: $q.when(angular.copy(currentUser)) };
		}	

		function login(credentials) {
			var deferred = $q.defer();
			
			dbService.getAllUsers().then(function (users) {
				currentUser = _.find(users, function (user) {
					var isMatch = credentials.username === user.username && bcrypt.compareSync(credentials.password, user.password);

					return isMatch;
				});
				
				currentUser = angular.copy(currentUser);

				deferred.resolve(currentUser);
			});

			return { $promise: deferred.promise };
		}
	}

	return userOfflineService;
});