"use strict";

var webpack = require("webpack");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

module.exports = function (grunt, options) {

    let dev = {
        // configuration
        entry: {

            "script": [
                "./_source/scripts/script.js"
            ],
        },
        output: {

            
            path: "./_build/htdocs/_shared/",
            filename: "script.js"

        },
        externals: {
            "d3": "d3",
            "topojson": "topojson",
            "jQuery": "jQuery"
        },
        resolve: {



            extensions: [".js"],
            // extensions that are used

        },

        module: {
            rules: [

                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader'
                },

                {
                    enforce: "pre",
                    test: /\.json?$/,
                    loader: 'json-loader',
                }
            ]
        },
        plugins: [

            new StatsWriterPlugin({
                filename: "webpack-stats.json" // Default
            })
        ],

        // devtool: 'eval',

        devServer: {
            inline: true,
            hot: true
        },
        stats: {
            colors: true,
            modules: false,
            reasons: true
        },
        watch: false,
        target: "web"
    };

    let uncompressed = {
        // configuration
        entry: {

            "script": [
                "./_source/scripts/script.js"
            ],
        },
        output: {

            
            path: "./_build/htdocs/_uncompressed/",
            filename: "script.js"

        },
        externals: {
            "d3": "d3",
            "topojson": "topojson",
            "jQuery": "jQuery"
        },
        resolve: {



            extensions: [".js"],
            // extensions that are used

        },

        module: {
            rules: [

                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader'
                },

                {
                    enforce: "pre",
                    test: /\.json?$/,
                    loader: 'json-loader',
                }
            ]
        },
        plugins: [

            new StatsWriterPlugin({
                filename: "webpack-stats.json" // Default
            })
        ],

        // devtool: 'eval',

        devServer: {
            inline: true,
            hot: true
        },
        stats: {
            colors: true,
            modules: false,
            reasons: true
        },
        watch: false,
        target: "web"
    };

    let prod = {
        // configuration
        entry: {

            "script": [
                "./_source/scripts/script.js"
            ],

        },
        output: {

            
            path: "./_build/htdocs/_shared/",
            filename: "script.jslibraries-shaken.js"

        },
        externals: {
            // "d3": "d3"
        },
        resolve: {
            // directories where to look for modules

            extensions: [".js"],
            // extensions that are used

        },

        module: {
            rules: [

                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    
                },

                {
                    enforce: "pre",
                    test: /\.json?$/,
                    loader: 'json-loader',
                }
            ]
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: true
                }
            }),
        ],

        devServer: {
            inline: true,
            hot: true
        },
        stats: {
            colors: true,
            modules: false,
            reasons: true
        },
        watch: false,
        target: "web"
    };


    return {

        dev: dev,
           uncompressed: uncompressed,
        prod: prod
    }
}