function dataList () {
    const inputBox = document.querySelector('.search-input')
    const cityDatalist = document.querySelector('#city');

    const citiesStock = JSON.parse(localStorage.getItem('cities')) || [];
    citiesStock.forEach(place => cityDatalist.appendChild(new Option(place)));

    inputBox.addEventListener('input', () => {
        const value = inputBox.value.trim();
        if (value && !citiesStock.includes(value)){
            cityDatalist.appendChild(new Option(value));
            citiesStock.push(value);
            localStorage.setItem('cities', JSON.stringify(citiesStock));
        }
    })
}

export default dataList;
