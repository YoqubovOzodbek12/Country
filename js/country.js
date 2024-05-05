const countryName = new URLSearchParams(location.search).get('name');
const flagImageEl = document.querySelector('.country-details img');
const countryNameEL = document.querySelector('.country-details h1');
const nativeNameEl = document.querySelector('.native-name');
const populationEl = document.querySelector('.population');
const regionEl = document.querySelector('.region');
const subRegionEl = document.querySelector('.sub-region');
const capitalEl = document.querySelector('.capital');
const topLevelDomainEl = document.querySelector('.top-level-domain');
const currenciesEl = document.querySelector('.currencies');
const languagesEl = document.querySelector('.languages');
const borderCountriesEl = document.querySelector('.border-countries');

const themeChangesEl = document.querySelector('.theme-changes')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {

        flagImageEl.src = country.flags.svg;
        countryNameEL.innerText = country.name.common;
        populationEl.innerText = country.population.toLocaleString('en-IN');
        regionEl.innerText = country.region;
        subRegionEl.innerText = country.subregion;

        topLevelDomainEl.innerText = country.tld.join(', ')

        if (country.capital) {
            capitalEl.innerText = country.capital?.[0];
        }

        if (country.subRegion) {
            subRegionEl.innerText = country.subRegion
        }

        if (country.name.nativeName) {
            nativeNameEl.innerText = Object.values(country.name.nativeName)[0].common
        } else {
            nativeNameEl.innerText = country.name.common
        }

        if (country.currencies) {
            currenciesEl.innerText = (Object.values(country.currencies).map((currenciesEl) => currenciesEl.name).join(','))
            console.log('salom')
        }

        if (country.languages) {
            languagesEl.innerText = Object.values(country.languages).join(', ')
        }

        console.log(country)

        if (country.borders) {
            country.borders.forEach((border) => {
                console.log(border)
                fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res) => res.json())
                    .then(([borderCountry]) => {
                        console.log(borderCountry)
                        const borderCountryTag = document.createElement('a');
                        borderCountryTag.innerText = borderCountry.name.common;
                        borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                        console.log(borderCountryTag)
                        borderCountriesEl.append(borderCountryTag)
                    })
            })
        }
    })


