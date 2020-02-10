import React from 'react'
import { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'

let nodeCache = null
let simulation = null
let context = null
let height = window.innerHeight;
let graphWidth =  window.innerWidth;
let dataContainer = null
let dataBinding = null
var graphData1 = {
  "nodes":[
    {"id":1,"group":1},
    {"id":2,"group":1},
    {"id":3,"group":1},
    {"id":4,"group":1},
    {"id":5,"group":1},
  ],
  "edges":[{"value":1,"source":1,"target":2}]}
  let nodeId = graphData1.nodes.length

let utils = {
  generateNode: () => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: ++nodeId
      })
    }, 1500)
  })
}
const RADIUS = 5


export const Home = (props: IProps) => {

  useEffect(() => {

    var defaultNodeCol = "white",
        highlightCol = "yellow";

    height = window.innerHeight;
    graphWidth =  window.innerWidth;

        // Create an in memory only element of type 'custom'

    // Create a d3 selection for the detached container. We won't
    // actually be attaching it to the DOM.
    dataContainer = d3.select(document.createElement("custom"));

    var graphCanvas = d3.select('#graphDiv').append('canvas')
    .attr('width', graphWidth + 'px')
    .attr('height', height + 'px')
    .node();

    context = graphCanvas.getContext('2d');

    simulation = d3.forceSimulation()
                  .force("center", d3.forceCenter(graphWidth / 2, height / 2))
                  .force("x", d3.forceX(graphWidth / 2).strength(0.1))
                  .force("y", d3.forceY(height / 2).strength(0.1))
                  .force("charge", d3.forceManyBody().strength(-50))
                  // .force("link", d3.forceLink().strength(1).id(function(d) { return d.id; }))
                  .alphaTarget(0)
                  .alphaDecay(0.05)
                  .on("tick",ticked);

    simulation.nodes(graphData1.nodes)
    // d3.timer(drawCanvas)
    drawCustomCircle(graphData1.nodes)
    // simulation.force("link")
    //           .links(graphData1.edges);
  })
  function drawCanvas() {

    debugger
    // clear canvas
    context.fillStyle = "#fff";
    context.rect(0,0, graphWidth, height);
    context.fill();

    var elements = dataContainer.selectAll("custom.rect");
    elements.each(function(d) {
      var node = d3.select(this);
      context.beginPath();
      context.arc(d.x, d.y, RADIUS, 0, 2 * Math.PI, true);
      context.fillStyle = d.col ? "red":"green"
      context.fill();
    });
  }
  function drawCustomCircle(nodes) {
    dataBinding = dataContainer.selectAll("custom.rect")
      .data(nodes, function(d) { return d; });

    // enter is same...
    dataBinding.enter()
    .append("custom")
    .classed("rect", true)
    .attr("x", function(d) {
      return d.x
    })
    .attr("y", function(d) {
      return d.y
    })
    .attr("r", RADIUS)
    .attr("fillStyle", "red");
  }

  function ticked(isClearImmediately) {
    dataBinding.attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })

    // link.attr("x1", function(d) { return d.source.x; })
    //     .attr("y1", function(d) { return d.source.y; })
    //     .attr("x2", function(d) { return d.target.x; })
    //     .attr("y2", function(d) { return d.target.y; });
  }

  const appendHandler = () => {
    utils.generateNode().then((d) => {
      graphData1.nodes.push(d)
      console.log(d)
      simulation.nodes([...graphData1.nodes]);
      console.log(d)
      drawCustomCircle(graphData1.nodes)
      simulation.alpha(1).restart()
    })
  }

  const redrawHandler = (isClearImmediately) => {
    if (isClearImmediately) {
      context.save();
      context.clearRect(0, 0, graphWidth, height);
      debugger
    }
    utils.generateNode().then(d => {
      graphData1.nodes.push(d);
      simulation.nodes(graphData1.nodes);
      if (!isClearImmediately) {
        context.save();
        context.clearRect(0, 0, graphWidth, height);
      }
      drawCustomCircle(graphData1.nodes)
      simulation.alpha(1).restart()
    })
  }


  return (
    <div>
        <button onClick={appendHandler}>append a new node</button>
        <br/>
        <button onClick={redrawHandler.bind(null, true)}>add a new node and redraw all(isClearImmediately: true)</button>
        <br/>
        <button onClick={redrawHandler.bind(null, false)}>add a new node and redraw all(isClearImmediately: false)</button>
        <div id="graphDiv"></div>

    </div>

  )
}
export default Home
