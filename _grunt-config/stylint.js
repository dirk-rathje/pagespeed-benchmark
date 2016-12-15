"use strict";

module.exports = function(grunt, options) {
    return {
        options: {
        },
        src: ['_source/styles/**/*.styl', '!_source/styles/bootstrap/**/*.styl']
    }
}
