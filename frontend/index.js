document.addEventListener('DOMContentLoaded', function () {
    loadSightingOptions();
    removeRecordSightingForm();
    addStates();
    loadYearOptions();
    addMySightingsListener()
    
});

let sightings = []
let years = []

const states = [
  '','AL-Alabama', 'AK-Alaska', 'AZ-Arizona', 'AR-Arkansas', 'CA-California', 'CO-Colorado', 'CT-Connecticut', 'DE-Delaware', 'FL-Florida', 'GA-Georgia', 
  'HI-Hawaii', 'ID-Idaho', 'IL-Illinois', 'IN-Indiana', 'IA-Iowa', 'KS-Kansas', 'KY-Kentucky', 'LA-Louisiana', 'ME-Maine', 'MD-Maryland', 
  'MA-Massachusetts', 'MI-Michigan', 'MN-Minnesota', 'MS-Mississippi', 'MO-Missouri', 'MT-Montana', 'NE-Nebraska', 'NV-Nevada', 'NH-New Hampshire', 'NJ-New Jersey', 
  'NM-New Mexico', 'NY-New York', 'NC-North Carolina', 'ND-North Dakota', 'OH-Ohio', 'OK-Oklahoma', 'OR-Oregon', 'PA-Pennsylvania', 'RI-Rhode Island', 'SC-South Carolina', 
  'SD-South Dakota', 'TN-Tennessee', 'TX-Texas', 'UT-Utah', 'VT-Vermont', 'VA-Virginia', 'WA-Washington', 'WV-West Virginia', 'WI-Wisconsin', 'WY-Wyoming' 
]

//STATE FUNCTIONS
function addStates() {
  console.log("addstates")
  let dropdown = document.getElementById('state')

  for (const state of states) {
    const option = document.createElement("option");
    option.value = state;
    option.text = state.charAt(0).toUpperCase() + state.slice(1);
    dropdown.appendChild(option);
  }
}
//END STATE FUNCTIONS
              
//SIGHTING FUNCTIONS
class Sighting {
  constructor(sightingObj) {
    this.date = sightingObj.date
    this.town = sightingObj.town
    this.stateProvince = sightingObj.state_province
    this.numOfIndiv = sightingObj.num_of_individuals
  }
}

class MySighting extends Sighting{
  constructor( sightingObj) {
    super( sightingObj )
    this.notes = sightingObj.notes
  }
}

MySighting.prototype.renderToPage = function () {
  console.log("mysightingsrenderToPage")
      let ul = document.querySelector('#sighting-info');
      ul.className = "sightings-info"
      let li = document.createElement('li');
      li.innerText = `Date: ${this.date}, City: ${this.town}, State/Province: ${this.stateProvince}, Monarchs: ${this.numOfIndiv}, Notes: ${this.notes}`
      ul.appendChild(li);
}

Sighting.prototype.renderToPage = function () {
  console.log("renderToPage")
      let ul = document.querySelector('#sighting-info');
      let li = document.createElement('li');
      li.innerText = `Date: ${this.date}, City: ${this.town}, State/Province: ${this.stateProvince}, Monarchs: ${this.numOfIndiv}`
      ul.appendChild(li);
}

function loadSightingOptions() {
    const sightingUrl = 'http://localhost:3000/sightings'
    fetch(sightingUrl)
      .then(res => res.json())
      .then(results => {
        sightings = results

        addFilterSelectListener();
        addClearParamsListener();
    });
} 

function createSightingObjects(sightings) {
  console.log(sightings)
  console.log("CreateSightingObjects")
    sightings.forEach(function(e) {
      sighting = new Sighting(e)
      sighting.renderToPage()
    })
}

function createSightingObjects(sightings) {
  console.log("CreateSightingObjects")
    sightings.forEach(function(e) {
        sighting = new Sighting(e)
        sighting.renderToPage()
    })
}

function createMySightingObjects(sightings) {
    sightings.forEach(function(e) {
      sighting = new MySighting(e)
      sighting.renderToPage()
    })
}

function updateMySightingList(sightings) {
  console.log('updateMy sighting list')
  console.log(sightings)
  let ul = document.querySelector('#sighting-info');
  let info = document.getElementById('app-info')
  ul.className = "sightings-info"
  removeChildren(ul);
  info.remove()
  createMySightingObjects(sightings)
  updatePage(sightings)

}

//need to clear sightings list when searching by username and add app info

function updateSightingList(sightings) {
  let container = document.createElement('div')
  let ul = document.querySelector('#sighting-info');
  ul.className = "sightings-info"
  let info = document.getElementById('app-info')
  removeChildren(ul);
  if (info) {
    info.remove()
    createSightingObjects(sightings)
    updatePage(sightings)
  }else {
    createSightingObjects(sightings)
    updatePage(sightings)
  }
  
  //sightings.forEach(sighting => addSighting(sighting));
  
}

//END SIGHTING FUNCTIONS

//YEAR FUNCTIONS
function loadYearOptions() {
  const yearUrl = 'http://localhost:3000/years';
  fetch (yearUrl)
    .then(res => res.json())
    .then(results => {
      years = results
      //addYearSelectListener();
    
    });
}
//END YEAR FUNCTIONS

