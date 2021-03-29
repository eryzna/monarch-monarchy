document.addEventListener('DOMContentLoaded', function () {
    loadYearOptions();
});

function loadYearOptions () {
    

}

function loadYearOptions() {
    const yearUrl = 'http://localhost:3000/years'
    fetch(yearUrl)
      .then(res => res.json())
      .then(results => {
  
        years = Object.keys(results.message);
        updateBreedList(years);
        addYearSelectListener();
      });
  }

