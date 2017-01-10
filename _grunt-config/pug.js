"use strict";

module.exports = function (grunt, options) {

    // const PATH = require("path");
    // const FS = require("fs");
    // const YAML = require('yamljs');
    // const CSVParse = require('csv-parse/lib/sync');
    // const Stringjs = require('string');
    const GLOB = require("glob")
    // const GRAY = require("gray-matter")

    // const PUG = require("pug")

    let best_practices = GLOB.sync('_source/pug/best-practices/**.pug')
        .filter(f => { return (f.indexOf("template.pug") === -1 && f.indexOf("index.pug") === -1) })
        .map(f => f.replace(/\.pug/, ".html").replace("_source/pug", ""))


    best_practices = best_practices


    return {
        "best-practices": {
            options: {
                debug: false,
                pretty: true,
                basedir: options.config.paths.source + '/site',
                data: {
                    data: {
                        best_practices
                    }
                }
            },
            files: [{
                cwd: '<%= config.paths.source %>/pug',
                src: ['best-practices/*.pug'],
                dest: '<%= config.paths.build.dev_htdocs %>',
                expand: true,
                ext: '.html',

            }]
        },
        "result": {
            options: {
                debug: false,
                pretty: true,
                basedir: options.config.paths.source + '/site',
                data: {
                    data: {
                        best_practices
                    }
                }
            },
            files: [{
                cwd: '<%= config.paths.source %>/pug',
                src: ['results/*.pug'],
                dest: '<%= config.paths.build.dev_htdocs %>',
                expand: true,
                ext: '.html',

            }]
        }
    }
}