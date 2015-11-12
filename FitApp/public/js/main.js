
(function () {
	require.config({
		baseUrl: "/",
		paths: {
			"app": "public/js/app",
			"angular": "public/lib/angular/angular",
			"angularRoute": "public/lib/angular-route/angular-route",
			"jQuery": "public/lib/jQuery/dist/jquery",
			"underscore": "public/lib/underscore/underscore",
			"bootstrap": "public/lib/bootstrap/dist/js/bootstrap",
			"uiBootstrapTpls": "public/lib/angular-bootstrap/ui-bootstrap-tpls"
		},
		
		shim: {
			"angular": {
				exports: "angular"
			},
			"angularRoute": {
				deps: ["angular"],
				exports: "angularRoute"
			},
			"uiBootstrapTpls": {
				deps: ["angular"],
				exports: "uiBootstrapTpls"
			},
			"jQuery": {
				exports: "jQuery"
			},
			"underscore": {
				exports: "underscore"
			},
			"bootstrap": {
				deps: ["jQuery"],
				exports: "bootstrap"
			}
		}

		// deps: ["app/faMain"]
	});
	
	require(["app/faMain"]);
})();