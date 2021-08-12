// change code and add as necessary
var Width = parseInt(d3.select('#scatter').style('width'));
var Height = width-width / 4;

var margin = 30;
var BottomPad= 30;
var LeftPad= 30;
var Label = 90;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter").append("div").classed("chart", true)
            .append("svg")
            .attr("width", Width)
            .attr("height", Height);

var xText = d3.select(".xText");
svg.append("g")
  .attr("class", ".xText");

function xTextRef() {
  xText.attr("transform", "translate(" + ((width - Label) /2 + Label) + "," + (height - margin - BottomPad) + ")"
  );
}
xTextRef();

var leftX = margin + LeftPad;
var leftY = (height + Label) /2 - Label;

xText
  .append("text")
  .attr("y", -26)
  .attr("data-name", "obesity")
  .attr("data-axis", "x")
  .attr("class", "aText active x")
  .text("Obesity Rate (%)");  

  xText
  .append("text")
  .attr("y", 0)
  .attr("data-name", "age")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Age (Med.)"); 


var yText = d3.select(".yText");
svg.append("g")
  .attr("class", "yText");

function yTextRef() {
  yText.attr("transform", "translate(" + leftX + "," + leftY + ")rotate(-90)"
  );
}
yTextRef();

yText
  .append("text")
  .attr("y", -26)
  .attr("data-name", "healthcare")
  .attr("data-axis", "y")
  .attr("class", "aText active y")
  .text("Lack of Healthcare (%)");

yText
  .append("text")
  .attr("x", 0)
  .attr("data-name", "smokes")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Actively Smokes (%)");

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (abbr + `%`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Poverty Rates");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Obesity Rates");
  }).catch(function(error) {
    console.log(error);
  });
