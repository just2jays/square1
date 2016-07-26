module.exports = function(grunt) {

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
                    'font-awesome.min.css': 'font-awesome/css/font-awesome.min.css',
                    'animate.min.css': 'animate.css/animate.min.css'
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
            dist: {
                src: [
                    'js/build/view-templates.js',
                    'js/models/*.js',
                    'js/views/*.js',
                    'js/collections/*.js',
                    'js/routes.js',
                    'js/global.js'
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
            sass: {
                files: [
                    'css/*.scss'
                ],
                tasks: ['sass']
            },

            scripts: {
                files: [
                    'js/collections/*.js',
                    'js/models/*.js',
                    'js/views/*.js',
                    'js/routes.js',
                    'js/global.js'
                ],
                tasks: ['jst', 'concat', 'uglify']
            }
        }

    });

    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['bowercopy', 'jst', 'concat', 'uglify', 'sass', 'watch']);

};