//FILTER FUNCTIONS
function filterSightingsByState(state) {
  console.log("filtering sightings by state")
  let stateInit = state.charAt(0)+state.charAt(1)
  console.log(stateInit)
  updateSightingList(sightings.filter(sighting => sighting.state_province === stateInit));
}

function filterSightingsByCity(city) {
  console.log("filtering sightings by city")
  updateSightingList(sightings.filter(sighting => sighting.town === city))
}

function filterSightingsByYear(year) {
  console.log("filtering sightings by year")
  console.log(year)
  let yearsFilter = years.filter(y => y.value == year);
  let yearsReduce = yearsFilter.reduce(year => sightings)
  sightings = yearsReduce.sightings
  console.log(sightings)
  updateSightingList(sightings)
}

function filterSightingsByStateYear(state, year) {
  console.log("filtering sightings by state and year")
  filterSightingsByYear(year);
  filterSightingsByState(state)
}

function filterSightingsByCityState(city, state) {
  console.log("filtering sightings by city state")
  const citySightings = sightings.filter(sighting => sighting.town === city)
  let stateInit = state.charAt(0)+state.charAt(1)
  updateSightingList(citySightings.filter(sighting => sighting.state_province === stateInit))
}

function filterSightingsByCityStateYear(city, state, year) {
  console.log("filtering sightings by city state year")
  filterSightingsByYear(year);
  filterSightingsByCityState(city, state);
}

function addFilterSelectListener () {
  const filter = document.getElementById("filter");
  const year = document.getElementById("year");
  const state = document.getElementById("state");
  const city = document.getElementById("city")

  filter.addEventListener('click', function() {
    filterSightings(city, state, year)
  })
}

function filterSightings(city, state, year) {
  if (city.value === "" && state.value === "" && year.value === "") {
    console.log("no values")
    alert("Please enter your parameters.")
  } else if (city.value != "" && state.value != "" && year.value != "") {
    console.log("City, state, and year have values")
    filterSightingsByCityStateYear(city.value, state.value, year.value)
  } else if (city.value != "" && state.value === "" && year.value === "") {
    console.log("city has value")
    alert("Please enter a state.")
  } else if (city.value != "" && state.value != "" && year.value === "") {
    console.log("city and state has value")
    filterSightingsByCityState(city.value, state.value)
  } else if (city.value === "" && state.value != "" && year.value != "") {
    console.log("state and year has value")
    filterSightingsByStateYear(state.value, year.value)
  } else if (city.value === "" && state.value != "" && year.value === "") {
    console.log("state has value")
    filterSightingsByState(state.value)
  } else if (city.value === "" && state.value === "" && year.value != "") {
    console.log("year has value")
    filterSightingsByYear(year.value)
  } else {
    console.log("year and city has value")
    alert("Please enter a state.")
  }
}

function viewMySightings(username) {
  console.log(username)
  updateMySightingList(sightings.filter(sighting => sighting.username === username), username)
}
//END FILTER FUNCTIONS

//DOM FUNCTIONS
function updatePage(sightings) {
  let grid = document.getElementById('sightings-grid')
  grid.className = 'grid-container'
  removeChildren(grid)
  let itemOne = document.createElement('div')
  let itemTwo = document.createElement('div')
  let itemThree = document.createElement('div')
  let itemFour = document.createElement('div')
  itemOne.className = 'grid-item'
  itemOne.innerText = 'Total Sightings:'
  itemTwo.className = 'grid-item'
  itemTwo.innerText = sightings.length
  itemThree.className = 'grid-item'
  itemThree.innerText = 'Total Individuals:'
  itemFour.className = 'grid-item'
  let individuals = sightings.map(sighting => sighting.num_of_individuals)
  let sum = individuals.reduce((a,b) => a + b, 0)
  itemFour.innerText = sum
  grid.appendChild(itemOne) 
  grid.appendChild(itemTwo)
  grid.appendChild(itemThree)
  grid.appendChild(itemFour)
}

function addMySightingsListener() {
  const button = document.getElementById('my-sightings-button')
  button.addEventListener('click', function(){
    const info = document.getElementById('app-info')
    const ul = document.getElementById('sighting-info')
    const grid = document.getElementById('sightings-grid')

    loadSightingOptions()
    if (info) {
      //removeChildren(info)
      //addAppInfo()
      addUsernameInputForm()
    }else {
      ul.className = ""
      grid.className = ""
      removeChildren(ul)
      removeChildren(grid)
      addAppInfo()
      addUsernameInputForm()

    }
   
    

    

  })
}

