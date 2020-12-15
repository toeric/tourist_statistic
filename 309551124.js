(function (d3) {
  'use strict';

  const dropDownMenu = (selection, props) => {
    const {
      options,
      onOptionClicked,
      selectedOption
    } = props;
    
    let select = selection.selectAll('select').data([null]);
    select = select.enter().append('select')
      .merge(select)
        .on('change', function() {
  		onOptionClicked(this.value);  
    	  });
    
    const option = select.selectAll('option').data(options);
    option.enter().append('option')
      .merge(option)
        .attr('value', d => d)
        .property('selected', d => d === selectedOption)
        .text(d => d);
  };

  const svg = d3.select('svg');

  const width = +svg.attr('width');
  const height = +svg.attr('height');

  let xColumn;
  let yColumn;
  let global_data;

  xColumn = 'sepalLength';
  yColumn = 'sepalWidth';


  const onXColumnClicked = column => {
    xColumn = column;  
    svg.selectAll("*").remove();
    render(global_data);
  };

  const onYColumnClicked = column => {
  	yColumn = column; 
    svg.selectAll("*").remove();
    render(global_data);
  };


  const render = data => {
    
    const title = 'Iris';
    
    // const xValue = d => d.petalLength;
    // const xAxisLabel = 'petalLength';
    
    
    
    // const yValue = d => d.sepalWidth;
    const circleRadius = 10;
    // const yAxisLabel = 'sepalWidth';
    
    let xValue;
    let xAxisLabel;
    let yValue;
    let yAxisLabel;
    
    if (xColumn == 'sepalLength'){
    	xValue = d => d.sepalLength;
    	xAxisLabel = 'Sepal Length';
    }else if(xColumn == 'sepalWidth'){
      xValue = d => d.sepalWidth;
    	xAxisLabel = 'Sepal Width';
    }else if(xColumn == 'petalLength'){
      xValue = d => d.petalLength;
    	xAxisLabel = 'Petal Length';
    }else if(xColumn == 'petalWidth'){
      xValue = d => d.petalWidth;
    	xAxisLabel = 'Petal Width';
    }  
    
    if (yColumn == 'sepalLength'){
    	yValue = d => d.sepalLength;
    	yAxisLabel = 'Sepal Length';
    }else if(yColumn == 'sepalWidth'){
      yValue = d => d.sepalWidth;
    	yAxisLabel = 'Sepal Width';
    }else if(yColumn == 'petalLength'){
      yValue = d => d.petalLength;
    	yAxisLabel = 'Petal Length';
    }else if(yColumn == 'petalWidth'){
      yValue = d => d.petalWidth;
    	yAxisLabel = 'Petal Width';
    }  
    const margin = { top: 60, right: 200, bottom: 88, left: 150 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const colorValue = d => d.species;
    
    // if(species == "setosa")
    // 	console.log(innerHeight)

    
     const colorScale = d3.scaleOrdinal()
      .domain(data.map(colorValue))
      .range(['#E6842A', '#137B80', '#8E6C8A']);
    
    // console.log(data.map(colorValue))
    
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();
    
    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([innerHeight, 0])
      .nice();
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const g_class = svg.append('g')
      .attr('transform', `translate(${500},${100})`);
    
    g_class.append('text')
    		.attr('class', 'species')
        .attr('y', 10)
    		.attr('x', 300)
        .text('Flower classes');
    
    g_class.append('circle')
        .attr('cy', 50)
        .attr('cx', 300)
        .attr('r', circleRadius)
  			.attr('fill', '#E6842A');
    
    g_class.append('text')
    		.attr('class', 'species_each')
        .attr('y', 55)
    		.attr('x', 320)
        .text('setosa');
    
    g_class.append('circle')
        .attr('cy', 80)
        .attr('cx', 300)
        .attr('r', circleRadius)
  			.attr('fill', '#137B80');
    
    g_class.append('text')
    		.attr('class', 'species_each')
        .attr('y', 85)
    		.attr('x', 320)
        .text('versicolor');
    
    g_class.append('circle')
        .attr('cy', 110)
        .attr('cx', 300)
        .attr('r', circleRadius)
  			.attr('fill', '#8E6C8A');
    
     g_class.append('text')
    		.attr('class', 'species_each')
        .attr('y', 115)
    		.attr('x', 320)
        .text('virginica');
    
    d3.select('#x-menu')
      .call(dropDownMenu, {
        options: data.columns.filter(column =>
          column !== 'species'
          // column !== yColumn
        ),
        onOptionClicked: onXColumnClicked,
        selectedOption: xColumn
    });
    
    d3.select('#y-menu')
      .call(dropDownMenu, {
        options: data.columns.filter(column =>
          column !== 'species'
          // column !== xColumn
        ),
        onOptionClicked: onYColumnClicked,
        selectedOption: yColumn
    });

    
    const xAxis = d3.axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(15);
    
    const yAxis = d3.axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(10);
    
    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();
    
    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -93)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);
    
    const xAxisG = g.append('g').call(xAxis)
      .attr('transform', `translate(0,${innerHeight})`);
    
    xAxisG.select('.domain').remove();
    
    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 75)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);
    
    g.selectAll('circle').data(data)
      .enter().append('circle')
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', circleRadius)
    		// .attr('fill', 'red');
    		.attr('fill', d => colorScale(colorValue(d)));
    
    
    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
    		.attr('x', 265)
        .text(title);
    
    

  };

  d3.csv('iris.csv')
    .then(data => {
    	global_data = data;
      data.forEach(d => {
        d.sepalLength = +d.sepalLength;
        d.sepalWidth = +d.sepalWidth;
        d.petalLength = +d.petalLength;
        d.petalWidth = +d.petalWidth;
        d.species = d.species;
      });
      render(data);
    });

}(d3));

