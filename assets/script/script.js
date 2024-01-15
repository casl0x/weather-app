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

    validateSeach.addEventListener('click', () => {
        const city = writeCity.value;
        if(city){
            getWeather(city)
        }
    });

    async function getWeather(city) {
        try {
            const localisation = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
            const dataL = await localisation.json();

            console.log(dataL)

            if (dataL.length > 0) {
                const coordResult = dataL[0];
                const {latitude, longitude, timezone} = coordResult;

                const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timeformat=unixtime&timezone=${timezone}`);

                const dataW = await weather.json();
                weatherTemp.innerHTML = `${dataW.hourly.temperature_2m} °C  ▬  fells like : ${dataW.hourly.apparent_temperature}` ;
                weatherCity.innerHTML = resultat.name; 
            } else {
                alert("City not found!")
            }
            

        } catch (err) {
            console.error("error", err.message)
            alert("Fail !");
        }
    }

    getWeather()
});