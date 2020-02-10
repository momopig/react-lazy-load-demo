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

export const Home = (props: IProps) => {


  const graphData =[1,2,3]
  /* The useRef Hook creates a variable that "holds on" to a value across rendering
     passes. In this case it will hold our component's SVG DOM element. It's
     initialized null and React will assign it later (see the return statement) */
  const d3Container = useRef(null)

  /* The useEffect Hook is for running side effects outside of React,
     for instance inserting elements into the DOM using D3 */
  useEffect(
    () => {
        if (graphData && d3Container.current) {
          const svg = d3.select(d3Container.current)

          // Bind D3 data
          const update = svg
              .append('g')
              .selectAll('text')
              .data(graphData)

          // Enter new D3 elements
          update.enter()
              .append('text')
              .attr('x', (d, i) => i * 25)
              .attr('y', 40)
              .style('font-size', 24)
              .text((d: number) => d)

          // Update existing D3 elements
          update
              .attr('x', (d, i) => i * 40)
              .text((d: number) => d)

          // Remove old D3 elements
          update.exit()
              .remove()
        }
    },

    /*
        useEffect has a dependency array (below). It's a list of dependency
        variables for this useEffect block. The block will run after mount
        and whenever any of these variables change. We still have to check
        if the variables are valid, but we do not have to compare old props
        to next props to decide whether to rerender.
    */
    [graphData, d3Container.current])

  useEffect(() => {
    var radius = 5;

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
    .on("tick",simulationUpdate);

    simulation.force("link")
              .links(graphData1.edges);
  })
  function simulationUpdate(isClearImmediately){
    const radius = 5
    if (!isClearImmediately) {
      context.save();
      context.clearRect(0, 0, graphWidth, height);
    }
    simulation.nodes(graphData1.nodes);
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
      context.arc(d.x, d.y, radius, 0, 2 * Math.PI, true);
      context.fillStyle = d.col ? "red":"green"
      context.fill();
    });

    context.restore();
    // transform = d3.zoomIdentity;
  }

  const appendHandler = () => {
    const radius = 5
    utils.generateNode().then((d) => {
      nodeCache.push(d)
      simulation.nodes(nodeCache);
      console.log(d)
      context.beginPath();
      context.arc(d.x, d.y, radius, 0, 2 * Math.PI, true);
      context.fillStyle = d.col ? "red":"green"
      context.fill();
    })
  }

  const redrawHandler = (isClearImmediately) => {
    const radius = 5
    if (isClearImmediately) {
      context.save();
      context.clearRect(0, 0, graphWidth, height);
    }
    // return
    utils.generateNode().then(d => {
      graphData1.nodes.push(d);
      simulationUpdate(isClearImmediately)
    })
  }

  return (
    <div>
      {/* <svg
        className="d3-component"
        width={400}
        height={200}
        ref={d3Container}
      /> */}
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
