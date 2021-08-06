// personal api key
const API_KEY = `cd2b6222-cf90-4e64-b633-836b11dc5b70`

const form = document.querySelector('form')
const countryTag = document.querySelector('#select-country')
const stateTag = document.querySelector('#select-state')
const cityTag = document.querySelector('#select-city')


getAllCountries()

// get all supported countries from API
async function getAllCountries() {
  try {
    const allCountriesURL = `https://api.airvisual.com/v2/countries?key=${API_KEY}`
    const response = await axios.get(allCountriesURL)
    const countriesList = response.data.data

    setCountryTags(countriesList)
  }
  catch (err) {
    console.error(err)
  }
}

// convert all countries into option tags in country dropdown menu
function setCountryTags(list) {
  list.forEach((element) => {
    const optionTag = document.createElement('option')
    optionTag.value = element.country
    optionTag.textContent = element.country
    countryTag.append(optionTag)
  })

  // when user selects country input, it should generate a respective state dropdown menu
  countryTag.addEventListener('change', getSelectedCountry)
}

// return selected country as input to state API request
function getSelectedCountry(e) {
  e.preventDefault()
  removeCities() // NOTE - need to remove cities if new Country is selected
  getAllStates()
  return countryTag.value
}


// get all supported states from API according to selected country
async function getAllStates(){
  try {
    const allStatesURL = `https://api.airvisual.com/v2/states?country=${countryTag.value}&key=${API_KEY}`
    const response = await axios.get(allStatesURL)
    const statesList = response.data.data

    setStateTags(statesList)
  }
  catch (err) {
    console.error(err)
  }
}

// convert all states into option tags in state dropdown menu
function setStateTags(statesList) {
  removeStates()

  statesList.forEach((element) => {
    const optionTag = document.createElement('option')
    optionTag.value = element.state
    optionTag.textContent = element.state
    stateTag.append(optionTag)
  })

  stateTag.addEventListener('change', getSelectedState)

}

// removes states in HTML states container
function removeStates() {
  while (stateTag.lastChild) {
    stateTag.removeChild(stateTag.lastChild)
  }

  const stateData = '<option disabled selected>Select a State/Region</option>'
  stateTag.insertAdjacentHTML("beforeend", stateData)
}

// return selected state and country as input to city API request
function getSelectedState(e) {
  e.preventDefault()
  getAllCities()
  return stateTag.value
}

// get all supported cities from API according to selected state and country
async function getAllCities(){
  try {
    const allCitiesURL = `https://api.airvisual.com/v2/cities?state=${stateTag.value}&country=${countryTag.value}&key=${API_KEY}`
    const response = await axios.get(allCitiesURL)
    const citiesList = response.data.data
    setCityTags(citiesList)
  }
  catch (err) {
    console.error(err)
  }
}

// convert all cities into option tags in city dropdown menu
function setCityTags(citiesList){
  removeCities();

  citiesList.forEach((element) => {
    const optionTag = document.createElement('option')
    optionTag.value = element.city
    optionTag.textContent = element.city
    cityTag.append(optionTag)
  })

  cityTag.addEventListener('change', getSelectedCity)

}

// removes cities in HTML cities container
function removeCities() {
  while (cityTag.lastChild) {
    cityTag.removeChild(cityTag.lastChild)
  }

  const cityData = '<option disabled selected>Select a City</option>'
  cityTag.insertAdjacentHTML("beforeend", cityData)
}

// return selected city, state, country as input to pollution API request
function getSelectedCity(e) {
  e.preventDefault()
  form.addEventListener('submit', getPollutionData)
  return cityTag.value
}


// get weather/pollution data of city from API
async function getPollutionData(e){//cityName, stateName, countryName) {
  try {
    e.preventDefault()
    const pollutionURL = `https://api.airvisual.com/v2/city?city=${cityTag.value}&state=${stateTag.value}&country=${countryTag.value}&key=${API_KEY}`
    const response = await axios.get(pollutionURL)
    let cityPollutionData = response.data.data
    setPollutionData(cityPollutionData)
  }
  catch (err) {
    console.error(err)
  }

}

