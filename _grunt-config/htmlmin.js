"use strict";

module.exports = function (grunt, options) {

    return {

        prod: { // Target
            options: { // Target options
                removeComments: true,
                collapseWhitespace: true
            },
            files: [{
                cwd: '<%= config.paths.build.prod %>',
                src: ['**/*.html'],
                dest: '<%= config.paths.build.prod %>',
                expand: true,
                ext: '.html'
            }]

        }
    }

}