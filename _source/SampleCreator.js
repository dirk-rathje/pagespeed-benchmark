'use strict';

const Fs = require('fs');
const Pug = require('pug');
const Combinatorics = require('js-combinatorics');
const values = require('object.values');
const Merge = require('merge');
const Mkdirp = require('mkdirp');
const pkg = require('../package.json');
const D3 = require('d3');
const bestPractices = require('./BestPractices.js');

const pugOptions = {
    basedir: '_source/pug'
};


module.exports = class SampleCreator {

    constructor() {

        if (!Object.values) {
            values.shim();
        }



    }

    getBestPracticeCombinations() {

        let optionsArray = Object.values(bestPractices);
        let cartesianProduct = Combinatorics.cartesianProduct(...optionsArray).toArray()
        return cartesianProduct;

    }

    createBestPracticeSamples() {


        let bestPracticeCombinations = this.getBestPracticeCombinations();

        let index_options = {
            data: {
                configurations: []
            }
        }


        for (let configuration of bestPracticeCombinations) {
            let configuration_string = configuration.join("__");
            index_options.data.configurations.push({
                elements: configuration,
                str: configuration_string
            })

            let local_options = {};
            local_options.data = {};
            let i = 0
            for (let key of Object.keys(bestPractices)) {
                local_options.data[key] = configuration[i]
                i++
            }


            let html = Pug.renderFile('_source/pug/page.pug', Merge(pugOptions, local_options));
            let pathName = __dirname + "/../_build/htdocs/" + configuration_string + "/";
            let fileName = pathName + "index.html"
            Mkdirp.sync(pathName)

            Fs.writeFileSync(fileName, html)
            console.log(configuration_string)


        }
        console.log("numer of combinations: ", bestPracticeCombinations.length);

        let html = Pug.renderFile('_source/pug/index.pug', Merge(pugOptions, index_options));
        let pathName = __dirname + "/../_build/htdocs/";
        let fileName = pathName + "index.html"
        Fs.writeFileSync(fileName, html)



    }


    createTCPSlowStartSamples() {

        let css_comment = "/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id.*/\n";


        // ----------------------

        let simple_options = {};
        simple_options.data = {};

        let combinations_script = ""

        let pathName = __dirname + "/../_build/htdocs/tcp-slow-start/";

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

                let html = Pug.renderFile('_source/pug/simple.pug', Merge(pugOptions, simple_options));

                let fileName = pathName + "index-" + p + "-" + c + ".html"

                console.log(fileName)
                Fs.writeFileSync(fileName, html)

                combinations_script += "/Users/dirk/Projekte/kunde-KfB/beschleunigerphysik.de/201-web/browsertime/bin/browsertime.js https://www.dirk-rathje.de/lab/tcp-slow-start/" + "index-" + p + "-" + c + ".html -b chrome -n 3 --viewPort 800x600 \n\n"; // --filename index-" + p + "-" + c + ".json \n\n"

            }
        }

        Fs.writeFileSync(__dirname + "/../_build/tcp-slow-start.sh", combinations_script)
    }

};