"use strict";

const Fs = require("fs")


module.exports = function (grunt, options) {


    return {

        "fonts_dev": {
            "expand": true,
            "cwd": "<%= config.paths.source %>/fonts",
            "src": "**",
            "dest": "<%= config.paths.build.dev_htdocs %>/_shared/fonts"
        },

        "favicons": {
            "expand": true,
            "cwd": "<%= config.paths.source %>/images",
            "src": "favicon.*",
            "dest": "<%= config.paths.build.dev_htdocs %>/"
        },

        "icons": {
            "expand": true,
            "cwd": "<%= config.paths.source %>/images/icons",
            "src": "*.svg",
            "dest": "<%= config.paths.build.dev_htdocs %>/_images/icons"
        },

        "images-00": {
            "expand": true,
            "cwd": "<%= config.paths.source %>/images",
            "src": "pexel*.*",
            "dest": "<%= config.paths.build.dev_htdocs %>/_images/00/"
        },
        "images-01": {
            "expand": true,
            "cwd": "<%= config.paths.source %>/images",
            "src": "pexel*.*",
            "dest": "<%= config.paths.build.dev_htdocs %>/_images/01/"
        },

        "images-02": {
            "expand": true,
            "cwd": "<%= config.paths.source %>/images",
            "src": "pexel*.*",
            "dest": "<%= config.paths.build.dev_htdocs %>/_images/02/"
        },
        "images-03": {
            "expand": true,
            "cwd": "<%= config.paths.source %>/images",
            "src": "pexel*.*",
            "dest": "<%= config.paths.build.dev_htdocs %>/_images/03/"
        },

        "images-04": {
            "expand": true,
            "cwd": "<%= config.paths.source %>/images",
            "src": "pexel*.*",
            "dest": "<%= config.paths.build.dev_htdocs %>/_images/04/"
        },
        "images-05": {
            "expand": true,
            "cwd": "<%= config.paths.source %>/images",
            "src": "pexel*.*",
            "dest": "<%= config.paths.build.dev_htdocs %>/_images/05/"
        },


        "images-06": {
            "expand": true,
            "cwd": "<%= config.paths.source %>/images",
            "src": "pexel*.*",
            "dest": "<%= config.paths.build.dev_htdocs %>/_images/06/"
        },
        "images-07": {
            "expand": true,
            "cwd": "<%= config.paths.source %>/images",
            "src": "pexel*.*",
            "dest": "<%= config.paths.build.dev_htdocs %>/_images/07/"
        },

        "images-08": {
            "expand": true,
            "cwd": "<%= config.paths.source %>/images",
            "src": "pexel*.*",
            "dest": "<%= config.paths.build.dev_htdocs %>/_images/08/"
        },
        "images-09": {
            "expand": true,
            "cwd": "<%= config.paths.source %>/images",
            "src": "pexel*.*",
            "dest": "<%= config.paths.build.dev_htdocs %>/_images/09/"
        },

        "images-10": {
            "expand": true,
            "cwd": "<%= config.paths.source %>/images",
            "src": "pexel*.*",
            "dest": "<%= config.paths.build.dev_htdocs %>/_images/10/"
        },

        "external_scripts": {
            "expand": true,
            "flatten": true,
            "cwd": "",
            "src": [
                "node_modules/bootstrap/dist/css/bootstrap.css", "node_modules/bootstrap/dist/css/bootstrap.min.css", "node_modules/jquery/dist/jquery.js", "node_modules/jquery/dist/jquery.min.js",
                "node_modules/d3/build/d3.js",
                "node_modules/topojson/dist/topojson.min.js",
                "node_modules/topojson/dist/topojson.js",
                "_source/data/maps/ne-selection.topo.json",
                "_source/data/forum-affiliations.json",
                "_source/data/forum-members.json",
                "node_modules/d3/build/d3.js", "node_modules/d3/build/d3.min.js"
            ],
            "dest": "<%= config.paths.build.dev_htdocs %>/_shared",
        },
        "external_scripts_uncompressed": {
            "expand": true,
            "flatten": true,
            "cwd": "",
            "src": [
                "node_modules/bootstrap/dist/css/bootstrap.css", "node_modules/bootstrap/dist/css/bootstrap.min.css", "node_modules/jquery/dist/jquery.js",
                "node_modules/d3/build/d3.js",
            ],
            "dest": "<%= config.paths.build.dev_htdocs %>/_uncompressed"
        },


        "shared": {
            "expand": true,
            "cwd": "<%= config.paths.build.dev_htdocs %>/_shared",
            "src": "**",
            "dest": "<%= config.paths.build.dev_htdocs %>/_shared_compressed"
        },

        "images": {

        }


    }
}