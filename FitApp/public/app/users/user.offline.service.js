
define(["angular"], function (angular) { 

	function userOfflineService($q, _, bcrypt, dbService) {
		var currentUser;
		var service = {
			get: get,
			login: login
		};
		
		return service;
		
		function get() {
			var deferred = $q.defer();

			dbService.getUser(currentUser._id).then(function (user) {
				var copiedUser = angular.copy(user);

				copiedUser.workouts = _.filter(copiedUser.workouts, function (workout) { 
					return !workout.ended;
				});

				deferred.resolve(copiedUser);
			});
			 
			return { $promise: deferred.promise };
		}	

		function login(credentials) {
			var deferred = $q.defer();
			
			dbService.getAllUsers().then(function (users) {
				currentUser = _.find(users, function (user) {
					var isMatch = credentials.username === user.username && bcrypt.compareSync(credentials.password, user.password);

					return isMatch;
				});
				
				deferred.resolve(get().$promise);
			});

			return { $promise: deferred.promise };
		}
	}

	return userOfflineService;
});