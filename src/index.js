let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = days[now.getDay()];
let currentDate = document.querySelector("#current-date");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

currentDate.innerHTML = `${currentDay}  ${hours}:${minutes}`;

//search city

function showWeatherInfo(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "daa749fc6837b7daafa20aa58fc693cb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeatherInfo);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-form").value;
  searchCity(city);
}
function getLocation(position) {
  let apiKey = "daa749fc6837b7daafa20aa58fc693cb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherInfo);
}
function showCurrentInfo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let searchResult = document.querySelector("#form");
searchResult.addEventListener("submit", handleSubmit);

document
  .querySelector("#button-current")
  .addEventListener("click", showCurrentInfo);

searchCity("Žilina");

//Celsious to Fahrenheit

function celsiousToF() {
  let currentTemperature = document.querySelector("#current-temperature");
  let celsiousTemperature = currentTemperature.innerHTML;
  currentTemperature.innerHTML = Math.round(celsiousTemperature * 1.8 + 32);
}

let celsious = document.querySelector("#fahrenheit-link");
celsious.addEventListener("click", celsiousToF);

//F to C
function fahrenheitToC(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  let fahrenheitTemperature = currentTemperature.innerHTML;
  currentTemperature.innerHTML = Math.round(
    (fahrenheitTemperature - 32) * 0.5556
  );
}
let fahrenheit = document.querySelector("#celsious-link");
fahrenheit.addEventListener("click", fahrenheitToC);
