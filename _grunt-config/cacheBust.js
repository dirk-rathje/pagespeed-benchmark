"use strict";

module.exports = function (grunt, options) {

    return {

        "bestpractice": {
            options: {
                baseDir: "_build/htdocs/",
                assets: ['_shared/**'],
                outputDir: '_shared_fingerprinted/',
                clearOutputDir: true
            },
            files: [{
                expand: true,
                cwd: "_build/htdocs/",
                src: ['best-practices/final.html']
            }]
        }

    }
}