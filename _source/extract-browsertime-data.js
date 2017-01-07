"use strict";

const Fs = require("fs")
const Glob = require("glob")
var json2csv = require('json2csv');


let result = [];


const files = Glob.sync("browsertime-results/**/browsertime.json")

files.forEach(f => {

    let connection = "";

    if (f.indexOf("cable") > -1)
        connection = "cable";
    if (f.indexOf("3g") > -1)
        connection = "3g";
    if (f.indexOf("3gfast") > -1)
        connection = "3gfast";
    if (f.indexOf("native") > -1)
        connection = "native";

    let fileContent = Fs.readFileSync(f).toString()

    let measurement = JSON.parse(fileContent)

    let http_version = "";
    if (measurement.info.url.startsWith("https://pagespeed-benchmark-http-1.4pi.eu/best-practices/"))
        http_version = "1.1"

    if (measurement.info.url.startsWith("https://pagespeed-benchmark.4pi.eu/best-practices/"))
        http_version = "2.0"
        

    let name = measurement.info.url.replace("https://pagespeed-benchmark-http-1.4pi.eu/best-practices/", "").replace("https://pagespeed-benchmark.4pi.eu/best-practices/", "").replace(".html", "")


    measurement.visualMetrics.forEach(visMet => {
        result.push({
            connection,
            http_version,
            name,
            timestamp: measurement.info.timestamp,
            speedIndex: visMet.SpeedIndex,
            perceptualSpeedIndex: visMet.PerceptualSpeedIndex,
            firstVisualChange: visMet.FirstVisualChange,
            lastVisualChange: visMet.LastVisualChange,
            url: measurement.info.url,
            windowSize: measurement.browserScripts[0].browser.windowSize,
        })
    })
})
let res = JSON.stringify(result, null, "  ")
var csv = json2csv({ data: result });

Fs.writeFileSync("browsertime-results/results.csv", csv)


