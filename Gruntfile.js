'use strict';


const benchmark_opts = {

    "jquery": ["external",  "external_defer",  "external_min",  "external_min_defer", "bundled",  "replaced_by_d3"],

    "d3": ["external", "external_defer", "external_min_defer",  "external_min", "bundled",  "tree_shaken"],

    "bootstrap": ["external", "external_min", "bundled",  "tree_shaken"]

}


module.exports = function (grunt) {
    var options = {
        config: {
            src: "_grunt-config/**.*"
        }
    };


    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    //loads the various task configuration files
    var configs = require('load-grunt-configs')(grunt, options);


    grunt.initConfig(configs);

    grunt.registerTask('build', ['clean', 'copy', 'createPages', 'compress']);

    // grunt.registerTask('default', ['build']);


    grunt.registerTask('createPages', 'A sample task that logs stuff.', function () {
        // if (arguments.length === 0) {
        //     grunt.log.writeln(this.name + ", no args");
        // } else {
        //     grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
        // }

        const PageCreator = require("./_source/page-creator.js")

        let pageCreator = new PageCreator();

    });
};