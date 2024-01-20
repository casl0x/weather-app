import showWeather from "./show-weather.js";
   
   // clé api
    const apiKey = '3f23b6f16c2b419d6eaa598f5f59f93a';
    const clientId = '3HuUBlMXdX4em8AJolNusLsGl66WnZaD2f4AHxH1QMw'

    // autocomplete
    const cityDatalist = document.querySelector('#city')
    async function autocompleteValue (placeName){
        try {
            const autocomplete = await fetch(`https://nominatim.openstreetmap.org/search?q=${placeName}&format=json&limit=5&featureType=city`);
            const dataA = await autocomplete.json();

            cityDatalist.innerHTML = '';

            dataA.forEach( result => {
                const option = document.createElement('option');
                option.value = result.name;
                cityDatalist.appendChild(option);
            });
        } catch (err) {
            console.error("error", err.message);
            alert("Fail: city not foud !");
        }
    }

    // liaison de l'api météo
    async function getWeather(city) {
        try {
            const forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
            const data = await forecast.json();
            console.log(data);

            const picture = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${clientId}&per_page=1`);
            const dataP = await picture.json();
            console.log(dataP);

            showWeather(data, dataP)
            
        } catch (err) {
            console.error("error", err.message);
            alert("Fail");
        }
    }


    // valider et stocker les villes ajouter
    const writeCity = document.querySelector('.search-input');
    writeCity.addEventListener('keyup', () => {
            autocompleteValue(writeCity.value);
    });

    const validateSearch = document.querySelector('.search-btn')
    validateSearch.addEventListener('click', getWeather(writeCity.value));