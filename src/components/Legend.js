import React, { Component } from 'react';
import * as d3 from 'd3';
import { width, height } from '../constants';

export default class Legend extends Component {

  componentDidMount() {
    drawBubbleChart();
  }

  render() {
    return (    
        <svg></svg>
    );
  }
}

function drawBubbleChart() {

  var svg = d3.select("svg");
    var legend_x ={
    "Start-up": 12 * width / 50,
    "Performers": 22 * width / 50,
    "Trenders": 32 * width / 50
    };

    var legend_y ={
      "Start-up": 48 * height/50,
      "Performers": 48 * height/50,
      "Trenders": 48 * height/50
    };

    var legend_data = d3.keys(legend_x);

    var legend = svg.selectAll(".legend")
      .data(legend_data)

      legend.enter()
            .append("text")
            .attr("class", "legend")
            .attr("x", function(d) { return legend_x[d]; } )
            .attr("y", function(d) { return legend_y[d]; } )
            .text(function(d) { return d;})

      legend.enter()
            .append("circle")
            .attr("class", "legend")
            .attr("r", 10)
            .attr("cx", 260)
            .attr("cy", 570)
            .attr("fill", "#aaa939")

    legend.enter()
            .append("circle")
            .attr("class", "legend")
            .attr("r", 10)
            .attr("cx", 465)
            .attr("cy", 570)
            .attr("fill", "#2c4870")
                    /*--------------------------------Trenders----------------------------*/
    legend.enter()
            .append("circle")
            .attr("class", "legend")
            .attr("r", 10)
            .attr("cx", 650)
            .attr("cy", 570)
            .attr("fill", "#9c344c");
}

