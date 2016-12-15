"use strict";

module.exports = function (grunt, options) {

    return {
        build_dev: {
            src: ["<%= config.paths.build.dev %>"]
        }
    }
}