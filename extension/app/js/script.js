var hist;

$(document).ready(function() {
	// tops urls and visit counts init
	var urls = [];
	var normalized_visited = [];
    var visited = [];
	var sorted = [];

	// regex for parsing
	var patt = /(.com|.org|.io|.me|.gov|.edu|.net)(.*)/
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
    	for (var i = sorted.length - 1, len = 0; i > len; i--){
    		var hold_re = sorted[i].url.split(patt)[2];
    		if (hold_re == '/'){
    			hold_string = sorted[i].url.substring(0,
    				sorted[i].url.lastIndexOf("/"));
    		}
    		else{
    			hold_string = sorted[i].url.replace(hold_re, '');
    		}
    		var changed = 0;
    		for (var j = 0; j < count; j++){

    			if (temp_url[j] == hold_string){
    				temp_count[temp_url.indexOf(hold_string)] += sorted[i].visitCount;
    				changed = 1;
    				break;
    			}
    		}
    		if (changed == 0){
    			temp_url.push(hold_string);
    			temp_count.push(sorted[i].visitCount);
	      		console.log(temp_url[count]);
	      		console.log(temp_count[count]);
	      		count++;
	      	}
	      	if (count >= 10){
	      		break;
	      	}
	      	
	   	}
	   	visited = temp_count.slice();
	   	urls = temp_url.slice();
	   	for (i = 0; i < count; i++){
	   		if (visited[i] > 150){
	   			normalized_visited[i] = 150;
	   		}
	   		else if (visited[i] < 30){
	   			normalized_visited[i] = 30;
	   		}
	   		else{
	   			normalized_visited[i] = visited[i];
	   		}
	   	}
    
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
      
      var nodes = svg.selectAll(".node")
        .data(normalized_visited)
        .enter()
        .append("circle")
        .attr("r", function(d) { return d;})
        .data(dataset.nodes)
        .style("fill", function(d, i) {
          return colors(i);
        })
        .call(force.drag);

 nodes.append("title").data(urls)
      .text(function(d) { return d; });
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
