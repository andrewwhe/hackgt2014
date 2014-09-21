function draw_graph()  {
  // tops urls and visit counts init
  var urls = [];
  var normalized_visited = [];
  var times = [];
  var sorted = [];

  // regex for parsing
  var patt = /(.com|.org|.io|.me|.gov|.edu|.net)(.*)/
    // gets whole history and sorts
  chrome.history.search({"text": "", "maxResults": 10000}, 
    function(historyItems) {
      temp_times = [];
      temp_count = [];
      counter = 0;
      sorted = historyItems.slice(6).sort(function(a,b){
        return a.visitCount - b.visitCount;
      });
      for (var i = 0; i < sorted.length; i++){
            times[i] = Math.floor(((sorted[i].lastVisitTime /1000)/60)%1440);
            //console.log(times[i]);
      }
      times = times.sort(function(a,b){
        return a - b;
      });
      console.log(times.length);
      for (i = 0; i < times.length; i++){
        changed = 0;
        for (var j = 0; j < counter; j++){
          if (temp_times[j] == times[i]){
            temp_count[j] += 1;
            changed = 1;
            break;
          }
        }
        if (changed == 0){
          temp_times[counter] = times[i];
          temp_count[counter] = 1;
          counter++;
        }
      }
      times = temp_times;
      console.log(times.length);
      console.log(temp_count.length);

      var lineData = [];
      for (i = 0; i < times.length; i++){
        lineData.push({'x':times[i], 'y':temp_count[i]});
      }
      /*
      var svg = d3.select("#visualisation")
            .append("svg")
            .attr("width", 1000)
            .attr("height", 500);
*/
  var vis = d3.select("#d3-region-2"),
    WIDTH = window.innerWidth,
    HEIGHT = 600,
    MARGINS = {
      top: 70,
      right: 20,
      bottom: 70,
      left: 50
    };

    var area = d3.svg.area()
    .x(function(d) { return d.x; })
    .y0(HEIGHT)
    .y1(function(d) { return d.y; });

    xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0, 1440]);

    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function (d) {
        return d.y;
      }),
      d3.max(lineData, function (d) {
        return d.y;
      })
    ]),

    xAxis = d3.svg.axis()
      .scale( d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0, 24]))
      .tickSize(5)
      .tickSubdivide(true),

    yAxis = d3.svg.axis()
      .scale(yRange)
      .tickSize(5)
      .orient("left")
      .tickSubdivide(true);


  vis.append("svg:g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis);

  vis.append("svg:g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(yAxis);

  var lineFunc = d3.svg.line()
  .x(function (d) {
    return xRange(d.x);
  })
  .y(function (d) {
    return yRange(d.y);
  })
  .interpolate('linear');
vis.append('svg:path')//.attr("class", "area")
      .attr("stroke", "steelblue")
  .attr("stroke-width", 4)
  .attr("fill", "none")
  .transition()
  .duration(3000)
  .attrTween('d', getInterpolation(lineData));
  /*
vis.append("svg:path")
  .attr("d", lineFunc(lineData))
  .attr("stroke", "blue")
  .attr("stroke-width", 2)
  .attr("fill", "none");
*/
function getInterpolation(data) {
  return function (d, i, a) {
      var interpolate = d3.scale.linear()
          .domain([0,1])
          .range([1, data.length + 1]);

      return function(t) {
          var flooredX = Math.floor(interpolate(t));
          var weight = interpolate(t) - flooredX;
          var interpolatedLine = data.slice(0, flooredX);
              
          if(flooredX > 0 && flooredX < 31) {
              var weightedLineAverage = data[flooredX].y * weight + data[flooredX-1].y * (1-weight);
              interpolatedLine.push({"x":interpolate(t)-1, "y":weightedLineAverage});
              }
      
          return lineFunc(interpolatedLine);
          }
      }
  }

    });
}
