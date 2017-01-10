"use strict";


const SHELL = require('shelljs');

const COMBINATORICS = require('js-combinatorics');

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
        url = "https://pagespeed-benchmark-http-1.4pi.eu/best-practices/" + name + ".html?" + Math.random();
    else
        url = "https://pagespeed-benchmark.4pi.eu/best-practices/" + name + ".html?" + Math.random();


    let dockerRunCommand =
        'docker run --privileged --shm-size=1g --rm -v "$(pwd)":/browsertime-results sitespeedio/browsertime -n 3 --speedIndex --viewPort 1024x800  -c ' + connection + ' ' + url;

    let resultPath = __dirname + '/../../_build/reports/browsertime/measurements/' + connection;

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

