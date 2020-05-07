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


// Import Data
d3.csv("./assets/data/data.csv").then(function(health) {

//extract health data
    health.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });
//set ranges
    var xLinearScale = d3.scaleLinear().range([0, width]);
    var yLinearScale = d3.scaleLinear().range([height, 0]);
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);
//append axs
    chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
    chartGroup.append("g").call(yAxis);
//create circles
    chartGroup.selectAll("circle")
    .data(health)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "12")
    .attr("fill", "black")
    .attr("opacity", ".8");
//circlelabels
    chartGroup.selectAll("text.text-circles")
    .data(health)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .attr("text-anchor","middle")
    .attr("font-size", "10px");

// set x axis label
    svg.append("text")
    .attr("class", "y axis")
    .text("healthcare")
    .attr("transform", "rotate(-90)")
    .attr("y", 10)
    .attr("x", -120)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    ;
  // set y axis label
    svg.append("text")
    .attr("class", "x axis")
    .text("poverty")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "label")
    .attr("x", width - 200)
    .attr("y", 70)
    .style("text-anchor", "end")
  });