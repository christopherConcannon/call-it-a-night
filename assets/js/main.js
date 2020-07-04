// CACHE PAGE ELEMENTS
const landingEl = document.querySelector('#landing-wrapper');
const hereNowBtnEl = document.querySelector('#here-now');
const searchFormEl = document.querySelector('#search');
const searchFormSubmitBtnEl = document.querySelector('#search-form-submit');
const cityInputEl = document.querySelector('#city');
const dateInputEl = document.querySelector('#date');
const timeInputEl = document.querySelector('#time');

// GLOBAL VARS
let lat;
let lon;
let date;
let time;
const favsArr = localStorage.getItem('faves') || [];

//  GET USER CURRENT LAT/LON AND CREATE CURRENT MOMENT OBJ
function getUserCoords() {
  console.log('Here and now button clicked')
  // navigator.geolocation.getCurrentPosition();
  // current moment object
  // coordObj = {
  //   lat: 'lat',
  //   lon: 'lon',
  //   date: 'moment-date', 
  //   time: 'moment-time'
  // }
  // call fetch functions with coord object
  // zomatoFetch(coordObj);
  // tixMasterFetch(coordObj);
}

// GET SELECTED COORDINATES AND DATE/TIME
function getCustomCoords() {
  console.log('Custom search form submitted');
  // coordObj = {
  //   lat: 'lat',
  //   lon: 'lon',
  //   date: 'moment-date', 
  //   time: 'moment-time'
  // }
  // zomatoFetch(coordObj);
  // tixMasterFetch(coordObj);
}

function zomatoFetch(coords) {

}

function tixMasterFetch(coords) {

}

function displayRestauResults() {
  // build cards and append to DOM
  // data-id attr for fav tracking
  // add event listener to fav icon...callbck saveFav()

} 

function displayEventResults() {
  // build cards and append to DOM
  // data-id attr for fav tracking
  // add event listener to fav icon...callback saveFav()
}

function displayFavs() {
  for (let i = 0; i < favsArr.length; i++) {
    // build cards
  }
}

function addToFavs() {
  favsArr.push(cardObj)
  localStorage.setItem('faves', favsArr);
  displayFavs();
}












// ADD EVENT LISTENERS
hereNowBtnEl.addEventListener('click', getUserCoords);
// should refactor to fire on form submit, but need to adjust form styles
searchFormSubmitBtnEl.addEventListener('click', getCustomCoords);
// event listener for fav icon
favIconEl.addEventListener('click', addToFavs);
