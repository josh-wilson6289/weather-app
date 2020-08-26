$(document).ready(function() {
 
var citySearch = "";
var currentCity = $("#currentCity");
var currentTemp = $("#currentTemp");
var currentHumidity = $("#currentHumidity");
var currentWindSpeed = $("#currentWindSpeed");
var currentUvIndex = $("#currentUvIndex");
var fTemp;

function tempConversion(kTemp) {
  fTemp = ((kTemp-273.15)*1.8)+32;
  fTemp = Math.floor(fTemp);
  return fTemp;
}

function getCurrentWeather(){
  var querySelector = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch +"&appid=ebbe9aba6bb9ec7a3858466e6dae8ae4"

  $.ajax ({
    url: querySelector,
    method: "GET"
  }).then (function(response) {
    //converts kalvin to farenheight
    console.log(response);
    
    tempConversion(response.list[0].main.temp);

    currentCity.text(response.city.name + " Weather");
    currentTemp.text(fTemp + " Degrees");
    currentHumidity.text(response.list[0].main.humidity);
    currentWindSpeed.text(response.list[0].wind.speed);
    
    
    
  });
}



// click event to run getCurrentWeather function when search button is clicked.
$("#citySubmitBtn").click(function () {
   event.preventDefault();
   citySearch = $("#citySearch").val();
   getCurrentWeather(citySearch);
});


});

