let h2 = document.querySelector("h2");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = [
  12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
];
let hour = hours[now.getHours()];
let minutes = [
  00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
  38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
  57, 58, 59, 60,
];
let minute = minutes[now.getMinutes()];
h2.innerHTML = `${day}, ${hour}:${minute}`;

//END week 4^
//WEEK 5
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
