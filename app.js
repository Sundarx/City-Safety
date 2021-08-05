// personal api key
const API_KEY = `cd2b6222-cf90-4e64-b633-836b11dc5b70`

// const country_domain = `http://api.airvisual.com/v2/countries?key=${API_KEY}`
// const state_domain = `http://api.airvisual.com/v2/states?country={{COUNTRY_NAME}}&key=${API_KEY}`
// const city_domain = `http://api.airvisual.com/v2/cities?state={{STATE_NAME}}&country={{COUNTRY_NAME}}&key=${API_KEY}`
// const output_domain = `http://api.airvisual.com/v2/city?city=Los Angeles&state=California&country=USA&key=${API_KEY}`


const form = document.querySelector('form')
const countryTag = document.querySelector('#select-country')
const stateTag = document.querySelector('#select-state')
const cityTag = document.querySelector('#select-city')


getAllCountries()

// get all supported countries from API
async function getAllCountries() {
  try {
    const allCountriesURL = `http://api.airvisual.com/v2/countries?key=${API_KEY}`
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
    const allStatesURL = `http://api.airvisual.com/v2/states?country=${countryTag.value}&key=${API_KEY}`
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
    const allCitiesURL = `http://api.airvisual.com/v2/cities?state=${stateTag.value}&country=${countryTag.value}&key=${API_KEY}`
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

async function getPollutionData(e){//cityName, stateName, countryName) {
  try {
    e.preventDefault()
    const pollutionURL = `http://api.airvisual.com/v2/city?city=${cityTag.value}&state=${stateTag.value}&country=${countryTag.value}&key=${API_KEY}`
    const response = await axios.get(pollutionURL)
    let cityPollutionData = response.data.data
    setPollutionData(cityPollutionData)
  }
  catch (err) {
    console.error(err)
  }

}


function setPollutionData(cityPollutionData) {
  removeData()

  document.querySelector("#location").textContent += `
    Location: ${cityPollutionData.city}, 
    ${cityPollutionData.state}, 
    ${cityPollutionData.country}
  `

  const weather = cityPollutionData.current.weather
  const weatherTag = document.createElement('p')
  weatherTagHTML = `
    <h4>Weather</h4>
    Timestamp: ${weather.ts}
    <br>
    Temperature: ${weather.tp} \u00B0C / ${Number(weather.tp)*1.8 + 32} \u00B0F
    <br>
    Atmospheric Pressure: ${weather.pr} hPa
    <br>
    Humidity: ${weather.hu}%
    <br>
    Wind Speed: ${weather.ws} m/s
    <br>
    Wind Direction: ${weather.wd}\u00B0
    <br>
  `
  document.querySelector("#weather-data").insertAdjacentHTML('beforeend', weatherTagHTML)


  weatherIconHTML = `<img src="https://airvisual.com/images/${weather.ic}.png">`
  document.querySelector("#weather-icon").insertAdjacentHTML('beforeend', weatherIconHTML)


  const pollution = cityPollutionData.current.pollution
  const pollutionTag = document.createElement('p')
  pollutionTagHTML = `
    <h4>Pollution</h4>
    Timestamp: ${pollution.ts}
    <br>
    AQI Value (US EPA Std): ${pollution.aqius}
    <br>
    Main Pollutant for US AQI: ${pollution.mainus}
    <br>
    AQI Value (China EPA Std): ${pollution.aqicn}
    <br>
    Main Pollutant for China AQI: ${pollution.maincn}
    <br>
  `
  document.querySelector("#pollution-data").insertAdjacentHTML('beforeend', pollutionTagHTML)

}

function removeData() {
  while (document.querySelector("#location").lastChild) {
    document.querySelector("#location").removeChild(document.querySelector("#location").lastChild)
  }
  while (document.querySelector("#weather-data").lastChild) {
    document.querySelector("#weather-data").removeChild(document.querySelector("#weather-data").lastChild)
  }
  while (document.querySelector("#pollution-data").lastChild) {
    document.querySelector("#pollution-data").removeChild(document.querySelector("#pollution-data").lastChild)
  }
}
