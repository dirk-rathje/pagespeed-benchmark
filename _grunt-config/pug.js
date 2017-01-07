"use strict";

module.exports = function (grunt, options) {

    // const PATH = require("path");
    // const FS = require("fs");
    // const YAML = require('yamljs');
    // const CSVParse = require('csv-parse/lib/sync');
    // const Stringjs = require('string');
    // const GLOB = require("glob")
    // const GRAY = require("gray-matter")

    // const PUG = require("pug")


    return {
        "best-practices": {
            options: {
                debug: false,
                pretty: true,
                basedir: options.config.paths.source + '/site',
                data: {
                    data: {}
                }
            },
            files: [{
                cwd: '<%= config.paths.source %>/pug',
                src: ['best-practices/*.pug'],
                dest: '<%= config.paths.build.dev_htdocs %>',
                expand: true,
                ext: '.html',

            }]
        }
    }
}