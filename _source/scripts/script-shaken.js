"use strict";

let d3Selection = require("d3-selection")
let d3Request = require("d3-request")


window.addEventListener('load', function () {
    console.log("d3.shaken")
})


function renderResults() {

    let fields = [
        {
            name: "name",
            title: "Name"
        },
        {
            name: "firstVisualChange_cable_mean",
            title: "firstVisualChange (cable)"
        },
        {
            name: "firstVisualChange_3g_mean",
            title: "firstVisualChange (3g)"
        },
        {
            name: "desktop_speed_score",
            title: "Desktop Score"
        },
        {
            name: "mobile_speed_score",
            title: "Mobile Score"
        },
        {
            name: "totalRequestBytes",
            title: "Bytes"
        },


        {
            name: "numberStaticResources",
            title: "#resources"
        },
        {
            name: "numberCssResources",
            title: "#CSS"
        },
        {
            name: "numberJsResources",
            title: "#JS"
        },

    ]

    d3Selection.json("/results.json", data => {



        let resultArray =
            Object.keys(data).map((d, v, i) => { return data[d] });



        let table = d3Selection.select('table.results');

        let tableHeaderTr = table.append('thead').append('tr');
        let tableHeaderTh = tableHeaderTr.selectAll('th')
            .data(fields).enter()
            .append('th')
            .html(function (m) { return m.title; });


        let tableBody = table.append('tbody');

        let tr = tableBody.selectAll('tr')
            .data(resultArray).enter()
            .append('tr');

        fields.forEach(f => {

            if (f.name === "name")
                tr.append('td').html(function (m) {
                    return "<a href='/best-practices/"
                        + m[f.name] + ".html'>" + m[f.name] + "</a>";
                });
            else
                tr.append('td').html(function (m) { return m[f.name]; });

        })

    })

}


window.addEventListener('load', function () {

    if (d3Selection.select("body").classed("results"))
        renderResults();
})
