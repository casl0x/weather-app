document.addEventListener('DOMContentLoaded', function () { 
    // clé api
    const apiKey = '3f23b6f16c2b419d6eaa598f5f59f93a';  

    // validation dans la zone de texte avec enter
    const writeCity = document.querySelector('.search-input');
    writeCity.addEventListener('keypress', (e) => {
        if (e.keyCode === 13) {
            getWeather(writeCity.value);
        }
    })

    // validation de la zone de texte avec le bouton submit
    const validateSeach = document.querySelector('.seach-btn');
    validateSeach.addEventListener('click', (e) => {
        getWeather(writeCity.value)
    })

    // liaison de l'api météo
    async function getWeather(city) {
        try {
            const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const data = await weather.json();
            console.log(data);
            showWeather(data);
            
        } catch (err) {
            console.error("error", err.message);
            alert("Fail !");
        }
    }

    // création de la carte d'info météo
    function showWeather (data){
        const today = new Date()

        const card = document.querySelector('.container');
        const result = document.querySelector('.result');

        const imgIcon = document.createElement('img');
        imgIcon.classList.add('weather-icon');

        icons(data, imgIcon)
        result.innerHTML = 
        `
        <div class="weather">
            <p class="weather-city">${data.name}</p>
            <p class="weather-date">${today}</p>
            <img src="${imgIcon.src}" class="weather-icon">
            <p class="weather-temp">${Math.round(data.main.temp)}&deg;C</p>
            <p class="weather-feels>Feels like : ${Math.round(data.main.feels_like)}&deg;C</p>
        </div>
        `
        card.append(result);
        reset();
    }

    // reset de l'input text
    function reset() {
        let input = document.getElementById('input-box');
        input.value = "";
    }

    // changement d'icone selon les conditions météos
    function icons (data, imgIcon){
        if (data.weather[0].main === 'Rain') {
          imgIcon.src = 'assets/img/icon/rain.png';
        } else if (data.weather[0].main === 'Clouds') {
          imgIcon.src = 'assets/img/icon/cloud.png';
        } else if (data.weather[0].main === 'Clear') {
          imgIcon.src = 'assets/img/icon/cloud-sun.png';
        } else if (data.weather[0].main === 'Snow') {
          imgIcon.src = 'assets/img/icon/snowflake.png';
        } else if (data.weather[0].main === 'Sunny') {
          imgIcon.src = 'assets/img/icon/sun.png';
        } else if (data.weather[0].main === 'Mist') {
          imgIcon.src = 'assets/img/icon/smog.png';
        } else if (data.weather[0].main === 'Thunderstorm' || data.weather[0].main === 'Drizzle') {
          imgIcon.src = 'assets/img/icon/thunderstorm.png';
        } else {
          imgIcon.src = 'assets/img/icon/cloud-sun.png';
        }
      }
});