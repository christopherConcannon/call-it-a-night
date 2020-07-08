// CACHE PAGE ELEMENTS
const landingContainerEl = document.querySelector('#landing-wrapper');
const resultsContainerEl = document.querySelector('#results-wrapper');
const hereNowBtnEl = document.querySelector('#here-now');
const searchFormEl = document.querySelector('#search');
const searchFormSubmitBtnEl = document.querySelector('#search-form-submit');
const cityInputEl = document.querySelector('#city');
const dateInputEl = document.querySelector('#date');
const timeInputEl = document.querySelector('#time');

const restauCarouselEl = document.querySelector('#restau-carousel');
const eventCarouselEl = document.querySelector('#event-carousel');
const favoritesCarouselEl = document.querySelector('#favorites-carousel');

// parent element for delegatation of .fav listener
const resultsWrapperEl = document.querySelector('#results-wrapper');

// GLOBAL VARS
const coordObj = {};

const favsArr = [];
// const favsArr = localStorage.getItem('faves') || [];

//  GET USER CURRENT LAT/LON AND CREATE CURRENT MOMENT OBJ
function getUserCoords() {
	function success(pos) {
		const crd = pos.coords;
		coordObj.lat = crd.latitude;
		coordObj.lon = crd.longitude;
		// current moment object
		coordObj.date = moment().format('YYYY-MM-DDTHH:mm:ss');
		// coordObj.time = moment().format('hh:mm:ss');

		console.log(coordObj);

		revealResultsContainer(coordObj);
	}

	// Creates Warning User denied Geolocation
	function error(err) {
		// TODO output error message to HTML
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}
	if (!navigator.geolocation) {
		// TODO tell user to choose custom search button
		console.log('Geolocation is not supported by your browser');
	} else {
		navigator.geolocation.getCurrentPosition(success, error);
	}
}

// GET SELECTED COORDINATES AND DATE/TIME
function getCustomCoords() {
	// // GET FORM FIELD INPUT FOR CITY
	// const cityInput =
	// // fetch request to OpenCage API
	// const url = `${cityInput}`

	// GET FORM FIELD INPUTS FOR DATE AND TIME
	// current moment object
	// coordObj.date = moment(date from form field)
	// coordObj.time = moment time(time from form field)

	// coordObj.lat = data.latitude;
	// coordObj.lon = data.longitude;
  // coordObj.date =
  console.log(coordObj);

	revealResultsContainer(coordObj);
}

// function to synchronize revealResultsContainer with fetch requests so container will be on page before data is returned and sent to individual display<x>Results() functions, thus avoiding asynchronicity issues
function revealResultsContainer(coordObj) {
	landingContainerEl.className = 'hide';
	resultsContainerEl.classList = 'results-wrapper center';

	zomatoFetch(coordObj);
	tixMasterFetch(coordObj);
}

// fetch from Zomato, passing in coordObj
function zomatoFetch(coordObj) {
	const lat = coordObj.lat;
	const lon = coordObj.lon;
	// format url
	const zomatoAPIUrl = `https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lon}`;

	fetch(zomatoAPIUrl, {
		method  : 'GET',
		headers : {
			'user-key' : '26d100244c8261ae45b9599c8a8848cd'
		}
	})
		.then(function(res) {
			if (res.ok) {
				res.json().then(function(data) {
					let restauData = data.nearby_restaurants;
					
					// pass API data to display function
					displayRestauResults(restauData);
				});
			} else {
				let msg = `Error: ${res.statusText}`;
				displayErrorMsg(msg);
			}
		})
		.catch((error) => {
			console.error('Error:', error);
			displayErrorMsg(error);
		});
}


