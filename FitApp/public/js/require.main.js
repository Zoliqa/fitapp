

(function () {
	require.config({
		baseUrl: "/",
		paths: {
			"app": "public/js/app",
			"angular": "public/lib/angular/angular",
			"angularRoute": "public/lib/angular-route/angular-route",
			"angularResource": "public/lib/angular-resource/angular-resource",
			"jQuery": "public/lib/jQuery/dist/jquery",
			"underscore": "public/lib/underscore/underscore",
			"bootstrap": "public/lib/bootstrap/dist/js/bootstrap",
			"uiBootstrapTpls": "public/lib/angular-bootstrap/ui-bootstrap-tpls",
			"bcrypt": "public/lib/bcryptjs/dist/bcrypt"
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
			"underscore": {
				exports: "underscore"
			},
			"bootstrap": {   
				deps: ["jQuery"],
				exports: "bootstrap"
			},
			"bcrypt": {
				exports: "bcrypt"
			}
		}

		// deps: ["app/faMain"]
	});
	
	require(["app/app.init"]);                  
})();