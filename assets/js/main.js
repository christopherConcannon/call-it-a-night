// CACHE PAGE ELEMENTS
const landingContainerEl = document.querySelector('#landing-wrapper');
const resultsContainerEl = document.querySelector('#results-wrapper');
const hereNowBtnEl = document.querySelector('#here-now');
const searchFormEl = document.querySelector('#search');
const searchFormSubmitBtnEl = document.querySelector('#search-form-submit');
const cityInputEl = document.querySelector('#city');
const dateInputEl = document.querySelector('#date');
const timeInputEl = document.querySelector('#time');

// restaurant carousel items**********************************************************
// const restauCarouselEl = document.querySelector('#restau-carousel');
const restauCarouselItemOne = document.querySelector('#restau-carousel [href="#one!"]');
const restauCarouselItemTwo = document.querySelector('#restau-carousel [href="#two!"]');
const restauCarouselItemThree = document.querySelector(
	'#restau-carousel [href="#three!"]'
);
const restauCarouselItemFour = document.querySelector('#restau-carousel [href="#four!"]');
const restauCarouselItemFive = document.querySelector('#restau-carousel [href="#five!"]');
const restauCarouselItemSix = document.querySelector('#restau-carousel [href="#six!"]');
const restauCarouselItemSeven = document.querySelector(
	'#restau-carousel [href="#seven!"]'
);

// restaurant card images
const restauCardOneImg = restauCarouselItemOne.querySelector('img');
const restauCardTwoImg = restauCarouselItemTwo.querySelector('img');
const restauCardThreeImg = restauCarouselItemThree.querySelector('img');
const restauCardFourImg = restauCarouselItemFour.querySelector('img');
const restauCardFiveImg = restauCarouselItemFive.querySelector('img');
const restauCardSixImg = restauCarouselItemSix.querySelector('img');
const restauCardSevenImg = restauCarouselItemSeven.querySelector('img');

// restaurant card titles (restaurant names)
const restauCardOneTitle = restauCarouselItemOne.querySelector('.card-title');
const restauCardTwoTitle = restauCarouselItemTwo.querySelector('.card-title');
const restauCardThreeTitle = restauCarouselItemThree.querySelector('.card-title');
const restauCardFourTitle = restauCarouselItemFour.querySelector('.card-title');
const restauCardFiveTitle = restauCarouselItemFive.querySelector('.card-title');
const restauCardSixTitle = restauCarouselItemSix.querySelector('.card-title');
const restauCardSevenTitle = restauCarouselItemSeven.querySelector('.card-title');

// restaurant card content (cuisine type)
const restauCardOneContent = restauCarouselItemOne.querySelector('.card-content p');
const restauCardTwoContent = restauCarouselItemTwo.querySelector('.card-content');
const restauCardThreeContent = restauCarouselItemThree.querySelector('.card-content');
const restauCardFourContent = restauCarouselItemFour.querySelector('.card-content');
const restauCardFiveContent = restauCarouselItemFive.querySelector('.card-content');
const restauCardSixContent = restauCarouselItemSix.querySelector('.card-content');
const restauCardSevenContent = restauCarouselItemSeven.querySelector('.card-content');

// restaurant card site icon link
const restauCardOneSiteLink = restauCarouselItemOne.querySelector('.site');
const restauCardTwoSiteLink = restauCarouselItemTwo.querySelector('.site');
const restauCardThreeSiteLink = restauCarouselItemThree.querySelector('.site');
const restauCardFourSiteLink = restauCarouselItemFour.querySelector('.site');
const restauCardFiveSiteLink = restauCarouselItemFive.querySelector('.site');
const restauCardSixSiteLink = restauCarouselItemSix.querySelector('.site');
const restauCardSevenSiteLink = restauCarouselItemSeven.querySelector('.site');

// restaurant card location icon link
const restauCardOneLocationLink = restauCarouselItemOne.querySelector('.location');
const restauCardTwoLocationLink = restauCarouselItemTwo.querySelector('.location');
const restauCardThreeLocationLink = restauCarouselItemThree.querySelector('.location');
const restauCardFourLocationLink = restauCarouselItemFour.querySelector('.location');
const restauCardFiveLocationLink = restauCarouselItemFive.querySelector('.location');
const restauCardSixLocationLink = restauCarouselItemSix.querySelector('.location');
const restauCardSevenLocationLink = restauCarouselItemSeven.querySelector('.location');

