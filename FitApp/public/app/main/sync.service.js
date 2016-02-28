﻿
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
								if (new Date(offlineWorkout.lastModified) > new Date(onlineWorkout.lastModified)) {
									return workoutOnlineService.update({ id: offlineWorkout._id }, offlineWorkout);
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
				
				$q.all(reqs).then(function () { 
					return userOnlineServiceGet().$promise;
				}).then(function (user) {
					dbService.saveUser(user);

					return user;
				}).then(function (user) {
					deferred.resolve(user);
				});
			});
			
			return deferred.promise;
		}
	}
	
	return syncService;
});