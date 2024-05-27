"use strict";

const APIKey = "091a4a110a4b6b7fd0fa46c0f9ec92a4";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.querySelector(".search-bar input");
  const searchBtn = document.querySelector(".search-btn");

  searchBtn.addEventListener("click", () => {
    // Get the value of the input box when the button is clicked
    const city = searchBox.value.trim(); // Trim extra whitespace

    if (city) {
      checkWeather(city);
    } else {
      console.error("Please enter a city name.");
    }

    searchBox.value = "";
  });
});

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${APIKey}`);

  if (response.status === 404) {
    document.querySelector(".err-msg").style.display = "block";
    document.querySelector(".weather-section").style.display = "none";
  } else {
    document.querySelector(".err-msg").style.display = "none";
  }

  const data = await response.json();

  console.log(data);

  // Access elements within checkWeather function after DOM is loaded
  const weatherIcon = document.querySelector(".weather-icon");
  const cityElement = document.querySelector(".city");
  const tempElement = document.querySelector(".temp");
  const humidityElement = document.querySelector(".humidity");
  const windElement = document.querySelector(".wind");
  const card = document.querySelector(".container"); // Define the card variable here

  if (data.cod === 200) {
    cityElement.textContent = data.name;
    tempElement.textContent = Math.round(data.main.temp) + "°C";
    humidityElement.textContent = data.main.humidity + "%";
    windElement.textContent = data.wind.speed + " km/h";

    // Set weather icon and background image based on weather condition
    setWeatherIcon(data.weather[0].main, card); // Pass the card variable to the setWeatherIcon function
  } else {
    console.error("City not found.");
  }
}

function setWeatherIcon(weatherCondition, card) {
  // Include card as a parameter here
  const weatherIcon = document.querySelector(".weather-icon");

  switch (weatherCondition) {
    case "Clouds":
      weatherIcon.src = "images/clouds.png";
      card.style.backgroundImage = "url('images/cloudy.jpg')";
      break;
    case "Clear":
      weatherIcon.src = "images/clear.png";
      card.style.backgroundImage = "url('images/sunny.jpg')";
      break;
    case "Rain":
      weatherIcon.src = "images/rain.png";
      card.style.backgroundImage = "url('images/rainy.jpg')";
      break;
    case "Smoke":
      weatherIcon.src = "images/clouds.png";
      card.style.backgroundImage = "url('images/misty.jpg')";
      break;
    case "Drizzle":
      weatherIcon.src = "images/drizzle.png";
      card.style.backgroundImage = "url('images/drizzle.jpg')";
      break;
    case "Haze":
      weatherIcon.src = "images/mist.png";
      card.style.backgroundImage = "url('images/misty.jpg')";
      break;
    default:
      console.error("Weather condition not supported:", weatherCondition);
  }

  document.querySelector(".weather-section").style.display = "flex";
}