// restaurant card fav icon
const restauCardOneFavIcon = restauCarouselItemOne.querySelector('.fav');
const restauCardTwoFavIcon = restauCarouselItemTwo.querySelector('.fav');
const restauCardThreeFavIcon = restauCarouselItemThree.querySelector('.fav');
const restauCardFourFavIcon = restauCarouselItemFour.querySelector('.fav');
const restauCardFiveFavIcon = restauCarouselItemFive.querySelector('.fav');
const restauCardSixFavIcon = restauCarouselItemSix.querySelector('.fav');
const restauCardSevenFavIcon = restauCarouselItemSeven.querySelector('.fav');

// event carousel items****************************************
// const eventCarouselEl = document.querySelector('#event-carousel');
const eventCarouselItemOne = document.querySelector('#event-carousel [href="#one!"]');
const eventCarouselItemTwo = document.querySelector('#event-carousel [href="#two!"]');
const eventCarouselItemThree = document.querySelector('#event-carousel [href="#three!"]');
const eventCarouselItemFour = document.querySelector('#event-carousel [href="#four!"]');
const eventCarouselItemFive = document.querySelector('#event-carousel [href="#five!"]');
const eventCarouselItemSix = document.querySelector('#event-carousel [href="#six!"]');
const eventCarouselItemSeven = document.querySelector('#event-carousel [href="#seven!"]');

// event card images
const eventCardOneImg = eventCarouselItemOne.querySelector('img');
const eventCardTwoImg = eventCarouselItemTwo.querySelector('img');
const eventCardThreeImg = eventCarouselItemThree.querySelector('img');
const eventCardFourImg = eventCarouselItemFour.querySelector('img');
const eventCardFiveImg = eventCarouselItemFive.querySelector('img');
const eventCardSixImg = eventCarouselItemSix.querySelector('img');
const eventCardSevenImg = eventCarouselItemSeven.querySelector('img');

// event card titles (eventrant names)
const eventCardOneTitle = eventCarouselItemOne.querySelector('.card-title');
const eventCardTwoTitle = eventCarouselItemTwo.querySelector('.card-title');
const eventCardThreeTitle = eventCarouselItemThree.querySelector('.card-title');
const eventCardFourTitle = eventCarouselItemFour.querySelector('.card-title');
const eventCardFiveTitle = eventCarouselItemFive.querySelector('.card-title');
const eventCardSixTitle = eventCarouselItemSix.querySelector('.card-title');
const eventCardSevenTitle = eventCarouselItemSeven.querySelector('.card-title');

// event card content (cuisine type)
const eventCardOneContent = eventCarouselItemOne.querySelector('.card-content p');
const eventCardTwoContent = eventCarouselItemTwo.querySelector('.card-content');
const eventCardThreeContent = eventCarouselItemThree.querySelector('.card-content');
const eventCardFourContent = eventCarouselItemFour.querySelector('.card-content');
const eventCardFiveContent = eventCarouselItemFive.querySelector('.card-content');
const eventCardSixContent = eventCarouselItemSix.querySelector('.card-content');
const eventCardSevenContent = eventCarouselItemSeven.querySelector('.card-content');

// event card site icon link
const eventCardOneSiteLink = eventCarouselItemOne.querySelector('.site');
const eventCardTwoSiteLink = eventCarouselItemTwo.querySelector('.site');
const eventCardThreeSiteLink = eventCarouselItemThree.querySelector('.site');
const eventCardFourSiteLink = eventCarouselItemFour.querySelector('.site');
const eventCardFiveSiteLink = eventCarouselItemFive.querySelector('.site');
const eventCardSixSiteLink = eventCarouselItemSix.querySelector('.site');
const eventCardSevenSiteLink = eventCarouselItemSeven.querySelector('.site');

// event card location icon link
const eventCardOneLocationLink = eventCarouselItemOne.querySelector('.location');
const eventCardTwoLocationLink = eventCarouselItemTwo.querySelector('.location');
const eventCardThreeLocationLink = eventCarouselItemThree.querySelector('.location');
const eventCardFourLocationLink = eventCarouselItemFour.querySelector('.location');
const eventCardFiveLocationLink = eventCarouselItemFive.querySelector('.location');
const eventCardSixLocationLink = eventCarouselItemSix.querySelector('.location');
const eventCardSevenLocationLink = eventCarouselItemSeven.querySelector('.location');

