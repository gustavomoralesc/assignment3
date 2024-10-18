import React, { Component } from "react";
import "./App.css"
import Bar from "./Bar.js"
import Scatter from "./Scatter.js"
import * as d3 from 'd3'
import tips from "./tips.csv"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data:[]}
  }
  componentDidMount() {
    var self = this
    d3.csv(tips, function(d){
      return {
        tip:parseFloat(d.tip),
        total_bill:parseFloat(d.total_bill),
        day:d.day
      }
    }).then(function(csv_data) {
      self.setState({data:csv_data})
    }).catch(function(err) {
      console.log(err)
    })
  }
  render() {
    return <div className="parent">
    <div className="scatterplot"><Scatter data1={this.state.data}></Scatter></div>
    <div className="barchart"><Bar data1={this.state.data}></Bar></div>
    </div>;
  }
}


export default App;
