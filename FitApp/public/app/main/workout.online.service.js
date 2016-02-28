
define([], function () {
	
	function workoutOnlineService($resource, dbService) {
		var resource = $resource("/workout/:id", null, {
			save: {
				method: "POST"
				//interceptor: {
				//	response: addWorkout
				//}
			},
			update: {
				method: "PUT"
				//interceptor: {
				//	response: deleteWorkout
				//}
			},
			"delete": {
				method: "DELETE"
				//interceptor: {
				//	response: deleteWorkout
				//}
			}
		});
		
		return resource;

		function addWorkout(result) { 
			if (result && result.data && result.data._id) {
				userOnlineService.get().$promise.then(function (user) {
					return dbService.getUser(user._id);
				}).then(function (user) {
					user.workouts = [result.data];
					
					dbService.saveUser(user);
				});
			}
			
			return result && result.data || {};
		}

		function deleteWorkout(result) {
			userOnlineService.get().$promise.then(function (user) {
				return dbService.getUser(user._id);
			}).then(function (user) {
				user.workouts = [];
					
				dbService.saveUser(user);
			});
			
			return result && result.data || {};
		}
	}
	
	return workoutOnlineService;
});