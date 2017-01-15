"use strict";

module.exports = function (grunt, options) {

    return {
        test: {
            options: {
                base: '.',
                width: 1200,
                height: 800,
                minify: true
            },

            css: ['_build/htdocs/_shared/styles.bundled_purified.min.css'],
            src: '_build/htdocs/best-practices/3-1_js-deferring.html',
            dest: '_build/htdocs/best-practices/3-2_critical-css-inlining.html'
        }
    }

}