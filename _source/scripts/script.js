"use strict";

let $ = require('jquery')
let d3 = require("d3")


window.addEventListener('load', function () {
    console.log(d3.version)
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
            name: "imageResponsekBytes",
            title: "images (kB)"
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
            name: "cssResponsekBytes",
            title: "CSS (kB)"
        },
        {
            name: "numberJsResources",
            title: "#JS"
        },
        {
            name: "javascriptResponsekBytes",
            title: "JS (kB)"
        },

    ]



    var colorScale = d3.scaleLinear()
        .domain([40, 90, 100])
        .range(["red", "yellow", "green"]);

    d3.json("/results.json", data => {


        let resultArray =
            Object.keys(data).map((d, v, i) => { return data[d] });



        let table = d3.select('table.results');

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

            let td = tr.append('td');
            if (f.name === "name")
                td.html(function (m) {
                    return "<a href='/best-practices/"
                        + m[f.name] + ".html'>" + m[f.name] + "</a>";
                });
            else
                td.html(function (m) { return m[f.name]; });

            if (f.name === "desktop_speed_score" || f.name === "mobile_speed_score") {
                td.style("background-color", d => colorScale(d[f.name]))

            }

        })

    })

}


window.addEventListener('load', function () {

    if (d3.select("body").classed("results"))
        renderResults();
})
