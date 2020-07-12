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

// const favsArr = [];
// const favsArr = localStorage.getItem('faves') || [];

//  GET USER CURRENT LAT/LON AND CREATE CURRENT MOMENT OBJ
function getUserCoords() {
	function success(pos) {
		const crd = pos.coords;
		coordObj.lat = crd.latitude;
		coordObj.lon = crd.longitude;
		// current moment object
		coordObj.dateTimeStart = moment().format('YYYY-MM-DDTHH:mm:ss');
		// make range 6 days for testing
		coordObj.dateTimeEnd = moment().add(6, 'd').format('YYYY-MM-DDTHH:mm:ss');
		// coordObj.dateTimeEnd = moment().add(6, 'h').format('YYYY-MM-DDTHH:mm:ss');

		revealResultsContainer(coordObj);
	}

	// Creates Warning User denied Geolocation
	function error(err) {
		// TODO output error message to HTML
		// console.warn(`ERROR(${err.code}): ${err.message}`);
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

// // GET SELECTED COORDINATES AND DATE/TIME

function getCustomCoords(event) {
	// event.preventDefault();
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
			// make range 6 days for testing
			coordObj.dateTimeEnd = moment(dateTimeStart, 'MMM D, YYYY HH:mm A', true)
				.add(6, 'd')
				.format('YYYY-MM-DDTHH:mm:ss');
			// coordObj.dateTimeEnd = moment(dateTimeStart, 'MMM D, YYYY HH:mm A', true).add(6, 'h').format('YYYY-MM-DDTHH:mm:ss');
			revealResultsContainer(coordObj);
		});
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

	const tixMasterAPIUrl = `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${geoPoint}&radius=10&localStartDateTime=${dateTimeStart},${dateTimeEnd}&apikey=${tixAPIkey}`;
	// const tixMasterAPIUrl = `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=9v6s0j&radius=10&localStartDateTime=2020-07-21T16:30:00,2020-07-21T23:30:00&apikey=${tixAPIkey}`;
	// const tixMasterAPIUrl = `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=9v6s0j&radius=10&&apikey=${tixAPIkey}`;

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

function displayRestauResults(restauData) {
	// populate cards
	let innerHTML = '';
	const index = [ 'one', 'two', 'three', 'four', 'five', 'six', 'seven' ];
	for (var i = 0; i <= 6; i++) {
		if (restauData[i]) {
			// url encode special characters for query
			const address = restauData[i].restaurant.location.address;
      const encodedAddress = address.replace(/ /g, '%20').replace(/,/g, '%2C');
      
      // check if any of the data-id's are already in the favorites nodeList, if so make innerText of i.fav-icon = favorite instead  of favorite_border

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
	// initialize Materialize Carousel
	M.Carousel.init($('#restau-carousel.carousel'));
	// loadFavs();

	// TODO
	// set data-id attr for fav tracking
}

function displayEventResults(eventData) {
	// populate cards

	// populate cards
	let innerHTML = '';
	const index = [ 'one', 'two', 'three', 'four', 'five', 'six', 'seven' ];
	// getting error when there are less than 7 results cannot read '_embedded' of undefined.  need to set condition
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

	// set data-id attr for fav tracking
	// add event listener to fav icon...callbck addFav()
	// set data-id attr for fav tracking
	// add event listener to fav icon...callback addFav()
}

function addFav(event) {
	// if a fav-icon was clicked
	if (event.target.closest('.fav-icon')) {
		// make sure heading and container are visible in cases where no favorites are present on page load
		favoritesEl.classList.remove('hide');
		// store reference to the clicked icon
		let newFavIcon = event.target.closest('.fav-icon');
		// change fav-icon to show it's been selected
		newFavIcon.innerText = 'favorite';

		// update copy's class list so it won't be listened on any more, thus avoiding an unecessary event being fired and pointlessly running code up to the conditional check that is necessary in the case of a new search being performed in the same geographical area which will return the same results but now the newly generated card still has the .fav-icon class (even though a copy of it's previous rendering could already be in the favorites section) so it will fall through the cracks to the next bit of code
		newFavIcon.classList = 'material-icons fav-icon-copy';
		// get the clicked icon's nearest .carousel-item ancestor
		let newFav = newFavIcon.closest('.carousel-item');
		// get the .carousel-items id
		let newFavId = newFav.getAttribute('data-id');
		console.log(newFavId);

		// CAREFUL -- EXPERIMENTAL WORKING CODE HERE ***************************************************************

		// check if data-id attribute of clicked card is equal to one already on an item in the favorites container.

		// create iterable nodeList of cards already in favorites
		const favNodeList = favoritesGridEl.querySelectorAll('#favorites-grid .fav-card');
		console.log(favNodeList);

		let idCheck = '';
		// loop over nodeList and if data-id of clicked on card does not match data-id of card already in favorites, copy and append it
		favNodeList.forEach(function(favNode) {
			// get data-id of favorite card in current iteration
			const favNodeId = favNode.getAttribute('data-id');
			// console.log(favNodeId);
			// check if it matches clicked on card's data-id
			if (favNodeId === newFavId) {
				idCheck = 'duplicate';
			}
		});

		if (idCheck !== 'duplicate') {
			//  clone the existing .carousel-item
			let newFavCopy = newFav.cloneNode(true);
			// remove active class
			newFavCopy.classList = 'col s6 fav-card';
			// set new id on copy
			// newFavCopy.setAttribute('data-id', `${newFavId}`);
			// get icon element of copy
			newFavCopy.removeAttribute('style');
			newFavCopy.removeAttribute('href');
			// let newFavCopyIcon = newFavCopy.querySelector('.fav-icon');
			// // change fav-icon to show it's been selected
			// newFavCopyIcon.innerText = 'favorite';
			// // update copy's class list so it won't be listened on
			// newFavCopyIcon.classList = 'material-icons fav-icon-copy';

			// display newFavCopy
			favoritesGridEl.appendChild(newFavCopy);

			// set favorites to LS
			localStorage.setItem('faves', JSON.stringify(favoritesGridEl.innerHTML));
		}

		//   EXPERIMENTAL WORKING ABOVE -- PREVIOUS WORKING VERSION BELOW ***********************************************************************

		// let newFavCopy = newFav.cloneNode(true);
		// // remove active class
		// newFavCopy.classList = 'col s3 fav-card';
		// // set new id on copy
		// // newFavCopy.setAttribute('data-id', `${newFavId}`);
		// // get icon element of copy
		// newFavCopy.removeAttribute('style');
		// newFavCopy.removeAttribute('href');
		// // let newFavCopyIcon = newFavCopy.querySelector('.fav-icon');
		// // // change fav-icon to show it's been selected
		// // newFavCopyIcon.innerText = 'favorite';
		// // // update copy's class list so it won't be listened on
		// // newFavCopyIcon.classList = 'material-icons fav-icon-copy';

		// // display newFavCopy
		// favoritesGridEl.appendChild(newFavCopy);

		// // set favorites to LS
		// localStorage.setItem('faves', JSON.stringify(favoritesGridEl.innerHTML));

		// if a fav-icon-copy was clicked
  } else return false
  // else if (event.target.closest('.fav-icon-copy')) {
	// 	// store reference to the clicked icon
	// 	let favIconToRemove = event.target.closest('.fav-icon-copy');
	// 	if (favIconToRemove.closest('.fav-card')) {
	// 		let favToRemove = favIconToRemove.closest('.fav-card');
	// 		favToRemove.remove();
  //     // TODO...change icon in listing back to empty heart
  //     // find parent container nodes and check data-id attribute and change icon.innerText to favorite_border
		
	// 		// reset favorites to LS
	// 		localStorage.setItem('faves', JSON.stringify(favoritesGridEl.innerHTML));
	// 	}
	// }
}

function removeFav() {
  if (event.target.closest('.fav-icon-copy')) {
		// store reference to the clicked icon
		const favIconToRemove = event.target.closest('.fav-icon-copy');
		if (favIconToRemove.closest('.fav-card')) {
      const favToRemove = favIconToRemove.closest('.fav-card');

      // update .fav-icon on result card so it displays correctly and is clickable again
      const favId = favToRemove.getAttribute('data-id')
      const favIdPrefix = favId.split('-')[0];
      updateFavIconOnRemove(favId, favIdPrefix);

			favToRemove.remove();
      // TODO...change icon in listing back to empty heart
      // find parent container nodes and check data-id attribute and change icon.innerText to favorite_border
   
		
			// reset favorites to LS
			localStorage.setItem('faves', JSON.stringify(favoritesGridEl.innerHTML));
		}
	}
}

function updateFavIconOnRemove(favId, favIdPrefix) {
  if (favIdPrefix === 'restau') {
    const restauNodeList = restauCarouselEl.querySelectorAll('.carousel-item');
    restauNodeList.forEach(function(restauNode) {
      const restauNodeId = restauNode.getAttribute('data-id')

      if (favId === restauNodeId) {
        // const nodeIcon = restauNode.querySelector('.fav-icon-copy');
        const nodeIcon = restauNode.querySelector('.fav-icon-copy') || restauNode.querySelector('.fav-icon');
        nodeIcon.classList = 'material-icons fav-icon'
        nodeIcon.innerText = 'favorite_border';
      }
    })
  } else {
    const eventNodeList = eventCarouselEl.querySelectorAll('.carousel-item');
    eventNodeList.forEach(function(eventNode) {
      const eventNodeId = eventNode.getAttribute('data-id') 

      if (favId === eventNodeId) {
        const nodeIcon = eventNode.querySelector('.fav-icon-copy') || eventNode.querySelector('.fav-icon');
        nodeIcon.classList = 'material-icons fav-icon'
        nodeIcon.innerText = 'favorite_border';
      }
    })
  }
}

function displayErrorMsg(msg, container) {
	console.log(msg);
	container.innerHTML = `${msg}     
    <div class="err-img">
      😭
    </div>`;
	// container.querySelector('.err-img').classList.remove('hide');
	// TODO -- CREATE HTML MESSAGE INSTEAD OF CONSOLE.LOG/ALERT
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
// should refactor to fire on form submit for accessibility, but need to adjust form styles
// searchFormEl.addEventListener('submit', getCustomCoords);
searchFormSubmitBtnEl.addEventListener('click', getCustomCoords);

// event listener for .fav-icon
resultsWrapperEl.addEventListener('click', addFav);

// // event listener for .fav-icon-copy
resultsWrapperEl.addEventListener('click', removeFav);


// TODO 
// syncronize fav-icons on results return and on remove 
// clear all favs button and handler
// 
