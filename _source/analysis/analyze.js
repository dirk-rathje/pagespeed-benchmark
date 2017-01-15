"use strict";

const psi = require('psi');
const GLOB = require('glob');
const FS = require('fs');
const D3 = require('d3');
const SS = require("simple-statistics")


const RE = new RegExp(/_measurements\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)\/browsertime\.json/);




let best_practices = GLOB.sync('_source/pug/best-practices/**.pug')
    .filter(f => { return (f.indexOf("template.pug") === -1 && f.indexOf("index.pug") === -1) })
    .map(f => f.replace(/\.pug/, "").replace("_source/pug/best-practices/", ""))

let http_versions = ["1.1"]

let connections = ["3g", "cable"];

let result = {};

best_practices.forEach(bp => {
    let url_http_1 = 'https://pagespeed-benchmark-http-1.4pi.eu/best-practices/' + bp + ".html";
    let url_http_2 = 'https://pagespeed-benchmark.4pi.eu/best-practices/' + bp + ".html";
    result[bp] = {
        name: bp,
        url_http_1,
        url_http_2
    }
})

result = getBrowsertimeData(result)
getGooglePagespeedAnanlysis(result)


function getBrowsertimeData(parentResult) {

    let result = JSON.parse(JSON.stringify(parentResult))

    const browsertimeFiles = GLOB.sync("_measurements/**/browsertime.json")
    let measurements = []

    browsertimeFiles.forEach(f => {

        console.log(f)


        let matches = f.match(RE)
       
        let pagespeed_benchmark_version = matches[1]
        let host = matches[2]
        let connection = matches[3]
        let browser = matches[4]
        let url = matches[5]
        let datetime = matches[6]
    
        let fileContent = FS.readFileSync(f).toString()
        let browsertimeMeasurement = JSON.parse(fileContent)

        let http_version = "";
        if (browsertimeMeasurement.info.url.startsWith("https://pagespeed-benchmark-http-1.4pi.eu/best-practices/"))
            http_version = "1.1"

        if (browsertimeMeasurement.info.url.startsWith("https://pagespeed-benchmark.4pi.eu/best-practices/"))
            http_version = "2.0"


        let name = browsertimeMeasurement.info.url.replace("https://pagespeed-benchmark-http-1.4pi.eu/best-practices/", "").replace("https://pagespeed-benchmark.4pi.eu/best-practices/", "")
            .replace(".html", "")
            .replace(/\?.*/, "")


        browsertimeMeasurement.visualMetrics.forEach(visMet => {
            measurements.push({
                connection,
                browser,
                host,
                http_version,
                pagespeed_benchmark_version,
                name,
                resources_count: browsertimeMeasurement.browserScripts[0].timings.resourceTimings.length,
                timestamp: browsertimeMeasurement.info.timestamp,
                speedIndex: visMet.SpeedIndex,
                perceptualSpeedIndex: visMet.PerceptualSpeedIndex,
                firstVisualChange: visMet.FirstVisualChange,
                lastVisualChange: visMet.LastVisualChange,
                url: browsertimeMeasurement.info.url,
                windowSize: browsertimeMeasurement.browserScripts[0].browser.windowSize,
            })
        })
    })


    let nestedMeasurements = D3.nest().key(d => d.name).key(d => d.connection).map(measurements.filter(d => d.host === "grimgerde.fritz.dirk-rathje.de").filter(d => d.pagespeed_benchmark_version === "0.3.0").filter(d => d.http_version === "2.0"));

    nestedMeasurements.each((v, k) => {

        // console.log(k)

        result[k].speedindex_3g_numberOfMeasurements = (v.get("3g")) ? v.get("3g").length : 0;
        result[k].speedindex_3g_mean = (v.get("3g")) ? Math.round(SS.mean(v.get("3g").map(v => v.speedIndex))) : undefined;
        result[k].speedindex_cable_numberOfMeasurements = (v.get("cable")) ? v.get("cable").length : 0;
        result[k].speedindex_cable_mean = (v.get("cable")) ? Math.round(SS.mean(v.get("cable").map(v => v.speedIndex))) : undefined;

        result[k].firstVisualChange_3g_numberOfMeasurements = (v.get("3g")) ? v.get("3g").length : 0;
        result[k].firstVisualChange_3g_mean = (v.get("3g")) ? Math.round(SS.mean(v.get("3g").map(v => v.firstVisualChange))) : undefined;
        result[k].firstVisualChange_cable_numberOfMeasurements = (v.get("cable")) ? v.get("cable").length : 0;
        result[k].firstVisualChange_cable_mean = (v.get("cable")) ? Math.round(SS.mean(v.get("cable").map(v => v.firstVisualChange))) : undefined;

    })
    return result;

}


function getGooglePagespeedAnanlysis(result) {

    let functionsDesktop = [];
    let functionsMobile = [];

    best_practices.forEach(bp => {

        let url_http_1 = 'https://pagespeed-benchmark-http-1.4pi.eu/best-practices/' + bp + ".html?" + Math.random();
        let url_http_2 = 'https://pagespeed-benchmark.4pi.eu/best-practices/' + bp + ".html?" + Math.random();

        let url = url_http_2;
        functionsDesktop.push(psi(url, { nokey: 'true', strategy: 'desktop' }))
        functionsMobile.push(psi(url, { nokey: 'true', strategy: 'mobile' }))
    })


    Promise
        .all(functionsDesktop.concat(functionsMobile))
        .then(results => {

            // console.log(JSON.stringify(results, null, "  "))

            results
                .forEach((res, i) => {

                    if (i < best_practices.length) {
                        result[best_practices[i]].desktop_speed_score = res.ruleGroups.SPEED.score;
                        result[best_practices[i]].numberResources = res.pageStats.numberResources;
                        result[best_practices[i]].totalRequestBytes = res.pageStats.totalRequestBytes;
                        result[best_practices[i]].numberStaticResources = res.pageStats.numberStaticResources;
                        result[best_practices[i]].htmlResponseBytes = res.pageStats.htmlResponseBytes;
                        result[best_practices[i]].imageResponseBytes = res.pageStats.imageResponseBytes;
                        result[best_practices[i]].imageResponsekBytes = Math.round(res.pageStats.imageResponseBytes / 1024);
                        result[best_practices[i]].javascriptResponseBytes = res.pageStats.javascriptResponseBytes;
                        result[best_practices[i]].javascriptResponsekBytes = Math.round(res.pageStats.javascriptResponseBytes / 1024);
                        result[best_practices[i]].cssResponseBytes = res.pageStats.cssResponseBytes;
                        result[best_practices[i]].cssResponsekBytes = Math.round(res.pageStats.cssResponseBytes / 1024);
                        result[best_practices[i]].numberCssResources = res.pageStats.numberCssResources;
                        result[best_practices[i]].numberJsResources = res.pageStats.numberJsResources;
                    } else {
                        result[best_practices[i - best_practices.length]].mobile_speed_score = res.ruleGroups.SPEED.score;

                    }

                })

            let resultJSON = JSON.stringify(result, null, " ");


            console.log(resultJSON)

            
            FS.writeFileSync("_build/htdocs/results.json", resultJSON);

        })

}