// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(data) {
    console.log(data);

    data.forEach(function(eachData){
        // console.log(eachData.obesity);
        // console.log(eachData.poverty);
        // console.log(eachData.obesity, eachData.poverty);
        eachData.poverty = +eachData.poverty;
        eachData.obesity = +eachData.obesity;
    });

var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.poverty) * 0.9, d3.max(data, d => d.poverty)])
    .range([0,width]);

var yLinearScale = d3.scaleLinear()
    .domain([15, d3.max(data, d => d.obesity)])
    .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

 // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

  // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "15")
    .attr("fill", "purple")
    .attr("opacity", ".5");
    

    var circleText = chartGroup.selectAll("circleText")
    .data(data)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.obesity))
    .attr("text-anchor", "middle")
    .attr("font-size", "11px")
    .text(function(d){
        return d.abbr
    });

    var xlabels = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`)

var povertyLabel = xlabels.append("text")
.attr("class", "axisText")
.text("Poverty")
.attr("x", 0)
.attr("y", 20)
.attr("value", "poverty")
// .classed("inactive", true)


var ylabels = chartGroup.append("g")
.attr("transform", "rotate(-90)")

var obesityLabel = ylabels.append("text")
.attr("class", "axisText")
.text("Obesity")
.attr("x", 0 - (height/2))
.attr("y", 0 - margin.left)
.attr("dy", "1em")
.attr("value", "poverty")
// .classed("inactive", true)

  });

  