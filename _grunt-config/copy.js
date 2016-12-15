"use strict";

const Fs = require("fs")


module.exports = function (grunt, options) {


    return {

        "fonts_dev": {
            "expand": true,
            "cwd": "<%= config.paths.source %>/fonts",
            "src": "**",
            "dest": "<%= config.paths.build.dev %>/_shared/fonts"
        },

        "favicons": {
            "expand": true,
            "cwd": "<%= config.paths.source %>/images",
            "src": "favicon.*",
            "dest": "<%= config.paths.build.dev %>/"
        },


        "external_scripts": {
            "expand": true,
            "flatten": true,
            "cwd": "",
            "src": ["node_modules/bootstrap/dist/css/bootstrap.css", "node_modules/bootstrap/dist/css/bootstrap.min.css", "node_modules/jquery/dist/jquery.js", "node_modules/jquery/dist/jquery.min.js", "node_modules/d3/build/d3.js", "node_modules/d3/build/d3.min.js"],
            "dest": "<%= config.paths.build.dev %>/_shared",
        },


    }
}