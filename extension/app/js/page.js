$(".sbutton").click(
  function() {
    switch(this.id) {
      case 'o1':
        $("#o1").addClass("selected");
        $("#o2").removeClass("selected");
        $("#o3").removeClass("selected");
        break;
      case 'o2':
        $("#o1").removeClass("selected");
        $("#o2").addClass("selected");
        $("#o3").removeClass("selected");
        break;
      case 'o3':
        $("#o1").removeClass("selected");
        $("#o2").removeClass("selected");
        $("#o3").addClass("selected");
        break;
    }
  }
);
