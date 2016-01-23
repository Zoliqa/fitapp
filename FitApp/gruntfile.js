
module.exports = function (grunt) {
	
	require("load-grunt-tasks")(grunt);
	
	grunt.initConfig({
		nodemon: {
			dev: {
				script: "server.js"
			}  
		},
		less: {
			development: {
				options: {
					compress: true,
					optimization: 2
				},
				files: {
					"public/css/index.css": "public/css/less/index.less"
				}
			}
		}, 
		//jasmine_node: {
		//	options: {
		//		forceExit: true,
		//		// match: '.',
		//		// matchall: true,
		//		//extensions: 'js',
		//		// specNameMatcher: 'spec',
		//		runWithRequireJs: true,
		//		requireJsSetup: "specrunner.js"
		//		//jUnit: {
		//		//	report: true,
		//		//	savePath : "./tests/server/", 
		//		//	useDotNotation: true,
		//		//	consolidate: true
		//		//}
		//	},
		//	all: ["public/js/app/tests/"]
		//},
		watch: {
			styles: {
				files: ["public/css/**/*.less"],
				tasks: ["less"],
				options: {
					nospawn: true
				}
			},
			server: {
				files: ['views/index.html']
			},
			tests: {
				files: ["public/js/**/*.js"],
				tasks: ["jasmine_node"]
			}
		},
		concurrent: {  
			dev: {
				tasks: ["nodemon:dev", "watch:styles", "watch:server"],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	});
	
	grunt.registerInitTask("default", "concurrent:dev");

	//grunt.registerTask("watch-tests", "watch:tests");

	//grunt.registerTask("test", "jasmine_node");
};