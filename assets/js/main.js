// CACHE PAGE ELEMENTS
const landingContainerEl = document.querySelector('#landing-wrapper');
const resultsContainerEl = document.querySelector('#results-wrapper');
const hereNowBtnEl = document.querySelector('#here-now');
const searchFormEl = document.querySelector('#search');
const searchFormSubmitBtnEl = document.querySelector('#search-form-submit');
const cityInputEl = document.querySelector('#city');
const dateInputEl = document.querySelector('#date');
const timeInputEl = document.querySelector('#time');
const favoritesEl = document.querySelector('#favorites');

// carousel container divs
const restauCarouselEl = document.querySelector('#restau-carousel');
const eventCarouselEl = document.querySelector('#event-carousel');
const favoritesGridEl = document.querySelector('#favorites-grid');

// parent element for delegatation of .fav listener
const resultsWrapperEl = document.querySelector('#results-wrapper');

// error msg containers
const restauErrMsgEl = document.querySelector('#restau-err-msg');
const eventErrMsgEl = document.querySelector('#event-err-msg');

// GLOBAL VARS
const coordObj = {};

//  GET USER CURRENT LAT/LON IF USER GIVES PERMISSION AND CREATE CURRENT MOMENT OBJ
function getUserCoords() {
	function success(pos) {
		const crd = pos.coords;
		coordObj.lat = crd.latitude;
		coordObj.lon = crd.longitude;
		// current moment object
		coordObj.dateTimeStart = moment().format('YYYY-MM-DDTHH:mm:ss');
		// // make range 6 days for testing
		// coordObj.dateTimeEnd = moment().add(6, 'd').format('YYYY-MM-DDTHH:mm:ss');
		// make range 24 hours for deployable version
		coordObj.dateTimeEnd = moment().add(24, 'h').format('YYYY-MM-DDTHH:mm:ss');
		// call function to reveal container that will hold results.  pass coords down to child restau/event display functions
		revealResultsContainer(coordObj);
	}

	// Creates Warning User denied Geolocation
	function error(err) {
		// TODO output error message to HTML
		console.warn(`ERROR(${err.code}): ${err.message}`);
		// let msg = "If you don't want us to use your location, you can still make a custom search";
		// displayErrorMsg(msg);
	}
	if (!navigator.geolocation) {
		// TODO tell user to choose custom search button
		console.log('Geolocation is not supported by your browser');
		// let msg = "Geolocation is not supported by your browser, but you can still make a custom search";
		// displayErrorMsg(msg);
	} else {
		navigator.geolocation.getCurrentPosition(success, error);
	}
}

