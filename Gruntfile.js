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

    grunt.registerTask('build', ['clean', 'webpack', 'grunticon', 'stylus', 'copy', 'createSample']);
    grunt.registerTask('measure', ['sitespeedio:bestPractices']);

    grunt.registerTask('default', ['build', 'measure']);


    grunt.registerTask('createSample', 'A sample task that logs stuff.', function () {

        const SampleCreator = require("./_source/SampleCreator.js")

        let sampleCreator = new SampleCreator();
        sampleCreator.createBestPracticeSamples()
        sampleCreator.createTCPSlowStartSamples()
    });

};