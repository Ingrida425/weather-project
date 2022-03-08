function updateTime() {
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
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let updatedTime = document.querySelector("#last-updated");
  updatedTime.innerHTML = `Last updated: ${day} ${hours}:${minutes}`;
}
updateTime();

//-----------------Current location button:-----------------
function showCurrentWeather(response) {
  console.log(response.data);
  //let currentTemperature = Math.round(response.data.main.temp);
  //let showCurrentTemperature = document.querySelector("#current-temp");
  // showCurrentTemperature.innerHTML = `${currentTemperature}`;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#real-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "72ed8a85e3f275bf8313543794566f89";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showCurrentWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonLocation = document.querySelector("#current-button");
buttonLocation.addEventListener("click", getCurrentPosition);

//----------------------Search by user:---------------------
function showTemperature(response) {
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  celsiusTemp = response.data.main.temp;
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#real-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  //let mainIcon = document.querySelector("#city-icon");
  //mainIcon.setAttribute(
  // "src",
  // `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  //);
  //mainIcon.setAttribute("alt", response.data.weather.description);
}
function search(city) {
  let apiKey = "72ed8a85e3f275bf8313543794566f89";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}
function getTemperature(event) {
  event.preventDefault();
  let city = document.querySelector("input").value;
  search(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", getTemperature);

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

search("Vilnius");
