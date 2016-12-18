"use strict";

let $ = require('jQuery')
let d3 = require("d3")

import {
    KfBAndForumMembersMap
} from "./kfb-and-forum-members-map.js"

window.addEventListener('load', function () {
    console.log(d3.version)

    var mapWrapper = d3.select(".c-kfb-forum-chart").node();
    new KfBAndForumMembersMap(mapWrapper);
})
