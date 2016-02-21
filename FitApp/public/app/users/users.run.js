
define([], function () { 

	function usersRun($rootScope, userService, USER_LOGGED_IN) {
		userService.get(function (user) {
			if (user._id)
				$rootScope.$emit(USER_LOGGED_IN);
		});
	}

	return usersRun;
});