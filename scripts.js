// scripts.js
window.onload = function() {

  var getLocButton = document.getElementById("button");
  var demoDiv = document.getElementById("demo");
  getLocButton.addEventListener('click', getLocation);

  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
          demoDiv.innerHTML = "Geolocation is not supported by this browser.";
      }
      console.log(navigator);
  }

  function showPosition(position) {
      demoDiv.innerHTML = "Latitude: " + position.coords.latitude + 
      "<br>Longitude: " + position.coords.longitude;  
  }

  

};