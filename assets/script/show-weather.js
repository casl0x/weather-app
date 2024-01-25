 // changement d'icone selon les conditions météos
 function icons (data, imgIcon, i){
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

  // api img 
async function cityPicture(pic){
    const clientId ='3HuUBlMXdX4em8AJolNusLsGl66WnZaD2f4AHxH1QMw'
    try {
        const picture = await fetch(`https://api.unsplash.com/search/photos?query=${pic}&client_id=${clientId}&per_page=1&orientation=landscape`);
        const dataP = await picture.json();
        const URLpic = dataP.results[0].urls.small;
        console.log(dataP);
        return URLpic;

    } catch (error){
        console.error("error", error.message);
        alert("Fail : no picture! ");
    } 
}

// création de la carte d'info météo
async function showWeather (data){
        const result = document.querySelector('.weather');

        result.innerHTML = 
        `
            <div class="weather-info">
                <img class="weather-info-picture"> 
                <p class="weather-info-city">${data.city.name}</p>
            </div>
        `
        const infoWeather = document.querySelector('.weather-info-picture');
        const showPic = await cityPicture(data.city.name)
        infoWeather.src= showPic;

        const weekContainer = document.createElement('div');
        weekContainer.classList.add("weather-week")

        for (let i = 1; i < 40; i+=8) {
            
            const dayContainer = document.createElement('div');
            dayContainer.classList.add("weather-daily")
            const dayIcon = document.createElement('img');
            dayIcon.classList.add('icon');
            icons(data, dayIcon, i);

            const day = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
            const dateDisplay = new Date(data.list[i].dt_txt);

            dayContainer.innerHTML = 
            `
                <p class="weather-daily-date">${day[dateDisplay.getDay()]}</p>
                <div class="weather-daily-temp">
                  <p>${Math.round(data.list[i].main.temp)}&deg;C</p>
                  <p>Feels like : ${Math.round(data.list[i].main.feels_like)}&deg;C</p>
                </div>
                <img src="${dayIcon.src}" class="weather-daily-icon">
                <p class="weather-daily-descr">${data.list[i].weather[0].main}</p>
            `;
            weekContainer.appendChild(dayContainer);
        }
        result.appendChild(weekContainer)
    }

export default showWeather;