let currentTime = document.querySelector("h2");
function displayDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = [
    12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11,
  ];
  let hour = hours[date.getHours()];
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day}, ${hour}:${minute}`;
}
let now = new Date();
currentTime.innerHTML = displayDate(now);

//END week 4^
//WEEK 5
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<hr><div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2"><span class="weekday">${formatDay(
      forecastDay.dt
    )}</span> 
      <br>
     <img
      src="https://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
      class="weekday-icon"
      >
<br><span class="weekday-high"> H: ${Math.round(
          forecastDay.temp.max
        )}°</span> <span class="weekday-low"><br> L: ${Math.round(
          forecastDay.temp.min
        )}°</span>`;

      forecastHTML = forecastHTML + `</div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "40b745c14eadad7b7c4e6e4bf3b70103";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayCurrentTemp(response) {
  console.log(response.data);

  fahrenheitTemp = response.data.main.temp;
  fahrenheitHigh = response.data.main.temp_max;
  fahrenheitLow = response.data.main.temp_min;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    fahrenheitTemp
  )}`;
  document.querySelector("#temp-high").innerHTML = `H:${Math.round(
    fahrenheitHigh
  )}°`;
  document.querySelector("#temp-low").innerHTML = `L:${Math.round(
    fahrenheitLow
  )}°`;
  document.querySelector("#current-condition").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = `Windspeed: ${Math.round(
    response.data.wind.speed
  )}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "40b745c14eadad7b7c4e6e4bf3b70103";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayCurrentTemp);
}
// https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=40b745c14eadad7b7c4e6e4bf3b70103&units=imperial`
function locationSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  search(city);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", locationSubmit);

function displayCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temperature");
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  tempElement.innerHTML = Math.round(celsiusTemp);
  let celsiusHighTemp = ((fahrenheitHigh - 32) * 5) / 9;
  let celsiusHigh = document.querySelector("#temp-high");
  celsiusHigh.innerHTML = `H: ${Math.round(celsiusHighTemp)}°`;
  let celsiusLowTemp = ((fahrenheitLow - 32) * 5) / 9;
  let celsiusLow = document.querySelector("#temp-low");
  celsiusLow.innerHTML = `L: ${Math.round(celsiusLowTemp)}°`;
}

let fahrenheitTemp = null;
let fahrenheitHigh = null;
let fahrenheitLow = null;

let celsiusLink = document.querySelector("#celsius");

celsiusLink.addEventListener("click", displayCelsiusTemp);

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temperature");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
  let fahrenheitHighTemp = document.querySelector("#temp-high");
  fahrenheitHighTemp.innerHTML = `H: ${Math.round(fahrenheitHigh)}°`;
  let fahrenheitLowTemp = document.querySelector("#temp-low");
  fahrenheitLowTemp.innerHTML = `L: ${Math.round(fahrenheitLow)}°`;
}

let fahrenheitLink = document.querySelector("#fahrenheit");

fahrenheitLink.addEventListener("click", displayFahrenheitTemp);