// GET SELECTED COORDINATES AND DATE/TIME
function getCustomCoords(event) {
  // if callback is fired by form submit (rather than button click) prevent default reloading behavior
  // event.preventDefault()
	// GET FORM FIELD INPUT FOR CITY
	const cityInputVal = cityInputEl.value.trim();
	const dateInputVal = dateInputEl.value;
	const timeInputVal = timeInputEl.value.trim();
	let dateTimeStart = `${dateInputVal} ${timeInputVal}`;

	// fetch request to OpenCage API
	// format url
	const openCageApiKey = '0c839a0f2d5a4c3192c2c08f5fd44dfc';
	const openCageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${cityInputVal}&key=${openCageApiKey}&pretty=1&no_annotations=1`;

	fetch(openCageUrl)
		.then(function(res) {
			return res.json();
		})
		.then(function(data) {
			coordObj.lat = data.results[0].geometry.lat;
			coordObj.lon = data.results[0].geometry.lng;
			coordObj.dateTimeStart = moment(
				dateTimeStart,
				'MMM D, YYYY HH:mm A',
				true
			).format('YYYY-MM-DDTHH:mm:ss');
			// // make range 6 days for testing
			// coordObj.dateTimeEnd = moment(dateTimeStart, 'MMM D, YYYY HH:mm A', true)
			// 	.add(6, 'd')
			// 	.format('YYYY-MM-DDTHH:mm:ss');
			// make range 12 hours for deployable version
			coordObj.dateTimeEnd = moment(dateTimeStart, 'MMM D, YYYY HH:mm A', true)
				.add(12, 'h')
				.format('YYYY-MM-DDTHH:mm:ss');
			revealResultsContainer(coordObj);
		});
}

// synchronize revealResultsContainer with fetch requests so container will be on page before data is returned and sent to individual display<x>Results() functions, thus avoiding asynchronicity issues
function revealResultsContainer(coordObj) {
	landingContainerEl.className = 'hide';
	resultsContainerEl.classList = 'results-wrapper center';
  // call result display functions
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
				// let msg = `Error: ${res.statusText}`;
				let msg =
					"Sorry, can't get listings for that area.  Maybe try somewhere else for your next vacation";
				displayErrorMsg(msg, restauErrMsgEl);
			}
		})
		.catch((error) => {
			console.error('Error:', error);
			let msg =
				'Sorry, no listings for that area.  Maybe try somewhere else for your next vacation';
			displayErrorMsg(msg, restauErrMsgEl);
		});
}

// fetch from Tix Master, passing in coordObj
function tixMasterFetch(coordObj) {
	const lat = coordObj.lat;
	const lon = coordObj.lon;
	const dateTimeStart = coordObj.dateTimeStart;
	const dateTimeEnd = coordObj.dateTimeEnd;

	// convert lat/lon to geohash using 3rd party script
	const geoPoint = Geohash.encode(lat, lon, 7);

	const tixAPIkey = 'wEkOlTafP8T1DEZZ4GWREy4AwGrWvuBx';

  // format API url including comma-separated date/time range parameter
  const tixMasterAPIUrl = `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${geoPoint}&radius=1&localStartDateTime=${dateTimeStart},${dateTimeEnd}&apikey=${tixAPIkey}`;
  
  // wide parameter ranges for testing purposes
	// const tixMasterAPIUrl = `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${geoPoint}&radius=10&localStartDateTime=${dateTimeStart},${dateTimeEnd}&apikey=${tixAPIkey}`;


	fetch(tixMasterAPIUrl)
		.then(function(res) {
			if (res.ok) {
				res.json().then(function(data) {
					if (!data._embedded) {
						let msg =
							'Sorry chap/ette, no events in your area.  Call an Uber or Netflix and chill';
						displayErrorMsg(msg, eventErrMsgEl);
					} else {
						let eventData = data._embedded.events;

						// pass API data to display function
						displayEventResults(eventData);
					}
				});
			} else {
				// let msg = `Error: ${res.statusText}`;
				// displayErrorMsg(msg);
				let msg =
					"Sorry chap/ette, can't fetch events in your area right now.  Call an Uber or Netflix and chill";
				displayErrorMsg(msg, eventErrMsgEl);
			}
		})
		.catch((error) => {
			// console.error('Error:', error);
			let msg =
				"Sorry chap/ette, can't fetch events in your area right now.  Call an Uber or Netflix and chill";
			displayErrorMsg(msg, eventErrMsgEl);
		});
}
// dynamically generate cards which are .carousel-items and initialize Materialize carousel instance
function displayRestauResults(restauData) {
	// populate cards
  let innerHTML = '';
  // array of numeric text values used for id-purposes as href values on Materialize .carousel-items
  const index = [ 'one', 'two', 'three', 'four', 'five', 'six', 'seven' ];
  // limit to 7 results for carousel display for better UX 
	for (var i = 0; i <= 6; i++) {
		if (restauData[i]) {
			// url encode special characters for query to Google Maps URL
			const address = restauData[i].restaurant.location.address;
			const encodedAddress = address.replace(/ /g, '%20').replace(/,/g, '%2C');
      
      // TODO
      // if user performs fresh search that returns result/s that are already in favorite's the .fav-icon fill status will be out of sync.  the script guards against the newly returned result being duplicated in the favorites, and the .fav-icon updates fill status on click so it's not hugely problematic.
      // check if any of the id's of returned results (iterate over carouselEl's nodeList) are already in the favorites nodeList, if so make innerText of i.fav-icon = favorite instead  of favorite_border.  need to nest 2 loops to iterate 2-dimensionally through 2 arrays.
      // same for events

			innerHTML += `
    <div href="#${index[i]}!" class="carousel-item" data-id="restau-${restauData[i]
				.restaurant.id}">
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
        <a href="${restauData[i].restaurant
			.url}" class="site" target="_blank"><i class="material-icons">language</i></a>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}" class="location" target="_blank"><i class="material-icons">directions</i></a>
        <i class="material-icons fav-icon">favorite_border</i>
      </div>
    </div>
    </div>
    `;
		}
	}
	restauCarouselEl.innerHTML = innerHTML;
	// initialize Materialize Carousel only once relevant content is on the page or error will be thrown
	M.Carousel.init($('#restau-carousel.carousel'));


}
// ditto
function displayEventResults(eventData) {

	// populate cards
	let innerHTML = '';
	const index = [ 'one', 'two', 'three', 'four', 'five', 'six', 'seven' ];
	for (var i = 0; i <= 6; i++) {
		if (eventData[i]) {
			let eventLat = eventData[i]._embedded.venues[0].location.latitude;
			let eventLon = eventData[i]._embedded.venues[0].location.longitude;

			innerHTML += `
  
    <div href="#${index[i]}!" class="carousel-item" data-id="event-${eventData[i].id}">

    <div class="card">
      <div class="card-image">
        <img src="${eventData[i].images[0].url}">
      </div>
      <div class="card-content">
        <p>${eventData[i].name}</p>
      </div>
      <div class="card-action">
        <a href="${eventData[i]
			.url}" class="site" target="_blank"><i class="material-icons">language</i></a>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${eventLat},${eventLon}" class="location" target="_blank"><i class="material-icons">directions</i></a>
        <i class="material-icons fav-icon">favorite_border</i>
      </div>
    </div>
    </div>
    `;
		}
	}
	eventCarouselEl.innerHTML = innerHTML;
	// initialize Materialize Carousel
	M.Carousel.init($('#event-carousel.carousel'));

}
// add result card to favorites grid (after checking against duplicates); and synchronize .fav-icon displays
function addFav(event) {
	// if a fav-icon was clicked
	if (event.target.closest('.fav-icon')) {
		// make sure heading and container are visible in cases where no favorites are present on page load
		favoritesEl.classList.remove('hide');
		// store reference to the clicked icon
		let newFavIcon = event.target.closest('.fav-icon');
		// change fav-icon to show it's been selected
		newFavIcon.innerText = 'favorite';

		// update class list so it won't be listened on any more, thus avoiding an unecessary event being fired and pointlessly running code up to the conditional check that is necessary in the case of a new search being performed in the same geographical area which will return the same results but now the newly generated card still has the .fav-icon class (even though a copy of it's previous rendering could already be in the favorites section) so it will fall through the cracks to the next bit of code
		newFavIcon.classList = 'material-icons fav-icon-copy';
		// get the clicked icon's nearest .carousel-item ancestor.  this will be what is cloned
		let newFav = newFavIcon.closest('.carousel-item');
		// get the .carousel-item's id so it can be compared to id's of items already in favorites, to avoid duplication
		let newFavId = newFav.getAttribute('data-id');

    // this routine will prevent any duplicates being added to favorites
		// check if data-id attribute of clicked card (newFav) is equal to one already on an item in the favorites container.
		// create iterable nodeList of cards already in favorites
		const favNodeList = favoritesGridEl.querySelectorAll('#favorites-grid .fav-card');

		let idCheck = '';
		// loop over nodeList and if data-id of clicked on card matches one in favorites, set duplicate flag
		favNodeList.forEach(function(favNode) {
			// get data-id of favorite card in current iteration
			const favNodeId = favNode.getAttribute('data-id');
			// check if it matches clicked on card's data-id
			if (favNodeId === newFavId) {
				idCheck = 'duplicate';
			}
		});

    // if duplicate flag was not set, clone newFav
		if (idCheck !== 'duplicate') {
			//  clone the existing .carousel-item
			let newFavCopy = newFav.cloneNode(true);
			// remove active class added by Materialize
			newFavCopy.classList = 'col s6 fav-card';
      // remove attributes used by Materialize for carousel, these will just be flex/grid items
			newFavCopy.removeAttribute('style');
			newFavCopy.removeAttribute('href');

			// display newFavCopy
			favoritesGridEl.appendChild(newFavCopy);

			// set favorites to LS
			localStorage.setItem('faves', JSON.stringify(favoritesGridEl.innerHTML));
		}

	} else return false;

}
// remove card from favorites and update .fav-icon display on corresponding result card, if present; and save updated favorite node children to localStorage
function removeFav() {
	if (event.target.closest('.fav-icon-copy')) {
		// store reference to the clicked icon
		const favIconToRemove = event.target.closest('.fav-icon-copy');
		if (favIconToRemove.closest('.fav-card')) {
			const favToRemove = favIconToRemove.closest('.fav-card');

			// update .fav-icon on result card so it displays correctly and is clickable again
      const favId = favToRemove.getAttribute('data-id');
      // get correct results category, restaurants or events to be able to access relevant nodeList
			const favIdPrefix = favId.split('-')[0];
			updateFavIconOnRemove(favId, favIdPrefix);

			favToRemove.remove();
			
			// reset favorites to LS
			localStorage.setItem('faves', JSON.stringify(favoritesGridEl.innerHTML));
		}
	}
}

// change filled favorite icon in results carousel back to unfilled when it's corresponding card is removed from favorites
// iterate over relevant carousel nodeList.  check if id of favorite matches id of any of the currently displayed results
function updateFavIconOnRemove(favId, favIdPrefix) {
	if (favIdPrefix === 'restau') {
		const restauNodeList = restauCarouselEl.querySelectorAll('.carousel-item');
		restauNodeList.forEach(function(restauNode) {
			const restauNodeId = restauNode.getAttribute('data-id');

			if (favId === restauNodeId) {
				const nodeIcon =
					restauNode.querySelector('.fav-icon-copy') ||
					restauNode.querySelector('.fav-icon');
				nodeIcon.classList = 'material-icons fav-icon';
				nodeIcon.innerText = 'favorite_border';
			}
		});
	} else {
		const eventNodeList = eventCarouselEl.querySelectorAll('.carousel-item');
		eventNodeList.forEach(function(eventNode) {
			const eventNodeId = eventNode.getAttribute('data-id');

			if (favId === eventNodeId) {
				const nodeIcon =
					eventNode.querySelector('.fav-icon-copy') ||
					eventNode.querySelector('.fav-icon');
				nodeIcon.classList = 'material-icons fav-icon';
				nodeIcon.innerText = 'favorite_border';
			}
		});
	}
}

function displayErrorMsg(msg, container) {
	// console.log(msg);
	container.innerHTML = `${msg}     
    <div class="err-img">
      😭
    </div>`;
}

function loadFavs() {
	let favsGridInnerHTML = localStorage.getItem('faves');
	if (!favsGridInnerHTML) {
		return false;
	}

	favsGridInnerHTML = JSON.parse(favsGridInnerHTML);

	favoritesEl.classList.remove('hide');
	favoritesGridEl.innerHTML = favsGridInnerHTML;
}

loadFavs();

// ADD EVENT LISTENERS
hereNowBtnEl.addEventListener('click', getUserCoords);
// should refactor to fire on form submit for accessibility, but button form attribute setup did not submit form field data. This setup did not submit form field data as expected with event.prefault in JS to prevent page reload-
// searchFormEl.addEventListener('submit', getCustomCoords);
searchFormSubmitBtnEl.addEventListener('click', getCustomCoords);

// event listener for .fav-icon
resultsWrapperEl.addEventListener('click', addFav);

// // event listener for .fav-icon-copy
resultsWrapperEl.addEventListener('click', removeFav);

// TODO
// syncronize fav-icons on results return 
// clear all favs button and handler
// if there is only one event and you slide-click off it and no other image is there to display so you've lost your whole carousel.  possible solution...check length of events nodeList.  if < 2/3 display images as a flex row, otherwise initialize as carousel
// expand search customization options...radius, genres, time range, etc.
