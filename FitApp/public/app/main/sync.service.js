
define([], function () {
	
	function syncService($q, dbService, workoutOnlineService, cacheService) {
		var service = {
			synchronizeData: synchronizeData
		};
		
		return service;

		function synchronizeData(userOnlineServiceGet, user) {
			var deferred = $q.defer();
			
			dbService.getUser(user._id).then(function (offlineUser) {
				var reqs = [],
					req;
				
				_.each(offlineUser.workouts, function (offlineWorkout) {
					req = workoutOnlineService.get({ id: offlineWorkout._id }).$promise.then(function (onlineWorkout) {
						if (!offlineWorkout.isDeleted) {
							if (!onlineWorkout._id) {
								return workoutOnlineService.save(offlineWorkout);
							}
							else
								if (offlineWorkout.lastModified > onlineWorkout.lastModified) {
									return workoutOnlineService.update({ id: offlineWorkout._id }, workoutOffline);
								}
						}
						else
							if (onlineWorkout._id) {
								return workoutOnlineService.delete({ id: offlineWorkout._id });
							}
					});

					reqs.push(req);
				});
				
				cacheService.invalidate("/user");
				
				$q.all(reqs).then(userOnlineServiceGet).then(dbService.save).then(function () {
					deferred.resolve(user);
				});
			});
			
			return deferred.promise;
		}
	}
	
	return syncService;
});