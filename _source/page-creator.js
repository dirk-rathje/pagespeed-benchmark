'use strict';

const Fs = require('fs');
const Pug = require('pug');
const Combinatorics = require('js-combinatorics');
const values = require('object.values');
const Merge = require('merge');
const Mkdirp = require('mkdirp');
const pkg = require('../package.json');
const D3 = require('d3');

module.exports = class PageCreator {

    constructor() {

        this.create()
        this.createTCPSlowStartTestFiles()


    }

    create() {

        const opts = {


            "minify": ["minify", "dont-minify"],

            //  ["jquery_d3_external",  "jquery_d3_bundled",  "d3_bundled", 

            "jslibraries": ["jslibraries-external", 
            // "jslibraries-bundled", 
            "jslibraries-shaken"],

            "bootstrap": ["bootstrap-external", "bootstrap-bundled",  "bootstrap-bundled-shaken"]

        }

        let options = {
            basedir: '_source/pug'
        };
        if (!Object.values) {
            values.shim();
        }

        let optionsArray = Object.values(opts);
        let cartesianProduct = Combinatorics.cartesianProduct(...optionsArray).toArray()
        let index_options = {};
        index_options.data = {};
        index_options.data.configurations = [];




        let script_file = "";

        for (let configuration of cartesianProduct) {
            let configuration_string = configuration.join("__");
            index_options.data.configurations.push({
                elements: configuration,
                str: configuration_string
            })

            let local_options = {};
            local_options.data = {};
            let i = 0
            for (let key of Object.keys(opts)) {
                local_options.data[key] = configuration[i]
                i++
            }


            let html = Pug.renderFile('_source/pug/page.pug', Merge(options, local_options));
            let pathName = __dirname + "/../_build/" + pkg.version + "/htdocs/" + pkg.version + "/" + configuration_string + "/";
            let fileName = pathName + "index.html"
            Mkdirp.sync(pathName)
            console.log(configuration_string)

            Fs.writeFileSync(fileName, html)

            // dockerfile += '\ndocker run --privileged --shm-size=1g --rm -v "$(pwd)":/sitespeed.io sitespeedio/sitespeed.io https://s3.eu-central-1.amazonaws.com/pagespeed-benchmark.4pi.eu/' + pkg.version + "/" + configuration_string + '/index.html -b chrome'

            script_file += "/Users/dirk/Projekte/kunde-KfB/beschleunigerphysik.de/201-web/browsertime/bin/browsertime.js https://www.dirk-rathje.de/lab/0.1.0/" + configuration_string + " -b chrome -n 3 --viewPort 800x600 \n\n"; 


        }
        console.log("numer of combinations: ", cartesianProduct.length);

        Fs.writeFileSync(__dirname + "/../_build/" + pkg.version + "/combinations.sh", script_file)

        let html = Pug.renderFile('_source/pug/index.pug', Merge(options, index_options));
        let pathName = __dirname + "/../_build/" + pkg.version + "/htdocs/" + pkg.version + "/";
        let fileName = pathName + "index.html"
        Fs.writeFileSync(fileName, html)






    }


    createTCPSlowStartTestFiles() {

        let css_comment = "/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id.*/\n";


        // ----------------------

        let simple_options = {};
        simple_options.data = {};

        let script_file = ""


        let pathName = __dirname + "/../_build/" + pkg.version + "/htdocs/" + pkg.version + "/tcp-slow-start/";

        Mkdirp.sync(pathName)

        let options = {
            basedir: '_source/pug'
        };

        for (let c = 0; c <= 20; c += 2) {



            let css = "";
            D3.range(c).map(d => css += css_comment)
            let fileName = pathName + "style-" + c + ".css"

            console.log(fileName)
            Fs.writeFileSync(fileName, css)

            for (let p = 0; p <= 20; p += 2) {


                simple_options.data.configurations = [];
                simple_options.data.paragraphs = D3.range(p)
                simple_options.data.external_css_size = c

                let html = Pug.renderFile('_source/pug/simple.pug', Merge(options, simple_options));

                let fileName = pathName + "index-" + p + "-" + c + ".html"

                console.log(fileName)
                Fs.writeFileSync(fileName, html)

                script_file += "/Users/dirk/Projekte/kunde-KfB/beschleunigerphysik.de/201-web/browsertime/bin/browsertime.js https://www.dirk-rathje.de/lab/0.1.0/tcp-slow-start/" + "index-" + p + "-" + c + ".html -b chrome -n 3 --viewPort 800x600 \n\n"; // --filename index-" + p + "-" + c + ".json \n\n"

            }
        }

        Fs.writeFileSync(__dirname + "/../_build/" + pkg.version + "/tcp-slow-start.sh", script_file)
    }

};