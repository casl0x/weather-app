   // autocomplete
    const cityDatalist = document.querySelector('#city');
    async function autocompleteValue (placeName){
        try {
            const autocomplete = await fetch(`https://nominatim.openstreetmap.org/search?q=${placeName}&format=json&limit=5&featureType=city`);
            const dataA = await autocomplete.json();

            cityDatalist.innerHTML = '';

            dataA.forEach( result => {
                const option = document.createElement('option');
                option.value = result.display_name;
                cityDatalist.appendChild(option);
            });
        } catch (err) {
            console.error("error", err.message);
            alert("Fail : city not foud !");
        }
    }

    // clé api
    const apiKey = '3f23b6f16c2b419d6eaa598f5f59f93a';
    // localisation ville
    async function localisationPoint (writeCity) {
        try{
            let coordinates = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${writeCity}&appid=${apiKey}`);
            let dataL = await coordinates.json();
            let lat = dataL[0].lat;
            let long = dataL[0].lon;
            let loc = {latitude : lat, longitude : long};
            return loc;
        }
        catch (err){
            console.error("error", err.message);
            alert("Fail : no loc !");
        }
    }

    // liaison de l'api météo
    async function getWeather(loc) {
        try {
            const lat = loc.latitude;
            const lon = loc.longitude;
            const forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr`);
            const data = await forecast.json();
            console.log(data);
            return data;
        } catch (err) {
            console.error("error", err.message);
            alert("Fail : no weather !");
        }
    }

export {autocompleteValue, localisationPoint, getWeather}