// fetch from Tix Master, passing in coordObj
function tixMasterFetch(coordObj) {
	const lat = coordObj.lat;
	const lon = coordObj.lon;

	// convert lat/lon to geohash using 3rd party script
	const geoPoint = Geohash.encode(lat, lon, 7);

  const tixAPIkey = 'wEkOlTafP8T1DEZZ4GWREy4AwGrWvuBx';
  
  // const tixMasterAPIUrl = `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${geoPoint}&radius=10&localStartDateTime=2020-07-21T16:30:00,2020-07-21T23:30:00&apikey=${tixAPIkey}`;
  // const tixMasterAPIUrl = `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=9v6s0j&radius=10&localStartDateTime=2020-07-21T16:30:00,2020-07-21T23:30:00&apikey=${tixAPIkey}`;
  const tixMasterAPIUrl = `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=9v6s0j&radius=10&&apikey=${tixAPIkey}`;


	fetch(tixMasterAPIUrl)
		.then(function(res) {
			if (res.ok) {
				res.json().then(function(data) {
					if (!data._embedded) {
						let msg =
							'Sorry chap/ette, no events in your area.  Call an Uber or Netflix and chill';
						displayErrorMsg(msg);
					} else {
						let eventData = data._embedded.events;

						// pass API data to display function
						displayEventResults(eventData);
					}
				});
			} else {
				let msg = `Error: ${res.statusText}`;
				displayErrorMsg(msg);
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

function displayRestauResults(restauData) {
  console.log('getZomatoData -> nearbyRestaurants', restauData);
  
  // populate cards
  let innerHTML = '';
  const index = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
  for (var i = 0; i <= 6; i++) {
    // url encode special characters for query
		const address = restauData[i].restaurant.location.address;
		const encodedAddress = address.replace(/ /g, '%20').replace(/,/g, '%2C');
    
    innerHTML += `
    <div href="#${index[i]}!" class="carousel-item" data-id="restau-${i+1}">
    <div class="card">
      <div class="card-image">
        <img src="${restauData[i].restaurant.thumb !== ''
        				? restauData[i].restaurant.thumb
        				: './assets/images/restau-placeholder-img.jpg'}">
      </div>
      <div class="card-content">
        <p>${restauData[i].restaurant.name} -- ${restauData[i].restaurant.cuisines}</p>
      </div>
      <div class="card-action">
        <a href="${restauData[i].restaurant.url}" class="site" target="_blank"><i class="material-icons">language</i></a>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}" class="location" target="_blank"><i class="material-icons">directions</i></a>
        <i class="material-icons fav-icon">favorite_border</i>
      </div>
    </div>
    </div>
    `
  }
  restauCarouselEl.innerHTML = innerHTML;
  // initialize Materialize Carousel
  M.Carousel.init($('#restau-carousel.carousel'));
  

  // TODO
	// set data-id attr for fav tracking
	
}

function displayEventResults(eventData) {
  // populate cards
  console.log('tixMasterFetch -> nearbyEvents', eventData);
  
  // populate cards
  let innerHTML = '';
  const index = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
  // getting error when there are less than 7 results cannot read '_embedded' of undefined.  need to set condition
  for (var i = 0; i <= 6; i++) {

    let eventLat = eventData[i]._embedded.venues[0].location.latitude;
		let eventLon = eventData[i]._embedded.venues[0].location.longitude;
 
    
    innerHTML += `
    <div href="#${index[i]}!" class="carousel-item" data-id="event-${i+1}">
    <div class="card">
      <div class="card-image">
        <img src="${eventData[i].images[0].url}">
      </div>
      <div class="card-content">
        <p>${eventData[i].name}</p>
      </div>
      <div class="card-action">
        <a href="${eventData[i].url}" class="site" target="_blank"><i class="material-icons">language</i></a>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${eventLat},${eventLon}" class="location" target="_blank"><i class="material-icons">directions</i></a>
        <i class="material-icons fav-icon">favorite_border</i>
      </div>
    </div>
    </div>
    `
  }
  eventCarouselEl.innerHTML = innerHTML;
  // initialize Materialize Carousel
  M.Carousel.init($('#event-carousel.carousel'));

	
	// set data-id attr for fav tracking
	// add event listener to fav icon...callbck addToFavs()
	// set data-id attr for fav tracking
	// add event listener to fav icon...callback addToFavs()
}

function buildFav(event) {
	if (event.target.closest('.fav-icon')) {
		let newFavIcon = event.target.closest('.fav-icon');
		let newFav = newFavIcon.closest('.carousel-item');
		let newFavId = newFav.getAttribute('data-id');
		console.log(newFavId);
		let newFavCopy = newFav.cloneNode(true);
		newFavCopy.setAttribute('data-id', `${newFavId}-copy`);
		let newFavCopyIcon = newFavCopy.querySelector('.fav-icon');
		newFavCopyIcon.innerText = 'favorite';
		newFavCopyIcon.classList = 'material-icons fav-icon-copy';
		console.log(newFavCopy);
		addToFavs(newFavCopy);
	} else return;
}

function addToFavs(newFavCopy) {
	favsArr.push(newFavCopy);
	localStorage.setItem('faves', JSON.stringify(favsArr));
	displayFavs(favsArr);

	// favsArr.push(cardEl.data-id === x)
	// localStorage.setItem('faves', favsArr);
	// displayFavs();
}

function displayFavs(favsArr) {
	for (let i = 0; i < favsArr.length; i++) {
		favoritesCarouselEl.appendChild(favsArr[i]);
		// style the icon to show its selected (heart filled in)
		// event listener on icon to remove from favs
	}
	favoritesCarouselEl.className = 'carousel';
	M.Carousel.init($('#favorites-carousel.carousel'));
}

function displayErrorMsg(err) {
	console.log(err);
	// TODO -- CREATE HTML MESSAGE INSTEAD OF CONSOLE.LOG/ALERT
}

// ADD EVENT LISTENERS
hereNowBtnEl.addEventListener('click', getUserCoords);
// should refactor to fire on form submit for accessibility, but need to adjust form styles
searchFormSubmitBtnEl.addEventListener('click', getCustomCoords);

// event listener for fav icon
resultsWrapperEl.addEventListener('click', buildFav);

