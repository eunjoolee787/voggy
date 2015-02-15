var myjson = "4pm";

$(document).ready( function() {

  getLocation();

});

  function getLocation() {
      var user_loc;
      if (navigator.geolocation) {
          $('#button').on('click', function() {
            user_loc = navigator.geolocation.getCurrentPosition(showPosition);
          });
      } else { 
          $('#demo').innerHTML = "Geolocation is not supported by this browser.";
      }
      return user_loc;
  }

  function showPosition(position) {
      $('#demo').html("Latitude: " + position.coords.latitude + 
      "<br>Longitude: " + position.coords.longitude); 
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
    console.log(user_lat);
    console.log(user_lon);

    // search file for user geodata
    $.getJSON("./data/4pm.json", function(data) {
      var results = data.filter(function(v) {
        console.log(v.LAT == user_lat && v.LON == user_lon);
        return (v.LAT == user_lat && v.LON == user_lon);
      });
      console.log(results);
      console.log(results[0].LAT);
      console.log(results[0].LON);
      console.log(results[0].SO2);
      console.log(results[0].SO4);
      $('#location').html("SO2: " + results[0].SO2 + "<br>" + "SO4: " + results[0].SO4);

      var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

      var curr_date = new Date();
      console.log(curr_date);

      var day = curr_date.getDay();
      // var day = days[curr_date.getDay()];
      console.log(day);

      var month = months[curr_date.getMonth()];
      console.log(month);

      var year = curr_date.getFullYear();
      console.log(year);

      var hour = curr_date.getHours();
      console.log(hour);

      console.log(curr_date);
      // console.log(month + " " + day + ", " + year);
      // $('date').html(month + " " + day + ", " + year);
      $('#date').html(month + " " + day + ", " + year);

      var s02 = results[0].SO2;
      var s04 = results[0].SO4;

      if(s02 > 0.6 || s04 > 50) {
        console.log("condition: poor"); 
        // display poor icon face-sad
      }
      // else, if either or both fair, condition is fair
      else if( (s02 >= 0.1 && s02 <= 0.6) || (s04 >= 12 && s04 <= 50 ) ) {
        console.log("condition: fair"); 
        // display fair icon face-plain
      }
      // else, condition is good 
      else {
        console.log("condition: good"); 
        // display good icon face-smile
      }

    });

    // assess vog condition: good, fair, poor

    // display to app
    //   - condition
    //   - S02 and S04 values

  }


