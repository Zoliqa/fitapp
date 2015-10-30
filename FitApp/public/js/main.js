
(function () {
	require.config({
		baseUrl: "/",
		paths: {
			"app": "public/js/app",
			"angular": "public/js/lib/angular/angular",
			"angularRoute": "public/js/lib/angular-route/angular-route",
			"jQuery": "public/js/lib/jQuery/dist/jQuery",
			"underscore": "public/js/lib/underscore/underscore"
		},
		
		shim: {
			'angular': {
				exports: 'angular'
			},
			'angularRoute': {
				deps: ["angular"],
				exports: 'angularRoute'
			},
			"jQuery": {
				exports: "jQuery"
			},
			"underscore": {
				exports: "underscore"
			}
		}

		// deps: ["app/faMain"]
	});
	
	require(["app/faMain"]);
})();