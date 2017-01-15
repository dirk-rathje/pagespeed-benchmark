"use strict";


module.exports = function (grunt, options) {

    var path = require("path");

    return {
        "styles.bundled.css": {
            options: {
                minify: false
            },
            src: ['_build/htdocs/best-practices/2-2_asset-bundling.html'],
            css: ['_build/htdocs/_shared/styles.bundled.css'],
            dest: '_build/htdocs/_shared/styles.bundled_purified.css'
        }
    }
}
