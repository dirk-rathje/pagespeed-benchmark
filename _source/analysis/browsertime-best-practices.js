"use strict";


const SHELL = require('shelljs');
const PATH = require('path');
const FS = require('fs');

const GLOB = require('glob');

const COMBINATORICS = require('js-combinatorics');


const PACKAGE_VERSION = require('../../package.json').version;
const HOSTNAME = require('os').hostname();
const NUMBER_OF_ITERATIONS = 1
const BROWSER = "firefox"

let connections = [];
connections.push("cable");
connections.push("3g");

let names = [];
names.push("0-0_starting-point")
names.push("1-1_gzip")
names.push("1-2_image-optimization")
names.push("1-3_asset-minification")
names.push("2-1_icon-inlining")
names.push("2-2_asset-bundling")
names.push("2-3_asset-bundling-shaking")
names.push("3-1_js-deferring")
names.push("3-2_critical-css-inlining")


let http_versions = [];
// http_versions.push("1.1");
http_versions.push("2.0");

let combinations = COMBINATORICS.cartesianProduct(names, connections, http_versions).toArray()

combinations.forEach(combination => {

    let name = combination[0]
    let connection = combination[1]
    let http_version = combination[2]

    console.log("measuring ", name, connection, http_version);

    let url = "";

    if (http_version === "1.1")
        url = "https://pagespeed-benchmark-http-1.4pi.eu/best-practices/" + name + ".html"
    else
        url = "https://pagespeed-benchmark.4pi.eu/best-practices/" + name + ".html"


    let dockerRunCommand =
        'docker run --privileged --shm-size=1g --rm -v "$(pwd)":/browsertime-results sitespeedio/browsertime -n ' + NUMBER_OF_ITERATIONS + ' --speedIndex --viewPort 1024x800 -b ' + BROWSER + ' -c ' + connection + ' ' + url;

    let resultPath = PATH.join(__dirname, '/../../_measurements/', PACKAGE_VERSION, HOSTNAME, connection, BROWSER);

    console.log("cd to ", resultPath)

    SHELL.mkdir('-p', resultPath)
    SHELL.cd(resultPath)

    if (SHELL.exec(dockerRunCommand).code !== 0) {
        SHELL.echo('Error: docker Command failed');
        SHELL.exit(1);
    } else {

        SHELL.echo('Succes: ' + dockerRunCommand);
    }
})




const jpgs = GLOB.sync("_measurements/**/*.jpg")

jpgs.forEach(f => {

    console.log(f)

    FS.unlinkSync(f)
})


const videoDirs = GLOB.sync("_measurements/**/video")
var exec = require('child_process').exec;

videoDirs.forEach(f => {

    console.log(f)


    exec('rm -r ' + f, function (err, stdout, stderr) {
        // your callback goes here
    });

})



const hars = GLOB.sync("_measurements/**/*.har")

hars.forEach(f => {

    console.log(f)

    FS.unlinkSync(f)
})

