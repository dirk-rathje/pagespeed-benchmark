/*eslint strict:0*/
/*global CasperError, console, phantom, require*/

/**
 * Capture multiple pages of google search results
 *
 * Usage: $ casperjs googlepagination.coffee my search terms
 *
 * (all arguments will be used as the query)
 */
var casper = require("casper").create();

casper.log("Casper CLI passed args:");
require("utils").dump(casper.cli.args);

casper.echo("Casper CLI passed options:");
require("utils").dump(casper.cli.options);

casper.exit();
