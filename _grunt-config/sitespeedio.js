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
                outputFolder: '_build/reports/sitespeedio/pagespeed-benchmark/'
            }
        },
        "single-https-roundtrip": {
            options: {
                urls: ['https://www.dirk-rathje.de/lab/pagespeed-benchmark/tcp-slow-start/index-0-0.html'],
                browsertime: {
                    delay: 2000,
                    browser: 'chrome',
                    // "connectivity": 'cable',
                    iterations: 1,
                },
                urlsMetaData: [],
                outputFolder: '_build/reports/sitespeedio_single-https-roundtrip'
            }
        },
        "single-http-roundtrip": {
            options: {
                urls: ['http://www.dirk-rathje.de/lab/pagespeed-benchmark/tcp-slow-start/index-0-0.html'],
                browsertime: {
                    delay: 2000,
                    browser: 'chrome',
                    // "connectivity": 'cable',
                    iterations: 1,
                },
                urlsMetaData: [],
                outputFolder: '_build/reports/sitespeedio_single-http-roundtrip'
            }
        },
        "desy": {
            options: {
                urls: ['https://www.desy.de'],
                browsertime: {
                    delay: 2000,
                    browser: 'chrome',
                    // "connectivity": 'cable',
                    iterations: 3,
                },
                urlsMetaData: [],
                outputFolder: '_build/reports/sitespeedio_desy'
            }
        },
        // "beschleunigerphysik20161220": {
        //     options: {
        //         urls: ['https://www.beschleunigerphysik.de/'],
        //         browsertime: {
        //             delay: 2000,
        //             browser: 'chrome',
        //             // "connectivity": 'cable',
        //             iterations: 5,
        //         },
        //         urlsMetaData: [],
        //         outputFolder: '_build/reports/sitespeedio_beschleunigerphysik20161220'
        //     }
        // },
        "beschleunigerphysik20161221": {
            options: {
                urls: ['https://www.beschleunigerphysik.de/'],
                browsertime: {
                    delay: 2000,
                    browser: 'chrome',
                    // "connectivity": 'cable',
                    iterations: 5,
                },
                urlsMetaData: [],
                outputFolder: '_build/reports/sitespeedio_beschleunigerphysik20161221'
            }
        }
    }
}