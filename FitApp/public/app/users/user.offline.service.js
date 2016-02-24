
define([], function () { 

	function userOfflineService($q, _, bcrypt, dbService) {
		var currentUser;
		var service = {
			get: get,
			login: login
		};
		
		return service;
		
		function get() { 
			return { $promise: $q.when(currentUser) };
		}	

		function login(credentials) {
			var deferred = $q.defer();
			
			dbService.getAllUsers().then(function (users) {
				currentUser = _.find(users, function (user) {
					var isMatch = credentials.username === user.username && bcrypt.compareSync(credentials.password, user.password);

					return isMatch;
				});

				deferred.resolve(currentUser);
			});

			return { $promise: deferred.promise };
		}
	}

	return userOfflineService;
});