// @TODO: YOUR CODE HERE!

// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from data.csv
d3.csv("assets/js/data.csv").then(function(censusData) {

    console.log(censusData);

    censusData.forEach(function(d)  {
        d.healthcare = +d.healthcare;
        d.poverty = +d.poverty;
    });
  
  // Configure a linear scale for the horizontal axis
  var xScale = d3.scaleLinear()
    .domain([8,d3.max(censusData, d => d.poverty)])
    .range([0, width])
    
  // Create a linear scale for the vertical axis.
  var yScale = d3.scaleLinear()
    .domain([d3.min(censusData, d => d.healthcare),d3.max(censusData, d => d.healthcare)])
    .range([height, 0]);

 

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);

 
  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);
  chartGroup.append("text")
  .attr("class", "label")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Lacks Healthcare");

  
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
    chartGroup.append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", 410)
    .style("text-anchor", "end")
    .text("In Poverty");

    
  chartGroup.selectAll(".dot")
    .data(censusData)
    .enter()
    .append("circle")
    .attr('cx',d => xScale(d.poverty))
    .attr('cy',d => yScale(d.healthcare))
    .attr('r','12')
    .style("fill", "#89bdd3")
    .attr('stroke','#e3e3e3')
    .attr('opacity', ".5")
    .attr('stroke-width',3)
   
    chartGroup.selectAll("text.text-circles")
    .data(censusData)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xScale(d.poverty))
    .attr("y", d => yScale(d.healthcare))
    .attr("dy",5)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "white");

    
});
