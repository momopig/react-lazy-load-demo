import React from 'react'
import { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
const NODE_NUM = 4
const EDGE_NUM = 1
let nodeCache = null
let simulation = null
let context = null
let height = window.innerHeight;
let graphWidth =  window.innerWidth;
let dataContainer = null
let dataBinding = null
let isTickEnd = false
let newElements = null



let utils = {
  generateNode: () => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        _id: 'node+' + (++nodeId)
      })
    }, 1500)
  }),
  generateGraph: (nodeNum, edgeNum) => {
    const graphData = {
      vertices: [],
      edges: []
    }
    const tempArr = []
    d3.range(nodeNum).map((index) => {
      tempArr.push(index)
      graphData.vertices.push({
        _id: 'node_' + (index + 1)
      })
    })
    while(edgeNum > 0) {
      let upper = tempArr.length
      let lower = 0

      // [lower, upper)
      let srouceIndex = Math.floor(Math.random() * tempArr.length)
      let source = graphData.vertices[tempArr.splice(srouceIndex, 1)[0]]
      let targetIndex = Math.floor(Math.random() * tempArr.length)
      let target = graphData.vertices[tempArr.splice(targetIndex, 1)[0]]
      // if (!source || !target) {
      //   debugger
      // }
      graphData.edges.push({
        _id: 'edge_' + edgeNum,
        source: source._id,
        target: target._id
      })
      edgeNum--
    }
    console.log(graphData)
    return graphData


  }
}

let graphData1 = utils.generateGraph(NODE_NUM, EDGE_NUM)
let nodeId = graphData1.vertices.length
const RADIUS = 20


export const Home = (props: IProps) => {

  useEffect(() => {

    height = window.innerHeight;
    graphWidth =  window.innerWidth;

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
                  .force("link", d3.forceLink().strength(1).id(function(d) { return d._id; }))
                  .alphaTarget(0)
                  .alphaDecay(0.05)
                  .on('end', onEnd)
                  .on("tick",ticked);

    simulation.nodes(graphData1.vertices)
    drawGraph(graphData1.vertices)
    // simulation.links(graphData1.edges);

    d3.select(graphCanvas)
    .call(d3.drag()
        .container(graphCanvas)
        .subject(dragsubject)
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
  })

  function onEnd() {
    fixNodes()
    isTickEnd = true
    // drawGraph()
  }

  function drawNode(d, i) {
    context.beginPath();
    context.arc(d.x, d.y, RADIUS, 0, 2 * Math.PI, true);
    context.fillStyle = "green"
    context.fill();

    // start draw text
    context.beginPath();
    context.font = "20px Georgia";
    context.fillStyle = "red"
    context.fillText(i + 1, d.x - 2 , d.y - 2);
    context.fill();
  }

  function fixNodes() {
    graphData1.vertices.forEach(node => {

      // ox为固定后的旧坐标
      // node.fx = node.ox !== undefined ? node.ox : node.x
      // node.fy = node.oy !== undefined ? node.oy : node.y


      // node.ox = node.ox !== undefined ? node.ox : node.x
      // node.oy = node.oy !== undefined ? node.oy : node.y

      node.fx = node.x
      node.fy = node.y
    })
  }
  function drawGraph(nodes) {
    // if (!isTickEnd) {
    //   return
    // }
    // isTickEnd = false
    context.fillStyle = "#fff";
    context.rect(0,0, graphWidth, height);
    context.fill();
    let allCircles =  dataContainer.selectAll(".circle")
    let updateContainers = allCircles.data(nodes);

    updateContainers.each(function(d, i) {
      drawNode(d, i)
    })
    // enter is same...
    let enterContainers = updateContainers.enter()
    enterContainers.append("custom")
    .classed('circle', true)

    enterContainers.each(function(d, i) {
      drawNode(d, i)
    })

    let exitContainers = updateContainers.exit()
    exitContainers.remove();
  }

  function ticked(isClearImmediately) {

    // 在tick阶段，隐藏调整位置的过程
    if (!isTickEnd || true) {
      // drawCanvas()
      drawGraph(graphData1.vertices)
    }

    // drawCanvas()
    // link.attr("x1", function(d) { return d.source.x; })
    //     .attr("y1", function(d) { return d.source.y; })
    //     .attr("x2", function(d) { return d.target.x; })
    //     .attr("y2", function(d) { return d.target.y; });
  }

  function dragsubject() {
    const subject = simulation.find(d3.event.x, d3.event.y);
    let inInScale = false // 是否点击在circle区域
    if (subject) {
      if (Math.abs(subject.x - d3.event.x) > RADIUS
        || Math.abs(subject.y - d3.event.y) > RADIUS
      ) {
        inInScale = false
      } else {
        inInScale = true
      }
    }
    return inInScale ? subject : null
  }

  function dragstarted() {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    // d3.event.subject.fx = d3.event.subject.x;
    // d3.event.subject.fy = d3.event.subject.y;
    isTickEnd = false
  }

  function dragged() {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
  }

  function dragended() {
    if (!d3.event.active) simulation.alphaTarget(0);
    isTickEnd = true
    // d3.event.subject.fx = null;
    // d3.event.subject.fy = null;
  }

  const appendHandler = () => {
    utils.generateNode().then((d) => {
      graphData1.vertices.push(d)
      simulation.nodes(graphData1.vertices);
      drawGraph(graphData1.vertices)
      simulation.alpha(1).restart()
    })
  }
  const removeHandler = () => {
    const node = graphData1.vertices.shift()
    simulation.nodes(graphData1.vertices);
    drawGraph(graphData1.vertices)
    simulation.alpha(1).restart()
  }
  const redrawHandler = (isClearImmediately) => {
    if (isClearImmediately) {
      context.save();
      context.clearRect(0, 0, graphWidth, height);
    }
    utils.generateNode().then(d => {
      graphData1.vertices.push(d);
      simulation.nodes(graphData1.vertices);
      if (!isClearImmediately) {
        context.save();
        context.clearRect(0, 0, graphWidth, height);
      }
      drawGraph(graphData1.vertices)
      simulation.alpha(1).restart()
    })
  }


  return (
    <div>
        <button onClick={removeHandler}>remove one node</button>
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

