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
            const localisation = await fetch(`https://api.api-ninjas.com/v1/weather?city= ${writeCity.value}`, {
                method: 'GET',
                headers: {
                    'X-Api-Key': 'IFV69ObX+6vTbrpfBr6Qmw==HZ6dWj1X4MKCe0cR',
                    'Content-Type': 'application/json'
                }
            });

            const data = await localisation.json();
            weatherTemp.innerHTML = `${data.temp} °C` ;

        } catch (err) {
            console.error("error", err.message)
            alert("Fail !");
        }
    }

    validateSeach.addEventListener('click', getWeather);

    getWeather()
});