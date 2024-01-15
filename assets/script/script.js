import  {iconMap}  from "./icon.js";

document.addEventListener('DOMContentLoaded', function () {
   const card = document.querySelector('.container');
    
   // météo du jour 
    const weatherDiv = document.createElement('div');
    weatherDiv.classList.add('weather')
    card.appendChild(weatherDiv);
    const weatherIcon = document.createElement('img');
    weatherIcon.classList.add('weather-icon');
    const weatherTemp = document.createElement('p');
    weatherTemp.classList.add('weather-temp');
    weatherTemp.innerHTML = '-';
    const weatherCity = document.createElement('p');
    weatherCity.classList.add('weather-city');
    weatherCity.innerHTML = '-';

    weatherDiv.appendChild(weatherIcon);
    weatherDiv.appendChild(weatherTemp);
    weatherDiv.appendChild(weatherCity); 

    

    const writeCity = document.querySelector('.search-input');
    const validateSeach = document.querySelector('.seach-btn');

    async function getWeather (){
        try {
            const localisation = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${writeCity.value}&count=1&language=en&format=json`)
            const dataL = await localisation.json();

            const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${dataL.latitude}&longitude=${dataL.longitude}1&hourly=temperature_2m,apparent_temperature,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timeformat=unixtime&timezone=${dataL.timezone}`);

            const dataW = await weather.json();
            weatherIcon.innerHTML = 
            weatherTemp.innerHTML = `${dataW.temperature_2m} °C  ▬  fells like : ${dataW.apparent_temperature}` ;
            weatherCity.innerHTML = dataL.city

        } catch (err) {
            console.error("error", err.message)
            alert("Fail !");
        }
    }

    validateSeach.addEventListener('click', getWeather);

    getWeather()
});