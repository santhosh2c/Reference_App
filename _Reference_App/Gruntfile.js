module.exports = function(grunt) {
    grunt.initConfig({

        dir: {
            webapp: '_Reference_App',
            dist: 'dist'
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: "<%dir._Reference_App%>",
                    src: [
                        "**",
                        '!test/**'
                    ],
                    dest: "<%dir.dist %>"
                }]
            }
        },

        clean: {
            dist: ['dist']
        },

        openui5_preload: {
            dist: {
                options: {
                    resources: {
                        cwd: 'WebContent',
                        prefix: '_Reference_App/WebContent',
                        src: [
                            '**/*.js',
                            '**/*.fragment.xml',
                            '**/*.view.xml',
                            '**/*.properties',
                            'manifest.json',
                            '!test/**'
                        ]
                    },
                    dest: 'dist'
                },
                components: '_Reference_App/WebContent'
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-openui5");

    grunt.registerTask("build", ["clean:dist", "openui5_preload", "copy"]);
    grunt.registerTask("default", ["clean", "build"]);
}