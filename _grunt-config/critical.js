"use strict";

module.exports = function (grunt, options) {

    return {
        test: {
            options: {
                base: './',
                css: [
                    '_build/htdocs/_shared/styles.bootstrap-shaken.min.css',
                ],
                width: 1200,
                height: 800
            },
            src: '_build/htdocs/best-practices/3-1_js-deferring.html',
            dest: '_build/htdocs/best-practices/3-2_critical-css-inlining.html'
        }
    }

}