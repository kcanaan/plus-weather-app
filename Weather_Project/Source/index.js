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
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector("#temp-high").innerHTML = `H:${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector("#temp-low").innerHTML = `L:${Math.round(
    response.data.main.temp_min
  )}°`;
  document.querySelector("#current-condition").innerHTML =
    response.data.weather[0].description;
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
