"use strict";

module.exports = function (grunt, options) {

    return {
        htdocs: {
            src: ["<%= config.paths.build.dev_htdocs %>"]
        },
        browsertime: {
            src: ["<%= config.paths.build.browwsertime %>"]
        },
        grunticon: {
            src: ["<%= config.paths.build.grunticon %>"]
        }

    }
}