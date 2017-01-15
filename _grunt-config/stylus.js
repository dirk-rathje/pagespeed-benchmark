"use strict";
let bootstrap = require('bootstrap-styl');


module.exports = function (grunt, options) {

    // var postcss = function() {
    //     return require('poststylus')(['autoprefixer', 'rucksack-css', 'nanocss']);
    // };

    return {
        "uncompressed": {
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

                "<%= config.paths.build.dev_htdocs %>/_uncompressed/fonts.css": "<%= config.paths.source %>/styles/fonts.styl",

                "<%= config.paths.build.dev_htdocs %>/_uncompressed/styles.css": "<%= config.paths.source %>/styles/styles.styl",

                "<%= config.paths.build.dev_htdocs %>/_uncompressed/styles.icons-external.css": "<%= config.paths.source %>/styles/styles.icons-external.styl",

            }
        },
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

                "<%= config.paths.build.dev_htdocs %>/_shared/styles.icons-external.css": "<%= config.paths.source %>/styles/styles.icons-external.styl",

                "<%= config.paths.build.dev_htdocs %>/_shared/styles.bundled.css": "<%= config.paths.source %>/styles/styles.bundled.styl",


            }
        }
    }
}