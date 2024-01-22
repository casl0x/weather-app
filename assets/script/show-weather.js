// création de la carte d'info météo
    function showWeather (data){
        const result = document.querySelector('.weather');

        result.innerHTML = 
        `
            <div class="weather-info">
                <p class="weather-info-city">${data.city.name}</p>
                <!-- <img class="weather-info-picture"> -->
            </div>
        `
        // const infoWeather = document.querySelector('.weather-info-picture');
        // infoWeather.src= `url(${showPicture})`;

        const weekContainer = document.createElement('div');
        weekContainer.classList.add("weather-week")

        for (let i = 1; i < 7; i++) {
            
            const dayContainer = document.createElement('div');
            dayContainer.classList.add("weather-daily")
            const dayIcon = document.createElement('img');
            dayIcon.classList.add('icon');
            icons(data, dayIcon);

            dayContainer.innerHTML = 
            `
                    <p class="weather-daily-temp">${Math.round(data.list[i].main.temp)}&deg;C</p>
                    <p class="weather-daily-feels">Feels like : ${Math.round(data.list[i].main.feels_like)}&deg;C</p>
                    <img src="${dayIcon.src}" class="weather-daily-icon">
                    <p>${data.list[i].weather[0].main}</p>
            `;
            weekContainer.appendChild(dayContainer);
        }
        result.appendChild(weekContainer)
    }


    // api img 
    // async function cityPicture(pic){
    //   try {
    //     const picture = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${clientId}&per_page=1`);
    //     const dataP = await picture.json();
    //     console.log(dataP);
        
    //   } catch (error){
    //     console.error("error", error.message);
    //     alert("Fail : no picture! ");
    //   } 
    // }

 // changement d'icone selon les conditions météos
    function icons (data, imgIcon){
        if (data.list[i].weather[0].main === 'Rain') {
          imgIcon.src = 'assets/img/icon/rain.png';
        } else if (data.list[i].weather[0].main === 'Clouds' || data.list[i].weather[0].main === 'Mist') {
          imgIcon.src = 'assets/img/icon/cloud.png';
        } else if (data.list[i].weather[0].main === 'Clear') {
          imgIcon.src = 'assets/img/icon/cloud-sun.png';
        } else if (data.list[i].weather[0].main === 'Snow') {
          imgIcon.src = 'assets/img/icon/snowflake.png';
        } else if (data.list[i].weather[0].main === 'Sunny') {
          imgIcon.src = 'assets/img/icon/sun.png';
        } else if (data.list[i].weather[0].main=== 'Thunderstorm' || data.list[i].weather[0].main === 'Drizzle') {
          imgIcon.src = 'assets/img/icon/thunderstorm.png';
        } else {
          imgIcon.src = 'assets/img/icon/cloud-sun.png';
        }
    }


export default showWeather;