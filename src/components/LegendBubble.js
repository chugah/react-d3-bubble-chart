import React, { Component } from 'react';
import * as d3 from 'd3';
import { width } from '../constants';

export default class App extends Component {

  componentDidMount() {
    drawLegendBubble();
  }

  render() {
    return (    
        <svg></svg>
    );
  }
}

function drawLegendBubble() {

	var radiusScale = d3.scalePow();
  	var svg = d3.select("svg");
  	var alls_x = {
		"market ":  width / 2	
	};

  	var alls_data = d3.keys(alls_x);
	var alls = svg.selectAll(".alls")
				.data(alls_data);
    /*--------------------------------------------------------------------------overlapping legend circles--------------------------------------------------------------------*/

    									/*--------------------------------small----------------------------*/

    alls.enter()
	    .append("circle")
	    .attr("class", "alls")
	    .attr("r", radiusScale(parseInt(10)))
	    .attr("cx", 70)
	    .attr("cy", 505)
	    .attr("fill", "none")
	    .attr("stroke", "#000");

    alls.enter()
	    .append("line")
	    .attr("class", "alls")
	    .attr("x1", 70)
	    .attr("x2", 150)
	    .attr("y1", 505)
	    .attr("y2", 505)
	    .attr("stroke", "#000")
	    .style("stroke-dasharray", ("3, 3"));

    alls.enter()
    	.append("text")
		.attr("class", "alls")
		.attr("x", 160)
		.attr("y", 505)
		.text("$0.5M funding");

    									/*--------------------------------medium----------------------------*/

    alls.enter()
	    .append("circle")
	    .attr("class", "alls")
	    .attr("r", radiusScale(parseInt(25)))
	    .attr("cx", 70)
	    .attr("cy", 491)
	    .attr("fill", "none")
	    .attr("stroke", "#000");

    alls.enter()
	    .append("line")
	    .attr("class", "alls")
	    .attr("x1", 70)
	    .attr("x2", 150)
	    .attr("y1", 480)
	    .attr("y2", 480)
	    .attr("stroke", "#000")
	    .style("stroke-dasharray", ("3, 3"));

    alls.enter()
    	.append("text")
		.attr("class", "alls")
		.attr("x", 160)
		.attr("y", 480)
		.text("$10M funding");

    									/*--------------------------------large----------------------------*/

    alls.enter()
	    .append("circle")
	    .attr("class", "alls")
	    .attr("r", radiusScale(parseInt(50)))
	    .attr("cx", 70)
	    .attr("cy", 465)
	    .attr("fill", "none")
	    .attr("stroke", "#000");

    alls.enter()
	    .append("line")
	    .attr("class", "alls")
	    .attr("x1", 70)
	    .attr("x2", 150)
	    .attr("y1", 450)
	    .attr("y2", 450)
	    .attr("stroke", "#000")
	    .style("stroke-dasharray", ("3, 3"));

    alls.enter()
    	.append("text")
		.attr("class", "alls")
		.attr("x", 160)
		.attr("y", 450)
		.text("$100M funding");
}