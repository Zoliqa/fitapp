
function faCommonSvc() {
	var user = {};
	
	return {
		user: user
	};
}

var faServices = angular.module("faServices", []);

faServices.factory("faCommonSvc", faCommonSvc);

