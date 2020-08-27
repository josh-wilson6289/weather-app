$(document).ready(function() {
 
  var citySearch = "";
  var currentCity = $("#currentCity");
  var currentTemp = $("#currentTemp");
  var currentHumidity = $("#currentHumidity");
  var currentWindSpeed = $("#currentWindSpeed");
  var currentUvIndex = $("#currentUvIndex");
  var currentIcon = $("#currentIcon");

  
  
  var currentDate = $("#currentDate");
  currentDate.text(moment().format("MMMM Do YYYY"));
  var lat;
  var lon;
  

  

    //gets lattitude and longitude and puts city name into the DOM
  function getCoords(citySearch) {
    var querySelector = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch +"&appid=ebbe9aba6bb9ec7a3858466e6dae8ae4"

    $.ajax ({
      url: querySelector,
      method: "GET"
    }).then (function(response) {
      lat = response.city.coord.lat;
      lon = response.city.coord.lon;
      currentCity.text(response.city.name);
      getCurrentWeather(lat,lon);
    });
  }
  // gets current weather by lat/lon and displays to the DOM
  function getCurrentWeather(lat,lon) {
    
    var oneCallQuerySelector = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=ebbe9aba6bb9ec7a3858466e6dae8ae4"
     
    $.ajax ({
      url: oneCallQuerySelector,
      method: "GET"
    }).then (function(response) {
      currentIcon.attr("src", "http://openweathermap.org/img/wn/" + response.current.weather[0].icon + "@2x.png");         
      currentTemp.text("Current Temperature: "+ Math.floor(response.current.temp) + " degrees");
      currentHumidity.text("Humidity: " + Math.floor(response.current.humidity) + "%");
      currentWindSpeed.text("Wind Speed: " + Math.floor(response.current.wind_speed) + " mph");
      currentUvIndex.text("UV Index: " + Math.floor(response.current.uvi));
        if (response.current.uvi > 11) {
          currentUvIndex.css("background-color", "red");
        }
        else if (response.current.uvi > 6 && response.current.uvi < 11){
          currentUvIndex.css("background-color", "yellow");
        }
        else {
          currentUvIndex.css("backround-color", "green");
        }
        console.log(response);
        getFutureWeather(lat,lon);
    });   
  }
    function getFutureWeather(lat,lon) {
      var oneCallQuerySelector = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=ebbe9aba6bb9ec7a3858466e6dae8ae4"
        $.ajax ({
          url: oneCallQuerySelector,
          method: "GET"
        }).then (function(response) {
          for (var i = 1; i <= 5; i++) {
          var futureTempIcon = $("<img>");
          $(futureTempIcon).attr("src", "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png");
          var futureHighTemp = $("<p>");
          $(futureHighTemp).text("High: " + Math.floor(response.daily[i].temp.max));
          var futureLowTemp = $("<p>");
          $(futureLowTemp).text("Low: " + Math.floor(response.daily[i].temp.min));
          var futureHumidity = $("<p>");
          $(futureHumidity).text("Humidity: " + Math.floor(response.daily[i].humidity));
          
          $("#card" + [i]).append(futureTempIcon);
          $("#card" + [i]).append(futureHighTemp);
          $("#card" + [i]).append(futureLowTemp);
          $("#card" + [i]).append(futureHumidity);
            
        }
          // highTempOne.text("High: " + Math.floor(response.daily[1].temp.max));
        });
   
  }



  // click event to run getCurrentWeather function when search button is clicked.
  $("#citySubmitBtn").click(function () {
    event.preventDefault();
    citySearch = $("#citySearch").val();
    getCoords(citySearch);
  });


});