// push data into data containers in HTML
function setPollutionData(cityPollutionData) {
  removeData()

  locationHTML = `
     Location: &nbsp ${cityPollutionData.city}, 
     ${cityPollutionData.state}, 
     ${cityPollutionData.country}
  `
  document.querySelector("#location").insertAdjacentHTML('beforeend', locationHTML)

  const weather = cityPollutionData.current.weather
  const weatherTag = document.createElement('p')
  weatherTagHTML = `
    <h4>Weather</h4>
    <b>Timestamp</b>: ${(new Date(weather.ts).getMonth()+1) + '/' + new Date(weather.ts).getDate() + '/' + new Date(weather.ts).getFullYear()}
    <br>
    <b>Temperature</b>: ${weather.tp} \u00B0C / ${(Number(weather.tp)*1.8 + 32).toFixed(0)} \u00B0F
    <br>
    <b>Atmospheric Pressure</b>: ${weather.pr} hPa
    <br>
    <b>Humidity</b>: ${weather.hu}%
    <br>
    <b>Wind Speed</b>: ${weather.ws} m/s
    <br>
    <b>Wind Direction</b>: ${weather.wd}\u00B0
    <br>
  `
  document.querySelector("#weather-data").insertAdjacentHTML('beforeend', weatherTagHTML)


  weatherIconHTML = `<img src="https://airvisual.com/images/${weather.ic}.png" class="img-icon">
                     <div id="img-text"><b>${printWeather(weather.ic)}</b></div>
                    `
  // inside function: this prints the type of weather at the moment
  function printWeather(weather){
    if (weather === "01d") return "clear sky (day)"
    if (weather === "01n") return "clear sky (night)"
    if (weather === "02d") return "few clouds (day)"
    if (weather === "02n") return "few clouds (night)"
    if (weather === "03d") return "scattered clouds"
    if (weather === "04d") return "broken clouds"
    if (weather === "09d") return "shower rain"
    if (weather === "10d") return "rain (day time)"
    if (weather === "10n") return "rain (night time)"
    if (weather === "11d") return "thunderstorm"
    if (weather === "13d") return "snow"
    if (weather === "50d") return "mist"
  }
                    
  document.querySelector("#weather-icon").insertAdjacentHTML('beforeend', weatherIconHTML)


  const pollution = cityPollutionData.current.pollution
  const pollutionTag = document.createElement('p')
  pollutionTagHTML = `
    <h4>Pollution</h4>
    <b>Timestamp</b>: ${(new Date(weather.ts).getMonth()+1) + '/' + new Date(weather.ts).getDate() + '/' + new Date(weather.ts).getFullYear()}
    <br>
    <b>AQI Value (US EPA Std)</b>: ${pollution.aqius}
    <br>
    <b>Main Pollutant for US AQI</b>: ${printPollution(pollution.mainus)}
    <br>
    <b>AQI Value (China EPA Std)</b>: ${pollution.aqicn}
    <br>
    <b>Main Pollutant for China AQI</b>: ${printPollution(pollution.maincn)}
    <br>
  `
  // inside function: this prints the type of main pollutant
  function printPollution(pollutionType) {
    if (pollutionType === "p2") return "Particulate Matter 2.5"
    if (pollutionType === "p1") return "Particulate Matter 10"
    if (pollutionType === "o3") return "Ozone O3"
    if (pollutionType === "n2") return "Nitrogen Dioxide NO2"
    if(pollutionType === "s2") return "Sulfur Dioxide SO2"
    if (pollutionType === "co") return "Carbon Monoxide CO"
    else return pollutionType
  }

  document.querySelector("#pollution-data").insertAdjacentHTML('beforeend', pollutionTagHTML)
}

// remove existing data
function removeData() {
  while (document.querySelector("#location").lastChild) {
    document.querySelector("#location").removeChild(document.querySelector("#location").lastChild)
  }
  while (document.querySelector("#weather-data").lastChild) {
    document.querySelector("#weather-data").removeChild(document.querySelector("#weather-data").lastChild)
  }
  while (document.querySelector("#weather-icon").lastChild) {
    document.querySelector("#weather-icon").removeChild(document.querySelector("#weather-icon").lastChild)
  }
  while (document.querySelector("#pollution-data").lastChild) {
    document.querySelector("#pollution-data").removeChild(document.querySelector("#pollution-data").lastChild)
  }
}