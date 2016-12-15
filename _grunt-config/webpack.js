// "use strict";

// var webpack = require("webpack");
// var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

// module.exports = function (grunt, options) {

//     let dev = {
//         // configuration
//         entry: {

//             "kfb": [
//                 "./_source/site/kfb.js"
//             ],

//             "accelerators": [
//                 "./_source/site/accelerators/accelerators.js"
//             ]
//         },
//         output: {

//             library: "AcceleratorsLibrary",
//             path: "./_build/dev/_shared/scripts/",
//             filename: "[name]--webpacked.js",
//             publicPath: '/_build/dev'

//         },
//         externals: {
//             // "d3": "d3",
//             // "topojson": "topojson",
//             // "d3tip": "d3tip",  
//         },
//         resolve: {



//             extensions: [".js"],
//             // extensions that are used

//         },

//         module: {
//             rules: [

//                 {
//                     test: /\.js$/,
//                     exclude: /(node_modules|bower_components)/,
//                     loader: 'babel-loader'
//                         // ,
//                         // query: {
//                         //     presets: ['es2015']
//                         // }
//                 },

//                 {
//                     enforce: "pre",
//                     test: /\.json?$/,
//                     loader: 'json-loader',
//                 }
//             ]
//         },
//         plugins: [

//             new StatsWriterPlugin({
//                 filename: "webpack-stats.json" // Default
//             })
//         ],

//         devtool: 'eval',

//         devServer: {
//             inline: true,
//             hot: true
//         },
//         stats: {
//             colors: true,
//             modules: false,
//             reasons: true
//         },
//         watch: false,
//         target: "web"
//     };

//     let prod = {
//         // configuration
//         entry: {

//             "kfb": [
//                 "./_source/site/kfb.js"
//             ],

//             "accelerators": [
//                 "./_source/site/accelerators/accelerators.js"
//             ]
//         },
//         output: {
//             library: "AcceleratorsLibrary",
//             path: "./_build/prod/_shared/scripts/",
//             filename: "[name]--webpacked.js",
//             publicPath: '/_build/prod'

//         },
//         externals: {
//             // "d3": "d3"
//         },
//         resolve: {
//             // directories where to look for modules

//             extensions: [".js"],
//             // extensions that are used

//         },

//         module: {
//             rules: [

//                 {
//                     test: /\.js$/,
//                     exclude: /(node_modules|bower_components)/,
//                     loader: 'babel-loader',
//                     query: {
//                         presets: ['es2015']
//                     }
//                 },

//                 {
//                     enforce: "pre",
//                     test: /\.json?$/,
//                     loader: 'json-loader',
//                 }
//             ]
//         },
//         plugins: [
//             new webpack.optimize.UglifyJsPlugin({
//                 compress: {
//                     warnings: true
//                 }
//             }),
//         ],

//         devServer: {
//             inline: true,
//             hot: true
//         },
//         stats: {
//             colors: true,
//             modules: false,
//             reasons: true
//         },
//         watch: false,
//         target: "web"
//     };


//     return {

//         dev: dev,
//         prod: prod
//     }
// }