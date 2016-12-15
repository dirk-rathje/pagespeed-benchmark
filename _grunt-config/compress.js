"use strict";

module.exports = function(grunt, options) {

    let path = require("path")

    return {

        options: {
            mode: 'gzip'
        },
        files: {
            expand: true,
            cwd: '_build/dev/_shared/',
            src: ['**.*'],
            dest: '_build/dev/_shared_compressed/',
            rename: function(dest, matchedSrcPath, options) {
                return path.join(dest, matchedSrcPath) + ".gz";
            }
        },

    }

}
