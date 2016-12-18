"use strict";

module.exports = function(grunt, options) {

    let path = require("path")

    return {

        options: {
            mode: 'gzip'
        },
        files: {
            expand: true,
            cwd: '<%= config.paths.build.dev_htdocs_version %>/_shared/',
            src: ['**.*'],
            dest: '<%= config.paths.build.dev_htdocs_version %>/_shared_compressed/',
            rename: function(dest, matchedSrcPath, options) {
                return path.join(dest, matchedSrcPath) + ".gz";
            }
        },

    }

}
