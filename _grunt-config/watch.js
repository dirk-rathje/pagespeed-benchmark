"use strict";


module.exports = function (grunt, options) {

    var path = require("path");

    return {
        "options": {
            "livereload": true,
            "nospawn": true
        },


        "webpack": {
            "files": [
                "_source/**/*.js"
            ],
            "tasks": [
                "webpack"
            ]
        },


        "pug": {
            "files": [
                "_source/pug/**/*.pug",
            ],
            "tasks": [
                "pug"
            ],

        },
        "stylus": {
            "files": [
                "_source/**/*.styl",
            ],
            "tasks": [
                "stylus"
            ]
        }
    }
}
