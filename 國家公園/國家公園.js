

// set the dimensions and margins of the graph

console.log("fl = change img2")
var margin = {top: 200, right: 100, bottom: 150, left: 100},
    width = window.screen.width - margin.left - margin.right,
    height = window.screen.height - margin.top - margin.bottom;

console.log(width)
console.log(height)

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
  d3.csv("國家公園.csv", function(data) {


  // List of groups = header of the csv files
  var keys = data.columns.slice(1)
  // Add X axis
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.year_month; }))
    .range([ 0, width ]);

  var tickLabels = [2012, 2013, 2014 , 2015, 2016, 2017, 2018, 2019];
  var tickmonth = ['7月']
  svg.append("g")
    .attr("transform", "translate(12," + height*0.8 + ")")
    .attr('stroke', 'rgba(256,0,0,1)')
    .call(d3.axisBottom(x).tickSize(-height*0.8).tickValues([2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]).tickFormat(function(d,i){ return tickLabels[i] }))
    .select(".domain").remove()


  for(var i=2012 ; i <= 2019 ; i++){
    svg.append("g")
    .attr("transform", "translate(12," + height*0.8 + ")")
    .attr("stroke", "#b8b8b8")
    .call(d3.axisBottom(x).tickSize(-height*.8).tickValues([i+0.5]).tickFormat(function(d,i){ return tickmonth[i] }))
    .select(".domain").remove()
  }


  // Customization

  // svg.selectAll(".tick line").attr("stroke", "#b8b8b8")

  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height-30 )
      .text("Time (year)");

  // Add Y axis
  var y = d3.scaleLinear()
    // .domain([-2000000, 2000000])
    .domain([-2000000, 2000000])
    .range([ height, 0 ]);

  // color palette
  var color = d3.scaleOrdinal()
    .domain(keys)
    .range(d3.schemeCategory20);

  //stack the data?
  var stackedData = d3.stack()
    .offset(d3.stackOffsetSilhouette)
    .keys(keys)
    (data)


  // create a tooltip
  var Tooltip = svg
    .append("text")
    .attr("x", 0)
    .attr("y", 0)
    .style("opacity", 0)
    .style("font-size", 17)

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip.style("opacity", 1)
    d3.selectAll(".myArea").style("opacity", .2)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d,i) {
    grp = keys[i]
    Tooltip.text(grp)
  }
  var mouseleave = function(d) {
    Tooltip.style("opacity", 0)
    d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none")
   }

  // Area generator
  var area = d3.area()
    .x(function(d) { return x(d.data.year_month); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); })

  // Show the areas
  svg
    .selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
      .attr("class", "myArea")
      .style("fill", function(d) { return color(d.key); })
      .attr("d", area)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)


  console.log(keys);    
  var pic = document.getElementById('pic');
  for(var i = 0;i<keys.length;i++){
    pic.add(new Option(keys[i]));
  }

  document.getElementById("imgs").src = 'img/'+ keys[0];
  function change_img(obj){
   var index=pic.selectedIndex;    //獲取索引值
   var imgs=document.getElementById("imgs");
   var val=pic.options;
   imgs.src="img/"+val[index].value;   ////動態設定img的src屬性值，隨著滑鼠的選擇切換圖片
   console.log(imgs.src)
  }
  

})
