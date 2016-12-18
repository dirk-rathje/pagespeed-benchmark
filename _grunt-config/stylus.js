"use strict";
let bootstrap = require('bootstrap-styl');


module.exports = function (grunt, options) {

    // var postcss = function() {
    //     return require('poststylus')(['autoprefixer', 'rucksack-css', 'nanocss']);
    // };

    return {
        "dev": {
            "options": {
                "compress": false,
                "use": [
                    null
                ],
                "paths": [
                    "node_modules/bootstrap-styl"
                ]
            },
            "files": {
                "<%= config.paths.build.dev_htdocs %>/_shared/fonts.css": "<%= config.paths.source %>/styles/fonts.styl",

                "<%= config.paths.build.dev_htdocs %>/_shared/styles.css": "<%= config.paths.source %>/styles/styles.styl",

                "<%= config.paths.build.dev_htdocs %>/_shared/styles.bootstrap.css": "<%= config.paths.source %>/styles/styles.bootstrap.styl",

                "<%= config.paths.build.dev_htdocs %>/_shared/styles.bootstrap-shaken.css": "<%= config.paths.source %>/styles/styles.bootstrap-shaken.styl"
            }
        },
        "dev_min": {
            "options": {
                "compress": true,
                "use": [
                    null
                ],
                "paths": [
                    "node_modules/bootstrap-styl"
                ]
            },
            "files": {
                "<%= config.paths.build.dev_htdocs %>/_shared/fonts.min.css": "<%= config.paths.source %>/styles/fonts.styl",

                "<%= config.paths.build.dev_htdocs %>/_shared/styles.min.css": "<%= config.paths.source %>/styles/styles.styl",

                "<%= config.paths.build.dev_htdocs %>/_shared/styles.bootstrap.min.css": 
                
                "<%= config.paths.source %>/styles/styles.bootstrap.styl",

                "<%= config.paths.build.dev_htdocs %>/_shared/styles.bootstrap-shaken.min.css": "<%= config.paths.source %>/styles/styles.bootstrap-shaken.styl"
            }
        },

    }
}