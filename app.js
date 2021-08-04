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

// function location() {
//   this.city = ""
//   this.state = ""
//   this.country = ""
// }

// let currentLoc = new location()

// get all supported countries from API
async function getAllCountries() {
  try {
    const allCountriesURL = `http://api.airvisual.com/v2/countries?key=${API_KEY}`
    const response = await axios.get(allCountriesURL)
    // console.log(response.data.data)
    const countriesList = response.data.data
    // console.log(countriesList)

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
    // console.log(element.country)
    optionTag.value = element.country
    optionTag.textContent = element.country
    countryTag.append(optionTag)
    // optionTag.append(optionTag)
  })

  // when user selects country input, it should generate a respective state dropdown menu
  form.addEventListener('input', getSelectedCountry)
}

// return selected country as input to state API request
function getSelectedCountry(e) {
  e.preventDefault()
  // const countryName = countryTag.value
  // currentLoc.country = countryName
  // getAllStates(countryTag.value)
  getAllStates()
  return countryTag.value
}


// get all supported states from API according to selected country
async function getAllStates(){//(countryName) {
  try {
    const allStatesURL = `http://api.airvisual.com/v2/states?country=${countryTag.value}&key=${API_KEY}`
    const response = await axios.get(allStatesURL)
    // console.log(response.data.data)
    const statesList = response.data.data
    // console.log(countriesList)

    setStateTags(statesList)
  }
  catch (err) {
    console.error(err)
  }
}

// convert all states into option tags in state dropdown menu
function setStateTags(statesList) {
  // remove previous state options
  // removeStates()

  statesList.forEach((element) => {
    const optionTag = document.createElement('option')
    // console.log(element.state)
    optionTag.value = element.state
    optionTag.textContent = element.state
    stateTag.append(optionTag)
  })

  form.addEventListener('input', getSelectedState)

}

// removes states in HTML states container
function removeStates() {
  while (stateTag.lastChild) {
    stateTag.removeChild(stateTag.lastChild)
  }
}

// return selected state and country as input to city API request
function getSelectedState(e) {
  e.preventDefault()
  // const stateName = stateTag.value
  // const countryName = countryTag.value
  // console.log(stateName)
  // console.log(countryTag.value)
  // currentLoc.state = stateName
  // getAllCities(stateTag.value, countryTag.value)
  getAllCities()
  return stateTag.value
}

// get all supported cities from API according to selected state and country
async function getAllCities(){//(stateName, countryName) {
  try {
    const allCitiesURL = `http://api.airvisual.com/v2/cities?state=${stateTag.value}&country=${countryTag.value}&key=${API_KEY}`
    const response = await axios.get(allCitiesURL)
    // console.log(response.data.data)
    const citiesList = response.data.data
    setCityTags(citiesList)//, stateName, countryName)
  }
  catch (err) {
    console.error(err)
  }
}

// convert all cities into option tags in city dropdown menu
function setCityTags(citiesList){//, stateName, countryName) {
  // remove previous list of cities
  // removeCities()

  citiesList.forEach((element) => {
    const optionTag = document.createElement('option')
    // console.log(element.city)
    optionTag.value = element.city
    optionTag.textContent = element.city
    cityTag.append(optionTag)
  })

  form.addEventListener('input', getSelectedCity)

}

// removes cities in HTML cities container
function removeCities() {
  while (cityTag.lastChild) {
    cityTag.removeChild(cityTag.lastChild)
  }
}

// return selected city, state, country as input to pollution API request
function getSelectedCity(e) {
  e.preventDefault()
  // const cityName = cityTag.value
  // const stateName = stateTag.value
  // const countryName = countryTag.value

  // getData(cityName, stateName, countryName)
  // currentLoc.city = cityName
  // console.log(cityName, stateName, countryName)

  // getPollutionData(cityName, stateName, countryName)

  form.addEventListener('submit', getPollutionData)

  return cityTag.value
}

async function getPollutionData(e){//cityName, stateName, countryName) {
  try {
    e.preventDefault()
    const pollutionURL = `http://api.airvisual.com/v2/city?city=${cityTag.value}&state=${stateTag.value}&country=${countryTag.value}&key=${API_KEY}`
    const response = await axios.get(pollutionURL)
    // console.log(response.data.data)
    let cityPollutionData = response.data.data
    setPollutionData(cityPollutionData)
  }
  catch (err) {
    console.error(err)
  }

}


function setPollutionData(cityPollutionData) {
  console.log(cityPollutionData.city)
  console.log(cityPollutionData.state)
  console.log(cityPollutionData.country)
  console.log(cityPollutionData.current)
  console.log(cityPollutionData.current.weather)
  console.log(cityPollutionData.current.weather.ts)
  console.log(cityPollutionData.current.pollution)

  document.querySelector("#location").textContent += `${cityPollutionData.city}, ${cityPollutionData.state}, ${cityPollutionData.country}`

  const weather = cityPollutionData.current.weather

  const weatherTag = document.createElement('p')
  // document.querySelector("#weather-data").append(weatherTag)
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
  // <img src="${weather.ic}.png"/>
  document.querySelector("#weather-data").insertAdjacentHTML('beforeend', weatherTagHTML)


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
