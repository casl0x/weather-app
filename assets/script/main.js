import { autocompleteValue, localisationPoint, getWeather } from "./api.js";
import showWeather from "./show-weather.js"; 

    async function displayAll (value) {
        let writeCity;
        if(value == true){
            writeCity = localStorage.getItem('cities');
            if(writeCity == null){
                writeCity = "Miami";
            }
        }
        else if (value == false){
            writeCity = document.querySelector('.search-input').value;
            localStorage.setItem('cities', writeCity);
        }

        const coord = await localisationPoint(writeCity);
        const viewWeather = await getWeather(coord)

        showWeather(viewWeather)
    }

    displayAll(true)
    // valider des villes ajouter
    const inputCity = document.querySelector('.search-input');
    inputCity.addEventListener('input', function() {
            autocompleteValue(inputCity.value);
    });

    const validateSearch = document.querySelector('.search-btn')
    validateSearch.addEventListener('click', () => displayAll(false));