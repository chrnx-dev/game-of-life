'use strict';

module.exports = function(grunt) {
	// Unified Watch Object
	var watchFiles = {
		serverJS: ['gruntfile.js', 'app.js', 'src/**/*.js'],
		clientViews: ['public/**/*.html'],
		clientJS: ['public/modules/**/*.js'],
		clientCSS: ['public/modules/**/*.css','!**/theme.css'],
	};


	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			serverJS: {
				files: watchFiles.serverJS,
				tasks: ['jshint'],
				options: {
					livereload: 35730
				}
			},
			clientViews: {
				files: watchFiles.clientViews,
				options: {
					livereload: 35730,
				}
			},
			clientJS: {
				files: watchFiles.clientJS,
				tasks: ['jshint'],
				options: {
					livereload: 35730
				}
			},
			clientCSS: {
				files: watchFiles.clientCSS,
				tasks: ['csslint'],
				options: {
					livereload: 35730
				}
			}
		},

		jshint: {
			all: {
				src: watchFiles.clientJS.concat(watchFiles.serverJS),
				options: {
					jshintrc: true
				}
			}
		},

		csslint: {
			options: {
				csslintrc: '.csslintrc',
			},
			all: {
				src: watchFiles.clientCSS
			}
		},

		nodemon: {
			dev: {
				script: 'app.js',
				options: {
					nodeArgs: ['--debug=5859'],
					ext: 'js,html',
					watch: watchFiles.serverJS
				}
			}
		},

		'node-inspector': {
			custom: {
				options: {
					'web-port': 1337,
					'web-host': 'localhost',
					'debug-port': 5859,
					'save-live-edit': true,
					'no-preload': true,
					'stack-trace-limit': 50,
					'hidden': []
				}
			}
		},

		concurrent: {
			default: ['nodemon', 'watch'],
			debug: ['nodemon', 'watch', 'node-inspector'],
			options: {
				logConcurrentOutput: true
			}
		},

		wiredep: {
      target: {
        src: 'public/index.html' // point to your HTML file.
      }
    }
	});

	require('load-grunt-tasks')(grunt);


	grunt.registerTask('default', ['lint',  'concurrent:default']);

	grunt.registerTask('debug', ['lint', 'concurrent:debug']);

	grunt.registerTask('lint', ['jshint', 'csslint']);



};