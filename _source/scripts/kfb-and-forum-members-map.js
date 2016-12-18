var d3 = require('d3');

var topojson = require('topojson');

// var Prerender = require('d3-pre');
// var prerender = Prerender(d3);

import d3tip from 'd3tip';

export class KfBAndForumMembersMap {

    constructor(svgWrapper) {
        console.log(svgWrapper)
        // prerender.start();

        this.organisation_width = 15;
        this.organisation_height = 15;
        this.person_radius = 5;
        this.kfb_member_radius = 7.5;
        this.organisationElements = null;
        this.personElements = null;
        this.affiliationElements = null;
        this.simulation = null
        this.graph = {};
        this.graph.nodes = [];
        this.graph.links = [];

        let thisObject = this;

        this.svgWrapper = svgWrapper

        d3.selectAll("li.electoral-group-selector")
            .on('mouseover', function (d) {
                let event = d3.event
                let selectorName = d3.select(event.target).attr("data-selector")
                d3.select("body").classed("electoral-group-" + selectorName + "--selected", true);
            })
            .on('mouseout', function (d) {
                let event = d3.event
                let selectorName = d3.select(event.target).attr("data-selector")
                d3.select("body").classed("electoral-group-" + selectorName + "--selected", false);
            })

        this.svgWidth = svgWrapper.getBoundingClientRect().width;
        this.svgHeight = svgWrapper.getBoundingClientRect().height;


        this.projection = d3.geoAlbers()
            .center([-1, 50.3])
            .rotate([-10, 0])
            // .parallels([50, 60])
            .scale(1200 * 1.8)
            .translate([this.svgWidth / 2, this.svgHeight / 2]);

        this.path = d3.geoPath()
            .projection(thisObject.projection);

        this.svg = d3.select(this.svgWrapper).append('svg')
            .attr('width', this.svgWidth)
            .attr('height', this.svgHeight);


        this.mapLayer = this.svg.append('g')
            .attr('class', 'map');
        this.linksLayer = this.svg.append('g')
            .attr('class', 'links');
        this.nodesLayer = this.svg.append('g')
            .attr('class', 'nodes');





        d3.json('../_shared/ne-selection.topo.json', function (error, map) {

            // let map = neSelection;

            if (map.objects['ne-selection_european-countries']) {

                thisObject.mapLayer.selectAll('.country')
                    .data(topojson.feature(map,
                            map.objects['ne-selection_european-countries'])
                        .features)
                    .enter().append('path')
                    .attr('class', d => 'country ' + d.id)
                    .attr('d', thisObject.path);
            }
            if (map.objects['ne-selection_bundeslaender']) {
                thisObject.mapLayer.selectAll('.bundesland')
                    .data(topojson.feature(map,
                        map.objects['ne-selection_bundeslaender']).features)
                    .enter().append('path')
                    .attr('class', 'bundesland')
                    .attr('d', thisObject.path);
            }

            function ticked() {

                thisObject.organisationElements
                    .attr('x', d => d.x - thisObject.organisation_width / 2)
                    .attr('y', d => d.y - thisObject.organisation_height / 2);

                thisObject.personElements
                    .attr('cx', d => d.x)
                    .attr('cy', d => d.y);

                thisObject.affiliationElements
                    .attr("x1", d => d.target.x)
                    .attr("y1", d => d.target.y)
                    .attr("x2", d => d.source.x)
                    .attr("y2", d => d.source.y)
            }


            d3.json('../_shared/forum-affiliations.json', function (error, affiliationsData) {

                if (error) console.log(error);

                let affiliationsMap = new Map();

                affiliationsData.forEach(d => {

                    let projectedLocation = thisObject.projection([d.lng, d.lat]);
                    d.x = projectedLocation[0];
                    d.y = projectedLocation[1];

                    affiliationsMap.set(d.id, d)

                    thisObject.graph.nodes.push({
                        id: d.id,
                        group: d['electoral-group'],
                        type: 'organisation',
                        tooltip: d.name,
                        fx: d.x,
                        fy: d.y,
                    });
                })


                d3.json('../_shared/forum-members.json', function (err, membersData) {

                    membersData.forEach((d, j) => {

                        let affiliation = affiliationsMap.get(d.affiliation_id)

                        if (affiliation) {
                            thisObject.graph.links.push({
                                source: j,
                                target: d.affiliation_id
                            });
                            thisObject.graph.nodes.push({
                                "id": j,
                                "role": d.role,
                                "group": affiliation["electoral-group"],
                                "type": 'person',
                                "tooltip": (d.givenName + " " + d.familyName + '<br>Mitglied Forum Beschleunigerphysik'),
                                "x": affiliation.x,
                                "y": affiliation.y
                            });
                        } else {
                            console.log("affiliation not found: ", d.affiliation_id)

                        }
                    });

                    thisObject.personElements = thisObject.nodesLayer
                        .selectAll('circle')
                        .data(thisObject.graph.nodes.filter(d => {
                            return (d.type === 'person' && d.role !== "guest")
                        }))
                        .enter().append('circle')
                        .attr('class', function (d) {
                            return 'node' + ' node--person node--' + d.group + ((d.forum_member) ? ' node--forum-member' : '')
                        })
                        .attr('r', d => {
                            if (d.role != "") {
                                return thisObject.kfb_member_radius
                            } else {
                                return thisObject.person_radius
                            }
                        })
                        .call(d3tip({
                            html: function (d) {
                                return d.tooltip
                            }
                        }))


                    thisObject.organisationElements = thisObject.nodesLayer
                        .selectAll('rect')
                        .data(thisObject.graph.nodes.filter(d => d.type === 'organisation'))
                        .enter().append('rect')
                        .attr('class', d =>
                            'node' + ' node--organisation node--' + d.group
                        )
                        .attr('width', thisObject.organisation_width)
                        .attr('height', thisObject.organisation_height)
                        .call(d3tip({
                            html: function (d) {
                                return d.tooltip
                            }
                        }))

                    thisObject.affiliationElements = thisObject.linksLayer
                        .selectAll("line.affiliation")
                        .data(thisObject.graph.links)
                        .enter()
                        .append("line")
                        .classed("affiliation", true);


                    thisObject.simulation = d3.forceSimulation()
                        .force("link", d3.forceLink().id(function (d, i) {
                            return d.id;
                        }).distance(0).strength(link => {
                            if (link.type === "organisation") return 0
                            return 0;
                        }))
                        // .force("charge", d3.forceManyBody().strength(-1))
                        .force("collide", d3.forceCollide().radius(d => {
                            if (d.type === "organisation") return thisObject.organisation_width * .6;
                            if (d.kfbRole != "") return thisObject.kfb_member_radius * 1.1;
                            return thisObject.person_radius * 1.1;
                        }).iterations(1).strength(1.1));


                    thisObject.simulation.nodes(thisObject.graph.nodes)
                        .velocityDecay(.8)
                        .on('tick', ticked);

                    thisObject.simulation.force("link").links(thisObject.graph.links)

                    setTimeout(function () {
                        thisObject.simulation.stop();
                        performance.mark("simulation.stop")
                        // prerender.stop();
                    }, 3000)

                });
            });
        })
    }
}


