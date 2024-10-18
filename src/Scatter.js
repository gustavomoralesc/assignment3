import React, { Component } from "react";
import * as d3 from 'd3'

class Scatter extends Component {
    constructor(props) {
      super(props);
      this.state = {}
    }
    componentDidUpdate() {
        var data = this.props.data1;
    
        // Set the dimensions and margins of the graph
        var margin = { top: 50, right: 10, bottom: 60, left: 50 }, // Increased bottom margin for x-axis label
            w = 500 - margin.left - margin.right,
            h = 400 - margin.top - margin.bottom;
    
        // Select the container and set dimensions
        var container = d3.select(".scatter_svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom + 50);
    
        // Create the main group with translation for margin space
        var g = container.select(".g_1")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
        // Add or update title
        container.selectAll(".chart-title").data([0]).join("text")
            .attr("class", "chart-title")
            .attr("x", (w + margin.left + margin.right) / 2)
            .attr("y", margin.top / 2)  // Position the title above the chart
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .text("Total Bill vs Tips");
    
        // Add x-axis
        var x_data = data.map(item => item.total_bill);
        const x_scale = d3.scaleLinear().domain([0, d3.max(x_data)]).range([0, w]);
        g.selectAll(".x_axis_g").data([0]).join("g").attr("class", "x_axis_g")
            .attr("transform", `translate(0, ${h})`)
            .call(d3.axisBottom(x_scale));
    
        // Add y-axis
        var y_data = data.map(item => item.tip);
        const y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h, 0]);
        g.selectAll(".y_axis_g").data([0]).join("g").attr("class", "y_axis_g")
            .call(d3.axisLeft(y_scale));
    
        // Add y-axis label (rotated "Tips")
        g.selectAll(".y_axis_label").data([0]).join("text")
            .attr("class", "y_axis_label")
            .attr("x", -h / 2)  // Center vertically along the y-axis
            .attr("y", -margin.left + 16)  // Move to the left of the axis
            .attr("transform", "rotate(-90)")
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Tips");
    
        // Add x-axis label ("Total Bill")
        g.selectAll(".x_axis_label").data([0]).join("text")
            .attr("class", "x_axis_label")
            .attr("x", w / 2)  // Center horizontally along the x-axis
            .attr("y", h + margin.bottom - 15)  // Position below the x-axis
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Total Bill");
    
        // Plot the data points
        g.selectAll("circle")
            .data(data)
            .join("circle")
            .attr("cx", function(d) {
                return x_scale(d.total_bill);
            })
            .attr("cy", function(d) {
                return y_scale(d.tip);
            })
            .attr("r", 3)
            .style("fill", "#69b3a2");
    }
    
    
    

    render() {
        return (
            <svg className="scatter_svg">
                <g className="g_1"></g>
            </svg>
        )
    }
}
export default Scatter;