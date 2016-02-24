
(function () {
	require.config({
		baseUrl: "/",
		paths: {
			"app": "public/app", 
			"angular": "public/lib/angular/angular",
			"angularRoute": "public/lib/angular-route/angular-route",
			"angularResource": "public/lib/angular-resource/angular-resource",
			"jquery": "public/lib/jQuery/dist/jquery",
			"underscore": "public/lib/underscore/underscore",
			"bootstrap": "public/lib/bootstrap/dist/js/bootstrap",
			"uiBootstrapTpls": "public/lib/angular-bootstrap/ui-bootstrap-tpls",
			"bcrypt": "public/lib/bcryptjs/dist/bcrypt",
			"offline": "public/lib/offline/offline",
			"offlineSimulateUI": "public/lib/offlinejs-simulate-ui/offline-simulate-ui.min",
			"dexie": "public/lib/dexie/dist/latest/dexie"
		},
		
		shim: {
			"angular": {
				exports: "angular"
			},
			"angularRoute": {
				deps: ["angular"],
				exports: "angularRoute"
			},
			"angularResource": {
				deps: ["angular"],
				exports: "angularResource"
			},
			"uiBootstrapTpls": {
				deps: ["angular"],
				exports: "uiBootstrapTpls"
			},
			"jQuery": {
				exports: "jQuery"
			},
			"bootstrap": {
				deps: ["jquery"],
				exports: "bootstrap"
			}
		}

		// deps: ["app/faMain"]
	});
	
	require(["app/app.init"]);
})();