// event card fav icon
const eventCardOneFavIcon = eventCarouselItemOne.querySelector('.fav');
const eventCardTwoFavIcon = eventCarouselItemTwo.querySelector('.fav');
const eventCardThreeFavIcon = eventCarouselItemThree.querySelector('.fav');
const eventCardFourFavIcon = eventCarouselItemFour.querySelector('.fav');
const eventCardFiveFavIcon = eventCarouselItemFive.querySelector('.fav');
const eventCardSixFavIcon = eventCarouselItemSix.querySelector('.fav');
const eventCardSevenFavIcon = eventCarouselItemSeven.querySelector('.fav');

// GLOBAL VARS
const coordObj = {};

const favsArr = localStorage.getItem('faves') || [];

//  GET USER CURRENT LAT/LON AND CREATE CURRENT MOMENT OBJ
function getUserCoords() {
	function success(pos) {
		const crd = pos.coords;
		coordObj.lat = crd.latitude;
		coordObj.lon = crd.longitude;
		// current moment object
		coordObj.date = moment().format('dddd, MMMM Do YYYY');
		coordObj.time = moment().format('hh:mm:ss');

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

	revealResultsContainer();
}

// function to synchronize revealResultsContainer with fetch requests so container will be on page before data is returned and sent to individual display<x>Results() functions, thus avoiding asynchronicity issues
function revealResultsContainer(coordObj) {
	landingContainerEl.className = 'hide';
	resultsContainerEl.classList = 'results-wrapper center';
	// initialize Materialize Carousel
	M.Carousel.init($('.carousel'));
	zomatoFetch(coordObj);
	tixMasterFetch(coordObj);
}

// fetch from Zomato, passing in coordObj
function zomatoFetch(coordObj) {
	const lat = coordObj.lat;
	const lon = coordObj.lon;
	// format url
	const zomatoAPIUrl = `https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lon}`;
	console.log(zomatoAPIUrl);

	fetch(zomatoAPIUrl, {
		method  : 'GET',
		headers : {
			'user-key' : '26d100244c8261ae45b9599c8a8848cd'
		}
	})
		.then(function(res) {
			if (res.ok) {
				res.json().then(function(data) {
					const restauDataArr = buildRestauData(data);
					// pass API data to display function
					displayRestauResults(restauDataArr);
				});
			} else {
				let msg = `Error: ${res.statusText}`;
				displayErrorMsg(msg);
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});

	// CREATE OBJECT TO PASS TO DISPLAY FUNCTION
	function buildRestauData(data) {
		let nearbyRestaurants = data.nearby_restaurants;
		console.log('getZomatoData -> nearbyRestaurants', nearbyRestaurants);
		let restauDataArr = [];

		for (var i = 0; i <= 7; i++) {
			let restauObj = {};
			// let restauLat = nearbyRestaurants[i].restaurant.location.latitude;
			// let restauLon = nearbyRestaurants[i].restaurant.location.longitude;

			let address = nearbyRestaurants[i].restaurant.location.address;
			let encodedAddress = address.replace(/ /g, '%20').replace(/,/g, '%2C');
			// 11940 Manchaca Road, Austin 78748

			restauObj.name = nearbyRestaurants[i].restaurant.name;
			restauObj.img =
				nearbyRestaurants[i].restaurant.thumb !== ''
					? nearbyRestaurants[i].restaurant.thumb
					: './assets/images/restau-placeholder-img.jpg';
			restauObj.cuisine = nearbyRestaurants[i].restaurant.cuisines;
			restauObj.site = nearbyRestaurants[i].restaurant.url;
			restauObj.location = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
			// restauObj.location = `https://www.google.com/maps/dir/?api=1&destination=${restauLat},${restauLon}`;
			restauDataArr.push(restauObj);
		}
		return restauDataArr;
	}
}

// fetch from Tix Master, passing in coordObj
function tixMasterFetch(coordObj) {
	const lat = coordObj.lat;
	const lon = coordObj.lon;

	const geoPoint = Geohash.encode(lat, lon, 7);

	console.log(geoPoint);

	const tixAPIkey = 'wEkOlTafP8T1DEZZ4GWREy4AwGrWvuBx';

	const tixMasterAPIUrl = `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${geoPoint}&radius=1&apikey=${tixAPIkey}`;
	// const tixMasterAPIUrl = `https://app.ticketmaster.com/discovery/v2/events.json?latlon=${lat}${lon}&apikey=${tixAPIkey}`
	console.log(tixMasterAPIUrl);

	fetch(tixMasterAPIUrl)
		.then(function(res) {
			if (res.ok) {
				res.json().then(function(data) {
					let nearbyEvents = data;
					console.log('tixMasterFetch -> nearbyEvents', nearbyEvents);

					if (!nearbyEvents._embedded) {
						let msg =
							'Sorry chap/ette, no events in your area.  Call an Uber or Netflix and chill';
						displayErrorMsg(msg);
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

	// pass API data to display function
	// displayEventResults(data);
	displayEventResults();
}

function displayRestauResults(restauData) {
	// populate cards

	// first card
	restauCardOneImg.setAttribute('src', restauData[0].img);
	restauCardOneTitle.innerText = restauData[0].name;
	restauCardOneContent.innerText = restauData[0].cuisine;
	restauCardOneSiteLink.setAttribute('href', restauData[0].site);
	restauCardOneSiteLink.setAttribute('target', '_blank');
	restauCardOneLocationLink.setAttribute('href', restauData[0].location);
	restauCardOneLocationLink.setAttribute('target', '_blank');

	// second card
	restauCardTwoImg.setAttribute('src', restauData[1].img);
	restauCardTwoTitle.innerText = restauData[1].name;
	restauCardTwoContent.innerText = restauData[1].cuisine;
	restauCardTwoSiteLink.setAttribute('href', restauData[1].site);
	restauCardTwoSiteLink.setAttribute('target', '_blank');
	restauCardTwoLocationLink.setAttribute('href', restauData[1].location);
	restauCardTwoLocationLink.setAttribute('target', '_blank');

	// third card
	restauCardThreeImg.setAttribute('src', restauData[2].img);
	restauCardThreeTitle.innerText = restauData[2].name;
	restauCardThreeContent.innerText = restauData[2].cuisine;
	restauCardThreeSiteLink.setAttribute('href', restauData[2].site);
	restauCardThreeSiteLink.setAttribute('target', '_blank');
	restauCardThreeLocationLink.setAttribute('href', restauData[2].location);
	restauCardThreeLocationLink.setAttribute('target', '_blank');

	// fourth card
	restauCardFourImg.setAttribute('src', restauData[3].img);
	restauCardFourTitle.innerText = restauData[3].name;
	restauCardFourContent.innerText = restauData[3].cuisine;
	restauCardFourSiteLink.setAttribute('href', restauData[3].site);
	restauCardFourSiteLink.setAttribute('target', '_blank');
	restauCardFourLocationLink.setAttribute('href', restauData[3].location);
	restauCardFourLocationLink.setAttribute('target', '_blank');

	// fifth card
	restauCardFiveImg.setAttribute('src', restauData[4].img);
	restauCardFiveTitle.innerText = restauData[4].name;
	restauCardFiveContent.innerText = restauData[4].cuisine;
	restauCardFiveSiteLink.setAttribute('href', restauData[4].site);
	restauCardFiveSiteLink.setAttribute('target', '_blank');
	restauCardFiveLocationLink.setAttribute('href', restauData[4].location);
	restauCardFiveLocationLink.setAttribute('target', '_blank');

	// sixth card
	restauCardSixImg.setAttribute('src', restauData[5].img);
	restauCardSixTitle.innerText = restauData[5].name;
	restauCardSixContent.innerText = restauData[5].cuisine;
	restauCardSixSiteLink.setAttribute('href', restauData[5].site);
	restauCardSixSiteLink.setAttribute('target', '_blank');
	restauCardSixLocationLink.setAttribute('href', restauData[5].location);
	restauCardSixLocationLink.setAttribute('target', '_blank');

	// seventh card
	restauCardSevenImg.setAttribute('src', restauData[6].img);
	restauCardSevenTitle.innerText = restauData[6].name;
	restauCardSevenContent.innerText = restauData[6].cuisine;
	restauCardSevenSiteLink.setAttribute('href', restauData[6].site);
	restauCardSevenSiteLink.setAttribute('target', '_blank');
	restauCardSevenLocationLink.setAttribute('href', restauData[6].location);
	restauCardSevenLocationLink.setAttribute('target', '_blank');

	// set data-id attr for fav tracking
	// add event listener to fav icon...callbck addToFavs()
}

function displayEventResults() {
	//  dummy content for development
	const eventData = [
		{
			img      :
				'https://s1.ticketm.net/dam/a/f44/36cfa60f-15f6-4308-a297-0eb739899f44_1294441_TABLET_LANDSCAPE_LARGE_16_9.jpg',
			name     : 'PRIMUS - A Tribute to Kings',
			type     : 'Music',
			site     :
				'https://www.ticketmaster.com/primus-a-tribute-to-kings-austin-texas-06-12-2021/event/3A00584DEE937A6A',
			location :
				'https://www.openstreetmap.org/search?query=310%20Lavaca%2078701#map=19/30.26614/-97.74626'
		},
		{
			img      :
				'https://s1.ticketm.net/dam/a/f44/36cfa60f-15f6-4308-a297-0eb739899f44_1294441_TABLET_LANDSCAPE_LARGE_16_9.jpg',
			name     : 'PRIMUS - A Tribute to Kings',
			type     : 'Music',
			site     :
				'https://www.ticketmaster.com/primus-a-tribute-to-kings-austin-texas-06-12-2021/event/3A00584DEE937A6A',
			location :
				'https://www.openstreetmap.org/search?query=310%20Lavaca%2078701#map=19/30.26614/-97.74626'
		},
		{
			img      :
				'https://s1.ticketm.net/dam/a/f44/36cfa60f-15f6-4308-a297-0eb739899f44_1294441_TABLET_LANDSCAPE_LARGE_16_9.jpg',
			name     : 'PRIMUS - A Tribute to Kings',
			type     : 'Music',
			site     :
				'https://www.ticketmaster.com/primus-a-tribute-to-kings-austin-texas-06-12-2021/event/3A00584DEE937A6A',
			location :
				'https://www.openstreetmap.org/search?query=310%20Lavaca%2078701#map=19/30.26614/-97.74626'
		},
		{
			img      :
				'https://s1.ticketm.net/dam/a/f44/36cfa60f-15f6-4308-a297-0eb739899f44_1294441_TABLET_LANDSCAPE_LARGE_16_9.jpg',
			name     : 'PRIMUS - A Tribute to Kings',
			type     : 'Music',
			site     :
				'https://www.ticketmaster.com/primus-a-tribute-to-kings-austin-texas-06-12-2021/event/3A00584DEE937A6A',
			location :
				'https://www.openstreetmap.org/search?query=310%20Lavaca%2078701#map=19/30.26614/-97.74626'
		},
		{
			img      :
				'https://s1.ticketm.net/dam/a/f44/36cfa60f-15f6-4308-a297-0eb739899f44_1294441_TABLET_LANDSCAPE_LARGE_16_9.jpg',
			name     : 'PRIMUS - A Tribute to Kings',
			type     : 'Music',
			site     :
				'https://www.ticketmaster.com/primus-a-tribute-to-kings-austin-texas-06-12-2021/event/3A00584DEE937A6A',
			location :
				'https://www.openstreetmap.org/search?query=310%20Lavaca%2078701#map=19/30.26614/-97.74626'
		},
		{
			img      :
				'https://s1.ticketm.net/dam/a/f44/36cfa60f-15f6-4308-a297-0eb739899f44_1294441_TABLET_LANDSCAPE_LARGE_16_9.jpg',
			name     : 'PRIMUS - A Tribute to Kings',
			type     : 'Music',
			site     :
				'https://www.ticketmaster.com/primus-a-tribute-to-kings-austin-texas-06-12-2021/event/3A00584DEE937A6A',
			location :
				'https://www.openstreetmap.org/search?query=310%20Lavaca%2078701#map=19/30.26614/-97.74626'
		},
		{
			img      :
				'https://s1.ticketm.net/dam/a/f44/36cfa60f-15f6-4308-a297-0eb739899f44_1294441_TABLET_LANDSCAPE_LARGE_16_9.jpg',
			name     : 'PRIMUS - A Tribute to Kings',
			type     : 'Music',
			site     :
				'https://www.ticketmaster.com/primus-a-tribute-to-kings-austin-texas-06-12-2021/event/3A00584DEE937A6A',
			location :
				'https://www.openstreetmap.org/search?query=310%20Lavaca%2078701#map=19/30.26614/-97.74626'
		}
	];
	// popuate cards
	// first card
	eventCardOneImg.setAttribute('src', eventData[0].img);
	eventCardOneTitle.innerText = eventData[0].name;
	eventCardOneContent.innerText = eventData[0].type;
	eventCardOneSiteLink.setAttribute('href', eventData[0].site);
	eventCardOneSiteLink.setAttribute('target', '_blank');
	eventCardOneLocationLink.setAttribute('href', eventData[0].location);
	eventCardOneLocationLink.setAttribute('target', '_blank');

	// second card
	eventCardTwoImg.setAttribute('src', eventData[1].img);
	eventCardTwoTitle.innerText = eventData[1].name;
	eventCardTwoContent.innerText = eventData[1].type;
	eventCardTwoSiteLink.setAttribute('href', eventData[1].site);
	eventCardTwoSiteLink.setAttribute('target', '_blank');
	eventCardTwoLocationLink.setAttribute('href', eventData[1].location);
	eventCardTwoLocationLink.setAttribute('target', '_blank');

	// third card
	eventCardThreeImg.setAttribute('src', eventData[2].img);
	eventCardThreeTitle.innerText = eventData[2].name;
	eventCardThreeContent.innerText = eventData[2].type;
	eventCardThreeSiteLink.setAttribute('href', eventData[2].site);
	eventCardThreeSiteLink.setAttribute('target', '_blank');
	eventCardThreeLocationLink.setAttribute('href', eventData[2].location);
	eventCardThreeLocationLink.setAttribute('target', '_blank');

	// fourth card
	eventCardFourImg.setAttribute('src', eventData[3].img);
	eventCardFourTitle.innerText = eventData[3].name;
	eventCardFourContent.innerText = eventData[3].type;
	eventCardFourSiteLink.setAttribute('href', eventData[3].site);
	eventCardFourSiteLink.setAttribute('target', '_blank');
	eventCardFourLocationLink.setAttribute('href', eventData[3].location);
	eventCardFourLocationLink.setAttribute('target', '_blank');

	// fifth card
	eventCardFiveImg.setAttribute('src', eventData[4].img);
	eventCardFiveTitle.innerText = eventData[4].name;
	eventCardFiveContent.innerText = eventData[4].type;
	eventCardFiveSiteLink.setAttribute('href', eventData[4].site);
	eventCardFiveSiteLink.setAttribute('target', '_blank');
	eventCardFiveLocationLink.setAttribute('href', eventData[4].location);
	eventCardFiveLocationLink.setAttribute('target', '_blank');

	// sixth card
	eventCardSixImg.setAttribute('src', eventData[5].img);
	eventCardSixTitle.innerText = eventData[5].name;
	eventCardSixContent.innerText = eventData[5].type;
	eventCardSixSiteLink.setAttribute('href', eventData[5].site);
	eventCardSixSiteLink.setAttribute('target', '_blank');
	eventCardSixLocationLink.setAttribute('href', eventData[5].location);
	eventCardSixLocationLink.setAttribute('target', '_blank');

	// seventh card
	eventCardSevenImg.setAttribute('src', eventData[6].img);
	eventCardSevenTitle.innerText = eventData[6].name;
	eventCardSevenContent.innerText = eventData[6].type;
	eventCardSevenSiteLink.setAttribute('href', eventData[6].site);
	eventCardSevenSiteLink.setAttribute('target', '_blank');
	eventCardSevenLocationLink.setAttribute('href', eventData[6].location);
	eventCardSevenLocationLink.setAttribute('target', '_blank');

	// set data-id attr for fav tracking
	// add event listener to fav icon...callbck addToFavs()
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

function displayErrorMsg(err) {
	console.log(err);
	// TODO -- CREATE HTML MESSAGE INSTEAD OF CONSOLE.LOG/ALERT
}

// ADD EVENT LISTENERS
hereNowBtnEl.addEventListener('click', getUserCoords);
// should refactor to fire on form submit for accessibility, but need to adjust form styles
searchFormSubmitBtnEl.addEventListener('click', getCustomCoords);
// event listener for fav icon
// favIconEl.addEventListener('click', addToFavs);
