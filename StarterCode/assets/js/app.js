

 var svgWidth = 900;
 var svgHeight = 500;
 
 var margin = {
   top: 30,
   right: 40,
   bottom: 80,
   left: 90
 };
 
 var width = svgWidth - margin.left - margin.right;
 var height = svgHeight - margin.top - margin.bottom;
 
 // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
 var svg = d3.select(".chart")
   .append("svg")
   .attr("width", svgWidth)
   .attr("height", svgHeight);
 
 var chartGroup = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);
 
 // Import Data
 d3.csv("./assets/data/data.csv").then(function(health) {
 
health.forEach(function(data) {
    data.healthcare = +data.healthcare;
    data.poverty = +data.poverty;
});
 
//set scale 
var xLinearScale = d3.scaleLinear().range([0, width]);
var yLinearScale = d3.scaleLinear().range([height, 0]);

//set x/y min and max
xmin = d3.min(health, function(data) {
return data.poverty -2;
});
xmax = d3.max(health, function(data) {
return data.poverty +2;
});
ymin = d3.min(health, function(data) {
return data.healthcare -1;
});
ymax = d3.max(health, function(data) {
return data.healthcare +1;
});


console.log(xmax);
console.log(xmin);
console.log(ymax);
console.log(ymin);


xLinearScale.domain([xmin, xmax]);
yLinearScale.domain([ymin, ymax]);


// create axises
var xaxis = d3.axisBottom(xLinearScale);
var yaxis = d3.axisLeft(yLinearScale);

chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(xaxis);
chartGroup.append("g").call(yaxis);

// create circles 
var circles = chartGroup.selectAll("circle")
.data(health)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.healthcare))
.attr("r", "15")
.attr("fill", "green")
.attr("opacity", ".5");



// Create labels
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left + 40)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.attr("class", "axisText")
.text("healthcare");

chartGroup.append("text")
.attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
.attr("class", "axisText")
.text("poverty");
}).catch(function(error) {
console.log(error);
});