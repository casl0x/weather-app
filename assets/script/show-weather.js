// création de la carte d'info météo
    function showWeather (data, dataP,){
        const result = document.querySelector('.weather');

        const showPicture = dataP.results[0].urls.regular;
        result.innerHTML = 
        `
            <div class="weather-info">
                <p class="weather-info-city">${data.city.name}</p>
                <img class="weather-info-picture">
            </div>
        `
        const infoWeather = document.querySelector('.weather-info-picture');
        infoWeather.src= `url(${showPicture})`;

        const weekContainer = document.createElement('div');
        weekContainer.classList.add("weather-week")

        for (let i = 1; i < 7; i++) {
            const dayData = data.list[i];

            const dayContainer = document.createElement('div');
            dayContainer.classList.add("weather-daily")
            const dayIcon = document.createElement('img');
            dayIcon.classList.add('icon');
            icons(dayData, dayIcon);

            dayContainer.innerHTML = 
            `
                    <p class="weather-daily-temp">${Math.round(dayData.main.temp)}&deg;C</p>
                    <p class="weather-daily-feels">Feels like : ${Math.round(dayData.main.feels_like)}&deg;C</p>
                    <img src="${dayIcon.src}" class="weather-daily-icon">
                    <p>${dayData.weather[0].main}</p>
            `;
            weekContainer.appendChild(dayContainer);
        }
        result.appendChild(weekContainer)
        reset();
    }

 // changement d'icone selon les conditions météos
    function icons (dayData, imgIcon){
        if (dayData.weather[0].main === 'Rain') {
          imgIcon.src = 'assets/img/icon/rain.png';
        } else if (dayData.weather[0].main === 'Clouds' || dayData.weather[0].main === 'Mist') {
          imgIcon.src = 'assets/img/icon/cloud.png';
        } else if (dayData.weather[0].main === 'Clear') {
          imgIcon.src = 'assets/img/icon/cloud-sun.png';
        } else if (dayData.weather[0].main === 'Snow') {
          imgIcon.src = 'assets/img/icon/snowflake.png';
        } else if (dayData.weather[0].main === 'Sunny') {
          imgIcon.src = 'assets/img/icon/sun.png';
        } else if (dayData.weather[0].main=== 'Thunderstorm' || dayData.weather[0].main === 'Drizzle') {
          imgIcon.src = 'assets/img/icon/thunderstorm.png';
        } else {
          imgIcon.src = 'assets/img/icon/cloud-sun.png';
        }
    }

// reset de l'input text
    function reset() {
        let input = document.getElementById('input-box');
        input.value = "";
    }

export default showWeather;