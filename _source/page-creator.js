'use strict';

const Fs = require('fs');
const Pug = require('pug');
const Combinatorics = require('js-combinatorics');
const values = require('object.values');
const Merge = require('merge');
const Mkdirp = require('mkdirp');

module.exports = class PageCreator {

    constructor() {

        const opts = {

            "compress": ["dont_compress", "compress"],

            "defer_scripts": ["defer_scripts", "dont_defer_scripts"],

            "minify": ["minify", "dont_minify"],

            "js_libraries": ["jquery_d3_external",  "jquery_d3_bundled",  "d3_bundled", "d3_tree_shaken"],

            "bootstrap": ["bootstrap_external",  "bootstrap_bundled",  "bootstrap_bundled_shaken"]

        }

        let options = {
            basedir: '_source/pug'
        };
        if (!Object.values) {
            values.shim();
        }

        let optionsArray = Object.values(opts);
        let cartesianProduct = Combinatorics.cartesianProduct(...optionsArray).toArray()


        let dockerfile = "";

        for (let configuration of cartesianProduct) {

            let configuration_string = configuration.join("-");

            let local_options = {};
            local_options.data = {};
            let i = 0
            for (let key of Object.keys(opts)) {
                local_options.data[key] = configuration[i]
                i++
            }


            let html = Pug.renderFile('_source/pug/page.pug', Merge(options, local_options));
            let pathName = __dirname + "/../_build/dev/" + configuration_string + "/";
            let fileName = pathName + "index.html"
            Mkdirp.sync(pathName)
            console.log(configuration_string)

            Fs.writeFileSync(fileName, html)

            dockerfile += '\ndocker run --privileged --shm-size=1g --rm -v "$(pwd)":/sitespeed.io sitespeedio/sitespeed.io https://s3.eu-central-1.amazonaws.com/www.4pi.eu/' + configuration_string + '/index.html -b chrome'
            
        }
            console.log("numer of combinations: ", cartesianProduct.length);

           Fs.writeFileSync( __dirname + "/../_build/docker.sh", dockerfile)

    }

};