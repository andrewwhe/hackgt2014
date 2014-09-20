var API_KEY = "AIzaSyA62Emg7xa0gMRpgXrMc6MxeuMckYhulX8";

function submitButton() {
	$("#submit-modal").modal();
}

function compare(origin, origin2, max) {

	var val;

	var coord1 = [];
	var query1 = "https://maps.googleapis.com/maps/api/geocode/json?address=";
	query1+=(origin).replace(/ /g, "+");
	query1+="&key="+API_KEY;

	var coord2 = [];
	var query2 = "https://maps.googleapis.com/maps/api/geocode/json?address=";
	query2+=(origin2).replace(/ /g, "+");
	query2+="&key="+API_KEY;

	$.ajax({
		url: query1,
		type: 'get',
		success: function(data) {
			if(data["status"] != "OK")
				return "error";
			coord1.push(data["results"][0]["geometry"]['location']["lat"]);
			coord1.push(data["results"][0]["geometry"]['location']["lng"]);
			$.ajax({
				url: query2,
				type: 'get',
				success: function(data) {
					if(data["status"] != "OK")
						return "error";
					coord2.push(data["results"][0]["geometry"]['location']["lat"]);
					coord2.push(data["results"][0]["geometry"]['location']["lng"]);

					if( max<=getMilesFromCoordinates(coord1[0], coord1[1], coord2[0], coord2[1]) )
						return true;
					else
						return false;
				}
			});
		}
	});
	
}

function getMilesFromCoordinates(lat1, lon1, lat2, lon2) {
	console.log(lat1 + " " + lon1 + " " + lat2  + " " + lon2)
	var radlat1 = Math.PI * lat1/180;

  var radlat2 = Math.PI * lat2/180;

  var radlon1 = Math.PI * lon1/180;

  var radlon2 = Math.PI * lon2/180;

  var theta = lon1-lon2;

  var radtheta = Math.PI * theta/180;

  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  dist = Math.acos(dist);

  dist = dist * 180/Math.PI;

  dist = dist * 60 * 1.1515;

  return dist;
}