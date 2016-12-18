"use strict";

const Fs = require("fs")

let result = [];

for (let c = 0; c <= 20; c += 2) {

    for (let p = 0; p <= 20; p += 2) {

        let fileName = "../browsertime-results/www.dirk-rathje.de-lab-0.1.0-tcp-slow-start-index-" + p + "-" + c + ".html/browsertime.json"


        let measurement = require(fileName)


        result.push({

            p: p,
            c: c,
            firstPaint_median: measurement.statistics.timings.rumSpeedIndex.median,
            domContentLoadedTime: 
            measurement.statistics.timings.pageTimings.domContentLoadedTime.median,
            pageLoadTime: 
            measurement.statistics.timings.pageTimings.pageLoadTime.median

        })


    }


}
Fs.writeFileSync("results.json", JSON.stringify(result))