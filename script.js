$(document).ready(function() {
 
var city = "";

function getCurrentWeather(){
  var querySelector = "https://api.openweathermap.org/data/2.5/forecast?q=" + city +"&appid=ebbe9aba6bb9ec7a3858466e6dae8ae4"

  $.ajax ({
    url: querySelector,
    method: "GET"
  }).then (function(response) {
    console.log(response);
  });
}

// getCurrentWeather();
//   function tempConversion(){

//   }

$("#citySubmitBtn").click(function () {
   event.preventDefault();
   city = $("#citySearch").val();
   getCurrentWeather(city);
});


});

