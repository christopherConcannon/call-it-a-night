// CACHE PAGE ELEMENTS
const landingContainerEl = document.querySelector('#landing-wrapper');
const resultsContainerEl = document.querySelector('#results-wrapper');
const hereNowBtnEl = document.querySelector('#here-now');
const searchFormEl = document.querySelector('#search');
const searchFormSubmitBtnEl = document.querySelector('#search-form-submit');
const cityInputEl = document.querySelector('#city');
const dateInputEl = document.querySelector('#date');
const timeInputEl = document.querySelector('#time');



// GLOBAL VARS
	coordObj = {
	  lat: 0,
	  lon: 0,
	  date: '',
	  time: ''
	}
const favsArr = localStorage.getItem('faves') || [];

//  GET USER CURRENT LAT/LON AND CREATE CURRENT MOMENT OBJ
function getUserCoords() {
	console.log('Here and now button clicked');
	// navigator.geolocation.getCurrentPosition() {
    // ....
    // coordObj.lat = pos.coords.latitude;
    // coordObj.lon = pos.coords.longitude;
  // }
  // current moment object
  // coordObj.date = moment date
  // coordObj.time = moment time
  
	// call function to synchronize revealResultsContainer with fetch requests so container will be on page before data is returned and sent to individual display<x>Results() functions
	mediateFetches();
}

// GET SELECTED COORDINATES AND DATE/TIME
function getCustomCoords() {
  console.log('Custom search form submitted');
  // GET FORM FIELD INPUT FOR CITY
  // fetch request to OpenCage API
  // coordObj.lat = pos.coords.latitude;
  // coordObj.lon = pos.coords.longitude;
  
  // GET FORM FIELD INPUTS FOR DATE AND TIME
  // current moment object
  // coordObj.date = moment date
  // coordObj.time = moment time
  
	// call function to synchronize revealResultsContainer with fetch requests so container will be on page before data is returned and sent to individual display<x>Results() functions
	mediateFetches();

}

function mediateFetches() {
  // get results container on page so it will be ready when data is returned
  revealResultsContainer();
  // call individual fetch functions
	// zomatoFetch();
	// tixMasterFetch();
}

function revealResultsContainer() {
  landingContainerEl.className = 'hide';
  resultsContainerEl.classList = 'results-wrapper center';
  // initialize Materialize Carousel
  M.Carousel.init($('.carousel'));
}

function zomatoFetch() {
  // fetch from Zomato, passing in coordObj from global scope
  
  // pass API data to display function
	// displayRestauResults(data);
}

function tixMasterFetch(coords) {
    // fetch from Tix Master, passing in coordObj from global scope
    
    // pass API data to display function
    // displayEventResults(data);
}

function displayRestauResults() {
	// populate cards and append to DOM
	// set data-id attr for fav tracking
	// add event listener to fav icon...callbck addToFavs()
}

function displayEventResults() {
	// popuate cards and append to DOM
	// set data-id attr for fav tracking
	// add event listener to fav icon...callback addToFavs()
}

function addToFavs() {
	// favsArr.push(cardEl.data-id === x)
	// localStorage.setItem('faves', favsArr);
	// displayFavs();
}

function displayFavs() {
	for (let i = 0; i < favsArr.length; i++) {
		// populate cards
		// style the icon to show its selected (heart filled in)
		// event listener on icon to remove from favs
	}
}



// ADD EVENT LISTENERS
hereNowBtnEl.addEventListener('click', getUserCoords);
// should refactor to fire on form submit for accessibility, but need to adjust form styles
searchFormSubmitBtnEl.addEventListener('click', getCustomCoords);
// event listener for fav icon
// favIconEl.addEventListener('click', addToFavs);
