const countriesContainerEl = document.querySelector('.countries-container');
const searchFilterContainer = document.querySelector('.search-filter-container');
const searchContainerEl = document.querySelector('.search-container input');

let allCountriesData


fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
        renderCountries(data)
        allCountriesData = data
    })

searchFilterContainer.addEventListener('change', (e) => {
    console.log(e.target.value)
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
        .then((res) => res.json())
        .then((data) => {
            renderCountries(data)
        })
})


function renderCountries(data) {
    countriesContainerEl.innerHTML = ''
    console.log(data)
    data.forEach((country) => {
        const countryCartEl = document.createElement('a')
        countryCartEl.classList.add('country-cart')

        countryCartEl.href = `/country.html?name=${country.name.common}`

        countryCartEl.innerHTML = `
    <img src="${country.flags.svg}" alt="flag">
    <div class="cart-text">
        <h3 class="cart-title">${country.name.common}</h3>
        <p><b>Population:</b>${country.population.toLocaleString('en-IN')}</p>
        <p><b>Region:</b>${country.region}</p>
        <p><b>Capital:</b>${country.capital?.[0]}</p>
    </div>
    `
        countriesContainerEl.appendChild(countryCartEl)
    })
}


searchContainerEl.addEventListener('input', (e) => {
    // console.log(e.target.value)

    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))

    renderCountries(filteredCountries)
})
