var twoIsLoaded = false;

$(document).ready(function() {
  $("#d3-region-2").hide();
  draw_circles();
  $(".sbutton").click(
  function() {
    switch(this.id) {
      case 'o1':
        $("#o1").addClass("selected");
        $("#o2").removeClass("selected");
        $("#sidebar").show();
        $("#d3-region-1").show();
        $("#d3-region-2").hide();
        break;
      case 'o2':
        if (!twoIsLoaded) {
          draw_graph();
          twoIsLoaded = true;
        }
        $("#o1").removeClass("selected");
        $("#o2").addClass("selected");
        $("#sidebar").hide();
        $("#d3-region-1").hide();
        $("#d3-region-2").show();
        break;
    }
  }
  );

  $("#tooltip-area").hide();
  $("#tooltip").hover( function() {
    $("#tooltip-area").show();
  },
  function() {
    $("#tooltip-area").hide();
  });

});


