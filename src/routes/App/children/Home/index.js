import React from 'react'
import { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'

let nodeCache = null
let simulation = null
let context = null
let height = window.innerHeight;
let graphWidth =  window.innerWidth;
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

    var graphCanvas = d3.select('#graphDiv').append('canvas')
    .attr('width', graphWidth + 'px')
    .attr('height', height + 'px')
    .node();

    context = graphCanvas.getContext('2d');

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    simulation = d3.forceSimulation()
                  .force("center", d3.forceCenter(graphWidth / 2, height / 2))
                  .force("x", d3.forceX(graphWidth / 2).strength(0.1))
                  .force("y", d3.forceY(height / 2).strength(0.1))
                  .force("charge", d3.forceManyBody().strength(-50))
                  .force("link", d3.forceLink().strength(1).id(function(d) { return d.id; }))
                  .alphaTarget(0)
                  .alphaDecay(0.05)

    var transform = d3.zoomIdentity;

    nodeCache = graphData1.nodes
    simulation.nodes(graphData1.nodes)
    .on("tick",simulationUpdate)
    .on('end', fixNodes)


    simulation.force("link")
              .links(graphData1.edges);
  })
  function fixNodes() {
    graphData1.nodes.forEach(node => {

      node.fx = node.ox !== undefined ? node.ox : node.x
      node.fy = node.oy !== undefined ? node.oy : node.y
      node.ox = node.ox !== undefined ? node.ox : node.x
      node.oy = node.oy !== undefined ? node.oy : node.y
    })
  }
  function simulationUpdate(isClearImmediately) {
    if (!isClearImmediately) {
      context.save();
      context.clearRect(0, 0, graphWidth, height);
    }
    graphData1.edges.forEach(function(d) {
      context.beginPath();
      context.moveTo(d.source.x, d.source.y);
      context.lineTo(d.target.x, d.target.y);
      context.stroke();
    });

    // Draw the nodes
    graphData1.nodes.forEach(function(d, i) {
      d.drawed = true
      context.beginPath();
      context.arc(d.x, d.y, RADIUS, 0, 2 * Math.PI, true);
      context.fillStyle = d.col ? "red":"green"
      context.fill();
    });

    context.restore();


    // transform = d3.zoomIdentity;
  }

  const appendHandler = () => {
    utils.generateNode().then((d) => {
      graphData1.nodes.push(d)
      console.log(d)
      debugger
      simulation.nodes([...graphData1.nodes]);
      debugger
      console.log(d)
      context.beginPath();
      context.arc(d.x, d.y, RADIUS, 0, 2 * Math.PI, true);
      context.fillStyle = d.col ? "red":"green"
      context.fill();
      simulation.alpha(1).restart()
    })
  }

  const redrawHandler = (isClearImmediately) => {
    if (isClearImmediately) {
      context.save();
      context.clearRect(0, 0, graphWidth, height);
    }
    utils.generateNode().then(d => {
      graphData1.nodes.push(d);
      simulation.nodes(graphData1.nodes);
      simulationUpdate(isClearImmediately)
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
