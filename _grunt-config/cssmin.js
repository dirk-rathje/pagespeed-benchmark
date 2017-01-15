"use strict";

module.exports = function (grunt, options) {

    return {

        options: {
            shorthandCompacting: false,
            roundingPrecision: 3
        },
        prod: {
            files: {
                '<%= config.paths.build.dev_htdocs %>/_shared/fonts.min.css':
                ['<%= config.paths.build.dev_htdocs %>/_shared/fonts.css'],

                '<%= config.paths.build.dev_htdocs %>/_shared/styles.bundled_purified.min.css':
                ['<%= config.paths.build.dev_htdocs %>/_shared/styles.bundled_purified.css'],

                '<%= config.paths.build.dev_htdocs %>/_shared/styles.bundled.min.css':
                ['<%= config.paths.build.dev_htdocs %>/_shared/styles.bundled.css'],

                '<%= config.paths.build.dev_htdocs %>/_shared/styles.icons-external.min.css':
                ['<%= config.paths.build.dev_htdocs %>/_shared/styles.icons-external.css'],

                '<%= config.paths.build.dev_htdocs %>/_shared/styles.min.css':
                ['<%= config.paths.build.dev_htdocs %>/_shared/styles.css'],
            }
        }
    }

}