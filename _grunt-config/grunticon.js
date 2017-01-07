module.exports = function(grunt, options) {

    var path = require("path");

    return {
        files: {
            expand: true,
            src: ['_source/images/icons/*.svg'],
            dest: "<%= config.paths.build.grunticon %>"
        },
        options: {

            // CSS filenames
            datasvgcss: "icons.data.svg.styl",
            datapngcss: "icons.data.png.styl",
            urlpngcss: "icons.fallback.styl",

            // preview HTML filename
            // previewhtml: "preview.html",

            // grunticon loader code snippet filename
            loadersnippet: "grunticon.loader.js",

            // Include loader code for SVG markup embedding
            enhanceSVG: true,

            // Make markup embedding work across domains (if CSS hosted externally)
            corsEmbed: false,

            // folder name (within dest) for png output
            // pngfolder: "png",

            // prefix for CSS classnames
            cssprefix: ".svg__",

            defaultWidth: "30px",
            defaultHeight: "30px",

            // define vars that can be used in filenames if desirable, like foo.colors-primary-secondary.svg
            colors: {
                primary: "red",
                secondary: "#666"
            },

            dynamicColorOnly: true,

            // // css file path prefix - this defaults to "/" and will be placed before the "dest" path when stylesheets are loaded.
            // // This allows root-relative referencing of the CSS. If you don't want a prefix path, set to to ""
            // cssbasepath: "/",
            // customselectors: {
            //     "cat": ["#el-gato"],
            //     "gummy-bears-2": ["nav li a.deadly-bears:before"]
            // },
            //
            // template: path.join(__dirname, "example", "default-css.hbs"),
            // previewTemplate: path.join(__dirname, "example", "preview-custom.hbs"),

            compressPNG: true

        }
    }
}
