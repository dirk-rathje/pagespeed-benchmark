"use strict";

module.exports = function (grunt, options) {

    return {
        prod: {
            options: {
                baseDir: "<%= config.paths.build.prod %>",
                assets: ['_shared/**'],
                outputDir: '_shared_hashed/',
                clearOutputDir: true
            },
            files: [{
                expand: true,
                cwd: "<%= config.paths.build.prod %>",
                src: ['**/*.html', '**/*.js', '**/*.css']
            }]
        }
    }
}