module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		nodemon: {
			dev: {
				script: 'server.js',
				watch: ['*.js']
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
		watch: {
			styles: {
				files: ['public/css/**/*.less'],
				tasks: ['less'],
				options: {
					nospawn: true
				}
			}
		},
		concurrent: {
			dev: {
				tasks: ['nodemon', 'watch', 'less'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-less');
	
	grunt.registerInitTask('default', 'concurrent:dev');
};