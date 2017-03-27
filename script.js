/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 15
marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background','#cacaca')
  .style('padding','20px')
// Data reloading
let reload = () => {
  d3.tsv("afcw-results.tsv", (error, data)=>{
    if (error) throw error
    let dataset = []
    data.map((data)=>{
      dataset.push(data.GoalsScored)
    })
    console.log(dataset);
    redraw(dataset)
  })
}

// redraw function
let redraw = (data) => {
// y Scale
const yScale = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, 300])

// x Scale
const xScale = d3.scaleLinear()
  .domain([0, data.length])
  .range([0, width])

//colorScale
const colorScale = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range(['peru', 'teal'])

const xAxis = d3.axisBottom(xScale).ticks(data.length)

  svg.append('g')
    .call(xAxis)
    .attr('transform',`translate(0,${height})`)

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class','bar')
    .attr('x', (data, index)=>{
      return xScale(index)
    })
    .attr('y', (data)=>{
      return height - yScale(data)
    })
    .attr('width', margin)
    .attr('height',(data)=>{
      return yScale(data)
    })
    .attr('fill',colorScale)
}

reload()
