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

// function location(){//city, state, country) {
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

  // getAllStates(optionTag.textContent)
  // when user selects country input, it should generate a respective state dropdown menu
  form.addEventListener('input', getSelectedCountry)
  // getCountryData(optionTag.textContent)

}

// return selected country as input to state API request
function getSelectedCountry(e) {
  e.preventDefault()
  const countryName = countryTag.value
  currentLoc.country = countryName
  getAllStates(countryName)
  return countryName
}


// get all supported states from API according to selected country
async function getAllStates(countryName) {
  try {
    const allStatesURL = `http://api.airvisual.com/v2/states?country=${countryName}&key=${API_KEY}`
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

// convert all states into option tags in country dropdown menu
function setStateTags(statesList) {
  // remove previous state options
  // removeStates()
  // removeCities()
  statesList.forEach((element) => {
    const optionTag = document.createElement('option')
    // console.log(element.state)
    optionTag.value = element.state
    optionTag.textContent = element.state
    stateTag.append(optionTag)

    // getAllStates(optionTag.textContent)
  })

  form.addEventListener('input', getSelectedState)
  // stateTag.value = form.addEventListener('input', getSelectedState)


}

// removes states in HTML states container
function removeStates() {
  while (stateTag.lastChild) {
    stateTag.removeChild(stateTag.lastChild)
  }
}

function getSelectedState(e) {
  removeStates()
  e.preventDefault()
  const stateName = stateTag.value
  const countryName = countryTag.value
  // console.log(stateName)
  // console.log(countryTag.value)
  currentLoc.state = stateName
  getAllCities(stateName, countryName)
  return stateName
  // removeStates()

}

async function getAllCities(stateName, countryName) {
  try {
    const allCitiesURL = `http://api.airvisual.com/v2/cities?state=${stateName}&country=${countryName}&key=${API_KEY}`
    const response = await axios.get(allCitiesURL)
    // console.log(response.data.data)
    const citiesList = response.data.data
    setCityTags(citiesList, stateName, countryName)
  }
  catch (err) {
    console.error(err)
  }
}

function setCityTags(citiesList, stateName, countryName) {
  // remove previous list of cities
  removeCities()

  citiesList.forEach((element) => {
    const optionTag = document.createElement('option')
    // console.log(element.city)
    optionTag.value = element.city
    optionTag.textContent = element.city
    cityTag.append(optionTag)
  })

  form.addEventListener('input', getSelectedCity)

}

function removeCities() {
  while (cityTag.lastChild) {
    cityTag.removeChild(cityTag.lastChild)
  }
}


function getSelectedCity(e) {
  e.preventDefault()
  const cityName = cityTag.value
  const stateName = stateTag.value
  const countryName = countryTag.value

  // getData(cityName, stateName, countryName)
  currentLoc.city = cityName
  console.log(cityName, stateName, countryName)

  return cityName
}