function removeChildren(element) {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function addAppInfo () {
  console.log('add app info')
  const info = document.createElement('div')
  info.id = "app-info"
  info.className = "app-info"
  const div = document.querySelector('.centered-right')
  const text = '<h1>Welcome to Monarch Monarchy!</h1><p>Please select your search parameters, record your own sighting, or view your sighting records.</p>'
  info.innerHTML = text
  div.appendChild(info)
  
  
}

function addClearParamsListener () {
  const clear = document.getElementById('clear-params')
  const year = document.getElementById('year')
  const state = document.getElementById('state')
  const input = document.getElementById('city')
  const ul = document.querySelector('#sighting-info');
  const grid = document.getElementById('sightings-grid')
  const info = document.getElementById('app-info')
  
  //let p = document.createElement('p').value = "Please select your search parameters or record a sighting."
    
  clear.addEventListener('click', function() {
    year.value = ""
    state.value = ""
    input.value = ""
    
    removeChildren(info);
    ul.remove()
    grid.remove()
    
    addAppInfo();
  
    addStates();
    loadSightingOptions();
    loadYearOptions();
    
  })
}

function removeRecordSightingForm () {
  const form = document.getElementById('record-sighting-form')
  form.remove()
  addRecordSightingListener()
}

function addRecordSightingListener () {
  const button = document.getElementById('record-sighting-button')
  const ul = document.querySelector('#sighting-info');
  const grid = document.getElementById('sightings-grid')
  const info = document.getElementById('app-info')
  button.addEventListener('click', function() {
    console.log('button pressed')
      console.log('sightings')
      ul.className = ""
      grid.className = ""
      removeChildren(ul)
      removeChildren(grid)
      info.remove()
      addAppInfo()
      addRecordSightingForm()
      addStates()    
})
  
}


function addRecordSightingForm () {
  console.log("add form")
  
  const div = document.getElementById('record-sighting')
  const recordSightingForm = document.createElement('div')
  recordSightingForm.id = "record-sighting-form"
  div.appendChild(recordSightingForm)
  const form = '<div id="record-sighting-form"><h2>Record a Sighting</h2><form><label> Username: <input type="text" name="username" id="sightingUsername"/><br></br><label> Date: <input type="date" name="date" id="sightingDate"</label><br></br><label> City: <input type="text" name="town" id="sightingTown"></label><br></br><label> State: <select id="state" name="state_province" ></select></label><br></br><label> Number of Individuals: <input type="text" name="num_of_individuals" id="sightingNumber"></label><br></br><label> Notes: <textarea type="text" name="notes" id="notes"></textarea></label><br></br><button id="submit-sighting" value="post-sighting">Submit</button></form>'
  const sightingForm = document.getElementById('filter-sightings')
  const mySightingButton = document.getElementById('my-sightings-button')
  sightingForm.remove()
  mySightingButton.remove()
  recordSightingForm.innerHTML = form
  addSightingSubmitListener()
  addBackButton()
}

   

function postSighting() {
  console.log('post sighting')
  const username = document.getElementById('sightingUsername')
  const date = document.getElementById('sightingDate')
  const city = document.getElementById('sightingTown')
  const state = document.getElementById('state')
  const number = document.getElementById('sightingNumber')
  const notes = document.getElementById('notes')
  const data = { username: username.value, date: date.value, town: city.value, state_province: state.value, num_of_individuals: number.value, notes: notes.value}
  fetch('http://localhost:3000/sightings', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    
})
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      viewSighting(data)
    })
    .catch((error) => {
      console.error('Error:', error);
      console.log(data)
  });
}

function addSightingSubmitListener () {
  const button = document.getElementById('submit-sighting')
  button.addEventListener('click', function (event){
    event.preventDefault()//viewLastSighting()
    postSighting()
  })
}

function viewSighting(sighting) {
  console.log("viewLasSighting")
  let mySighting = new MySighting(sighting)
  console.log(mySighting)
  const appInfo = document.getElementById('app-info')
  appInfo.remove()
  window.alert("Sighting successfully submitted!")
  mySighting.renderToPage()
}

function addUsernameInputForm () {
  console.log("add username")
  const sightingForm = document.getElementById('filter-sightings')
  const div = document.getElementById('username-input')
  const button = document.getElementById('my-sightings-button')
  const form = '<h2>Enter Username</h2><input id="username" type="text" name="search" placeholder="Username"><br></br><button id="enter-username" onclick="captureUsername()">Enter</button>'
  button.remove()
  sightingForm.remove()
  div.innerHTML = form
  addBackButton()
  //addUsernameEventListener()
}

function captureUsername() {
  const input = document.getElementById("username")
  viewMySightings(input.value);
  addUserInfo(input.value)
}

function addUserInfo(username) {
  let div = document.createElement('div')
  div.id = 'user-info'
  const parent = document.querySelector('.centered-left')
  const info = document.createElement('h1')
  const input = document.getElementById('username-input')
  input.remove()
  info.innerText = 'Hello, '+ username + '!'
  parent.appendChild(info)

}

function addBackButton() {
  const img = document.createElement('img')
  img.src = "assets/arrow.png"
  img.alt = "arrow"
  img.id = "back-button"
  img.className = "back-button"
  const div = document.getElementById('centered-left-bottom')
  div.appendChild(img)
  addBackButtonEventListener()
}
function addBackButtonEventListener() {
  const button = document.getElementById('back-button')
  button.addEventListener('click', function(){
    location.reload()
  })
}

