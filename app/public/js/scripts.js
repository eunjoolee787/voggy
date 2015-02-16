var myjson = "4pm";

$(document).ready( function() {

  getCurrDateTime();
  getLocation();

});

function getCurrDateTime() {
    var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var curr_date = new Date();
    var month = months[curr_date.getMonth()];
    var day = curr_date.getDate();
    // var day = curr_date.getDay();
    // var day = days[curr_date.getDay()];
    var year = curr_date.getFullYear();
    var hour = curr_date.getHours();
    var min = curr_date.getMinutes();
    // convert to 12-hour time with AM/PM
    console.log(month + " " + day + ", " + year);
    $('#date').html(month + " " + day + ", " + year);
    console.log(hour + ":" + min);
    $('#time').html(hour + ":" + min);
}

function getLocation() {
    var user_loc;
    if (navigator.geolocation) {
      user_loc = navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
    return user_loc;
}

function showPosition(position) {
    // console.log("Latitude: " + position.coords.latitude);
    // console.log("Longitude: " + position.coords.longitude); 
    var curr_position = {
      "latitude":  position.coords.latitude,
      "longitude": position.coords.longitude
    };
    getVogFactor(curr_position);
  }

// find user geolocation in data, and retrieves associated S02 and S04
function getVogFactor (pos) {
  var user_lat = Math.round((pos.latitude * 100))/100;
  var user_lon = Math.round((pos.longitude * 100))/100;
  console.log("User LAT: " + user_lat);
  console.log("User LON: " + user_lon);
  // query geocode api for city, state, and display

  // search file for user geodata
  $.getJSON("./data/4pm.json", function(data) {

    // find SO2 and SO4 values
    var results = data.filter(function(v) {
      console.log(v.LAT == user_lat && v.LON == user_lon);
      return (v.LAT == user_lat && v.LON == user_lon);
    });
    
    console.log(results);
    console.log(results[0].LAT);
    console.log(results[0].LON);
    console.log(results[0].SO2);
    console.log(results[0].SO4);
    $('#so_2').html("SO<sub>2</sub>: " + results[0].SO2 + "ppm");
    $('#so_4').html("SO<sub>4</sub>: " + results[0].SO4 + "&mu;g/m<sup>3</sup>");

    // assess vog condition: good, fair, poor
    var so2 = results[0].SO2;
    var so4 = results[0].SO4;

    if(so2 > 0.6 || so4 > 50) {
      console.log("condition: poor"); 
      // display poor icon face-sad
      $('.face-sad').css("opacity", "1.0");
    }
    // else, if either or both fair, condition is fair
    else if( (so2 >= 0.1 && so2 <= 0.6) || (so4 >= 12 && so4 <= 50 ) ) {
      console.log("condition: fair"); 
      // display fair icon face-plain
      $('.face-plain').css("opacity", "1.0");
    }
    // else, condition is good 
    else {
      console.log("condition: good"); 
      // display good icon face-smile
      $('.face-smile').css("opacity", "1.0");
    }

  });

}


