module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bowercopy: {
            options: {
                srcPrefix: 'bower_components'
            },

            styles: {
                options: {
                    destPrefix: 'css/lib'
                },
                files: {
                    'bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css',
                    'font-awesome.min.css': 'font-awesome/css/font-awesome.min.css'
                }
            },

            scripts: {
                options: {
                    destPrefix: 'js/lib'
                },
                files: {
                    'jquery.min.js': 'jquery/dist/jquery.min.js',
                    'bootstrap.min.js': 'bootstrap/dist/js/bootstrap.min.js',
                    'backbone-min.js': 'backbone/backbone-min.js',
                    'underscore-min.js': 'underscore/underscore-min.js'
                }
            },

            fonts: {
                files: {
                    'css/fonts': 'font-awesome/fonts/*'
                }
            }
        },

        jst: {
            compile: {
                options: {
                    templateSettings: {
                        variable: 'data'
                    }
                },
                files: {
                    "js/build/view-templates.js": ["templates/*.html"]
                }
            }
        },

        concat: {
            // 2. Configuration for concatinating files goes here.
            dist: {
                src: [
                    'js/build/view-templates.js',
                    'js/models/*.js', // All JS in the models folder
                    'js/views/*.js', // All JS in the views folder
                    'js/collections/*.js', // All JS in the views folder
                    'js/routes.js',  // This specific file
                    'js/global.js'  // This specific file
                ],
                dest: 'js/build/production.js',
            }
        },

        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/build/global.css': 'css/global.scss'
                }
            }
        },

        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['css/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    //grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['bowercopy', 'jst', 'concat', 'uglify', 'sass']);

};
