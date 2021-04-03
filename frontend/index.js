document.addEventListener('DOMContentLoaded', function () {
    addStates();
    loadSightingOptions();
    loadYearOptions();
});

let sightings = []
let years = []

const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' 
]

// Adds states to dropdown
function addStates() {
  let dropdown = document.getElementById('state-dropdown')

  for (const state of states) {
    var option = document.createElement("option");
    option.value = state;
    option.text = state.charAt(0).toUpperCase() + state.slice(1);
    dropdown.appendChild(option);
  }
}

//Event listener for state select 
function addStateSelectListener() {
  let filter = document.getElementById('state-filter')
  let dropdown = document.getElementById('state-dropdown')
  filter.addEventListener('click', function (event) {
    filterSightingsByState(dropdown.value);
    //
    console.log(dropdown.value)
  });

}
// Filters sightings by state
function filterSightingsByState(state) {
  updateSightingList(sightings.filter(sighting => sighting.state_province === state));
}

function updatePage(sightings) {
  let grid = document.getElementById('sightings-grid')
  removeChildren(grid)
  let itemOne = document.createElement('div')
  let itemTwo = document.createElement('div')
  itemOne.className = 'grid-item'
  itemOne.innerText = 'Total Sightings:'
  itemTwo.className = 'grid-item'
  itemTwo.innerText = sightings.length
  grid.appendChild(itemOne) 
  grid.appendChild(itemTwo)
}
              
// Loads sightings into the DOM

function loadSightingOptions() {
    const sightingUrl = 'http://localhost:3000/sightings'
    fetch(sightingUrl)
      .then(res => res.json())
      .then(results => {
  
        sightings = results;
        //updateSightingList(sightings);
        //addYearSelectListener();
        addStateSelectListener();
    });
} 

function loadYearOptions() {
  const yearUrl = 'http://localhost:3000/years';
  fetch (yearUrl)
    .then(res => res.json())
    .then(results => {
      years = results
      console.log(years)

      addYearSelectListener();
    
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

function removeChildren(element) {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function filterSightingsByYear(year) {
  let yearsFilter = years.filter(y => y.value == year);
  let yearsReduce = yearsFilter.reduce(year => sightings)
  console.log(yearsReduce.sightings)
}

function showData (data) {
  console.log(data)
}

function addYearSelectListener() {
  let yearDropdown = document.querySelector('#year-dropdown');
  yearDropdown.addEventListener('change', function (event) {
    filterSightingsByYear(event.target.value)
    console.log(event.target.value)
  });
}

function addSighting(sighting) {
  let ul = document.querySelector('#sighting-info');
  let li = document.createElement('li');
  li.innerText = `Date: ${sighting.date}, City: ${sighting.town}, State/Province: ${sighting.state_province}, Number of Monarchs: ${sighting.num_of_individuals}`
  //li.style.cursor = 'pointer';
  ul.appendChild(li);
  //li.addEventListener('click', updateColor);
}
//function filterSightingsByYear() {
  //document.getElementById("sighting-info").innerHTML = sightings.filter(yearFilter);
//}

//function yearFilter() {
  //return year = document.getElementById("year-dropdown").value
  //debugger
//}

//function checkAdult(age) {
  //return age >= document.getElementById("ageToCheck").value;
//}

//console.log('%c HI', 'color: firebrick')
////let breeds = [];

//document.addEventListener('DOMContentLoaded', function () {
//  loadImages();
//  loadBreedOptions();
//});

//function loadImages() {
//  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
//  fetch(imgUrl)
//    .then(res=> res.json())
//    .then(results => {
//      results.message.forEach(image => addImage(image))
//    });
//}

//function addImage(dogPicUrl) {
//  let container = document.querySelector('#dog-image-container');
//  let newImageEl = document.createElement('img');
//  newImageEl.src = dogPicUrl;
//  container.appendChild(newImageEl);
//}

//function loadBreedOptions() {
//  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
//  fetch(breedUrl)
//    .then(res => res.json())
//    .then(results => {
//
//      breeds = Object.keys(results.message);
//      updateBreedList(breeds);
//      addBreedSelectListener();
//    });
//}



// function updateColor(event) {
//  event.target.style.color = 'lightgreen';

//<p>Minimum age: <input type="number" id="ageToCheck" value="18"></p>
//<button onclick="myFunction()">Try it</button>

//<p>All ages above minimum: <span id="demo"></span></p>

//<script>
//var ages = [32, 33, 12, 40];

//function checkAdult(age) {
//  return age >= document.getElementById("ageToCheck").value;
//}

//function myFunction() {
//  document.getElementById("demo").innerHTML = ages.filter(checkAdult);
//}
//</script>


