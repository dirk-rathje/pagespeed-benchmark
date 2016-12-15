"use strict";

module.exports = function (grunt, options) {

    return {

        options: {
            shorthandCompacting: false,
            roundingPrecision: 3
        },
        prod: {
            files: {
                '<%= config.paths.build.prod %>/_shared/css/default.css': ['<%= config.paths.build.prod %>/_shared/css/default.css'],
                '<%= config.paths.build.prod %>/_shared/css/fonts.css': ['<%= config.paths.build.prod %>/_shared/css/fonts.css']
            }
        }
    }

}