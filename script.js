$(document).ready(function() {
  
  var currentDay = moment().format('LL');

$.ajax ({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=Austin, Texas&appid=ebbe9aba6bb9ec7a3858466e6dae8ae4",
    method: "GET"
  }).then (function(response) {
    console.log(response);
  });


});
