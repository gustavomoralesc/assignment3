import React, { Component } from "react";
import * as d3 from "d3";

class Bar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidUpdate() {
        const data = this.props.data1;
        const tips = data.map(d => d.tip);

        const avgTipsByDay = d3.rollup(
            data,
            v => d3.mean(v, d => d.tip), 
            d => d.day 
        );

        const days = ["Sun", "Sat", "Thur", "Fri"];
        const averages = days.map(day => avgTipsByDay.get(day) || 0);

        const margin = { top: 60, right: 30, bottom: 50, left: 40 }, 
            w = 500 - margin.left - margin.right,
            h = 400 - margin.top - margin.bottom;

        const container = d3.select(".bar_svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom);

        const g = container.select(".g_1")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        g.selectAll("*").remove();

        const x = d3.scaleBand()
            .domain(days)
            .range([0, w])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(averages)]).nice()
            .range([h, 0]);

        g.append("g")
            .attr("class", "x_axis")
            .attr("transform", `translate(0, ${h})`)
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "y_axis")
            .call(d3.axisLeft(y));

        g.selectAll(".bar")
            .data(averages)
            .join("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => x(days[i]))
            .attr("y", d => y(d))
            .attr("width", x.bandwidth())
            .attr("height", d => h - y(d))
            .style("fill", "#69b3a2");

        g.append("text")
            .attr("class", "x_axis_label")
            .attr("x", w / 2)
            .attr("y", h + margin.bottom - 10)
            .attr("text-anchor", "middle")
            .text("Day");

        g.append("text")
            .attr("class", "y_axis_label")
            .attr("x", -h / 2)
            .attr("y", -margin.left + 15)
            .attr("transform", "rotate(-90)")
            .attr("text-anchor", "middle")
            .text("Average Tips");

        container.append("text")
            .attr("class", "chart_title")
            .attr("x", (w + margin.left + margin.right) / 2)
            .attr("y", margin.top / 2) 
            .attr("text-anchor", "middle")
            .style("font-size", "18px") //
            .text("Average Tip by Day");
    }

    render() {
        return (
            <svg className="bar_svg">
                <g className="g_1"></g>
            </svg>
        );
    }
}

export default Bar;
