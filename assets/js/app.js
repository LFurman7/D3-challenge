var height = 600;
var width = 1000;
var XAxis = 'poverty'

var margin = {
    top: 50,
    right: 50,
    bottom: 100,
    left: 100
};

var chartHeight = height - margin.top - margin.bottom;
var chartWidth = width - margin.left - margin.right;


var svg = d3.select('#scatter').append('svg')
    .attr('height', height)
    .attr('width', width)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .attr('id', 'bar_chart');

var labelsGroup = svg.append('g')
    .attr('transform', `translate(${width / 2}, ${chartHeight + 20})`);


svg.append('g')
    .attr('transform', `translate(-25, ${chartHeight / 2}) rotate(-90)`)
    .append('text')
    .attr('x', 0)
    .attr('y', 0)
    .attr('value', 'healthcare')
    .text(' Lacks Healthcare (%)');


labelsGroup.append('text')
    .attr('x', 0)
    .attr('y', 20)
    .attr('value', 'poverty') 
    .text('In Poverty (%)');

function xScale_update(data, XAxis) {
    var xLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[XAxis])])
        .range([0, chartWidth]);

    return xLinearScale
}

function renderAxes(newXScale, xAxis_g) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis_g.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis_g;
}

function UpdateBars(circleGroup, newXScale) {
    circleGroup
        .transition()
        .duration(1000)
        .attr('cx', d => newXScale(d[XAxis]));

    return;
}

d3.csv('/assets/data/data.csv')
    .then(function (health_poverty_data) {
        var ymin = d3.min(health_poverty_data.map(d => parseFloat(d['healthcare'])));
        var ymax = d3.max(health_poverty_data.map(d => parseFloat(d['healthcare'])));
        var state_abbr = health_poverty_data.map(d => d.abbr);


        var yScale = d3.scaleLinear()
            .domain([ymin, ymax])
            .range([chartHeight, 0]);
       
            var xmin = d3.min(health_poverty_data, d => parseFloat(d[XAxis]))
        var xmax = d3.max(health_poverty_data, d => parseFloat(d[XAxis]))
       
       
        var xScale = d3.scaleLinear()
            .domain([xmin, xmax])
            .range([0, chartWidth])

        var yAxis_func = d3.axisLeft(yScale);
        var xAxis_func = d3.axisBottom(xScale);

        var xAxis_g = svg.append('g')
            .attr('id', 'xaxis')
            .attr('transform', `translate(0, ${chartHeight})`)
            .call(xAxis_func);


        var yAxis_g = svg.append('g')
            .attr('id', 'yaxis')
            .call(yAxis_func);


        var circleGroup = svg.selectAll('circle')
            .data(health_poverty_data)
            .enter()
           

        circleGroup.append('circle')
            .attr('cx', d => xScale(parseFloat(d['poverty'])))
            .attr('cy', d => yScale(d['healthcare']))
            .attr('r', 8)
            .classed('moreInfo', true)
            .attr('fill', 'green')


        circleGroup.append("text")
            .text(function(d) {
              return d.abbr;
            })
            .attr('dx', d => xScale(parseFloat(d['poverty'])))
            .attr("text-anchor", "middle") 
            .attr('alignment-baseline', 'middle')
            .attr('dy', d => yScale(d['healthcare']))
            .attr("class", "text_info")
            .style('font-size', 9)
            .attr('fill', 'white')


            circleGroup.on('mouseover', function(d, i){
                d3.select(this)
                .transition()
                .duration(300) 
                .attr('r', 10)
                .attr('fill', 'orange')
            })

            circleGroup.on('mouseout', function(){
                d3.select(this)
                .transition()
                .attr('r', 8)
                .attr('fill', 'blue')
                .style('font-size', 10)
            })        
    })