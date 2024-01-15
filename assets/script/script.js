document.addEventListener('DOMContentLoaded', function () {
   const card = document.querySelector('.container');

    const weatherDiv = document.createElement('div');
    weatherDiv.classList.add('weather')
    card.appendChild(weatherDiv);
    const weatherIcon = document.createElement('img');
    weatherIcon.classList.add('weather-icon');
    weatherIcon.src = "assets/img/icon/neigeux.png";
    const weatherTemp = document.createElement('p');
    weatherTemp.classList.add('weather-temp');
    weatherTemp.innerHTML = '';
    const weatherCity = document.createElement('p');
    weatherCity.classList.add('weather-city');
    weatherCity.innerHTML = '';

    weatherDiv.appendChild(weatherIcon);
    weatherDiv.appendChild(weatherTemp);
    weatherDiv.appendChild(weatherCity); 
})


const writeCity = document.querySelector('.input-city');
const validateSeach = document.querySelector('.seach-btn');

async function seachWeather (){
    try {
        const localisation = await fetch('http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}');
        const locData = await localisation.json();

        const weather = await fetch('https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}');
        const weatherData = await weather.json();
    } catch (err) {
        alert("Failed to fetch quote !");
    }
}