var hist;

$(document).ready(function() {
	// tops urls and visit counts init
	var urls = [];
    var visited = [];
	var sorted = [];
    // gets whole history and sorts
	chrome.history.search({"text": "", "maxResults": 10000}, 
    function(historyItems) {
    	temp_url = [];
    	temp_count = [];
    	sorted = historyItems.slice(6).sort(function(a,b){
    		return a.visitCount - b.visitCount;
    	});
    	//console.log(JSON.stringify(sorted[0]));
    	var count = 0;
    	for (var i = sorted.length - 1, len = sorted.length - 11; i > len; i--){
    		temp_url.push(sorted[i].url);
    		temp_count.push(sorted[i].visitCount);
	      	console.log(temp_url[count]);
	      	console.log(sorted[i].visitCount);
	      	count++;
	   	}
	   	visited = temp_count.slice();
	   	urls = temp_url.slice();
	   	
    
     var w = window.innerWidth;
     var h = 600;
      var dataset = {
        nodes: [
          { "name": "facebook.com" },
          { "name": "imgur.com" },
          { "name": "reddit.com" },
          { "name": "myspace" },
          { "name": "blah" },
          { "name": "hi" },
          { "name": "bye" },
          { "name": "sean" },
          { "name": "yas" },
          { "name": "butts" }
        ],
        edges: [
          
        ],
        circleRadii: [20, 40, 65, 71, 100, 23, 10, 45, 76, 60]
      };
      /*
      var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                  return "<strong>Frequency:</strong> <span style='color:red'>" + "50" + "</span>";})
      */
      var force = d3.layout.force()
                 .nodes(dataset.nodes)
                 .links(dataset.edges)
                 .size([w, h])
                 .linkDistance([200])
                 .charge([-1000])
                 .start();

      var colors = d3.scale.category10();

      var svg = d3.select("#d3-region")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
      //svg.call(tip);
      
      var edges = svg.selectAll("line")
        .data(dataset.edges)
        .enter()
        .append("line")
        .style("stroke", "#ccc")
        .style("stroke-width", 1);
      
      var nodes = svg.selectAll("circle")
        .data(visited)
        .enter()
        .append("circle")
        .attr("r", function(d) { return d;})
        .data(dataset.nodes)
        .style("fill", function(d, i) {
          return colors(i);
        })
        .call(force.drag);
        /*
      nodes.append("svg:text")
          .data(dataset.nodes)
          .text(function(d) { return d.name;})
          .style("font-size", 12)
          .style("fill", "#555");
         // .style("text-anchor", "middle");
          */
      
      force.on("tick", function() {

        edges.attr("x1", function(d) { return d.source.x; })
           .attr("y1", function(d) { return d.source.y; })
           .attr("x2", function(d) { return d.target.x; })
           .attr("y2", function(d) { return d.target.y; });
      
        nodes.attr("cx", function(d) { return d.x; })
           .attr("cy", function(d) { return d.y; });
  
      });

});

});
