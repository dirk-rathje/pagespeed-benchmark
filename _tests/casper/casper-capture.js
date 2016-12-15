/*eslint strict:0*/
/*global CasperError, console, phantom, require*/

/**
 * Capture multiple pages of google search results
 *
 * Usage: $ casperjs googlepagination.coffee my search terms
 *
 * (all arguments will be used as the query)
 */

// var url = require("url");
var casper = require("casper").create({
    waitTimeout: 1000,
    logLevel: "info",
    verbose: true,
    pageSettings: {
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20130404 Firefox/23.0"
    }
});


var viewports = [{
        name: "small",
        width: 320,
        height: 568
    },
    // {
    //     name: "small_2x",
    //     width: 320,
    //     height: 568,
    //     scale: 2
    // }, {
    //     name: "tablet_portrait",
    //     width: 720,
    //     height: 1024
    // }, {
    //     name: "desktop",
    //     width: 1500,
    //     height: 900
    // },
    {
        name: "desktop_2x",
        width: 1500,
        height: 900,
        scale: 2
    }
]


var sitemap = require("../../sitemap.json");

console.log("reading sitemap.", sitemap.title);
console.log("sitemap contains " + sitemap.pages.length + " pages.");


var baseUrl = sitemap.baseUrl;

console.log("sitemap's baseUrl ", sitemap.baseURL);



casper.start(baseUrl);

casper.each(sitemap.pages, function(self, page, page_i) {
    if (page_i < 3) {
        console.log("page", page.url);
        casper.open(page.url)
            // .viewport(1024, 800)
            .then(function() {
                console.log('page url: ' + this.getCurrentUrl(), "info");
                // var urlPath = this.getCurrentUrl().substr(baseUrl.length);
                // console.log('url path: ' + urlPath, "info");
                // console.log('page title: ' + this.getTitle(), "info");
                page.title = this.getTitle();
                // screenshots("homepage");
            });
    }
});




casper.run();


function screenshots(page) {

    // casper.wait(500, function() {
    //     this.echo("PDF");
    //     this.page.viewportSize = { width: 1920, height: 1080 };
    //     this.page.paperSize = {
    //         width: '210mm',
    //         height: '290mm',
    //         margin: {
    //             top: '20mm',
    //             left: '20mm'
    //         }
    //     };
    //     this.page.render("screenshots/" + page + ".pdf", {
    //         format: 'pdf'
    //     });
    // });

    casper.each(viewports, function(self, viewport, i) {

        // set two vars for the viewport height and width as we loop through each item in the viewport array
        var width = viewport.width,
            height = viewport.height,
            scale = viewport.scale,
            filename = page + "-" + viewport.name + ".png";

        casper.viewport(width, height, function() {
            //give some time for the page to resize
            // casper.wait(1000, function()

            // if (scale) {
            //
            //     this.page.evaluate(function() {
            //
            //         document.body.style.webkitTransform = "scale(" + scale + ")";
            //         document.body.style.webkitTransformOrigin = "0% 0%";
            //         document.body.style.width = 100 / scale + "%";
            //     });
            // }
            this.reload(function() {
                this.capture('screenshots/' + filename);
            });



            // });
        })

    });
    casper.viewport(1500, 900);


}
