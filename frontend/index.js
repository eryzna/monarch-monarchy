document.addEventListener('DOMContentLoaded', function () {
    removeRecordSightingForm();
    addStates();
    loadYearOptions();
    loadSightingOptions();
});

let sightings = []
let years = []

const states = [
  '','AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' 
]

//STATE FUNCTIONS
function addStates() {
  let dropdown = document.getElementById('state')

  for (const state of states) {
    var option = document.createElement("option");
    option.value = state;
    option.text = state.charAt(0).toUpperCase() + state.slice(1);
    dropdown.appendChild(option);
  }
}
//END STATE FUNCTIONS
              
//SIGHTING FUNCTIONS
function loadSightingOptions() {
    const sightingUrl = 'http://localhost:3000/sightings'
    fetch(sightingUrl)
      .then(res => res.json())
      .then(results => {
  
        sightings = results;
        addFilterSelectListener();
        addClearParamsListener();
    });
} 

function updateSightingList(sightings) {
  let ul = document.querySelector('#sighting-info');
  let info = document.getElementById('app-info')
  removeChildren(ul);
  removeChildren(info);
  sightings.forEach(sighting => addSighting(sighting));
  updatePage(sightings)
}

function addSighting(sighting) {
  let ul = document.querySelector('#sighting-info');
  let li = document.createElement('li');
  li.innerText = `Date: ${sighting.date}, City: ${sighting.town}, State/Province: ${sighting.state_province}, Number of Monarchs: ${sighting.num_of_individuals}`
  //li.style.cursor = 'pointer';
  ul.appendChild(li);
  //li.addEventListener('click', updateColor);
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
  updateSightingList(sightings.filter(sighting => sighting.state_province === state));
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
  updateSightingList(sightings)
}

function filterSightingsByStateYear(state, year) {
  console.log("filtering sightings by state and year")
  filterSightingsByYear(year);
  filterSightingsByState(state)
}

function filterSightingsByCityState(city, state) {
  console.log("filtering sightings by city state")
  filterSightingsByState(state);
  filterSightingsByCity(city)
}

function filterSightingsByCityStateYear(city, state, year) {
  console.log("filtering sightings by city state year")
  filterSightingsByYear(year);
  filterSightingsByState(state);
  filterSightingsByCity(city)
}

function addFilterSelectListener () {
  var filter = document.getElementById("filter");
  var year = document.getElementById("year");
  var state = document.getElementById("state");
  let city = document.getElementById("city")

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
//END FILTER FUNCTIONS

//DOM FUNCTIONS
function updatePage(sightings) {
  let grid = document.getElementById('sightings-grid')
  removeChildren(grid)
  var itemOne = document.createElement('div')
  var itemTwo = document.createElement('div')
  var itemThree = document.createElement('div')
  var itemFour = document.createElement('div')
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

function removeChildren(element) {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function addAppInfo () {
  var info = document.getElementById('app-info')
  var grid = document.getElementById('sightings-grid')
  var h2 = document.createElement('h2')
  var text = document.createTextNode("Welcome to Monarch Monarchy!")
  var p = document.createElement('p')
  var pText = document.createTextNode("Please select your search parameters or record a sighting.")

  h2.appendChild(text);
  p.appendChild(pText);
  info.appendChild(h2)
  info.appendChild(p);
}

function addClearParamsListener () {
  var clear = document.getElementById('clear-params')
  var year = document.getElementById('year')
  var state = document.getElementById('state')
  var input = document.getElementById('city')
  var ul = document.querySelector('#sighting-info');
  var grid = document.getElementById('sightings-grid')
  var info = document.getElementById('app-info')
  
  //let p = document.createElement('p').value = "Please select your search parameters or record a sighting."
    
  clear.addEventListener('click', function() {
    year.value = ""
    state.value = ""
    input.value = ""
    
    removeChildren(info);
    removeChildren(ul);
    removeChildren(grid);
    addAppInfo();
  
    addStates();
    loadSightingOptions();
    loadYearOptions();
    
  })
}

function removeRecordSightingForm () {
  var form = document.getElementById('record-sighting-form')
  form.remove()
  addRecordSightingListener()
}

function addRecordSightingListener () {
  var button = document.getElementById('record-sighting-button')
  button.addEventListener('click', function() {
    addRecordSightingForm()
  })
}

function addRecordSightingForm () {
  console.log("add form")
  var div = document.getElementById('record-sighting')

  //div.appendChild(form)
 
  
}


