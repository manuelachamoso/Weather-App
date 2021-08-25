// Select Elements
const notification = document.querySelector('.notification');
const icon = document.querySelector('.weather-icon');
const temperatureValue = document.querySelector('.temperature-value p');
const temperatureDescription = document.querySelector('.temperature-description p');
const locationElement = document.querySelector('.location p');

const weather = {};

weather.temperature = {
    unit: 'celsius'
}

const Kelvin = 273.15;
const key = 'put your key here';

// Check if the browser support Geolocation
if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);

} else {
    notification.style.display = 'block';
    notification.innerHTML = '<p>Browser does not support Geolocation</p>';
}

// Set User's position
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

function showError(error) {
    notification.style.display = 'block';
    notification.innerHTML = `<p> ${error.message} </p>`
}

// Get Weather from the API
function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`; 

    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - Kelvin);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    })
}
 
function displayWeather() {
     icon.innerHTML =`<img src= "icons/${weather.iconId}.png"/>`;
     temperatureValue.innerHTML = `${weather.temperature.value} °<span>C</span>`;
     temperatureDescription.innerHTML = weather.description;
     locationElement.innerHTML = `${weather.city}, ${weather.country}`;
};














