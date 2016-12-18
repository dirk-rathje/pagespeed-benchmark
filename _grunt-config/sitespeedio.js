"use strict";

module.exports = function (grunt, options) {

    const SampleCreator = require("../_source/SampleCreator.js")
    const sampleCreator = new SampleCreator();

    let combinations = sampleCreator.getBestPracticeCombinations();
    // let urls = combinations.filter((c, i) => i < 3).map(c => "http://localhost:9001/" + c.join("__"));
    let urls = combinations
        // .filter((c, i) => i < 3)
        .map(c => "https://www.dirk-rathje.de/lab/pagespeed-benchmark/" + c.join("__"));

    return {
        bestPractices: {
            options: {
                urls: urls,
                browsertime: {
                    browser: 'chrome',
                    // "connectivity": 'cable',
                    iterations: 3,
                },
                urlsMetaData: [],
                outputFolder: '_build/reports/'
            }
        }
    }
}