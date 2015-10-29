module.exports = function (grunt) {
	
	grunt.initConfig({
		nodemon: {
			dev: {
				script: 'server.js',
				watch: ['*.js', "*.html"]
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-nodemon');
	
	grunt.registerTask('default', ['nodemon']);
};