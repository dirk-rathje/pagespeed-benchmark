"use strict";

module.exports = function (grunt, options) {

    return {

        prod: { // Target
            options: { // Target options
                removeComments: true,
                collapseWhitespace: true
            },
            files: [{
                cwd: '<%= config.paths.build.dev_htdocs %>',
                src: ['**/*.html'],
                dest: '<%= config.paths.build.dev_htdocs %>',
                expand: true,
                ext: '.html'
            }]

        }
    }

}