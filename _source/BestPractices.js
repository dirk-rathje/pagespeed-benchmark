"use strict";

module.exports = {


    "compress": ["compress", "dont-compress"],

    "minify": ["minify", "dont-minify"],

    "jslibraries": ["jslibraries-external",
        // "jslibraries-bundled", 
        "jslibraries-shaken"
    ],

    "bootstrap": ["bootstrap-bundled-shaken"]


}